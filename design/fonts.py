"""Self-host the page's Google Fonts, cut down to what the page uses.

Run from the repository root (needs network and fonttools: pip install fonttools brotli):

    python3 design/fonts.py

It downloads the fonts from Google Fonts, trims each variable font to the axis
ranges in AXES, keeps only the characters in LATIN (plus the math and symbols
files, which a browser fetches only when a character such as → appears),
writes them to assets/fonts/ under content-hashed names (served with a one-year
immutable cache, see vercel.json), and rewrites the block between
<!-- fonts:start --> and <!-- fonts:end --> in index.html.

Families in LATE (Fraunces, which nothing in the first screen uses) go into a
<template id="late-fonts"> that index.html adds to the page after the first
paint, so their files don't compete with the hero for bandwidth.

To add an icon, add its name to ICONS (alphabetical order) and run the script.
"""
import hashlib, io, os, re, urllib.request
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ICONS = "air,android,apps,arrow_back,arrow_downward,arrow_forward,arrow_outward,auto_awesome,bar_chart,battery_charging_full,block,bolt,calendar_month,call,category,check,close,code,content_copy,contrast,counter_1,crop_portrait,date_range,do_not_disturb_on,donut_small,edit_note,event,event_note,folder,format_list_bulleted,front_hand,gavel,grid_view,hourglass_bottom,inbox,insights,interests,keyboard_return,link,local_fire_department,lock,memory,mic,more_horiz,music_note,notifications,notifications_active,notifications_paused,open_in_full,palette,photo_camera,rule,schedule,self_improvement,share,shield_lock,shop,smart_display,smart_toy,snooze,speed,stacks,sticky_note_2,stream,style,support_agent,tag,task_alt,text_fields,timer,touch_app,trending_up,tune,video_call,view_day,waving_hand,widgets,wifi_off,work".split(",")

TEXT_CSS = ("https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600"
            "&family=Google+Sans+Code:wght@400;500&family=Google+Sans+Flex:wdth,wght@62..100,400..700&display=swap")
ICON_CSS = ("https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0..1,0"
            "&icon_names=" + ",".join(sorted(ICONS)) + "&display=swap")  # icons hide while loading (html.fl in index.html)

# Axis ranges the page uses. Google serves the full design space (Flex: width 25–151, weight 1–1000).
AXES = {
    "fraunces": {"wght": (500, 600)},
    "google-sans-code": {"wght": (400, 500)},
    "google-sans-flex": {"wdth": (62, 100), "wght": (400, 700)},
}
LATIN = ("U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2013-2014,"
         "U+2018-201E,U+2022,U+2026,U+2039-203A,U+20AC,U+2122")
SUBSETS = {"latin", "math", "symbols"}
LATE = {"fraunces"}  # declared only after the first paint (index.html copies #late-fonts into <head>)
PRELOAD = "google-sans-flex-latin"  # draws the hero heading, the LCP element
OUT = "assets/fonts"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"


def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA})).read()


def trim(raw, family, sub):
    font = instancer.instantiateVariableFont(TTFont(io.BytesIO(raw)), AXES[family])
    buf = io.BytesIO(); font.flavor = None; font.save(buf); buf.seek(0); font = TTFont(buf)
    opts = subset.Options()
    opts.flavor = "woff2"; opts.layout_features = ["*"]; opts.hinting = False
    opts.desubroutinize = True; opts.name_IDs = ["*"]; opts.notdef_outline = True
    s = subset.Subsetter(opts)
    s.populate(unicodes=subset.parse_unicodes(LATIN) if sub == "latin" else list(font.getBestCmap()))
    s.subset(font)
    buf = io.BytesIO(); font.flavor = "woff2"; font.save(buf)
    return buf.getvalue()


def main():
    blocks = re.findall(r"/\* ([\w-]+) \*/\s*(@font-face \{.*?\})", get(TEXT_CSS).decode(), re.S)
    blocks.append(("icons", re.search(r"@font-face \{.*?\}", get(ICON_CSS).decode(), re.S).group(0)))
    os.makedirs(OUT, exist_ok=True)
    for f in os.listdir(OUT):
        if f.endswith(".woff2"):
            os.remove(os.path.join(OUT, f))
    faces, late, names = [], [], {}
    for sub, block in blocks:
        if sub not in SUBSETS and sub != "icons":
            continue
        url = re.search(r"url\((.*?)\)", block).group(1)
        family = re.search(r"font-family: '([^']+)'", block).group(1).lower().replace(" ", "-")
        if url not in names:
            data = get(url)
            if family in AXES:
                data = trim(data, family, sub)
            names[url] = f"{family}-{sub}-{hashlib.sha1(data).hexdigest()[:8]}.woff2"
            with open(os.path.join(OUT, names[url]), "wb") as f:
                f.write(data)
            print(f"{names[url]}  {len(data) // 1024} KB")
        block = block.replace(url, "/assets/fonts/" + names[url])
        if sub == "latin":
            block = re.sub(r"unicode-range:[^;]*;", "unicode-range: " + LATIN.replace(",", ", ") + ";", block)
        (late if family in LATE else faces).append(re.sub(r"\s*\n\s*", " ", block).replace("{ ", "{").replace("; }", ";}"))
    preload = next(n for n in names.values() if n.startswith(PRELOAD + "-"))
    html = open("index.html", encoding="utf-8").read()
    new = ("<!-- fonts:start -->\n"
           f'<link rel="preload" as="font" type="font/woff2" href="/assets/fonts/{preload}" crossorigin>\n'
           "<style>\n" + "\n".join(faces) + "\n</style>\n"
           '<template id="late-fonts"><style>\n' + "\n".join(late) + "\n</style></template>\n<!-- fonts:end -->")
    html, n = re.subn(r"<!-- fonts:start -->.*?<!-- fonts:end -->", lambda m: new, html, flags=re.S)
    assert n == 1, "fonts:start / fonts:end markers not found in index.html"
    open("index.html", "w", encoding="utf-8").write(html)


if __name__ == "__main__":
    main()
