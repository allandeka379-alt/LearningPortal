// Slice w2b: cloud computing (acs.network.cloud-computing, both boards).
import { concept, P, chk } from "../lib.mjs";
import { mc, pm } from "../tables/w2b-q.mjs";

const mbit = 1500 * 8; // 1.5 GB as megabits (1 GB = 1000 MB)
chk(mbit / 5, 2400);
chk(mbit / 20, 600);

concept("acs.network.cloud-computing", { file: "network/cloud-computing", keyPrefix: "network.cloud-computing" }, (b) => {
  mc(b, 1, "RECALL", "Which description fits cloud computing?",
    ["Services such as storage and software delivered over the internet on demand", "Correct."],
    [["Computers that are connected by cables in one room of a building", "That describes a LAN."], ["Software that is installed from a disc and then used offline without a network", "Cloud services are accessed over the internet."], ["A type of memory inside the processor", "That describes a cache or registers."]],
    "The cloud means on-demand services from a provider's servers over the internet.");
  mc(b, 2, "UNDERSTANDING", "A company uses a web browser to edit shared documents in an online office suite that it does not install or manage. Which service model is this?",
    ["Software as a Service", "Correct: a finished application used over the internet."],
    [["Platform as a Service", "PaaS is for building and running your own applications."], ["Infrastructure as a Service", "IaaS provides virtual servers, which the customer must configure."], ["A private cloud", "A private cloud is a type of cloud, not a service model."]],
    "SaaS: the user only uses the application.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Who uses Platform as a Service (PaaS)?",
    ["A team that writes and runs its own application on the provider's platform", "Correct."],
    [["A teacher who writes a letter in a web-based word processor", "That is SaaS."], ["A customer who rents a virtual server and then installs the operating system on it", "That is IaaS."], ["A user who stores holiday photos in an online album", "That is a SaaS storage service."]],
    "PaaS gives developers tools, a database and a runtime without managing servers.", { daily: true });
  mc(b, 3, "UNDERSTANDING", "Which feature describes a public cloud?",
    ["The provider owns the hardware and shares it between many customers", "Correct."],
    [["It is used by one organisation only", "That describes a private cloud."], ["It is made of a private cloud and a public cloud that are used together", "That describes a hybrid cloud."], ["It runs without any internet connection", "A public cloud is reached over the internet."]],
    "A public cloud is shared and pay-per-use.", { hints: ["Who owns the hardware and who shares it?"] });
  mc(b, 3, "APPLICATION", "A bank keeps customer records in its own data centre but uses a shared cloud service for its public website, which gets many more visitors at month end. What type of cloud arrangement is this?",
    ["Hybrid", "Correct: a private cloud and a public cloud are used together."],
    [["Private only", "The website runs in the shared cloud, so it is not private only."], ["Public only", "The records are kept in the bank's own data centre."], ["Infrastructure only", "Infrastructure is a service model, not a type of cloud."]],
    "Using a private and a public cloud together is a hybrid cloud.", { hints: ["How many types of cloud are being used?"] });
  mc(b, 3, "ANALYSIS", "Which is a drawback of cloud computing for a school in an area with frequent power cuts and an unreliable signal?",
    ["Staff cannot reach their files when the connection is down", "Correct: the cloud depends on connectivity."],
    [["The school has to buy and maintain its own servers", "That is a feature of local servers, not the cloud."], ["The software cannot be updated", "The provider updates software."], ["Files can be reached only from the computers inside the school building", "Cloud files can be reached from any device with a connection."]],
    "Cloud services need a working connection.", { hints: ["What does the cloud need that the school may not have?"] });
  mc(b, 4, "EVALUATION", "A rural clinic with a slow connection keeps patient records on a local server. A manager proposes moving them all to a public cloud. Which statement is the best judgement?",
    ["Cloud backup is useful, but the clinic should not depend on it for daily work", "Correct: it balances recovery against connectivity."],
    [["The cloud is always better because it has no drawbacks", "The cloud has drawbacks, including dependence on a connection."], ["The cloud cannot be used for backups", "Cloud storage is a common off-site backup."], ["Moving the records to the cloud removes the need for passwords, backups and encryption", "Records in the cloud need strong passwords and encryption."]],
    "A slow connection makes daily dependence on the cloud risky, but off-site backup is valuable.", { hints: ["What could the cloud be used for that is not time critical?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In a private cloud the hardware is shared with the public.", answer: false, explanation: "False. A private cloud is used by one organisation only." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Storing a copy of files in the cloud protects them if the building is damaged by fire.", answer: true, explanation: "True. The copy is held off-site." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its description.",
    pairs: [["SaaS", "A finished application used over the internet"], ["PaaS", "A platform on which customers build and run their own applications"], ["IaaS", "Virtual servers and storage that the customer configures"], ["Private cloud", "A cloud used by a single organisation"], ["Hybrid cloud", "A combination of private and public clouds"]],
    explanation: "Three service models and the types of cloud." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences about the benefits of the cloud.",
    template: "A school can add storage when it needs more, which is called {{blank:a}}. Files can be reached from any device, which gives {{blank:b}}. A copy of files stored in the cloud is held {{blank:c}}, away from the school.",
    blanks: [
      { id: "a", accepted: ["scalability"], choices: ["scalability", "attenuation", "encryption", "latency"] },
      { id: "b", accepted: ["access"], choices: ["access", "isolation", "compression", "hardware"] },
      { id: "c", accepted: ["off-site"], choices: ["off-site", "on-site", "in memory", "offline"] },
    ], explanation: "Scalability, access, off-site." });
  b.num({ d: 3, skill: "APPLICATION", unit: "s", hints: ["1.5 GB = 1500 MB; multiply by 8 for megabits.", "Time = megabits ÷ rate."],
    stem: "A shop uploads a 1.5 GB backup to cloud storage at 5 Mbit/s. Take 1 GB = 1000 MB and 1 MB = 1 000 000 bytes. How many seconds does the upload take?",
    value: 2400, wrong: [300, 19200], workedSolution: "1. 1.5 GB = 1500 MB = 1500 × 8 = 12 000 Mbit.\n2. Time = 12 000 ÷ 5 = 2400 s.", explanation: "12 000 Mbit ÷ 5 Mbit/s = 2400 s." });
  b.num({ d: 3, skill: "APPLICATION", unit: "min", hints: ["Restore time = megabits ÷ download rate."],
    stem: "The same 1.5 GB backup is restored at a download rate of 20 Mbit/s. Take 1 GB = 1000 MB and 1 MB = 1 000 000 bytes. How many minutes does the restore take?",
    value: 10, wrong: [600, 40], workedSolution: "1. 12 000 Mbit ÷ 20 = 600 s.\n2. 600 ÷ 60 = 10 min.", explanation: "600 s = 10 min." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Define it, then add on demand and provider."],
    stem: "Describe what is meant by cloud computing. [3]",
    points: ["Computing services such as storage, processing or software are provided over the internet", "The services are available on demand and paid for as used", "They run on servers owned and managed by a provider, not by the user"],
    modelAnswer: "Cloud computing provides services such as storage, processing power and software over the internet. They are available on demand and paid for according to use, and they run on servers that belong to a provider, not to the user.",
    explanation: "Over the internet, on demand, provider's servers." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Two benefits and two drawbacks."],
    stem: "A private college in Gweru plans to store student records in a public cloud. Discuss the benefits and drawbacks. [4]",
    points: ["Benefit: the college need not buy and maintain servers, so costs are lower", "Benefit: storage can be increased when needed and records can be accessed from anywhere", "Drawback: the records are held on a provider's servers, so security and privacy are a concern", "Drawback: nothing can be accessed when the internet connection or the provider fails"],
    modelAnswer: "The college does not need to buy and maintain servers, and storage can be increased when needed and reached from anywhere. However, the records are held on the provider's servers, so security and privacy are a concern, and they cannot be reached when the connection or the provider fails.",
    explanation: "Two benefits and two drawbacks linked to the scenario." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Describe each model by what the customer does."],
    stem: "Distinguish between SaaS and PaaS. [3]",
    points: ["In SaaS the provider supplies a finished application that the user simply uses", "In PaaS the provider supplies a platform of tools and servers", "The customer in PaaS develops and runs their own application on it"],
    modelAnswer: "In SaaS the provider supplies a finished application and the user simply uses it. In PaaS the provider supplies a platform of tools and servers, and the customer develops and runs their own application on it.",
    explanation: "Finished application against platform for building." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Think of the risk, how the cloud helps and one limit."],
    stem: "A school in Masvingo keeps all its records on one computer. Explain how storing copies in the cloud would help the school to recover from a disaster, and state one precaution it should take. [4]",
    points: ["A disaster such as fire, flooding or theft could destroy the only computer and its records", "A copy stored in the cloud is held off-site and so is not destroyed", "After the disaster, the records can be restored to a new computer from anywhere with a connection", "Precaution: protect the stored copy with a strong password and encryption / make the copies regularly"],
    modelAnswer: "Fire, flooding or theft could destroy the only computer and its records. A copy in the cloud is held off-site, so it survives, and the records can be restored to a new computer from anywhere with a connection. The school should protect the stored copy with a strong password and encryption and update it regularly.",
    explanation: "Off-site copy, restore, precaution." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Match the customer's job to the service model."],
    explanation: "Web email is SaaS, a hosted development platform is PaaS, a rented virtual server is IaaS.",
    stem: "A technical college in Bulawayo is moving some of its services to the cloud.",
    parts: [
      pm("(a)", "Staff will use web-based email that the provider installs and maintains. Which service model is this?", ["Software as a Service", "Correct."], [["Platform as a Service", "Staff are not building an application."], ["Infrastructure as a Service", "Staff are not configuring a server."], ["Hybrid cloud", "This is a type of cloud, not a service model."]], "SaaS."),
      pm("(b)", "The computing department will rent virtual servers and install its own operating system. Which service model is this?", ["Infrastructure as a Service", "Correct."], [["Software as a Service", "SaaS supplies the application."], ["Platform as a Service", "PaaS supplies the operating system and tools."], ["Public cloud", "This is a type of cloud."]], "IaaS."),
      P.manual({ label: "(c)", marks: 2, stem: "The college keeps student marks in its own data centre and uses a shared cloud for the college website. Name this type of cloud arrangement and explain why it is used.", points: ["Hybrid cloud", "Confidential marks are kept under the college's own control, and the website uses the cheap, scalable public cloud"], modelAnswer: "Hybrid cloud. The confidential marks stay under the college's control, while the website uses the cheaper and more scalable public cloud.", explanation: "Hybrid." }),
      P.manual({ label: "(d)", marks: 2, stem: "State two drawbacks to the college of depending on the cloud.", points: ["The services cannot be used when the internet connection or power fails", "The college depends on the provider's security and reliability"], modelAnswer: "The services cannot be used when the connection or power fails, and the college depends on the provider's security and reliability.", explanation: "Connectivity and the provider." }),
    ] });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Convert gigabytes to megabits before dividing."],
    explanation: "Upload: 12 000 Mbit at 8 Mbit/s is 1500 s; download at 24 Mbit/s is 500 s.",
    stem: "A bakery chain in Harare backs up 1.5 GB of sales records to the cloud each night, using an upload speed of 8 Mbit/s. If the main computer fails, the records must be restored at a download speed of 24 Mbit/s. Take 1 GB = 1000 MB and 1 MB = 1 000 000 bytes.",
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", unit: "s", stem: "Calculate the time to upload the backup, in seconds.", value: 1500, wrong: [187.5, 12000], workedSolution: "1. 1.5 GB = 1500 MB = 12 000 Mbit.\n2. 12 000 ÷ 8 = 1500 s.", explanation: "12 000 Mbit ÷ 8 Mbit/s = 1500 s." }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", unit: "s", stem: "Calculate the time to restore the backup, in seconds.", value: 500, wrong: [1500, 250], workedSolution: "1. 12 000 ÷ 24 = 500 s.", explanation: "12 000 Mbit ÷ 24 Mbit/s = 500 s." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain one reason why the chain should not rely only on the cloud to run its tills.", points: ["The tills would stop working if the internet connection fails", "Connections can be slow or interrupted, for example by power cuts"], modelAnswer: "The tills would stop working if the connection failed or was slow, for example during a power cut.", explanation: "Dependence on connectivity." }),
    ] });
  b.card("DEFINITION", "Cloud computing", "Storage, processing and software delivered over the internet on demand from a provider's servers.");
  b.card("DEFINITION", "SaaS", "Software as a Service: a finished application used over the internet, such as web email.");
  b.card("DEFINITION", "PaaS", "Platform as a Service: tools and servers on which customers build and run their own applications.");
  b.card("DEFINITION", "IaaS", "Infrastructure as a Service: virtual servers, storage and networks that the customer configures.");
  b.card("CONCEPT", "Public, private and hybrid cloud", "Public: shared by many customers. Private: used by one organisation. Hybrid: a combination of both.");
  b.card("CONCEPT", "Benefits of the cloud", "Scalability, no hardware to buy, access from anywhere, automatic backup and updates.");
  b.card("CONCEPT", "Drawbacks of the cloud", "Security and privacy of data held by a provider; dependence on a connection and on the provider; less control.");
  b.card("CONCEPT", "Cloud backup", "A copy held off-site survives loss of the building; protect it with a strong password and encryption; copying time depends on connection speed.");
});
