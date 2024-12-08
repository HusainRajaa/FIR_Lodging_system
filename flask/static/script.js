







document.addEventListener('DOMContentLoaded', () => {
  
    document.getElementById('send-button').addEventListener('click', sendMessage);

    document.getElementById('user-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            sendMessage();
        }
    });

    
    function sendMessage() {
        const userInput = document.getElementById('user-input');
        const chatBox = document.getElementById('chat-box');
        const messageText = userInput.value.trim();

        if (messageText === '') return; 
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user');
        userMessage.textContent = messageText;
        chatBox.appendChild(userMessage);

        userInput.value = ''; 

       
        fetch('/get-response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: messageText })
        })
        .then(response => response.json())
        .then(data => {
            
            const botMessage = document.createElement('div');
            botMessage.classList.add('message', 'bot');
            botMessage.textContent = data.response;
            chatBox.appendChild(botMessage);

            chatBox.scrollTop = chatBox.scrollHeight; 
        })
        .catch(error => console.error('Error:', error)); 
    }


    function handleSuggestionClick(event) {
        const messageText = event.target.textContent.trim();
        document.getElementById('user-input').value = messageText;
        sendMessage();
    }

   
    document.querySelectorAll('.suggestion-button').forEach(button => {
        button.addEventListener('click', handleSuggestionClick);
    });
});










