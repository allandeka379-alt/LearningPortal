---
{
  "key": "internet.cookies",
  "title": "Cookies: session and persistent",
  "summary": "What cookies are, the difference between session and persistent cookies, how websites use them (personal details, preferences, shopping baskets, login details), the privacy issues they raise and how users manage them in a browser.",
  "concepts": ["comp.internet.cookies"],
  "estimatedMinutes": 25,
  "level": "core"
}
---
## Introduction

Nyasha visits an online bookshop and adds two textbooks to her basket. She clicks through several other pages, and when she returns to the basket, the books are still there. The next week she opens the site again and it greets her by name and shows books for Form 4 Geography, the subject she searched for last time. The website "remembers" her, even though a web server normally treats every request as brand new. The memory comes from **cookies**.

Cookies make websites convenient, but they also allow users to be tracked. Both boards ask what cookies are and how they are used; Cambridge asks you to distinguish **session** and **persistent** cookies, and ZIMSEC treats cookies as part of web security.

## Key definitions

:::definition{term="Cookie"}
A small text file that a website's server sends to a user's browser, which stores it on the user's device and sends it back to the server on later requests, so that the website can recognise the user.
:::

:::definition{term="Session cookie"}
A cookie held only in the browser's temporary memory and deleted when the browser is closed. It remembers the user during one visit.
:::

:::definition{term="Persistent cookie"}
A cookie saved on the device's storage that remains after the browser is closed, until its expiry date or until the user deletes it. It remembers the user between visits.
:::

:::definition{term="Third-party cookie"}
A cookie set by a domain other than the website being visited, for example an advertising company whose adverts appear on the page; often used to track users across many sites.
:::

## How cookies work

1. The user's browser requests a page from a website.
2. The web server sends the page together with a cookie, which contains an identifier and some data (for example a basket number or a language choice).
3. The browser stores the cookie.
4. Every time the browser requests another page from the same website, it sends the cookie back with the request.
5. The server reads the cookie, recognises the user and personalises the page.

A cookie is **data, not a program**: it cannot run on the computer or carry a virus by itself.

## Session and persistent cookies

| | Session cookie | Persistent cookie |
|:--|:--|:--|
| Where it is kept | Temporary memory (RAM) of the browser | Saved on the device's storage (e.g. the hard drive or flash memory) |
| How long it lasts | Until the browser is closed | Until its expiry date, or until the user deletes it |
| Typical uses | Items in a shopping basket during a visit; keeping a user logged in while moving between pages | Remembering login details, language and display preferences, and browsing interests for targeted adverts |

## What cookies are used for

- **Saving personal details**, such as a name or delivery address, so forms are filled in automatically.
- **Tracking user preferences**, such as language, currency or a dark display mode.
- **Holding items in an online shopping basket** while the user browses.
- **Storing login details**, so the user does not have to sign in on every page or every visit.
- **Tracking browsing** to target adverts and to count visitors to a site.

:::example
**Session or persistent?** Tendai shops on a hardware supplier's website in Harare.

1. He adds cement and paint to his basket, then looks at other products. The basket contents are kept by a **session cookie** while he browses.
2. He ticks "Remember me" when he logs in. A **persistent cookie** stores a login token, so next week the site recognises him without a password.
3. He changes the site's language to Shona. The setting is stored in a **persistent cookie**, so it is still Shona on his next visit.
4. When he closes the browser without checking out, the session cookie is deleted. Some sites save the basket on their own server instead, so it survives.
:::

## Privacy issues and managing cookies

Cookies raise concerns because:

- persistent and third-party cookies can **track** a user's browsing across many sites to build a profile of interests;
- the data may be used for targeted advertising without the user understanding it;
- on a **shared computer**, such as one in a library or an internet café, a persistent login cookie could let the next user into someone's account.

Users can manage cookies in their browser settings: view and **delete** stored cookies, **block** third-party cookies, or use a private browsing window, which deletes its cookies when it is closed. Many websites now show a banner asking the user to accept or decline non-essential cookies. In Zimbabwe, the Cyber and Data Protection Act sets out rules for how organisations collect and process personal information, which can include information gathered through cookies.

:::example
**Using a shared computer safely.** Thandeka checks her email on a computer at a public library in Masvingo. She does not tick "Remember me", she logs out when she has finished, and she uses a private browsing window. Together these steps mean no persistent cookie keeps her logged in for the next user.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge 0478 asks what cookies are, the difference between session and persistent cookies, and their uses. ZIMSEC places cookies in web security as part of web design; be ready to explain privacy issues and how cookies are managed.
:::

## Common mistakes

:::mistake{title="Calling a cookie a program or a virus"}
A cookie is a small text file of data. It cannot run or infect a computer by itself.
:::

:::mistake{title="Mixing up where cookies are stored"}
Cookies are stored by the **browser on the user's device**, not on the web server. The server only reads them when they are sent back.
:::

:::mistake{title="Saying session cookies are kept after the browser closes"}
Session cookies are deleted when the browser closes; persistent cookies remain until they expire or are deleted.
:::

## Exam tips

:::exam-tip
When comparing session and persistent cookies, give a contrasting pair: "a session cookie is deleted when the browser is closed, **whereas** a persistent cookie stays on the device until it expires or is deleted".
:::

:::exam-tip
For uses of cookies, link each use to a benefit for the user, for example "holding items in a shopping basket, so they are not lost when moving between pages".
:::

## Summary

:::summary
- A cookie is a small text file sent by a web server and stored by the browser, then sent back so the site recognises the user.
- Session cookies live in temporary memory and are deleted when the browser closes.
- Persistent cookies are saved on storage and last until they expire or are deleted.
- Uses: personal details, preferences, shopping baskets, login details, tracking and targeted adverts.
- Cookies raise privacy concerns; users can delete or block them, use private browsing and log out on shared computers.
:::
