import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("build", Date.now().toString());
const { default: worker } = await import(workerUrl.href);

test("serves the bikecream event page", async () => {
  const response = await worker.fetch(new Request("https://bikecream.cookieboi.com/"));
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /^text\/html/);
  assert.match(html, /<title>bikecream/);
  assert.match(html, /34 miles\./);
  assert.match(html, /Lost Borough/);
  assert.match(html, /Julia Jean's/);
});

test("serves interactive code and the social card", async () => {
  const [scriptResponse, imageResponse] = await Promise.all([
    worker.fetch(new Request("https://bikecream.cookieboi.com/script.js")),
    worker.fetch(new Request("https://bikecream.cookieboi.com/images/bikecream-social.png")),
  ]);

  assert.equal(scriptResponse.status, 200);
  assert.match(await scriptResponse.text(), /aria-expanded/);
  assert.equal(imageResponse.status, 200);
  assert.equal(imageResponse.headers.get("content-type"), "image/png");
  assert.ok((await imageResponse.arrayBuffer()).byteLength > 500_000);
});

test("returns a real 404", async () => {
  const response = await worker.fetch(new Request("https://bikecream.cookieboi.com/nope"));
  assert.equal(response.status, 404);
});
