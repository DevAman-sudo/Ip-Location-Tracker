// https://ipgeolocation.abstractapi.com/v1/?api_key=36f727e10cd5496baff661d9a434bbc9&ip_address=43.245.86.17
async function apiKey() {
	const response = await fetch('../ApiKey.json');
	const jsonData = await response.json();
	API_KEY = `${jsonData[0].API_KEY}` ;
	return API_KEY ;
}
apiKey().then( response => {
	const API_KEY = `${response}` ;
})
.catch( error => {
	console.log(`Error Found => ${error}`);
});

const ip_address = `43.245.86.17` ;

async function geoLocate(ip) {
	const api = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${API_KEY}&ip_address=${ip}`);
	console.log(api);
}
// geoLocate(ip_address);