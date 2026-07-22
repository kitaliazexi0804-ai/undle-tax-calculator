const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const dist = path.join(root, "dist");
const serverDir = path.join(dist, "server");
const files = ["index.html", "styles.css", "script.js"];

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
fs.mkdirSync(serverDir, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(root, file), path.join(dist, file));
}

fs.mkdirSync(path.join(dist, ".openai"), { recursive: true });
fs.copyFileSync(path.join(root, ".openai", "hosting.json"), path.join(dist, ".openai", "hosting.json"));

const assets = Object.fromEntries(
  files.map((file) => [
    `/${file}`,
    {
      body: fs.readFileSync(path.join(root, file), "utf8"),
      type:
        file.endsWith(".html")
          ? "text/html; charset=utf-8"
          : file.endsWith(".css")
            ? "text/css; charset=utf-8"
            : "text/javascript; charset=utf-8",
    },
  ]),
);

const worker = `const assets = ${JSON.stringify(assets)};\n\nexport default {\n  async fetch(request) {\n    const url = new URL(request.url);\n    const asset = assets[url.pathname] || assets[\"/index.html\"];\n    return new Response(asset.body, {\n      headers: {\n        \"content-type\": asset.type,\n        \"cache-control\": \"no-store\"\n      }\n    });\n  }\n};\n`;

fs.writeFileSync(path.join(serverDir, "index.js"), worker);
