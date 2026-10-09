---
{
  "key": "web.html-elements",
  "title": "Web pages: elements, navigation and HTML",
  "summary": "The elements of a web page (headings, text, images, links, navigation bars, forms) and how to navigate a site; the structure of an HTML document and the basic tags; customising pages and building them from templates.",
  "concepts": ["comp.web.html-elements"],
  "estimatedMinutes": 40,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

Tendai's school in Mutare wants a website. Parents should be able to find the term dates, see photographs of the sports day, read the head's welcome message and fill in a form to ask a question. Before anyone builds the site, the team needs to know what a web page is made of, how visitors move from page to page, and how a browser knows what to display. The answer to the last question is **HTML**.

ZIMSEC Form 1 Web Design (topic 6.10) asks you to navigate and customise web pages and to use web page templates to create pages and generate content. Paper 2 may show you a short piece of HTML and ask what it displays, ask you to complete missing tags, or ask you to name the elements of a page. Paper 3 (practical) expects you to build simple pages.

## Key definitions

:::definition{term="Web page"}
A document, written in HTML, that is displayed by a web browser and may contain text, images, links, video and forms.
:::

:::definition{term="Website"}
A collection of related web pages, linked together and stored on a web server under one domain name.
:::

:::definition{term="HTML (HyperText Markup Language)"}
The markup language used to describe the structure and content of a web page, using tags placed around the content.
:::

:::definition{term="Tag"}
A keyword in angle brackets that marks the start or end of an element, for example `<p>` (opening tag) and `</p>` (closing tag).
:::

:::definition{term="Hyperlink"}
Text or an image on a web page that, when clicked, takes the user to another page, another part of the same page, a file or an email address.
:::

:::definition{term="Template"}
A ready-made page design with a fixed layout, colours and fonts, into which the user places their own content.
:::

## Elements of a web page

| Element | Purpose |
|:--|:--|
| Header and logo | Identifies the site; usually at the top of every page |
| Navigation bar (menu) | A set of links to the main pages of the site, in the same place on every page |
| Headings | Titles and sub-titles that organise the content |
| Body text (paragraphs) | The main information |
| Images and video | Photographs, diagrams, logos, clips |
| Hyperlinks | Move to other pages or sites, download files, open an email |
| Forms | Let visitors enter data: text boxes, drop-down lists, radio buttons, check boxes, a submit button |
| Footer | Contact details, copyright notice, links to policies |

### Navigating a website

Visitors move around a site using the **navigation bar**, **hyperlinks** in the text, the browser's **back** and **forward** buttons, a **search box**, and sometimes a **breadcrumb trail** (for example *Home > Academics > Form 1*) that shows where they are. A good site has consistent navigation on every page, so visitors are never lost, and every page is no more than a few clicks from the home page.

## HTML page structure

An HTML document has a **head**, which holds information about the page such as its title, and a **body**, which holds everything the browser displays.

```
<!DOCTYPE html>
<html>
  <head>
    <title>Sunrise High School</title>
  </head>
  <body>
    <h1>Welcome to Sunrise High School</h1>
    <p>We are a day school in Mutare.</p>
  </body>
</html>
```

- `<!DOCTYPE html>` tells the browser the document is HTML5.
- `<html>` … `</html>` enclose the whole page.
- `<title>` sets the text shown on the browser tab.
- Most tags come in pairs; the closing tag has a slash. Tags should be **nested** correctly: the last one opened is the first one closed.

### Basic tags

| Tag | Meaning |
|:--|:--|
| `<h1>` to `<h6>` | Headings, from most important (`h1`) to least |
| `<p>` | A paragraph |
| `<br>` | A line break (no closing tag) |
| `<b>` or `<strong>`, `<i>` or `<em>` | Bold or strong text, italic or emphasised text |
| `<a href="contact.html">Contact us</a>` | A hyperlink; `href` is the address it goes to |
| `<img src="logo.png" alt="School logo">` | An image; `src` is the file, `alt` is the text shown if it cannot load (and read by screen readers) |
| `<ul>`, `<ol>`, `<li>` | Unordered (bulleted) list, ordered (numbered) list, list item |
| `<table>`, `<tr>`, `<td>` | Table, table row, table cell |
| `<form>`, `<input>`, `<button>` | A form, an input box, a button |

Words such as `href`, `src` and `alt` are **attributes**: extra information written inside the opening tag.

:::keyfact{title="ZIMSEC and Cambridge"}
Web page design is in the ZIMSEC syllabus only. Cambridge 0478 covers the web only as part of the internet (URLs, HTTP, browsers), not HTML.
:::

## Customising pages and using templates

**Customising** means changing a page to suit its purpose and audience: the text, colours, fonts, images, layout and links. Simple changes can be made in a web authoring package or by editing the HTML; colours and fonts are usually controlled by a style sheet (CSS), so one change updates every page.

A **template** gives a ready-made layout, with places marked for the logo, headings, text and images. The author replaces the sample content with their own.

**Advantages of templates:** quick to produce a professional-looking site; consistent layout on every page; no need to know much HTML. **Disadvantages:** the site may look like many others; less control over the design; templates may include features that are not needed and slow the page down.

:::example
**Reading HTML.** What does this code display?

```
<h2>Sports Day</h2>
<p>Sports day is on <b>Friday</b>.</p>
<ul>
  <li>Athletics</li>
  <li>Netball</li>
</ul>
<a href="results.html">See the results</a>
```

1. `<h2>` displays "Sports Day" as a second-level heading (large, bold).
2. The paragraph displays "Sports day is on Friday." with the word **Friday** in bold.
3. `<ul>` with two `<li>` items displays a bulleted list: Athletics, Netball.
4. The `<a>` tag displays "See the results" as a link; clicking it opens the page `results.html`.
:::

:::example
**Building a page from a template.** Chipo uses a template to make the "Contact us" page of her school's site.

1. She chooses a template with a header, navigation bar, two columns and a footer.
2. She replaces the sample logo with the school badge and gives it the alternative text "Sunrise High School badge".
3. In the navigation bar she edits the links to Home, About, Academics, Sport and Contact us, so the menu is the same on every page.
4. In the left column she adds the address and phone number; in the right column she adds a form with boxes for name, email and message and a Submit button.
5. She previews the page in a browser and clicks every link to check that it works.
:::

## Common mistakes

:::mistake{title="Forgetting closing tags or nesting them wrongly"}
`<b><i>Text</b></i>` is wrong; close in reverse order: `<b><i>Text</i></b>`.
:::

:::mistake{title="Confusing the title with the main heading"}
`<title>` appears on the browser tab; `<h1>` appears on the page itself.
:::

:::mistake{title="Leaving out alt text"}
Without `alt`, visitors using screen readers, or whose images fail to load, do not know what the image shows.
:::

## Exam tips

:::exam-tip
When asked to "**write the HTML**", include both opening and closing tags and put attribute values in quotation marks.
:::

:::exam-tip
When asked for "**elements of a web page**", name the element and say what it is for: "navigation bar: links to the main pages, so visitors can move around the site".
:::

## Summary

:::summary
- A web page is an HTML document displayed by a browser; a website is a set of linked pages on a web server.
- Page elements: header, navigation bar, headings, text, images, links, forms, footer.
- Visitors navigate with the navigation bar, links, back and forward buttons, search and breadcrumbs.
- An HTML document has a head (title) and a body (displayed content); tags usually come in nested pairs; attributes such as `href`, `src` and `alt` add information.
- Templates give a quick, consistent design that the author customises with their own content.
:::
