const unified = require('unified')
const stream = require('unified-stream')
const markdown = require('remark-parse')
const slug = require('remark-slug')
const breaks = require('remark-breaks')
const remark2rehype = require('remark-rehype')
const raw = require('rehype-raw')
const prism = require('@mapbox/rehype-prism')
const doc = require('rehype-document')
const format = require('rehype-format')
const html = require('rehype-stringify')
const got = require('got')
const express = require('express')
const intoStream = require('into-stream')
// const gistToMarkdown = require('gist-to-markdown')

function getMarkdownTitle(markdown) {
  try {
    return markdown.match(/^#[^#][\s]*(.+)/m).pop()
  } catch(error) {
    return 'Untitled'
  }
}

function getMarkdownDescription(markdown) {
  return markdown.length > 0 && markdown.replace(/#/g, '').substring(0, 160)
}

function processMarkdown(title, description) {
  return unified()
    .use(markdown)
    .use(slug)
    .use(breaks)
    .use(remark2rehype, {
      allowDangerousHTML: true
    })
    .use(raw)
    .use(prism)
    .use(doc, {
      language: 'nl',
      title,
      meta: [
        { name: 'description', content: description }
      ],
      css: '/index.css',
      js: '/index.js'
    })
    .use(format)
    .use(html)
}

const app = express()
app.set('etag', false)
app.use((req, res, next) => { res.removeHeader('X-Powered-By'); next(); })

// app.get('/g/:id', async (req, res, next) => {
//   let { title, body, description } = await gistToMarkdown(req.params.id, { meta: true })
//   intoStream(body)
//     .pipe(stream(processMarkdown(title, description)))
//     .pipe(res)
// })
//

function getDropboxText(id) {
  return got(id, {
      baseUrl: 'https://www.dropbox.com/s/',
      query: { raw: 1 }
    })
    .then(response => {
      if (response.headers['content-type'] === 'text/plain') {
        return response.body
      } else {
        err = new Error
        err.statusCode = 406
        err.message = 'Not Acceptable'
        throw err
      }
    })
}

app.get('/db/:id', async (req, res, next) => {
  let body = await getDropboxText(req.params.id)
    .catch(next)
  let title = getMarkdownTitle(body)
  let description = getMarkdownDescription(body)
  try {
    intoStream(body)
      .pipe(stream(processMarkdown(title, description)))
      .pipe(res)
  } catch(error) {
    return next(error)
  }
})

app.use(express.static('static', { etag: false }))
app.use((err, req, res, next) => {
  if (app.get('env') === 'development') {
    console.error(err)
  }
  res.status(err.statusCode || 500).send(err.message || 'Internal Server Error')
})
app.use((req, res, next) => res.status(404).send('404'))

let port = process.env.PORT || 3014
app.listen(port, () => {
  if (app.get('env') === 'development') {
    console.log('Development server available on http://localhost:' + port)
  }
})
