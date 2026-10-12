// Slice w2b: URLs and DNS (acs.network.url-dns, both boards).
import { concept, P, chk, same, mdTable } from "../lib.mjs";
import { mc, pm } from "../tables/w2b-q.mjs";
import { urlParts, ttlSim } from "../tables/w2b-url-dns.mjs";

const url = "https://results.kwekwe-high.ac.zw/form4/marks?term=2&year=2026#summary";
const u = urlParts(url);
same([u.scheme, u.host, u.port, u.path, u.query, u.fragment], ["https", "results.kwekwe-high.ac.zw", "", "/form4/marks", "term=2&year=2026", "summary"]);
const times = [0, 90, 250, 310, 600];
const sim = ttlSim(200, times);
same(sim.map((r) => r.result), ["full lookup", "answered from cache", "full lookup", "answered from cache", "full lookup"]);
const full = sim.filter((r) => r.result === "full lookup").length;
chk(full, 3);
const sim2 = ttlSim(150, [0, 60, 200, 400, 480]);
same(sim2.map((r) => r.result), ["full lookup", "answered from cache", "full lookup", "full lookup", "answered from cache"]);
const simTable = mdTable(["Request at (s)", "Result"], sim.map((r) => [r.t, r.result]));

concept("acs.network.url-dns", { file: "network/url-dns", keyPrefix: "network.url-dns" }, (b) => {
  mc(b, 1, "RECALL", "What is the main job of the Domain Name System (DNS)?",
    ["To translate a domain name into an IP address", "Correct."],
    [["To store the web pages of a website", "Web pages are stored on web servers."], ["To encrypt the data sent by a browser", "Encryption is done by protocols such as TLS."], ["To give each computer a MAC address", "MAC addresses are set in the network card."]],
    "DNS looks up the IP address that belongs to a name.");
  mc(b, 2, "RECALL", "A URL begins with https and gives no port number. Which port does the browser use?",
    ["443", "Correct: the default port for HTTPS."],
    [["80", "80 is the default for HTTP."], ["21", "21 is used by FTP."], ["25", "25 is used by SMTP."]],
    "HTTPS uses port 443 by default.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "In the URL below, which part is the query string?\n\n`https://shop.example.co.zw/items/pumps?size=30&colour=blue#reviews`",
    ["size=30&colour=blue", "Correct: the part after the ? and before the #."],
    [["/items/pumps", "This is the path."], ["reviews", "This is the fragment."], ["shop.example.co.zw", "This is the domain name."]],
    "The query string follows the ? and ends at the # (or the end of the URL).", { daily: true });
  mc(b, 2, "UNDERSTANDING", "When the resolver has no cached answer, which server does it ask first?",
    ["A root server", "Correct: the root server refers it to the correct TLD server."],
    [["The authoritative server for the domain", "It cannot know which server is authoritative until the root and TLD servers have referred it."], ["The web server", "The web server cannot be contacted until its address is known."], ["The user's printer", "A printer plays no part in DNS."]],
    "Root, then TLD, then authoritative.");
  mc(b, 3, "UNDERSTANDING", "What is the effect of DNS caching?",
    ["Repeated requests for the same name are answered faster", "Correct: the stored answer is used until the TTL expires."],
    [["Every request is sent to the root server", "Caching avoids repeating that work."], ["The IP address of the website can never change once it has been cached", "A cached record is discarded when its TTL runs out."], ["The website is stored on the resolver", "Only the address record is stored."]],
    "A cached record saves the whole chain of requests until it expires.", { hints: ["What does the resolver do with an answer?"] });
  mc(b, 3, "ANALYSIS", "A student can open a website by typing its IP address but not by typing its name. What is the most likely fault?",
    ["The name cannot be resolved to an address", "Correct: the connection works, so name resolution is failing."],
    [["The student's network cable is unplugged", "If the cable were unplugged the IP address would not work either."], ["The web server is switched off", "The server answers when the IP address is used."], ["The browser has run out of memory", "That would not depend on whether a name or an address is typed."]],
    "The route to the server works; only the DNS lookup fails.", { hints: ["What does typing the IP address skip?"] });
  mc(b, 3, "UNDERSTANDING", "What is DNS cache poisoning?",
    ["A false record in a resolver's cache sends users to the wrong address", "Correct."],
    [["A virus that fills a hard disk with large files", "That does not involve DNS."], ["The deletion of every record from a resolver", "Poisoning inserts false records; it does not delete them."], ["The loss of the domain registration because the owner did not renew it", "That is a lapsed registration, not an attack."]],
    "The resolver stores a false answer and passes it on to users.", { hints: ["What does the user receive when asking for a real site?"] });
  b.tf({ d: 2, skill: "RECALL", stem: "The fragment part of a URL is sent to the web server in the request.", answer: false, explanation: "False. The browser uses the fragment to go to a position in the page; it is not sent to the server." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A DNS resolver may keep an answer in its cache until the time to live (TTL) runs out.", answer: true, explanation: "True. When the TTL has expired the record is discarded and a new lookup is needed." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each part of a URL to its purpose.",
    pairs: [["Protocol", "States how the resource is fetched, for example https"], ["Domain name", "Identifies the server"], ["Port", "Selects the service on the server; has a default for each protocol"], ["Path", "Locates the resource on the server"], ["Query string", "Name and value pairs passed to the server"]],
    explanation: "Each part answers a different question: how, where, which service, which resource, which extra values." });
  b.fib({ d: 3, skill: "UNDERSTANDING", stem: "Complete the order in which a resolver finds an address that is not in its cache.",
    template: "The resolver asks a {{blank:a}} server, which refers it to a {{blank:b}} server. This server refers it to the {{blank:c}} server, which gives the IP address.",
    blanks: [
      { id: "a", accepted: ["root"], choices: ["root", "authoritative", "TLD", "web"] },
      { id: "b", accepted: ["TLD"], choices: ["TLD", "root", "web", "mail"] },
      { id: "c", accepted: ["authoritative"], choices: ["authoritative", "root", "TLD", "proxy"] },
    ], hints: ["Think of the hierarchy from the top."], explanation: "Root, TLD, authoritative." });
  b.short({ d: 2, skill: "APPLICATION", daily: true, hints: ["The path starts with a / after the domain name."],
    stem: `Write the path in this URL.\n\n\`${url}\``, accepted: [u.path], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["term=2&year=2026"], explanation: `The path is ${u.path}.` });
  b.short({ d: 3, skill: "APPLICATION", hints: ["Find the part between the ? and the #."],
    stem: `Write the query string in this URL.\n\n\`${url}\``, accepted: [u.query], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["summary"], explanation: `The query string is ${u.query}.` });
  b.num({ d: 3, skill: "APPLICATION", hints: ["A record is valid for 200 s after a full lookup.", "Work through the times in order."],
    stem: `A resolver caches each answer for a TTL of 200 s. The same domain name is requested at 0 s, 90 s, 250 s, 310 s and 600 s.\n\nHow many of the five requests need a full lookup?`,
    value: full, wrong: [2, 5], workedSolution: `1. 0 s: full lookup (valid until 200 s).\n2. 90 s: cached.\n3. 250 s: expired, full lookup (valid until 450 s).\n4. 310 s: cached.\n5. 600 s: expired, full lookup.\n6. ${full} full lookups.`, explanation: `${simTable}\n\n${full} full lookups.` });
  b.num({ d: 2, skill: "RECALL", hints: ["One port for HTTP, one for HTTPS."],
    stem: "State the default port number of HTTP.", value: 80, wrong: [443, 8080], workedSolution: "HTTP uses port 80 by default.", explanation: "HTTP uses port 80; HTTPS uses 443." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 5, hints: ["Browser, resolver, root, TLD, authoritative."],
    stem: "Describe how a browser finds the IP address for a domain name that is not in any cache. [5]",
    points: ["The browser (computer) sends the name to the DNS resolver", "The resolver asks a root server, which gives the address of the correct TLD server", "The resolver asks the TLD server, which gives the address of the authoritative name server", "The resolver asks the authoritative server, which returns the IP address", "The resolver stores the answer in its cache and returns it to the browser, which connects to that address"],
    modelAnswer: "The browser sends the domain name to the resolver. The resolver asks a root server, which gives the address of the TLD server. The TLD server gives the address of the authoritative server, which returns the IP address. The resolver caches the answer and returns it to the browser, which connects to that address.",
    explanation: "Five stages in order." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 2, hints: ["Think about time and traffic."],
    stem: "Explain one benefit of DNS caching. [2]",
    points: ["A stored answer can be returned immediately without asking the other servers", "This speeds up page loading and reduces traffic on the DNS servers"],
    modelAnswer: "A stored answer is returned straight away, without asking the root, TLD and authoritative servers, so pages load faster and there is less traffic on the DNS servers.",
    explanation: "Speed and reduced load." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Give three different causes."],
    stem: "Give three reasons why a DNS lookup could fail. [3]",
    points: ["The domain name is mistyped or does not exist", "A DNS server is not working or cannot be reached", "The user's device has no network connection or uses a wrong DNS server"],
    modelAnswer: "The name might be mistyped or not registered, the DNS server might be down, or the device might have no network connection.",
    explanation: "Name, server, connection." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 3, hints: ["Describe what is changed and what the user sees."],
    stem: "Explain how DNS cache poisoning could lead to a customer of a bank's web site giving away their login details. [3]",
    points: ["A false record for the bank's domain name is placed in a resolver's cache", "The customer types the correct name but is sent to the attacker's copy of the site", "The copy looks like the bank, so the customer enters the login details, which the attacker collects"],
    modelAnswer: "A false record for the bank's domain is placed in the resolver's cache. The customer types the correct name but is sent to the attacker's copy of the site, which looks real, and enters their login details, which the attacker collects.",
    explanation: "False record, redirected user, details collected." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Read the URL from left to right."],
    explanation: "Protocol https, domain results.kwekwe-high.ac.zw, path /form4/marks, query term=2&year=2026, fragment summary.",
    stem: `A school in Kwekwe publishes examination results at this URL.\n\n\`${url}\``,
    parts: [
      pm("(a)", "Which part of the URL is the protocol?", ["https", "Correct: the part before ://."], [["results", "This is a subdomain within the domain name."], ["/form4/marks", "This is the path."], ["summary", "This is the fragment."]], "The protocol is https."),
      P.short({ label: "(b)", marks: 1, stem: "Write the domain name.", accepted: [u.host], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["kwekwe-high"], explanation: `The domain name is ${u.host}.` }),
      P.num({ label: "(c)", marks: 1, stem: "Which port number will the browser use?", value: 443, wrong: [80, 8080], workedSolution: "1. The protocol is https.\n2. No port is given, so the default port for HTTPS is used: 443.", explanation: "No port is given, so the default for HTTPS, 443, is used." }),
      P.short({ label: "(d)", marks: 1, stem: "Write the query string.", accepted: [u.query], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["summary"], explanation: `The query string is ${u.query}.` }),
      P.manual({ label: "(e)", marks: 2, stem: "State the purpose of the part `#summary`.", points: ["It is the fragment, which identifies a position within the page", "The browser scrolls to it; it is not sent to the server"], modelAnswer: "It is a fragment that identifies a position in the page. The browser scrolls to it and does not send it to the server.", explanation: "Fragment." }),
      P.manual({ label: "(f)", marks: 2, stem: "State what the browser needs from DNS before it can fetch the page, and why.", points: ["The IP address of the server for the domain name", "Packets are routed using IP addresses, not names"], modelAnswer: "It needs the IP address of the server for the domain name, because packets are routed using IP addresses, not names.", explanation: "Name to address." }),
    ] });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Check when each record expires."],
    explanation: "Full lookups at 0, 200 and 400 s; cached answers at 60 and 480 s.",
    stem: `A resolver in a Gweru ISP caches each DNS answer for 150 s. Customers request the same domain name at these times: 0 s, 60 s, 200 s, 400 s and 480 s.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "State the number of requests that were answered from the cache.", value: 2, wrong: [3, 5], workedSolution: "1. 0 s: full lookup (valid until 150 s). 60 s: cached.\n2. 200 s: expired, full lookup (valid until 350 s). 400 s: expired, full lookup (valid until 550 s).\n3. 480 s: cached.\n4. Two requests (60 s and 480 s) were answered from the cache.", explanation: "The requests at 60 s and 480 s were answered from the cache." }),
      P.num({ label: "(b)", marks: 2, stem: "At what time in seconds does the record stored at 400 s expire?", value: 550, wrong: [400, 150], workedSolution: "1. Record stored at 400 s.\n2. Expiry = 400 + 150 = 550 s.", explanation: "400 + 150 = 550 s." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why a very long TTL could cause a problem if a website moves to a new server.", points: ["Resolvers keep the old IP address until the TTL expires", "Users are sent to the old server, so the site appears unavailable or out of date"], modelAnswer: "Resolvers keep the old address until the TTL runs out, so users are sent to the old server and the site appears unavailable or out of date.", explanation: "Stale records." }),
    ] });
  b.card("DEFINITION", "URL", "Uniform Resource Locator: protocol, domain name, optional port, path, optional query string and fragment.");
  b.card("DEFINITION", "Domain Name System (DNS)", "A hierarchy of servers that translate domain names into IP addresses.");
  b.card("CONCEPT", "DNS lookup order", "Browser and OS caches, then the resolver; resolver asks root, then TLD, then authoritative server; the answer is cached.");
  b.card("DEFINITION", "TTL (time to live)", "How long, in seconds, a DNS record may be cached before a new lookup is needed.");
  b.card("FACT", "Default ports", "HTTP 80; HTTPS 443.");
  b.card("CONCEPT", "Recursive and iterative query", "Recursive: the resolver finds the whole answer for the client. Iterative: each server refers the resolver to the next.");
  b.card("CONCEPT", "Fragment", "The part after # that points to a place in the page; used by the browser, not sent to the server.");
  b.card("CONCEPT", "DNS cache poisoning", "A false record is placed in a resolver's cache so users are sent to a false site.");
});
