---
{
  "key": "network.cloud-computing",
  "title": "Cloud computing: service models and types",
  "summary": "Cloud computing as on-demand storage and processing delivered over the internet, the SaaS, PaaS and IaaS service models, public, private and hybrid clouds, the benefits and drawbacks of the cloud, and cloud storage as an off-site backup.",
  "concepts": ["acs.network.cloud-computing"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A teacher in Bulawayo writes a document on a school computer, and finishes it on a phone on the bus. A small business in Harare keeps its customer records on a server that it does not own, in a data centre it has never seen. Both are using **cloud computing**: storage and processing that are provided over the internet by someone else, available when needed and paid for by use.

This lesson defines cloud computing, describes the service models SaaS, PaaS and IaaS, and the three types of cloud (public, private, hybrid). It weighs the benefits and drawbacks and looks at using the cloud as an off-site backup. You should already know what a server is and how data travels over the internet.

## Key definitions

:::definition{term="Cloud computing"}
The delivery of computing services such as storage, processing power and software over the internet, on demand, from servers owned and run by a provider, so that the user does not need to own or maintain the hardware.
:::

:::definition{term="Software as a Service (SaaS)"}
A service model in which a provider supplies complete application software over the internet, usually through a web browser, and the user does not install or maintain it.
:::

:::definition{term="Platform as a Service (PaaS)"}
A service model in which a provider supplies a platform (operating system, tools, database and runtime) on which customers build, test and run their own applications.
:::

:::definition{term="Infrastructure as a Service (IaaS)"}
A service model in which a provider supplies virtual servers, storage and network resources that the customer configures and manages, installing their own operating system and software.
:::

## Service models

The three models differ in how much the customer manages and how much the provider manages.

| Model | The provider supplies | The customer is responsible for | Example |
|---|---|---|---|
| **SaaS** | The whole application, the platform and the hardware | Only using it and their own data | An online office suite or web email |
| **PaaS** | The hardware and a platform with development tools | Writing and managing their own application | A hosted platform on which a team builds and runs a student records application |
| **IaaS** | Virtual servers, storage and networking | Operating system, software and applications | Renting a virtual server to run a school's own system |

Moving from IaaS to SaaS, the provider does more and the customer controls less, so SaaS is easiest to use and IaaS is the most flexible.

## Types of cloud

- **Public cloud.** The provider owns the hardware and shares it between many customers, who are charged for what they use. It is cheap and scalable, but the customer has less control of where and how data is stored.
- **Private cloud.** The cloud is used by one organisation only, on its own premises or in a data centre set aside for it. The organisation controls it and can meet strict security needs, but it pays for and manages the hardware.
- **Hybrid cloud.** A combination of both, for example keeping confidential records in a private cloud and using the public cloud for a website and for extra capacity at busy times.

:::worked-solution{title="Choosing a service model and type"}
A university in Mutare wants (a) staff to share documents, (b) its developers to build and run a student-records system without managing servers, and (c) to run its own library software that needs a particular operating system.

1. (a) Staff only need to use an application: **SaaS**.
2. (b) The developers write their own application but want the provider to manage the servers and tools: **PaaS**.
3. (c) A particular operating system must be installed, so the university needs control of the virtual machine: **IaaS**.
4. The student records are sensitive. The university could keep them in a **private cloud** and use the **public cloud** for the document sharing, which makes the whole arrangement a **hybrid cloud**.
:::

## Benefits and drawbacks

| Benefits | Drawbacks |
|---|---|
| **Scalability**: resources can be increased for busy periods, such as the results week, and reduced afterwards | **Security and privacy**: the data is held on a provider's servers, in a place the customer may not know, and a breach can affect many customers |
| **Cost**: no need to buy and maintain hardware; payment is for what is used | **Dependence on connectivity**: nothing can be used without a connection, and slow, expensive data or power cuts reduce access |
| **Access**: data and software can be reached from any device and place | **Dependence on the provider**: if the provider has a fault, changes its prices or closes, the customer is affected |
| **Backup and updates**: the provider backs up data and updates software | **Less control**: the customer cannot configure everything, and moving to another provider can be difficult |

In Zimbabwe, where electricity and bandwidth are not always reliable, the dependence on a connection is an important practical limit for schools and businesses.

## Cloud storage as a recovery measure

Keeping a copy of important files in cloud storage, for example with services such as Google Drive or OneDrive, protects against fire, theft, flooding or hardware failure at the site, because the copy is held **off-site**. Files can be restored to a new computer from anywhere with a connection.

The limits are the time taken to copy and to restore, which depends on the connection speed, the cost of the data, and the need to protect the stored copy with a strong password and encryption.

:::worked-solution{title="How long does a nightly backup take?"}
A clinic in Kariba uploads 2.4 GB of patient records each night through a connection with an upload speed of 4 Mbit/s. Take 1 GB = 1000 MB and 1 MB = 1 000 000 bytes.

1. 2.4 GB = 2400 MB.
2. In megabits: 2400 × 8 = 19 200 Mbit.
3. Time = 19 200 ÷ 4 = 4800 s.
4. 4800 ÷ 60 = 80 minutes.
5. The backup takes 80 minutes, which fits into a night. A restore of the same amount over a download speed of 16 Mbit/s would take 19 200 ÷ 16 = 1200 s, or 20 minutes.
:::

:::example{title="A school with unreliable power"}
A secondary school stores exam marks only on the headmaster's PC. A power surge damages the disk. If the school had also copied the marks to cloud storage each week, only the marks since the last copy would be lost. The school also needs to record that the copy is encrypted and protected with a strong password, because the marks are confidential.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine cloud computing. Cambridge names SaaS and PaaS and compares public, private and hybrid clouds. ZIMSEC includes cloud storage, and examples from Zimbabwean schools and businesses (for example storing school records off-site). IaaS is included here as the third layer, so that SaaS and PaaS can be placed on the scale.
:::

## Common mistakes

:::mistake{title="Saying that the data is stored in the air"}
The data is on physical servers in a data centre. The cloud is a way of describing services delivered over the internet.
:::

:::mistake{title="Confusing SaaS and PaaS"}
In SaaS the customer uses a finished application. In PaaS the customer builds and runs their own application on the provider's platform.
:::

:::mistake{title="Listing benefits without a drawback"}
Compare questions need both sides. For every benefit named, think of the matching limit (cost against dependence on a connection, access against security).
:::

:::mistake{title="Believing that a private cloud is always more secure"}
A private cloud gives control, but it is only as secure as the organisation's own staff and procedures make it.
:::

## Exam tips

:::exam-tip
"**State what is meant by cloud computing**": on-demand services (storage, processing, software) delivered over the internet from a provider's servers. Use the words "on demand" and "provider".
:::

:::exam-tip
For "**justify**" questions choose the type or model, then match features of the scenario to benefits (scalable, no hardware to buy, access from anywhere), and admit one limit (needs a connection, data held by a third party).
:::

:::exam-tip
ZIMSEC questions often ask about cloud storage as part of disaster recovery. Write: a copy is kept off-site, so it survives the loss of the building, and can be restored from anywhere.
:::

## Summary

:::summary
- Cloud computing delivers storage, processing and software over the internet on demand from a provider's servers.
- SaaS supplies a finished application, PaaS a platform to build and run applications, IaaS virtual servers and storage.
- A public cloud is shared, a private cloud serves one organisation, and a hybrid cloud combines both.
- Benefits: scalability, lower hardware cost, access from anywhere, automatic backup. Drawbacks: security and privacy, dependence on connectivity and on the provider.
- Cloud storage is an off-site backup that survives the loss of the building; the copy must be protected, and copying takes time that depends on the connection speed.
:::
