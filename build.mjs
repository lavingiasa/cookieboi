import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = new URL("./", import.meta.url);
const outputDirectory = new URL("dist/server/", root);

const [html, css, javascript, socialImage, favicon] = await Promise.all([
  readFile(new URL("index.html", root), "utf8"),
  readFile(new URL("style.css", root), "utf8"),
  readFile(new URL("script.js", root), "utf8"),
  readFile(new URL("images/bikecream-wordmark-social-padded.png", root)),
  readFile(new URL("images/favicon.ico", root)),
]);

const workerSource = `
const textAssets = new Map([
  ["/", { body: ${JSON.stringify(html)}, type: "text/html; charset=utf-8" }],
  ["/index.html", { body: ${JSON.stringify(html)}, type: "text/html; charset=utf-8" }],
  ["/style.css", { body: ${JSON.stringify(css)}, type: "text/css; charset=utf-8" }],
  ["/script.js", { body: ${JSON.stringify(javascript)}, type: "text/javascript; charset=utf-8" }],
]);

const binaryAssets = new Map([
  ["/images/bikecream-wordmark-social-padded.png", { base64: ${JSON.stringify(socialImage.toString("base64"))}, type: "image/png" }],
  ["/images/favicon.ico", { base64: ${JSON.stringify(favicon.toString("base64"))}, type: "image/x-icon" }],
]);

const binaryCache = new Map();

function decodeBase64(pathname, encoded) {
  if (binaryCache.has(pathname)) return binaryCache.get(pathname);
  const raw = atob(encoded);
  const bytes = new Uint8Array(raw.length);
  for (let index = 0; index < raw.length; index += 1) bytes[index] = raw.charCodeAt(index);
  binaryCache.set(pathname, bytes);
  return bytes;
}

function headers(type, immutable = false) {
  return {
    "content-type": type,
    "cache-control": immutable ? "public, max-age=31536000, immutable" : "public, max-age=300",
    "referrer-policy": "strict-origin-when-cross-origin",
    "x-content-type-options": "nosniff",
    "permissions-policy": "camera=(), microphone=(), geolocation=()",
  };
}

const worker = {
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = decodeURIComponent(url.pathname).replace(/\\/+$/, "") || "/";
    const textAsset = textAssets.get(pathname);
    if (textAsset) {
      return new Response(request.method === "HEAD" ? null : textAsset.body, {
        status: 200,
        headers: headers(textAsset.type),
      });
    }

    const binaryAsset = binaryAssets.get(pathname);
    if (binaryAsset) {
      const body = request.method === "HEAD" ? null : decodeBase64(pathname, binaryAsset.base64);
      return new Response(body, {
        status: 200,
        headers: headers(binaryAsset.type, true),
      });
    }

    return new Response("Not found", {
      status: 404,
      headers: headers("text/plain; charset=utf-8"),
    });
  },
};

export default worker;
`;

await rm(new URL("dist/", root), { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await writeFile(new URL("index.js", outputDirectory), workerSource);

console.log(resolve(new URL("index.js", outputDirectory).pathname));
