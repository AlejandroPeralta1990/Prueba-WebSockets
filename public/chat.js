const socket = io()
//DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let send = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

// envio de mensaje a todos los clientes --> hacia el servidor
send.addEventListener('click', function () {
    // se crea una peticion 'chat:message', hacia todos los clientes conectados,
    // se envia el userName, message del cliente emisor del mensje.
    socket.emit('chat:message', {
        username: username.value,
        message: message.value
    });
});

// recepción del evento 'chat:message' --> hacia la view
socket.on('chat:message', function (data) {
    // se incrementa el mensaje emitido
    output.innerHTML += `<p> <strong>${data.username}</strong>: ${data.message}</p>`
    actions.innerHTML = '';
    message.value = '';
    message.focus();
});

// evento de tipeo desde el cliente --> hacia el servidor
message.addEventListener('keypress', function () {
    // se crea petición al servidor para todos los clientes
    socket.emit('chat:typing', username.value);
    actions.innerHTML = '';
});

// se recepta una petición del servidor para la view
socket.on('chat:typing', function (data) {
    actions.innerHTML = `<p>
    <em>${data} esta escribiendo un mensaje...</em></p>`
});

socket.on('chat:fin', function (data) {
    message.setAttribute('disabled', 'true');
    username.setAttribute('disabled', 'true');
    send.setAttribute('disabled', 'true');
    actions.innerHTML = `<p>
    <em>El chat ha exedido..</em></p>`
});