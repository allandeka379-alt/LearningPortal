// Slice w2b: web pages, elements, navigation and HTML (comp.web.html-elements, ZIMSEC only).
import { concept, P } from "../lib.mjs";

const fence = (s) => "```\n" + s + "\n```";
const listCode = fence(`<ol>
  <li>Mathematics</li>
  <li>English</li>
  <li>Shona</li>
</ol>`);
const listItems = 3;

concept("comp.web.html-elements", { file: "web/html-elements", keyPrefix: "web.html-elements" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does **HTML** stand for?",
    options: [
      ["HyperText Markup Language", "Correct."],
      ["High Transfer Main Language", "Not the meaning of HTML."],
      ["Home Tool Markup Link", "Not the meaning of HTML."],
      ["HyperText Mail Location", "Not the meaning of HTML."],
    ],
    answer: "A",
    explanation: "HTML is the markup language that describes the structure and content of web pages.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which part of a web page usually holds links to the main pages of the site, in the same place on every page?",
    options: [
      ["The navigation bar", "Correct: it lets visitors move around the site."],
      ["The footer copyright notice", "The footer holds contact and copyright details."],
      ["The main body paragraph", "Paragraphs hold content, not the main menu."],
      ["The browser's address bar", "That is part of the browser, not the page."],
    ],
    answer: "A",
    explanation: "A consistent navigation bar helps visitors find their way.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which tag creates a hyperlink?",
    options: [
      ["`<a>`", "Correct: the anchor tag, with an `href` attribute."],
      ["`<link>`", "`<link>` connects files such as style sheets; it does not make a clickable link."],
      ["`<p>`", "`<p>` makes a paragraph."],
      ["`<img>`", "`<img>` shows an image."],
    ],
    answer: "A",
    explanation: "`<a href=\"page.html\">text</a>` makes a clickable link.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Where is the text of the `<title>` element displayed?",
    options: [
      ["On the browser tab", "Correct: it is not shown in the page itself."],
      ["As the largest heading on the page", "That is `<h1>`."],
      ["At the bottom of the page", "That is the footer."],
      ["Inside every hyperlink", "Links show their own text."],
    ],
    answer: "A",
    explanation: "`<title>`, in the head, sets the text on the browser tab (and in bookmarks).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In `<img src=\"bus.jpg\" alt=\"School bus\">`, what is the purpose of `alt`?",
    options: [
      ["Alternative text shown if the image cannot load", "Correct: it is also read aloud by screen readers."],
      ["The file name of the image", "That is `src`."],
      ["The width and height of the image in pixels", "Size uses `width` and `height`."],
      ["The address of the page that the image links to", "Links use `<a href>`."],
    ],
    answer: "A",
    explanation: "`src` gives the image file; `alt` gives alternative text.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Tags must close in the reverse order to opening."],
    stem: "Which line of HTML is correctly nested?",
    options: [
      ["`<p><b>Term starts</b> on Monday</p>`", "Correct: `<b>` opens and closes inside `<p>`."],
      ["`<p><b>Term starts</p> on Monday</b>`", "`<p>` closes before `<b>`."],
      ["`<b><p>Term starts</b> on Monday</p>`", "`<b>` closes while `<p>` is still open inside it."],
      ["`<p>Term starts<b> on Monday</p>`", "`<b>` is never closed."],
    ],
    answer: "A",
    explanation: "The last tag opened must be the first one closed.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Weigh speed and consistency against originality."],
    stem: "Which is a **disadvantage** of building a website from a template?",
    options: [
      ["The site may look similar to many other sites", "Correct: templates are shared by many users."],
      ["Every page has a consistent layout", "This is an advantage."],
      ["A site can be produced quickly", "This is an advantage."],
      ["Little knowledge of HTML or CSS is needed to build it", "This is an advantage."],
    ],
    answer: "A",
    explanation: "Templates are quick and consistent but less original and less flexible.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Which tag pairs make a table, and which make a list?"],
    stem: "A page must show the timetable as rows and columns. Which tags should be used?",
    options: [
      ["`<table>`, `<tr>` and `<td>`", "Correct: table, row, cell."],
      ["`<ul>` and `<li>`", "These make a bulleted list."],
      ["`<h1>` to `<h6>`", "These make headings."],
      ["`<form>` and `<input>`", "These make a form for entering data."],
    ],
    answer: "A",
    explanation: "Tables use `<table>` with rows `<tr>` and cells `<td>`.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The content inside the `<body>` element is what the browser displays on the page.",
    answer: true,
    explanation: "True. The head holds information such as the title; the body holds the displayed content.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "`<h6>` produces a larger, more important heading than `<h1>`.",
    answer: false,
    explanation: "False. `<h1>` is the most important (largest) heading; `<h6>` is the least.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `How many list items does this HTML display?\n\n${listCode}`,
    value: listItems,
    wrong: [1],
    explanation: `There are ${listItems} \`<li>\` elements, so a numbered list of ${listItems} subjects is displayed.`,
    workedSolution: `1. Count the \`<li>\` … \`</li>\` pairs inside \`<ol>\`: ${listItems}.\n2. Each is one numbered item.`,
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each tag to what it produces.",
    pairs: [
      ["`<p>`", "A paragraph of text"],
      ["`<br>`", "A line break"],
      ["`<ul>`", "A bulleted (unordered) list"],
      ["`<ol>`", "A numbered (ordered) list"],
      ["`<img>`", "An image"],
    ],
    explanation: "Paragraph, line break, unordered list, ordered list, image.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["The closing tag has a slash; the link address is in `href`."],
    stem: "Complete the HTML so that the words *Term dates* become a link to the page `dates.html`.\n\n```\n<a [1]=\"dates.html\">Term dates[2]\n```",
    template: "[1]: {{blank:a}} [2]: {{blank:b}}",
    blanks: [
      { id: "a", accepted: ["href"], choices: ["href", "src", "alt", "link"] },
      { id: "b", accepted: ["</a>"], choices: ["</a>", "<a>", "</link>", "<br>"] },
    ],
    explanation: "`<a href=\"dates.html\">Term dates</a>`.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "An HTML document has two main sections: the {{blank:a}}, which holds the title, and the {{blank:b}}, which holds the displayed content. A ready-made page design into which you place your own content is a {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["head"], choices: ["head", "body", "footer", "form"] },
      { id: "b", accepted: ["body"], choices: ["body", "head", "header", "title"] },
      { id: "c", accepted: ["template"], choices: ["template", "plugin", "browser", "server"] },
    ],
    explanation: "Head; body; template.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Name three ways, each with a short description."],
    stem: "Describe **three** ways a visitor can navigate around a website. [3]",
    points: [
      "Navigation bar / menu of links to the main pages",
      "Hyperlinks within the text / images that link to other pages",
      "Browser back and forward buttons / search box / breadcrumb trail",
    ],
    modelAnswer: "Using the navigation bar to jump to the main pages; clicking hyperlinks in the text; using the browser's back button or the site's search box.",
    explanation: "Any three distinct methods.",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 5,
    hints: ["Start with the document type, then html, head with title, and body."],
    stem: "Write the HTML for a page titled *Gweru Chess Club* that displays the main heading *Welcome*, a paragraph *We meet on Tuesdays*, and a link with the text *Join us* to the page `join.html`. [5]",
    points: [
      "`<html>` … `</html>` enclosing the page (with `<!DOCTYPE html>`)",
      "`<head>` containing `<title>Gweru Chess Club</title>`",
      "`<body>` … `</body>` containing the displayed content",
      "`<h1>Welcome</h1>` and `<p>We meet on Tuesdays</p>`",
      "`<a href=\"join.html\">Join us</a>`",
    ],
    modelAnswer: "`<!DOCTYPE html> <html> <head> <title>Gweru Chess Club</title> </head> <body> <h1>Welcome</h1> <p>We meet on Tuesdays</p> <a href=\"join.html\">Join us</a> </body> </html>`",
    explanation: "Structure (html, head, title, body) plus the heading, paragraph and link tags, each correctly closed.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Read each tag in turn.", "Attributes go inside the opening tag."],
    stem: `Study this HTML from a school website.\n\n${fence(`<h1>Mutare Science Fair</h1>
