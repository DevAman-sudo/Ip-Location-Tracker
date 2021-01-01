//JvaScript DOM Elements //
const form = document.getElementById('form');
const textArea = document.getElementById('text-area');
const button = document.getElementById('button');

// fetching user public ip address //
ipLocate().then( response => {
	console.log(response);
}).catch( err => {
	console.log(`User Public Ip Address Error => ${err}`);
})

// Listening Event On Form Submit //
form.addEventListener('submit', (event) => {
	// Prevent Page To Submit //
	event.preventDefault();

	// fetched response data from apiKey api //
	apiKey().then(response => {
			// Constant Variables //
			const API_KEY = `${response}`;
			const ip_address = textArea.value;

			// fetched response data from geoLocate api //
			geoLocate(ip_address).then(response => {
					console.log(response);
				})
				// catch error while fetching data from ipgeolocation api //
				.catch( err => {
					console.log(`Error Found => ${err}`);
				})
		})
		// catching error if key not fetched from ApiKey.json //
		.catch( err => {
			console.log(err);
			console.log(`ipgeolocation Api Key Not Found`);
		})
});

// function to fetch ipgeolocation API_KEY //
async function apiKey() {
	const response = await fetch('../ApiKey.json');
	const jsonData = await response.json();
	API_KEY = `${jsonData[0].API_KEY}`;
	return API_KEY;
}

// function to fetch user public ip ip_address //
async function ipLocate() {
	const api = await fetch('https://api.ipify.org?format=json');
	const jsonData = await api.json();
	const data = jsonData.ip;
	return data;
}

// function to fetch data of ip_address //
async function geoLocate(ip) {
	const api = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${API_KEY}&ip_address=${ip}`);
	const jsonData = await api.json();
	return jsonData;
}