document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotBody = document.getElementById('chatbotBody');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotOptions = document.getElementById('chatbotOptions');

    if (!chatbotToggle || !chatbotContainer || !chatbotClose || !chatbotBody || !chatbotInput || !chatbotSend || !chatbotOptions) {
        return;
    }

    const companyInfo = {
        name: 'KTCC W.L.L',
        phone: '+973 35034495',
        phoneTel: '+97335034495',
        phoneLandline: '+973 17670813',
        phoneLandlineTel: '+97317670813',
        whatsapp: '+973 35034495',
        email: 'info@ktccgulf.com',
        address:
            'Flat 43, Building 49, Road/ Street 2701, Block 327, Adliyah, Manama, Kingdom of Bahrain',
        workingHours: 'Sunday to Thursday, 8:00 AM - 5:00 PM',
        services: [
            {
                title: 'Trenchless Technology',
                description: 'Horizontal Directional Drilling (HDD) and other no-dig solutions for underground utilities.',
                key: 'trenchless technology',
            },
            {
                title: 'Building Construction',
                description: 'Commercial and residential buildings with modern designs and high-quality materials.',
                key: 'building construction',
            },
            {
                title: 'Road Construction',
                description: 'Highway, bridge, and urban road construction with durable materials.',
                key: 'road construction',
            },
            {
                title: 'Infrastructure Development',
                description: 'Water, sewage, and electrical infrastructure projects.',
                key: 'infrastructure development',
            },
            {
                title: 'Renovation & Maintenance',
                description: 'Building renovations, repairs, and ongoing maintenance services.',
                key: 'renovation & maintenance',
            },
        ],
    };

    companyInfo.whatsappDigits = companyInfo.whatsapp.replace(/\D/g, '');

    const knowledgeBase = {
        greeting: {
            response: `Welcome to ${companyInfo.name}. I can help with <strong>quotes</strong>, <strong>services</strong> (trenchless / civil), or <strong>contact</strong> details. Pick a shortcut below or type your question.`,
            options: ['Request a Quote', 'Our Services', 'Contact Executive'],
        },
        'thank you': {
            response: "You're welcome. Is there anything else I can help with?",
            options: ['Request a Quote', 'Our Services', 'Contact Details'],
        },
        about: {
            response: `${companyInfo.name} is a construction contracting company in Bahrain specialising in:<br><br>
            <ul>
                <li>Trenchless technology (HDD)</li>
                <li>Building & civil works</li>
                <li>Roads & infrastructure</li>
                <li>Utility and corridor projects</li>
            </ul>
            <br>We focus on quality delivery aligned to local authority requirements.`,
            options: ['Our Services', 'Contact Executive'],
        },
        contact: {
            response: `Reach ${companyInfo.name}:<br><br>
            <strong><i class="fas fa-phone"></i> Phone:</strong> ${companyInfo.phone}<br>
            <strong><i class="fas fa-phone-alt"></i> TEL:</strong> ${companyInfo.phoneLandline}<br>
            <strong><i class="fab fa-whatsapp"></i> WhatsApp:</strong> ${companyInfo.whatsapp}<br>
            <strong><i class="fas fa-envelope"></i> Email:</strong> ${companyInfo.email}<br>
            <strong><i class="fas fa-map-marker-alt"></i> Address:</strong> ${companyInfo.address}<br><br>
            <strong>Hours:</strong> ${companyInfo.workingHours}<br><br>
            <a href="https://wa.me/${companyInfo.whatsappDigits}" class="quick-action-btn whatsapp" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-whatsapp"></i> WhatsApp
            </a>
            <a href="tel:${companyInfo.phoneTel}" class="quick-action-btn call">
                <i class="fas fa-phone"></i> Call
            </a>`,
            options: ['Request a Quote', 'Our Services'],
        },
        services: {
            response: `${companyInfo.name} offers these service areas:`,
            options: ['Request a Quote', 'Contact Executive'],
            custom: function() {
                let servicesHTML = `${this.response}<br><br>`;
                companyInfo.services.forEach((service) => {
                    servicesHTML += `
                        <div class="service-item" role="button" tabindex="0" data-service-title="${service.title.replace(/"/g, '&quot;')}">
                            <h5>${service.title}</h5>
                            <p>${service.description}</p>
                        </div>
                    `;
                });
                return servicesHTML;
            },
        },
        'trenchless technology': {
            response: `Our <strong>trenchless</strong> scope includes:<br><br>
            <ul>
                <li>HDD for large-diameter pipelines</li>
                <li>Pipe jacking and microtunneling</li>
                <li>Utility crossings with reduced surface impact</li>
                <li>Rehabilitation where applicable</li>
            </ul>`,
            options: ['Request a Quote', 'Other Services', 'Contact Executive'],
        },
        'building construction': {
            response: `Our <strong>building construction</strong> work covers commercial, residential, and industrial structures with project controls and compliance to Bahrain codes.`,
            options: ['Request a Quote', 'Other Services', 'Contact Executive'],
        },
        'road construction': {
            response: `Our <strong>road & civil</strong> work includes highways, urban links, paving, and coordination of traffic and staging.`,
            options: ['Request a Quote', 'Other Services', 'Contact Executive'],
        },
        'infrastructure development': {
            response: `Our <strong>infrastructure</strong> scope includes utilities, water and sewage networks, drainage, and supporting civil works.`,
            options: ['Request a Quote', 'Other Services', 'Contact Executive'],
        },
        'renovation & maintenance': {
            response: `We support <strong>renovation and maintenance</strong> for upgrades, repairs, and ongoing facility care with minimal disruption where possible.`,
            options: ['Request a Quote', 'Other Services', 'Contact Executive'],
        },
        projects: {
            response: 'See our <a href="projects.html"><strong>Projects gallery</strong></a> for site imagery. For bid-specific or programme questions, use contact below.',
            options: ['Request a Quote', 'Our Services', 'Contact Executive'],
        },
        quote: {
            response: `For a quote, share <strong>scope</strong>, <strong>location</strong>, <strong>timeline</strong>, and any drawings or specs. Our estimators will respond with next steps.`,
            options: ['Contact Executive', 'Our Services'],
            followUp: 'Would you like to contact us now or explore services first?',
        },
        business: {
            response: `${companyInfo.name} combines local delivery experience with engineering discipline across government and private programmes in Bahrain.`,
            options: ['Request a Quote', 'Our Services'],
        },
        timeline: {
            response: 'Durations depend on scope, permits, site conditions, and materials. We outline a schedule at proposal stage and report progress through delivery.',
            options: ['Request a Quote', 'Contact Executive'],
        },
        default: {
            response: "I'm not sure I understood that. Try a shortcut below or ask about <strong>services</strong>, <strong>quotes</strong>, or <strong>contact</strong>.",
            options: ['Request a Quote', 'Our Services', 'Contact Executive'],
        },
    };

    knowledgeBase['service information'] = knowledgeBase.services;
    knowledgeBase['contact details'] = knowledgeBase.contact;
    knowledgeBase['project inquiry'] = knowledgeBase.quote;
    knowledgeBase['other services'] = knowledgeBase.services;

    function optionIcon(label) {
        const t = label.toLowerCase();
        if (t.includes('quote')) return 'fa-file-invoice-dollar';
        if (t.includes('service')) return 'fa-screwdriver-wrench';
        if (t.includes('project')) return 'fa-diagram-project';
        if (t.includes('contact') || t.includes('executive')) return 'fa-headset';
        if (t.includes('detail')) return 'fa-circle-info';
        return 'fa-arrow-right';
    }

    function setChatOpen(open) {
        chatbotContainer.classList.toggle('active', open);
        chatbotToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        chatbotContainer.setAttribute('aria-hidden', open ? 'false' : 'true');
        if (open) {
            chatbotToggle.classList.remove('pulse');
            setTimeout(() => chatbotInput.focus(), 320);
        }
    }

    function bindServiceItems(scope) {
        scope.querySelectorAll('.service-item').forEach((el) => {
            const title = el.getAttribute('data-service-title');
            const go = () => window.handleServiceClick(title);
            el.addEventListener('click', go);
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    go();
                }
            });
        });
    }

    function addMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${type}`;

        if (type === 'typing') {
            messageDiv.innerHTML = `
                <div class="chatbot-msg-row">
                    <div class="chatbot-msg-avatar chatbot-msg-avatar--bot"><i class="fas fa-hard-hat" aria-hidden="true"></i></div>
                    <div class="chatbot-bubble chatbot-bubble--bot">
                        <div class="typing-dots" aria-hidden="true">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                </div>`;
        } else if (type === 'user') {
            messageDiv.innerHTML = `
                <div class="chatbot-msg-row chatbot-msg-row--user">
                    <div class="chatbot-msg-avatar chatbot-msg-avatar--user"><i class="fas fa-user" aria-hidden="true"></i></div>
                    <div class="chatbot-bubble chatbot-bubble--user">
                        <div class="chatbot-bubble-content"></div>
                    </div>
                </div>`;
            messageDiv.querySelector('.chatbot-bubble-content').textContent = message;
        } else {
            messageDiv.innerHTML = `
                <div class="chatbot-msg-row">
                    <div class="chatbot-msg-avatar chatbot-msg-avatar--bot"><i class="fas fa-hard-hat" aria-hidden="true"></i></div>
                    <div class="chatbot-bubble chatbot-bubble--bot">
                        <div class="chatbot-bubble-content"></div>
                    </div>
                </div>`;
            messageDiv.querySelector('.chatbot-bubble-content').innerHTML = message;
            bindServiceItems(messageDiv);
        }

        chatbotBody.appendChild(messageDiv);
        scrollToBottom();
        return messageDiv;
    }

    function addUserMessage(message) {
        addMessage(message, 'user');
    }

    function addBotMessage(message, delay = 900) {
        const typingIndicator = addMessage('', 'typing');

        setTimeout(() => {
            chatbotBody.removeChild(typingIndicator);
            addMessage(message, 'bot');
        }, delay);
    }

    function updateOptions(options) {
        chatbotOptions.innerHTML = '';
        options.forEach((option) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'chatbot-option';
            button.innerHTML = `<i class="fas ${optionIcon(option)}" aria-hidden="true"></i><span>${option}</span>`;
            button.addEventListener('click', () => handleUserInput(option));
            chatbotOptions.appendChild(button);
        });
    }

    function scrollToBottom() {
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }

    window.handleServiceClick = function(serviceTitle) {
        addUserMessage(serviceTitle);
        const service = companyInfo.services.find((s) => s.title === serviceTitle);
        if (service && knowledgeBase[service.key]) {
            showBotResponse(service.key);
        } else {
            showBotResponse('default');
        }
    };

    function normalizeResponseKey(optionText) {
        const key = optionText.toLowerCase();
        const map = {
            'our services': 'services',
            'service information': 'services',
            'current projects': 'projects',
            'project inquiry': 'quote',
            'contact executive': 'contact',
            'contact details': 'contact',
        };
        return map[key] || key;
    }

    function handleUserInput(input) {
        addUserMessage(input);
        chatbotInput.value = '';

        chatbotOptions.style.display = 'none';

        setTimeout(() => {
            const inputLower = input.toLowerCase();
            let responseKey = 'default';

            if (inputLower.includes('hi') || inputLower.includes('hello')) responseKey = 'greeting';
            else if (inputLower.includes('thank')) responseKey = 'thank you';
            else if (inputLower.includes('about') || inputLower.includes('company') || inputLower.includes('who are you')) responseKey = 'about';
            else if (inputLower.includes('contact') || inputLower.includes('call') || inputLower.includes('email') || inputLower.includes('address')) responseKey = 'contact';
            else if (inputLower.includes('service') || inputLower.includes('offer') || inputLower.includes('what do you do') || input === 'Our Services' || input === 'Service Information') responseKey = 'services';
            else if (inputLower.includes('trenchless') || inputLower.includes('hdd') || inputLower.includes('horizontal directional drilling')) responseKey = 'trenchless technology';
            else if (
                inputLower.includes('building') ||
                (inputLower.includes('construction') && !inputLower.includes('trenchless')) ||
                inputLower.includes('residential') ||
                inputLower.includes('commercial')
            ) {
                responseKey = 'building construction';
            }
            else if (inputLower.includes('road') || inputLower.includes('highway') || inputLower.includes('asphalt') || inputLower.includes('paving')) responseKey = 'road construction';
            else if (inputLower.includes('infrastructure') || inputLower.includes('sewage') || inputLower.includes('utility')) responseKey = 'infrastructure development';
            else if (inputLower.includes('renovation') || inputLower.includes('maintenance') || inputLower.includes('repair')) responseKey = 'renovation & maintenance';
            else if (inputLower.includes('project') || input === 'Current Projects') responseKey = 'projects';
            else if (inputLower.includes('quote') || inputLower.includes('price') || inputLower.includes('cost') || input === 'Request a Quote') responseKey = 'quote';
            else if (inputLower.includes('business') || inputLower.includes('gcc')) responseKey = 'business';
            else if (inputLower.includes('time') || inputLower.includes('duration') || inputLower.includes('how long')) responseKey = 'timeline';
            else if (inputLower.includes('executive')) responseKey = 'contact';
            else {
                const nk = normalizeResponseKey(input);
                if (knowledgeBase[nk]) responseKey = nk;
            }

            showBotResponse(responseKey);
        }, 280);
    }

    function showBotResponse(responseKey) {
        const response = knowledgeBase[responseKey] || knowledgeBase.default;
        const responseMessage = response.custom ? response.custom() : response.response;

        addBotMessage(responseMessage);

        setTimeout(() => {
            updateOptions(response.options);
            chatbotOptions.style.display = 'flex';

            if (response.followUp) {
                setTimeout(() => addBotMessage(response.followUp), 600);
            }
        }, 950);
    }

    function initChatbot() {
        chatbotBody.innerHTML = '';
        chatbotOptions.innerHTML = '';
        chatbotOptions.style.display = 'none';
        setTimeout(() => {
            addBotMessage(knowledgeBase.greeting.response, 380);
            setTimeout(() => {
                updateOptions(knowledgeBase.greeting.options);
                chatbotOptions.style.display = 'flex';
            }, 880);
        }, 120);
    }

    chatbotToggle.addEventListener('click', () => {
        setChatOpen(!chatbotContainer.classList.contains('active'));
    });

    chatbotClose.addEventListener('click', () => setChatOpen(false));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatbotContainer.classList.contains('active')) {
            setChatOpen(false);
        }
    });

    chatbotSend.addEventListener('click', () => {
        const message = chatbotInput.value.trim();
        if (message) handleUserInput(message);
    });

    chatbotInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const message = chatbotInput.value.trim();
            if (message) handleUserInput(message);
        }
    });

    initChatbot();
});
