---
{
  "key": "web.security-testing",
  "title": "Web security, testing and publishing",
  "summary": "Security measures in web development (HTTPS, strong administrator passwords, updates, checking input, permissions), using browser developer tools, testing and debugging a website (links, layout, forms, browsers and devices), and uploading and publishing a site.",
  "concepts": ["comp.web.security-testing"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Sipho has built a website for his uncle's hardware shop in Bulawayo. It has a product catalogue, an enquiry form and an administrator login for updating prices. Before the shop's customers see it, three jobs remain. The site must be **secure**, so that nobody can deface it or steal customers' details. It must be **tested**, so that every link works and the pages look right on phones as well as computers. And it must be **published**, so that it is reachable at the shop's domain name from anywhere on the internet.

ZIMSEC Form 4 Web Design (topic 6.10) asks you to develop websites with web development tools, apply security measures and test and debug a web application. Paper 2 questions ask for security measures with reasons, what to test, and the steps for publishing; the practical paper expects you to do them.

## Key definitions

:::definition{term="HTTPS"}
HyperText Transfer Protocol Secure: the protocol that encrypts data travelling between a browser and a web server, using a digital certificate issued to the website (shown by a padlock in the address bar).
:::

:::definition{term="Input validation"}
Checking data entered into a web form (by the browser and again by the server) to make sure it is sensible and in the expected format before it is accepted.
:::

:::definition{term="Permissions"}
Settings that control which users (or programs) may read, change or delete particular files, folders or features of a website.
:::

:::definition{term="Browser developer tools"}
Tools built into a web browser that let a developer inspect and edit a page's HTML and CSS, see error messages, watch files being downloaded and preview the page at different screen sizes.
:::

:::definition{term="Web hosting"}
A service that stores a website's files on a web server permanently connected to the internet, so that visitors can request its pages.
:::

## Security measures in web development

| Measure | Why it is needed |
|:--|:--|
| Use HTTPS with a valid certificate | Encrypts form data, logins and payments so they cannot be read if intercepted; browsers warn visitors about sites without it |
| Strong, unique administrator passwords and two-factor authentication | Stops attackers guessing or reusing passwords to take control of the site |
| Keep the CMS, themes, plugins and server software updated | Updates fix known weaknesses that attackers search for |
| Validate and sanitise all input | Rejects nonsense data and stops attackers typing code into forms that the site might run (for example code that changes a database, or scripts that run in other visitors' browsers) |
| Set permissions carefully | Give each user only the access they need (an author cannot install plugins); protect configuration files from being read or changed |
| Limit login attempts and use CAPTCHA on forms | Slows down automated password guessing and spam |
| Make regular backups | The site can be restored if it is hacked or a file is lost |
| Use security plugins or a firewall | Scans for malware and blocks suspicious traffic |
| Do not show detailed error messages to visitors | Error details can reveal how the site is built |

## Browser developer tools

Modern browsers include developer tools (opened from the browser menu, or by right-clicking and choosing **Inspect**). They let you:

- **Inspect elements:** see the HTML and CSS of any part of the page and try changes live, to find why something looks wrong;
- **Read the console:** see error messages, such as a script that failed or a file that could not be found;
- **Watch the network:** see every file the page downloads, how big it is and how long it takes, to find slow images or missing files (a "404 not found" error);
- **Use responsive mode:** preview the page at phone and tablet sizes.

Changes made in developer tools are temporary: once the cause is found, the developer corrects the real files.

## Testing and debugging a website

| What to test | How |
|:--|:--|
| Links | Click every link and navigation item; check none is broken and each opens the right page |
| Content | Proof-read text; check images appear with alt text and are not stretched |
| Layout | View every page at different screen sizes and orientations |
| Browsers and devices | Test in several browsers and on phones, tablets and computers |
| Forms | Enter normal, abnormal (invalid) and boundary data; check that errors are reported clearly and valid data is accepted and sent |
| Speed | Check how long pages take to load, especially on a mobile connection; optimise large images |
| Security | Check HTTPS works, the admin login cannot be reached with weak passwords, and that users cannot see pages they are not permitted to see |
| Accessibility | Check text contrast, alt text and that the site can be used with the keyboard |

**Debugging** means finding and correcting the cause of each fault found in testing, for example a misspelt file name in a link, an unclosed tag that breaks the layout, or an image too wide for a phone screen. After each correction, the test is repeated.

## Uploading and publishing

1. **Register a domain name** (for example a `.co.zw` name for a Zimbabwean business) through a registrar.
2. **Choose web hosting** with enough storage and bandwidth, and HTTPS support; point the domain name at the host.
3. **Upload the files** to the web server using the host's control panel, a file-transfer program (secure FTP), or by installing a CMS on the host.
4. **Set up HTTPS** by installing a certificate for the domain.
5. **Test the live site** again: links, forms and pages on several devices.
6. **Maintain** it: update content and software, check backups, and monitor visitors and errors.

:::keyfact{title="ZIMSEC and Cambridge"}
Web development, security and publishing are in the ZIMSEC syllabus only. Cambridge 0478 covers HTTPS and digital certificates under the internet and cyber security, which reinforces the first row of the security table.
:::

:::example
**Test plan for an enquiry form.** The shop's form asks for a name, a phone number and a quantity from 1 to 100.

| Test | Data entered | Type | Expected result |
|:--|:--|:--|:--|
| 1 | Name "Farai Moyo", quantity 20 | Normal | Accepted; confirmation shown |
| 2 | Quantity "twenty" | Abnormal | Rejected: "Enter a number from 1 to 100" |
| 3 | Quantity 100 | Boundary (largest accepted) | Accepted |
| 4 | Quantity 101 | Boundary (smallest rejected) | Rejected |
| 5 | Name left blank | Abnormal (presence check) | Rejected: "Please enter your name" |

Sipho runs each test, records the actual result beside the expected one, and debugs any test that fails.
:::

:::example
**Debugging with developer tools.** On a phone, the shop's home page scrolls sideways and the logo is missing.

1. Sipho opens the developer tools and switches to responsive mode at phone width; the page is wider than the screen.
2. He inspects the elements and finds a banner image 1600 pixels wide with no rule to shrink it on small screens. He adds a CSS rule limiting images to the width of the screen.
3. In the console he sees "Failed to load resource: logo.PNG (404)". The real file is `logo.png`; the web server treats capital and small letters as different.
4. He corrects the file name in the HTML, re-uploads both files and retests on a real phone.
:::

## Common mistakes

:::mistake{title="Thinking HTTPS makes a whole website secure"}
HTTPS protects data **in transit**. The site still needs strong passwords, updates, input validation and permissions.
:::

:::mistake{title="Testing only on the developer's own computer"}
A page that looks perfect on one browser and screen may break on a phone or in another browser.
:::

:::mistake{title="Testing forms with valid data only"}
Use normal, abnormal and boundary data; attackers and careless users will not type what you expect.
:::

## Exam tips

:::exam-tip
For "**describe** security measures", pair each measure with its reason: "keep plugins updated, **because** updates fix weaknesses that hackers exploit".
:::

:::exam-tip
For publishing questions, give the steps in order: domain name → hosting → upload → HTTPS → test live → maintain.
:::

## Summary

:::summary
- Secure a site with HTTPS, strong admin passwords and two-factor authentication, updates, input validation, careful permissions, login limits, backups and security plugins.
- Browser developer tools inspect HTML and CSS, show console errors, track downloads and preview screen sizes.
- Test links, content, layout, browsers and devices, forms (normal, abnormal, boundary data), speed, security and accessibility; debug and retest.
- Publish by registering a domain, choosing hosting, uploading files, installing a certificate, testing live and maintaining the site.
:::
