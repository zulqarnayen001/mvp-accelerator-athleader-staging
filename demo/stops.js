/* The demo's stops and steps (v4, Oct 14, 2026): the run of show agreed with Melissa and Shari, covering Melissa's
   points (the season from onboarding on, conditioning in action, learning transfer, the human connection, measurable
   impact; building the M.V.P., the Core 4 insights, the 90-day plan; the Pros; Squad Meetups) and Shari's (one leader
   and their manager throughout, the room makes one decision, honest measures, a close on business value).
   demo.js plays them; the run sheet is printed from the same list (build_demo.py), so the two never drift apart.
   card = a chapter card drawn by the demo; course = module + screen id, opened live; pdf = a document page.
   short = the agenda label; min = planned minutes (15 in all). */
window.DEMO_STOPS = [
  { title: 'Welcome', short: '', min: 0, steps: [
    { card: 'title', label: 'Welcome',
      say: 'Thank you for having us. For the next 15 minutes you’ll see the M.V.P. Accelerator the way your leaders will: one participant, Jordan, and Jordan’s manager, through a full season. And you’ll make one of the calls yourselves.',
      do: 'Press Next, the right arrow or your clicker to start. F for full screen; the bars hide until you move the mouse.' }] },
  { title: 'The promise', short: 'The promise', min: 1.5, steps: [
    { card: 'opener', label: 'Why conditioning',
      say: 'Under pressure, leaders don’t rise to what they know. They fall back on what they’ve practiced. That’s why we condition leaders the way athletes train: real moments, deliberate reps and progress you can measure.',
      do: 'The course’s opener plays (8 seconds, with sound), then the line appears. Let it land before you speak.' },
    { course: 'a0', screen: 'G6c', label: 'What will be different',
      say: 'This is the promise every leader sees in Getting Started, from “under pressure, I don’t always access it” to “the pressure hasn’t disappeared, but I am more ready for it.” Four shifts, and they come back at the end of the season.',
      do: '' },
    { card: 'season', label: 'One season, two tracks',
      say: 'The season: Getting Started, then six lessons of about 35 to 40 minutes, each followed by one core rep at work. Participants and their managers take parallel tracks and meet at the Starting Line and the 180. It’s an experience, not a course people click through once.',
      do: 'Point to the two tracks, then where they meet.' }] },
  { title: 'Discover', short: 'Discover', min: 1.5, steps: [
    { course: 'a1', screen: '1.8', label: 'The Core 4',
      say: 'Four leadership muscles we condition: Agility, Resilience, Alignment and Wellbeing. Each one shows what it’s made of and a test leaders can run on themselves.',
      do: 'Open one or two of the tabs.' },
    { course: 'a1', screen: '1.8b', label: 'Your Starting Line',
      say: 'Jordan rates where they start, privately. These Core 4 insights show strengths and gaps, and they’re the starting line we come back to at the end of the season.',
      do: 'Ask the room for one rating and change it live.' }] },
  { title: 'Condition', short: 'Condition', min: 3, steps: [
    { course: 'a1', screen: '1.1', label: 'The Moment',
      say: 'Every lesson starts with a real moment of pressure from a workday. Not a case study about someone else: a moment your leaders will recognize.',
      do: 'Read the scene aloud.' },
    { course: 'a1', screen: '1.10', label: 'Make the Call',
      say: 'Now it’s your call. Thirty seconds: what do you do first, and what might your first reaction make you miss?',
      do: 'Start the 30-second timer, take a show of hands, choose their answer and read the outcome.' },
    { course: 'a1', screen: '1.R', label: 'The Foundation Reset',
      say: 'Under pressure, the brain’s alarm fires faster than the part that plans. The Foundation Reset is five words, two options, one default: a way to tell the alarm to stand down, practiced until it’s automatic.',
      do: 'Point to Jordan’s five words.' },
    { course: 'a1', screen: '1.3', label: 'The Drill',
      say: 'Then a short drill to rehearse the response, the way athletes run plays. That’s the difference between knowing what good leadership looks like and doing it when it counts.',
      do: 'Play 15 to 20 seconds, then move on.' }] },
  { title: 'Take it to work', short: 'At work', min: 1, steps: [
    { course: 'a1', screen: '1.12', label: 'Condition the Reps',
      say: 'Learning transfer is built in. Every lesson ends with one core rep at work that week, about ten minutes, in the leader’s Playbook. Then they ask one person how it landed, and the next lesson’s check-in brings back their own words.',
      do: 'Point to the core rep, then the feedback line.' }] },
  { title: 'Build the M.V.P.', short: 'M.V.P.', min: 1.5, steps: [
    { course: 'a3', screen: '3.7', label: 'M.V.P. + V',
      say: 'In Lesson 3 each leader builds their M.V.P.: Mission, Vision and Purpose, with Values underneath, from the foundation up: purpose first.',
      do: 'Open Purpose, then Mission.' },
    { course: 'a3', screen: '3.10', label: 'Purpose, Vision, or Mission?',
      say: 'A quick sort makes the difference stick.',
      do: 'Sort one statement with the room.' }] },
  { title: 'The 90-day plan', short: '90-day plan', min: 1.5, steps: [
    { course: 'a5', screen: '5.9', label: 'From Gap to SMART Goal',
      say: 'The starting line showed where the gaps are. In Lesson 5, a gap becomes a SMART goal, one letter at a time.',
      do: 'Step through two of the letters. Evan is the lesson’s worked example.' },
    { pdf: 'SCORECARD', page: 4, label: 'The 90-Day Way Scorecard',
      say: 'And this is what they leave with: the 90-Day Way Scorecard, filled in. Their M.V.P. at the top, goals across all four pillars, personal and professional, with daily and weekly actions and review points. It’s the plan that keeps working after the season, and the base for measuring progress against the gaps from the starting line.',
      do: 'It opens on page 4, the professional goals; the arrow shows page 5, the personal goals. Page 2 is your own M.V.P., if you want to show it.' }] },
  { title: 'The Pros', short: 'The Pros', min: 1, steps: [
    { course: 'a1', screen: '1.13', label: 'Athleader Pro Huddle',
      say: 'Leaders learn from Pros in sports, business and neuroscience: how they condition themselves to perform when it counts. The experience reaches beyond one voice.',
      do: 'Play about 20 seconds of Tracey Newell.' },
    { course: 'a1', screen: '1.14', label: 'The 3-Minute Drill',
      say: 'Each Pro leaves a 3-minute drill a leader can run alone or with their team.',
      do: 'Show the steps; no need to start the timer.' }] },
  { title: 'Reinforce', short: 'Reinforce', min: 1.5, steps: [
    { course: 'p1', screen: '1.14', label: 'The Starting Line',
      say: 'Managers take their own track as Player-Coaches. In their first lesson they hold the Starting Line conversation with their Athleader: agree on the season and name what each of them needs.',
      do: 'Point to the five steps of the conversation.' },
    { card: 'r180', label: 'The 180',
      say: 'At the end of the season each gives feedback on the other in the 180: Jordan on their Player-Coach, and the Player-Coach on Jordan. The manager isn’t running a separate process; they’re coaching the same season.',
      do: 'Point to the two sides, then the 180 between them.' },
    { card: 'squad', label: 'Squad Meetups',
      say: 'Squad Meetups bring peers together for real-time practice in a real-world setting: high stakes, low risk, on specific business situations and personal challenges. They run alongside the course.',
      do: 'This is a summary card; describe the format in your own words.' }] },
  { title: 'Measure and close', short: 'Measure', min: 2.5, steps: [
    { course: 'a6', screen: '6.9', label: 'Then and Now',
      say: 'Every lesson ends with a Pulse Check, so the trend is visible all season. In Lesson 6, Jordan sees their Lesson 1 starting line next to today. These are Jordan’s own ratings, pillar by pillar.',
      do: 'Point to the gains.' },
    { course: 'a6', screen: 'E3c', label: 'What’s different now',
      say: 'Remember the promise from the start? This is where it comes back. Where Jordan started, and where they are now, in their own words, with their five words from Lesson 1.',
      do: 'Select one “True for me now?” to show the answer, then read the line at the bottom.' },
    { card: 'cohort', label: 'Across a cohort',
      say: 'Across a cohort, matched pre, Pulse and post results show where the group is growing. This view is an illustrative sample: your own data replaces it. The measures are self-reported, and we say so.',
      do: '' },
    { card: 'recap', label: 'What you just saw',
      say: 'So in fifteen minutes: how your leaders will experience the season, how practice and their managers make behavior stick, and how you’ll see progress.',
      do: '' },
    { card: 'question', label: 'One question for you',
      say: 'If your leaders could make measurable progress in one critical growth area over the next 90 days, which area would matter most to your organization?',
      do: 'Ask it, then listen. Connect their answer to a pilot or the next conversation.' }] },
  { title: 'Thank you', short: '', min: 0, steps: [{ card: 'end', label: 'Thank you', say: 'Thank you.', do: '' }] }
];
