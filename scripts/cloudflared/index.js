const path = require('path');
require('dotenv').config({
	path: path.resolve(__dirname, '.env'),
});

const client = require('./client');
const axios = require('axios').default;

async function updateDNS(zoneId, dnsId, data) {
	return client.put(`/zones/${zoneId}/dns_records/${dnsId}`, data);
}

async function main() {
	console.log('Start import DNS');
	try {
		const zoneId = process.env.CLOUDFLARE_ZONE_ID;
		const dnsTag = process.env.CLOUDFLARE_DNS_TAG || 'local';
		const {
			data: { result: dnsRecordList },
		} = await client.get(`/zones/${zoneId}/dns_records`);

		const { data: currentIp } = await axios.get('https://ipecho.net/plain');

		const dnsRecords = dnsRecordList.filter(
			(dns) => dns.comment == dnsTag && dns.type == 'A' && dns.content != currentIp
		);

		for (const dnsRecord of dnsRecords) {
			console.log(`Updating ${dnsRecord.name} from ${dnsRecord.content} to ${currentIp}`);
			await updateDNS(zoneId, dnsRecord.id, {
				...dnsRecord,
				content: currentIp,
			});
		}
	} catch (err) {
		console.log(`Error updating DNS: ${err.message}`);
		console.log(JSON.stringify(err));
	}
}

setInterval(main, 5 * 60 * 1000);

main();
