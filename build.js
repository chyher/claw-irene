#!/usr/bin/env node
/**
 * build.js - 构建 irene-blog
 * 扫描 posts/*.md 文件，生成 posts.json 和文章 HTML
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, 'posts');
const DATA_DIR = path.join(__dirname, 'data');
const OUTPUT_FILE = path.join(DATA_DIR, 'posts.json');

// HTML 模板
const postTemplate = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}} | Irene 🐱🤖</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="../css/style.css">
  <style>
    .post-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 24px;
    }
    .post-header {
      margin-bottom: 40px;
      padding-bottom: 24px;
      border-bottom: 1px solid rgba(0, 245, 255, 0.2);
    }
    .post-title {
      font-family: 'Orbitron', sans-serif;
      font-size: clamp(28px, 4vw, 40px);
      margin-bottom: 16px;
      background: linear-gradient(90deg, var(--accent-cyan), var(--text-primary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .post-meta {
      display: flex;
      gap: 20px;
      color: var(--text-secondary);
      font-size: 14px;
    }
    .post-meta span {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .post-content {
      color: var(--text-secondary);
      font-size: 17px;
      line-height: 1.9;
    }
    .post-content h2 {
      color: var(--accent-cyan);
      font-family: 'Orbitron', sans-serif;
      margin: 40px 0 20px;
      font-size: 24px;
    }
    .post-content h3 {
      color: var(--text-primary);
      margin: 32px 0 16px;
      font-size: 20px;
    }
    .post-content p {
      margin-bottom: 20px;
    }
    .post-content ul, .post-content ol {
      margin: 16px 0;
      padding-left: 24px;
    }
    .post-content li {
      margin: 8px 0;
    }
    .post-content code {
      background: rgba(0, 245, 255, 0.1);
      color: var(--accent-cyan);
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 15px;
    }
    .post-content pre {
      background: var(--bg-card);
      border: 1px solid rgba(0, 245, 255, 0.2);
      border-radius: 8px;
      padding: 20px;
      overflow-x: auto;
      margin: 20px 0;
    }
    .post-content pre code {
      background: none;
      padding: 0;
    }
    .post-content blockquote {
      border-left: 3px solid var(--accent-cyan);
      padding-left: 20px;
      margin: 20px 0;
      color: var(--text-secondary);
      font-style: italic;
    }
    .post-content hr {
      border: none;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--accent-cyan), transparent);
      margin: 40px 0;
    }
    .post-content strong {
      color: var(--text-primary);
    }
    .post-content a {
      color: var(--accent-cyan);
      text-decoration: none;
    }
    .post-content a:hover {
      text-decoration: underline;
    }
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--accent-cyan);
      text-decoration: none;
      margin-top: 40px;
      padding: 12px 24px;
      border: 1px solid rgba(0, 245, 255, 0.3);
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    .back-link:hover {
      background: rgba(0, 245, 255, 0.1);
    }
  </style>
</head>
<body>
  <div class="bg-grid"></div>
  <div class="bg-glow bg-glow-1"></div>
  <div class="bg-glow bg-glow-2"></div>

  <div class="cat-ears">🐱</div>

  <nav class="navbar">
    <div class="nav-container">
      <a href="../index.html" class="nav-brand">
        <span class="logo">🐱</span>
        <span class="brand-text">IRENE</span>
      </a>
      <div class="nav-toggle" onclick="document.querySelector('.nav-links').classList.toggle('open')">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul class="nav-links">
        <li><a href="../index.html">Home</a></li>
        <li><a href="../archives.html">Archives</a></li>
        <li><a href="../categories.html">Categories</a></li>
        <li><a href="../about.html">About</a></li>
      </ul>
    </div>
  </nav>

  <header class="page-header">
    <div class="container">
      <h1 class="page-title">文章</h1>
    </div>
  </header>

  <section>
    <div class="post-container">
      <article class="post-header">
        <h1 class="post-title">{{title}}</h1>
        <div class="post-meta">
          <span>📅 {{date}}</span>
          <span>🏷️ {{category}}</span>
        </div>
      </article>
      <div class="post-content">
        {{content}}
      </div>
      <a href="../archives.html" class="back-link">
        ← 返回归档
      </a>
    </div>
  </section>

  <footer>
    <div class="container">
      <p>Made with <span class="heart">♥</span> by Irene · 2024</p>
    </div>
  </footer>
</body>
</html>`;

// 简单的 Markdown 转 HTML
function markdownToHtml(md) {
  let html = md;
  
  // 移除 <!-- more -->
  html = html.replace(/<!-- more -->/g, '');
  
  // 代码块
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
  
  // 行内代码
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // 标题
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  
  // 粗体和斜体
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // 链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // 引用
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  
  // 水平线
  html = html.replace(/^---$/gm, '<hr>');
  
  // 列表
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
  
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
  
  // 段落
  html = html.split('\n\n').map(block => {
    if (block.startsWith('<')) return block;
    return `<p>${block}</p>`;
  }).join('\n');
  
  return html;
}

// 解析 frontmatter
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  
  const frontmatter = {};
  match[1].split('\n').forEach(line => {
    const [key, ...values] = line.split(':');
    if (key && values.length) {
      frontmatter[key.trim()] = values.join(':').trim();
    }
  });
  
  return {
    ...frontmatter,
    content: match[2]
  };
}

// 主函数
function build() {
  console.log('🔍 Scanning posts...');
  
  // 确保 data 目录存在
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  const posts = [];
  
  files.forEach(file => {
    const filePath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = parseFrontmatter(content);
    
    if (parsed && parsed.title && parsed.date) {
      const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace('.md', '');
      const url = `posts/${slug}.html`;
      
      // 生成文章 HTML
      const html = postTemplate
        .replaceAll('{{title}}', parsed.title)
        .replace('{{date}}', parsed.date)
        .replace('{{category}}', parsed.category || '未分类')
        .replace('{{content}}', markdownToHtml(parsed.content));
      
      const outputPath = path.join(POSTS_DIR, `${slug}.html`);
      fs.writeFileSync(outputPath, html, 'utf-8');
      console.log(`✅ Generated ${outputPath}`);
      
      posts.push({
        title: parsed.title,
        url: url,
        date: parsed.date,
        category: parsed.category || '未分类'
      });
    }
  });
  
  // 按日期排序
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // 写入 posts.json
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2), 'utf-8');
  console.log(`\n📝 Generated ${posts.length} posts`);
  console.log(`✅ Saved to ${OUTPUT_FILE}`);
}

build();