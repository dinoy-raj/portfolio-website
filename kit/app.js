window.__boot = function () {
  const { useState, useEffect, useRef } = React;
  const html = htm.bind(React.createElement);
  const E = window.Expressive;
  const NAME = 'Dinoy';
  const EMAIL = 'dinoykraj@gmail.com';

  const SERVICES = [
    { name: 'Android Apps', shape: 'cookie9', icon: 'android', tone: 'primary-container', tags: ['Kotlin', 'Jetpack Compose', 'Play Store release'] },
    { name: 'App Redesigns', shape: 'flower5', icon: 'auto_awesome', tone: 'tertiary-container', tags: ['Material 3 Expressive', 'Dark theme', 'Motion'] },
    { name: 'Design Systems', shape: 'clover4', icon: 'category', tone: 'secondary-container', tags: ['Tokens', 'Components', 'Guidelines'] },
    { name: 'Icons & Visuals', shape: 'burst', icon: 'interests', tone: 'highlight', tags: ['App icons', 'Icon sets', 'Store graphics'] },
  ];

  // Real apps, with copy from each app's README / Play Store listing and its own store screenshots (assets/apps).
  const PLAY = id => 'https://play.google.com/store/apps/details?id=' + id;
  const APPS = [
    { id: 'launcher', name: 'Simple Minimalist Launcher', store: 'Minimalist launcher for Android', featured: true, status: 'live', bg: '#efe6d8',
      desc: 'A minimalist Android launcher designed to help you reduce screen time and boost focus. A clean, text-based home screen with only the apps you pin, custom themes and palettes, fonts, layouts and widgets, and no ads. Several of the apps below began as tools inside it.',
      tags: ['Minimalist launcher', 'Material You', 'Custom themes', 'Widgets'],
      alt: ['Minimalist Launcher', 'Simple Launcher', 'Dino Minimalist Launcher'], // other names people search for, for structured data
      seo: 'Simple Minimalist Launcher is a free minimalist launcher for Android: a text-only home screen that cuts screen time, with focus tools, 250+ widgets, themes and no ads.',
      shots: ['Light theme with periodic table pinned apps', 'Dark home with the dot-matrix clock and only the pinned apps', 'Widgets: weather, battery, day progress, screen time and now playing', 'Orange theme in Urbanist with the day summary', 'Focus tools on home: to-do, focus timer, habits and meetings'],
      links: [['Google Play', PLAY('com.dino.simple')], ['Website', 'https://minimalistlauncher.com'], ['Roadmap', 'https://puzzle-kettle-30f.notion.site/Simple-Launcher-182b8c4aae1f80d8941df2086b1caf73']] },
    { id: 'nano', name: 'Nano Prompt Ground', store: 'Offline AI playground', status: 'live', bg: '#dcefe5',
      desc: 'Prompt Gemini Nano right on your phone. Private, offline AI with no API key: every answer is generated on the device, with live streaming and the speed of each reply.',
      tags: ['Gemini Nano', 'ML Kit Prompt API', 'On-device AI'],
      shots: ['Prompt anything', 'Gemini Nano, right on your phone', 'See the speed of every answer'],
      links: [['Google Play', PLAY('com.dino.nanoplayground')], ['Source', 'https://github.com/dinoy-raj/gemini-nano-playground']] },
    { id: 'focus', name: 'Focus', store: 'Pomodoro timer', bg: '#0f4d3a',
      desc: 'A calm, distraction-free pomodoro timer. Plan your focus sessions, keep them on schedule, and see where your time goes, from the app, your home screen, the notification shade or a dynamic island around your camera.',
      seo: 'A calm pomodoro timer for Android: plan focus sessions, keep them on schedule and see where your time goes, from the app, widgets or a dynamic island.',
      tags: ['Sessions', 'Statistics', 'Widgets', 'Dynamic island'],
      shots: ['Every minute counted: weekly statistics', 'With flow, not force: the focus timer', 'Your timer, always near: the dynamic island'] },
    { id: 'habits', name: 'Habbit Tracker', store: 'Daily habits', bg: '#d4f1dd',
      desc: 'Build the habits you want and break the ones you don\'t, one square a day. Every habit is a card with a grid of its days: tap to log today, watch the streak grow, and keep it in view with widgets and a dynamic island.',
      seo: 'Build habits and break bad ones, one square a day: an Android habit tracker with a grid for every habit, streaks, widgets and a dynamic island.',
      tags: ['Streaks', 'Quit habits', 'Widgets', 'Themes'],
      shots: ['Every habit has its own story', 'Build habits, one square a day', 'Easy on the eyes, day or night'] },
    { id: 'reel', name: 'Reel Blocker', store: 'Stop scrolling', bg: '#c6ecd9',
      desc: 'Counts the Instagram Reels, YouTube Shorts, TikToks, Snapchat Spotlight and Reddit videos you watch, and stops the feed once you hit your daily limit. The rest of each app keeps working, and nothing leaves your phone.',
      seo: 'Stop endless scrolling on Android: counts the Instagram Reels, YouTube Shorts and TikToks you watch and stops the feed at your daily limit, all on-device.',
      tags: ['Accessibility service', 'Daily limits', 'On-device'],
      shots: ['See where your time goes', 'Take back your scroll time', 'Limit hit. Reel stopped.'] },
    { id: 'appblocker', name: 'App Blocker', store: 'Focus & timers', bg: '#fff0bf',
      desc: 'Keep the apps you choose closed: all the time, on a schedule, or once they have used up their daily time. When a blocked app opens, a gate steps in front of it. Everything stays on the phone.',
      seo: 'Block distracting Android apps all the time, on a schedule or once their daily time is up. A gate steps in when a blocked app opens; all on-device.',
      tags: ['Schedules', 'App timers', 'Hold to unlock'],
      shots: ['Watch the blocks add up', 'Keep distracting apps closed', 'Hold to get through. Or don\'t.'] },
    { id: 'mindful', name: 'Mindful Pause', store: 'Screen time', bg: '#2b1055',
      desc: 'Breathe before you scroll. A gentle pause in front of the apps that pull you in: go back to focus with one tap, or finish a short challenge, like a slow breath or a small puzzle, to open the app for a few minutes.',
      seo: 'Breathe before you scroll: a gentle pause in front of distracting Android apps, with a slow breath or small puzzle to open one for a few minutes.',
      tags: ['Breathing', 'Challenges', 'On-device'],
      shots: ['A small challenge first', 'Breathe before you scroll', 'Count every time you turned back'] },
    { id: 'notifications', name: 'Notification Blocker', store: 'Blocker & filter', bg: '#166a4b',
      desc: 'Hold back noisy notifications, let what matters through and read the rest later. Held notifications wait in an inbox or arrive as a digest, while calls, alarms and one-time codes still get through.',
      seo: 'Block noisy Android notifications and read them later in an inbox or a digest, while calls, alarms and one-time codes still get through.',
      tags: ['Keyword rules', 'Digest', 'Snooze'],
      shots: ['Hold the noise, keep what matters', 'Your phone, finally quiet', 'Read it all later, in one place'] },
    { id: 'countdown', name: 'Count down', store: 'Days until', bg: '#d6ecf5',
      desc: 'Count the days to trips, birthdays and deadlines. Every event is a colourful card in one stack, opening on the soonest, with reminders and widgets. Once a day has passed, its card keeps counting up.',
      seo: 'Count the days to trips, birthdays and deadlines on Android: colourful event cards with reminders and widgets that count up once the day has passed.',
      tags: ['Reminders', 'Groups', 'Widgets'],
      shots: ['Count down to it. Count up after.', 'Every day that matters, at a glance', 'A dynamic island for your countdown'] },
    { id: 'meetings', name: 'Meetings', store: 'Sticky note agenda', bg: '#dfe2ff',
      desc: 'Today\'s meetings as a pile of sticky notes, the next one on top, with reminders and one-tap join. The coming week sits under the board, and highlights show where your time in meetings goes.',
      seo: 'Today\'s meetings as sticky notes on Android, the next one on top, with reminders, one-tap join, the week ahead and where your meeting time goes.',
      tags: ['Calendar', 'One-tap join', 'Highlights'],
      shots: ['Your week, at a glance', 'Today\'s meetings, pinned up', 'See where your time goes'] },
    { id: 'timeline', name: 'Timeline Calendar', store: 'Day view', bg: '#2f7bff',
      desc: 'See your whole day at a glance: every event from the calendars already on your phone, on one clean, live timeline. No account, no sync of its own, and nothing is uploaded.',
      seo: 'See your whole day on one live timeline: every event from the calendars already on your Android phone. No account, no sync of its own, nothing uploaded.',
      tags: ['Calendar provider', 'Day view', 'Private'],
      shots: ['See how your hours fill up', 'Your whole day, at a glance', 'Back-to-back? Stacked neatly'] },
    { id: 'links', name: 'Link Manager', store: 'Read it later', bg: '#ebe2d6',
      desc: 'Save links from any app, sort them into your own categories, add a note on why you saved them, and tick off what you have read.',
      tags: ['Share to save', 'Categories', 'Notes'],
      shots: ['Share from any app', 'Save it now. Read it later.', 'Calm, day or night'] },
    { id: 'island', name: 'Dynamic Island', store: 'Live pill', status: 'wip', bg: '#5881ff',
      desc: 'Turns the camera cutout on your Android phone into a live, interactive pill for music, timers, calls, charging and notifications. Tap to expand it; when two things are live, it splits in two.',
      seo: 'Turn your Android phone\'s camera cutout into a live, interactive pill for music, timers, calls, charging and notifications. Tap it to expand.',
      tags: ['Overlay', 'Media controls', 'Customisable'],
      shots: ['Tap to expand', 'Your camera, alive', 'Two things live? Split it'] },
  ];

  /* Detail pages: each app lives at /<slug>, with /<slug>/privacypolicy and /<slug>/termsofservice.
     features: [icon, title, text]. perms: [permission, why it is needed]. net: what, if anything, leaves the phone. */
  const DETAILS = {
    launcher: { slug: 'minimalistlauncher', Bento: LauncherBento,
      features: [
        ['format_list_bulleted', 'Text-only home screen', 'Only the apps you pin, as a clean list of names. No icon grid, no badges, nothing pulling at your attention.'],
        ['palette', 'Themes and palettes', 'Light, dark and colour themes with custom palettes, so the home screen matches your wallpaper or your mood.'],
        ['text_fields', 'Fonts and layouts', 'Pick the typeface, the size and the alignment of your apps and clock, from a dot-matrix clock to a periodic table layout.'],
        ['widgets', 'Calm widgets', 'Weather, battery, day progress, screen time and now playing, drawn in the same quiet style as the rest of the home screen.'],
        ['timer', 'Focus tools built in', 'A to-do list, a focus timer, habits and today\'s meetings, right on the home screen.'],
        ['block', 'No ads', 'No ads and no tracking SDKs. The launcher is there to help you use your phone less, not to keep you on it.'],
      ],
      perms: [['See installed apps', 'to list the apps you can pin and search'], ['Usage access (optional)', 'for the screen time widget'], ['Notification access (optional)', 'for the now playing widget'], ['Location (optional)', 'for the weather widget'], ['Calendar (optional)', 'to show today\'s meetings']],
      net: 'If you turn on the weather widget, your approximate location is sent to a weather service to fetch the forecast. Everything else stays on your phone.',
      // Links from the launcher's Linktree (linktr.ee/simple.launcher). cards: [href, icon, title, subtitle, tone]; social: [label, href].
      community: {
        intro: 'See what is coming next, talk to other people who use the launcher, and follow its design.',
        cards: [
          ['https://puzzle-kettle-30f.notion.site/Simple-Launcher-182b8c4aae1f80d8941df2086b1caf73', 'map', 'Product roadmap', 'What is planned, in progress and shipped', 'bg-p'],
          [PLAY('com.dino.simple'), 'shop', 'Download on Google Play', 'Free, with no ads', 'bg-s'],
          ['https://chat.whatsapp.com/ERy3ceWpRhF7puEcDteQZf', 'groups', 'Join the community', 'Ideas, feedback and help on WhatsApp'],
          ['https://buymeacoffee.com/simplelauncher', 'coffee', 'Buy me a coffee', 'Support the launcher\'s development'],
        ],
        social: [['X', 'https://x.com/LauncherSi56353'], ['Pinterest', 'https://pin.it/wIbSe1Bq9'], ['Behance', 'https://www.behance.net/simplelauncher'], ['Dribbble', 'https://dribbble.com/simplelauncher/shots']],
      } },
    nano: { slug: 'nanopromptground',
      features: [
        ['edit_note', 'Prompt anything', 'Write any prompt and get an answer from Gemini Nano, the model built into your phone.'],
        ['wifi_off', 'Works offline', 'Every answer is generated on the device, so it works in flight mode and needs no API key or account.'],
        ['stream', 'Live streaming', 'Answers stream in word by word as the model writes them.'],
        ['speed', 'Speed for every answer', 'See how fast each reply was generated, in tokens per second.'],
      ],
      perms: [],
      net: 'Prompts and answers never leave your phone. The Gemini Nano model itself is downloaded and updated by Android (Google AICore), not by this app.' },
    focus: { slug: 'focus',
      features: [
        ['timer', 'Pomodoro timer', 'Focus and break sessions that keep to schedule, with a calm, distraction-free timer screen.'],
        ['event_note', 'Plan your sessions', 'Set up how long you focus and rest, and how many rounds you want to do.'],
        ['bar_chart', 'Statistics', 'Weekly statistics show where your focus time goes, minute by minute.'],
        ['widgets', 'Widgets', 'Start and follow a session from your home screen.'],
        ['notifications', 'Notification shade', 'Pause, skip or stop without opening the app.'],
        ['crop_portrait', 'Dynamic island', 'A live timer around your camera cutout, always in view.'],
      ],
      perms: [['Notifications', 'to show the running timer and tell you when a session ends'], ['Display over other apps (optional)', 'for the dynamic island']],
      net: 'Your sessions and statistics are stored only on your phone.' },
    habits: { slug: 'habittracker',
      features: [
        ['grid_view', 'One square a day', 'Every habit is a card with a grid of its days. Tap to log today.'],
        ['local_fire_department', 'Streaks', 'Watch your streak grow and see your best runs.'],
        ['do_not_disturb_on', 'Quit habits', 'Track the habits you are breaking as well as the ones you are building.'],
        ['notifications_active', 'Reminders', 'A gentle nudge at the time you choose.'],
        ['widgets', 'Widgets and dynamic island', 'Keep today\'s habits in view on your home screen or around your camera.'],
        ['contrast', 'Themes', 'Easy on the eyes, day or night.'],
      ],
      perms: [['Notifications', 'for habit reminders and the optional pinned notification'], ['Display over other apps (optional)', 'for the dynamic island'], ['Internet', 'for Habit Pro purchases and subscription checks only']],
      net: 'Your habits and history are stored only on your phone. The app goes online only to check Habit Pro purchases.' },
    reel: { slug: 'reelblocker',
      features: [
        ['smart_display', 'Counts short videos', 'Counts the Instagram Reels, YouTube Shorts, TikToks, Snapchat Spotlight and Reddit videos you watch.'],
        ['front_hand', 'Daily limits', 'Set a daily limit per app. Once you hit it, the feed stops.'],
        ['apps', 'The rest keeps working', 'Messages, posts and search stay available. Only the endless video feed is blocked.'],
        ['insights', 'See where your time goes', 'Daily counts show how much you scroll and how it changes.'],
        ['lock', 'On-device', 'Nothing you watch is recorded or sent anywhere.'],
      ],
      perms: [['Accessibility service', 'to detect when a short-video feed is on screen and close it once your limit is reached. It reads only what is needed to recognise those screens, and nothing it reads is stored or shared']],
      net: 'Counts and limits are stored only on your phone. The app does not send what you watch anywhere.' },
    appblocker: { slug: 'appblocker',
      features: [
        ['block', 'Always blocked', 'Keep the apps you choose closed all the time.'],
        ['schedule', 'Schedules', 'Block apps during work hours, at night or any time you set.'],
        ['hourglass_bottom', 'App timers', 'Give an app a daily allowance. When it is used up, the app stays closed until tomorrow.'],
        ['touch_app', 'Hold to unlock', 'A gate steps in front of a blocked app. Hold to get through, or don\'t.'],
        ['insights', 'Watch the blocks add up', 'See how many times the gate kept you out.'],
      ],
      perms: [['Usage access', 'to know which app is open and how long it has been used today'], ['Display over other apps', 'to show the gate in front of a blocked app'], ['Accessibility service (if enabled)', 'to detect a blocked app opening more reliably']],
      net: 'Your blocks, schedules and usage stay on your phone.' },
    mindful: { slug: 'mindfulpause',
      features: [
        ['self_improvement', 'A pause before you scroll', 'A gentle screen appears in front of the apps that pull you in.'],
        ['keyboard_return', 'Back to focus in one tap', 'Changed your mind? Go back with a single tap.'],
        ['air', 'Short challenges', 'Finish a slow breath or a small puzzle to open the app for a few minutes.'],
        ['counter_1', 'Count every win', 'See every time you turned back instead of opening the app.'],
        ['lock', 'On-device', 'Everything stays on your phone.'],
      ],
      perms: [['Usage access or accessibility service', 'to know when one of your chosen apps opens'], ['Display over other apps', 'to show the pause screen']],
      net: 'Your apps, challenges and counts stay on your phone.' },
    notifications: { slug: 'notificationblocker',
      features: [
        ['notifications_paused', 'Hold the noise', 'Hold back notifications from the apps you choose.'],
        ['rule', 'Keyword rules', 'Let notifications through, or hold them, based on the words they contain.'],
        ['inbox', 'Inbox and digest', 'Held notifications wait in an inbox or arrive together as a digest.'],
        ['snooze', 'Snooze', 'Bring a notification back later.'],
        ['call', 'What matters gets through', 'Calls, alarms and one-time codes still reach you.'],
      ],
      perms: [['Notification access', 'to read, hold and later show your notifications. Their content is stored only on your phone, for the inbox and digest']],
      net: 'Your notifications never leave your phone.' },
    countdown: { slug: 'countdown',
      features: [
        ['event', 'Days until', 'Count the days to trips, birthdays and deadlines.'],
        ['style', 'One colourful stack', 'Every event is a card, with the soonest on top.'],
        ['trending_up', 'Count up after', 'Once a day has passed, its card keeps counting up.'],
        ['folder', 'Groups', 'Sort events into groups.'],
        ['notifications_active', 'Reminders', 'Get a reminder before the day arrives.'],
        ['widgets', 'Widgets and dynamic island', 'Your countdown on your home screen and around your camera.'],
      ],
      perms: [['Notifications', 'for event reminders'], ['Display over other apps (optional)', 'for the dynamic island']],
      net: 'Your events are stored only on your phone.' },
    meetings: { slug: 'meetings',
      features: [
        ['sticky_note_2', 'Sticky note agenda', 'Today\'s meetings as a pile of sticky notes, the next one on top.'],
        ['video_call', 'One-tap join', 'Join the call straight from the note.'],
        ['notifications_active', 'Reminders', 'Know before the next meeting starts.'],
        ['date_range', 'Your week', 'The coming week sits under the board.'],
        ['donut_small', 'Highlights', 'See where your time in meetings goes.'],
      ],
      perms: [['Calendar (read only)', 'to show the events from the calendars already on your phone'], ['Notifications', 'for meeting reminders']],
      net: 'The app reads your calendar on the device. It does not upload or change your events.' },
    timeline: { slug: 'timelinecalendar',
      features: [
        ['view_day', 'Your day on one timeline', 'Every event of the day on a single, live timeline.'],
        ['calendar_month', 'Uses your calendars', 'Reads the calendars already on your phone. No account and no sync of its own.'],
        ['stacks', 'Overlaps stacked neatly', 'Back-to-back and overlapping events sit side by side.'],
        ['schedule', 'See your hours fill up', 'Spot your free time at a glance.'],
      ],
      perms: [['Calendar (read only)', 'to show the events from the calendars already on your phone']],
      net: 'The app reads your calendar on the device. Nothing is uploaded.' },
    links: { slug: 'linkmanager',
      features: [
        ['share', 'Save from any app', 'Share a link to Link Manager from any app to save it.'],
        ['category', 'Your own categories', 'Sort links into the categories you create.'],
        ['sticky_note_2', 'Notes', 'Add a note on why you saved a link.'],
        ['task_alt', 'Read it later', 'Tick off what you have read.'],
        ['contrast', 'Day or night', 'Calm light and dark themes.'],
      ],
      perms: [],
      net: 'Your links, categories and notes are stored only on your phone.' },
    island: { slug: 'dynamicisland',
      features: [
        ['crop_portrait', 'Your camera, alive', 'Turns the camera cutout into a live, interactive pill.'],
        ['music_note', 'Music', 'Track info and playback controls.'],
        ['timer', 'Timers and calls', 'Running timers and ongoing calls at a glance.'],
        ['battery_charging_full', 'Charging and notifications', 'Charging status and incoming notifications in the pill.'],
        ['open_in_full', 'Tap to expand', 'Tap the pill to expand it. When two things are live, it splits in two.'],
        ['tune', 'Customisable', 'Adjust its size, position and what it shows.'],
      ],
      perms: [['Display over other apps', 'to draw the pill around the camera'], ['Notification access', 'to show music, calls and notifications in the pill'], ['Accessibility service (if enabled)', 'to keep the pill above other apps']],
      net: 'Nothing the pill shows leaves your phone.' },
  };
  APPS.forEach(a => Object.assign(a, DETAILS[a.id]));
  const appImg = (a, i) => '/assets/apps/' + a.id + '-' + i + '.webp';
  const appH = a => a.id === 'launcher' ? 1212 : 960;

  const LINKS = {
    github: 'https://github.com/Dinoy-Raj',
    linkedin: 'https://www.linkedin.com/in/dinoy-raj/',
    play: 'https://play.google.com/store/apps/dev?id=8799251775499093729',
    instagram: 'https://www.instagram.com/dinoy__raj',
    x: 'https://x.com/dinoy_raj',
    youtube: 'https://www.youtube.com/channel/UCcc4xZ8XmqN6IGtndij-Flw',
    medium: 'https://dinoyraj.medium.com/',
    sessionize: 'https://sessionize.com/dinoy/',
    linktree: 'https://linktr.ee/dinoyraj',
  };

  const SOCIALS = [
    { label: 'GitHub', icon: 'code', href: LINKS.github },
    { label: 'LinkedIn', icon: 'work', href: LINKS.linkedin },
    { label: 'Google Play', icon: 'shop', href: LINKS.play },
    { label: 'Medium', icon: 'edit_note', href: LINKS.medium },
    { label: 'Sessionize', icon: 'mic', href: LINKS.sessionize },
    { label: 'X', icon: 'tag', href: LINKS.x },
    { label: 'Instagram', icon: 'photo_camera', href: LINKS.instagram },
    { label: 'YouTube', icon: 'smart_display', href: LINKS.youtube },
    { label: 'All links (Linktree)', icon: 'link', href: LINKS.linktree },
  ];

  /* Talks. The first four (home: true) sit in the home page accordion; every talk also has a page of its own at /talks/<slug>.
     Abstracts and takeaways follow the sessions on Sessionize. takeaways: [icon, title, text]. app: the related app's id. */
  const TALKS = [
    { slug: 'adaptive-ux-foldables-multi-window-design', text: 'Bridge the Breakpoint Gap: Training Product Designers for Foldables, Postures, and Multi-Window UX', seoTitle: 'Training Product Designers for Foldables and Multi-Window UX', title: 'Breakpoint gap', sub: 'Adaptive UX · Foldables & large screens', icon: 'open_in_full', tone: 'primary-container',
      seo: 'Talk by Dinoy Raj on training product designers for adaptive Android UX: window size classes, multi-pane layouts, foldable postures, hinges and desktop windowing.',
      abstract: [
        'For years, product designers have relied on static mockups built around standard mobile breakpoints. The rise of foldables, tablets and desktop windowing has broken fixed-frame design for good. Designing for modern form factors is no longer about stretching a single-pane layout to fill a larger screen: it means shifting the whole design team\'s mindset from responsive pages to adaptive behaviours.',
        'This session walks through a complete blueprint for bridging the gap between engineering and design: training designers to think spatially, to embrace hardware physicalities, and to design system components that react to physical postures and multi-window environments. It covers the window size classes every designer needs to know, multi-pane topologies and adaptive navigation, hinge-aware layouts for Tabletop, Book and Flex postures, and why the shifts in Android 17 (forced adaptivity on large screens, Bubbles, desktop windowing and Continue On) make rigid single-window designs feel broken.',
        'It is deliberately cross-functional, aimed at developers, tech leads and design-system owners who need to upskill their design partners, and you leave with practical frameworks, shared vocabulary and Figma-to-Code mapping strategies.'],
      takeaways: [
        ['grid_view', 'A window size class mental model', 'A shared language with designers built on Android\'s canonical width and height size classes, from Compact to Expanded and beyond, instead of fixed device pixels.'],
        ['view_day', 'Multi-pane component specifications', 'Defining List-Detail, Supporting Pane and adaptive navigation inside Figma design systems so components map straight to the Compose Material3 Adaptive APIs.'],
        ['smartphone', 'Hinge and posture UX', 'Teaching designers to respect FoldingFeature boundaries, so actions, dialogs and text never split across a hinge in Tabletop or Book posture.'],
        ['open_in_full', 'Freeform and multi-window readiness', 'Designing for dynamic aspect ratios, taskbar Bubbles and desktop-style resizing without breaking the visual hierarchy.'],
        ['edit_note', 'Design-to-engineering handoff', 'Documenting adaptive states, reflow rules and cross-device handoff triggers in specs to cut engineering friction.']] },
    { slug: 'agentic-android-app-functions', home: true, text: 'Agentic Android: Exposing and Consuming Capabilities with App Functions', seoTitle: 'Agentic Android with App Functions', title: 'App Functions', sub: 'Android 16 · Agentic OS', shape: 'sunny', icon: 'smart_toy', tone: 'highlight',
      seo: 'Android App Functions talk by Dinoy Raj: expose app capabilities to AI agents with androidx.appfunctions and call them from a custom Android launcher.',
      abstract: [
        'Android 16 changes how the OS talks to installed apps. With the android.app.appfunctions package, Android moves away from the rigid deep links of App Actions and Slices toward an agentic model: apps are no longer just destinations to open, but headless toolboxes of capabilities that system agents can call directly.',
        'This session goes past the documentation into a practical implementation of App Functions: wiring up an app to expose its features with the Jetpack androidx.appfunctions library, the @AppFunction annotation, and secure cross-process data with AppFunctionSerializable.',
        'Then the other side: consuming those capabilities. I show a custom Android launcher that queries AppFunctionStaticMetadata and runs tasks from third-party apps through AppFunctionManager, turning an ordinary home screen into an AI-ready intent engine.'],
      takeaways: [
        ['smart_toy', 'The agentic OS shift', 'How the headless execution model of App Functions differs from legacy App Actions, architecturally.'],
        ['code', 'Exposing capabilities', 'Implementing the androidx.appfunctions library, KSP code generation and the PlatformAppFunctionService entry point.'],
        ['stacks', 'Schema and serialization', 'Defining structured parameters that system agents can easily index and call.'],
        ['apps', 'Live launcher demo', 'Querying the on-device index and running App Functions from a custom Android launcher.']],
      app: 'launcher' },
    { slug: 'on-device-ai-gemini-nano-prompt-api', home: true, text: 'Supercharging Android Apps with On-Device AI: Gemini Nano & Prompt API', seoTitle: 'On-Device AI on Android: Gemini Nano & Prompt API', title: 'On-Device AI', sub: 'Gemini Nano in production', shape: 'cookie6', icon: 'auto_awesome', tone: 'primary-container',
      seo: 'On-device AI on Android talk by Dinoy Raj: Gemini Nano, the ML Kit Prompt API, GenAI APIs and MediaPipe LLM Inference in production apps.',
      abstract: [
        'Mobile AI is moving on-device, driven by the need for privacy, low latency and offline use. This session shows how to build intelligent Android apps that run entirely on the phone with Gemini Nano, the ML Kit Prompt API, the ML Kit GenAI APIs and the MediaPipe LLM Inference API.',
        'The centrepiece is a real-world demo: an AI-driven activity booking search built on Gemini Nano with the Prompt API, where prompt design and best practices cut response time from 18 seconds to 3. From there it covers what it takes to design, optimise and ship on-device AI features in consumer and enterprise apps.'],
      takeaways: [
        ['memory', 'The on-device AI landscape', 'Why AI is moving from the cloud to the device, and how Android abstracts it through AICore, LoRA fine-tuning, Private Compute and NPUs.'],
        ['auto_awesome', 'Getting started with Gemini Nano', 'Integrating Gemini Nano in a modern Android app through the ML Kit GenAI APIs and the Prompt API.'],
        ['speed', 'Prompt API in production', 'Designing and optimising prompts for an AI booking search, from 18 s to 3 s per answer.'],
        ['tune', 'Production considerations', 'Model size, device compatibility, privacy and performance lessons from shipping AI features at scale.'],
        ['stacks', 'Beyond Gemini', 'MediaPipe, LiteRT and custom models for specialised on-device tasks.']], app: 'nano' },
    { slug: 'custom-android-launcher', home: true, text: 'Beyond the Grid: Crafting a Custom Android Launcher from Scratch', seoTitle: 'Crafting a Custom Android Launcher from Scratch', title: 'Custom launchers', sub: 'Lightning talk · Jetpack Compose', shape: 'flower5', icon: 'apps', tone: 'tertiary-container',
      seo: 'How to build a custom Android launcher: a talk by Dinoy Raj, creator of Simple Minimalist Launcher, on PackageManager, broadcasts, permissions and OEM quirks.',
      abstract: [
        'As the creator of Simple Minimalist Launcher, a text-based launcher for Android, I have worked through the unusual challenges of replacing one of Android\'s most fundamental components. This talk demystifies building a custom launcher: the app that sits between the user and the Android system.',
        'It cuts straight to the essentials: what a launcher is and where it sits, how to build one in Kotlin and Jetpack Compose, and what to consider when you build a custom home screen experience.'],
      takeaways: [
        ['grid_view', 'The core foundation', 'Using PackageManager to query and manage installed apps, with a clean architecture that keeps the launcher maintainable.'],
        ['notifications_active', 'Staying in sync', 'Using BroadcastReceivers to react instantly to installs, updates and uninstalls, so the home screen is never out of date.'],
        ['rule', 'Navigating the maze', 'Permissions such as QUERY_ALL_PACKAGES, Play policy, OEM quirks and Android version fragmentation.'],
        ['touch_app', 'The accessibility "hack"', 'How Accessibility Services can power features like an app blocker, and the ethics and pitfalls of doing so.']],
      app: 'launcher' },
    { slug: 'offline-rag-android-mediapipe', home: true, text: 'Building Private Brain on Android: Offline RAG with Vector Databases & MediaPipe', seoTitle: 'Offline RAG on Android with MediaPipe', title: 'Offline RAG', sub: 'MediaPipe · Vector DBs', shape: 'clover4', icon: 'memory', tone: 'secondary-container',
      seo: 'Offline RAG on Android talk by Dinoy Raj: local vector search with ObjectBox or Couchbase Lite, Gemma through the MediaPipe LLM Inference API, and LoRA vs RAG.',
      abstract: [
        'Privacy-conscious users and business needs are pushing toward local-first AI. Running a large language model on the device is a good start; the real challenge is making that model smart with your own private data, without the cloud. This session sets up offline Retrieval-Augmented Generation (RAG) on Android.',
        'It shows how to run local vector search with high-performance databases such as ObjectBox or Couchbase Lite to store and query embeddings, and how to build a pipeline that feeds real-time local context into open on-device models such as Gemma through the MediaPipe LLM Inference API. It also answers an architectural question: when should you invest in LoRA fine-tuning instead of the flexibility of RAG?'],
      takeaways: [
        ['stacks', 'Architecting local RAG', 'The building blocks of a retrieval pipeline that never leaves the phone.'],
        ['folder', 'Vector database implementation', 'Storing and querying embeddings with ObjectBox or Couchbase Lite.'],
        ['stream', 'Real-time context injection', 'Feeding local data into Gemma through the MediaPipe LLM Inference API.'],
        ['rule', 'LoRA vs RAG', 'When fine-tuning pays off and when retrieval is the better choice.'],
        ['speed', 'Performance optimisation', 'Keeping on-device retrieval and generation fast.']] },
    { slug: 'gemini-nano-ai-search-production', text: '0ms Latency Dreams vs. NPU Reality: Engineering a Production-Ready AI Search with Gemini Nano', seoTitle: 'Production AI Search with Gemini Nano on Android', title: 'AI search in production', sub: 'Case study · ML Kit Prompt API', icon: 'speed', tone: 'primary-container',
      seo: 'Production case study by Dinoy Raj: an AI search parser on Gemini Nano with the ML Kit Prompt API, cut from 18.3 s to under 1 s with prompt design and prefix caching.',
      abstract: [
        '"Hello World" demos make on-device AI look effortless; shipping it in a production travel app shows a different reality. Traditional search filters are predictable, but they miss the nuance of what people actually mean.',
        'This session goes behind the scenes of replacing rigid UI filters with an AI-driven search parser built on the ML Kit Prompt API: a candid case study of optimising natural-language entity extraction, and how inference time fell from a sluggish 18.3 seconds to under one second by mastering the art of prompting.'],
      takeaways: [
        ['edit_note', 'The prompt evolution', 'The "polite conversation" approach (18 s) against the "structured constraint" approach (5 s).'],
        ['bolt', 'Zero-inference latency', 'Prefix caching to skip static instructions, with a dynamic TODAY_DATE injected for relative dates like "tomorrow".'],
        ['link', 'The logic bridge', 'Chaining calls in Kotlin and mapping Gemini Nano\'s JSON output straight to booking modules.'],
        ['stream', 'Streaming for speed', 'Kotlin Flows and generateContentStream for a UI that feels instant.'],
        ['insights', 'A production reality check', 'Fragmented availability, inconsistent behaviour, and the hybrid fallback built from user feedback.']],
      app: 'nano' },
    { slug: 'mediapipe-llm-lora-android', text: 'Build Your Pocket Brain: Open On-Device LLMs via MediaPipe on Android', seoTitle: 'Open On-Device LLMs via MediaPipe on Android', title: 'Pocket Brain', sub: 'MediaPipe · LoRA', icon: 'memory', tone: 'tertiary-container',
      seo: 'Talk by Dinoy Raj on running open LLMs like Gemma on Android with the MediaPipe LLM Inference API, and fine-tuning them with LoRA for your app.',
      abstract: [
        'MediaPipe\'s LLM Inference API leads the way for Android developers. Beyond running pre-trained models such as Gemma on the device, this session dives into customisation with Low-Rank Adaptation (LoRA), a parameter-efficient fine-tuning (PEFT) technique.',
        'It walks the end-to-end workflow for a specialised on-device LLM: fine-tuning a base model like Gemma or Phi-2 on your own dataset with the PEFT library in Python, converting the base model and LoRA weights to MediaPipe\'s FlatBuffer format, and integrating the result in an Android app by configuring LlmInferenceOptions in Kotlin. The payoff is personalised AI that is fast, works offline and stays private.'],
      takeaways: [
        ['rule', 'Choosing the right tool', 'When to use MediaPipe LLM Inference and when Gemini Nano for on-device generative AI.'],
        ['tune', 'Setup and configuration', 'Configuring MediaPipe LLM Inference, its options and multimodal prompting.'],
        ['auto_awesome', 'LoRA fine-tuning', 'Adapting Gemma-2B or Phi-2 to a specific use case, cost-effectively.'],
        ['shield_lock', 'Deployment and ethics', 'Deployment workflows, GPU-accelerated LoRA inference and responsible AI practice.']] },
    { slug: 'graphql-kotlin-multiplatform', text: 'Write Once, Query Everywhere: Designing a Shared GraphQL Architecture in Kotlin Multiplatform', seoTitle: 'Shared GraphQL Architecture in Kotlin Multiplatform', title: 'GraphQL in KMP', sub: 'Kotlin Multiplatform · Apollo', icon: 'share', tone: 'secondary-container',
      seo: 'Kotlin Multiplatform talk by Dinoy Raj: a shared GraphQL data layer with Apollo Kotlin for Android, iOS and desktop, with caching, auth and Flow.',
      abstract: [
        'As Kotlin Multiplatform grows, the challenge moves from sharing small utilities to sharing complex data layers across Android, iOS, desktop and web. GraphQL gives a type-safe, efficient API, and with Apollo Kotlin\'s multiplatform support all of the networking and data logic can be shared.',
        'This session shows how to put Apollo GraphQL at the heart of a KMP architecture, carrying over what we learned building scalable Android apps with Jetpack Compose to a multiplatform setup. For the short version, see the lightning talk "Architecting the Shared Layer: GraphQL Best Practices in Kotlin Multiplatform".'],
      takeaways: [
        ['stacks', 'Architecture', 'A shared data module serving Android (Compose), iOS (SwiftUI) and desktop.'],
        ['code', 'Type safety', 'Apollo code generation as the single source of truth for the API schema on every platform.'],
        ['tune', 'Best practices', 'Caching, authentication headers and reactive queries with Kotlin Coroutines and Flow.'],
        ['bolt', 'Real-world hurdles', 'Platform-specific configuration and network performance for a consistent experience.']] },
    { slug: 'graphql-kmp-shared-layer', text: 'Architecting the Shared Layer: GraphQL Best Practices in Kotlin Multiplatform', seoTitle: 'GraphQL Best Practices in Kotlin Multiplatform', title: 'KMP shared layer', sub: 'Lightning talk · Kotlin Multiplatform · Apollo', shape: 'clover4', icon: 'stacks', tone: 'tertiary-container',
      seo: 'Lightning talk by Dinoy Raj on Clean Architecture for GraphQL in Kotlin Multiplatform: Apollo Kotlin in commonMain, a shared normalized cache and type-safe errors.',
      abstract: [
        'Clean Architecture in Kotlin Multiplatform needs a robust data layer that keeps complexity away from the UI. Bring GraphQL into the mix and the challenge becomes keeping a strict separation of concerns while still using the full power of the graph on Android and iOS.',
        'This lightning talk explores patterns for integrating Apollo Kotlin directly into the commonMain source set, treating the shared KMP module as the single source of truth so that each platform\'s UI stays purely reactive. For the full setup, see the longer session "Write Once, Query Everywhere".'],
      takeaways: [
        ['stacks', 'Shared normalized cache', 'Apollo\'s cache in the shared data layer as one offline-first source of truth that keeps Android and iOS in sync.'],
        ['category', 'Schema-driven modularity', 'Generated GraphQL models stay in the data layer; mappers expose pure domain entities, so API details never leak into business logic.'],
        ['shield_lock', 'Type-safe error boundaries', 'A unified Result wrapper in the shared repository turns GraphQL partial failures into clean domain states for the UI.']] },
    { slug: 'storytale-compose-multiplatform-design-systems', text: 'Beyond @Preview: Building & Cataloging Compose Multiplatform Design Systems with Storytale', seoTitle: 'Compose Multiplatform Design Systems with Storytale', title: 'Storytale', sub: 'Compose Multiplatform · Design systems', icon: 'palette', tone: 'highlight',
      seo: 'Talk by Dinoy Raj on Storytale, the JetBrains Gradle plugin that brings a Storybook-style component gallery to Compose Multiplatform design systems.',
      abstract: [
        'As a design system grows, developers juggle previews, sample screens, test fixtures, documentation and ever more complex app flows just to answer one question: what does this component look like in all its important states?',
        'This session introduces Storytale, an incubating Gradle plugin from JetBrains that brings a Storybook-style, component-driven workflow to Compose Multiplatform. Instead of hunting for components inside a large app, Storytale generates an interactive gallery where composables are built and explored in isolation. You leave with a practical blueprint for adding it to your pipeline, whether you are migrating to Compose or building a multiplatform design system from scratch.'],
      takeaways: [
        ['tune', 'Setting the stage', 'Configuring the Storytale plugin and structuring commonStories source sets.'],
        ['style', 'Crafting stories', 'Writing isolated states for UI elements, from simple buttons to data-rich layouts.'],
        ['trending_up', 'The developer workflow', 'Using the generated gallery to speed up UI iteration and reviews, and to bridge design and engineering.'],
        ['category', 'Real-world scaling', 'Why isolated component development matters for large, multi-module design systems.']] },
  ];
  TALKS.forEach(t => { t.shape = t.shape || 'cookie9'; });
  const HOME_TALKS = TALKS.filter(t => t.home);

  // addr: the full place, for structured data only (the tickets show `where`). date: the exact day as YYYY-MM-DD, also for
  // structured data only (startDate); without it the JSON-LD falls back to the month, which Google flags as incomplete.
  // talks: what was presented there, as TALKS slugs (linked from the talk's page) or plain titles for sessions without a page;
  // ['slug', 'YYYY-MM-DD', 'room'] adds the session's day and room. up: still to come (shown as Upcoming).
  // online: a virtual event (where: 'Online').
  const EVENTS = [
    { name: 'droidcon India', when: 'Nov 2026', where: 'Bengaluru', addr: 'Bengaluru, India', up: true, date: '2026-11-20', org: 'droidcon', talks: [['adaptive-ux-foldables-multi-window-design', '2026-11-20', '1:20–2:00 pm IST · Junior Ballroom']], site: 'https://india.droidcon.com/' },
    { name: 'DevFest Dar es Salaam', when: 'Nov 2026', where: 'Tanzania', addr: 'Confucius Institute at UDSM, Dar es Salaam, Tanzania', date: '2026-11-07', org: 'GDG Dar es Salaam', talks: ['adaptive-ux-foldables-multi-window-design'], site: 'https://gdg.community.dev/events/details/google-gdg-dar-es-salaam-presents-devfest-dar-es-salaam-2026-kickoff-workshop/' },
    { name: 'Droidcon & Fluttercon Kenya', when: 'Nov 2026', where: 'Nairobi', addr: 'PrideInn Azure Hotel, Westlands, Nairobi, Kenya', date: '2026-11-05', end: '2026-11-06', org: 'droidcon Kenya', talks: ['agentic-android-app-functions'], site: 'https://droidcon.co.ke/' },
    { name: 'DevFest Atlanta', when: 'Oct 2026', where: 'Atlanta', addr: 'Morehouse College, 830 Westview Drive SW, Atlanta, GA 30314, United States', date: '2026-10-30', end: '2026-10-31', org: 'GDG Atlanta', talks: [['mediapipe-llm-lora-android', '2026-10-30', 'SMECC Meeting Rooms B']], site: 'https://gdg.community.dev/gdg-atlanta/' },
    { name: 'droidcon Uganda', when: 'Oct 2026', where: 'Kampala', addr: 'National ICT & Innovation Hub, Nakawa, Kampala, Uganda', date: '2026-10-28', end: '2026-10-29', org: 'droidcon Uganda', talks: ['custom-android-launcher', ['agentic-android-app-functions', '2026-10-29', 'Auditorium']], site: 'https://www.uganda.droidcon.com/' },
    { name: 'droidcon Lisbon', when: 'Oct 2026', where: 'Lisbon', addr: 'Lisbon, Portugal', date: '2026-10-20', end: '2026-10-21', talks: [['storytale-compose-multiplatform-design-systems', '2026-10-20', 'Track 3']], org: 'FIKA IT Solutions', site: 'https://lisbon.droidcon.com/' },
    { name: 'DevFest Vicenza', when: 'Jun 2026', where: 'Italy', addr: 'Vicenza, Italy', date: '2026-06-06', talks: ['offline-rag-android-mediapipe'], org: 'GDG Vicenza', site: 'https://devfestvicenza.it/' },
    { name: 'FOSSASIA Summit', when: 'Mar 2026', where: 'Bangkok', addr: 'True Digital Park, Bangkok, Thailand', date: '2026-03-08', end: '2026-03-10', org: 'FOSSASIA', site: 'https://fossasia.org/' },
    { name: 'DevFest Mumbai', when: 'Dec 2025', where: 'Mumbai', addr: 'Mumbai, India', date: '2025-12-20', talks: ['custom-android-launcher'], org: 'GDG Mumbai' },
    { name: 'Mobile Developers Week', when: 'Dec 2025', where: 'Abu Dhabi', addr: 'Abu Dhabi Energy Centre, Abu Dhabi, United Arab Emirates', date: '2025-12-13', end: '2025-12-15', talks: [['mediapipe-llm-lora-android', '2025-12-15', 'Vertex']], org: 'Omnes Technologies', site: 'https://www.mobiledevelopersweek.com/' },
    { name: 'DevFest Dubai', when: 'Dec 2025', where: 'Dubai', addr: 'Abu Dhabi Energy Centre, Abu Dhabi, United Arab Emirates', date: '2025-12-13', end: '2025-12-15', org: 'GDG Dubai', site: 'https://gdg.community.dev/events/details/google-gdg-dubai-presents-devfest-dubai-2025-end-of-year-showdown/' },
  ];
  // Also on Sessionize; the talks page lists them with the ones above, newest first.
  const MORE_EVENTS = [
    { name: 'DevFest Chennai', when: 'Oct 2026', where: 'Chennai', addr: 'Chennai, India', date: '2026-10-17', talks: ['From Receipts to Smart Search: Productionizing Gemini Nano on Android'], org: 'GDG Chennai', site: 'https://gdg.community.dev/gdg-chennai/' },
    { name: 'Made for Dev by Global AI', when: 'Jun 2026', where: 'Online', online: true, talks: ['mediapipe-llm-lora-android'], org: 'Global AI Community', site: 'https://github.com/GlobalAICommunity/made-for-dev' },
    { name: 'TechMang', when: 'Jan 2026', where: 'Mangaluru', addr: 'Mangaluru, India', date: '2026-01-31', talks: [['on-device-ai-gemini-nano-prompt-api', '2026-01-31', 'AI Talks · Track 1'], ['mediapipe-llm-lora-android', '2026-01-31', 'AI Talks · Track 2']], org: 'Hackerspace Mangaluru', site: 'https://hackersmang.org/' },
    { name: 'DevFest Bujumbura', when: 'Dec 2025', where: 'Burundi', addr: "King's Conference Center, Kinindo, Bujumbura, Burundi", date: '2025-12-20', talks: ['mediapipe-llm-lora-android', 'on-device-ai-gemini-nano-prompt-api'], org: 'GDG Bujumbura', site: 'https://gdg.community.dev/events/details/google-gdg-bujumbura-presents-devfest-bujumbura-2025/' },
    { name: 'IndeHub Zoho Apptics', when: 'Nov 2025', where: 'Chennai', addr: 'Zoho Corporation, Estancia IT Park, Chengalpattu, Tamil Nadu, India', date: '2025-11-22', org: 'IndeHub', site: 'https://luma.com/w2y3tkr1' },
    { name: 'droidcon Uganda', when: 'Nov 2025', where: 'Kampala', addr: 'Kampala, Uganda', date: '2025-11-10', end: '2025-11-11', talks: [['on-device-ai-gemini-nano-prompt-api', '2025-11-10', 'Auditorium']], org: 'droidcon Uganda', site: 'https://www.uganda.droidcon.com/' },
  ];
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const evTime = ev => { const [m, y] = ev.when.split(' '); return +y * 12 + MONTHS.indexOf(m); };
  const isoMonth = when => { const [m, y] = when.split(' '); return y + '-' + String(MONTHS.indexOf(m) + 1).padStart(2, '0'); };
  const slugify = t => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const ALL_EVENTS = [...EVENTS, ...MORE_EVENTS].sort((x, y) => evTime(y) - evTime(x));
  // Every event has its own page at /events/<name-year>, e.g. /events/droidcon-india-2026.
  const eventPath = ev => '/events/' + slugify(ev.name + ' ' + ev.when.split(' ')[1]);
  const evSessions = ev => (ev.talks || []).map(x => { const [k, day, room] = [].concat(x), t = TALKS.find(t => t.slug === k); return { t, title: t ? t.text : k, day, room }; });
  const talkEvents = t => ALL_EVENTS.filter(ev => evSessions(ev).some(x => x.t === t));
  const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayParts = d => { const [y, m, dd] = d.split('-'); return [+dd, MONTHS_LONG[m - 1], y]; };
  const fmtDay = d => dayParts(d).join(' ');
  // "20 November 2026", "5–6 November 2026", "30 November – 1 December 2026", or the month when the day isn't known.
  function evDates(ev) {
    if (!ev.date) { const [m, y] = ev.when.split(' '); return MONTHS_LONG[MONTHS.indexOf(m)] + ' ' + y; }
    if (!ev.end || ev.end === ev.date) return fmtDay(ev.date);
    const [d1, m1, y1] = dayParts(ev.date), [d2, m2, y2] = dayParts(ev.end);
    return m1 === m2 && y1 === y2 ? d1 + '–' + d2 + ' ' + m2 + ' ' + y2 : d1 + ' ' + m1 + (y1 === y2 ? '' : ' ' + y1) + ' – ' + fmtDay(ev.end);
  }
  const evPlace = ev => ev.online ? 'online' : 'in ' + (ev.addr || ev.where).split(', ').slice(-2).join(', ');
  const quoteList = xs => xs.map(x => '“' + x + '”').join(' and ');
  function evSummary(ev) {
    const titles = evSessions(ev).map(x => x.title);
    return (ev.up ? 'Dinoy Raj speaks at ' : 'Dinoy Raj spoke at ') + ev.name + ' ' + evPlace(ev) + ', ' + evDates(ev) + '.'
      + (titles.length ? (titles.length > 1 ? ' Sessions: ' : ' Session: ') + quoteList(titles) + '.' : '');
  }


  /* Talks as an exclusive <details> accordion (name="talks"): the browser handles the keyboard, the expanded state and closing the
     other cards. Pointing at a card with a mouse opens it too (not a tap, whose emulated mouse events would open it before the
     click toggles it shut). The open card's link covers it, so a click anywhere on it opens the talk's page. */
  function TalksStage() {
    const [open, setOpen] = useState(0);
    return html`<div class="acc">
      ${HOME_TALKS.map((t, i) => html`<details key=${t.title} name="talks" class=${'acc-card t-' + t.tone} open=${open === i}
          onPointerEnter=${e => { if (e.pointerType === 'mouse') setOpen(i); }}
          onToggle=${e => { const on = e.currentTarget.open; setOpen(o => on ? i : o === i ? -1 : o); }}>
        <summary class="rail"><span class="eyebrow">0${i + 1}</span><b>${t.title}</b></summary>
        <${ShapeSvg} className="bigshape" view=${1} seq=${FAMILY[t.shape] || [t.shape]} speed=${i % 2 ? -10 : 10} hold=${1800} morph=${1200} />
        <div class="body">
          <span class="eyebrow">${t.sub}</span>
          <h3>${t.text}</h3>
          <a class="meta" href=${'/talks/' + t.slug}><span class="go" aria-hidden="true"><span class="ex-icon" aria-hidden="true" data-icon="arrow_forward"></span></span><span><b>${t.title}</b><span class="sub">Abstract, events and slides</span></span></a>
        </div>
      </details>`)}
    </div>`;
  }

  /* A speaking event as a conference ticket that opens the event's page; the stub carries the month and year. */
  function EventTicket({ ev }) {
    const [mon, yr] = ev.when.split(' ');
    const tone = ev.up ? (ev.name.startsWith('droidcon') ? 'highlight' : 'primary-container') : 'muted';
    return html`<a class=${'tix-item t-' + tone} href=${eventPath(ev)} aria-label=${ev.name + ', ' + evDates(ev) + ', ' + ev.where}>
      <div class="main">
        <div class="row">${ev.up ? html`<span class="live">Upcoming</span>` : html`<span>Speaker</span>`}<span>Admit one</span></div>
        <h3><span>${ev.name}</span></h3>
        <div class="fields"><span>When</span><span>Where</span><b>${ev.when}</b><b>${ev.where}</b></div>
      </div>
      <div class="stub" aria-hidden="true"><span class="mon">${mon}</span><span class="yr">'${yr.slice(2)}</span><span class="bars"></span></div>
    </a>`;
  }

  /* The home page keeps the tickets to two rows and ends them with a ticket to /events counting the rest: five plus this one
     in three columns, three plus this one in two columns or one (the fourth and fifth are hidden there, see .tix-home). */
  const HOME_TIX = 5;
  function MoreTicket() {
    const wide = ALL_EVENTS.length - HOME_TIX, narrow = ALL_EVENTS.length - 3;
    const years = ALL_EVENTS.map(ev => ev.when.split(' ')[1]), span = Math.min(...years) + '–' + Math.max(...years);
    const countries = new Set(ALL_EVENTS.filter(ev => !ev.online).map(ev => (ev.addr || ev.where).split(', ').pop())).size;
    return html`<a class="tix-item tix-more t-ink" href="/events">
      <div class="main">
        <div class="row"><span>All events</span><span>Admit all</span></div>
        <h3><span><span class="n-wide">+${wide} more</span><span class="n-narrow">+${narrow} more</span></span></h3>
        <div class="fields"><span>When</span><span>Where</span><b>${span}</b><b>${countries} countries</b></div>
      </div>
      <div class="stub" aria-hidden="true"><span class="go"><span class="ex-icon" data-icon="arrow_forward"></span></span></div>
    </a>`;
  }

  // published: the exact day as YYYY-MM-DD, for structured data only (datePublished); left out when unknown.
  const BLOGS = [
    { href: 'https://proandroiddev.com/android-adaptive-themed-icons-guide-8e690263f7aa', pub: 'ProAndroidDev', date: 'Apr 2025', title: 'Crafting multi-tone themed app icons in Android', blurb: 'A step-by-step guide to adaptive and themed icons.', art: 'icon' },
    { href: 'https://proandroiddev.com/android-localization-list-formatter-in-android-05659d848a61', pub: 'ProAndroidDev', date: 'Mar 2024', title: 'List Formatter in Android', blurb: 'Internationalization and localization, part 1.', art: 'pair' },
  ];

  /* An article as an Expressive Kit component card: a dotted stage holding live shapes, then a number, publication tag,
     title, two-line blurb and an arrow button. Hovering tightens the corners, spins the arrow and lets a soft glow follow
     the mouse (--mx, --my); the whole card is the link. */
  const ARTICLE_ART = {
    icon: html`<${LiveShape} shape="cookie9" tone="primary" size=${190} />
      <span class="ex-icon" style=${{ position: 'relative', fontSize: '64px', color: 'var(--on-primary)' }} aria-hidden="true" data-icon="android"></span>`,
    pair: html`<${LiveShape} shape="clover4" tone="secondary" size=${150} /><${LiveShape} shape="flower5" tone="highlight" size=${84} />`,
  };
  function spotlight(e) {
    if (e.pointerType !== 'mouse') return;
    const el = e.currentTarget, r = el.getBoundingClientRect();
    el.style.setProperty('--mx', (e.clientX - r.left) + 'px'); el.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }
  function ArticleCard({ b, i }) {
    return html`<a class="ac" href=${b.href} target="_blank" rel="noopener" onPointerMove=${spotlight}>
      <div class="ac-stage" aria-hidden="true">${ARTICLE_ART[b.art]}</div>
      <div class="ac-body">
        <div class="ac-top"><span class="ac-meta">${String(i + 1).padStart(2, '0')} · ${b.date}</span><span class="ac-tag">${b.pub}</span></div>
        <h3><span>${b.title}</span></h3>
        <p>${b.blurb}</p>
        <span class="ac-go" aria-hidden="true"><span class="ex-icon" data-icon="arrow_outward"></span></span>
      </div>
    </a>`;
  }


  const STATEMENT = 'From idea to Play Store. Small, focused apps that feel *alive* when you touch them, built with clear hierarchy, honest colour and springy motion.';

  /* M3 Expressive shape library as polar radius functions, so any two shapes can be blended point by point. */
  const SHAPES = {
    circle: () => 1,
    cookie4: t => 1 + 0.08 * Math.cos(4 * t),
    cookie6: t => 1 + 0.12 * Math.cos(6 * t),
    cookie9: t => 1 + 0.075 * Math.cos(9 * t),
    cookie12: t => 1 + 0.05 * Math.cos(12 * t),
    clover4: t => 0.9 + 0.22 * Math.pow(Math.abs(Math.cos(2 * t)), 1.6),
    flower5: t => 1 + 0.16 * Math.cos(5 * t),
    flower8: t => 1 + 0.17 * Math.cos(8 * t),
    sunny: t => 1 + 0.04 * Math.cos(8 * t + 0.4),
    burst: t => 1 + 0.13 * Math.cos(10 * t),
    pebble: t => 0.94 + 0.12 * Math.cos(3 * t),
  };
  const N = 144;
  const RADII = {};
  /* Normalised radii for a shape, sampled once, so blends and live morphs are just array lerps. */
  function radii(name) {
    if (RADII[name]) return RADII[name];
    const f = SHAPES[name] || SHAPES.circle, a = new Float32Array(N); let m = 0;
    for (let i = 0; i < N; i++) { a[i] = f(i / N * 2 * Math.PI); m = Math.max(m, a[i]); }
    for (let i = 0; i < N; i++) a[i] /= m;
    return (RADII[name] = a);
  }
  const COS = new Float32Array(N), SIN = new Float32Array(N);
  for (let i = 0; i < N; i++) { const t = i / N * 2 * Math.PI - Math.PI / 2; COS[i] = Math.cos(t); SIN[i] = Math.sin(t); }
  function pathOf(r) {
    let d = '';
    for (let i = 0; i < N; i++) d += (i ? 'L' : 'M') + (r[i] * COS[i]).toFixed(3) + ' ' + (r[i] * SIN[i]).toFixed(3);
    return d + 'Z';
  }
  function morphPath(a, b, p) {
    const ra = radii(a), rb = radii(b), r = new Float32Array(N);
    for (let i = 0; i < N; i++) r[i] = (1 - p) * ra[i] + p * rb[i];
    return pathOf(r);
  }
  const easeInOut = p => p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
  const backOut = p => 1 + 2.2 * Math.pow(p - 1, 3) + 1.2 * Math.pow(p - 1, 2);
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* One shared frame loop for every visible shape. */
  const LIVE = new Set(); let liveRaf = 0;
  function liveLoop(now) { liveRaf = 0; LIVE.forEach(f => f(now)); if (LIVE.size) liveRaf = requestAnimationFrame(liveLoop); }
  function liveAdd(f) { LIVE.add(f); if (!liveRaf) liveRaf = requestAnimationFrame(liveLoop); }

  /* Each M3 shape morphs through a few close relatives so its footprint stays familiar. */
  const FAMILY = {
    circle: ['circle', 'cookie12', 'sunny'], cookie4: ['cookie4', 'clover4', 'cookie9'], cookie6: ['cookie6', 'flower5', 'cookie12'],
    cookie9: ['cookie9', 'flower8', 'cookie6'], cookie12: ['cookie12', 'sunny', 'cookie9'], clover4: ['clover4', 'cookie4', 'pebble'],
    flower5: ['flower5', 'cookie6', 'burst'], flower8: ['flower8', 'burst', 'cookie9'], sunny: ['sunny', 'cookie12', 'flower8'],
    burst: ['burst', 'flower8', 'cookie12'], pebble: ['pebble', 'clover4', 'cookie6'],
  };
  let liveSeed = 0;

  /* Keeps a path rotating and morphing through seq: hold, then blend into the next shape.
     When seq changes (a button toggles) it blends from wherever it is to the new first shape, with an optional springy turn. */
  function useLiveShape(pathRef, seq, { speed = 18, hold = 1600, morph = 1000, snap = 460, kick = 0 } = {}) {
    const st = useRef(null);
    const opts = useRef(null); opts.current = { speed, hold, morph };
    const key = seq.join('|');
    if (!st.current) {
      const r = radii(seq[0]);
      st.current = { seq, idx: 0, cur: r.slice(), from: r, to: r, phase: 'hold', dur: morph, t0: 0, ang: (liveSeed++ * 47) % 360, last: 0, kick: 0, k0: 0, dirty: true };
    }
    useEffect(() => {
      const el = pathRef.current; if (!el) return;
      const s = st.current;
      if (reduced()) { el.setAttribute('d', pathOf(radii(seq[0]))); return; }
      s.t0 = performance.now() - Math.random() * hold;
      const tick = now => {
        const o = opts.current, dt = s.last ? Math.min(64, now - s.last) : 0; s.last = now;
        s.ang = (s.ang + o.speed * dt / 1000) % 360;
        if (s.phase === 'hold' && now - s.t0 >= o.hold && s.seq.length > 1) {
          s.idx = (s.idx + 1) % s.seq.length; s.from = s.cur.slice(); s.to = radii(s.seq[s.idx]); s.phase = 'morph'; s.dur = o.morph; s.t0 = now;
        }
        if (s.phase === 'morph') {
          const p = Math.min(1, (now - s.t0) / s.dur), e = easeInOut(p);
          for (let i = 0; i < N; i++) s.cur[i] = s.from[i] + (s.to[i] - s.from[i]) * e;
          if (p >= 1) { s.phase = 'hold'; s.t0 = now; }
          s.dirty = true;
        }
        if (s.dirty) { el.setAttribute('d', pathOf(s.cur)); s.dirty = false; }
        let extra = 0;
        if (s.kick) { const p = Math.min(1, (now - s.k0) / 620); extra = s.kick * backOut(p); if (p >= 1) { s.ang = (s.ang + s.kick) % 360; s.kick = 0; extra = 0; } }
        el.setAttribute('transform', 'rotate(' + (s.ang + extra).toFixed(2) + ')');
      };
      s.tick = tick;
      const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { s.last = 0; liveAdd(tick); } else LIVE.delete(tick); });
      io.observe(el.ownerSVGElement);
      return () => { LIVE.delete(tick); io.disconnect(); };
    }, []);
    const first = useRef(true);
    useEffect(() => {
      if (first.current) { first.current = false; return; }
      const el = pathRef.current, s = st.current; if (!el) return;
      s.seq = seq; s.idx = 0;
      if (reduced()) { s.cur = radii(seq[0]).slice(); el.setAttribute('d', pathOf(s.cur)); return; }
      const now = performance.now();
      if (s.kick) s.ang = (s.ang + s.kick) % 360;
      s.from = s.cur.slice(); s.to = radii(seq[0]); s.phase = 'morph'; s.dur = snap; s.t0 = now;
      s.kick = kick; s.k0 = now;
      if (s.tick) liveAdd(s.tick);
    }, [key]);
  }

  /* Caps how far the O stretches so the line, squeezed to 64%, never outgrows the heading: up to 2.2em.
     .sw-probe is a hidden copy of the word's letters held at 64% width, so measuring it needs no DOM change. */
  const PILL_MAX = 2.2, PILL_MIN = 0.78;
  function fitPill(sw) {
    const box = sw.closest('h1'), probe = sw.querySelector('.sw-probe'); if (!box || !probe) return null;
    const fs = parseFloat(getComputedStyle(box).fontSize) || 1;
    const room = (box.clientWidth * 0.97 - probe.getBoundingClientRect().width) / fs - 0.02; // keep a little air at the edges
    return Math.max(PILL_MIN, Math.min(PILL_MAX, room)).toFixed(3) + 'em';
  }

  /* A word whose first O is drawn as a shape (see .glyph-o). Text either side stays one run so kerning holds.
     The letters are CSS generated content (.sw-t), so the indexed heading reads only the sr-only text, not "Andrid Develper". */
  function ShapeWord({ word, delay = '0s' }) {
    const ref = useRef(null);
    const i = word.toUpperCase().indexOf('O');
    useEffect(() => {
      const sw = ref.current, box = sw && sw.closest('h1'), probe = sw && sw.querySelector('.sw-probe'); if (!box || !probe) return;
      // ResizeObserver calls back right after layout, so fitPill's reads force no reflow. The write waits for the next
      // frame so it never dirties layout between two words' reads. Watching the probe catches the web font swapping in.
      let raf = 0;
      const ro = new ResizeObserver(() => {
        const pill = fitPill(sw); cancelAnimationFrame(raf);
        if (pill) raf = requestAnimationFrame(() => sw.style.setProperty('--pill', pill));
      });
      ro.observe(box); ro.observe(probe);
      return () => { ro.disconnect(); cancelAnimationFrame(raf); };
    }, [word]);
    const a = word.slice(0, i), z = word.slice(i + 1);
    return html`<span class="sw" ref=${ref} style=${{ '--d': delay }}><span class="sw-t" data-t=${a}></span><span class="glyph-o"></span><span class="sw-t" data-t=${z}></span><span class="sw-probe"><span class="sw-t" data-t=${a}></span><span class="sw-t" data-t=${z}></span></span></span>`;
  }

  /* A bare living svg, for buttons that style their own svg. */
  function ShapeSvg({ seq, view = 1.1, fill, className, ...o }) {
    const ref = useRef(null);
    useLiveShape(ref, seq, o);
    return html`<svg class=${className} viewBox=${-view + ' ' + -view + ' ' + 2 * view + ' ' + 2 * view} aria-hidden="true"><path ref=${ref} style=${fill ? { fill } : undefined} d=${pathOf(radii(seq[0]))} /></svg>`;
  }

  /* Free-floating decorative shape. */
  function MorphShape({ className, ...o }) {
    return html`<span class=${'morph ' + (className || '')} aria-hidden="true"><${ShapeSvg} ...${o} /></span>`;
  }

  /* Living drop-in for the kit's ShapeAvatar: same tones and icon, but it keeps turning and morphing. The icon stays upright. */
  function LiveShape({ shape = 'cookie9', seq, tone = 'primary-container', icon, size = 40, className, speed, hold, morph }) {
    const s = seq || FAMILY[shape] || [shape];
    const dir = useRef(liveSeed % 2 ? -1 : 1).current;
    return html`<span class=${'ex-shape t-' + tone + (className ? ' ' + className : '')} style=${{ width: size, height: size }} aria-hidden="true">
      <${ShapeSvg} seq=${s} view=${1} speed=${speed != null ? speed : dir * 16} hold=${hold || 1700} morph=${morph || 1100} />
      ${icon && html`<span class="ex-shape-c"><span class="ex-icon is-filled" data-icon=${icon} style=${{ fontSize: Math.round(size * 0.5) }} aria-hidden="true"></span></span>`}
    </span>`;
  }

  /* Runs fn once, right after the next layout, when reading geometry is free (no forced reflow). Returns a cancel function. */
  function afterLayout(fn) {
    const ro = new ResizeObserver(() => { ro.disconnect(); fn(); });
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }

  /* Browsers with CSS scroll-driven animations run the statement from CSS, off the main thread (see .statement in the page
     styles). Older ones fall back to the scroll listener below. */
  const scrollDriven = () => typeof CSS !== 'undefined' && CSS.supports('animation-timeline: scroll()');

  /* Shows the progressive top blur once the page has scrolled. */
  function TopBlur() {
    const [on, setOn] = useState(false);
    useEffect(() => {
      const f = () => setOn(scrollY > 8);
      const stop = afterLayout(f); addEventListener('scroll', f, { passive: true });
      return () => { stop(); removeEventListener('scroll', f); };
    }, []);
    return html`<div class=${'top-blur' + (on ? ' on' : '')} aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>`;
  }

  function Nav() {
    const [open, setOpen] = useState(false);
    const panelRef = useRef(null), btnRef = useRef(null), navRef = useRef(null);
    const [panelH, setPanelH] = useState(0);
    useEffect(() => {
      // Measured from a ResizeObserver (after layout, so no forced reflow); it also catches the panel reflowing when fonts load.
      const panel = panelRef.current; if (!panel) return;
      const ro = new ResizeObserver(() => setPanelH(panel.scrollHeight));
      ro.observe(panel); return () => ro.disconnect();
    }, []);
    useEffect(() => {
      const k = e => { if (e.key === 'Escape' && open) { setOpen(false); btnRef.current && btnRef.current.focus(); } };
      addEventListener('keydown', k); return () => removeEventListener('keydown', k);
    }, [open]);
    const links = [['Apps', '#apps'], ['Services', '#services'], ['Talks', '#talks'], ['Blogs', '#blogs'], ['Contact', '#contact']];
    const close = () => setOpen(false);
    // The whole bar is a tap target for the menu, not just the round button (whose click bubbles up here; it stays the keyboard control).
    // Closed, a tap on the name opens the menu too; open, it closes the menu and follows its link to the top.
    // Enter on the focused name (a click with detail 0) still just follows the link.
    const onRow = e => {
      if (e.target.closest('.nav-name')) { if (open || !e.detail) return close(); e.preventDefault(); }
      setOpen(!open);
    };
    return html`<${React.Fragment}>
      <div class=${'nav-scrim' + (open ? ' on' : '')} onClick=${close}></div>
      <header ref=${navRef} class=${'nav' + (open ? ' open' : '')} style=${{ height: open ? 60 + panelH + 'px' : '60px' }}>
        <div class="nav-row" onClick=${onRow}>
          <a class="nav-name" href="#top">${NAME}</a>
          <button ref=${btnRef} type="button" class="menu-btn" aria-expanded=${open} aria-controls="nav-panel" aria-label=${open ? 'Close menu' : 'Open menu'}>
            <${ShapeSvg} view=${1.15} seq=${open ? ['cookie9', 'flower8'] : ['cookie4', 'cookie6', 'clover4']} speed=${open ? 40 : 14} hold=${1500} morph=${800} kick=${open ? 90 : -90} />
            <span class="ex-icon i-more" aria-hidden="true" data-icon="more_horiz"></span>
            <span class="ex-icon i-close" aria-hidden="true" data-icon="close"></span>
          </button>
        </div>
        <div class="nav-panel" id="nav-panel" ref=${panelRef} inert=${open ? undefined : ''}>
          <nav aria-label="Sections">
            ${links.map(([l, h], i) => html`<a key=${h} class="lnk rv" style=${{ '--i': i }} href=${h} onClick=${close}>
              <span><span class="num" data-n=${'0' + (i + 1)} aria-hidden="true"></span>${l}</span>
              <span class="go"><${ShapeSvg} seq=${['cookie6', 'flower5', 'cookie9']} speed=${30} hold=${900} morph=${700} /><span class="ex-icon" aria-hidden="true" data-icon="arrow_outward"></span></span>
            </a>`)}
          </nav>
          <div class="nav-foot rv" style=${{ '--i': links.length }}>
            <span class="status"><span class="dot" aria-hidden="true"><span class="ring"><${ShapeSvg} seq=${['sunny', 'cookie12']} speed=${-24} hold=${900} morph=${700} /></span><${ShapeSvg} seq=${['cookie9', 'flower8', 'burst', 'clover4', 'cookie12']} fill="var(--live)" speed=${48} hold=${800} morph=${650} /><span class="ex-icon" aria-hidden="true" data-icon="bolt"></span></span><span><b>Available</b> for <span class="em">work</span></span></span>
            <a href="#contact" onClick=${close}>Say hello<span class="ex-icon" style=${{ fontSize: '18px' }} aria-hidden="true" data-icon="waving_hand"></span></a>
          </div>
        </div>
      </header>
    <//>`;
  }

  /* The footer's giant name. Each letter reads its --p (0 to 1) from the pointer's distance to it; CSS turns that into
     weight, width, lift and colour. Letter centres are read once per hover, so the letters changing width do not feed back. */
  function Wordmark({ text }) {
    const ref = useRef(null);
    useEffect(() => {
      const el = ref.current; if (!el) return;
      const ls = [...el.querySelectorAll('.wm-l')];
      let cs = [], reach = 1, x = null, raf = 0;
      const paint = () => { raf = 0; ls.forEach((l, i) => {
        const p = x === null ? 0 : Math.max(0, 1 - Math.abs(x - cs[i].c) / reach);
        l.style.setProperty('--p', p.toFixed(3));
      }); };
      const queue = () => { if (!raf) raf = requestAnimationFrame(paint); };
      const enter = e => { if (e.pointerType !== 'mouse') return; cs = ls.map(l => { const r = l.getBoundingClientRect(); return { c: r.left + r.width / 2, w: r.width }; }); reach = 1.4 * cs.reduce((a, c) => a + c.w, 0) / cs.length; };
      const move = e => { if (e.pointerType !== 'mouse' || !cs.length) return; x = e.clientX; queue(); };
      const leave = () => { x = null; queue(); };
      const down = e => {
        if (e.pointerType === 'mouse') return;
        el.classList.remove('wave'); void el.offsetWidth; el.classList.add('wave'); // restart the wave on every tap
      };
      const end = e => { if (e.target === ls[ls.length - 1]) el.classList.remove('wave'); };
      el.addEventListener('pointerenter', enter); el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave);
      el.addEventListener('pointerdown', down); el.addEventListener('animationend', end);
      return () => {
        cancelAnimationFrame(raf);
        el.removeEventListener('pointerenter', enter); el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave);
        el.removeEventListener('pointerdown', down); el.removeEventListener('animationend', end);
      };
    }, [text]);
    return html`<div class="wordmark" ref=${ref} aria-hidden="true">${[...text].map((t, i) => html`<span key=${i} class="wm-l" style=${{ '--i': i }} data-t=${t}></span>`)}</div>`;
  }

  function Statement() {
    const ref = useRef(null);
    const words = STATEMENT.split(' ').map(w => ({ acc: w.startsWith('*'), t: w.replace(/\*/g, '') }));
    const [lit, setLit] = useState(words.length);
    useEffect(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches || scrollDriven()) return;
      let raf = 0;
      const calc = () => {
        raf = 0; const el = ref.current; if (!el) return;
        const r = el.getBoundingClientRect(), vh = innerHeight;
        const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
        setLit(Math.max(1, Math.round(p * words.length)));
      };
      const on = () => { if (!raf) raf = requestAnimationFrame(calc); };
      const stop = afterLayout(() => { calc(); requestAnimationFrame(() => requestAnimationFrame(() => ref.current && ref.current.classList.add('ready'))); });
      addEventListener('scroll', on, { passive: true }); addEventListener('resize', on);
      return () => { stop(); cancelAnimationFrame(raf); removeEventListener('scroll', on); removeEventListener('resize', on); };
    }, []);
    return html`<section class="statement wrap" aria-label="Statement"><p ref=${ref}><span class="sr-only">${STATEMENT.replace(/\*/g, '')}</span>
      ${words.map((w, i) => html`<span key=${i} aria-hidden="true" class=${'w' + (w.acc ? ' hl' : '') + (i < lit ? ' on' : '')} style=${{ '--a': (i / words.length).toFixed(4), '--b': ((i + 1) / words.length).toFixed(4) }}>${w.t}${' '}</span>`)}
    </p></section>`;
  }

  function AppCard({ a }) {
    return html`<article class=${'app' + (a.featured ? ' featured' : '')} aria-labelledby=${'app-' + a.id} style=${{ viewTransitionName: 'app-' + a.id }}>
              <div class="media" style=${{ background: a.bg }}>
                <div class="shots">${a.shots.map((alt, i) => html`<img key=${i} src=${appImg(a, i + 1)} srcset=${appImg(a, (i + 1) + '-270') + ' 270w, ' + appImg(a, i + 1) + ' 540w'} sizes="(max-width: 760px) 30vw, 210px" alt=${a.name + ': ' + alt} width="540" height=${appH(a)} loading="lazy" decoding="async" />`)}</div>
              </div>
              <div class="app-meta">
                <img class="icon" src=${'/assets/apps/' + a.id + '-icon.webp'} alt="" width="56" height="56" loading="lazy" />
                <div class="name"><h3 id=${'app-' + a.id}><span>${a.name}</span></h3><div class="store muted">${a.store}</div></div>
              </div>
              <p class="desc muted">${a.desc}</p>
              <div class="tags">${a.status && html`<span class=${'chip ' + a.status}>${a.status === 'live' ? 'On Google Play' : 'In development'}</span>`}${a.tags.map(t => html`<span key=${t}>${t}</span>`)}</div>
              <div class="links"><a class="link-arrow open" href=${'/' + a.slug} aria-label=${a.name + ' details'}>Details<span class="ex-icon" aria-hidden="true" data-icon="arrow_forward"></span></a><${AppLinks} a=${a} /></div>
            </article>`;
  }

  function AllApps({ enter }) {
    return html`<main id="top" class="all-apps wrap" data-enter=${enter}>
      <a class="link-arrow back" href="#apps"><span class="ex-icon" aria-hidden="true" data-icon="arrow_back"></span>Back to home</a>
      <div class="apps-head">
        <div>
          <h1 class="sec-title">All<br/> Apps</h1>
          <p class="muted">All ${APPS.length} Android apps I've designed and built in Kotlin and Jetpack Compose. Screenshots are the apps' own store screens.</p>
        </div>
        <a class="link-arrow" href=${LINKS.play} target="_blank" rel="noopener">Google Play profile<span class="ex-icon" aria-hidden="true" data-icon="arrow_outward"></span></a>
      </div>
      <h2 class="sr-only">Apps</h2>
      <div class="apps-grid">${APPS.map(a => html`<${AppCard} key=${a.id} a=${a} />`)}</div>
      <div class="apps-end">
        <p class="muted">Install them, read the reviews and get updates on Google Play.</p>
        <a class="link-arrow" href=${LINKS.play} target="_blank" rel="noopener">See all on Google Play<span class="ex-icon" aria-hidden="true" data-icon="arrow_outward"></span></a>
      </div>
    </main>`;
  }

  function AppLinks({ a }) {
    return a.links ? a.links.map(([l, h]) => html`<a key=${h} class="link-arrow" href=${h} target="_blank" rel="noopener" aria-label=${a.name + ': ' + l}>${l}<span class="ex-icon" aria-hidden="true" data-icon="arrow_outward"></span></a>`) : null;
  }

  /* Simple Minimalist Launcher's feature bento, on /minimalistlauncher below the title and description. Every tile is drawn in HTML and CSS rather than shipped as an
     image, so it stays sharp at any size and can move. Sizes are design pixels (--u, set from the container's width in index.html),
     and the grid re-flows from six columns to three and two. The clocks and counters tick once a second, only while the bento is
     on screen and only when the visitor hasn't asked for reduced motion; everything else is CSS animation. */
  const LB_HABIT = '11011111110111011111011111111111100'; // 7 x 5 days, 1 = done
  const LB_PINS = [['Phone', '12 M'], ['Messages', '48 M'], ['Camera', '6 M'], ['Music', '1 H 05 M']];
  const LB_WEEK = [[87, 63], [67, 80], [80, 53], [50, 70], [73, 47], [100, 87], [60, 40]]; // bar heights, % of 3h: this week, this month
  const LB_TODO = [
    ['Send invoice', 'High', 'Work', 'Today', 'hi'],
    ['Call mom', null, 'Home', null, 'swipe'],
    ['Renew passport', 'Very high', null, 'Yesterday', 'vh'],
    ['Plan weekend', null, 'Home', 'Sat', ''],
  ];
  const lbTime = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  // A scalloped "cookie" outline, like the launcher's badges: n bumps around a circle in a 0..1 box.
  const lbCookie = (n, depth) => 'M' + Array.from({ length: 96 }, (_, i) => {
    const a = i / 96 * Math.PI * 2, r = 0.5 - depth + depth * Math.cos(n * a);
    return (0.5 + r * Math.cos(a)).toFixed(3) + ' ' + (0.5 + r * Math.sin(a)).toFixed(3);
  }).join('L') + 'Z';
  const LB_COOKIE = lbCookie(9, 0.045), LB_RING = lbCookie(8, 0.06);

  function LauncherBento() {
    const ref = useRef(null);
    const [t, setT] = useState(0);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      let seen = true, id = 0;
      const io = new IntersectionObserver(([e]) => { seen = e.isIntersecting; el.classList.toggle('lb-off', !seen); });
      io.observe(el);
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) id = setInterval(() => { if (seen && !document.hidden) setT(n => n + 1); }, 1000);
      return () => { clearInterval(id); io.disconnect(); };
    }, []);
    const I = (name, c) => html`<span class=${'ex-icon' + (c ? ' ' + c : '')} aria-hidden="true" data-icon=${name}></span>`;
    const ring = c => html`<svg class=${'lb-ring ' + c} viewBox="0 0 1 1"><path d=${LB_RING} /></svg>`;
    return html`<div class="lb-wrap" ref=${ref} role="img" aria-label="Simple Minimalist Launcher at a glance: a quiet text-only home screen, focus sessions, mindful pauses before distracting apps, a habit tracker, a day summary, meetings as sticky notes, a to-do list, a screen time detox chart, more than 250 widgets, app timers, a dynamic island, a reel blocker, a notification blocker, custom themes and fonts, and a layout you build yourself.">
      <div class="lb" aria-hidden="true">

        <div class="lb-t lb-focus">
          <div class="lb-pill"><svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" /><circle class="arc" cx="10" cy="10" r="7" pathLength="100" /></svg><span>Focus ${lbTime(1500 - t % 1500)}</span></div>
          <b class="lb-h">Focus sessions</b>
        </div>

        <div class="lb-t lb-mind">
          <div class="lb-breathe"><i></i><i></i><span>BREATHE</span></div>
          <b class="lb-h">Mindful pause</b>
          <span class="lb-s">A breath before<br />the scroll opens</span>
        </div>

        <div class="lb-t lb-theme">
          <div class="lb-float">
            <i class="o"></i><span class="c c1">Aa</span><i class="bl"></i><span class="c c2">Aa</span><i class="sq"></i><i class="pk"></i><span class="c c3">Aa</span>
          </div>
          <b class="lb-h">Craft your theme</b>
          <span class="lb-s">Bring your own font</span>
        </div>

        <div class="lb-t lb-home">
          <div class="lb-ph">
            <div class="lb-st"><span>9:41</span><i></i><span>100%</span></div>
            <div class="lb-clock">
              <div class="hm"><b>09</b><b>41</b></div>
              <div class="side"><span>Mon,<br />16 Nov</span><div class="wheel"><div>${[22, 23, 24, 25, 26, 27].map(n => html`<span key=${n}>${n}</span>`)}</div></div></div>
            </div>
            <ul class="lb-pins">${LB_PINS.map(([n, m], i) => html`<li key=${n} style=${{ '--i': i }}><span>${n}</span><small>${m}</small></li>`)}</ul>
            <div class="lb-month"><span><b>November</b><small>• 16 / 30</small></span><div class="dots">${Array.from({ length: 16 }, (_, i) => html`<i key=${i} class=${i === 0 ? 'on' : ''}></i>`)}</div></div>
          </div>
          <b class="lb-h">A quiet home</b>
        </div>

        <div class="lb-t lb-habit">
          <div class="top"><b>12</b><span>day<br />streak</span><em>Morning run</em></div>
          <div class="grid">${LB_HABIT.split('').map((c, i) => html`<i key=${i} class=${i === 33 ? 'today' : c === '1' ? 'on' : ''} style=${{ '--i': i }}></i>`)}</div>
          <b class="lb-h">Habit tracker</b>
          <span class="lb-s">Build habits or quit them</span>
        </div>

        <div class="lb-t lb-day">
          <div class="top"><b>Mon<i></i></b><span>November 16<br /><small>2026</small></span></div>
          <p>${[
            ['Good morning,'], ['Dino.', 1], ['You have'], [html`${I('calendar_today')}2 meetings,`, 1], [html`${I('check_box')}4 tasks`, 1], ['and'],
            [html`${I('repeat')}2 habits`, 1], ['left today. You’re free after'], ['4:30 PM.', 1], ['You finished'], [html`${I('filter_center_focus')}2 focus sessions.`, 1],
          ].map(([text, b], i) => html`<span key=${i} class=${'lb-w' + (b ? ' b' : '')} style=${{ '--i': i }}>${text}${' '}</span>`)}</p>
          <div class="stats">
            <span>${I('smartphone', 'or')}2h 14m screen time</span><span>${I('filter_center_focus', 'gr')}50m focused</span>
            <span>${I('bedtime', 'pu')}7.2 hr sleep</span><span>${I('directions_walk', 'bu')}6.4K steps</span>
          </div>
          <span class="lab">DAY SUMMARY</span>
          <div class="badge"><svg viewBox="0 0 1 1"><path d=${LB_COOKIE} /></svg>${I('calendar_view_month')}<b>×2</b></div>
        </div>

        <div class="lb-t lb-meet">
          <div class="stk"><div class="n back"></div><div class="n"><b>10:30</b><span>Design<br />review</span></div></div>
          <div class="txt"><b class="lb-h">Meetings</b><span class="lb-s">Pinned up as sticky notes, with reminders</span></div>
        </div>

        <div class="lb-t lb-todo">
          <b class="lb-h">To-do list</b>
          <div class="lb-ph">
            <div class="lb-st"><span>9:41</span><i></i><span>100%</span></div>
            <div class="bar"><b>To-do</b><span><em>3/7</em><em>${I('local_fire_department', 'fi')}5</em></span></div>
            <div class="chips"><span>All <small>7</small></span><span class="sel">Today <small>3</small></span><span><i class="dot bu"></i>Work <small>2</small></span></div>
            ${LB_TODO.map(([n, p, tag, when, k]) => html`<div key=${n} class=${'row ' + k}>
              ${k === 'swipe' && html`<span class="done">${I('check')}Done</span>`}
              <div class="card">
                ${ring(k)}
                <span class="tx"><b>${n}</b><small>${p && html`<span class="pr">${I('flag', 'is-filled')}${p}</span>`}${tag && html`<span><i class=${'dot ' + (tag === 'Work' ? 'bu' : 'gr')}></i>${tag}</span>`}</small></span>
                ${k === 'hi' && html`<em class="sub">◔ 1/3</em>`}
                ${when && html`<em class=${'when' + (when === 'Yesterday' ? ' late' : '')}>• ${when}</em>`}
              </div>
            </div>`)}
            <span class="cap">Completed · 1</span>
            <div class="row fin"><div class="card">${I('check_circle', 'is-filled')}<span class="tx"><b>Buy groceries</b><small><span><i class="dot gr"></i>Home</span></small></span><em class="when">• Today</em></div></div>
          </div>
        </div>

        <div class="lb-t lb-hero">
          <div class="in"><i class="ico"></i><b>Simple Minimalist Launcher</b></div>
          <span>A minimalist launcher for Android</span>
        </div>

        <div class="lb-t lb-detox">
          <div class="seg"><i class="thumb"></i><span>D</span><span>W</span><span>M</span><span>3M</span><span>Y</span></div>
          <div class="cap"><b><span class="a">This week</span><span class="b">This month</span></b><span class="big">2h 12m <small>/ day avg</small></span></div>
          <div class="chart">
            <div class="lines"><span>3h</span><span>2h</span><span>1h</span></div>
            <div class="bars">${LB_WEEK.map(([a, b], i) => html`<div key=${i}><i style=${{ '--a': a + '%', '--b': b + '%', '--i': i }}></i><small>${'MTWTFSS'[i]}</small></div>`)}</div>
          </div>
          <div class="foot"><b class="lb-h">Detox</b><em>${I('arrow_downward')}18% this week</em></div>
        </div>

        <div class="lb-t lb-wid">
          <div class="txt"><b class="n">250+</b><b class="w">widgets</b><span class="lb-s">Clock, weather, music, screen time, quick tiles, nine games, or build your own</span></div>
          <div class="lb-ph">
            <div class="lb-st"><span>9:41</span><i></i><span>100%</span></div>
            <div class="w-card st"><span><small>Screen time</small><b>1h 52m</b><em>−34m vs avg</em></span><div class="mini">${[40, 75, 55, 90, 30].map((h, i) => html`<i key=${i} style=${{ '--h': h + '%', '--i': i }}></i>`)}</div></div>
            <div class="w-row">
              <div class="w-card snake"><small>SNAKE</small><div class="pit"><i class="apple"></i>${[0, 1, 2, 3, 4].map(i => html`<i key=${i} class="seg" style=${{ '--i': i }}></i>`)}</div></div>
              <div class="w-card batt"><small>BATTERY</small><b>82%</b><div class="lvl"><i></i></div></div>
            </div>
          </div>
        </div>

        <div class="lb-t lb-timer">
          <div class="card">
            <div class="hd"><span>Instagram · left today</span><em>On track</em></div>
            <b>12m</b>
            <div class="prog"><i></i></div>
            <div class="meta"><span>18 of 30 min</span><span>3 opens left</span></div>
            <div class="lock"><span>Locked until</span><b>Tomorrow</b></div>
          </div>
          <b class="lb-h">App timers</b>
        </div>

        <div class="lb-t lb-island">
          <div class="txt"><b>Dynamic island</b><span>Music, focus and charging,<br />grown out of the camera</span></div>
          <div class="ph"><div class="pill">
            <span class="ring">${I('pause', 'is-filled')}</span>
            <span class="tx"><small>Focus · Deep work</small><b>${lbTime(1452 - t % 1452)}</b></span>
            <small class="of">2 of 4</small>
          </div></div>
        </div>

        <div class="lb-t lb-reel">
          <div class="mini">${I('arrow_upward', 'up')}<div class="scr">${I('lock', 'is-filled')}<small>BLOCKED</small></div></div>
          <div class="txt"><span class="k"><b>${128 + Math.floor(t / 3)}</b> reels skipped</span><span class="lb-s">9 storeys of scrolling</span><b class="lb-h">Reel blocker</b></div>
        </div>

        <div class="lb-t lb-notif">
          <div class="stack">
            <div class="nt n3"><i class="pe"></i><span><b>Promo</b><small>50% off today</small></span></div>
            <div class="nt n2"><i class="gn"></i><span><b>Group chat</b><small>12 new messages</small></span></div>
            <div class="nt n1"><i></i><span><b>Held for later</b><small>Digest at 6 PM</small></span></div>
          </div>
          <div class="txt"><span class="k"><b>${23 + Math.floor(t / 5)}</b> held</span><b class="lb-h">Notification<br />blocker</b></div>
        </div>

        <div class="lb-t lb-layout">
          <div class="frame">
            <div class="clk">9:41</div>
            <div class="split"><i class="a"></i><i class="b"><s></s><s></s></i></div>
            <div class="list"><span>Phone</span><span>Messages</span><span>Camera</span></div>
          </div>
          <div class="chips"><span class="sel">Tiles</span><span>Free form</span></div>
          <b class="lb-h">Build your own layout</b>
          <span class="lb-s">Split, resize and swap tiles</span>
        </div>

      </div>
    </div>`;
  }

  /* One app's page: what it does, its features, what it needs on your phone, and its privacy policy and terms. */
  function AppPage({ a, enter }) {
    const perms = a.perms || [];
    return html`<main id="top" class="app-page wrap" data-enter=${enter}>
      <a class="link-arrow back" href="/apps"><span class="ex-icon" aria-hidden="true" data-icon="arrow_back"></span>All apps</a>
      <header class="ap-hero">
        <img class="ap-icon" src=${'/assets/apps/' + a.id + '-icon.webp'} alt="" width="112" height="112" />
        <div class="ap-title">
          <span class="eyebrow muted">${a.store}</span>
          <h1>${a.name}</h1>
        </div>
      </header>
      <div class="ap-intro">
        <p class="ap-lede">${a.desc}</p>
        <div class="ap-side">
          <div class="tags">${a.status && html`<span class=${'chip ' + a.status}>${a.status === 'live' ? 'On Google Play' : 'In development'}</span>`}${a.tags.map(t => html`<span key=${t}>${t}</span>`)}</div>
          ${a.links && html`<div class="links"><${AppLinks} a=${a} /></div>`}
        </div>
      </div>
      ${a.Bento && html`<${a.Bento} />`}
      <div class="ap-media" style=${{ background: a.bg, viewTransitionName: 'app-' + a.id }}>
        <div class="ap-shots" tabindex="0" aria-label=${a.name + ' screenshots'}>
          ${a.shots.map((alt, i) => html`<img key=${i} src=${appImg(a, i + 1)} alt=${a.name + ': ' + alt} width="540" height=${appH(a)} decoding="async" />`)}
        </div>
      </div>

      <section class="ap-sec" aria-labelledby="ap-features">
        <h2 id="ap-features">Features</h2>
        <div class="ap-features">
          ${a.features.map(([icon, t, d], i) => html`<div class="feat" key=${t}>
            <${LiveShape} shape=${['cookie9', 'flower5', 'clover4', 'cookie6', 'sunny', 'cookie12'][i % 6]} icon=${icon} tone=${['primary-container', 'secondary-container', 'tertiary-container', 'highlight'][i % 4]} size=${48} />
            <h3><span>${t}</span></h3>
            <p class="muted">${d}</p>
          </div>`)}
        </div>
      </section>

      <section class="ap-sec ap-data" aria-labelledby="ap-privacy">
        <h2 id="ap-privacy">Your data</h2>
        <div class="ap-data-grid">
          <div>
            <p class="ap-net">${a.net}</p>
            <p class="muted">No ads, no account and no analytics or tracking SDKs. You can remove all of the app's data at any time by clearing its storage or uninstalling it.</p>
          </div>
          <div class="perm-card">
            <span class="eyebrow muted">Permissions</span>
            ${perms.length ? html`<ul>${perms.map(([p, why]) => html`<li key=${p}><b>${p}</b><span class="muted">${why}</span></li>`)}</ul>`
              : html`<p>None. The app runs without any special permissions.</p>`}
          </div>
        </div>
      </section>

      ${a.community && html`<section class="ap-sec" aria-labelledby="ap-community">
        <h2 id="ap-community">Community</h2>
        <p class="ap-sub muted">${a.community.intro}</p>
        <div class="ap-links">${a.community.cards.map(c => html`<${LinkCard} key=${c[0]} c=${c} />`)}</div>
        <div class="ap-social"><span class="eyebrow muted">Follow</span><div class="links"><${ExtLinks} links=${a.community.social} /></div></div>
      </section>`}

      <section class="ap-legal" aria-label="Legal and support">
        <a class="legal-card bg-p" href=${'/' + a.slug + '/privacypolicy'}>
          <span class="ex-icon" aria-hidden="true" data-icon="shield_lock"></span>
          <span><b>Privacy policy</b><span>What ${a.name} collects, and what it doesn't</span></span>
          <span class="ex-icon go" aria-hidden="true" data-icon="arrow_forward"></span>
        </a>
        <a class="legal-card bg-s" href=${'/' + a.slug + '/termsofservice'}>
          <span class="ex-icon" aria-hidden="true" data-icon="gavel"></span>
          <span><b>Terms of service</b><span>The terms for using ${a.name}</span></span>
          <span class="ex-icon go" aria-hidden="true" data-icon="arrow_forward"></span>
        </a>
        <a class="legal-card" href=${'mailto:' + EMAIL + '?subject=' + encodeURIComponent(a.name)}>
          <span class="ex-icon" aria-hidden="true" data-icon="support_agent"></span>
          <span><b>Support</b><span>${EMAIL}</span></span>
          <span class="ex-icon go" aria-hidden="true" data-icon="arrow_outward"></span>
        </a>
      </section>
    </main>`;
  }

  /* About: who I am, what I work on, and where to go next. The copy follows my Sessionize profile. */
  const ABOUT_DO = [
    ['android', 'Android apps', 'Product apps in Kotlin and Jetpack Compose, from the first sketch to the Play Store release. By day I\'m a senior Android developer at Strollby, building multi-module B2B and B2C travel apps on a unified design system.'],
    ['auto_awesome', 'On-device AI', 'I\'ve shipped Gemini Nano and the ML Kit Prompt API in production, for natural-language smart search and generative UI, and I built Nano Prompt Ground, an offline Gemini Nano playground for Android.'],
    ['apps', 'Custom launchers', 'I build Simple Minimalist Launcher, a text-based Android launcher that helps people spend less time on their phones. Several of my other apps began as tools inside it.'],
    ['category', 'Design systems', 'Every project starts from Expressive Kit, my own Material 3 Expressive design system, so shapes, colour and motion stay consistent from the first screen to the last.'],
  ];
  const SKILLS = ['Kotlin', 'Jetpack Compose', 'Kotlin Multiplatform', 'Material 3 Expressive', 'Gemini Nano', 'MediaPipe', 'Android launchers', 'App Functions'];

  // One big link card: [href, icon, title, subtitle, tone].
  function LinkCard({ c: [href, icon, title, sub, tone] }) {
    const ext = href.startsWith('http') || href.startsWith('mailto:'), web = href.startsWith('http');
    return html`<a class=${'legal-card' + (tone ? ' ' + tone : '')} href=${href} target=${web ? '_blank' : undefined} rel=${web ? 'noopener' : undefined}>
      <span class="ex-icon" aria-hidden="true" data-icon=${icon}></span>
      <span><b>${title}</b><span>${sub}</span></span>
      <span class="ex-icon go" aria-hidden="true" data-icon=${ext ? 'arrow_outward' : 'arrow_forward'}></span>
    </a>`;
  }

  function PageCards({ cards }) {
    return html`<section class="ap-legal" aria-label="More">
      ${cards.map(c => html`<${LinkCard} key=${c[0]} c=${c} />`)}
    </section>`;
  }

  function ExtLinks({ links }) {
    return links.map(([l, h]) => html`<a key=${h} class="link-arrow" href=${h} target=${h.startsWith('http') ? '_blank' : undefined} rel=${h.startsWith('http') ? 'noopener' : undefined}>${l}<span class="ex-icon" aria-hidden="true" data-icon=${h[0] === '/' ? 'arrow_forward' : 'arrow_outward'}></span></a>`);
  }

  function Features({ items }) {
    return html`<div class="ap-features">
      ${items.map(([icon, t, d], i) => html`<div class="feat" key=${t}>
        <${LiveShape} shape=${['cookie9', 'flower5', 'clover4', 'cookie6', 'sunny', 'cookie12'][i % 6]} icon=${icon} tone=${['primary-container', 'secondary-container', 'tertiary-container', 'highlight'][i % 4]} size=${48} />
        <h3><span>${t}</span></h3>
        <p class="muted">${d}</p>
      </div>`)}
    </div>`;
  }

  function AboutPage({ enter }) {
    return html`<main id="top" class="app-page wrap" data-enter=${enter}>
      <a class="link-arrow back" href="/"><span class="ex-icon" aria-hidden="true" data-icon="arrow_back"></span>Back to home</a>
      <header class="ap-hero">
        <img class="ap-icon ap-portrait" src="/assets/dinoy-420.webp" alt="Dinoy Raj" width="112" height="112" />
        <div class="ap-title">
          <span class="eyebrow muted">Android developer · Speaker · India</span>
          <h1>Dinoy Raj</h1>
        </div>
      </header>
      <div class="ap-intro">
        <div class="ap-copy">
          <p class="ap-lede">I'm Dinoy Raj, a senior Android developer and international conference speaker from Thiruvananthapuram, Kerala, in India. I design and build Android apps in Kotlin and Jetpack Compose, and I like them small, focused and finished properly.</p>
          <p class="muted">I care about the parts of Android that sit closest to people: the home screen, the notifications that interrupt them, and the AI that now runs on the phone itself. I write about Android, Kotlin and Jetpack Compose on ProAndroidDev and Medium, and I speak about on-device AI, custom launchers and agentic Android at conferences around the world.</p>
        </div>
        <div class="ap-side">
          <div class="tags">${SKILLS.map(t => html`<span key=${t}>${t}</span>`)}</div>
          <div class="links"><${ExtLinks} links=${[['LinkedIn', LINKS.linkedin], ['GitHub', LINKS.github], ['Sessionize', LINKS.sessionize], ['Medium', LINKS.medium]]} /></div>
        </div>
      </div>

      <section class="ap-sec" aria-labelledby="ab-do">
        <h2 id="ab-do">What I work on</h2>
        <${Features} items=${ABOUT_DO} />
      </section>

      <section class="ap-sec" aria-labelledby="ab-talks">
        <h2 id="ab-talks">Speaking</h2>
        <div class="ap-copy ap-note">
          <p class="ap-lede">Sessionize counts me among its most active speakers of 2025, in the top 3% of more than 71,000 speakers worldwide.</p>
          <p class="muted">I've spoken at droidcon, DevFest, FOSSASIA Summit and Mobile Developers Week, from Bengaluru, Mumbai and Dubai to Lisbon, Atlanta, Nairobi and Kampala, on Gemini Nano and the Prompt API, offline RAG with MediaPipe, App Functions, custom launchers and Kotlin Multiplatform.</p>
        </div>
      </section>

      <${PageCards} cards=${[
        ['/talks', 'mic', 'Talks', 'Sessions, abstracts and events', 'bg-p'],
        ['/apps', 'apps', 'Apps', APPS.length + ' Android apps in Kotlin and Compose', 'bg-s'],
        ['mailto:' + EMAIL, 'support_agent', 'Get in touch', EMAIL],
      ]} />
    </main>`;
  }

  /* Talks: every session, then every event. */
  function TalksPage({ enter }) {
    return html`<main id="top" class="app-page wrap" data-enter=${enter}>
      <a class="link-arrow back" href="/#talks"><span class="ex-icon" aria-hidden="true" data-icon="arrow_back"></span>Back to home</a>
      <header class="ap-hero">
        <${LiveShape} shape="cookie12" tone="highlight" icon="mic" size=${112} />
        <div class="ap-title">
          <span class="eyebrow muted">Dinoy Raj · Speaker</span>
          <h1>Talks</h1>
        </div>
      </header>
      <div class="ap-intro">
        <p class="ap-lede">I speak about on-device AI, agentic Android, custom launchers and Kotlin Multiplatform at droidcon, DevFest, FOSSASIA Summit and Mobile Developers Week. Sessionize counts me among its most active speakers of 2025, in the top 3% of more than 71,000 speakers.</p>
        <div class="ap-side">
          <div class="tags">${['Gemini Nano', 'On-device AI', 'App Functions', 'Launchers', 'MediaPipe', 'Kotlin Multiplatform'].map(t => html`<span key=${t}>${t}</span>`)}</div>
          <div class="links"><${ExtLinks} links=${[['Sessionize', LINKS.sessionize], ['Invite me to speak', 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Speaking invitation')]]} /></div>
        </div>
      </div>

      <section class="ap-sec" aria-labelledby="tk-sessions">
        <h2 id="tk-sessions">Sessions</h2>
        <div class="talk-list">
          ${TALKS.map((t, i) => html`<a key=${t.slug} class=${'legal-card' + (i < 2 ? (i ? ' bg-s' : ' bg-p') : '')} href=${'/talks/' + t.slug}>
            <span class="ex-icon" aria-hidden="true" data-icon=${t.icon}></span>
            <span><b>${t.text}</b><span>${t.sub}</span></span>
            <span class="ex-icon go" aria-hidden="true" data-icon="arrow_forward"></span>
          </a>`)}
        </div>
      </section>

      <section class="ap-sec" aria-labelledby="tk-events">
        <div class="sec-head"><h2 id="tk-events">Where I've spoken</h2><a class="link-arrow" href="/events">View all events<span class="ex-icon" aria-hidden="true" data-icon="arrow_forward"></span></a></div>
        <div class="tix">${ALL_EVENTS.map(ev => html`<${EventTicket} key=${ev.name + ev.when} ev=${ev} />`)}</div>
      </section>
    </main>`;
  }

  /* One talk: the abstract, its takeaways, and the app it grew from. */
  function TalkPage({ t, enter }) {
    const app = t.app && APPS.find(a => a.id === t.app), events = talkEvents(t);
    const invite = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Talk: ' + t.text);
    return html`<main id="top" class="app-page wrap" data-enter=${enter}>
      <a class="link-arrow back" href="/talks"><span class="ex-icon" aria-hidden="true" data-icon="arrow_back"></span>All talks</a>
      <header class="ap-hero">
        <${LiveShape} shape=${t.shape} tone=${t.tone} icon=${t.icon} size=${112} />
        <div class="ap-title">
          <span class="eyebrow muted">Talk · ${t.sub}</span>
          <h1 class="tk-title">${t.text}</h1>
        </div>
      </header>
      <div class="ap-intro">
        <div class="ap-copy">
          ${t.abstract.map((p, i) => html`<p key=${i} class=${i ? 'muted' : 'ap-lede'}>${p}</p>`)}
        </div>
        <div class="ap-side">
          <div class="tags">${t.sub.split(' · ').concat('Speaker: Dinoy Raj').map(x => html`<span key=${x}>${x}</span>`)}</div>
          <div class="links"><${ExtLinks} links=${[...(t.slides ? [['Slides', t.slides]] : []), ['Invite me', invite]]} /></div>
        </div>
      </div>

      <section class="ap-sec" aria-labelledby="tk-take">
        <h2 id="tk-take">Key takeaways</h2>
        <${Features} items=${t.takeaways} />
      </section>

      ${events.length > 0 && html`<section class="ap-sec" aria-labelledby="tk-at">
        <div class="sec-head"><h2 id="tk-at">Presented at</h2><a class="link-arrow" href="/events">View all events<span class="ex-icon" aria-hidden="true" data-icon="arrow_forward"></span></a></div>
        <div class="tix">${events.map(ev => html`<${EventTicket} key=${ev.name + ev.when} ev=${ev} />`)}</div>
      </section>`}

      ${t.slides && html`<section class="ap-sec" aria-labelledby="tk-slides">
        <h2 id="tk-slides">Slides</h2>
        <${Slides} t=${t} />
      </section>`}

      <${PageCards} cards=${[
        app ? ['/' + app.slug, 'android', app.name, 'The app behind the talk', 'bg-p'] : ['/talks', 'mic', 'More talks', 'Every session and event', 'bg-p'],
        [invite, 'support_agent', 'Book this talk', 'For your conference, meetup or team', 'bg-s'],
        app ? ['/talks', 'mic', 'More talks', 'Every session and event'] : ['/about', 'waving_hand', 'About Dinoy Raj', 'Android developer and speaker'],
      ]} />
    </main>`;
  }

  /* A talk's deck: the SlideShare player when slidesEmbed is set, loaded only when scrolled near, and a link to the deck. */
  function Slides({ t }) {
    return html`<div class="slides">
      ${t.slidesEmbed && html`<div class="slides-frame"><iframe src=${t.slidesEmbed} title=${'Slides: ' + t.text} loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>`}
      <a class="link-arrow" href=${t.slides} target="_blank" rel="noopener">Open the slides<span class="ex-icon" aria-hidden="true" data-icon="arrow_outward"></span></a>
    </div>`;
  }

  /* Every event: what's coming up, then everywhere I've spoken. */
  function EventsPage({ enter }) {
    const up = ALL_EVENTS.filter(ev => ev.up), past = ALL_EVENTS.filter(ev => !ev.up);
    const countries = new Set(ALL_EVENTS.filter(ev => !ev.online).map(ev => (ev.addr || ev.where).split(', ').pop())).size;
    return html`<main id="top" class="app-page wrap" data-enter=${enter}>
      <a class="link-arrow back" href="/talks"><span class="ex-icon" aria-hidden="true" data-icon="arrow_back"></span>All talks</a>
      <header class="ap-hero">
        <${LiveShape} shape="cookie9" tone="primary-container" icon="event" size=${112} />
        <div class="ap-title">
          <span class="eyebrow muted">Dinoy Raj · Speaker</span>
          <h1>Events</h1>
        </div>
      </header>
      <div class="ap-intro">
        <p class="ap-lede">${ALL_EVENTS.length} conferences and meetups in ${countries} countries: droidcon, DevFest, FOSSASIA Summit, Mobile Developers Week and more. Each one has its own page with the dates, the venue and the sessions I gave there.</p>
        <div class="ap-side">
          <div class="links"><${ExtLinks} links=${[['All talks', '/talks'], ['Invite me to speak', 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Speaking invitation')]]} /></div>
        </div>
      </div>
      ${up.length > 0 && html`<section class="ap-sec" aria-labelledby="ev-up">
        <h2 id="ev-up">Upcoming</h2>
        <div class="tix">${up.map(ev => html`<${EventTicket} key=${ev.name + ev.when} ev=${ev} />`)}</div>
      </section>`}
      <section class="ap-sec" aria-labelledby="ev-past">
        <h2 id="ev-past">Where I've spoken</h2>
        <div class="tix">${past.map(ev => html`<${EventTicket} key=${ev.name + ev.when} ev=${ev} />`)}</div>
      </section>
    </main>`;
  }

  /* One event: when and where, who runs it, and each session I gave there with its day, room and slides. */
  function EventPage({ ev, enter }) {
    const sessions = evSessions(ev), yr = ev.when.split(' ')[1], decks = sessions.filter(x => x.t && x.t.slides);
    const invite = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Speaking invitation');
    const facts = [['calendar_month', 'When', evDates(ev)], ['event', 'Where', ev.online ? 'Online' : ev.addr || ev.where], ['support_agent', 'Organizer', ev.org || ev.name], ['mic', 'Format', ev.online ? 'Online' : 'In person']];
    const first = sessions.find(x => x.t) && sessions.find(x => x.t).t;
    return html`<main id="top" class="app-page wrap" data-enter=${enter}>
      <a class="link-arrow back" href="/events"><span class="ex-icon" aria-hidden="true" data-icon="arrow_back"></span>All events</a>
      <header class="ap-hero">
        <${LiveShape} shape=${ev.name.startsWith('droidcon') || ev.name.startsWith('Droidcon') ? 'cookie12' : 'flower5'} tone=${ev.up ? 'highlight' : 'primary-container'} icon="event" size=${112} />
        <div class="ap-title">
          <span class="eyebrow muted">${ev.up ? 'Upcoming' : 'Event'} · ${ev.where}</span>
          <h1>${ev.name} ${yr}</h1>
        </div>
      </header>
      <div class="ap-intro">
        <div class="ap-copy"><p class="ap-lede">${evSummary(ev).replace(/^Dinoy Raj s/, 'I s').replace(' Session: ', ' My session: ').replace(' Sessions: ', ' My sessions: ')}</p></div>
        <div class="ap-side">
          <div class="tags">${[ev.where, evDates(ev), ev.org].filter(Boolean).map(x => html`<span key=${x}>${x}</span>`)}</div>
          <div class="links"><${ExtLinks} links=${[...(ev.site ? [['Event website', ev.site]] : []), ['Invite me', invite]]} /></div>
        </div>
      </div>

      <section class="ap-sec" aria-labelledby="ev-details">
        <h2 id="ev-details">Details</h2>
        <dl class="ev-facts">${facts.map(([icon, k, v]) => html`<div key=${k}><dt><span class="ex-icon" aria-hidden="true" data-icon=${icon}></span>${k}</dt><dd>${v}</dd></div>`)}</dl>
      </section>

      ${sessions.length > 0 && html`<section class="ap-sec" aria-labelledby="ev-sessions">
        <h2 id="ev-sessions">${sessions.length > 1 ? 'My sessions' : 'My session'}</h2>
        <div class="talk-list">${sessions.map((x, i) => {
          const when = [x.day && fmtDay(x.day), x.room].filter(Boolean).join(' · ') || (x.t ? x.t.sub : 'Session');
          const body = html`<span class="ex-icon" aria-hidden="true" data-icon=${x.t ? x.t.icon : 'mic'}></span><span><b>${x.title}</b><span>${when}</span></span>`;
          return x.t ? html`<a key=${x.title} class=${'legal-card' + (i ? ' bg-s' : ' bg-p')} href=${'/talks/' + x.t.slug}>${body}<span class="ex-icon go" aria-hidden="true" data-icon="arrow_forward"></span></a>`
            : html`<div key=${x.title} class=${'legal-card' + (i ? ' bg-s' : ' bg-p')}>${body}</div>`;
        })}</div>
      </section>`}

      ${decks.map(x => html`<section key=${x.t.slug} class="ap-sec" aria-labelledby=${'ev-slides-' + x.t.slug}>
        <h2 id=${'ev-slides-' + x.t.slug}>Slides${decks.length > 1 ? ': ' + x.t.title : ''}</h2>
        <${Slides} t=${x.t} />
      </section>`)}

      <${PageCards} cards=${[
        first ? ['/talks/' + first.slug, first.icon, first.title, 'The talk: abstract and takeaways', 'bg-p'] : ['/talks', 'mic', 'Talks', 'Every session I give', 'bg-p'],
        [invite, 'support_agent', 'Invite me to speak', 'For your conference, meetup or team', 'bg-s'],
        ['/events', 'event', 'All events', 'Everywhere I have spoken'],
      ]} />
    </main>`;
  }

  const LEGAL_DATE = '6 November 2026';
  const DEV = 'Dinoy Raj';

  // Each doc is a list of [heading, ...blocks]; a block is a paragraph string or an array (a bullet list).
  function privacyDoc(a) {
    if (PRIVACY[a.id]) return PRIVACY[a.id].sections;
    const perms = a.perms || [];
    return [
      ['Overview', `This privacy policy explains how ${a.name} (“the app”), developed by ${DEV} (“I”, “me”), handles your information. In short: the app is built to work on your phone, and I do not collect, sell or share your personal data.`],
      ['Information the app collects', 'The app does not ask you to create an account and does not collect personal information such as your name, email address or contacts. I do not run analytics, advertising or tracking SDKs in the app.', a.net],
      ['Permissions', perms.length ? 'The app asks only for the permissions its features need. Optional permissions are requested only when you turn on the feature that uses them, and you can revoke any of them in Android settings.' : 'The app does not request any special permissions.',
        ...(perms.length ? [perms.map(([p, why]) => p + ': ' + why + '.')] : [])],
      ...(a.id === 'reel' || (a.perms || []).some(([p]) => /Accessibility/.test(p)) ? [['Accessibility service', `${a.name} uses Android's Accessibility Service API only to provide the features described above. It does not use it to collect personal data, read your messages or passwords, or change settings without your action, and nothing it observes is stored off the device or shared with anyone. You can turn the service off at any time in Settings › Accessibility.`]] : []),
      ['Data stored on your device', 'Your settings and the content you create in the app are stored locally on your phone. If Android backup is turned on for your Google account, Android may include this data in your device backup, which is handled by Google under its own privacy policy. You can delete all of the app\'s data by clearing its storage in Android settings or by uninstalling it.'],
      ['Third-party services', ['Google Play, which distributes the app and may collect information as described in Google\'s privacy policy.', ...(a.id === 'launcher' ? ['A weather service, which receives your approximate location only if you turn on the weather widget.'] : []), ...(a.id === 'nano' ? ['Google AICore, the Android system service that provides and updates the Gemini Nano model on your device.'] : [])]],
      ['Children', 'The app is not directed at children under 13, and I do not knowingly collect information from children.'],
      ['Changes to this policy', 'If this policy changes, the new version will be posted on this page with a new effective date. Significant changes will also be noted in the app\'s release notes.'],
      ['Contact', `Questions about this policy or your data? Write to ${EMAIL}.`],
    ];
  }

  const GOOGLE_PRIVACY = 'https://policies.google.com/privacy';

  /* App-specific privacy policies that replace the shared template. intro sits above the numbered sections; date overrides LEGAL_DATE. */
  const PRIVACY = {
    habits: {
      date: '9 November 2026',
      intro: `This Privacy Policy explains how Habbit Tracker (the “App”), published by ${DEV} (“we”, “us”, “our”), handles information. In short: your habit data stays on your device. We do not collect it, we do not sell it, and the App has no ads, analytics or tracking.`,
      sections: [
        ['Information stored on your device', 'The App stores the following locally on your device:', ['habits you create (name, icon or emoji, colour, category, type, targets and goals);', 'your logs, streaks, notes and reminder schedules;', 'your settings, such as theme, sounds, haptics, widgets, the notification and the island.'], 'We never receive this data. It does not leave your device except through Android backup (Section 3), which you control.'],
        ['We do not collect', ['No account, name, email address or phone number is needed.', 'No analytics, crash reporting, advertising SDKs or advertising IDs.', 'No location, contacts, photos, camera, microphone or files.', 'No selling or sharing of personal data with advertisers or data brokers.']],
        ['Android backup', `The App supports Android's built-in backup. If backup is turned on for your device, Android may include the App's data in a backup to your own Google account, so that it can be restored to a new device. That backup is handled by Google under Google's Privacy Policy (${GOOGLE_PRIVACY}). We cannot access it. You can turn backup on or off in your device settings, usually under Settings › System › Backup or Settings › Google › Backup.`],
        ['Purchases (Habit Pro)', 'If you buy Habit Pro:', [`Google Play processes the payment. We never see your card, bank or UPI details. See Google's Privacy Policy (${GOOGLE_PRIVACY}).`, 'RevenueCat (RevenueCat, Inc.) manages subscription status so that Pro can be checked and restored. To do this, the App sends RevenueCat an anonymous, randomly generated app user ID, purchase information (product, purchase token, purchase and expiry dates, price and currency, country/store), and basic device and app details (such as OS version, app version and device language). This information is not linked to your name or email by us, and it is used only to provide and verify your subscription. See RevenueCat\'s Privacy Policy (https://www.revenuecat.com/privacy).'], 'The App uses the internet only for these purchase and subscription checks. Habit tracking works fully offline.'],
        ['Permissions', [
          'Notifications: showing habit reminders and the optional pinned notification. Asked for only when you turn these on.',
          'Run at startup: rescheduling your reminders after the device restarts.',
          'Display over other apps: showing the optional dynamic island overlay. Asked for only when you switch it on.',
          'Foreground service: keeping the dynamic island visible while it is on.',
          'Vibrate: haptic feedback on taps. You can turn it off.',
          'Internet: Habit Pro purchases and subscription checks only.',
        ], 'You can revoke any permission in your device settings at any time.'],
        ['Data retention and deletion', `Your data stays on your device until you delete it. You can delete individual habits in the App, or delete everything by clearing the App's storage (Settings › Apps › Habbit Tracker › Storage › Clear data) or by uninstalling the App. To remove a Google backup, manage it in your Google account's backup settings. To ask RevenueCat to delete purchase records linked to your anonymous ID, contact us at the address below.`],
        ['Security', `Your data is protected by Android's app sandboxing and by your device's own security, such as your screen lock and encryption. Purchase data is sent to Google and RevenueCat over encrypted (HTTPS) connections.`],
        ['Children', 'The App is not directed at children under 13 (or the minimum age in your country), and we do not knowingly collect personal information from children.'],
        ['Your rights', 'Depending on where you live (for example under the GDPR in the EEA or UK, the CCPA/CPRA in California, or India\'s DPDP Act), you may have rights to access, correct, delete or restrict the processing of your personal data, or to object to it. Because we do not hold your habit data, most requests can be handled directly on your device. For anything relating to purchase data, contact us and we will help. You may also have the right to complain to your local data protection authority.'],
        ['Changes to this policy', 'We may update this policy, for example if the App\'s features change. We will post the new version on this page and update the effective date. For significant changes, we will give notice in the App where practical.'],
        ['Contact', `${DEV}. Email: ${EMAIL}.`],
      ],
    },
  };

  /* App-specific terms that replace the shared template. intro sits above the numbered sections; date overrides LEGAL_DATE. */
  const TERMS = {
    habits: {
      date: '9 November 2026',
      intro: `These Terms of Service (“Terms”) govern your use of the Habbit Tracker mobile application (the “App”), published on Google Play by ${DEV} (“we”, “us”, “our”). By downloading or using the App, you agree to these Terms. If you do not agree, do not use the App.`,
      sections: [
        ['The App', 'Habbit Tracker lets you create habits, log progress, view streaks and statistics, set reminders, and show your habits on home-screen widgets, a pinned notification and an on-screen overlay (“dynamic island”). Core habit tracking is free. Some features are available only with a paid subscription (“Habit Pro”).'],
        ['Eligibility', 'You must be old enough to accept a binding agreement where you live, or have permission from a parent or guardian. If you use the App on behalf of an organisation, you confirm that you have authority to accept these Terms for it.'],
        ['Licence', 'We grant you a personal, non-exclusive, non-transferable, revocable licence to install and use the App on Android devices that you own or control, for your own non-commercial use, in line with these Terms and the Google Play Terms of Service.', 'You agree not to:', ['copy, modify, distribute, sell or sublicense the App;', 'reverse engineer, decompile or disassemble the App, except where the law expressly allows it;', 'get around or tamper with the subscription system or any feature restriction;', 'use the App for any unlawful purpose.']],
        ['Habit Pro subscriptions', [
          'Billing: Habit Pro is offered as auto-renewing monthly or yearly subscriptions. Payment is charged to your Google Play account when you confirm the purchase. Prices are shown in the App and on Google Play before you buy, and may vary by country.',
          'Auto-renewal: your subscription renews automatically at the end of each period unless you cancel at least 24 hours before it ends. If a free trial is offered and you start one, you will be charged when it ends unless you cancel before then.',
          'Cancelling: you can cancel at any time in Google Play › Profile › Payments & subscriptions › Subscriptions. Cancelling stops future renewals. Pro stays active until the end of the period you have already paid for.',
          'Refunds: payments are processed by Google Play and are subject to Google Play\'s refund policy. Except where the law requires otherwise, we do not give refunds or credits for partial periods.',
          'Pending payments: some payment methods take time to clear. Pro switches on once Google Play confirms the payment.',
          'Price changes: we may change subscription prices. Google Play will tell you in advance, and where required you will be asked to accept the new price before it applies.',
          'Restoring purchases: Pro is tied to the Google account you bought it with. You can restore it on another device signed in to the same account.',
        ]],
        ['Your data', 'Your habits, logs, notes and settings are stored on your device. We do not run servers that hold your habit data, and you do not need an account. You are responsible for your device and for any backups. If you uninstall the App or clear its data without a backup, your data may be lost permanently.', ['Your use of the app is also covered by its privacy policy.']],
        ['Permissions and device features', 'Some features need Android permissions, such as notifications for reminders, or “display over other apps” for the dynamic island. You choose whether to grant them and can withdraw them at any time in your device settings. Features that depend on a permission may stop working without it. Reminders are not exact: Android may delay them, and so may battery optimisation.'],
        ['Not medical advice', 'The App is a self-tracking tool. It does not provide medical, health, fitness, psychological or professional advice. Talk to a qualified professional before starting any health, diet or exercise programme. You use the App at your own discretion.'],
        ['Intellectual property', 'The App and its design, code, graphics, icons and themes are owned by us or our licensors and are protected by intellectual property laws. These Terms do not transfer any ownership to you. Content you enter, such as habit names and notes, remains yours.'],
        ['Updates and availability', 'We may update, change, suspend or discontinue the App or any feature at any time, for example to improve it, fix problems or comply with the law. We aim to keep the features you have paid for working, but we do not guarantee that the App will always be available, uninterrupted or error-free, or that it will work on every device.'],
        ['Disclaimer', 'To the fullest extent the law allows, the App is provided “as is” and “as available”, without warranties of any kind, express or implied. This includes warranties of merchantability, fitness for a particular purpose, and non-infringement.', 'Consumers in the EEA, UK and elsewhere: nothing in these Terms limits your statutory rights as a consumer, including your rights where digital content or services are faulty or not as described.'],
        ['Limitation of liability', 'To the fullest extent the law allows, we are not liable for any indirect, incidental, special, consequential or punitive damages. We are also not liable for loss of data, habits, streaks, profits or goodwill arising from your use of the App or your inability to use it. Our total liability for any claim relating to the App is limited to the amount you paid us for the App in the 12 months before the claim.', 'Nothing in these Terms excludes liability that cannot be excluded by law, such as liability for death or personal injury caused by negligence, or for fraud.'],
        ['Termination', 'You may stop using the App at any time by uninstalling it. If you have a subscription, cancel it in Google Play; uninstalling does not cancel it. We may end your licence if you seriously breach these Terms. Sections 7, 8, 10, 11 and 14 continue to apply after termination.'],
        ['Changes to these Terms', 'We may update these Terms from time to time. We will post the new version on this page and update the effective date. For significant changes, we will give reasonable notice where practical, for example in the App. If you keep using the App after the changes take effect, you accept the updated Terms.'],
        ['Governing law', 'These Terms are governed by the laws of India, without regard to its conflict-of-law rules. Disputes are subject to the courts of India. If you are a consumer, you also keep the protection of the mandatory laws of the country where you live, and you may bring proceedings there.'],
        ['Third parties', 'Purchases are handled by Google Play under Google\'s own terms. Subscription status is managed through RevenueCat. Google is not responsible for the App or for these Terms.'],
        ['Contact', `${DEV}. Email: ${EMAIL}.`],
      ],
    },
    nano: {
      intro: `These Terms of Service (“Terms”) govern your use of the Nano Prompt Ground Android app (the “App”), published on Google Play by ${DEV} (“we”, “us”). By downloading, installing or using the App you agree to these Terms. If you do not agree, do not use the App.`,
      sections: [
        ['What the App does', 'The App lets you experiment with Gemini Nano, Google\'s on-device generative AI model, through the ML Kit GenAI Prompt API and Android AICore. Prompts are processed locally on your device. The App does not send your prompts or responses to us or to any server operated by us.'],
        ['Eligibility and licence', 'You must be old enough to accept these Terms where you live, or have permission from a parent or guardian. We grant you a personal, non-exclusive, non-transferable, revocable licence to use the App on devices you own or control, in line with the Google Play Terms of Service. The App\'s source code is available under the Apache License 2.0, which governs your rights to that code.'],
        ['Price', 'The App is free. It has no advertising, in-app purchases or subscriptions.'],
        ['Device requirements and third-party services', 'Gemini Nano is only available on supported devices running Android 13 or later with Android AICore. We do not guarantee the App will work on any particular device. The model is provided by Google and is downloaded and updated through AICore and Google Play services, under Google\'s own terms. These include the Google Terms of Service and the Generative AI Prohibited Use Policy. Nano Prompt Ground is an independent project and is not affiliated with or endorsed by Google. “Gemini”, “Android” and “Google Play” are trademarks of Google LLC.'],
        ['AI-generated content', 'Responses are generated automatically and may be inaccurate, incomplete, biased or offensive. They do not reflect our views. Do not rely on them as professional advice of any kind, including medical, legal or financial advice. You are responsible for the prompts you enter and for how you use any response.'],
        ['Acceptable use', 'You agree not to use the App to:', ['break any law or infringe anyone\'s rights', 'create unlawful, harassing, hateful or exploitative content', 'generate spam, malware or fraudulent content', 'violate Google\'s Generative AI Prohibited Use Policy', 'interfere with the App\'s normal operation']],
        ['Your content and privacy', 'You keep all rights to the text you enter. Because processing happens on your device, we do not receive, store or have access to your prompts or responses. The App requires no account and contains no analytics or advertising SDKs. You can clear the model\'s cache of recent prompts from within the App at any time.', ['Your use of the app is also covered by its privacy policy.']],
        ['Intellectual property', 'The App\'s name, icon and store materials belong to the developer, apart from the third-party trademarks noted above. Open-source components are used under their respective licences.'],
        ['Disclaimer of warranties', 'To the fullest extent permitted by law, the App is provided “as is” and “as available”, without warranties of any kind, express or implied. We do not warrant that the App will be uninterrupted or error-free, or that the model will be available on your device.'],
        ['Limitation of liability', 'To the fullest extent permitted by law, we are not liable for any indirect, incidental, special or consequential damages, or for any loss of data or profits, arising from your use of the App or of AI-generated content. Nothing in these Terms limits liability that cannot be limited by law. Nothing in them affects your mandatory consumer rights under the laws of your country of residence, including in the EEA and UK.'],
        ['Changes', 'We may update, change or discontinue the App or these Terms at any time. Updated Terms will be posted at this URL with a new effective date. If you continue to use the App after an update, you accept the updated Terms.'],
        ['Termination', 'You may stop using the App at any time by uninstalling it. Your licence ends automatically if you breach these Terms. Sections 5, 9 and 10 survive termination.'],
        ['Governing law', 'These Terms are governed by the laws of the developer\'s country of establishment. This does not remove any mandatory protections under the laws of your country of residence.'],
        ['Contact', 'Questions about these Terms can be raised at https://github.com/dinoy-raj/gemini-nano-playground/issues or sent to the developer email on the App\'s Google Play listing.'],
      ],
    },
  };

  // Turns bare https:// URLs in a paragraph into links; trailing punctuation stays outside the link.
  function linkify(text) {
    return text.split(/(https:\/\/[^\s]+[^\s.,;:)])/).map((part, i) => i % 2
      ? html`<a key=${i} href=${part} target="_blank" rel="noopener">${part}</a>` : part);
  }

  function termsDoc(a) {
    if (TERMS[a.id]) return TERMS[a.id].sections;
    return [
      ['Agreement', `These terms govern your use of ${a.name} (“the app”), developed by ${DEV} (“I”, “me”). By downloading or using the app you agree to them. If you do not agree, please do not use the app.`],
      ['Licence', `I grant you a personal, non-exclusive, non-transferable and revocable licence to use the app on Android devices you own or control, for personal, non-commercial purposes, in line with these terms and the Google Play Terms of Service.`],
      ['Acceptable use', 'When using the app you agree not to:', ['copy, modify, redistribute, sell or rent the app, except as allowed by an open-source licence that covers its source code;', 'reverse engineer or attempt to extract the source code, except where the law allows it;', 'use the app for anything unlawful or to harm others.']],
      ['Your content', 'Anything you create or save in the app belongs to you and stays on your device. You are responsible for keeping your own backups.'],
      ['Purchases', 'If the app offers paid features or purchases, they are processed by Google Play under its own terms, and refunds follow Google Play\'s refund policy.'],
      ['Privacy', ['Your use of the app is also covered by its privacy policy.']],
      ['Updates and availability', 'I may update, change or stop offering the app or any of its features at any time. Some updates may be required to keep using the app.'],
      ['Disclaimer', `The app is provided “as is” and “as available”, without warranties of any kind. ${/focus|blocker|pause|screen/i.test(a.name + a.store) ? 'It is a tool to help you build better habits, and I cannot guarantee that it will block every app, feed or notification on every device or Android version. ' : ''}I do not warrant that the app will be error-free or uninterrupted.`],
      ['Limitation of liability', 'To the fullest extent permitted by law, I am not liable for any indirect, incidental or consequential damages, or for any loss of data, arising from your use of, or inability to use, the app.'],
      ['Termination', 'You can stop using the app at any time by uninstalling it. Your licence ends automatically if you break these terms.'],
      ['Governing law', 'These terms are governed by the laws of India, without regard to its conflict of law rules.'],
      ['Changes to these terms', 'If these terms change, the new version will be posted on this page with a new effective date. Continuing to use the app after a change means you accept the new terms.'],
      ['Contact', `Questions about these terms? Write to ${EMAIL}.`],
    ];
  }

  function LegalPage({ a, doc, enter }) {
    const privacy = doc === 'privacy';
    const sections = privacy ? privacyDoc(a) : termsDoc(a);
    const custom = (privacy ? PRIVACY : TERMS)[a.id];
    return html`<main id="top" class="legal wrap" data-enter=${enter}>
      <a class="link-arrow back" href=${'/' + a.slug}><span class="ex-icon" aria-hidden="true" data-icon="arrow_back"></span>${a.name}</a>
      <header class="legal-head">
        <div class="legal-app"><img src=${'/assets/apps/' + a.id + '-icon.webp'} alt="" width="40" height="40" /><span>${a.name}</span></div>
        <h1>${privacy ? 'Privacy policy' : 'Terms of service'}</h1>
        <p class="eyebrow muted">Effective ${custom && custom.date || LEGAL_DATE}</p>
      </header>
      ${custom ? html`<p class="legal-intro">${custom.intro}</p>` : null}
      <article class="legal-body">
        ${sections.map(([h, ...blocks], i) => html`<section key=${h}>
          <h2><span class="n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>${h}</h2>
          ${blocks.map((b, j) => Array.isArray(b)
            ? html`<ul key=${j}>${b.map(li => html`<li key=${li}>${li === 'Your use of the app is also covered by its privacy policy.' ? html`Your use of the app is also covered by its <a href=${'/' + a.slug + '/privacypolicy'}>privacy policy</a>.` : linkify(li)}</li>`)}</ul>`
            : html`<p key=${j}>${linkify(b)}</p>`)}
        </section>`)}
      </article>
      <div class="legal-next">
        <a class="link-arrow" href=${'/' + a.slug + (privacy ? '/termsofservice' : '/privacypolicy')}>${privacy ? 'Terms of service' : 'Privacy policy'}<span class="ex-icon" aria-hidden="true" data-icon="arrow_forward"></span></a>
      </div>
    </main>`;
  }

  function Missing({ enter }) {
    return html`<main id="top" class="all-apps wrap" data-enter=${enter}>
      <h1 class="sec-title">Not<br/> found</h1>
      <p class="muted" style=${{ margin: '24px 0 32px', fontSize: '16px' }}>There's no page at this address.</p>
      <a class="link-arrow" href="/apps">See all apps<span class="ex-icon" aria-hidden="true" data-icon="arrow_forward"></span></a>
    </main>`;
  }

  const ALL_APPS = '#all-apps'; // the old address of the full list, now /apps

  const NEEDS = [['Android app'], ['Redesign'], ['Design system'], ['Icons'], ['Talk or workshop']];

  function Contact({ setMsg }) {
    const [copied, setCopied] = useState(false);
    const [need, setNeed] = useState([]);
    useEffect(() => { if (!copied) return; const t = setTimeout(() => setCopied(false), 2200); return () => clearTimeout(t); }, [copied]);
    const copy = () => {
      const fail = () => setMsg('Copy blocked here. Select the address instead.');
      try { navigator.clipboard.writeText(EMAIL).then(() => { setCopied(true); setMsg('Email address copied'); }, fail); } catch (e) { fail(); }
    };
    const toggle = t => setNeed(n => n.includes(t) ? n.filter(x => x !== t) : [...n, t]);
    const submit = e => { e.preventDefault(); setMsg('This form is a preview. Connect it to your inbox to receive messages.'); };
    return html`<section class="contact wrap" id="contact">
      <div class="left">
        <div>
          <span class="avail"><span class="dot" aria-hidden="true"><span class="ring"><${ShapeSvg} seq=${['sunny', 'cookie12']} speed=${-24} hold=${900} morph=${700} /></span><${ShapeSvg} seq=${['cookie9', 'flower8', 'burst', 'clover4', 'cookie12']} fill="var(--positive)" speed=${48} hold=${800} morph=${650} /><span class="ex-icon" aria-hidden="true" data-icon="bolt"></span></span><span><b>Available</b> for new projects</span></span>
          <h2 class="talk-title">Let's <span class="l2"><span class="em">talk.</span><span class="badge" aria-hidden="true"><${MorphShape} seq=${['cookie9', 'flower8', 'burst', 'clover4', 'cookie12']} fill="var(--highlight)" speed=${18} hold=${1200} /><span class="ex-icon" data-icon="waving_hand"></span></span></span></h2>
          <p class="lede">Have an app idea or a design that needs to feel more <b>alive</b>? Tell me about it and I'll reply <b>within two days</b>.</p>
          <div class="mail">
            <span class="eyebrow">Or write directly</span>
            <div class="mail-big">
              <a href=${'mailto:' + EMAIL}>${EMAIL}</a>
              <button type="button" class=${'copy-btn' + (copied ? ' done' : '')} onClick=${copy} aria-label=${copied ? 'Email address copied' : 'Copy email address'} title="Copy email address">
                <${ShapeSvg} seq=${copied ? ['flower5', 'burst'] : ['cookie9', 'cookie12', 'sunny']} speed=${copied ? 60 : -16} hold=${copied ? 700 : 1600} morph=${800} kick=${copied ? 120 : -120} />
                <span class="ex-icon" aria-hidden="true" data-icon=${copied ? 'check' : 'content_copy'}></span>
              </button>
            </div>
          </div>
        </div>
        <div class="socials-wrap">
          <span class="eyebrow">Find me elsewhere</span>
          <div class="socials">
            ${SOCIALS.map(l => html`<a key=${l.label} class="soc" href=${l.href} target="_blank" rel="noopener" aria-label=${l.label}><span class="ex-icon" aria-hidden="true" data-icon=${l.icon}></span><span class="tip" aria-hidden="true">${l.label}</span></a>`)}
          </div>
        </div>
      </div>
      <form class="form-rows" onSubmit=${submit}>
        <h3>Tell me about your <span class="em">app.</span></h3>
        <label class="frow" for="c-name"><span class="n" aria-hidden="true">01</span><span class="k">Name</span><input id="c-name" name="name" autoComplete="name" placeholder="Your name" /></label>
        <label class="frow" for="c-email"><span class="n" aria-hidden="true">02</span><span class="k">Email</span><input id="c-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" /></label>
        <label class="frow tall" for="c-project"><span class="n" aria-hidden="true">03</span><span class="k">Project</span><textarea id="c-project" name="project" rows="4" placeholder="What are you building, and where are you stuck?"></textarea></label>
        <fieldset class="frow need">
          <span class="n" aria-hidden="true">04</span>
          <legend class="k">What do you need?</legend>
          <div class="opts">${NEEDS.map(([t]) => html`<button key=${t} type="button" aria-pressed=${need.includes(t)} onClick=${() => toggle(t)}>${t}</button>`)}</div>
        </fieldset>
        <div class="form-foot">
          <p class="fine-print">No newsletters, no spam.<br />Just a reply from me.</p>
          <button type="submit" class="send">Send message<span class="go" aria-hidden="true"><span class="ex-icon" aria-hidden="true" data-icon="arrow_forward"></span></span></button>
        </div>
      </form>
    </section>`;
  }

  /* Routes: "/" is home, "/apps" every app, "/about", "/talks" and "/talks/<slug>" one talk, "/events" and "/events/<name-year>" one event, "/<slug>" an app,
     and "/<slug>/privacypolicy" and "/<slug>/termsofservice" its legal pages. design/prerender.js writes each to its own HTML file. */
  const LEGAL = { privacypolicy: 'privacy', termsofservice: 'terms' };
  const DEPTH = { home: 0, all: 1, about: 1, talks: 1, events: 1, missing: 1, app: 2, talk: 2, event: 2, privacy: 3, terms: 3 };
  const PAGES = { apps: 'all', about: 'about', talks: 'talks', events: 'events' };
  function parseRoute() {
    const parts = location.pathname.split('/').filter(Boolean).map(p => p.toLowerCase());
    if (!parts.length) return { page: 'home' };
    if (parts[0] === 'talks' && parts.length === 2) { const talk = TALKS.find(t => t.slug === parts[1]); return talk ? { page: 'talk', talk } : { page: 'missing' }; }
    if (parts[0] === 'events' && parts.length === 2) { const ev = ALL_EVENTS.find(e => eventPath(e) === '/events/' + parts[1]); return ev ? { page: 'event', ev } : { page: 'missing' }; }
    if (PAGES[parts[0]]) return parts.length === 1 ? { page: PAGES[parts[0]] } : { page: 'missing' };
    const app = APPS.find(a => a.slug === parts[0]);
    if (!app || parts.length > 2) return { page: 'missing' };
    if (parts.length === 1) return { page: 'app', app };
    return LEGAL[parts[1]] ? { page: LEGAL[parts[1]], app } : { page: 'missing' };
  }
  const routeKey = r => r.page + (r.app ? ':' + r.app.slug : '') + (r.talk ? ':' + r.talk.slug : '') + (r.ev ? ':' + eventPath(r.ev).slice(8) : '');
  const SITE = 'https://dinoyraj.com';
  const ROUTES = ['/', '/apps', '/about', '/talks', ...TALKS.map(t => '/talks/' + t.slug), '/events', ...ALL_EVENTS.map(eventPath),
    ...APPS.flatMap(a => ['/' + a.slug, '/' + a.slug + '/privacypolicy', '/' + a.slug + '/termsofservice'])];

  /* Title, description and canonical path of each page. index: false keeps the near-identical legal pages out of search results. */
  function routeHead(r) {
    const a = r.app, t = r.talk;
    if (r.page === 'all') return { path: '/apps', title: 'Android Apps by Dinoy Raj | Kotlin & Jetpack Compose',
      desc: 'All ' + APPS.length + ' Android apps by Dinoy Raj, built in Kotlin and Jetpack Compose: a minimalist launcher, an offline Gemini Nano playground, a pomodoro timer and screen-time tools.' };
    if (r.page === 'about') return { path: '/about', title: 'About Dinoy Raj | Android Developer & Speaker, India',
      desc: 'Dinoy Raj is a senior Android developer and speaker from Thiruvananthapuram, India, building apps in Kotlin and Jetpack Compose and speaking about on-device AI.' };
    if (r.page === 'talks') return { path: '/talks', title: 'Talks by Dinoy Raj | On-Device AI, Launchers & Agentic Android',
      desc: 'Conference talks by Android developer Dinoy Raj on Gemini Nano and on-device AI, offline RAG, App Functions, custom launchers and Kotlin Multiplatform.' };
    if (r.page === 'talk') return { path: '/talks/' + t.slug, title: (t.seoTitle || t.text) + ' | Dinoy Raj', desc: t.seo, type: 'article' };
    if (r.page === 'events') return { path: '/events', title: 'Events by Dinoy Raj | droidcon, DevFest & FOSSASIA Talks',
      desc: 'Every conference and meetup where Android developer Dinoy Raj has spoken: droidcon, DevFest, FOSSASIA Summit and Mobile Developers Week, with dates, venues and sessions.' };
    if (r.page === 'event') return { path: eventPath(r.ev), title: 'Dinoy Raj at ' + r.ev.name + ' ' + r.ev.when.split(' ')[1] + ' | ' + (r.ev.online ? 'Online' : r.ev.where) + ', ' + evDates(r.ev), desc: evSummary(r.ev) };
    if (r.page === 'app') return { path: '/' + a.slug, title: a.name + ': ' + a.store + (/android/i.test(a.store) ? '' : ' for Android') + ' | Dinoy Raj', desc: a.seo || a.desc }; // seo: a search-result version of desc, where desc leans on the page around it
    if (r.page === 'privacy') return { path: '/' + a.slug + '/privacypolicy', title: 'Privacy policy · ' + a.name, index: false,
      desc: 'Privacy policy for ' + a.name + ', an Android app by Dinoy Raj: what it collects, what it doesn\'t, and the permissions it uses.' };
    if (r.page === 'terms') return { path: '/' + a.slug + '/termsofservice', title: 'Terms of service · ' + a.name, index: false,
      desc: 'Terms of service for ' + a.name + ', an Android app by Dinoy Raj.' };
    if (r.page === 'missing') return { path: location.pathname, title: 'Not found · Dinoy Raj', desc: '', index: false };
    return { path: '/', title: 'Dinoy Raj | Android Developer & Speaker', type: 'profile', preload: true,
      social: 'Focused Android apps in Kotlin and Jetpack Compose, and talks on on-device AI, launchers and agentic Android.',
      desc: 'Dinoy Raj is an Android developer and conference speaker who designs and builds focused Android apps in Kotlin and Jetpack Compose, with Material 3 Expressive design.' };
  }

  /* Structured data for each page: the same Person and WebSite everywhere, plus what the page is about and its breadcrumb. */
  const PERSON = {
    '@type': 'Person', '@id': SITE + '/#person', name: 'Dinoy Raj', alternateName: 'Dinoy', givenName: 'Dinoy', familyName: 'Raj',
    url: SITE + '/', image: SITE + '/assets/dinoy.jpg', jobTitle: 'Android Developer',
    description: 'Android developer and conference speaker from Thiruvananthapuram, India, who designs and builds focused Android apps in Kotlin and Jetpack Compose.',
    email: 'mailto:' + EMAIL,
    address: { '@type': 'PostalAddress', addressLocality: 'Thiruvananthapuram', addressRegion: 'Kerala', addressCountry: 'IN' },
    hasOccupation: { '@type': 'Occupation', name: 'Android Developer', skills: 'Kotlin, Jetpack Compose, Material 3 Expressive, on-device AI' },
    knowsAbout: ['Android', 'Kotlin', 'Jetpack Compose', 'Kotlin Multiplatform', 'Material 3 Expressive', 'Design systems', 'Gemini Nano', 'On-device AI', 'MediaPipe', 'Android launchers', 'App Functions'],
    sameAs: [LINKS.github, LINKS.linkedin, LINKS.play, LINKS.instagram, LINKS.x, LINKS.youtube, LINKS.medium, LINKS.sessionize, LINKS.linktree],
  };
  const WEBSITE = { '@type': 'WebSite', '@id': SITE + '/#website', url: SITE + '/', name: 'Dinoy Raj', alternateName: ['Dinoy', 'dinoyraj.com'], inLanguage: 'en', publisher: { '@id': SITE + '/#person' } };
  const APP_CATEGORY = { nano: 'DeveloperApplication', habits: 'HealthApplication', mindful: 'HealthApplication', focus: 'ProductivityApplication', meetings: 'BusinessApplication', timeline: 'BusinessApplication', countdown: 'LifestyleApplication', links: 'ProductivityApplication' };
  const crumbs = list => ({ '@type': 'BreadcrumbList', itemListElement: [['Dinoy Raj', '/'], ...list].map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE + path })) });
  const appNode = a => ({
    '@type': 'MobileApplication', '@id': SITE + '/' + a.slug + '#app', name: a.name, alternateName: a.alt ? [a.store, ...a.alt] : a.store, url: SITE + '/' + a.slug, description: a.seo || a.desc,
    operatingSystem: 'Android', applicationCategory: APP_CATEGORY[a.id] || 'UtilitiesApplication', image: SITE + '/assets/apps/' + a.id + '-icon.webp',
    screenshot: a.shots.map((_, i) => SITE + appImg(a, i + 1)), author: { '@id': SITE + '/#person' }, publisher: { '@id': SITE + '/#person' }, keywords: a.tags.join(', '),
    ...(a.links && a.links.find(([l]) => l === 'Google Play') ? { installUrl: a.links.find(([l]) => l === 'Google Play')[1] } : {}),
    ...(a.links && a.links.find(([l]) => l === 'Google Play') ? { downloadUrl: a.links.find(([l]) => l === 'Google Play')[1] } : {}),
    ...(a.links && a.links.find(([l]) => l === 'Google Play') ? { offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD', availability: 'https://schema.org/InStock' } } : {}), // free on Google Play
    ...(a.links ? { sameAs: a.links.map(([, h]) => h) } : {}), // its Play Store listing, website and source
    ...(a.status === 'wip' ? { releaseNotes: 'In development' } : {}),
  });
  // Speaking appearances as schema.org Events with Dinoy as performer (schema.org has no speaking-engagement type).
  const eventId = ev => SITE + eventPath(ev) + '#event';
  // Google wants startDate as a full YYYY-MM-DD date: give an event its exact day (date: '2026-11-14') once known. Until then the
  // month (YYYY-MM, valid ISO 8601) stands in, since startDate is required and an Event without one is worse than a coarse date.
  // endDate: the last day (end: 'YYYY-MM-DD') for multi-day events, else the start. organizer: who runs it (org: 'GDG Mumbai'),
  // else the event's own name. offers: only with a real ticket page (tickets: 'https://…'), never a made-up price.
  const eventNode = ev => {
    const start = ev.date || isoMonth(ev.when);
    const sessions = evSessions(ev);
    return {
      '@type': 'Event', '@id': eventId(ev), name: ev.name, startDate: start, endDate: ev.end || start,
      description: evSummary(ev),
      image: SITE + '/assets/og.jpg',
      eventAttendanceMode: 'https://schema.org/' + (ev.online ? 'Online' : 'Offline') + 'EventAttendanceMode', eventStatus: 'https://schema.org/EventScheduled',
      location: ev.online ? { '@type': 'VirtualLocation', url: ev.site || LINKS.sessionize } : { '@type': 'Place', name: ev.where, address: ev.addr || ev.where },
      performer: { '@id': SITE + '/#person' },
      ...(sessions.length ? { workPerformed: sessions.map(x => x.t ? { '@id': SITE + '/talks/' + x.t.slug + '#talk' } : { '@type': 'CreativeWork', name: x.title }) } : {}),
      organizer: { '@type': 'Organization', name: ev.org || ev.name, ...(ev.site ? { url: ev.site } : {}) },
      ...(ev.tickets ? { offers: { '@type': 'Offer', url: ev.tickets, availability: 'https://schema.org/InStock', validFrom: start } } : {}),
      url: SITE + eventPath(ev), ...(ev.site ? { sameAs: ev.site } : {}),
    };
  };
  const talkNode = t => ({ '@type': 'CreativeWork', '@id': SITE + '/talks/' + t.slug + '#talk', url: SITE + '/talks/' + t.slug, name: t.text, alternateName: t.title,
    abstract: t.abstract.join(' '), author: { '@id': SITE + '/#person' }, inLanguage: 'en',
    ...(t.slides ? { subjectOf: { '@type': 'PresentationDigitalDocument', name: 'Slides: ' + t.text, url: t.slides } } : {}) });
  function routeJsonLd(r) {
    const h = routeHead(r), url = SITE + h.path;
    const page = (type, extra) => ({ '@type': type, '@id': url + '#page', url, name: h.title, description: h.desc, isPartOf: { '@id': SITE + '/#website' }, inLanguage: 'en', ...extra });
    const graph = [PERSON, WEBSITE];
    if (r.page === 'home') {
      // The home page carries the fullest graph: its talks, apps, blog posts and speaking events.
      graph[0] = { ...PERSON, performerIn: EVENTS.map(ev => ({ '@id': eventId(ev) })) };
      graph.push(page('ProfilePage', { '@id': SITE + '/#profile', mainEntity: { '@id': SITE + '/#person' }, primaryImageOfPage: SITE + '/assets/og.jpg', hasPart: [{ '@id': SITE + '/#apps' }, { '@id': SITE + '/#talks' }] }),
        ...EVENTS.map(eventNode),
        { '@type': 'ItemList', '@id': SITE + '/#talks', name: 'Talks by Dinoy Raj', url: SITE + '/talks', itemListElement: TALKS.map((t, i) => ({ '@type': 'ListItem', position: i + 1, item: talkNode(t) })) },
        { '@type': 'ItemList', '@id': SITE + '/#apps', name: 'Android apps by Dinoy Raj', url: SITE + '/apps', itemListElement: APPS.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE + '/' + a.slug, item: appNode(a) })) },
        ...BLOGS.map(b => ({ '@type': 'BlogPosting', '@id': b.href, url: b.href, headline: b.title, description: b.blurb,
          ...(b.published ? { datePublished: b.published } : {}), author: { '@id': SITE + '/#person' }, publisher: { '@type': 'Organization', name: b.pub } })));
    }
    else if (r.page === 'about') graph.push(page('AboutPage', { mainEntity: { '@id': SITE + '/#person' }, breadcrumb: crumbs([['About', '/about']]) }));
    else if (r.page === 'all') graph.push(page('CollectionPage', { breadcrumb: crumbs([['Apps', '/apps']]),
      mainEntity: { '@type': 'ItemList', itemListElement: APPS.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE + '/' + a.slug, name: a.name })) } }));
    else if (r.page === 'talks') graph.push(...ALL_EVENTS.map(eventNode), page('CollectionPage', { breadcrumb: crumbs([['Talks', '/talks']]),
      mainEntity: { '@type': 'ItemList', itemListElement: TALKS.map((t, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE + '/talks/' + t.slug, name: t.text })) } }));
    else if (r.page === 'talk') graph.push(page('WebPage', { breadcrumb: crumbs([['Talks', '/talks'], [r.talk.title, '/talks/' + r.talk.slug]]),
      mainEntity: { ...talkNode(r.talk), keywords: r.talk.sub.split(' · ').concat(r.talk.takeaways.map(k => k[1])).join(', ') } }));
    else if (r.page === 'events') graph.push(...ALL_EVENTS.map(eventNode), page('CollectionPage', { breadcrumb: crumbs([['Events', '/events']]),
      mainEntity: { '@type': 'ItemList', itemListElement: ALL_EVENTS.map((ev, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE + eventPath(ev), name: ev.name + ' ' + ev.when.split(' ')[1] })) } }));
    else if (r.page === 'event') graph.push(eventNode(r.ev), page('WebPage', { mainEntity: { '@id': eventId(r.ev) },
      breadcrumb: crumbs([['Events', '/events'], [r.ev.name + ' ' + r.ev.when.split(' ')[1], eventPath(r.ev)]]) }));
    else if (r.page === 'app') graph.push(appNode(r.app), page('WebPage', { mainEntity: { '@id': SITE + '/' + r.app.slug + '#app' }, breadcrumb: crumbs([['Apps', '/apps'], [r.app.name, '/' + r.app.slug]]) }));
    else return null;
    return { '@context': 'https://schema.org', '@graph': graph };
  }

  function App() {
    const [route, setRoute] = useState(parseRoute);
    const [enter, setEnter] = useState(null);
    const routeRef = useRef(route);
    useEffect(() => {
      const on = () => {
        const next = parseRoute();
        if (routeKey(next) === routeKey(routeRef.current)) return;
        const dir = DEPTH[next.page] >= DEPTH[routeRef.current.page] ? 'fwd' : 'back';
        routeRef.current = next;
        // Render the other page synchronously, then start it at the top or, going home, land on the section in the URL.
        const swap = () => {
          ReactDOM.flushSync(() => { setRoute(next); setEnter(dir); });
          const el = next.page === 'home' && location.hash && document.getElementById(location.hash.slice(1));
          if (el) window.__reveal(el);
          el ? el.scrollIntoView({ behavior: 'instant' }) : scrollTo({ top: 0, behavior: 'instant' });
        };
        if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return swap();
        const root = document.documentElement;
        root.dataset.nav = dir;
        document.startViewTransition(swap).finished.finally(() => { if (root.dataset.nav === dir) delete root.dataset.nav; });
      };
      // Same-site links change the page without a reload. Section links ("#apps") on an app page go back to home.
      const click = e => {
        if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const a = e.target.closest && e.target.closest('a[href]');
        if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
        const href = a.getAttribute('href');
        let url;
        if (href[0] === '#') { if (location.pathname === '/') return window.__reveal(document.getElementById(href.slice(1))); url = '/' + href; }
        else if (href[0] === '/' && href[1] !== '/') url = href;
        else return;
        e.preventDefault();
        if (url !== location.pathname + location.hash) history.pushState(null, '', url);
        on();
      };
      addEventListener('hashchange', on); addEventListener('popstate', on); document.addEventListener('click', click);
      return () => { removeEventListener('hashchange', on); removeEventListener('popstate', on); document.removeEventListener('click', click); };
    }, []);
    useEffect(() => {
      // Each page is pre-rendered with its own head (design/prerender.js); keep it in step when moving between pages without a reload.
      const h = routeHead(route);
      document.title = h.title;
      const canon = document.querySelector('link[rel=canonical]'), meta = document.querySelector('meta[name=description]');
      if (canon) canon.href = SITE + h.path;
      if (meta) meta.content = h.desc;
    }, [route]);
    const [msg, setMsg] = useState(null);
    useEffect(() => { if (!msg) return; const t = setTimeout(() => setMsg(null), 3400); return () => clearTimeout(t); }, [msg]);
    // msg is announced by a status region that stays in the page (a live region only reads changes to text it already holds),
    // not by the snackbar, which mounts together with its message.

    return html`<${React.Fragment}>
      <${TopBlur} />
      <${Nav} />
      ${route.page === 'all' ? html`<${AllApps} enter=${enter} />`
        : route.page === 'about' ? html`<${AboutPage} enter=${enter} />`
        : route.page === 'talks' ? html`<${TalksPage} enter=${enter} />`
        : route.page === 'talk' ? html`<${TalkPage} key=${route.talk.slug} t=${route.talk} enter=${enter} />`
        : route.page === 'events' ? html`<${EventsPage} enter=${enter} />`
        : route.page === 'event' ? html`<${EventPage} key=${eventPath(route.ev)} ev=${route.ev} enter=${enter} />`
        : route.page === 'app' ? html`<${AppPage} key=${route.app.slug} a=${route.app} enter=${enter} />`
        : route.page === 'privacy' || route.page === 'terms' ? html`<${LegalPage} key=${route.page + route.app.slug} a=${route.app} doc=${route.page} enter=${enter} />`
        : route.page === 'missing' ? html`<${Missing} enter=${enter} />`
        : html`<main id="top" data-enter=${enter}>
        <section class="hero wrap">
          <h1><span class="sr-only">Dinoy Raj, Android Developer</span><span class="l1" aria-hidden="true"><${ShapeWord} word="Android" /></span><span class="l2" aria-hidden="true"><${ShapeWord} word="Developer" delay="6.4s" /></span>
            <${MorphShape} className="float f1" seq=${['sunny', 'cookie9', 'flower8', 'clover4', 'cookie12']} fill="var(--highlight)" speed=${22} />
            <${MorphShape} className="float f2" seq=${['burst', 'cookie6', 'flower5', 'pebble', 'cookie4']} fill="var(--primary)" speed=${-30} hold=${1200} />
          </h1>
          <div class="hero-base">
            <div class="year">©2026</div>
            <figure class="portrait" style=${{ margin: 0 }}>
              <${LiveShape} className="halo" shape="flower8" tone="primary" size=${160} />
              <div class="frame">
                <picture>
                  <source srcset="/assets/dinoy-420.webp 420w, /assets/dinoy.webp 600w" sizes="210px" type="image/webp" />
                  <img src="/assets/dinoy.jpg" width="600" height="684" alt="Dinoy Raj, Android developer and speaker" decoding="async" fetchpriority="high" />
                </picture>
                <span class="eyebrow note">Hi, I'm Dinoy</span>
              </div>
              <${LiveShape} className="spark" shape="sunny" tone="highlight" size=${60} />
            </figure>
            <div class="hero-ctas">
              <div class="ex-row">
                <a class="ex-press ex-btn v-filled size-sm" href="#apps"><span class="ex-icon" aria-hidden="true" data-icon="arrow_downward"></span>See my apps</a>
                <a class="ex-press ex-btn v-outlined size-sm" href="#contact">Hire me</a>
              </div>
              <span class="eyebrow muted">/ Shipping calm apps</span>
            </div>
          </div>
        </section>

        <section class="intro wrap" id="about">
          <h2>Hey! <${LiveShape} shape="cookie12" tone="tertiary-container" icon="waving_hand" size=${84} /></h2>
          <div class="intro-grid">
            <p class="lead">I'm ${NAME}, an Android developer who designs the apps <span class="em">before</span> building them.</p>
            <div class="body muted">
              <p>I build focused Android apps in Kotlin and Jetpack Compose: timers, habit trackers, link managers, and blockers for the feeds that eat your evening.</p>
              <p>Every project starts from Expressive Kit, my own Material 3 Expressive design system, so the shapes, colours and motion stay consistent from the first screen to the last.</p>
              <a class="link-arrow" href="#contact" style=${{ alignSelf: 'flex-start', marginTop: '8px' }}>Get started<span class="ex-icon" aria-hidden="true" data-icon="arrow_outward"></span></a>
            </div>
          </div>
        </section>

        <${Statement} />

        <section class="wrap" id="services">
          <h2 class="sec-title">Services</h2>
          <div class="services">
            ${SERVICES.map(s => html`<div class="svc" key=${s.name}>
              <${LiveShape} shape=${s.shape} icon=${s.icon} tone=${s.tone} size=${52} />
              <h3><span>${s.name}</span></h3>
              <div class="tags">${s.tags.map(t => html`<span key=${t}>${t}</span>`)}</div>
            </div>`)}
          </div>
        </section>

        <section class="apps wrap" id="apps">
          <div class="apps-head">
            <div>
              <h2 class="sec-title">My<br/> Apps</h2>
              <p class="muted">Android apps I design and build end to end in Kotlin and Jetpack Compose. Screenshots are the apps' own store screens.</p>
            </div>
            <a class="link-arrow" href="/apps">View all apps<span class="ex-icon" aria-hidden="true" data-icon="arrow_forward"></span></a>
          </div>
          <div class="apps-grid">
            ${APPS.slice(0, 5).map(a => html`<${AppCard} key=${a.id} a=${a} />`)}
          </div>
        </section>

        <section class="how wrap" id="talks">
          <div class="how-head">
            <h2 class="sec-title">Talks</h2>
            <a class="link-arrow" href="/talks">View all talks<span class="ex-icon" aria-hidden="true" data-icon="arrow_forward"></span></a>
          </div>
          <${TalksStage} />
          <div class="events">
            <div class="events-head"><h3 class="events-title">Where I'm speaking</h3><a class="link-arrow" href="/events">View all events<span class="ex-icon" aria-hidden="true" data-icon="arrow_forward"></span></a></div>
            <div class="tix tix-home">${EVENTS.slice(0, HOME_TIX).map(ev => html`<${EventTicket} key=${ev.name + ev.when} ev=${ev} />`)}<${MoreTicket} /></div>
          </div>
        </section>

        <section class="notes wrap" id="blogs">
          <h2 class="sec-title">Blogs</h2>
          <div class="notes-grid">
            ${BLOGS.map((b, i) => html`<${ArticleCard} key=${b.href} b=${b} i=${i} />`)}
            <div class="note dark">
              <h3>Writing on Android, Kotlin and Jetpack Compose.</h3>
              <a class="link-arrow" href=${LINKS.medium} target="_blank" rel="noopener">Read all on Medium<span class="ex-icon" aria-hidden="true" data-icon="arrow_outward"></span></a>
            </div>
          </div>
        </section>

        <${Contact} setMsg=${setMsg} />
      </main>`}

      <footer class="footer">
        <div class="wrap">
          <div class="foot-grid">
            <h2>Small apps,<br/><span class="em">finished</span> properly.</h2>
            <div><h3>/ Quick links</h3><div class="foot-links">
              ${[['Home', '#top'], ['About', '#about'], ['Services', '#services'], ['Apps', '#apps'], ['Talks', '#talks'], ['Events', '/events'], ['Blogs', '#blogs'], ['Contact', '#contact']].map(([l, h]) => html`<a key=${h} href=${h}>${l}</a>`)}
            </div></div>
            <div><h3>/ Elsewhere</h3><div class="foot-links foot-ext">
              ${[['GitHub', LINKS.github], ['LinkedIn', LINKS.linkedin], ['Medium', LINKS.medium], ['Sessionize', LINKS.sessionize], ['Google Play', LINKS.play], ['All links', LINKS.linktree]].map(([l, h]) => html`<a key=${l} href=${h} target="_blank" rel="noopener">${l}</a>`)}
            </div></div>
            <div><h3>/ Contact</h3><div style=${{ fontFamily: 'var(--font-mono)', fontSize: '14px', wordBreak: 'break-all' }}>${EMAIL}</div></div>
            <div class="foot-apps"><h3>/ Apps</h3><div class="foot-links">
              ${APPS.map(a => html`<a key=${a.slug} href=${'/' + a.slug}>${a.name}</a>`)}
            </div></div>
          </div>
          <${Wordmark} text=${NAME.toUpperCase()} />
        </div>
        <div class="wrap fine"><span>© 2026 ${NAME}</span><a class="kit" href="https://github.com/dinoy-raj/material-3-expressive-skill" target="_blank" rel="noopener"><span class="kit-dot" aria-hidden="true"><${ShapeSvg} seq=${['cookie9', 'flower8', 'burst', 'clover4', 'cookie12']} speed=${36} hold=${900} morph=${700} /><span class="ex-icon" aria-hidden="true" data-icon="auto_awesome"></span></span><span>Built with <b>Expressive</b> <span class="em">Kit</span></span><span class="ex-icon kit-go" aria-hidden="true" data-icon="arrow_outward"></span></a></div>
      </footer>
      <div class="sr-only" role="status">${msg || ''}</div>
      ${msg && html`<div class="toast"><${E.Snackbar} role=${null} message=${msg} action="OK" onAction=${() => setMsg(null)} /></div>`}
    <//>`;
  }

  if (location.pathname === '/' && location.hash === ALL_APPS) history.replaceState(null, '', '/apps');
  window.__site = { routes: ROUTES, key: () => routeKey(parseRoute()), head: () => routeHead(parseRoute()), jsonld: () => routeJsonLd(parseRoute()) }; // read by design/prerender.js
  const app = html`<${App} />`, root = document.getElementById('root');
  if (window.__prerender) return window.__prerender(app); // design/prerender.js renders the page to HTML through this hook instead of mounting it
  // Every page is pre-rendered (#root's data-route names the route): hydrate the markup when it is this route's, else draw the route fresh.
  // Hydrate in a transition so React splits the work into short tasks instead of one long one that blocks input.
  if (root.firstElementChild && root.dataset.route === routeKey(parseRoute())) React.startTransition(function () { ReactDOM.hydrateRoot(root, app); });
  else { root.textContent = ''; ReactDOM.createRoot(root).render(app); }
};
