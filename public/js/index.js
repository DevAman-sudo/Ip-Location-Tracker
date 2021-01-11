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

// function to fetch user public ip //
async function userIp() {
    let apiData = await fetch('https://api.ipify.org?format=json');
    let jsonData = await apiData.json();
    return jsonData.ip;
}
userIp().then(response => {
    socket.emit('user_ip' , response);
});

socket.on('db_user_ip' , db_user_ip => {
    appendData(db_user_ip);
});

