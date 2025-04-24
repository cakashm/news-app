const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;
const NEWS_API_KEY = 'your_api_key_here'; // Replace this!

app.get('/', async (req, res) => {
  const { country = 'us', category = 'technology', q = '' } = req.query;

  try {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&q=${q}&pageSize=5&apiKey=${NEWS_API_KEY}`;
    const response = await axios.get(url);
    const articles = response.data.articles;

    let html = `<h1>Latest News</h1>`;
    articles.forEach(article => {
      html += `
        <div>
          <h2>${article.title}</h2>
          <p>${article.description || 'No description available.'}</p>
          <a href="${article.url}" target="_blank">Read more</a>
        </div>
      `;
    });

    res.send(html);
  } catch (err) {
    console.error(err.message);
    res.send('Error fetching news.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
