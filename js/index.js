// https://ipgeolocation.abstractapi.com/v1/?api_key=36f727e10cd5496baff661d9a434bbc9&ip_address=43.245.86.17

const ip_address = `43.245.86.17` ;

async function geoLocate(ip) {
	const api = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=36f727e10cd5496baff661d9a434bbc9&ip_address=${ip}`);
	console.log(api.json());
}
geoLocate(ip_address);