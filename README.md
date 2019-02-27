# Readify

Website that renders markdown files with a simple layout, aimed at readability. 

## How to get content

Markdown files can come from 2 sources:

- Public GitHub Gist
- Dropbox public link

Copy the [Gist ID](https://gist.github.com/) or [Dropbox link ID](https://www.dropbox.com/help/files-folders/view-only-access) and append to the Readify URL: `https://readify.now.sh/<service>/<id>` where `<service>` is either `g` for Gist, or `db` for Dropbox:

```
https://gist.github.com/phortuin/123
 ↳ https://readify.now.sh/g/123
https://www.dropbox.com/s/456/readify-works.txt?dl=0
 ↳ https://readify.now.sh/db/456
```

Make sure the Dropbox file is a text file (extension doesn’t matter, as long as it’s `text/plain`).

## Features:

- Renders Markdown
- Extracts title from the first `H1` it finds (matches `# My Title` in Markdown)
- Uses [Prism](https://prismjs.com/) for code syntax highlighting
- Comes in two themes: ‘normal’ blog posts & prose (see below)
- _(Gist only)_ Uses description as entered in Gist as meta description

Markdown is rendered as Github Flavored Markdown ([GFM](https://github.github.com/gfm/)), and transforms newline characters into `<br>`s, negating the need for double spaces at the end of a line. Headings have slugs, so you can link to them with an `#anchor`.

## Themes

Choice of two themes, that behave similarly but are adapted to better suit the type of content for each service:

### Gist: blog
Content from GitHub Gists are rendered as ‘standard’ blog posts, using [IBM Plex Sans](https://www.fontsquirrel.com/fonts/ibm-plex). Paragraphs are separated by a blank line.

### Dropbox: prose
Content from Dropbox is rendered as prose, using [Literata Book](https://www.fontsquirrel.com/fonts/literata-book)<sup>[1](#fn1)</sup>, and indents paragraphs and dialogue as is custom in e-readers. 

## FAQ
Q: It’s kind of slow?!  
A: There’s no caching at all, getting content directly from either GitHub or Dropbox, and the app runs on a free [Zeit Now](https://zeit.co/now) plan. Sorry about that.

## To do

- [ ] Have hanging quotes at the start of a line

---
1. <a name="fn1"></a> Why not IBM Plex Serif? Because Literata was built for this type of reading (other fonts, too; Literata is free) and has a warmth to it; IBM Plex Serif to me is a tad too harsh. 
