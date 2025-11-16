# 📘 Class 02: HTML Elements and Structure

**📅 Date:** Sunday, 16 November 2025  
**⏰ Time:** 12:00 PM – 2:00 PM  
**📍 Instructor:** Fatima Arshad  

Today, we'll explore essential HTML elements that form the building blocks of web pages. We'll learn about text formatting, lists, links, images, and get an introduction to the CSS Box Model.

## 🎯 Learning Objectives

By the end of this class, you will be able to:
- Use paragraph and heading tags effectively
- Create ordered and unordered lists
- Implement hyperlinks with relative and absolute URLs
- Add images to web pages
- Understand the CSS Box Model (margin, border, padding)

## 📋 Prerequisites

- Completed Class 01 setup
- VS Code installed with Live Server extension
- Basic understanding of HTML document structure

## 🏗️ HTML Elements Covered

### 1. Paragraph Tag (`<p>`)

The paragraph tag is used to define blocks of text content.

```html
<p>This is a paragraph of text. It can contain multiple sentences and will be displayed as a block element.</p>
```

### 2. Heading Tags (`<h1>` to `<h6>`)

Headings create a hierarchy of content importance. `<h1>` is the most important, `<h6>` is the least.

```html
<h1>Main Title (usually one per page)</h1>
<h2>Section Heading</h2>
<h3>Subsection Heading</h3>
<h4>Sub-subsection Heading</h4>
<h5>Minor Heading</h5>
<h6>Smallest Heading</h6>
```

### 3. Lists

#### Ordered Lists (`<ol>`)

Used for numbered sequences:

```html
<ol>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
</ol>
```

#### Unordered Lists (`<ul>`)

Used for bullet points:

```html
<ul>
    <li>Bullet point one</li>
    <li>Bullet point two</li>
    <li>Bullet point three</li>
</ul>
```

### 4. Anchor Tag (`<a>`) - Hyperlinks

Links connect pages and resources.

#### Relative URLs (within your project):

```html
<a href="./about.html">About Page</a>
<a href="../index.html">Home Page</a>
```

#### Absolute URLs (external websites):

```html
<a href="https://www.google.com">Google</a>
<a href="https://github.com/yourusername/repo">GitHub Repository</a>
```

### 5. Image Tag (`<img>`)

Displays images on your webpage:

```html
<img src="path/to/image.jpg" alt="Description of image" width="300" height="200">
```

- `src`: Path to the image file
- `alt`: Alternative text for accessibility and when image fails to load
- `width` and `height`: Optional dimensions

## 🎨 Introduction to CSS Box Model

Every HTML element is treated as a rectangular box. The box model consists of:

- **Content**: The actual content (text, image, etc.)
- **Padding**: Space between content and border
- **Border**: Line around the padding
- **Margin**: Space outside the border

```css
/* Example CSS for box model */
.box {
    margin: 10px;      /* Space outside border */
    border: 2px solid black;  /* Border around padding */
    padding: 15px;     /* Space inside border */
}
```

## 📁 Project Structure

Update your `class01` folder or create a new `class02` folder with the following structure:

```
class02/
├── index.html
├── about.html
├── contact.html
└── images/
    └── (your images here)
```

## 🛠️ Hands-On Exercise

1. Open your `index.html` from Class 01
2. Add the following elements:
   - A main heading (`<h1>`)
   - Several subheadings (`<h2>`, `<h3>`)
   - Multiple paragraphs
   - An ordered list of your favorite foods
   - An unordered list of hobbies
   - Links to `about.html` and `contact.html`
   - At least one image (you can use an external URL)

3. Create `about.html` and `contact.html` with basic content
4. Experiment with different heading levels and list types

## ✅ Class Checklist

- [ ] Added headings to your webpage
- [ ] Created ordered and unordered lists
- [ ] Implemented internal links (relative URLs)
- [ ] Added external links (absolute URLs)
- [ ] Inserted at least one image
- [ ] Created additional HTML pages
- [ ] Tested all links and images

## 📚 Resources

- [HTML Elements Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
- [CSS Box Model](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model)
- [Free Images (Unsplash)](https://unsplash.com/)

## 🎓 Homework/Practice

1. Create a personal portfolio page with:
   - Your name as the main heading
   - A brief bio in paragraphs
   - A list of your skills
   - Links to your social media profiles
   - A profile picture

2. Research and implement 3 additional HTML elements not covered today
3. Experiment with different image sizes and formats

## ❓ Common Issues & Solutions

- **Broken links**: Double-check file paths and ensure files exist
- **Images not loading**: Verify image URLs and file paths
- **Formatting issues**: Remember that HTML ignores whitespace; use CSS for styling

## 🔍 Key Takeaways

- HTML provides the structure and content of web pages
- Different tags serve different purposes (headings for hierarchy, lists for organization, links for navigation)
- The box model affects how elements are spaced and positioned
- Relative URLs are for internal links, absolute URLs for external resources

---

**Next Class Preview:** We'll explore CSS for styling and layout!

Keep practicing and see you next time! 🚀