const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;
const cache = {};
const cacheDuration = 60000; // 60 seconds cache duration

app.use(cors());

app.get('/api/crypto', async (req, res) => {
    const ids = '1,217,3908,74,1839,52,11419,5994,24478'
    if (cache.data && (Date.now() - cache.timestamp < cacheDuration)) {
      return res.json(cache.data); // Send cached data if still valid
    }
    try {
      const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${ids}`;
      const response = await axios.get(url, {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY
        }
      });
    const data = response.data.data;
    cache.data = Object.values(data).map(item => ({
      symbol: item.symbol,
      price: item.quote.USD.price.toFixed(4)
    }));
    cache.timestamp = Date.now();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Server running on apfhdapfewlkjrqlkjer:${port}`);
});