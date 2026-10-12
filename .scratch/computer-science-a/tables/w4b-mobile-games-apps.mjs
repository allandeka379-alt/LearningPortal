import { run, writeLesson, mdTable, codeBlock, py, same } from "./w4b-q.mjs";

const game = run(`cells = 8
position = 0
cattle = {2, 5}
score = 0
moves = 0
state = "playing"
while state == "playing":
    command = input()
    moves = moves + 1
    if command == "R" and position < cells - 1:
        position = position + 1
    elif command == "L" and position > 0:
        position = position - 1
    if position in cattle:
        cattle.remove(position)
        score = score + 10
        print("Collected cattle at", position)
    if len(cattle) == 0:
        state = "won"
print("Game over:", state, "- score", score, "in", moves, "moves")`, "R\nR\nR\nR\nR");
same(game.out, "Collected cattle at 2\nCollected cattle at 5\nGame over: won - score 20 in 5 moves");

// player trace for the table
const cmds = ["R", "R", "R", "R", "R"];
let pos = 0, score = 0; const cattle = new Set([2, 5]);
const rows = [];
cmds.forEach((c, i) => {
  if (c === "R" && pos < 7) pos++; else if (c === "L" && pos > 0) pos--;
  let note = "";
  if (cattle.has(pos)) { cattle.delete(pos); score += 10; note = "cattle collected"; }
  rows.push([i + 1, c, pos, score, note]);
});
same(rows.map((r) => r[3]), [0, 10, 10, 10, 20]);
const traceMd = mdTable(["Move", "Command", "Position", "Score", "Event"], rows);

// collision test (rectangles)
const overlapDef = `def overlap(a, b):
    return a[0] < b[0] + b[2] and a[0] + a[2] > b[0] and a[1] < b[1] + b[3] and a[1] + a[3] > b[1]
`;
const pairs = [
  [[0, 0, 10, 10], [5, 5, 10, 10], "overlap in both directions"],
  [[0, 0, 10, 10], [10, 0, 10, 10], "touching edges only"],
  [[0, 0, 10, 10], [20, 20, 5, 5], "far apart"],
  [[4, 4, 2, 2], [0, 0, 10, 10], "one inside the other"],
];
const ov = py(`${overlapDef}\nfor a, b in ${JSON.stringify(pairs.map((p) => [p[0], p[1]]))}:\n    print(overlap(a, b))`).split("\n");
same(ov, ["True", "False", "False", "True"]);
const collTable = mdTable(["Rectangle A (x, y, width, height)", "Rectangle B", "Situation", "Collision?"], pairs.map((p, i) => [`(${p[0].join(", ")})`, `(${p[1].join(", ")})`, p[2], ov[i] === "True" ? "Yes" : "No"]));

const states = mdTable(["Current state", "Event", "Next state"], [
  ["Menu", "Player taps Start", "Playing"],
  ["Playing", "Player taps Pause", "Paused"],
  ["Paused", "Player taps Resume", "Playing"],
  ["Playing", "All cattle collected, or lives are 0", "Game over"],
  ["Game over", "Player taps Play again", "Playing"],
]);

