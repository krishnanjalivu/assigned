// let header = document.querySelector('.header'),
//     inputSearch = document.querySelector('.search-box input'),
//     faArrowLeft = document.querySelector('.fa-arrow-left'),
//     files = document.querySelector('#files'),
//     chatBox = document.querySelector('#chatBox'),
//     msg = document.querySelector('#Msg');

// inputSearch.addEventListener('focus', () => {
//     header.classList.add('focus');
//     files.classList.add('active');
// });

// faArrowLeft.addEventListener('click', () => {
//     header.classList.remove('focus');
//     files.classList.remove('active');
// });

// msg.addEventListener('click', () => {
//     chatBox.classList.add('active');
// });
const chatListElement = document.querySelector('.chat-list');

// Fetch chat data from API
fetch('https://my-json-server.typicode.com/codebuds-fk/chat/chats')
  .then(response => response.json())
  .then(data => {
    data.forEach(chat => {
      const chatItemElement = document.createElement('div');
      chatItemElement.classList.add('chat-box');
      chatItemElement.dataset.chatId = chat.id;

      chatItemElement.innerHTML = `
        <div class="chat-img">
          <img src="${chat.productImage}" alt="Product Image">
        </div>
        <div class="chat-details">
          <div class="chat-title">${chat.title}</div>
          <div class="chat-item__orderId">Order ID: ${chat.orderId}</div>
          <div class="chat-msg">
            ${new Date(chat.lastMessageDate).toLocaleDateString()}
          </div>
        </div>
      `;
      chatListElement.appendChild(chatItemElement);
    });
  });

//Handle chat item selection
const chatItems = document.querySelectorAll('.chat-box');
chatItems.forEach(chatItem => {
  chatItem.addEventListener('click', () => {
    const chatId = chatItem.dataset.chatId;
    updateChatView(chatId);
    highlightChatItem(chatId);
  });
});

// // Handle message sending
// const chatInput = document.querySelector('.chat-view__input input[type="text"]');
// const sendButton = document.querySelector('.chat-view__input button');
// let currentChatId;
// sendButton.addEventListener('click', () => {
//   const messageText = chatInput.value;
//   sendMessage(currentChatId, messageText);
//   chatInput.value = '';
// });

// // Handle message options
// const chatViewElement = document.querySelector('.chat-view__messages');
// chatViewElement.addEventListener('click', (event) => {
//   const optionElement = event.target.closest('.chat-message__option');
//   if (!optionElement) return;
//   const optionText = optionElement.textContent;
//   const chatId = currentChatId;
//   // Handle specific option actions (e.g., "Request a Call")
//   if (optionText === "Request a Call") {
//     sendMessage(chatId, "I want a callback");
//   }
// });

// // Update chat view with messages for the selected chat
// function updateChatView(chatId) {
//   const chatViewElement = document.querySelector('.chat-view__messages');
//   chatViewElement.innerHTML = '';
//   // Fetch messages for the selected chat
  fetch(`https://my-json-server.typicode.com/codebuds-fk/chat/chats/chats/${chatId}`)
    .then(response => response.json())
    .then(data => {
      const messages = data.messages;

      messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('container');

        // if (message.sender === 'BOT') {
        //   messageElement.classList.add('chat-message--bot');
        // } else {
        //   messageElement.classList.add('chat-message--user');
        // }

        if (message.type === 'optionedMessage') {
          messageElement.innerHTML = `
            <div class="chat-msg">
              <p>${message.text}</p>
            </div>
            <div class="chat-msg">
              ${message.options
                .map(option => `
                  <button class="chat-message__option ${message.sender === 'USER' ? 'disabled' : ''}">
                    ${option}
                  </button>
                `)
                .join('')}
            </div>
          `;
        } else {
          messageElement.innerHTML = `
            <p class="chat-msg">${message.text}</p>
          `;
        }

        chatViewElement.appendChild(messageElement);
      });

      // Scroll to the latest message
      chatViewElement.scrollTop = chatViewElement.scrollHeight;
    });


// Define the sendMessage and highlightChatItem functions (not provided in the code snippet)
