// Slice w2b: content management systems, templates, plugins and web graphics (comp.web.cms-content, ZIMSEC only).
import { concept, P } from "../lib.mjs";

const kb = (w, h, bpp = 24) => (w * h * bpp) / 8 / 1024;
const small = { w: 640, h: 480 };
const big = { w: 1600, h: 1200 };
const smallKB = kb(small.w, small.h);
const bigKB = kb(big.w, big.h);
const halfKB = kb(big.w / 2, big.h / 2);
if (!Number.isInteger(smallKB) || !Number.isInteger(bigKB)) throw new Error("sizes");

concept("comp.web.cms-content", { file: "web/cms-content", keyPrefix: "web.cms-content" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **content management system** (CMS)?",
    options: [
      ["Software for creating and publishing web content without HTML", "Correct: content is edited through a dashboard."],
      ["A program that converts high-level code into machine code", "That is a translator."],
      ["A device that connects a school network to the internet", "That is a router."],
      ["A file that lists the newest posts on a website", "That is a web feed."],
    ],
    answer: "A",
    explanation: "A CMS stores content in a database and publishes it through a theme, edited from a browser dashboard.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a CMS, what is a **plugin**?",
    options: [
      ["An add-on that gives the site a new feature", "Correct: e.g. a contact form or gallery."],
      ["A design package that controls colours and layout", "That is a theme."],
      ["A user who is allowed to edit posts", "That is an editor role."],
      ["The cable that links the web server to the internet", "Plugins are software."],
    ],
    answer: "A",
    explanation: "Plugins (extensions) add features; themes change the look.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which image format is best for a photograph on a web page?",
    options: [
      ["JPEG", "Correct: lossy compression keeps photo files small."],
      ["GIF", "GIF supports only 256 colours; it suits simple graphics and animation."],
      ["SVG", "SVG is for vector graphics such as logos and icons."],
      ["Uncompressed bitmap", "Far too large for the web."],
    ],
    answer: "A",
    explanation: "JPEG gives small files for photos with millions of colours.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why can a CMS site change its whole appearance without retyping its content?",
    options: [
      ["The content is stored separately from the theme that controls the design", "Correct: switching theme re-presents the same content."],
      ["Every page of the site is saved as a single picture", "Pages are built from content and theme."],
      ["The visitor's browser chooses a new design for each visitor", "The design comes from the theme on the server."],
      ["Plugins automatically retype the content", "Plugins add features; they do not retype content."],
    ],
    answer: "A",
    explanation: "Separating content (database) from design (theme) is the key idea of a CMS.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does a **web feed** (RSS) provide?",
    options: [
      ["An automatically updated list of the newest content for subscribers", "Correct: readers see new posts without visiting."],
      ["A way for visitors to pay for goods on the website", "That is an e-commerce plugin."],
      ["A backup copy of the site's database", "That is a backup plugin."],
      ["A theme that rearranges its layout to work on phones", "That is a responsive theme."],
    ],
    answer: "A",
    explanation: "Feed readers and other sites use the feed to show new posts as they appear.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which format keeps sharp edges and allows a transparent background?"],
    stem: "A school logo with sharp edges must sit on coloured backgrounds without a white box around it. Which format is most suitable?",
    options: [
      ["PNG", "Correct: lossless with transparency (SVG would also suit a vector logo)."],
      ["JPEG", "Lossy compression blurs sharp edges and JPEG has no transparency."],
      ["MP4", "MP4 is a video format."],
      ["A plain text file", "A text file cannot store an image."],
    ],
    answer: "A",
    explanation: "PNG is lossless and supports transparent backgrounds.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Popular software attracts attackers."],
    stem: "Why must a CMS and its plugins be kept updated?",
    options: [
      ["Updates fix security weaknesses that hackers could exploit", "Correct: popular CMSs are common targets."],
      ["Old versions delete all the posts that are more than a year old", "Posts are not deleted by age."],
      ["Updates make every image smaller", "Image size depends on optimisation."],
      ["The theme stops displaying colours unless it is updated", "Colour display is not the reason."],
    ],
    answer: "A",
    explanation: "Out-of-date plugins and CMS cores are a common way into websites.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Think about what each plugin costs in speed and security."],
    stem: "Tatenda has installed 40 plugins on his small club website and it has become slow. What is the best advice?",
    options: [
      ["Remove plugins that are not needed and keep the rest updated", "Correct: each plugin adds code to load and a possible security risk."],
      ["Install another plugin to fix each new problem as it appears", "More plugins usually make it slower."],
      ["Change the colour of the theme", "Colour does not affect speed."],
      ["Upload all the photos at their full camera size instead", "This would slow the site further."],
    ],
    answer: "A",
    explanation: "Fewer, updated plugins make a site faster and more secure.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A theme changes how a CMS website looks, whereas a plugin adds what it can do.",
    answer: true,
    explanation: "True. Themes control design; plugins add features.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Authors must know HTML before they can add a post to a CMS website.",
    answer: false,
    explanation: "False. A CMS provides an editor in the dashboard, so authors can add content without HTML.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    hints: ["Pixels × 3 bytes, then divide by 1024."],
    stem: `An uncompressed photo is ${small.w} × ${small.h} pixels, stored with 3 bytes per pixel. Calculate its size in KB, where 1 KB = 1024 bytes.`,
    value: smallKB, unit: "KB",
    wrong: [smallKB * 8],
    explanation: `${small.w} × ${small.h} × 3 = ${small.w * small.h * 3} bytes; ÷ 1024 = ${smallKB} KB.`,
    workedSolution: `1. Pixels: ${small.w} × ${small.h} = ${small.w * small.h}.\n2. Bytes: ${small.w * small.h} × 3 = ${small.w * small.h * 3}.\n3. KB: ${small.w * small.h * 3} ÷ 1024 = ${smallKB}.`,
  });
  b.calc({
    d: 4, skill: "ANALYSIS",
    hints: ["Halving both sides divides the number of pixels by four."],
    stem: `A ${big.w} × ${big.h} pixel image (24-bit colour) is ${bigKB} KB uncompressed. Rudo resizes it to ${big.w / 2} × ${big.h / 2} pixels. What is the new uncompressed size in KB?`,
    value: halfKB, unit: "KB",
    wrong: [bigKB / 2],
    explanation: `Halving both dimensions gives a quarter of the pixels: ${bigKB} ÷ 4 = ${halfKB} KB.`,
    workedSolution: `1. Pixels before: ${big.w} × ${big.h} = ${big.w * big.h}; after: ${big.w / 2} × ${big.h / 2} = ${(big.w / 2) * (big.h / 2)}.\n2. Ratio: ${big.w * big.h} ÷ ${(big.w / 2) * (big.h / 2)} = ${(big.w * big.h) / ((big.w / 2) * (big.h / 2))}.\n3. New size: ${bigKB} ÷ 4 = ${halfKB} KB.`,
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each CMS plugin to what it adds.",
    pairs: [
      ["Contact form", "A form whose answers are emailed to the owner"],
      ["Gallery", "Photo albums and slideshows"],
      ["Search engine optimisation", "Help with page titles and descriptions for search engines"],
      ["Backup", "Scheduled copies of the database and files"],
      ["E-commerce", "Products, a shopping basket and payment"],
    ],
    explanation: "Each plugin adds one feature.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The design package that controls the layout and colours of a CMS site is a {{blank:a}}. A {{blank:b}} theme rearranges the layout to suit phone and computer screens. Small blocks such as a calendar placed in a side bar are called {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["theme"], choices: ["theme", "plugin", "feed", "browser"] },
      { id: "b", accepted: ["responsive"], choices: ["responsive", "compressed", "lossy", "static"] },
      { id: "c", accepted: ["widgets"], choices: ["widgets", "tags", "cookies", "packets"] },
    ],
    explanation: "Theme; responsive; widgets.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Think about the steps before uploading."],
    stem: "Describe **three** steps to optimise a photograph before uploading it to a website. [3]",
    points: [
      "Crop to remove unwanted parts",
      "Resize to the largest size at which it will be displayed",
      "Save in a suitable format (JPEG) and compress it / add a meaningful file name and alt text",
    ],
    modelAnswer: "Crop away the parts that are not needed, resize it to the width it will be shown at, and save it as a compressed JPEG.",
    explanation: "Crop, resize, choose format and compress.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    hints: ["Two advantages and two disadvantages."],
    stem: "A youth club in Bulawayo is deciding whether to build its website with a CMS or by writing HTML by hand. Give **two** advantages and **two** disadvantages of using a CMS. [4]",
    points: [
      "Advantage: members can add content without knowing HTML / several users with roles",
      "Advantage: quick to set up with ready-made themes and plugins / consistent design",
      "Disadvantage: security risks if the CMS or plugins are not updated / common target for hackers",
      "Disadvantage: less control over the code / can be slow with many plugins / needs a server with a database",
    ],
    modelAnswer: "Members can update the site without HTML and it is quick to set up with themes and plugins. However, it must be kept updated to stay secure, and the club has less control over the code, which can become slow with many plugins.",
    explanation: "Two of each.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Content in the database, design in the theme.", "JPEG for photos, PNG for transparency."],
    stem: "Chipo is building a website for her family's lodge near Victoria Falls using a CMS.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe how the CMS produces a page when a visitor requests it.", points: ["The content is retrieved from the database", "It is placed into the theme's layout and sent to the browser as HTML"], modelAnswer: "The CMS takes the page's content from its database, places it into the theme's layout and sends the resulting HTML to the visitor's browser." }),
      P.mcq({ label: "(b)", stem: "Which would let guests book rooms on the site?", options: [["A booking (e-commerce) plugin", "Correct."], ["A new colour scheme", "Only changes the look."], ["A larger logo", "Only changes the look."], ["A web feed", "Lists new posts."]], answer: "A", explanation: "Plugins add features." }),
      P.mcq({ label: "(c)", stem: "Which format should she use for photos of the lodge?", options: [["JPEG", "Correct."], ["GIF", "Few colours."], ["SVG", "For vector graphics."], ["MP4", "Video format."]], answer: "A", explanation: "JPEG for photographs." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why she should resize the photos before uploading them.", points: ["Smaller image dimensions mean smaller files", "Pages load faster / use less of visitors' mobile data / less storage space"], modelAnswer: "Resizing reduces the number of pixels and so the file size, so pages load faster and use less of visitors' data." }),
    ],
    explanation: "Database + theme → HTML; plugins add booking; JPEG; resize for speed.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Separate looks (theme) from features (plugins).", "Adverts earn money but can annoy visitors."],
    stem: "A Masvingo community radio station (fictional) uses a CMS for its news website.",
    parts: [
      P.match({ label: "(a)", stem: "Classify each change as needing a theme or a plugin.", pairs: ["Changing the menu from the top to the side", "Adding a listeners' poll", "Using the station's colours and fonts", "Adding a podcast player"], right: ["Theme", "Plugin"], rightIndex: [0, 1, 0, 1], explanation: "Look → theme; feature → plugin." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain how a web feed helps the station's regular readers.", points: ["The feed lists new stories automatically as they are published", "Readers' feed apps / other sites show the new stories without the reader visiting the site to check"], modelAnswer: "The feed lists each new story as it is published, so readers' feed apps show it without them having to visit the site." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give **one** advantage and **one** disadvantage of placing adverts on the site.", points: ["Advantage: earns income for the station", "Disadvantage: annoys visitors / slows the page / less space for content"], modelAnswer: "Adverts earn money for the station, but too many annoy visitors and slow pages down." }),
    ],
    explanation: "Themes vs plugins; feeds push new content; adverts bring income but cost speed.",
  });

  b.card("DEFINITION", "Content management system (CMS)", "Software that lets users create, edit and publish website content through a dashboard without writing HTML; content in a database, design in a theme.");
  b.card("DEFINITION", "Theme (template)", "Design files controlling the layout, colours, fonts and style of every page of a CMS site.");
  b.card("DEFINITION", "Plugin (extension)", "An add-on that gives a CMS a new feature: contact form, gallery, shop, SEO, security, backup.");
  b.card("CONCEPT", "Theme vs plugin", "A theme changes how the site looks; a plugin adds what the site can do.");
  b.card("DEFINITION", "Web feed (RSS)", "An automatically updated file listing a site's newest content for subscribers' feed readers and other sites.");
  b.card("CONCEPT", "Advantages and disadvantages of a CMS", "+ no HTML needed, quick, themes and plugins, several users with roles. − security updates essential, slower with many plugins, less control.");
  b.card("FACT", "Web image formats", "JPEG photos; PNG logos, screenshots, transparency; GIF simple animation; SVG scalable vector icons.");
  b.card("CONCEPT", "Optimising an image", "Crop, resize to display size, choose a suitable format, compress, add file name and alt text.");
  b.card("FORMULA", "Uncompressed image size", "width × height × bytes per pixel (3 for 24-bit colour); ÷ 1024 for KB.", "Halving width and height gives a quarter of the size.");
});
