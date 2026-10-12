// Slice w2b: application-layer protocols (acs.network.application-protocols, Cambridge only).
import { concept, P, chk } from "../lib.mjs";
import { mc, pm } from "../tables/w2b-q.mjs";

chk(450 / 2.5, 180);
chk((450 * 8) / 6, 600);
chk((450 * 8) / (5 * 6), 120);

concept("acs.network.application-protocols", { file: "network/application-protocols", keyPrefix: "network.application-protocols" }, (b) => {
  mc(b, 1, "RECALL", "Which protocol is used to send an email from a user's email program to a mail server?",
    ["SMTP", "Correct: SMTP sends email."],
    [["POP3", "POP3 downloads email from a server."], ["FTP", "FTP transfers files."], ["HTTP", "HTTP is used to fetch web pages."]],
    "SMTP sends mail to and between servers.");
  mc(b, 2, "UNDERSTANDING", "What is the main difference between HTTP and HTTPS?",
    ["HTTPS encrypts the data sent between the browser and the server", "Correct."],
    [["HTTPS can only fetch images, and HTTP can only fetch text", "HTTPS fetches any web resource."], ["HTTP is used to send email and HTTPS is used to fetch web pages", "Both are used for web resources."], ["HTTPS is faster because it removes the headers", "HTTPS does not remove headers; it encrypts the connection."]],
    "HTTPS is HTTP over TLS.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which protocol keeps email on the server so that it can be read on several devices?",
    ["IMAP", "Correct: messages stay on the server."],
    [["POP3", "POP3 normally downloads and removes the message from the server."], ["SMTP", "SMTP sends email; it does not manage a mailbox."], ["FTP", "FTP transfers files; it is not an email protocol."]],
    "IMAP manages the mailbox on the server.", { daily: true });
  mc(b, 2, "RECALL", "What is the purpose of FTP?",
    ["To transfer files between a client and a server", "Correct."],
    [["To send an email between servers", "That is SMTP."], ["To translate a domain name into an IP address for a client", "That is DNS."], ["To display a web page in a browser", "That is HTTP."]],
    "FTP uploads and downloads files.");
  mc(b, 3, "UNDERSTANDING", "In BitTorrent, what is the role of the tracker?",
    ["It lists the peers sharing the file and gives their addresses to a client", "Correct."],
    [["It stores the whole file so that the peers can download it from one place", "The tracker does not hold the file."], ["It encrypts the pieces so that they cannot be read", "The tracker does not encrypt the pieces."], ["It checks that the file has no malware", "The tracker does not scan files."]],
    "The tracker helps a client find the peers in the swarm.", { hints: ["Does the tracker hold the file or only information about peers?"] });
  mc(b, 3, "UNDERSTANDING", "In a BitTorrent swarm, what is a seeder?",
    ["A peer that has the complete file and uploads it to others", "Correct."],
    [["A peer that has only just started downloading and has no pieces", "That is a leecher."], ["The server that starts the swarm and stores the tracker", "The tracker is not the seeder."], ["A program that splits the file into pieces", "Splitting is done when the torrent is created."]],
    "Seeders have all the pieces; leechers are still downloading.", { hints: ["Which peers have the whole file?"] });
  mc(b, 4, "EVALUATION", "A student in Mutare reads email on a laptop and on a phone, and wants a message deleted on one to disappear on the other. Which protocol should the email program use to receive mail?",
    ["IMAP, because the mailbox stays on the server and is kept in step", "Correct."],
    [["POP3, because it downloads messages and removes them from the server", "A POP3 device would have the messages and the other would not see them."], ["SMTP, because it keeps messages on every device", "SMTP sends mail; it does not receive it for the user."], ["FTP, because it synchronises files", "FTP is not an email protocol."]],
    "IMAP leaves messages on the server so that the devices agree.", { hints: ["Where must the master copy of the mailbox be kept?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "POP3 is used by a mail server to send email to another mail server.", answer: false, explanation: "False. Mail servers send email to each other with SMTP; POP3 is used by a user's program to download mail." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Using the BitTorrent protocol to share a file is always illegal.", answer: false, explanation: "False. The protocol is legal and is used for open-source software and other files shared with permission; only sharing material without the owner's permission is illegal." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each protocol to its purpose.",
    pairs: [["HTTP", "Request and response for web pages"], ["FTP", "Transfer of files to and from a server"], ["SMTP", "Sending email"], ["POP3", "Downloading email to one device"], ["IMAP", "Reading email that stays on the server"]],
    explanation: "Each protocol is designed for one job." });
  b.match({ d: 3, skill: "UNDERSTANDING", stem: "Match each BitTorrent term to its meaning.",
    pairs: [["Tracker", "Gives clients the addresses of peers sharing the file"], ["Swarm", "The group of peers sharing the same file"], ["Seeder", "A peer with the complete file that uploads it"], ["Leecher", "A peer still downloading that uploads the pieces it has"], ["Piece", "A part of the file that is downloaded and checked separately"]],
    hints: ["Who has the whole file?"], explanation: "BitTorrent terms." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the path of an email.",
    template: "The sender's program sends the message to its mail server using {{blank:a}}. The servers pass the message on using {{blank:b}}. The recipient's program collects it using POP3 or {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["SMTP"], choices: ["SMTP", "POP3", "FTP", "HTTP"] },
      { id: "b", accepted: ["SMTP"], choices: ["SMTP", "IMAP", "FTP", "BitTorrent"] },
      { id: "c", accepted: ["IMAP"], choices: ["IMAP", "SMTP", "FTP", "HTTPS"] },
    ], explanation: "SMTP, SMTP, then POP3 or IMAP." });
  b.num({ d: 3, skill: "APPLICATION", hints: ["Pieces = file size ÷ piece size."],
    stem: "A 450 MB file is divided into pieces of 2.5 MB. How many pieces are there?",
    value: 180, wrong: [18, 1125], workedSolution: "1. 450 ÷ 2.5 = 180.", explanation: "450 ÷ 2.5 = 180 pieces." });
  b.num({ d: 3, skill: "APPLICATION", unit: "s", hints: ["450 MB = 3600 Mbit."],
    stem: "A 450 MB file is downloaded from one server at 6 Mbit/s. Take 1 MB = 1 000 000 bytes. How many seconds does it take?",
    value: 600, wrong: [75, 2700], workedSolution: "1. 450 MB = 450 × 8 = 3600 Mbit.\n2. 3600 ÷ 6 = 600 s.", explanation: "3600 Mbit ÷ 6 Mbit/s = 600 s." });
  b.num({ d: 4, skill: "ANALYSIS", unit: "s", hints: ["Five peers each supply 6 Mbit/s at the same time.", "Total rate = 5 × 6."],
    stem: "The same 450 MB file is downloaded by BitTorrent from five peers, each supplying 6 Mbit/s at the same time. Take 1 MB = 1 000 000 bytes. How many seconds does it take, assuming the user's connection can carry the total rate?",
    value: 120, wrong: [600, 3000], workedSolution: "1. Total rate = 5 × 6 = 30 Mbit/s.\n2. Time = 3600 ÷ 30 = 120 s.", explanation: "3600 Mbit ÷ 30 Mbit/s = 120 s." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Name the protocol at each stage."],
    stem: "Describe how an email is sent from one user to another. [4]",
    points: ["The sender's email program sends the message to the sender's mail server using SMTP", "The sender's server sends the message to the recipient's mail server using SMTP", "The message is stored in the recipient's mailbox on the server", "The recipient's program fetches the message using POP3 or IMAP"],
    modelAnswer: "The sender's program sends the message to its mail server using SMTP. That server sends it to the recipient's mail server using SMTP, where it is stored in the recipient's mailbox. The recipient's program fetches it using POP3 or IMAP.",
    explanation: "SMTP, SMTP, mailbox, POP3 or IMAP." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Where is the message kept afterwards?"],
    stem: "Explain one difference between POP3 and IMAP. [3]",
    points: ["POP3 downloads the message to the device and normally deletes it from the server", "IMAP leaves the message on the server and the mailbox is managed there", "So with IMAP several devices see the same messages, but with POP3 only the device that downloaded them has them"],
    modelAnswer: "POP3 downloads the message to the device and normally deletes it from the server, but IMAP leaves it on the server. With IMAP several devices see the same mailbox, whereas with POP3 only the device that downloaded the message has it.",
    explanation: "Where the message is kept and the effect on several devices." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Use the terms piece, tracker, swarm, seeder, leecher."],
    stem: "Describe how a file is shared using the BitTorrent protocol. [4]",
    points: ["The file is divided into pieces", "The client contacts a tracker, which gives it the addresses of peers in the swarm", "The client downloads different pieces from several peers at the same time", "As it receives pieces it uploads them to other peers; a peer with the complete file is a seeder"],
    modelAnswer: "The file is divided into pieces. The client contacts a tracker, which gives it the addresses of other peers in the swarm. It downloads different pieces from several peers at once, and it uploads the pieces it already has to others. A peer with the complete file is a seeder.",
    explanation: "Pieces, tracker, parallel download, uploading." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Give two advantages and two disadvantages."],
    stem: "Evaluate the use of BitTorrent for distributing a 2 GB software update to the computers of a school network across Zimbabwe. [4]",
    points: ["Advantage: the load is shared between the peers, so the original server is not overloaded", "Advantage: downloads can be faster because pieces come from many peers at once", "Disadvantage: speed depends on how many seeders are available", "Disadvantage: pieces from unknown peers may be damaged or contain malware, and the peers' IP addresses are visible"],
    modelAnswer: "The load is shared between peers, so the server is not overloaded, and the download can be faster because pieces arrive from many peers at once. However, the speed depends on the number of seeders, and files from unknown peers could be damaged or contain malware, and the peers' IP addresses are visible.",
    explanation: "Two advantages and two disadvantages." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Match each task to the protocol designed for it."],
    explanation: "FTP for uploading files, IMAP for mail on several devices, HTTPS for payments.",
    stem: "A computer-science teacher in Gweru builds a website for her school. She uploads the pages to a web server, reads school email on her laptop and phone, and uses the school's payment page to receive fees.",
    parts: [
      pm("(a)", "Which protocol is best for uploading the pages to the web server?", ["FTP", "Correct: it is designed to transfer files."], [["SMTP", "SMTP sends email."], ["POP3", "POP3 downloads email."], ["IMAP", "IMAP manages email on a server."]], "FTP."),
      pm("(b)", "Which protocol should the email programs use to receive mail so that the laptop and phone show the same mailbox?", ["IMAP", "Correct."], [["POP3", "POP3 downloads and normally deletes messages from the server."], ["SMTP", "SMTP sends email."], ["FTP", "FTP is for files."]], "IMAP."),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the payment page should use HTTPS and not HTTP.", points: ["HTTPS encrypts the data sent between the browser and the server", "So the card or mobile-money details cannot be read or altered by anyone intercepting them"], modelAnswer: "HTTPS encrypts the data sent between the browser and the server, so payment details cannot be read or altered by anyone who intercepts them.", explanation: "Encryption protects payment details." }),
      P.manual({ label: "(d)", marks: 2, stem: "State two purposes of the SMTP protocol in the school's email system.", points: ["To send an email from a user's program to the mail server", "To send email from one mail server to another"], modelAnswer: "SMTP sends email from a user's program to the mail server, and from one mail server to another.", explanation: "Sending only." }),
    ] });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Compare BitTorrent with a download from a single server."],
    explanation: "BitTorrent shares pieces; from five sources the download is faster, but it depends on the swarm.",
    stem: "A university in Bulawayo distributes a 3 GB operating-system image to students. It can offer the file from its own server or share it by BitTorrent with a tracker and several seeders.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain the role of the tracker and of a seeder.", points: ["The tracker keeps a list of the peers sharing the file and gives their addresses to clients", "A seeder is a peer that has the whole file and uploads it to others"], modelAnswer: "The tracker keeps a list of the peers sharing the file and gives their addresses to clients. A seeder has the whole file and uploads it to others.", explanation: "Tracker and seeder." }),
      P.manual({ label: "(b)", marks: 2, stem: "Give two benefits to the university of using BitTorrent instead of its own server.", points: ["The load on the university server and its connection is reduced", "More students can download at the same time because the students upload to each other"], modelAnswer: "The load on the university's server and connection is reduced, and more students can download at the same time because they also upload pieces to each other.", explanation: "Shared load." }),
      P.manual({ label: "(c)", marks: 2, stem: "State two risks of using BitTorrent for this purpose.", points: ["A piece from an unknown peer may be damaged or contain malware", "The download is slow if few seeders are available"], modelAnswer: "A piece from an unknown peer may be damaged or contain malware, and the download is slow if few seeders are available.", explanation: "Risks." }),
      P.manual({ label: "(d)", marks: 2, stem: "State one legal use and one illegal use of BitTorrent.", points: ["Legal: distributing open-source software or files the owner has allowed to be shared", "Illegal: sharing copyright films, music or software without the owner's permission"], modelAnswer: "Legal: distributing open-source software. Illegal: sharing copyright films or music without the owner's permission.", explanation: "Legal and illegal uses." }),
    ] });
  b.card("FACT", "HTTP and HTTPS", "HTTP: request and response for web pages (port 80). HTTPS: HTTP over TLS, encrypted (port 443).");
  b.card("DEFINITION", "FTP", "File Transfer Protocol: uploads and downloads files between a client and a server (port 21).");
  b.card("DEFINITION", "SMTP", "Sends email from a client to a server and between mail servers (port 25).");
  b.card("DEFINITION", "POP3", "Downloads email from the server to one device, normally deleting it from the server (port 110).");
  b.card("DEFINITION", "IMAP", "Manages email on the server so that several devices see the same mailbox (port 143).");
  b.card("CONCEPT", "BitTorrent", "A file is split into pieces; a tracker finds peers; peers in a swarm share pieces; seeders have the complete file, leechers are still downloading.");
  b.card("CONCEPT", "BitTorrent advantages and drawbacks", "Fast with many peers and spreads the load; speed depends on seeders, risk of malware, can be misused to share copyright files.");
  b.card("CONCEPT", "Path of an email", "Client to server by SMTP; server to server by SMTP; recipient collects with POP3 or IMAP.");
});
