/**
 * quote-logic.test.js
 * Automated test suite to verify requirements:
 * 1. Has at least 15-20 quotes.
 * 2. Every quote has text and author.
 * 3. Never shows the same quote twice consecutively.
 * 4. Reliable generation on demand.
 */

const assert = require("assert");
const { QUOTES_DATA } = require("../js/quotes.js");
const { QuoteApp } = require("../js/app.js");

console.log("=========================================");
console.log(" Running Random Quote Generator Test Suite ");
console.log("=========================================\n");

let passed = 0;
let total = 0;

function test(description, fn) {
  total++;
  try {
    fn();
    console.log(`✅ PASS: ${description}`);
    passed++;
  } catch (err) {
    console.error(`❌ FAIL: ${description}`);
    console.error(err);
  }
}

// Requirement 5: Include at least 15–20 different quotes
test("Dataset contains at least 15-20 quotes", () => {
  assert(Array.isArray(QUOTES_DATA), "QUOTES_DATA should be an array");
  assert(QUOTES_DATA.length >= 15, `Expected at least 15 quotes, but found ${QUOTES_DATA.length}`);
  console.log(`   (Found ${QUOTES_DATA.length} quotes)`);
});

// Requirement 4: Every quote must show quote text and author's name
test("Every quote contains non-empty 'text' and 'author'", () => {
  QUOTES_DATA.forEach((quote, index) => {
    assert(typeof quote.text === "string" && quote.text.trim().length > 0, `Quote at index ${index} missing text`);
    assert(typeof quote.author === "string" && quote.author.trim().length > 0, `Quote at index ${index} missing author`);
  });
});

// Requirement 1 & 12: Generate random quote automatically
test("QuoteApp initializes and returns a valid quote on first call", () => {
  const app = new QuoteApp(QUOTES_DATA);
  const initialQuote = app.getRandomQuote();
  assert(initialQuote !== null, "Initial quote should not be null");
  assert(typeof initialQuote.text === "string", "Initial quote must have text");
  assert(typeof initialQuote.author === "string", "Initial quote must have author");
});

// Requirement 3 & 6: Display different quote and avoid showing the same quote consecutively
test("getRandomQuote() never produces consecutive duplicates across 1,000 iterations", () => {
  const app = new QuoteApp(QUOTES_DATA);
  let previousQuote = null;

  for (let i = 0; i < 1000; i++) {
    const currentQuote = app.getRandomQuote();
    assert(currentQuote !== null, `Iteration ${i} returned null quote`);
    if (previousQuote !== null) {
      assert.notStrictEqual(
        currentQuote.text,
        previousQuote.text,
        `Consecutive duplicate detected at iteration ${i}: "${currentQuote.text}"`
      );
    }
    previousQuote = currentQuote;
  }
});

// Requirement 11: Works without external API
test("All quotes are stored locally and accessible without network", () => {
  assert(QUOTES_DATA.length > 0, "Quotes should be locally stored in javascript array");
});

// Category filtering and edge cases
test("Category filtering works properly and respects non-consecutive rule", () => {
  const app = new QuoteApp(QUOTES_DATA);
  app.currentCategory = "wisdom";
  const wisdomQuotes = app.getFilteredQuotes();
  assert(wisdomQuotes.length > 0, "Wisdom category should have quotes");
  wisdomQuotes.forEach(q => {
    assert.strictEqual(q.category.toLowerCase(), "wisdom");
  });

  let prev = null;
  for (let i = 0; i < 50; i++) {
    const q = app.getRandomQuote();
    if (prev && wisdomQuotes.length > 1) {
      assert.notStrictEqual(q.text, prev.text, `Consecutive duplicate in filtered category at ${i}`);
    }
    prev = q;
  }
});

test("Handles edge case of single quote gracefully without infinite loop", () => {
  const single = [{ text: "Only one quote", author: "Solo", category: "Test" }];
  const app = new QuoteApp(single);
  const q1 = app.getRandomQuote();
  const q2 = app.getRandomQuote();
  assert.strictEqual(q1.text, "Only one quote");
  assert.strictEqual(q2.text, "Only one quote");
});

console.log(`\nResults: ${passed}/${total} tests passed.`);
if (passed !== total) {
  process.exit(1);
}
