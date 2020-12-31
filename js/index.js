//JvaScript DOM Elements //
const form = document.getElementById('form');
const textArea = document.getElementById('text-area');
const button = document.getElementById('button');

// Listening Event On Form Submit //
form.addEventListener('submit', (event) => {
	// Prevent Page To Submit //
	event.preventDefault();

	async function apiKey() {
		const response = await fetch('../ApiKey.json');
		const jsonData = await response.json();
		API_KEY = `${jsonData[0].API_KEY}`;
		return API_KEY;
	}
	apiKey().then(response => {

			const API_KEY = `${response}`;
			const ip_address = textArea.value;
			// const ip_address = `43.245.86.17`;

			async function geoLocate(ip) {
				const api = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${API_KEY}&ip_address=${ip}`);
				const jsonData = await api.json();
				return jsonData;
			}
			geoLocate(ip_address).then(response => {
					console.log(response);
				})
				.catch(error => {
					console.log(`Error Found => ${error}`);
				})

		})
		.catch(error => {
			console.log(`Error Found => ${error}`);
		});
});