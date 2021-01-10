// Socket Io //
const socket = io();

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
};

// function to fetch data of ip_address //
async function geoLocate(ip) {
    const api = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${GeoLocateKey}&ip_address=${ip}`);
    const jsonData = await api.text();
    database.insert({
        apiData: jsonData
    });
}
