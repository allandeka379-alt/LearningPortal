// Slice w4b: designing games and mobile applications (acs.prog.mobile-games-apps, ZIMSEC only).
import { concept, P, chk, same, mdTable, codeBlock, py } from "../lib.mjs";
import { mc, pm } from "../tables/w4b-q.mjs";

concept("acs.prog.mobile-games-apps", { file: "prog/mobile-games-apps", keyPrefix: "prog.mobile-games-apps" }, (b) => {
  // ---- computed: thorn-bush game
  const gameCode = `position = 0
lives = 2
score = 0
hazards = {3}
prizes = {4}
turns = 0
while lives > 0 and position < 5:
    move = input()
    turns = turns + 1
    if move == "R":
        position = position + 1
    elif move == "L" and position > 0:
        position = position - 1
    if position in hazards:
        lives = lives - 1
        print("Hit a thorn bush")
    if position in prizes:
        score = score + 5
        print("Found a prize")
print("Lives", lives, "score", score, "turns", turns)`;
  const out1 = py(gameCode, "R\nR\nR\nR\nR").split("\n");
  same(out1, ["Hit a thorn bush", "Found a prize", "Lives 1 score 5 turns 5"]);
  const out2 = py(gameCode, "R\nR\nR\nL\nR").split("\n");
  same(out2, ["Hit a thorn bush", "Hit a thorn bush", "Lives 0 score 0 turns 5"]);

  // ---- collisions
  const overlapDef = `def overlap(a, b):
    return a[0] < b[0] + b[2] and a[0] + a[2] > b[0] and a[1] < b[1] + b[3] and a[1] + a[3] > b[1]`;
  const rects = [[[0, 0, 4, 4], [3, 3, 4, 4]], [[0, 0, 4, 4], [4, 0, 4, 4]], [[2, 2, 2, 2], [0, 0, 8, 8]]];
  const hits = py(`${overlapDef}\nprint(sum(1 for a, b in ${JSON.stringify(rects)} if overlap(a, b)))`);
  chk(Number(hits), 2);

  // ---- multiple choice
  mc(b, 2, "RECALL", "Which three steps are repeated on every pass of a game loop?",
    ["Read the input, update the state, show the output", "Each pass handles one step of the game."],
    [["Save the file, close the file, delete the file", "Those are file operations."], ["Compile, link, run", "Those steps build a program."], ["Define, declare, return", "Those are programming terms, not game-loop steps."]],
    "A game loop repeats input, update and output.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which of these is part of the game state?",
    ["The player's score", "The score describes the game at that moment."],
    [["The programming language used", "That is a decision made before the game is run."], ["The colour of the programmer's screen", "It is not part of the game."], ["The name of the file the game is saved in", "That is not part of the game's situation."]],
    "State = positions, score, lives and stage.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is the purpose of collision detection in a game?",
    ["To find when two objects are in the same place", "For example collecting an item or losing a life."],
    [["To make the game run on more than one phone", "That is portability."], ["To store the score in a file", "That is file handling."], ["To stop the player from quitting the game", "That is not collision detection."]],
    "Collision detection triggers the effect of objects meeting.", { daily: true });
  mc(b, 3, "APPLICATION", "A weather app asks for permission to use the phone's location. What is the best reason for this?",
    ["To show the forecast for the place where the user is", "The permission is needed for a feature of the app."],
    [["To send the user's contacts to the developer", "Contacts are not needed for a forecast."], ["To make the screen brighter", "Location does not control brightness."], ["To save battery", "Using location uses more battery."]],
    "A permission should be asked for only when a feature needs it.", { hints: ["Which feature of a weather app needs to know where the user is?"] });
  mc(b, 2, "UNDERSTANDING", "Why is it useful for a school app to work offline?",
    ["It still works when the connection is poor", "Data is stored on the phone and synchronised later."],
    [["Offline apps need no battery power at all to run", "All apps use the battery."], ["Offline apps cannot be copied to another phone", "That is not related to being offline."], ["Offline apps can use any amount of the phone memory", "The memory of the phone is limited."]],
    "Offline use keeps the app working when there is no connection.");
  mc(b, 3, "ANALYSIS", "Which design decision best reduces the data cost of a news app for users with small data bundles?",
    ["Show text first and load images only on request", "Text needs far less data than images."],
    [["Play a video on the home screen as soon as it opens", "Video uses a lot of data."], ["Download every article again each time the app opens", "That uses data repeatedly."], ["Refresh the whole screen every second for new content", "Constant refreshing uses data and battery."]],
    "Low-data design uses text first, compression and caching.", { hints: ["Which content uses the least data?"] });
  mc(b, 2, "RECALL", "Which feature is characteristic of a mobile app rather than a desktop program?",
    ["Input by touch on a small screen", "Taps and swipes replace the mouse."],
    [["Input only by a keyboard and mouse", "That describes a desktop."], ["A very large screen", "Phones have small screens."], ["No use of sensors", "Phones have sensors such as GPS."]],
    "Mobile apps are designed for touch and small screens.");

  // ---- true / false
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A game loop must contain a condition that can end it, such as the number of lives reaching zero.", answer: true,
    explanation: "True. Without an end condition the loop would repeat for ever." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "An app should ask for every permission that the phone offers, in case it needs them later.", answer: false,
    explanation: "False. An app should ask only for the permissions needed for its features." });

  // ---- fib, num, short, match
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the description of the game loop by choosing the correct words.",
    template: "The player's tap is the {{blank:a}}.\n\nMoving the player and adding to the score is the {{blank:b}}.\n\nDrawing the new position on the screen is the {{blank:c}}.",
    blanks: [{ id: "a", accepted: ["input"], choices: ["input", "update", "output", "state"] }, { id: "b", accepted: ["update"], choices: ["input", "update", "output", "state"] }, { id: "c", accepted: ["output"], choices: ["input", "update", "output", "state"] }],
    explanation: "A tap is input, changing the state is the update, and drawing it is output." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Two rectangles collide when they overlap in both directions; touching edges do not count."],
    stem: "A game checks three pairs of rectangles, each described by (x, y, width, height), for collisions. Rectangles that only touch along an edge do not collide.\n\n" + mdTable(["Pair", "Rectangle A", "Rectangle B"], rects.map((r, i) => [i + 1, `(${r[0].join(", ")})`, `(${r[1].join(", ")})`])) + "\nHow many of the pairs collide?",
    value: 2, wrong: [1, 3], workedSolution: "Pair 1: A covers x 0 to 4 and y 0 to 4, B covers x 3 to 7 and y 3 to 7, so they overlap. Pair 2: A ends at x = 4 where B starts, so they only touch. Pair 3: A is inside B, so they overlap. Two pairs collide.", explanation: "Pairs 1 and 3 collide; pair 2 only touches." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the term for the data that describes a game at one moment, such as the positions, the score and the lives.", accepted: ["game state", "state", "the game state"], wrong: ["game loop"], explanation: "The game state." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each mobile app feature to a design implication.",
    pairs: [["Touch input", "Buttons must be large enough for a finger"], ["Offline use", "Data is stored on the phone and synchronised later"], ["Limited data bundle", "Text first, small images and caching"], ["Permissions", "Ask only for what the features need"]],
    explanation: "Each feature of the device leads to a design decision." });

  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Name the three steps and say how the loop ends."],
    stem: "Explain what happens in the game loop of a simple game. [3]",
    points: ["The loop repeats while the game is not over", "On each pass the program reads the player's input and updates the game state (movement, collisions, score)", "It then shows the new state to the player"],
    modelAnswer: "The loop repeats until the game is over. On each pass it reads the input, updates the state (movement, collisions, score) and shows the new state to the player.", explanation: "Input, update, output until the end." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 4, hints: ["Screens, input, stored data and low-data design."],
    stem: "Design a mobile app that shows the daily market prices of vegetables to farmers who have small data bundles and unreliable connections. Describe four features of the design. [4]",
    points: ["Screens: a home screen with a list of vegetables and a price screen for each, with simple navigation", "Large buttons and clear text for touch input on small screens", "Prices are stored on the phone and updated when a connection is available, so the app works offline", "Low-data design: text only, compressed data and no large images or video"],
    modelAnswer: "A home screen lists the vegetables and a price screen shows each one. Buttons and text are large for touch input. The latest prices are stored on the phone and updated when a connection is available, so the app works offline. Only text is downloaded, to keep data use low.", explanation: "Link the features to the users and conditions." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 2, stem: "Explain why an app should request only the permissions it needs. [2]",
    points: ["Each permission gives the app access to personal data or hardware (such as location or contacts), which is a risk to the user's privacy", "Users trust the app less, and may refuse to install it, if it asks for permissions that its features do not need"],
    modelAnswer: "Permissions give access to personal data or hardware, which risks the user's privacy, and users trust an app less if it asks for more than its features need.", explanation: "Minimal permissions protect privacy." , hints: ["Think about the user's privacy and trust."] });
  b.manualShort({ d: 4, skill: "CREATION", marks: 3, hints: ["Use an IF inside the loop."],
    stem: "In a game the variable `Lives` starts at 3 and the variable `Position` is the player's cell. Write pseudocode for the part of the game loop that reduces the lives by 1 and outputs a message if the player's cell is 4, and ends the loop when the lives reach 0. [3]",
    points: ["A selection testing Position = 4", "Lives ← Lives - 1 and an output message inside the selection", "A loop condition (WHILE Lives > 0, or an equivalent test) that ends the loop when the lives reach 0"],
    modelAnswer: codeBlock(`WHILE Lives > 0 DO
    // read the input and move the player here
    IF Position = 4 THEN
        Lives ← Lives - 1
        OUTPUT "You hit a hazard"
    ENDIF
ENDWHILE`), explanation: "A collision test and the end condition." });

  // ---- structured practice
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: false, hints: ["Follow the position after each move.", "The loop stops when lives are 0 or the position reaches 5."],
    explanation: "Tracing a game loop with lives, hazards and prizes.",
    stem: `A learner in Masvingo writes this text-based game. The player walks along a path of cells 0 to 5; cell 3 has a thorn bush and cell 4 has a prize. The player types R to move right and L to move left. The five commands typed are R, R, R, R, R.\n\n${codeBlock(gameCode, "python")}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the first line of output.", accepted: [out1[0]], normalise: ["trim", "collapse_whitespace"], explanation: "The third R moves the player to cell 3, which has a thorn bush." }),
      P.short({ label: "(b)", marks: 1, stem: "State the second line of output.", accepted: [out1[1]], normalise: ["trim", "collapse_whitespace"], explanation: "The fourth R moves the player to cell 4, which has a prize." }),
      P.fib({ label: "(c)", marks: 3, stem: "State the values in the last line of output.", template: "Lives = {{blank:a}}\n\nScore = {{blank:b}}\n\nTurns = {{blank:c}}", blanks: [{ id: "a", input: "number", accepted: ["1"] }, { id: "b", input: "number", accepted: ["5"] }, { id: "c", input: "number", accepted: ["5"] }], wrong: [["2", "0", "3"]], explanation: "One thorn bush costs a life (2 - 1 = 1), the prize gives 5, and there were 5 turns, the last ending the game at cell 5." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the loop condition includes `position < 5`.", points: ["Cell 5 is the end of the path, so reaching it finishes the game", "Without this condition the loop would carry on asking for moves after the end of the path"], modelAnswer: "Cell 5 is the end of the path, so the game finishes when the player reaches it. Without the condition the loop would keep asking for moves.", explanation: "The loop needs an end condition for winning as well as losing." }),
      P.manual({ label: "(e)", marks: 1, stem: "Identify the lines that carry out the collision detection in the program.", points: ["The two if statements that test whether position is in hazards and whether it is in prizes"], modelAnswer: "The statements `if position in hazards` and `if position in prizes`.", explanation: "They test whether the player is in the same cell as an object." }),
    ] });
  b.struct({ d: 3, skill: "CREATION", examStyle: true, hints: ["Use headings for the screens, inputs, data and permissions."],
    explanation: "Designing a mobile app for a described group of users.",
    stem: "A clinic in Mutare wants a mobile app that reminds mothers of the dates of their children's vaccinations. Many mothers have basic smartphones, small data bundles and a poor signal.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe two screens of the app and what each one shows.", points: ["A home screen listing the children with the date of the next vaccination for each", "A detail screen for one child with the vaccinations already given and those still due"], modelAnswer: "A home screen lists each child with the next vaccination date. A detail screen for one child shows the vaccinations given and those still due.", explanation: "Each screen has one clear job." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain how the app can work when there is no signal.", points: ["The children's records and dates are stored on the phone", "Reminders are shown by the phone at the stored dates, and changes are synchronised when a connection becomes available"], modelAnswer: "The records and dates are stored on the phone, so the reminders can be shown without a signal, and any changes are synchronised when a connection is available.", explanation: "Local storage gives offline use." }),
      P.manual({ label: "(c)", marks: 1, stem: "State one permission the app may need and the reason.", points: ["Notifications, so that it can remind the mother on the day (or storage, to keep the records on the phone)"], modelAnswer: "Notifications, so that it can remind the mother on the right day.", explanation: "Name the permission and the reason." }),
      P.manual({ label: "(d)", marks: 1, stem: "Give one way the design keeps the cost of data low.", points: ["The app downloads only small text updates and no images or video"], modelAnswer: "It downloads only small text updates, not images or video.", explanation: "Low-data design." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Game loop", "A loop that repeats input, update and output until the game ends.");
  b.card("DEFINITION", "Game state", "The data describing the game at one moment: positions, score, lives and stage (menu, playing, paused, game over).");
  b.card("DEFINITION", "Collision detection", "Testing whether two objects are in the same place so that the game can respond.");
  b.card("FORMULA", "Rectangle overlap", "A and B overlap when they overlap in x and in y: A.x < B.x + B.w and A.x + A.w > B.x, and the same for y.");
  b.card("FACT", "Mobile app features", "Small screens, touch input, sensors (GPS, camera), permissions, offline use, low-data design, battery use.");
  b.card("CONCEPT", "Offline design", "Store data on the phone and synchronise when a connection is available.");
  b.card("CONCEPT", "Low-data design", "Text first, compressed images, caching, small downloads.");
  b.card("CONCEPT", "Permissions", "Ask only for the permissions that a feature needs, and explain the reason to the user.");
  b.card("CONCEPT", "Designing with a local theme", "State purpose and users, screens, inputs, stored data, rules, permissions and offline behaviour; use local places, languages or games.");
});