<p>The fair opens at <b>9 a.m.</b></p>
<img src="fair.jpg" alt="Learners at the fair">
<a href="entries.html">Enter a project</a>`)}`,
    parts: [
      P.mcq({ label: "(a)", stem: "How is *Mutare Science Fair* displayed?", options: [["As the main (largest) heading", "Correct."], ["As a link", "It is in `<h1>`, not `<a>`."], ["On the browser tab only", "That would be `<title>`."], ["As a list item", "No `<li>`."]], answer: "A", explanation: "`<h1>` is the main heading." }),
      P.short({ label: "(b)", stem: "State the name of the image file.", accepted: ["fair.jpg"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["entries.html"], explanation: "`src=\"fair.jpg\"`." }),
      P.short({ label: "(c)", stem: "State the page that opens when *Enter a project* is clicked.", accepted: ["entries.html"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["fair.jpg"], explanation: "`href=\"entries.html\"`." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the `alt` attribute is included.", points: ["The text is shown if the image cannot be loaded", "Screen readers read it to visually impaired visitors / describes the image for search engines"], modelAnswer: "If the image fails to load the text is shown instead, and screen readers read it aloud to visually impaired visitors." }),
      P.manual({ label: "(e)", marks: 1, stem: "Write the HTML to display *9 a.m.* in italics instead of bold.", points: ["`<i>9 a.m.</i>` (or `<em>9 a.m.</em>`)"], modelAnswer: "`<i>9 a.m.</i>`" }),
    ],
    explanation: "`<h1>` heading; `src` names the image; `href` names the linked page; `alt` gives alternative text.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Elements: header, navigation, content, forms, footer.", "Templates: quick and consistent but less original."],
    stem: "Nyasha is planning the website of a youth football club in Masvingo using a template.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Name **three** elements the home page should contain and say what each is for.", points: ["A named element with its purpose (e.g. header and logo: identifies the club)", "A second element with its purpose (e.g. navigation bar: links to the other pages)", "A third element with its purpose (e.g. form: lets parents register a player / footer: contact details)"], modelAnswer: "A header with the club logo to identify the site; a navigation bar linking to Fixtures, Results and Contact; and a form so parents can register their children." }),
      P.manual({ label: "(b)", marks: 2, stem: "Give **one** advantage and **one** disadvantage of using a template.", points: ["Advantage: quick / professional / consistent layout / little HTML needed", "Disadvantage: looks like other sites / less control / unnecessary features"], modelAnswer: "It quickly gives a professional, consistent layout, but the site may look like many others." }),
      P.tf({ label: "(c)", stem: "True or false: the navigation bar should appear in the same place on every page.", answer: true, explanation: "True: consistent navigation helps visitors." }),
    ],
    explanation: "Name elements with purposes; templates trade originality for speed.",
  });

  b.card("DEFINITION", "HTML", "HyperText Markup Language: describes the structure and content of a web page using tags.");
  b.card("DEFINITION", "Web page vs website", "A web page is one HTML document; a website is a collection of linked pages on a web server under one domain name.");
  b.card("CONCEPT", "Structure of an HTML document", "`<!DOCTYPE html>`, `<html>`, `<head>` (with `<title>`), `<body>` (displayed content).");
  b.card("FACT", "Heading and text tags", "`<h1>`–`<h6>` headings (h1 largest); `<p>` paragraph; `<br>` line break; `<b>` bold; `<i>` italic.");
  b.card("FACT", "Link and image tags", "`<a href=\"page.html\">text</a>` makes a link; `<img src=\"file.jpg\" alt=\"description\">` shows an image.");
  b.card("FACT", "List and table tags", "`<ul>` bulleted list, `<ol>` numbered list, `<li>` item; `<table>`, `<tr>` row, `<td>` cell.");
  b.card("CONCEPT", "Elements of a web page", "Header and logo, navigation bar, headings, text, images and video, hyperlinks, forms, footer.");
  b.card("CONCEPT", "Ways to navigate a website", "Navigation bar, hyperlinks, back and forward buttons, search box, breadcrumb trail.");
  b.card("CONCEPT", "Templates: pros and cons", "+ quick, professional, consistent, little HTML needed. − looks like other sites, less control, unneeded features.");
});
