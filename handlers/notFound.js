module.exports = (req, res) => {
  res.writeHead(404, { 'Content-Type': 'text/plain' })
  // res.write(`<h1>Not Found</h1>
  // <p>Path: <code>${req.url}</code></p>
  // `)
  res.end()
}
