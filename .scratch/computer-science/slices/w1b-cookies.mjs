// Slice w1b: cookies (comp.internet.cookies).
import { concept, P } from "../lib.mjs";

concept("comp.internet.cookies", { file: "internet/cookies", keyPrefix: "internet.cookies" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **cookie**?",
    options: [["A small text file that lets a website recognise a user", "Correct."], ["A program that runs on the computer to speed up browsing", "A cookie is data, not a program."], ["A virus that spreads from website to website", "Cookies cannot run, so they are not viruses."], ["A list of web addresses the user has saved", "That describes bookmarks."]],
    answer: "A",
    explanation: "A cookie is a small text file sent by a web server, stored by the browser and sent back on later requests.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When is a **session** cookie deleted?",
    options: [["When the browser is closed", "Correct."], ["When the computer's hard drive is full", "Session cookies do not depend on storage space."], ["After exactly one year", "Expiry dates apply to persistent cookies."], ["Only when the user deletes it", "Session cookies are removed automatically."]],
    answer: "A",
    explanation: "Session cookies are held in temporary memory and deleted when the browser closes; persistent cookies remain until they expire or are deleted.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A news website shows its pages in English every time Tatenda visits, because he chose English a month ago. What kind of cookie stores this choice?",
    options: [["Persistent cookie", "Correct: it lasts between visits."], ["Session cookie", "A session cookie would be deleted when the browser closed."], ["Shopping basket cookie", "There is no such separate type; baskets use session cookies."], ["Encryption cookie", "No such cookie type exists in the syllabus."]],
    answer: "A",
    explanation: "Preferences remembered between visits need a persistent cookie.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Where is a cookie stored?",
    options: [["On the user's device, by the web browser", "Correct: the browser stores it and sends it back to the site."], ["On the website's web server only", "The server sends the cookie; the browser keeps it."], ["On the DNS server", "DNS servers hold domain names and IP addresses."], ["In the router of the user's network", "Routers forward packets; they do not store cookies."]],
    answer: "A",
    explanation: "The web server sends the cookie; the browser stores it on the user's device and returns it with later requests.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the best example of a use for a **session** cookie?",
    options: [["Keeping items in a shopping basket while the user browses", "Correct: needed only during the visit."], ["Remembering a user's login for next month", "That needs a persistent cookie."], ["Remembering a chosen language for future visits", "That needs a persistent cookie."], ["Building a record of interests over many weeks", "Long-term tracking uses persistent cookies."]],
    answer: "A",
    explanation: "Session cookies support one visit, such as keeping a basket or a login while moving between pages.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Why can persistent cookies be a privacy risk on a computer in an internet café?",
    options: [["The next user may enter the last user's account", "Correct: a stored login cookie lets the site recognise the computer, not the person."], ["Cookies can delete files on the café's computers", "Cookies are text files and cannot delete anything."], ["Cookies slow the café's internet connection", "Cookies are tiny; they do not noticeably slow connections."], ["Cookies stop the browser from using HTTPS", "Cookies have no effect on HTTPS."]],
    answer: "A",
    hints: ["What does a \"remember me\" cookie do when someone else uses the same browser?"],
    explanation: "A persistent login cookie stays on the shared computer, so the website may treat the next user as the previous one. Users should log out, avoid \"remember me\" and use private browsing.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Rudo notices adverts for school shoes on many different websites after looking at shoes on one shop's site. Which explains this?",
    options: [["An advertiser's third-party cookies tracked her", "Correct: the same advertiser's cookie is read on every site showing its adverts."], ["A session cookie copied itself to the other websites", "Cookies cannot copy themselves; they are data."], ["The DNS server sold her browsing history to shops", "DNS servers translate names; they do not deliver adverts."], ["Her browser's bookmarks were sent to every website", "Browsers do not send bookmarks to websites."]],
    answer: "A",
    hints: ["Who places the adverts on all those different websites?"],
    explanation: "An advertising company sets a third-party cookie when its advert appears on the shoe shop's page; when its adverts appear on other sites, the same cookie is sent back, so it knows her interests.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A persistent cookie remains on the device after the browser is closed.",
    answer: true,
    explanation: "True. It stays until its expiry date or until the user deletes it.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A cookie can run on a computer and infect it like a virus.",
    answer: false,
    explanation: "False. A cookie is a small text file of data and cannot run.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each use to the type of cookie most likely to be used.",
    pairs: ["Items kept in a basket during one shopping visit", "\"Remember me\" login for future visits", "A chosen dark display mode kept for next week", "Staying logged in while moving between pages of one visit"],
    right: ["Session cookie", "Persistent cookie"],
    rightIndex: [0, 1, 1, 0],
    explanation: "Needed only during one visit: session cookie. Needed on later visits: persistent cookie.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the description.",
    template: "When a user visits a website, the web {{blank:a}} sends a cookie to the user's {{blank:b}}, which stores it. On later requests to the same site, the cookie is sent {{blank:c}} so the site can recognise the user.",
    blanks: [
      { id: "a", accepted: ["server"], choices: ["server", "router", "browser"] },
      { id: "b", accepted: ["browser"], choices: ["browser", "server", "router"] },
      { id: "c", accepted: ["back"], choices: ["back", "away", "to the DNS"] },
    ],
    explanation: "Server sends → browser stores → browser sends back.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of cookie that is held in temporary memory and deleted when the browser closes.",
    accepted: ["session cookie", "session", "a session cookie", "session cookies"],
    wrong: ["persistent cookie"],
    explanation: "Session cookies last for one browsing session only.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    hints: ["Think of an online shop: what does it need to remember?"],
    stem: "Describe **four** ways in which websites use cookies. [4]",
    points: ["Saving personal details (e.g. name, address) to fill forms", "Tracking/remembering user preferences (e.g. language, display)", "Holding items in an online shopping basket", "Storing login details so the user stays logged in (or tracking browsing for targeted adverts)"],
    modelAnswer: "Cookies save personal details such as a delivery address, remember preferences such as language, keep items in a shopping basket while the user browses, and store login details so the user need not sign in again.",
    explanation: "Personal details, preferences, shopping baskets, login details (and tracking for adverts).",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    hints: ["Give a benefit, a drawback, and a way to reduce the drawback."],
    stem: "Evaluate the use of persistent cookies for a user of a social media site. [3]",
    points: ["Benefit: stays logged in / preferences remembered, saving time", "Drawback: browsing can be tracked and a profile built (privacy) / risk on shared computers", "Management: the user can delete or block cookies, log out or use private browsing"],
    modelAnswer: "Persistent cookies save time because the user stays logged in and preferences are kept. However, they allow the site and advertisers to track browsing and build a profile, and on a shared computer another person could access the account. Deleting cookies or logging out reduces the risk.",
    explanation: "Convenience versus privacy, with ways to manage cookies.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Session: one visit. Persistent: between visits.", "Name a privacy risk and a way to manage it."],
    stem: "An online pharmacy in Bulawayo uses cookies on its website.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe the difference between a session cookie and a persistent cookie.", points: ["A session cookie is stored in temporary memory and deleted when the browser is closed", "A persistent cookie is saved on the device and remains until its expiry date or until deleted"], modelAnswer: "A session cookie is deleted when the browser closes, whereas a persistent cookie stays on the device until it expires or is deleted." }),
      P.mcq({ label: "(b)", stem: "Which cookie keeps a customer's basket while they move between pages?", options: [["Session cookie", "Correct."], ["Persistent cookie", "Not needed after the visit."], ["Third-party cookie", "Third-party cookies come from other domains, e.g. advertisers."], ["Tracking cookie", "Tracking is for adverts, not baskets."]], answer: "A", explanation: "Basket during one visit: session cookie." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain **one** privacy concern that customers may have about the pharmacy's cookies.", points: ["Cookies can record what products / pages a customer views", "which could reveal sensitive health information or be used for targeted adverts / shared with third parties"], modelAnswer: "Cookies can record which medicines a customer looks at, revealing private health information that could be used for adverts or shared with other companies." }),
      P.manual({ label: "(d)", marks: 1, stem: "State **one** way a customer can manage cookies in a browser.", points: ["Delete cookies / block third-party cookies / use private browsing / decline non-essential cookies"], modelAnswer: "Delete stored cookies in the browser settings." }),
    ],
    explanation: "Session versus persistent; privacy; managing cookies.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    hints: ["Number the steps: request, cookie sent, stored, sent back, recognised."],
    stem: "Farai visits an online music shop for the first time and chooses to view prices in US dollars.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe how a cookie lets the shop show prices in US dollars when Farai returns next week.", points: ["The web server sends a cookie holding the currency choice (and an identifier) to Farai's browser", "The browser stores it on his device as a persistent cookie", "When Farai visits again, the browser sends the cookie back with the request", "The server reads it and shows the prices in US dollars"], modelAnswer: "The server sends a persistent cookie containing his currency choice; the browser stores it; next week the browser sends it back with the request, and the server reads it and displays prices in US dollars." }),
      P.mcq({ label: "(b)", stem: "Which statement about this cookie is correct?", options: [["It is a small text file of data", "Correct."], ["It is a program that changes prices", "Cookies are data, not programs."], ["It is stored only on the web server", "The browser stores it."], ["It is deleted when the browser closes", "That would be a session cookie."]], answer: "A", explanation: "Cookies are small text files." }),
    ],
    explanation: "Persistent cookie: stored by the browser, returned on the next visit.",
  });

  b.card("DEFINITION", "**Cookie**", "A small text file sent by a web server and stored by the browser, then sent back so the site recognises the user.");
  b.card("DEFINITION", "**Session cookie**", "Kept in temporary memory; deleted when the browser closes.");
  b.card("DEFINITION", "**Persistent cookie**", "Saved on the device; lasts until its expiry date or until deleted.");
  b.card("FACT", "Four uses of cookies (0478)", "Saving personal details; tracking preferences; holding items in a shopping basket; storing login details.");
  b.card("DEFINITION", "**Third-party cookie**", "Set by a different domain (e.g. an advertiser) and used to track users across sites.");
  b.card("CONCEPT", "Can a cookie carry a virus?", "No. It is a small text file of data and cannot run.");
  b.card("CONCEPT", "Main privacy concern about cookies", "Browsing can be tracked and a profile built; on shared computers others may access accounts.");
  b.card("FACT", "Ways to manage cookies", "Delete them, block third-party cookies, use private browsing, decline non-essential cookies, log out.");
});
