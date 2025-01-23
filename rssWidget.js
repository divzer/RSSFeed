const express = require("express");
const Parser = require("rss-parser");
const cors = require("cors");

const app = express();
const parser = new Parser();

// Enable CORS for Wix
app.use(cors());

app.get("/rss", async (req, res) => {
  const feedUrl = req.query.url;
  if (!feedUrl) {
    return res.status(400).json({ error: "Missing 'url' query parameter" });
  }

  try {
    const feed = await parser.parseURL(feedUrl);
    res.json(feed.items.slice(0, 5)); // Return the top 5 items
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch RSS feed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`RSS backend running on port ${PORT}`));
