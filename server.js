// Minimal test server: no dependencies. Shows that Render can host it and that your phone can open it.
const http = require('http');

const port = process.env.PORT || 3000;
const startedAt = Date.now();
let visits = 0;

function tehranNow() {
  return new Intl.DateTimeFormat('fa-IR', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Asia/Tehran',
  }).format(new Date());
}

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
    return;
  }
  visits += 1;
  const uptime = Math.round((Date.now() - startedAt) / 1000);
  const html = `<!doctype html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تست Render</title>
<style>
  body { font-family: Tahoma, sans-serif; background: #f8fbfe; color: #1b2c38; margin: 0; padding: 24px; line-height: 2; }
  .box { max-width: 480px; margin: 0 auto; background: #fff; border: 1px solid #d3e4f2; border-radius: 16px; padding: 20px; }
  h1 { margin: 0 0 8px; font-size: 22px; }
  .ok { display: inline-block; background: #98e27f; color: #17361a; border-radius: 999px; padding: 0 12px; font-size: 14px; }
  p { margin: 4px 0; }
</style>
</head>
<body>
  <div class="box">
    <h1>سلام! <span class="ok">سرور کار می‌کند</span></h1>
    <p>زمان تهران: <b>${tehranNow()}</b></p>
    <p>مدت روشن بودن سرور: <b>${uptime}</b> ثانیه</p>
    <p>تعداد بازدید از زمان آخرین روشن شدن: <b>${visits}</b></p>
    <p style="color:#557689;font-size:13px">اگر بعد از چند دقیقه بی‌کاری، مدت روشن بودن دوباره کم شد، یعنی سرور خوابیده و دوباره بیدار شده است.</p>
  </div>
</body>
</html>`;
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

server.listen(port, '0.0.0.0', () => console.log(`listening on ${port}`));
