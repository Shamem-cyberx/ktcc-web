document.addEventListener('DOMContentLoaded', function() {
    // Chatbot Toggle
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.toggle('active');
    });
    
    chatbotClose.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
    });

    // Chatbot Functionality
    const chatbotBody = document.getElementById('chatbotBody');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotOptions = document.getElementById('chatbotOptions');
    
    // Predefined bot responses
    const botResponses = {
        'Request a Quote': 'To request a quote, please visit our contact page or call us at +973 1234 5678. Would you like me to direct you to our contact form?',
        'Project Inquiry': 'For project inquiries, please provide some details about your project requirements and our team will get back to you within 24 hours.',
        'Service Information': 'KTCC offers comprehensive construction services including Road Construction, Building Construction, and Infrastructure Development. Which service are you interested in?',
        'Contact Details': 'You can reach us at:<br><br>Phone: +973 1234 5678<br>Email: info@ktccgulf.com<br>Address: Al Seef District, Manama, Bahrain',
        'default': 'I\'m sorry, I didn\'t understand that. Please choose one of the options below or ask me about our services.'
    };
    
    // Add user message to chat
    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message user';
        messageDiv.innerHTML = `<p>${message}</p>`;
        chatbotBody.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Add bot message to chat
    function addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message bot';
        messageDiv.innerHTML = `<p>${message}</p>`;
        chatbotBody.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Scroll to bottom of chat
    function scrollToBottom() {
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }
    
    // Handle option button clicks
    const optionButtons = document.querySelectorAll('.chatbot-option');
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const optionText = this.textContent;
            addUserMessage(optionText);
            
            // Hide options after selection
            chatbotOptions.style.display = 'none';
            
            // Bot response
            setTimeout(() => {
                addBotMessage(botResponses[optionText] || botResponses['default']);
                
                // Show options again after response
                setTimeout(() => {
                    chatbotOptions.style.display = 'flex';
                }, 1000);
            }, 1000);
        });
    });
    
    // Handle send button click
    chatbotSend.addEventListener('click', function() {
        const message = chatbotInput.value.trim();
        if (message) {
            addUserMessage(message);
            chatbotInput.value = '';
            
            // Bot response
            setTimeout(() => {
                let response = botResponses['default'];
                
                // Check for keywords in user message
                if (message.toLowerCase().includes('quote') || message.toLowerCase().includes('price')) {
                    response = botResponses['Request a Quote'];
                } else if (message.toLowerCase().includes('project') || message.toLowerCase().includes('inquiry')) {
                    response = botResponses['Project Inquiry'];
                } else if (message.toLowerCase().includes('service') || message.toLowerCase().includes('offer')) {
                    response = botResponses['Service Information'];
                } else if (message.toLowerCase().includes('contact') || message.toLowerCase().includes('email') || message.toLowerCase().includes('phone')) {
                    response = botResponses['Contact Details'];
                }
                
                addBotMessage(response);
                
                // Show options after response
                setTimeout(() => {
                    chatbotOptions.style.display = 'flex';
                }, 1000);
            }, 1000);
        }
    });
    
    // Handle Enter key in input
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            chatbotSend.click();
        }
    });
});