// Slice w1b: the internet, the web, URLs, HTTP(S), browsers and DNS (comp.internet.web-browsing).
import { concept, P } from "../lib.mjs";

const url = "https://www.kopjebooks.co.zw/catalogue/maths.html"; // fictional
const url2 = "http://www.mazowefarmers.org.zw/prices/maize.html"; // fictional

concept("comp.internet.web-browsing", { file: "internet/web-browsing", keyPrefix: "internet.web-browsing" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement best describes the **world wide web**?",
    options: [["The collection of websites and web pages accessed using the internet", "Correct."], ["The cables, routers and servers that connect networks worldwide", "That describes the internet, the infrastructure."], ["A program used to display web pages", "That is a web browser."], ["A server that turns domain names into IP addresses", "That is a DNS server."]],
    answer: "A",
    explanation: "The internet is the infrastructure; the world wide web is the collection of web pages accessed over it.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the **main** purpose of a web browser?",
    options: [["To render HTML and display web pages", "Correct."], ["To store web pages for other users", "That is a web server's job."], ["To translate domain names into IP addresses", "That is the DNS's job."], ["To connect a computer to the internet", "That needs network hardware and an internet service provider."]],
    answer: "A",
    explanation: "A browser's main purpose is to render HTML and display web pages; bookmarks, tabs and history are further functions.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `In the URL \`${url}\`, which part is the **domain name**?`,
    options: [["`www.kopjebooks.co.zw`", "Correct: it runs from after :// to the first single /."], ["`https`", "That is the protocol."], ["`/catalogue/maths.html`", "That is the path and file name."], ["`maths.html`", "That is the file name of the page."]],
    answer: "A",
    explanation: "Protocol `https`; domain name `www.kopjebooks.co.zw`; path `/catalogue/`; file name `maths.html`.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "When a URL is entered, what does the DNS server return to the browser?",
    options: [["The IP address of the web server", "Correct."], ["The HTML of the web page", "The web server sends the HTML."], ["A list of cookies for the site", "Cookies come from the web server."], ["The site's encryption key", "Keys are exchanged with the web server during HTTPS set-up."]],
    answer: "A",
    explanation: "The DNS server looks up the domain name and returns the matching IP address; the browser then requests the page from the web server at that address.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How is HTTPS different from HTTP?",
    options: [["HTTPS encrypts the data it transfers", "Correct: it uses SSL/TLS."], ["HTTPS sends web pages faster than HTTP", "Encryption does not make pages load faster."], ["HTTPS works without any web server", "Both need a web server."], ["HTTPS stops all data being intercepted", "Data can still be intercepted; it just cannot be read."]],
    answer: "A",
    explanation: "HTTPS = HTTP + encryption (SSL/TLS). The browser also checks the site's digital certificate.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Chipo types a URL and sees the message \"server not found\", although her internet connection works for other sites. Which step in loading the page most likely failed?",
    options: [["The DNS could not find an IP address for the domain name", "Correct: without an IP address the browser cannot contact the server."], ["The browser could not render the HTML", "If the HTML arrived, the server was found."], ["The web server sent the wrong cookies", "Cookies do not stop a server being found."], ["The router could not split the page into packets", "Packets are handled once the server is contacted."]],
    answer: "A",
    hints: ["Which step must succeed before the browser can contact any server?"],
    explanation: "\"Server not found\" usually means no IP address was found for the domain name (for example the name was mistyped), so the browser had no server to send its request to.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which of these websites most needs to use HTTPS rather than HTTP?",
    options: [["An online shop where customers enter card details", "Correct: payment details must be encrypted."], ["A page listing the dates of a school's sports days", "This is public information; HTTPS is good practice but less critical."], ["A page of photographs of Victoria Falls", "Public pictures carry little risk if read."], ["A list of opening times for a library", "Public information carries little risk if read."]],
    answer: "A",
    hints: ["Which site sends private data?"],
    explanation: "Any site handling personal or financial data must use HTTPS so the data is encrypted. (Today most sites use HTTPS anyway.)",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The internet and the world wide web are two names for the same thing.",
    answer: false,
    explanation: "False. The internet is the infrastructure of networks; the web is the collection of pages accessed using it.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The web server, not the DNS server, sends the HTML of the requested page to the browser.",
    answer: true,
    explanation: "True. The DNS only supplies the IP address; the web server sends the page.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: `Match each part of the URL \`${url2}\` to its meaning.`,
    pairs: [["`http`", "Protocol"], ["`www.mazowefarmers.org.zw`", "Domain name"], ["`/prices/`", "Folder (path) on the server"], ["`maize.html`", "File name of the page"]],
    explanation: "Protocol before ://; domain name up to the first single /; then the folder path and the file name.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each browser function to its description.",
    pairs: [["Bookmarks", "Save the addresses of pages to visit again"], ["History", "A record of pages visited"], ["Tabs", "Several pages open in one window"], ["Address bar", "Where a URL is typed"]],
    explanation: "These are standard browser functions alongside navigation buttons and storing cookies.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put the missing words into this description of how a web page is loaded.",
    template: "The browser sends the domain name to a {{blank:a}} server, which returns the {{blank:b}} address. The browser sends a request to the {{blank:c}} server, which sends back the page written in {{blank:d}}. The browser renders it.",
    blanks: [
      { id: "a", accepted: ["DNS"], choices: ["DNS", "web", "mail", "proxy"] },
      { id: "b", accepted: ["IP"], choices: ["IP", "MAC", "email", "URL"] },
      { id: "c", accepted: ["web"], choices: ["web", "DNS", "file", "print"] },
      { id: "d", accepted: ["HTML"], choices: ["HTML", "HTTPS", "DNS", "binary"] },
    ],
    hints: ["Two different servers are involved."],
    explanation: "DNS → IP address → web server → HTML → rendered by the browser.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the full name of the protocol abbreviated HTTP.",
    accepted: ["hypertext transfer protocol", "hyper text transfer protocol"],
    wrong: ["hypertext transmission protocol"],
    explanation: "HTTP = hypertext transfer protocol; HTTPS = hypertext transfer protocol secure.",
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: `State the **protocol** used in the URL \`${url2}\`.`,
    accepted: ["http", "hypertext transfer protocol"],
    wrong: ["https", "www"],
    explanation: "The protocol is the part before `://`: here `http` (not secure).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["One is hardware and connections; the other is content."],
    stem: "Explain the difference between the internet and the world wide web. [2]",
    points: ["The internet is the infrastructure / worldwide network of interconnected networks (hardware and connections)", "The world wide web is the collection of websites / web pages accessed using the internet"],
    modelAnswer: "The internet is the global infrastructure of connected networks. The world wide web is the collection of web pages and websites that are accessed using the internet.",
    explanation: "Infrastructure versus content.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Name the browser, DNS, IP address, web server and HTML in order."],
    stem: `Sipho enters the URL \`${url}\` into his browser.`,
    parts: [
      P.short({ label: "(a)", stem: "State the file name of the page requested.", accepted: ["maths.html"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["catalogue"], explanation: "The file name is the last part of the path." }),
      P.mcq({ label: "(b)", stem: "What does `https` at the start tell you?", options: [["The data sent will be encrypted", "Correct."], ["The page is stored on Sipho's computer", "It is stored on a web server."], ["The page contains no images at all", "The protocol says nothing about images."], ["The page loads without using DNS", "DNS is still used."]], answer: "A", explanation: "HTTPS uses encryption." }),
      P.manual({ label: "(c)", marks: 4, stem: "Describe how the page is located, retrieved and displayed.", points: ["The browser sends the domain name to a DNS server", "The DNS finds the matching IP address and returns it to the browser", "The browser sends an HTTPS request to the web server at that IP address", "The web server returns the HTML (and other files), which the browser renders and displays"], modelAnswer: "The browser sends www.kopjebooks.co.zw to a DNS server, which returns the web server's IP address. The browser sends an HTTPS request to that address; the web server returns maths.html as HTML, and the browser renders it." }),
    ],
    explanation: "Browser → DNS → IP → web server → HTML → render.",
  });
  b.struct({
    d: 4, skill: "UNDERSTANDING", examStyle: true,
    hints: ["Address bar, navigation, tabs, bookmarks, history, cookies."],
    stem: "Rudo uses a web browser on a library computer in Gweru to research a history project.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe **three** functions of a web browser, other than displaying web pages, that would help Rudo.", points: ["Bookmarks/favourites to save useful pages to return to", "History to find pages visited earlier", "Tabs to have several sources open at once (or navigation buttons / address bar)"], modelAnswer: "She can bookmark useful pages, use the history to find a page she visited earlier, and open several sources in tabs to compare them." }),
      P.mcq({ label: "(b)", stem: "Which language does the browser render to display a web page?", options: [["HTML", "Correct."], ["HTTP", "HTTP is the transfer protocol."], ["DNS", "DNS is a naming service."], ["URL", "A URL is an address."]], answer: "A", explanation: "Browsers render HTML." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the library's website asks for passwords only on pages that use HTTPS.", points: ["HTTPS encrypts the data between browser and server", "so an intercepted password cannot be read"], modelAnswer: "HTTPS encrypts the data, so if a password is intercepted it cannot be read." }),
    ],
    explanation: "Browser functions; HTML; HTTPS encryption.",
  });

  b.card("DEFINITION", "**Internet**", "The worldwide infrastructure of interconnected networks (hardware and connections).");
  b.card("DEFINITION", "**World wide web**", "The collection of websites and web pages accessed using the internet.");
  b.card("DEFINITION", "**URL**", "A text-based address for a web page: protocol, domain name and path/file name.");
  b.card("DEFINITION", "**HTTP**", "Hypertext transfer protocol: rules for requesting and sending web pages.");
  b.card("DEFINITION", "**HTTPS**", "HTTP with encryption (SSL/TLS); the browser checks the site's certificate.");
  b.card("DEFINITION", "**DNS**", "Domain name server: finds the IP address that matches a domain name.");
  b.card("FACT", "Main purpose of a web browser", "To render HTML and display web pages.");
  b.card("FACT", "Browser functions", "Address bar, navigation tools, tabs, bookmarks, history, storing cookies.");
  b.card("CONCEPT", "Loading a page in four steps", "DNS turns domain name into IP address → browser requests page from web server → server sends HTML → browser renders it.");
});
