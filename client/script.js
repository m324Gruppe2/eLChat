(async () => {
  const myUser = await generateRandomUser();
  let activeUsers = [];
  let typingUsers = [];

  const socket = new WebSocket(generateBackendUrl());
  socket.addEventListener('open', () => {
    console.log('WebSocket connected!');
    socket.send(JSON.stringify({ type: 'newUser', user: myUser }));
  });
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    console.log('WebSocket message:', message);
    switch (message.type) {
      case 'message':
        const messageElement = generateMessage(message, myUser);
        document.getElementById('messages').appendChild(messageElement);
        setTimeout(() => {
          messageElement.classList.add('opacity-100');
        }, 100);
        break;
      case 'activeUsers':
        activeUsers = message.users;
        const activeUsersList = document.getElementById('activeUsers');
        activeUsersList.innerHTML = '';
        activeUsers.forEach((user) => {
          console.log(user);
          activeUsersList.innerHTML += `<p>${user.name}</p>`;
        });
        break;
      case 'typing':
        typingUsers = message.users;

        const typingUserList = document.getElementById('typingUser');
        typingUserList.innerHTML = '';
        typingUsers.forEach((user) => {
          console.log(user);
          typingUserList.innerHTML += `Typing: ${user.name}`;
        });
        break;
      default:
        break;
    }
  });
  socket.addEventListener('close', (event) => {
    console.log('WebSocket closed.');
  });
  socket.addEventListener('error', (event) => {
    console.error('WebSocket error:', event);
  });

  // Wait until the DOM is loaded before adding event listeners
  document.addEventListener('DOMContentLoaded', (event) => {
    // Send a message when the send button is clicked
    document.getElementById('sendButton').addEventListener('click', () => {
      const message = document.getElementById('messageInput').value;
      socket.send(JSON.stringify({ type: 'message', message, user: myUser }));
      document.getElementById('messageInput').value = '';
    });

    document.getElementById('lightSwitch').addEventListener('change', function () {
      if (this.checked) {
        document.getElementById('background').classList.replace('bg-gray-900', 'bg-white');
        document.getElementById('activeUsersBox').classList.replace('bg-gray-700', 'bg-gray-200');
        document.getElementById('activeUsersBox').classList.replace('text-white', 'text-black');
        document.getElementById('messageInputBox').classList.replace('bg-gray-900', 'bg-white');
        document.getElementById('messageInput').classList.replace('bg-gray-700', 'bg-gray-200');
        document.getElementById('messageInput').classList.replace('text-white', 'text-black');
        document.getElementById('typingUser').classList.replace('text-white', 'text-black');
      } else {
        document.getElementById('background').classList.replace('bg-white', 'bg-gray-900');
        document.getElementById('activeUsersBox').classList.replace('bg-gray-200', 'bg-gray-700');
        document.getElementById('activeUsersBox').classList.replace('text-black', 'text-white');
        document.getElementById('messageInputBox').classList.replace('bg-white', 'bg-gray-900');
        document.getElementById('messageInput').classList.replace('bg-gray-200', 'bg-gray-700');
        document.getElementById('messageInput').classList.replace('text-black', 'text-white');
        document.getElementById('typingUser').classList.replace('text-black', 'text-white');
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    // Only send if the typed in key is not a modifier key
    if (event.key.length === 1) {
      socket.send(JSON.stringify({ type: 'typing', user: myUser }));
    }
    // Only send if the typed in key is the enter key
    if (event.key === 'Enter') {
      const message = document.getElementById('messageInput').value;
      socket.send(JSON.stringify({ type: 'message', message, user: myUser }));
      document.getElementById('messageInput').value = '';
    }
  });
})();
