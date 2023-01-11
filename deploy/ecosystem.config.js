module.exports = {
	apps: [
		{
			script: './scripts/cloudflared/client.js',
			cron_restart: '*/5 * * * *',
			watch: '.',
			name: 'cloudflare-dns-update',
		},
	],

	deploy: {
		production: {},
	},
};
