const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.svg':'image/svg+xml' };
http.createServer((req,res)=>{
  const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const candidate = path.join(root, pathname.replace(/^\/+/,''));
  const safe = candidate.startsWith(root + path.sep) || candidate === path.join(root,'index.html');
  const file = safe && fs.existsSync(candidate) && fs.statSync(candidate).isFile() ? candidate : path.join(root,'index.html');
  fs.readFile(file,(err,data)=>{
    if(err){res.writeHead(500);res.end('Unable to load page');return;}
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
    res.end(data);
  });
}).listen(Number(process.env.PORT)||3000,'0.0.0.0',()=>console.log(`AI Advent Calendar running on ${Number(process.env.PORT)||3000}`));