const body = `
## Introduction

Many learners in Zimbabwe first meet computers through a phone. A phone game or app is a program like any other, with variables, loops and selection, but it is organised around a user who touches, tilts and walks about with the device, often on a slow connection and a limited data bundle. This lesson looks at how a simple game is structured, what features make a mobile application different from a desktop one, how to design a game or an app with a local theme, and how a small game is written in Python.

You should know sequence, selection and iteration, and the lesson on user-interface design. Programs here are text-based, so they can be run in a console; the same ideas apply to a game drawn on a screen. Every program was run and the output pasted.

## Key definitions

:::definition{term="Game loop"}
The loop at the heart of a game, which repeats until the game ends. On each pass it reads the player's input, updates the state of the game and shows the new state.
:::

:::definition{term="Game state"}
The data that describes the game at one moment: the positions of the player and objects, the score, the number of lives and the stage (menu, playing, paused, game over).
:::

:::definition{term="Collision detection"}
Testing whether two objects in the game occupy the same place, so that the game can respond, for example by collecting an item or losing a life.
:::

:::definition{term="Mobile application (app)"}
A program designed to run on a mobile device such as a smartphone or tablet, normally using touch input and the device's sensors, and installed or run from a store or a web page.
:::

## The structure of a game

Every simple game has the same parts.

- **State**: variables for the position of the player, the score, lives and the stage of the game.
- **Input**: keys, taps, tilts or typed commands from the player.
- **Update**: rules that change the state, such as moving the player, checking collisions and adding to the score.
- **Output**: showing the new state with text, pictures and sound.
- **Game loop**: a loop that repeats input, update and output until the game is over.

The stages of a game can be described as a table of states and the events that move between them:

${states}

## Moving objects and collisions

Objects on a screen are often rectangles with a position (x, y) and a size (width, height). Two rectangles collide when they overlap in both the horizontal and the vertical direction. The test is written as one Boolean expression, and the function below was run on four pairs of rectangles:

${codeBlock(overlapDef.trim(), "python")}

${collTable}

Two rectangles that only touch along an edge are not counted as overlapping, because the comparisons use \`<\` and \`>\` and not \`<=\` and \`>=\`. A game may choose either rule, but must use the same one everywhere.

## A small game in Python

:::worked-solution{title="Cattle herder: a text-based game loop"}
A herder stands on a path of 8 cells numbered 0 to 7, starting at cell 0. Two cattle are on cells 2 and 5. The player types \`R\` to move right or \`L\` to move left; collecting a cattle gives 10 points, and the game is won when both are collected. The path limits stop the herder leaving it. The program:

${game.code}

It was run with the five moves \`R\`, \`R\`, \`R\`, \`R\`, \`R\`:

${game.outBlock}

The trace of the state after each pass of the game loop:

${traceMd}

On move 2 the herder reaches cell 2 and collects the first cattle, and on move 5 reaches cell 5, collects the second, and the state changes to \`won\`, which ends the loop. The loop counts the moves, so the final message can show how many were used. In a game with a screen, the same three steps (input, update, output) repeat many times a second.
:::

## Mobile apps

A mobile app differs from a desktop program in several ways.

| Feature | What it means for the design |
|:--|:--|
| Screens | A small screen shows one task at a time; the app is a set of screens with clear navigation. |
| Touch input | Taps, swipes and pinches replace a mouse; buttons must be large enough for a finger. |
| Sensors | The app may use location (GPS), camera, microphone or motion sensors, for example to find the nearest clinic. |
| Permissions | The user must allow access to the camera, location or contacts; an app should ask only for what it needs. |
| Offline use | Connections are slow or absent, so data is stored on the phone and synchronised when a connection returns. |
| Low-data design | Text-first screens, compressed images, caching and small downloads keep the cost to the user low. |
| Battery and memory | Constant use of GPS or the screen drains the battery, so the app should not do unnecessary work. |

## Designing a game or an app with a local theme

Start with the users and the purpose, as in interface design. A local theme gives the app meaning for its users. A quiz game about the rivers, towns and national parks of Zimbabwe, a counting game for young children in Shona or Ndebele, a game that follows the rules of a traditional strategy board game, or a farming app that shows market prices and works offline are all examples. A design should state: the purpose and users; the screens and how they connect; the inputs (taps, tilts); the data stored and where; the rules and scoring; the permissions needed; and how the app works with little or no data.

:::worked-solution{title="Designing an offline quiz app"}
A teacher in Masvingo proposes a quiz app on Zimbabwe's geography for Form 1 learners with shared phones and no data bundle.

- **Screens:** Home, Choose topic, Question, Result.
- **Input:** one tap on one of four answer buttons; large buttons for small screens.
- **Data:** the questions are stored in the app on the phone, so it works offline; scores are saved on the phone and copied to the school's computer when the phone is on the school network.
- **Rules:** 10 points for a correct answer, no penalty for a wrong one, and the result screen shows the score out of the total.
- **Permissions:** none are needed, because the app does not use the camera, location or contacts.
- **Low-data design:** text-only questions and one small image per topic.
:::

:::keyfact{title="ZIMSEC only"}
Designing games and mobile applications is a ZIMSEC Form 6 topic. Cambridge 9618 does not examine it, though the game-loop code uses the programming constructs both boards share. Questions ask for a description or design in words and tables, and sometimes for a short program.
:::

## Common mistakes

:::mistake{title="Forgetting the game loop's end condition"}
A game loop must have a way to end (the state becomes \`won\` or \`over\`). Otherwise the program never finishes.
:::

:::mistake{title="Updating the score without checking the collision"}
Add to the score only inside the test that detects the collision, or the score changes on every pass.
:::

:::mistake{title="Designing an app for a desktop user"}
Small touch targets, many menus and large downloads suit neither a small screen nor a limited data bundle.
:::

:::mistake{title="Asking for permissions that are not needed"}
An app that asks for location or contacts without a reason loses the users' trust. Name the permission and the reason, or leave it out.
:::

## Exam tips

:::exam-tip
ZIMSEC Paper 1 asks you to **describe** the structure of a game, **design** a game or mobile app for a given theme (screens, inputs, data, rules, permissions, offline use), **list** features of mobile apps and **explain** low-data design. Paper 2 may ask you to **complete** or **write** a short game-loop program. For a design question, use a heading for each part and give a reason for each decision.
:::

:::exam-tip
In a game program show the state variables, the loop with a clear end condition, the input, the update (with collision test and score) and the output.
:::

## Summary

:::summary
- A game has a state, input, update rules and output, repeated in a game loop that ends when the state changes to won or over.
- Collision detection tests whether two objects overlap; the rule for touching edges must be consistent.
- A mobile app uses small screens, touch input, sensors and permissions, works offline where it can, and keeps data use low.
- A good design states the purpose, users, screens, inputs, stored data, rules, permissions and offline behaviour.
- A local theme (geography, language, traditional games, farming) gives a game or app meaning for its users.
:::
`;
writeLesson({ key: "prog.mobile-games-apps", title: "Designing games and mobile applications", summary: "The structure of a simple game (state, input, update, output, game loop, collision), the features of mobile apps (screens, touch, sensors, permissions, offline and low-data use), designing a game or app with a local theme, and a small game written in Python.", concept: "acs.prog.mobile-games-apps", minutes: 50 }, body);
