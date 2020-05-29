const socket=io('http://localhost:8000');

const form =document.getElementById('send-container');
const messageinput=document.getElementById('getmessage');
const messageContainer=document.querySelector('.container');


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageinput.value;
    messageinput.value="";
    append(`you: ${message}`,'right');
    socket.emit('send',message);
})

const append = (message,position) => {
    const messageElement=document.createElement('div');
    messageElement.innerHTML=message;
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const name =prompt("enter your name to join the chat ");
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'center');
})

socket.on('recieve',data=>{
    append(`${data.name}: ${data.message}`,'left');
})

socket.on('left',name=>{
    append(`${name} left the chat`,'center');
})
