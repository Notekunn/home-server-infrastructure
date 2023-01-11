const axios = require('axios').default;

const client = axios.create({
	baseURL: 'https://api.cloudflare.com/client/v4',
	headers: {
		'Content-Type': 'application/json',
		'X-Auth-Email': process.env.CLOUDFLARE_EMAIL,
		// 'X-Auth-Key': process.env.CLOUDFLARE_API_KEY,
		Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
	},
});

module.exports = client;
