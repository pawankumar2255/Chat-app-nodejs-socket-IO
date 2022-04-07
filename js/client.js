
const socket = io('http://localhost:8001');


// get DOM element in respective Js variables

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container')


//  Audio that will play while recieving messages

var audio = new Audio('ring.mp3');


// Function which will append event info to the container 
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    if(position == 'left'){
        console.log('sound is playing');
        audio.play();
    }
}



// ask new user for his/her name and let the server know
document.querySelector(".join-btn").addEventListener("click", (e)=>{
    e.preventDefault()
    const name = prompt("Enter your name to join LetsChat")
    socket.emit('new-user-joined', name)
})


//  If new user joins, recieving his/her name  from the server 

socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'right');
})


// if server sends a message, recieve it.

socket.on('receive', data=>{
    append(`${data.name }: ${data.message}`, 'left')
})

// If user leaves the the chat ,append info  to the container

socket.on('leave', name=>{
    append(`${name } left the chat`, 'left');
})


// if form get submitted, send message to the server 

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})