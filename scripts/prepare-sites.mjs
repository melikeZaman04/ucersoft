import { copyFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const SKIP = new Set(["server", ".openai", "dev", "cache", "types", "trace"]);

async function collectAssets(directory, root = directory, result = {}) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    // Yalnızca statik export çıktısı paketlenir. Build iç dosyaları (manifestler,
    // önizleme anahtarları, geliştirme logları, turbopack cache) yayına çıkmaz.
    if (SKIP.has(entry.name)) continue;

    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await collectAssets(absolutePath, root, result);
      continue;
    }

    const pathname = `/${path.relative(root, absolutePath).split(path.sep).join("/")}`;
    const mimeType = mimeTypes[path.extname(entry.name)] ?? "application/octet-stream";
    result[pathname] = [mimeType, (await readFile(absolutePath)).toString("base64")];
  }

  return result;
}

const assets = await collectAssets("dist");

await mkdir("dist/server", { recursive: true });

// Dagitim yapilandirmasi depoya girmez. Yoksa build durmaz; yalnizca
// dagitim adimi atlanir, boylece depoyu klonlayan herkes derleyebilir.
try {
  await mkdir("dist/.openai", { recursive: true });
  await copyFile(".openai/hosting.json", "dist/.openai/hosting.json");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
  console.warn("uyari: .openai/hosting.json yok - dagitim yapilandirmasi atlandi");
}

await writeFile(
  "dist/server/index.js",
  `const assets = ${JSON.stringify(assets)};

function decode(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    let pathname = decodeURIComponent(url.pathname);

    if (pathname === "/") pathname = "/index.html";
    else if (!pathname.includes(".") && assets[pathname + ".html"]) pathname += ".html";
    const asset = assets[pathname];
    if (!asset) return new Response("Not found", { status: 404 });

    return new Response(request.method === "HEAD" ? null : decode(asset[1]), {
      headers: {
        "Content-Type": asset[0],
        "Cache-Control": pathname.endsWith(".html")
          ? "public, max-age=0, must-revalidate"
          : "public, max-age=31536000, immutable",
      },
    });
  },
};
`,
);
