const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const out = path.join(root, 'dist');
const base = '/AI-FUNDAMENTALS';
const lessonSlugs = [
  'rag', 'inference', 'embeddings', 'context-window', 'tokens',
  'semantic-search', 'mcp', 'models', 'tool-calling',
];

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
fs.copyFileSync(path.join(root, 'app.js'), path.join(out, 'app.js'));
fs.copyFileSync(path.join(root, 'styles.css'), path.join(out, 'styles.css'));

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8')
  .replace('href="/styles.css"', `href="${base}/styles.css"`)
  .replace('src="/app.js"', `src="${base}/app.js"`);
fs.writeFileSync(path.join(out, 'index.html'), html);

// GitHub Pages is static, so publish an index file at every app deep link.
for (const slug of lessonSlugs) {
  const dir = path.join(out, 'lesson', slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}
for (const route of ['about', 'info']) {
  const dir = path.join(out, route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}
fs.writeFileSync(path.join(out, '404.html'), html);
console.log(`Built GitHub Pages site at ${out} (${lessonSlugs.length} lessons)`);
