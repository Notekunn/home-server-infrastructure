module.exports = {
	apps: [
		{
			script: './scripts/cloudflared/index.js',
			// cron_restart: '*/5 * * * *',
			// watch: '.',
			name: 'cloudflare-dns-update',
		},
	],

	deploy: {
		production: {},
	},
};
