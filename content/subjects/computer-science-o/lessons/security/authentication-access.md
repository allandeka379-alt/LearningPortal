---
{
  "key": "security.authentication-access",
  "title": "Authentication and access control",
  "summary": "Usernames and strong passwords, biometrics and two-step verification; access levels, user accounts and file permissions; privacy settings; and choosing suitable controls for a scenario.",
  "concepts": ["comp.security.authentication-access"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

At a clinic in Gweru, the receptionist books appointments, the nurses record blood pressure readings, and the doctor writes diagnoses and prescriptions. They all use the same patient system, but they should not all see or change the same things. The receptionist does not need to read diagnoses; a visitor who sits at an unattended computer should see nothing at all. Two kinds of control make this work: **authentication** (proving who you are) and **access control** (deciding what you may do once you are in).

Cambridge 0478 (topic 5.3) names access levels, authentication (username and password, biometrics, two-step verification) and privacy settings as solutions that keep data safe. ZIMSEC Form 2 asks you to apply data protection measures such as passwords and file permissions. Exam questions usually give a scenario and ask you to choose and justify suitable controls.

## Key definitions

:::definition{term="Authentication"}
Checking that a user is who they claim to be before they are given access to a system, for example by a password, a biometric or a code.
:::

:::definition{term="Biometrics"}
Authentication using a unique physical or behavioural characteristic of a person, such as a fingerprint, face, iris or voice.
:::

:::definition{term="Two-step verification"}
Authentication that needs two separate steps: for example a password and then a one-time code sent to, or generated on, a device the user owns.
:::

:::definition{term="Access levels"}
Different amounts of access given to different users, controlling which data each user can see and what they can do with it (for example read only, or read and edit).
:::

## Authentication

### Usernames and passwords

The **username** identifies the user; the **password** proves it is really them. A password only protects an account if it is hard to guess. A **strong password**:

- is long (at least 8 characters; longer is better);
- mixes upper-case and lower-case letters, digits and symbols;
- is not a dictionary word, a name, a birthday or anything else linked to the user;
- is not used for any other account, and is changed if it may have been seen.

Systems also **lock** an account after a few wrong attempts, which defeats brute-force guessing, and they show the password as dots so that it cannot be read over the user's shoulder.

:::worked-solution[Judging password strength]
Which of these passwords should Farai choose for his school account?

1. `farai2009`: weak. It contains his name and probably his birth year, both easy to guess or find on social media.
2. `password1`: weak. It is one of the first passwords a brute-force attack tries.
3. `Mangoes!`: better, but it is a single dictionary word with one symbol and only 8 characters.
4. `Blue7tractor#Rain`: strong. It is long and mixes upper case, lower case, a digit and symbols, yet Farai can remember it as three words.
5. Farai should choose the fourth and use it only for this account.
:::

### Biometrics

Biometric systems compare a scan with a stored template: fingerprint scanners on phones and attendance systems, facial recognition, iris (eye) scanners, voice recognition.

- Advantages: the characteristic cannot be forgotten or easily shared; it is hard to copy; it is quick to use.
- Disadvantages: the equipment costs more; a cut finger, dirt, poor lighting or a cold can cause a genuine user to be rejected; biometric data is personal data that must be protected, and unlike a password it cannot be changed if it is stolen.

### Two-step verification

After the password, the system asks for a second proof, usually a **one-time code** sent to the user's registered email or phone, or shown in an authenticator app. The code changes every time. A criminal who has stolen the password still cannot log in without the user's device. Mobile money and online banking commonly use this approach.

## Access control

### User accounts and access levels

Each person has their own **user account**, so the system knows who is logged in and can record what they do. The administrator gives each account an **access level** suited to the person's job:

| User | Patient details | Diagnoses | Prescriptions |
|:--|:--|:--|:--|
| Receptionist | Read and edit | No access | No access |
| Nurse | Read only | Read only | Read only |
| Doctor | Read only | Read and edit | Read and edit |

This follows the principle of giving each person the **least access** they need to do their job.

### File permissions

On a network or shared computer, each file or folder has **permissions** for each user or group:

- **Read**: open and view the file;
- **Write** (modify): change or delete the file;
- **Execute**: run the file, if it is a program.

A teacher's folder of examination papers might allow the teacher read and write, other teachers read only, and learners no access at all.

### Privacy settings

Social media, browsers and apps have **privacy settings** that control who can see a user's posts, photos, location and contact details. Setting a profile so only friends can see it, turning off location sharing and limiting who can contact you all reduce the personal data that strangers and criminals can collect.

:::example
**Choosing controls for a scenario.** A secondary school in Bulawayo is putting learners' marks online.

1. Each teacher and learner gets their own **user account**, so every change is recorded against a name.
2. Login uses a **strong password**, and teachers also use **two-step verification**, because a teacher's account can change marks and is a bigger target.
3. **Access levels**: learners can only read their own marks; subject teachers can read and edit marks for their own classes; the head can read all marks.
4. The exported marks spreadsheet on the staff server has **file permissions** of read and write for the deputy head and read only for other staff.
5. The school reminds learners to set their social media **privacy settings** so that photos of their school uniform and timetable are not public.
:::

## Common mistakes

:::mistake{title="Mixing up authentication and access levels"}
Authentication answers "are you who you say you are?". Access levels answer "now that you are in, what are you allowed to do?".
:::

:::mistake{title="Calling two-step verification 'two passwords'"}
The second step uses something different from the password, usually a one-time code on a device you own. Two passwords are both things you know and can both be stolen in the same way.
:::

:::mistake{title="Saying biometrics are perfect"}
Biometrics can wrongly reject genuine users, need extra hardware, and cannot be changed if the stored data is stolen.
:::

## Exam tips

:::exam-tip
When a question asks you to "explain how" a control keeps data safe, say what it stops: "two-step verification means that even if the password is stolen, the criminal cannot log in without the code sent to the user's phone".
:::

:::exam-tip
In scenario questions, match the control to the user: higher access for those who need it, lower for everyone else, and give the reason.
:::

## Summary

:::summary
- Authentication checks identity: username and strong password, biometrics, two-step verification.
- Strong passwords are long, mixed and unrelated to the user; accounts lock after repeated failures.
- Biometrics cannot be forgotten but need extra hardware and can reject genuine users; two-step verification adds a one-time code on the user's device.
- Access control limits what each user can do: user accounts, access levels and read, write and execute file permissions.
- Privacy settings limit who can see a user's personal information online.
:::
