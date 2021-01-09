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

socket.on('fetched-ip' , (userIp) => {
    textArea.value = userIp ;
    appendData(userIp);
});