// Slice w3a: cloud storage and cloud services (comp.network.cloud). SaaS/PaaS/IaaS items are ZIMSEC only.
import { concept, P, ZIM, CAM } from "../lib.mjs";

const planGiB = 15;
const videoMiB = 64;
const videos = Math.floor((planGiB * 1024) / videoMiB);
const planGB = 2;
const docMB = 8;
const docs = Math.floor((planGB * 1024) / docMB);

concept("comp.network.cloud", { file: "network/cloud", keyPrefix: "network.cloud" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **cloud storage**?",
    options: [
      ["Storing data on remote servers reached over the internet", "Correct: the servers belong to a cloud provider."],
      ["Storing data on the computer's own internal hard disk drive", "That is local storage."],
      ["Storing data in RAM while a program runs", "RAM is primary storage."],
      ["Storing data on a USB flash drive", "A flash drive is local storage."],
    ],
    answer: "A",
    explanation: "Cloud storage keeps data on remote physical servers owned by a provider and reached over the internet.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Where is data in cloud storage physically kept?",
    options: [
      ["On physical servers in a provider's data centres", "Correct: the cloud is real hardware owned by someone else."],
      ["In the user's web browser", "The browser only displays the files."],
      ["In the air between the phone and the mast", "Data travels through the air but is not stored there."],
      ["Nowhere: cloud data needs no hardware", "Cloud data always needs physical storage hardware."],
    ],
    answer: "A",
    explanation: "Cloud storage needs physical servers and storage devices, usually in large data centres.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an **advantage** of cloud storage compared with local storage?",
    options: [
      ["Files can be reached from any device with an internet connection", "Correct: access from anywhere."],
      ["Files can always be opened without an internet connection", "That is an advantage of local storage."],
      ["The user keeps complete control of where the data is held", "With cloud storage, the provider decides where data is held."],
      ["There are never any ongoing fees", "Larger cloud plans usually need a subscription."],
    ],
    answer: "A",
    explanation: "Cloud files can be reached from anywhere, on any device, as long as there is an internet connection.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **disadvantage** of cloud storage?",
    options: [
      ["Files cannot be reached when the internet connection fails", "Correct: cloud access depends on the connection."],
      ["Files are lost for good if the user's laptop is stolen or damaged", "Cloud copies survive the loss of a device."],
      ["Files cannot be shared with other people", "Sharing is a strength of cloud storage."],
      ["Storage cannot be increased", "Bigger plans can be bought at any time."],
    ],
    answer: "A",
    explanation: "Without an internet connection, cloud files are out of reach.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Who holds the data in cloud storage?"],
    stem: "A clinic stores patient records in the cloud. Why might this raise privacy concerns?",
    options: [
      ["The data is held by a third party, possibly in another country", "Correct: the clinic must trust the provider's security."],
      ["Cloud servers cannot store text files", "Cloud servers store any kind of file."],
      ["Cloud files are automatically made public for anyone to search", "Cloud files are private unless shared."],
      ["Cloud storage deletes files after one day", "Files remain until deleted or the plan ends."],
    ],
    answer: "A",
    explanation: "Cloud data is held by the provider; it could be exposed if the provider is breached or an account password is stolen.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: ZIM,
    hints: ["Nothing is installed: the program runs in the browser."],
    stem: "A school uses an online spreadsheet that runs in a web browser, with nothing installed on the computers. Which type of cloud service is this?",
    options: [
      ["Software as a service (SaaS)", "Correct: the application is provided over the internet."],
      ["Infrastructure as a service (IaaS)", "IaaS provides virtual servers and storage."],
      ["Platform as a service (PaaS)", "PaaS gives developers a platform to build their own applications."],
      ["Local storage", "Local storage is the computer's own drives."],
    ],
    answer: "A",
    explanation: "Applications used through a browser over the internet are software as a service.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["The connection at the site is weak and expensive.", "Which storage works offline?"],
    stem: "A mining surveyor works at a remote site with a weak, costly internet connection and must open large map files many times a day. Which storage is most suitable for the files she is working on?",
    options: [
      ["Local storage on her laptop, with cloud backup when she is in town", "Correct: fast offline access, with an off-site copy later."],
      ["Cloud storage only, opening every file over the site connection", "Each large file would download slowly and cost data."],
      ["RAM only, so the files load faster", "RAM is volatile and would lose the files when the laptop is off."],
      ["Email the files to herself and open them from the inbox", "This still downloads each file over the weak connection."],
    ],
    answer: "A",
    explanation: "Where connectivity is poor, working files belong on local storage; the cloud can hold a backup when a good connection is available.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "If a phone that saves its photos to cloud storage is stolen, the photos can still be recovered on another device.",
    answer: true,
    explanation: "True. The photos are held on the provider's servers, not only on the phone.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Data in cloud storage cannot be hacked, because it is not stored on any physical device.",
    answer: false,
    explanation: "False. Cloud data is on physical servers, and accounts or providers can be hacked.",
  });
  b.match({
    d: 2, skill: "ANALYSIS",
    stem: "Classify each statement as describing cloud storage or local storage.",
    pairs: ["Works without an internet connection", "Files reachable from any device, anywhere", "The provider keeps backed-up copies", "The user must make their own backups"],
    right: ["Cloud storage", "Local storage"],
    rightIndex: [1, 0, 0, 1],
    explanation: "Local: offline access, own backups. Cloud: access anywhere, provider backups.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING", applies: ZIM,
    hints: ["Software, platform or infrastructure?"],
    stem: "Match each cloud service to an example of its use.",
    pairs: [
      ["Software as a service", "Writing a report in a word processor that runs in the browser"],
      ["Platform as a service", "A developer building a booking app on a provider's ready-made platform"],
      ["Infrastructure as a service", "A company renting virtual servers to run its website"],
      ["Cloud storage", "Saving and sharing a folder of school notes online"],
    ],
    explanation: "SaaS: applications. PaaS: development platform. IaaS: virtual servers. Cloud storage: online files.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", applies: CAM, calculator: false,
    hints: ["Convert GiB to MiB first: 1 GiB = 1024 MiB."],
    stem: `A cloud storage plan gives ${planGiB} GiB. Each video clip is ${videoMiB} MiB. Calculate how many whole clips fit in the plan.`,
    value: videos,
    wrong: [Math.floor((planGiB * 1000) / videoMiB)],
    explanation: `${planGiB} × 1024 = ${planGiB * 1024} MiB; ${planGiB * 1024} ÷ ${videoMiB} = ${videos} clips.`,
    workedSolution: `1. ${planGiB} GiB = ${planGiB} × 1024 = ${planGiB * 1024} MiB.\n2. ${planGiB * 1024} ÷ ${videoMiB} = ${videos}.\n3. ${videos} whole clips.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", applies: ZIM, calculator: false,
    hints: ["Use 1 GB = 1024 MB."],
    stem: `A learner has ${planGB} GB of free cloud storage (1 GB = 1024 MB). Each scanned document is ${docMB} MB. How many documents can be stored?`,
    value: docs,
    wrong: [Math.floor((planGB * 1000) / docMB)],
    explanation: `${planGB} × 1024 = ${planGB * 1024} MB; ${planGB * 1024} ÷ ${docMB} = ${docs} documents.`,
    workedSolution: `1. ${planGB} GB = ${planGB} × 1024 = ${planGB * 1024} MB.\n2. ${planGB * 1024} ÷ ${docMB} = ${docs} documents.`,
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences about cloud storage.",
    template: "Cloud data is stored on physical {{blank:a}} in data centres. Users reach it over the {{blank:b}}. Storing data on the user's own hard disk is called {{blank:c}} storage.",
    blanks: [
      { id: "a", accepted: ["servers"], choices: ["servers", "browsers", "routers", "satellites"] },
      { id: "b", accepted: ["internet"], choices: ["internet", "motherboard", "printer", "keyboard"] },
      { id: "c", accepted: ["local"], choices: ["local", "virtual", "cloud", "remote"] },
    ],
    explanation: "Cloud: remote physical servers reached over the internet. The user's own drives: local storage.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Think about the files when a device is lost, and about sharing."],
    stem: "Give **two** advantages for a Form 4 learner of saving her coursework in cloud storage rather than on a flash drive.",
    points: [
      "She can open the work from any device with internet access (school computer, phone, home)",
      "The work is not lost if the flash drive is lost or damaged / the provider backs it up / she can share it with her teacher",
    ],
    explanation: "Cloud storage gives access from anywhere and protects against losing a device.",
    modelAnswer: "She can carry on with the work on her phone at home or any school computer, and if she loses her flash drive the work is still safe on the provider's servers.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    hints: ["Give matching points for cloud and local storage, then decide."],
    stem: "A photography studio in Bulawayo stores thousands of large photo files. Compare cloud storage with local storage for the studio and recommend one.",
    points: [
      "Cloud: off-site copies survive fire, theft or drive failure at the studio (provider backups)",
      "Cloud: needs a fast connection; uploading/downloading large photos is slow and uses data / monthly fees",
      "Local: fast access to large files without the internet and no subscription, but the studio must make its own backups",
      "A justified recommendation (e.g. local for working files plus cloud for backup)",
    ],
    explanation: "A good answer weighs access speed and cost against off-site protection, and reaches a justified decision.",
    modelAnswer: "Cloud storage would keep copies safe off-site if the studio's drives were stolen or damaged, but uploading thousands of large photos is slow, uses a lot of data and needs a monthly fee. Local drives open large files instantly without the internet, but the studio would have to back them up itself. The best choice is local storage for current work with a cloud backup of finished shoots.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    hints: ["Physical servers are still needed.", "Every advantage depends on the connection."],
    stem: "Sipho, who runs a tutoring business in Harare, is deciding whether to keep his teaching materials in cloud storage.",
    parts: [
      P.tf({
        label: "(a)", stem: "Sipho's files would be stored on physical servers owned by the cloud provider.",
        answer: true, explanation: "True. Cloud storage uses the provider's physical servers.",
      }),
      P.mcq({
        label: "(b)", stem: "Sipho teaches in learners' homes. Which advantage of cloud storage matters most to him?",
        options: [
          ["He can open the materials from any device with internet", "Correct: he works in many places."],
          ["He never needs an internet connection to open his files", "Cloud storage needs a connection."],
          ["It removes the need for passwords", "Cloud accounts must be protected with passwords."],
          ["His files cannot be shared", "Sharing is possible, and useful."],
        ],
        answer: "A", explanation: "Access from anywhere.",
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Describe **two** disadvantages of cloud storage for Sipho.",
        points: [
          "If a learner's home has no internet (or he has no data), he cannot open the materials",
          "Security/privacy: his account could be hacked or the provider breached / ongoing subscription fees / depends on the provider",
        ],
        modelAnswer: "If he has no signal or data at a learner's home, he cannot reach his materials, and if someone steals his password they could read or delete all his files.",
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Suggest how Sipho can reduce the disadvantages you described.",
        points: [
          "Keep local copies (offline copies) of the materials he needs for each lesson",
          "Use a strong password and two-step verification on the cloud account",
        ],
        modelAnswer: "He can mark the week's materials for offline use so they are on his tablet, and protect the account with a strong password and two-step verification.",
      }),
    ],
    explanation: "(a) true (b) access from any device.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true,
    hints: ["Think about what happens to each copy in a fire.", "Weigh both sides before deciding."],
    stem: "A secondary school in Mutare keeps all its learners' records on one server in the school office. The head is considering moving them to cloud storage.",
    parts: [
      P.mcq({
        label: "(a)", stem: "A fire destroys the school office. Which statement is true if the records were in cloud storage?",
        options: [
          ["The records survive, because copies are on the provider's servers", "Correct: the data is held off-site."],
          ["The records are lost, because the cloud uses the school's server", "Cloud storage uses the provider's servers elsewhere."],
          ["The records survive only if the school printed them", "Printing is unrelated to cloud storage."],
          ["The records are lost, because cloud data is kept in RAM", "Cloud data is held on servers' secondary storage."],
        ],
        answer: "A", explanation: "Off-site copies on the provider's servers survive a fire at the school.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Discuss whether the school should move its learners' records to cloud storage.",
        points: [
          "For: off-site copies and provider backups protect the records from fire, theft or server failure",
          "For: staff can reach records from anywhere / no server to buy and maintain / storage grows as needed",
          "Against: records cannot be reached when the internet or power fails / ongoing fees",
          "Against: learners' personal data is held by a third party, so security and privacy (and data protection law) must be checked; a justified conclusion",
        ],
        modelAnswer: "Cloud storage would protect the records from a fire or a server failure, because the provider keeps backed-up copies elsewhere, and staff could check records from home without the school buying a new server. However, during internet or power cuts no one could open the records, the subscription is a cost every month, and learners' personal data would be held by another company, which must keep it secure as the data protection law requires. The school should move to the cloud only with a provider it trusts, strong account security and a local copy for days without internet.",
      }),
    ],
    explanation: "(a) The records survive, because copies are held off-site.",
  });

  b.card("DEFINITION", "What is **cloud storage**?", "Storing data on remote physical servers owned by a provider and reached over the internet.");
  b.card("DEFINITION", "What is **local storage**?", "Storing data on a device the user owns and controls, such as the computer's own drive or a flash drive.");
  b.card("FACT", "Is cloud data stored on physical hardware?", "Yes: on physical servers and storage devices in data centres.");
  b.card("CONCEPT", "Advantages of cloud storage over local storage?", "Access from anywhere on any device, easy sharing, provider backups, storage easily increased, no hardware to maintain.");
  b.card("CONCEPT", "Disadvantages of cloud storage?", "Needs an internet connection and data; security and privacy concerns; dependence on the provider; ongoing fees.");
  b.card("CONCEPT", "Advantages of local storage?", "Works offline, fast access, user keeps full control, no subscription; but the user must back up and files stay on the device.");
  b.card("DEFINITION", "What is **cloud computing**?", "Using computing services (storage, software, processing) over the internet from remote servers.");
  b.card("FACT", "SaaS, PaaS and IaaS?", "Software as a service: apps in the browser. Platform as a service: platform for developers. Infrastructure as a service: rented virtual servers.", undefined, { applies: ZIM });
});
