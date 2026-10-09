---
{
  "key": "web.cms-content",
  "title": "Content management systems, templates, plugins and web graphics",
  "summary": "Building a website with a content management system: themes and templates, plugins and extensions, web feeds and adverts; creating and optimising images, animations and video for the web.",
  "concepts": ["comp.web.cms-content"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

The netball club at a school in Gweru wants a website that the captain can update every week with match results, photos and news, without learning HTML. A teacher installs a **content management system** (CMS) on the school's web hosting, picks a theme in the club colours, adds a plugin for a photo gallery and another for a contact form, and shows the captain how to add a new post. Within an afternoon the site is live, and the captain updates it from her phone after every match.

ZIMSEC Form 2 Web Design (topic 6.10) asks you to use CMS templates to create and customise websites, to generate content with a graphics package, and to use plugins and extensions. Paper 2 questions ask what a CMS is, why it is used, what themes and plugins do, and how images should be prepared for the web.

## Key definitions

:::definition{term="Content management system (CMS)"}
Software, usually running on a web server, that lets users create, edit, organise and publish website content through a browser-based dashboard, without writing HTML; widely used open-source examples include WordPress, Joomla and Drupal.
:::

:::definition{term="Theme (template)"}
A package of design files that controls the layout, colours, fonts and style of every page of a CMS site, separately from the content.
:::

:::definition{term="Plugin (extension)"}
An add-on program that is installed into a CMS to add a feature, such as a contact form, photo gallery, online shop, search engine optimisation or security scanning.
:::

:::definition{term="Web feed (RSS)"}
A file, updated automatically by the site, listing its newest content, so that subscribers' feed readers and other websites can show new posts as they appear.
:::

:::definition{term="Optimising an image"}
Preparing an image for the web by choosing a suitable format, resizing and cropping it to the size it will be shown, and compressing it, so that the page loads quickly without a visible loss of quality.
:::

## How a CMS works

A CMS keeps the **content** (text, images, settings) in a database and the **design** in the theme. When a visitor requests a page, the CMS takes the content from the database, places it into the theme's layout and sends the finished HTML to the browser. Because content and design are separate:

- the site's look can be changed by switching theme, without retyping any content;
- authors who know nothing about HTML can add posts and pages using a word-processor-like editor;
- several users can work on the site, each with a **role** (administrator, editor, author) that limits what they may change.

**Typical CMS features:** pages (fixed content such as "About us") and posts (dated news items); a media library for images and video; menus built by dragging pages into order; user accounts and roles; comment moderation; revisions so that an earlier version can be restored.

**Advantages:** quick to set up; no programming needed to add content; many free themes and plugins; consistent design; several people can update the site. **Disadvantages:** popular CMSs are frequent targets for hackers, so the CMS, themes and plugins must be kept updated; too many plugins slow the site; less control over the code than a hand-built site; needs a web server with a database.

## Themes and templates

Choosing a theme decides the overall layout: header, menu position, number of columns, footer. Most themes can be **customised** through the dashboard: upload a logo, choose colours and fonts, set the home page, add widgets (small blocks such as a calendar or "latest posts") to side bars and footers. A **responsive** theme rearranges the layout to suit phone, tablet and computer screens.

## Plugins and extensions

| Plugin type | What it adds |
|:--|:--|
| Contact form | A form whose answers are emailed to the site owner |
| Gallery or slider | Photo albums and slideshows |
| E-commerce | Product pages, a shopping basket and payment |
| Search engine optimisation | Help with page titles, descriptions and keywords so that search engines rank the site well |
| Security | Login limits, scanning for malware, firewalls |
| Backup | Scheduled copies of the database and files |
| Social sharing and feeds | Buttons to share posts; RSS feeds; embedding social media posts |
| Advertising | Places for adverts and code from advertising networks |

Only install plugins from trusted sources, keep them updated, and remove ones that are not used.

## Web feeds and adverts

A web feed lets regular readers be told about new posts automatically. Adverts can earn money for a site: the owner places advert spaces (banners, side-bar boxes) and an advertising network fills them, paying per view or per click. Too many adverts annoy visitors and slow pages down.

## Graphics, animation and video for the web

Content is created with a **graphics package**: logos, banners, buttons and edited photographs.

| Format | Best for |
|:--|:--|
| JPEG | Photographs (lossy compression, small files, millions of colours) |
| PNG | Logos, screenshots, graphics with sharp edges or transparent backgrounds (lossless) |
| GIF | Simple animations and graphics with few colours |
| SVG | Vector logos and icons that stay sharp at any size |
| MP4 video | Video clips, compressed; often hosted on a video-sharing site and embedded |

To **optimise** an image: crop away what is not needed; resize it to the largest size it will be displayed; save it in a suitable format; compress it; give it a meaningful file name and alt text.

:::worked-solution
**Why resizing matters.** A photo from a phone is 1024 × 768 pixels, stored with 24-bit colour (3 bytes per pixel). On the club's web page it will only be shown 512 × 384 pixels wide. Here 1 KB = 1024 bytes.

| Image | Width × height (pixels) | Pixels | Bytes (3 per pixel) | Size |
|:--|:-:|--:|--:|--:|
| Original photo | 1024 × 768 | 786,432 | 2,359,296 | 2304 KB (2.25 MB) |
| Resized for the web | 512 × 384 | 196,608 | 589,824 | 576 KB |

1. Original: 1024 × 768 = 786,432 pixels; × 3 bytes = 2,359,296 bytes; ÷ 1024 = 2304 KB.
2. Resized: 512 × 384 = 196,608 pixels; × 3 bytes = 589,824 bytes; ÷ 1024 = 576 KB.
3. Halving both the width and the height divides the number of pixels by 4, so the uncompressed size falls to a quarter. Saving it as a JPEG then compresses it further.
4. A page with 20 such photos loads far faster on a mobile connection, and uses less of the visitor's data.
:::

:::example
**Setting up a CMS site for a small business.** Farai runs a bicycle repair shop in Harare.

1. He installs a CMS on his web hosting account and chooses a responsive theme, so the site works well on phones.
2. He customises the theme: uploads the shop logo, sets the colours to match his sign, and builds a menu of Home, Services, Prices and Contact.
3. He installs three plugins: a contact form, a gallery for photos of repaired bikes, and a security plugin; he turns on automatic updates.
4. He creates an editor account for his assistant, who adds a news post each week; the RSS feed lets regular customers see new posts.
5. Before uploading photos he crops, resizes and compresses them, so pages load quickly.
:::

## Common mistakes

:::mistake{title="Confusing themes and plugins"}
A **theme** changes how the site **looks**; a **plugin** adds what the site can **do**.
:::

:::mistake{title="Uploading photos straight from a camera"}
Large, unoptimised photos make pages slow and use visitors' mobile data. Resize and compress them first.
:::

## Exam tips

:::exam-tip
For "**explain** why a CMS is used", mention that content can be added without HTML, design and content are separate, several users can edit with different roles, and themes and plugins save development time.
:::

:::exam-tip
For "**describe** how to optimise an image", list the steps: crop, resize to display size, choose the right format, compress, add alt text.
:::

## Summary

:::summary
- A CMS stores content in a database and combines it with a theme to produce pages; users edit through a dashboard without HTML.
- Themes control the look; plugins and extensions add features (forms, galleries, shops, security, SEO, backups, feeds, adverts).
- Keep the CMS, themes and plugins updated and install only what is needed.
- Use JPEG for photos, PNG for logos and transparency, GIF for simple animation, SVG for scalable icons; crop, resize and compress images for the web.
:::
