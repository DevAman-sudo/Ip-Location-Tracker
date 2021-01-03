//JvaScript DOM Elements //
const form = document.getElementById('form');
const textArea = document.getElementById('text-area');
const button = document.getElementById('button');
const dataContainer = document.getElementById('data-container');

// function to append data //
const appendData = (data) => {
  let element = document.createElement('small');
  element.innerText = data;
  dataContainer.appendChild(element);
}

// fetching user public ip address //
const streamApiData = () => {

  ipLocate()
    .then(response => {
      let ip_address = response;
      textArea.value = response;
      appendData(`Your Public Ip Address Is ${response}`);

      apiKey().then(response => {
          let API_KEY = response;

          geoLocate(ip_address).then(response => {
            console.log(response)
            appendData(JSON.stringify(response))
          })
        })
        .catch(err => console.error(err));
    })
    .catch(err => {
      console.log(`User Public Ip Address Error => ${err}`);
    })

}
streamApiData();

// Listening Event On Form Submit //
form.addEventListener('submit', (event) => {
  // Prevent Page To Submit //
  event.preventDefault();

  // fetched response data from apiKey api //
  streamApiData();
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
  const jsonData = await api.text();
  return jsonData;
}