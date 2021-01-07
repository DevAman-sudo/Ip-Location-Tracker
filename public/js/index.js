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