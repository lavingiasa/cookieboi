import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("build", Date.now().toString());
const { default: worker } = await import(workerUrl.href);

test("serves the plain bikecream event page", async () => {
  const response = await worker.fetch(new Request("https://bikecream.cookieboi.com/"));
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /^text\/html/);
  assert.match(html, /<title>bikecream/);
  assert.match(html, /34-mile bike ride/);
  assert.match(html, /nytimes\.com\/2026\/08\/04\/dining\/best-ice-cream-nyc\.html\?unlocked_article_code=1\.3FA\.VrTa\.u1VxfXuoMGe9&amp;smid=url-share/);
  assert.match(html, /Lost Borough/);
  assert.match(html, /maps\.app\.goo\.gl\/zGWW5N3Q4DHpa4EcA/);
  assert.match(html, /We will hit up seven \(7\) ice cream shops across Manhattan, Queens, and Brooklyn:/);
  assert.doesNotMatch(html, /4791 Broadway in Inwood/);
  assert.doesNotMatch(html, /From there, we will ride to six more stops/);
  assert.match(html, /Softside<\/a> at 1231 Broadway, Manhattan <span>— 10\.9 mi<\/span>/);
  for (const distance of ["0", "10.9", "16.2", "20", "24.4", "29.1", "33.4"]) {
    assert.ok(html.includes(`— ${distance} mi`));
  }
  assert.match(html, /Julia Jean's/);
  assert.match(html, /This ride is Citi Bike friendly\./);
  assert.equal((html.match(/Nearest Citi Bike Station:/g) ?? []).length, 7);
  assert.equal((html.match(/<span class="citibike-station">Nearest Citi Bike Station: <a href="https:\/\/www\.google\.com\/maps\/search\/\?api=1&amp;query=[^"]+"/g) ?? []).length, 7);
  for (const station of [
    "Seaman Ave &amp; Beak St",
    "Broadway &amp; W 29 St",
    "48 St &amp; Skillman Ave",
    "Driggs Ave &amp; S 2 St",
    "MacDougal St &amp; Rockaway Ave",
    "5 Ave &amp; 3 St",
    "Madison St &amp; Clinton St",
  ]) {
    assert.ok(html.includes(station));
  }
  assert.doesNotMatch(html, /Citibike/);
  assert.match(html, /Who\?/);
  assert.match(html, /\(I also had a hojicha latte and my mind is going crazyyyyy\)/);
  assert.match(html, /How\?/);
  assert.match(html, /www\.komoot\.com\/invite-tour\/3176095224/);
  assert.match(html, /calendar\.app\.google\/hKyUXafwrN9uBqbw6/);
  assert.match(html, /images\/favicon\.ico\?v=2/);
  assert.match(html, /Special thanks to Liz Denys/);
  assert.match(html, /mooncon\.lizdenys\.com/);
  assert.match(html, /og:image:width" content="1414"/);
  assert.match(html, /og:image:height" content="680"/);
  assert.match(html, /bikecream-wordmark-social-padded-680\.png\?v=3/);
});

test("serves the small script, social card, and favicon", async () => {
  const [scriptResponse, imageResponse, faviconResponse] = await Promise.all([
    worker.fetch(new Request("https://bikecream.cookieboi.com/script.js")),
    worker.fetch(new Request("https://bikecream.cookieboi.com/images/bikecream-wordmark-social-padded-680.png")),
    worker.fetch(new Request("https://bikecream.cookieboi.com/images/favicon.ico")),
  ]);

  assert.equal(scriptResponse.status, 200);
  assert.match(await scriptResponse.text(), /getFullYear/);
  assert.equal(imageResponse.status, 200);
  assert.equal(imageResponse.headers.get("content-type"), "image/png");
  assert.ok((await imageResponse.arrayBuffer()).byteLength > 10_000);
  assert.equal(faviconResponse.status, 200);
  assert.equal(faviconResponse.headers.get("content-type"), "image/x-icon");
  assert.ok((await faviconResponse.arrayBuffer()).byteLength > 1_000);
});

test("returns a real 404", async () => {
  const response = await worker.fetch(new Request("https://bikecream.cookieboi.com/nope"));
  assert.equal(response.status, 404);
});
