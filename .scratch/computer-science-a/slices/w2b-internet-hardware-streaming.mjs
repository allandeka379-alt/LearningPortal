// Slice w2b: the internet, the WWW, internet hardware and streaming (acs.network.internet-hardware-streaming, Cambridge only).
import { concept, P, chk } from "../lib.mjs";
import { mc, pm } from "../tables/w2b-q.mjs";
import { dlSeconds } from "../tables/w2b-internet-hardware-streaming.mjs";

concept("acs.network.internet-hardware-streaming", { file: "network/internet-hardware-streaming", keyPrefix: "network.internet-hardware-streaming" }, (b) => {
  mc(b, 1, "RECALL", "Which statement correctly describes the internet?",
    ["A worldwide network of networks", "Correct: it joins many smaller networks."],
    [["A collection of web pages viewed in a browser", "That describes the World Wide Web."], ["A program used to view web pages", "That describes a web browser."], ["A single very large computer that stores all websites", "The internet is not one computer."]],
    "The internet is the infrastructure of joined networks.");
  mc(b, 2, "UNDERSTANDING", "Which service runs on the internet but is not part of the World Wide Web?",
    ["Sending email between mail servers", "Correct: email uses its own protocols, not web pages."],
    [["Reading a news page in a browser", "This is the web."], ["Following a link to another web page", "This is the web."], ["Loading an image on a web page", "The image is a web resource."]],
    "Email and file transfer are internet services that are not web pages.", { daily: true });
  mc(b, 2, "RECALL", "What is the job of a modem?",
    ["To convert digital data to and from a signal suitable for a telephone line", "Correct: modulation and demodulation."],
    [["To find the fastest route for each packet across the whole of the internet at once", "That is a router."], ["To provide an internet connection to customers", "That is the ISP."], ["To store web pages for quick display", "That is a cache or a server."]],
    "A modem modulates and demodulates.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which type of connection is a permanent link rented from a carrier, giving a fixed capacity to one customer?",
    ["A dedicated line", "Correct."],
    [["A dial-up connection", "A dial-up link is made when needed and then closed."], ["A shared mobile connection", "The cell phone network is shared by many users."], ["A public WiFi hotspot", "A hotspot shares its capacity between all users."]],
    "A dedicated (leased) line is permanent and not shared.");
  mc(b, 3, "UNDERSTANDING", "What is the main difference between real-time and on-demand streaming?",
    ["Real-time content is sent as it is captured; on-demand content comes from a stored file", "Correct."],
    [["Real-time content is always sent at a higher resolution than on-demand content, because it is not stored", "Resolution depends on the stream, not on the type."], ["On-demand content cannot be paused", "On-demand content can be paused and rewound."], ["Real-time content does not need a buffer", "A buffer is used in both."]],
    "Live events are real-time; recorded files are on-demand.", { hints: ["Is there a stored file in advance?"] });
  mc(b, 3, "APPLICATION", "A video needs 6 Mbit/s to play smoothly but the connection supplies 2 Mbit/s. What will the viewer notice?",
    ["Repeated pauses while the buffer refills", "Correct: data arrives more slowly than it is played."],
    [["The video plays faster than normal", "A low bit rate does not speed up playback."], ["The video plays normally with better quality", "A lower bit rate does not improve quality."], ["The video downloads permanently to the device", "Streaming does not store the whole file."]],
    "The buffer empties because the data arrives slower than the playback rate.", { hints: ["Compare the rate supplied with the rate needed."] });
  mc(b, 4, "EVALUATION", "A school in Hwange has a poor mobile signal and needs students to watch a live broadcast lesson every morning. Which statement is the best judgement?",
    ["A dedicated line is more reliable because its capacity is not shared", "Correct: a live stream needs a constant bit rate."],
    [["A mobile connection is better because it always gives the same speed", "Mobile speed varies with signal and users."], ["A modem on the PSTN is better because it is fastest", "A PSTN dial-up modem is slow for streaming."], ["The type of connection does not matter for a live stream", "A live stream cannot be buffered far ahead, so the connection matters."]],
    "A real-time stream depends on a steady bit rate, so a dedicated line suits it better than a weak mobile signal.", { hints: ["What does a live stream need from the connection?"] });
  b.tf({ d: 2, skill: "RECALL", stem: "The World Wide Web is a service that runs on the internet.", answer: true, explanation: "True. The web uses the internet but is not the whole of it." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "With on-demand streaming the viewer can normally pause and rewind the content.", answer: true, explanation: "True. The content is a stored file, so the viewer can pause, rewind and skip." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each item to its description.",
    pairs: [["Modem", "Converts between digital data and the signal on a telephone line"], ["ISP", "A company that provides a connection to the internet"], ["Dedicated line", "A permanent rented connection with fixed capacity"], ["Buffer", "Temporary store that smooths the arrival of streamed data"], ["Bit rate", "The number of bits sent or played each second"]],
    explanation: "Each item has one main role in internet access and streaming." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences about streaming.",
    template: "A live match is sent using {{blank:a}} streaming. A recorded lesson is sent using {{blank:b}} streaming. If the data arrives more slowly than it is played, the {{blank:c}} becomes empty and the video stops.",
    blanks: [
      { id: "a", accepted: ["real-time"], choices: ["real-time", "on-demand", "downloaded", "stored"] },
      { id: "b", accepted: ["on-demand"], choices: ["on-demand", "real-time", "live", "dedicated"] },
      { id: "c", accepted: ["buffer"], choices: ["buffer", "modem", "router", "ISP"] },
    ], explanation: "Live is real-time; recorded is on-demand; the buffer empties." });
  const t1 = dlSeconds(240, 16);
  chk(t1, 120);
  b.num({ d: 2, skill: "APPLICATION", daily: true, unit: "s", hints: ["Bits = bytes × 8."],
    stem: "A file of 240 MB is downloaded at 16 Mbit/s. Take 1 MB = 1 000 000 bytes. How many seconds does the download take?",
    value: 120, wrong: [15, 3840], workedSolution: "1. 240 MB = 240 × 8 = 1920 Mbit.\n2. Time = 1920 ÷ 16 = 120 s.", explanation: "1920 Mbit ÷ 16 Mbit/s = 120 s." });
  chk(dlSeconds(6, 2), 24);
  b.num({ d: 2, skill: "APPLICATION", unit: "s", hints: ["Multiply the size by 8 to get megabits."],
    stem: "A song of 6 MB is downloaded at 2 Mbit/s. Take 1 MB = 1 000 000 bytes. Calculate the download time in seconds.",
    value: 24, wrong: [3, 12], workedSolution: "1. 6 MB = 48 Mbit.\n2. 48 ÷ 2 = 24 s.", explanation: "48 Mbit ÷ 2 Mbit/s = 24 s." });
  chk(1.6 * 45 * 60 / 8, 540);
  b.num({ d: 3, skill: "APPLICATION", unit: "MB", hints: ["First convert 45 minutes into seconds.", "Divide megabits by 8 for megabytes."],
    stem: "A 45-minute recorded lesson is streamed at 1.6 Mbit/s. Take 1 MB = 1 000 000 bytes. How many megabytes of data are used?",
    value: 540, wrong: [72, 4320], workedSolution: "1. 45 minutes = 2700 s.\n2. Data = 1.6 × 2700 = 4320 Mbit.\n3. In megabytes = 4320 ÷ 8 = 540 MB.", explanation: "4320 Mbit ÷ 8 = 540 MB." });
  chk(300 * 8 / 100, 24);
  b.num({ d: 3, skill: "APPLICATION", unit: "Mbit/s", hints: ["Megabits needed ÷ seconds allowed."],
    stem: "A school wants to download a 300 MB update in no more than 100 seconds. Take 1 MB = 1 000 000 bytes. What is the minimum bit rate needed?",
    value: 24, wrong: [3, 30], workedSolution: "1. 300 MB = 2400 Mbit.\n2. Rate = 2400 ÷ 100 = 24 Mbit/s.", explanation: "2400 Mbit ÷ 100 s = 24 Mbit/s." });
  chk(5 * 480 / 4 - 480, 120);
  b.num({ d: 4, skill: "ANALYSIS", unit: "s", hints: ["Total data = rate × duration.", "Compare the arrival time with the playing time."],
    stem: "An 8-minute video is streamed at 5 Mbit/s but the connection supplies 4 Mbit/s. Calculate the minimum time, in seconds, that the player must buffer before starting so that the video does not stall.",
    value: 120, wrong: [600, 480], workedSolution: "1. Video = 480 s, so data = 5 × 480 = 2400 Mbit.\n2. At 4 Mbit/s this takes 2400 ÷ 4 = 600 s to arrive.\n3. The video must not catch up with the data, so the player must wait 600 − 480 = 120 s.", explanation: "Arrival time 600 s minus playing time 480 s = 120 s." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Define each, then state the relationship."],
    stem: "Explain the difference between the internet and the World Wide Web. [3]",
    points: ["The internet is a worldwide network of networks (the hardware and the protocols)", "The WWW is a collection of web pages and resources accessed by a browser using HTTP and URLs", "The WWW is one service that runs on the internet; other services such as email also use it"],
    modelAnswer: "The internet is a worldwide network of networks. The World Wide Web is a collection of web pages accessed using a browser, HTTP and URLs. The web is one service running on the internet, which also carries email and other services.",
    explanation: "Infrastructure against service." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Two points for each type."],
    stem: "Describe the difference between real-time and on-demand bit streaming. [4]",
    points: ["In real-time streaming the content is captured and sent as it happens", "There is no complete stored file, so the viewer cannot normally pause or skip ahead", "In on-demand streaming a stored file is sent when the user requests it", "The viewer can pause, rewind and skip"],
    modelAnswer: "In real-time streaming the content is captured and sent as it happens, such as a live match, and the viewer cannot normally skip ahead. In on-demand streaming a stored file is sent when requested, and the viewer can pause, rewind and skip.",
    explanation: "Live against stored." });
  b.manualShort({ d: 3, skill: "APPLICATION", marks: 3, hints: ["Think about the bit rate and the buffer."],
    stem: "A family in Bulawayo streams films but the picture often stops to buffer. Explain two reasons for this. [3]",
    points: ["The broadband speed is lower than the bit rate of the video, so data arrives more slowly than it is played", "Other users sharing the connection reduce the rate available", "The buffer empties, so the video pauses until it has refilled"],
    modelAnswer: "The connection supplies a lower bit rate than the video needs, perhaps because other users share it, so data arrives more slowly than it is played. The buffer empties and the video pauses.",
    explanation: "Rate lower than needed; buffer emptied." });
  b.manualShort({ d: 2, skill: "RECALL", marks: 2, hints: ["Name the hardware and its function."],
    stem: "Explain why a modem is needed to connect a computer to the PSTN. [2]",
    points: ["The computer produces digital data but the telephone line carries an analogue signal", "The modem modulates the data for the line and demodulates the received signal back to digital"],
    modelAnswer: "The computer's data is digital but the telephone line carries an analogue signal. The modem converts it for the line and converts the received signal back to digital.",
    explanation: "Digital to analogue and back." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Convert bytes to bits.", "Take 1 MB = 1 000 000 bytes."],
    explanation: "Convert the size to megabits; divide by the rate.",
    stem: "A clinic in Kariba downloads a patient-records update of 150 MB through a satellite connection that supplies 10 Mbit/s. Take 1 MB = 1 000 000 bytes.",
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", unit: "s", stem: "Calculate the time taken to download the update, in seconds.", value: 120, wrong: [15, 1500], workedSolution: "1. 150 MB = 150 × 8 = 1200 Mbit.\n2. Time = 1200 ÷ 10 = 120 s.", explanation: "1200 Mbit ÷ 10 Mbit/s = 120 s." }),
      P.num({ label: "(b)", marks: 1, type: "CALCULATION", unit: "min", stem: "Express this time in minutes.", value: 2, wrong: [120, 12], workedSolution: "120 ÷ 60 = 2 min.", explanation: "120 s = 2 min." }),
      P.num({ label: "(c)", marks: 1, type: "CALCULATION", unit: "s", stem: "The connection improves to 20 Mbit/s. Calculate the new download time in seconds.", value: 60, wrong: [240, 30], workedSolution: "1200 ÷ 20 = 60 s.", explanation: "Doubling the rate halves the time." }),
      P.manual({ label: "(d)", marks: 2, stem: "Give two reasons why the clinic might prefer a satellite connection to a cable connection.", points: ["There is no cable or mast nearby / the area is remote", "A satellite can reach a very wide area without laying cable"], modelAnswer: "The clinic is remote with no cable or mast nearby, and a satellite reaches a wide area without laying cable.", explanation: "Remote location." }),
    ] });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Total data = rate × time.", "Use 1 MB = 1 000 000 bytes."],
    explanation: "Data = rate × time. A 3 Mbit/s connection cannot stream 5 Mbit/s without stalling.",
    stem: "An online school in Harare offers recorded lessons (each is 40 minutes long, streamed at 3 Mbit/s) and live lessons. A student in Gweru has a connection that supplies 2 Mbit/s. Take 1 MB = 1 000 000 bytes.",
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", unit: "MB", stem: "Calculate the data in megabytes used by one recorded lesson.", value: 900, wrong: [120, 7200], workedSolution: "1. 40 min = 2400 s.\n2. Data = 3 × 2400 = 7200 Mbit.\n3. = 7200 ÷ 8 = 900 MB.", explanation: "7200 Mbit ÷ 8 = 900 MB." }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", unit: "s", stem: "At 2 Mbit/s, how many seconds would it take for the data of a lesson to arrive?", value: 3600, wrong: [2400, 1800], workedSolution: "1. Data = 7200 Mbit.\n2. Time = 7200 ÷ 2 = 3600 s.", explanation: "7200 Mbit ÷ 2 Mbit/s = 3600 s." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the student's video keeps stopping.", points: ["The connection supplies 2 Mbit/s but the video needs 3 Mbit/s", "Data arrives more slowly than it is played so the buffer empties"], modelAnswer: "The connection supplies less than the 3 Mbit/s the video needs, so data arrives more slowly than it is played and the buffer empties.", explanation: "Rate lower than playback rate." }),
      P.manual({ label: "(d)", marks: 2, stem: "State two ways in which the student could watch the lesson without it stopping.", points: ["Download the lesson first (or use on-demand and wait for it to buffer fully)", "Choose a lower bit rate / lower resolution version"], modelAnswer: "Download or buffer the whole lesson before playing it, or choose a lower resolution version with a lower bit rate.", explanation: "Wait for the data or reduce the rate." }),
    ] });
  b.card("DEFINITION", "Internet", "A worldwide network of networks: the hardware and protocols that join them.");
  b.card("DEFINITION", "World Wide Web", "A collection of web pages and resources, found using URLs and HTTP in a browser; a service on the internet.");
  b.card("DEFINITION", "Modem", "Converts digital data to and from a signal that can travel over a telephone line.");
  b.card("DEFINITION", "ISP", "A company that provides customers with a connection to the internet.");
  b.card("CONCEPT", "Real-time and on-demand streaming", "Real-time: live, sent as captured, no stored file. On-demand: a stored file sent when requested; can pause and skip.");
  b.card("DEFINITION", "Bit rate", "The number of bits sent or played each second; higher means better quality but needs a faster connection.");
  b.card("FORMULA", "Download time", "Time (s) = size in bits ÷ rate in bit/s; size in bits = bytes × 8.");
  b.card("CONCEPT", "Buffering", "Data is held in a buffer while streaming; if it arrives slower than it is played, the buffer empties and the video pauses.");
});
