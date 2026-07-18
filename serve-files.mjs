import http from 'http'
import fs from 'fs'
import path from 'path'

const PORT = 3000
const ROOT = '/workspace'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jsx': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.zip': 'application/zip',
}

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0])
  const reqPath = url === '/' ? '/index.html' : url

  // 下载页
  if (reqPath === '/index.html' && !fs.existsSync(path.join(ROOT, 'index_dl.html'))) {
    const files = []
    function walk(dir, base = '') {
      const entries = fs.readdirSync(dir, { withFileTypes: true })
      for (const e of entries) {
        if (e.name === 'node_modules' || e.name === '.git' || e.name === 'dist') continue
        const rel = base ? `${base}/${e.name}` : e.name
        if (e.isDirectory()) walk(path.join(dir, e.name), rel)
        else files.push(rel)
      }
    }
    walk(ROOT)

    const list = files.map(f => {
      const size = fs.statSync(path.join(ROOT, f)).size
      return `<li><a href="/${f}">${f}</a> <span style="color:#888">(${(size/1024).toFixed(1)} KB)</span></li>`
    }).join('')

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(`<!doctype html><html><head><meta charset="utf-8"><title>Paw & Co. 文件下载</title>
    <style>body{font-family:-apple-system,sans-serif;max-width:900px;margin:40px auto;padding:0 20px;background:#faf7f2;color:#6b5849}
    h1{font-family:Georgia,serif}a{color:#5c7152;text-decoration:none}a:hover{text-decoration:underline}
    li{padding:6px 0;border-bottom:1px solid #eee;list-style:none}
    .zip{background:#5c7152;color:#fff;padding:15px 25px;border-radius:8px;display:inline-block;margin:20px 0;text-decoration:none;font-weight:bold}
    .zip:hover{background:#6b5849}</style></head>
    <body><h1>🐾 Paw & Co. 项目文件</h1>
    <p>共 ${files.length} 个文件，可直接下载到本地。</p>
    <a class="zip" href="/paw-co-shop.zip">⬇ 下载完整项目压缩包 (1.9 MB)</a>
    <h2>或单独下载文件：</h2><ul>${list}</ul></body></html>`)
    return
  }

  // 提供文件
  const filePath = path.join(ROOT, reqPath)
  if (!filePath.startsWith(ROOT) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.writeHead(404)
    res.end('Not found')
    return
  }

  const ext = path.extname(filePath).toLowerCase()
  res.writeHead(200, {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Content-Disposition': `attachment; filename="${path.basename(filePath)}"`,
  })
  fs.createReadStream(filePath).pipe(res)
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`文件下载服务已启动: http://localhost:${PORT}/`)
  console.log('在浏览器打开上面的地址，即可下载所有项目文件')
})
