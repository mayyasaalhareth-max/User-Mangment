const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const test = require("node:test");

const database = JSON.parse(
  readFileSync(join(__dirname, "../database/db.json"), "utf8"),
);

test("database contains array collections for each API resource", () => {
  for (const resource of [
    "users",
    "posts",
    "comments",
    "albums",
    "photos",
    "todos",
  ]) {
    assert.ok(Array.isArray(database[resource]), `${resource} must be an array`);
  }
});
