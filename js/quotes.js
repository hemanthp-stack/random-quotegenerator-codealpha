/**
 * quotes.js
 * Local dataset of curated inspirational and thought-provoking quotes.
 * Offline-first, zero external API requirements.
 */

const QUOTES_DATA = [
  {
    id: 1,
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "Inspiration"
  },
  {
    id: 2,
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    category: "Wisdom"
  },
  {
    id: 3,
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    category: "Hope"
  },
  {
    id: 4,
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "Vision"
  },
  {
    id: 5,
    text: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    author: "Ralph Waldo Emerson",
    category: "Courage"
  },
  {
    id: 6,
    text: "You will face many defeats in life, but never let yourself be defeated.",
    author: "Maya Angelou",
    category: "Perseverance"
  },
  {
    id: 7,
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    category: "Resilience"
  },
  {
    id: 8,
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    category: "Life"
  },
  {
    id: 9,
    text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    author: "Mother Teresa",
    category: "Kindness"
  },
  {
    id: 10,
    text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    author: "Benjamin Franklin",
    category: "Learning"
  },
  {
    id: 11,
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    category: "Perseverance"
  },
  {
    id: 12,
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "Courage"
  },
  {
    id: 13,
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: "Motivation"
  },
  {
    id: 14,
    text: "I have not failed. I've just found 10,000 ways that won't work.",
    author: "Thomas A. Edison",
    category: "Persistence"
  },
  {
    id: 15,
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    category: "Wisdom"
  },
  {
    id: 16,
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Will Durant",
    category: "Excellence"
  },
  {
    id: 17,
    text: "The mind is everything. What you think you become.",
    author: "Buddha",
    category: "Wisdom"
  },
  {
    id: 18,
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    category: "Creativity"
  },
  {
    id: 19,
    text: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
    author: "Marie Curie",
    category: "Wisdom"
  },
  {
    id: 20,
    text: "Act as if what you do makes a difference. It does.",
    author: "William James",
    category: "Inspiration"
  },
  {
    id: 21,
    text: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
    category: "Life"
  },
  {
    id: 22,
    text: "You must be the change you wish to see in the world.",
    author: "Mahatma Gandhi",
    category: "Inspiration"
  },
  {
    id: 23,
    text: "Happiness depends upon ourselves.",
    author: "Aristotle",
    category: "Wisdom"
  },
  {
    id: 24,
    text: "Everything you've ever wanted is sitting on the other side of fear.",
    author: "George Addair",
    category: "Courage"
  },
  {
    id: 25,
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
    category: "Motivation"
  },
  {
    id: 26,
    text: "Stay hungry, stay foolish.",
    author: "Steve Jobs",
    category: "Creativity"
  },
  {
    id: 27,
    text: "Turn your wounds into wisdom.",
    author: "Oprah Winfrey",
    category: "Resilience"
  },
  {
    id: 28,
    text: "Whatever you are, be a good one.",
    author: "Abraham Lincoln",
    category: "Excellence"
  },
  {
    id: 29,
    text: "What we achieve inwardly will change outer reality.",
    author: "Plutarch",
    category: "Wisdom"
  },
  {
    id: 30,
    text: "There are no limits to what you can accomplish, except the limits you place on your own thinking.",
    author: "Brian Tracy",
    category: "Motivation"
  }
];

// Support CommonJS export for automated Node tests and browser script inclusion
if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUOTES_DATA };
}
