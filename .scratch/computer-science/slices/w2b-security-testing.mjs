// Slice w2b: web security, testing and publishing (comp.web.security-testing, ZIMSEC only).
import { concept, P } from "../lib.mjs";

const STEPS = ["Register a domain name", "Choose web hosting", "Upload the files to the web server", "Test the live site"];
const lo = 10;
const hi = 60;

concept("comp.web.security-testing", { file: "web/security-testing", keyPrefix: "web.security-testing" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does **HTTPS** do?",
    options: [
      ["Encrypts data travelling between the browser and the web server", "Correct: shown by a padlock in the address bar."],
      ["Makes web pages load without an internet connection", "HTTPS still needs a connection."],
      ["Checks every link on a page for errors", "That is link testing."],
      ["Compresses the images on a web page", "That is image optimisation."],
    ],
    answer: "A",
    explanation: "HTTPS encrypts data in transit using the site's digital certificate.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **web hosting**?",
    options: [
      ["A service storing a site's files on an internet server", "Correct: visitors request pages from the host's server."],
      ["The person who designs the site's logo", "That is a graphic designer."],
      ["A plugin that adds a contact form to a site", "That is a plugin."],
      ["The name typed in the address bar", "That is the domain name."],
    ],
    answer: "A",
    explanation: "Hosting keeps the website's files on a web server that is always online.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why should the plugins of a CMS website be kept updated?",
    options: [
      ["Updates fix security weaknesses that attackers look for", "Correct: out-of-date plugins are a common way in."],
      ["Old plugins change the site's colours", "Colours are set by the theme."],
      ["Updates register the domain name again", "Domain registration is separate."],
      ["Plugins stop working on phones after a month", "Plugins do not expire like that."],
    ],
    answer: "A",
    explanation: "Keeping software updated closes known security holes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which developer tool feature shows a message such as \"404 not found\" for an image that failed to load?",
    options: [
      ["The console or network view", "Correct: they list errors and failed downloads."],
      ["The bookmarks bar", "Bookmarks store addresses."],
      ["The browser's history", "History lists visited pages."],
      ["The print preview", "Print preview shows the printed layout."],
    ],
    answer: "A",
    explanation: "The console shows errors; the network view shows every file and its status.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main reason for giving a website's authors permission only to write posts, and not to install plugins?",
    options: [
      ["Each user gets only the access they need, which limits damage", "Correct: the principle of least privilege."],
      ["Authors cannot type quickly enough to install plugins", "Speed is not the reason."],
      ["Plugins can only be installed on Fridays", "There is no such rule."],
      ["Authors would otherwise see a different theme on every page", "Permissions do not change the theme."],
    ],
    answer: "A",
    explanation: "Careful permissions limit what each account can change.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which data is just outside the allowed range?"],
    stem: `A form accepts an age from ${lo} to ${hi}. Which value is the **boundary** value that should be rejected at the top of the range?`,
    options: [
      [String(hi + 1), "Correct: the smallest value above the range."],
      [String(hi), "This is the largest value that should be accepted."],
      [String(lo), "This is the lower boundary, which should be accepted."],
      ["sixty", "This is abnormal (wrong type) data, not a boundary value."],
    ],
    answer: "A",
    explanation: `Boundary testing uses ${hi} (largest accepted) and ${hi + 1} (smallest rejected).`,
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["HTTPS protects data in transit only."],
    stem: "A site uses HTTPS. Why is it still not completely secure?",
    options: [
      ["It protects data in transit, not weak passwords or old plugins", "Correct: other measures are needed."],
      ["HTTPS makes all passwords visible to visitors", "HTTPS encrypts data; it does not reveal passwords."],
      ["HTTPS switches off the input validation on forms", "The two are independent."],
      ["HTTPS only works on desktop computers", "It works on all devices."],
    ],
    answer: "A",
    explanation: "Combine HTTPS with strong passwords, updates, validation, permissions and backups.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["What could happen if a form passes typed text straight to the database?"],
    stem: "Why must a web server check form input even when the browser has already checked it?",
    options: [
      ["Attackers can bypass browser checks and send data directly", "Correct: server-side validation is the real protection."],
      ["Browsers never check the input typed into a form", "Many browsers check input, but it can be bypassed."],
      ["The server checks only the spelling of names", "Server checks cover format, range and harmful content."],
      ["Checking twice makes the page load faster", "Extra checks do not speed up loading."],
    ],
    answer: "A",
    explanation: "Browser checks help honest users; the server must validate and sanitise everything it receives.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A website should be tested in several browsers and on phones as well as computers.",
    answer: true,
    explanation: "True. Layout and features can behave differently on different browsers and screen sizes.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Changes made to a page in the browser's developer tools are saved permanently on the web server.",
    answer: false,
    explanation: "False. They are temporary and only in that browser; the real files must be corrected and uploaded.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each security measure to the threat it reduces.",
    pairs: [
      ["HTTPS", "Form data being read if it is intercepted"],
      ["Strong admin password and two-factor authentication", "Attackers taking over the administrator account"],
      ["Input validation", "Harmful code typed into a form"],
      ["Regular backups", "Losing the site after it is hacked"],
      ["Limiting login attempts", "Automated password guessing"],
    ],
    explanation: "Each measure targets a specific threat.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    hints: ["You need a name before hosting can be linked to it; test last."],
    stem: "Put the steps for publishing a website in order by choosing the correct step for each position.",
    template: STEPS.map((_, i) => `Step ${i + 1}: {{blank:s${i + 1}}}`).join("\n\n"),
    blanks: STEPS.map((s, i) => ({ id: `s${i + 1}`, accepted: [s], choices: STEPS })),
    explanation: STEPS.map((s, i) => `${i + 1}. ${s}.`).join(" "),
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the protocol that encrypts data between a browser and a web server and shows a padlock in the address bar.",
    accepted: ["HTTPS", "hypertext transfer protocol secure", "HTTP secure"],
    wrong: ["HTTP", "FTP"],
    explanation: "HTTPS.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Give a measure and its reason, twice."],
    stem: "Describe **two** security measures a developer should use for a school website's administrator login. [4]",
    points: [
      "Strong, unique password / two-factor authentication",
      "so that attackers cannot guess or reuse the password to take control",
      "Limit login attempts / CAPTCHA / HTTPS on the login page",
      "so that automated guessing is slowed / the password cannot be read if intercepted",
    ],
    modelAnswer: "Use a strong, unique password with two-factor authentication, so an attacker cannot guess the password and take control; and limit login attempts, so automated programs cannot keep guessing.",
    explanation: "Each measure needs a reason.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    hints: ["Think about links, forms, layout and devices."],
    stem: "Describe **four** tests that should be carried out on a website before it is published. [4]",
    points: [
      "Click every link / navigation item to check none is broken",
      "Test forms with normal, abnormal and boundary data",
      "Check layout on different screen sizes / devices / browsers",
      "Check loading speed / images and alt text / spelling / HTTPS / accessibility",
    ],
    modelAnswer: "Click every link to check none is broken; enter normal, abnormal and boundary data in each form; view the pages on phones and computers in different browsers; and check how quickly pages load.",
    explanation: "Any four distinct tests.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Normal, abnormal, boundary.", "Developer tools: inspect, console, network, responsive mode."],
    stem: `Nyasha is testing a club registration form. The age box accepts whole numbers from ${lo} to ${hi}.`,
    parts: [
      P.short({ label: "(a)", stem: "Give a **normal** test value for the age.", accepted: Array.from({ length: hi - lo - 1 }, (_, i) => String(lo + 1 + i)), wrong: [String(hi + 5)], explanation: `Any whole number from ${lo + 1} to ${hi - 1} is normal data (${lo} and ${hi} are boundary values).` }),
      P.mcq({ label: "(b)", stem: "Which is **abnormal** data for the age?", options: [["twelve", "Correct: text where a number is expected."], [String(lo), "Boundary."], [String(hi), "Boundary."], [String(lo + 5), "Normal."]], answer: "A", explanation: "Abnormal data is of the wrong type or clearly invalid." }),
      P.num({ label: "(c)", stem: "State the boundary value that should be rejected at the **bottom** of the range.", value: lo - 1, wrong: [lo], explanation: `${lo - 1} is the largest value below the range.`, workedSolution: `1. The smallest accepted value is ${lo}.\n2. The value just below it, ${lo - 1}, must be rejected.` }),
      P.manual({ label: "(d)", marks: 2, stem: "On a phone, the form's Submit button is cut off at the edge of the screen. Describe how Nyasha could use browser developer tools to find the cause.", points: ["Use responsive mode to view the page at phone width", "Inspect the element / its HTML and CSS to find the width setting causing the problem (then correct the real file)"], modelAnswer: "She switches the developer tools to responsive mode at phone width, then inspects the button and its container to see which CSS width is too large, and corrects it in her files." }),
      P.tf({ label: "(e)", stem: "True or false: after correcting the fault, Nyasha should run the test again.", answer: true, explanation: "True: always retest after debugging." }),
    ],
    explanation: `Normal ${lo + 1}-${hi - 1}; abnormal "twelve"; boundary rejected ${lo - 1}; responsive mode and inspect; retest.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    hints: ["Domain → hosting → upload → HTTPS → test.", "Pair each measure with its reason."],
    stem: "Farai has finished a website for his family's guest house in Nyanga on his laptop and now wants to publish it.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe the steps Farai must take to publish the site.", points: ["Register a domain name (e.g. a .co.zw name)", "Buy / choose web hosting and upload the files to the web server (control panel / secure FTP)", "Install a certificate for HTTPS and test the live site"], modelAnswer: "He registers a domain name, chooses a web host and uploads his files to its server using the control panel, then installs a certificate for HTTPS and tests the live site." }),
      P.manual({ label: "(b)", marks: 3, stem: "The site has a booking form. Evaluate **three** security measures Farai should use.", points: ["HTTPS so guests' details are encrypted in transit", "Validate and sanitise form input on the server so harmful data is rejected", "Strong admin password / updates / backups, each with a reason"], modelAnswer: "HTTPS encrypts guests' details as they are sent; server-side validation rejects harmful or invalid input; and regular backups mean the site can be restored if it is attacked." }),
    ],
    explanation: "Domain, hosting, upload, HTTPS, test; HTTPS, validation and backups with reasons.",
  });

  b.card("DEFINITION", "HTTPS", "HyperText Transfer Protocol Secure: encrypts data between browser and web server using the site's certificate; padlock in the address bar.");
  b.card("CONCEPT", "Web security measures", "HTTPS, strong admin passwords + 2FA, updates, input validation, careful permissions, login limits / CAPTCHA, backups, security plugins.");
  b.card("DEFINITION", "Input validation (web)", "Checking form data in the browser and again on the server so that only sensible, safe data is accepted.");
  b.card("DEFINITION", "Permissions", "Settings controlling which users may read, change or delete files or features; give each user only the access they need.");
  b.card("CONCEPT", "Browser developer tools", "Inspect HTML and CSS, console errors, network view of files and load times, responsive mode for screen sizes.");
  b.card("CONCEPT", "What to test on a website", "Links, content, layout, browsers and devices, forms (normal, abnormal, boundary data), speed, security, accessibility.");
  b.card("CONCEPT", "Steps to publish a website", "Register domain name → choose hosting → upload files → install HTTPS certificate → test live site → maintain.");
  b.card("DEFINITION", "Web hosting", "A service that stores a website's files on a web server permanently connected to the internet.");
});
