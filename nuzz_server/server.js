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
    const ids = '1,1027,5426,74,1839,52,11419,5994,24478'
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

app.get('/api/decrypt', async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://cryptocurrency-news2.p.rapidapi.com/v1/decrypt',
    headers: {
      'X-RapidAPI-Key': '6b48328b42mshdd1ed327214c9d3p173071jsnac6e2b3a3de8',
      'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});