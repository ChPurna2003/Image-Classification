// JavaScript for the chatbot functionality
document.getElementById('chatbotButton').addEventListener('click', function() {
    document.getElementById('chatbotContainer').classList.toggle('hidden');
});

document.getElementById('closeChatbot').addEventListener('click', function() {
    document.getElementById('chatbotContainer').classList.add('hidden');
});

document.getElementById('sendChatbotMessage').addEventListener('click', function() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();
    if (message) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('text-gray-700', 'mb-2');
        messageContainer.innerHTML = `<p>${message}</p>`;
        document.getElementById('chatbotMessages').appendChild(messageContainer);
        input.value = '';
        document.getElementById('chatbotMessages').scrollTop = document.getElementById('chatbotMessages').scrollHeight;
    }
});

document.getElementById('chatbotInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('sendChatbotMessage').click();
    }
});