// Slice w3a: firewalls, proxy servers, SSL and other protections (comp.security.network-defences).
import { concept, P } from "../lib.mjs";

concept("comp.security.network-defences", { file: "security/network-defences", keyPrefix: "security.network-defences" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does a **firewall** do?",
    options: [
      ["Checks network traffic against rules and blocks traffic that breaks them", "Correct: it filters incoming and outgoing traffic."],
      ["Scans every file on the hard disk and deletes any viruses it finds", "That is anti-malware software."],
      ["Makes a backup copy of the network's data", "That is backup software."],
      ["Converts digital data into analogue signals", "That is a modem."],
    ],
    answer: "A",
    explanation: "A firewall monitors incoming and outgoing traffic, compares it with a set of rules and blocks what does not meet them.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does the padlock and `https` at the start of a web address show?",
    options: [
      ["The connection uses SSL, so data sent is encrypted", "Correct: SSL encrypts data between browser and server."],
      ["The website contains no adverts", "Adverts are unrelated to SSL."],
      ["The website has been checked for spelling mistakes", "SSL does not check content."],
      ["The computer's firewall has been switched off", "SSL has nothing to do with the firewall setting."],
    ],
    answer: "A",
    explanation: "HTTPS and the padlock show an SSL connection: data is encrypted and the server has a certificate.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a function of a **proxy server**?",
    options: [
      ["Hiding the internal network's IP addresses from websites", "Correct: websites see only the proxy's address."],
      ["Giving each device its MAC address", "MAC addresses are set at manufacture."],
      ["Scanning fingerprints at login", "That is biometric authentication."],
      ["Encrypting all the files stored on the hard disk", "That is disk encryption, not a proxy."],
    ],
    answer: "A",
    explanation: "A proxy makes requests on users' behalf, so their IP addresses are hidden; it can also filter and cache pages.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why should a computer be set to install software updates automatically?",
    options: [
      ["Updates patch security weaknesses that attackers exploit", "Correct: fixes are applied as soon as they are released."],
      ["Updates remove the need for passwords", "Passwords are still needed."],
      ["Updates make the screen resolution higher", "Security updates do not change resolution."],
      ["Updates stop the user from receiving any email with attachments", "Updates do not block email."],
    ],
    answer: "A",
    explanation: "Automatic updates close security holes quickly, before hackers or malware can exploit them.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["What does the browser check before starting an encrypted session?"],
    stem: "During an SSL connection, what does the web server send so that the browser can check its identity?",
    options: [
      ["Its digital certificate", "Correct: issued by a trusted certificate authority."],
      ["Its MAC address", "MAC addresses are not used to prove a website's identity."],
      ["The user's password", "The server never sends the user's password."],
      ["A copy of its firewall rules", "Firewall rules stay private."],
    ],
    answer: "A",
    explanation: "The server sends its digital certificate; the browser checks it was issued by a trusted certificate authority before encryption begins.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Which defence stops users visiting particular sites?"],
    stem: "A school wants to stop learners visiting gambling websites from school computers and make popular pages load faster. Which solution does both?",
    options: [
      ["A proxy server", "Correct: it filters requests and caches pages."],
      ["Anti-spyware software", "Anti-spyware detects spyware; it does not block sites or cache pages."],
      ["Two-step verification", "That protects logins."],
      ["Automatic software updates", "Updates patch weaknesses."],
    ],
    answer: "A",
    explanation: "A proxy server can block listed websites and cache frequently visited pages.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Look for errors, urgency and the link."],
    stem: "Which feature of an email is the strongest sign that it is a phishing attempt?",
    options: [
      ["A link whose real address does not match the bank's website", "Correct: hovering reveals a fake URL."],
      ["The bank's full name appears in the subject line of the email", "Criminals copy bank names, so this proves nothing."],
      ["It arrived during working hours", "Timing is not a reliable sign."],
      ["It contains the bank's logo", "Logos are easily copied."],
    ],
    answer: "A",
    explanation: "Checking the URL behind a link reveals fake sites; spelling mistakes and an urgent tone are other warning signs.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Data on public Wi-Fi can be intercepted.", "Which solution makes intercepted data useless?"],
    stem: "Learners log in to the school portal over public Wi-Fi at a café. Which solution best protects their passwords from interception?",
    options: [
      ["The portal using SSL (https), so the data is encrypted", "Correct: intercepted data cannot be read."],
      ["A firewall on the school's network", "The interception happens on the café's Wi-Fi, before the data reaches the school."],
      ["A proxy server that caches the portal's pages", "Caching does not encrypt the password."],
      ["Checking the spelling of the portal's pages", "This helps spot phishing, not interception."],
    ],
    answer: "A",
    explanation: "SSL encrypts the data between the browser and the server, so a sniffer on public Wi-Fi sees only ciphertext.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A firewall can block traffic going out of a network as well as traffic coming in.",
    answer: true,
    explanation: "True. Firewalls check both directions, for example stopping an unauthorised program from sending data out.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A firewall scans the files on a computer and removes viruses.",
    answer: false,
    explanation: "False. A firewall filters network traffic; anti-malware scans and removes malware.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each threat to the solution that best counters it.",
    pairs: [
      ["Unauthorised connections from the internet", "Firewall"],
      ["Passwords intercepted in transit", "SSL"],
      ["Malware exploiting an unpatched operating system", "Automatic software updates"],
      ["Learners visiting blocked websites", "Proxy server"],
      ["Fake emails asking for bank details", "Checking the URL, spelling and tone"],
    ],
    explanation: "Each solution counters a particular threat: filtering, encryption, patching, web filtering, or user vigilance.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Who issues certificates?"],
    stem: "Complete the description of SSL.",
    template: "The browser asks the server to identify itself. The server sends its digital {{blank:a}}, which the browser checks was issued by a trusted certificate {{blank:b}}. The browser and server then agree a key and all data is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["certificate"], choices: ["certificate", "signature", "password", "address"] },
      { id: "b", accepted: ["authority"], choices: ["authority", "server", "firewall", "provider"] },
      { id: "c", accepted: ["encrypted"], choices: ["encrypted", "compressed", "deleted", "cached"] },
    ],
    explanation: "Certificate → checked against a certificate authority → encrypted session.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the server that sits between users' computers and the internet, fetching web pages on their behalf.",
    accepted: ["proxy server", "proxy", "a proxy server", "a proxy"],
    wrong: ["firewall"],
    explanation: "A proxy server is an intermediary for web requests.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Describe what it examines, what it compares with and what it does."],
    stem: "Explain how a firewall helps to keep a school's network safe.",
    points: [
      "It monitors (examines) incoming and outgoing traffic between the network and the internet",
      "It checks the traffic against a set of rules/criteria (e.g. allowed IP addresses, ports, websites)",
      "It blocks traffic that does not meet the rules (e.g. hacking attempts) and logs/alerts suspicious traffic",
    ],
    explanation: "A firewall filters traffic in both directions against rules set by the administrator.",
    modelAnswer: "The firewall sits between the school network and the internet and examines every packet going in and out. It compares each one with rules set by the technician, such as which addresses and ports are allowed, blocks anything that breaks the rules, like a hacker's connection attempt, and logs it so the technician is alerted.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    hints: ["Look at the spelling, the tone and the link."],
    stem: "Tendai receives this message: \"Dear valued costumer, your mobile wallet has been SUSPENDED. Confirm your PIN in the next 30 minutes at the link below or lose your money.\" Explain **three** signs that it is a phishing attempt and what Tendai should do.",
    points: [
      "Spelling/grammar error (\"costumer\") / a generic greeting instead of his name",
      "Urgent or threatening tone (30 minutes, lose your money) to rush him",
      "It asks for his PIN, which a genuine provider never asks for / the link's URL would not match the provider's real address",
      "He should not click the link; delete or report it and contact the provider using its official number",
    ],
    explanation: "Spelling, tone, requests for secrets and mismatched URLs are the classic signs of phishing.",
    modelAnswer: "\"Costumer\" is misspelt and the greeting is generic, the message uses threats and a 30-minute deadline to rush him, and it asks for his PIN, which no real provider ever does. He should not click the link, delete the message, and phone the provider on its official number to check.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["A proxy hides addresses, filters and caches.", "SSL needs a certificate and encrypts."],
    stem: "A college in Bulawayo is improving the security of its network and its student portal.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which solution would hide the IP addresses of the college's computers from the websites they visit?",
        options: [
          ["Proxy server", "Correct: websites see only the proxy's address."],
          ["Anti-malware", "Anti-malware scans files."],
          ["Biometrics", "Biometrics authenticate users."],
          ["Privacy settings", "These control what others see on social media."],
        ],
        answer: "A", explanation: "Requests are made by the proxy on the users' behalf.",
      }),
      P.short({
        label: "(b)", stem: "Name the protocol that should be used so that students' passwords are encrypted when they log in to the portal.",
        accepted: ["SSL", "secure socket layer", "secure sockets layer", "TLS", "HTTPS"], wrong: ["FTP"],
        explanation: "SSL (shown as HTTPS) encrypts the login.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Describe how SSL sets up a secure connection between a student's browser and the portal.",
        points: [
          "The browser requests that the portal's server identifies itself",
          "The server sends a copy of its digital certificate (with its public key)",
          "The browser checks the certificate is valid / issued by a trusted certificate authority",
          "A session key is agreed and the data sent is encrypted (https/padlock shown)",
        ],
        modelAnswer: "The browser asks the portal's server to identify itself, and the server sends its digital certificate. The browser checks that the certificate is valid and issued by a trusted certificate authority. If it is, they agree a session key and all data, including the password, is sent encrypted, with the padlock shown in the browser.",
      }),
    ],
    explanation: "(a) proxy server (b) SSL.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    hints: ["No single solution stops every threat.", "Pick the solution that matches each threat."],
    stem: "Nyasha manages the network of a law firm in Harare. She already uses anti-malware on every computer, but the partners want more protection.",
    parts: [
      P.tf({
        label: "(a)", stem: "Because the firm uses anti-malware, it does not need a firewall.",
        answer: false, explanation: "False. Anti-malware scans files; a firewall filters network traffic. They counter different threats.",
      }),
      P.match({
        label: "(b)", stem: "Match each risk to the solution Nyasha should add.",
        pairs: [
          ["Old software with known security holes", "Automatic software updates"],
          ["Hackers trying to connect to the firm's server", "Firewall"],
          ["Clients' documents read while being sent to the firm's website", "SSL"],
        ],
        explanation: "Patching, filtering traffic and encrypting data in transit.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Staff keep receiving convincing fake emails. Explain why technical solutions alone cannot solve this and suggest what Nyasha should do.",
        points: [
          "Phishing tricks the person; the email may pass through the firewall/anti-malware because it contains only a link, not malware",
          "Train staff to check the URL behind links, and spelling, tone and urgency of messages",
          "Staff should report suspicious emails and verify requests by phoning the sender on a known number",
          "Add two-step verification so that a password given away to a fake site is not enough on its own",
        ],
        modelAnswer: "A phishing email often contains only text and a link, so the firewall and anti-malware let it through; it works by fooling the reader. Nyasha should train staff to hover over links to check the URL, to look for spelling mistakes and an urgent tone, and to report suspicious emails and check any request by phoning the sender on a known number. Two-step verification would also mean that a password typed into a fake site could not be used on its own.",
      }),
    ],
    explanation: "(a) false (b) updates, firewall, SSL.",
  });

  b.card("DEFINITION", "What is a **firewall**?", "Hardware or software that examines incoming and outgoing traffic, checks it against rules and blocks traffic that breaks them.");
  b.card("DEFINITION", "What is a **proxy server**?", "An intermediary that makes web requests on users' behalf: hides their IP addresses, filters websites and caches pages.");
  b.card("DEFINITION", "What does **SSL** do?", "Encrypts data between browser and web server and uses a digital certificate to confirm the server's identity (https, padlock).");
  b.card("DEFINITION", "What is a **digital certificate**?", "An electronic document from a trusted certificate authority that confirms a website's identity and holds its public key.");
  b.card("CONCEPT", "Steps of setting up an SSL connection?", "Browser asks server to identify itself → server sends certificate → browser checks it with the certificate authority → session key agreed → data encrypted.");
  b.card("CONCEPT", "Why automate software updates?", "Updates patch security weaknesses as soon as fixes are released, before attackers or malware can exploit them.");
  b.card("FACT", "Warning signs of a phishing message?", "Spelling and grammar mistakes, generic greeting, urgent or threatening tone, requests for passwords or PINs, a link whose URL does not match.");
  b.card("CONCEPT", "Firewall compared with anti-malware?", "A firewall filters network traffic; anti-malware scans files for malware and removes it.");
  b.card("DEFINITION", "What is a **digital signature**?", "Data added to a message or document that proves who sent it and that it has not been changed.");
});
