        document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const chatbotToggle = document.getElementById('chatbotToggle');
            const chatbotContainer = document.getElementById('chatbotContainer');
            const chatbotClose = document.getElementById('chatbotClose');
            const chatbotBody = document.getElementById('chatbotBody');
            const chatbotInput = document.getElementById('chatbotInput');
            const chatbotSend = document.getElementById('chatbotSend');
            const chatbotOptions = document.getElementById('chatbotOptions');
            
            // Company Information (Customize these for KTCC)
            const companyInfo = {
                name: "KTCC Construction",
                phone: "+973 35034495",
                whatsapp: "+973 35034495",
                email: "info@ktccgulf.com",
                address: "Flat No. 0, Building No. 194, Road No. 84, Block No. 903, Riffa, Bahrain",
                workingHours: "Sunday to Thursday, 8:00 AM - 5:00 PM",
                services: [
                    {
                        title: "Building Construction",
                        description: "Commercial and residential buildings with modern designs and high-quality materials."
                    },
                    {
                        title: "Road Construction",
                        description: "Highway, bridge, and urban road construction with durable materials."
                    },
                    {
                        title: "Infrastructure Development",
                        description: "Water, sewage, and electrical infrastructure projects."
                    },
                    {
                        title: "Renovation & Maintenance",
                        description: "Building renovations, repairs, and ongoing maintenance services."
                    }
                ],
                currentProjects: [
                    "Manama Downtown Commercial Complex",
                    "Bahrain Coastal Highway Expansion",
                    "Al Seef Residential Tower",
                    "Riffa Infrastructure Upgrade"
                ]
            };
            
            // Chatbot Knowledge Base
            const knowledgeBase = {
                // General
                "greeting": {
                    response: `Welcome to ${companyInfo.name}! How can I assist you with your construction needs today?`,
                    options: ["Request a Quote", "Our Services", "Current Projects", "Contact Executive"]
                },
                "thank you": {
                    response: "You're welcome! Is there anything else related to your construction project I can help with?",
                    options: ["Request a Quote", "Our Services", "Contact Details"]
                },
                
                // Company Information
                "about": {
                    response: `${companyInfo.name} is a leading construction contracting company in the Middle East specializing in:<br><br>
                    <ul>
                        <li>Building Construction</li>
                        <li>Road & Infrastructure</li>
                        <li>Commercial Projects</li>
                        <li>Government Contracts</li>
                    </ul>
                    <br>With over 15 years of experience in the GCC region, we deliver quality projects on time and within budget.`,
                    options: ["Our Services", "Current Projects", "Contact Executive"]
                },
                "contact": {
                    response: `You can reach ${companyInfo.name} through:<br><br>
                    <strong><i class="fas fa-phone"></i> Phone:</strong> ${companyInfo.phone}<br>
                    <strong><i class="fab fa-whatsapp"></i> WhatsApp:</strong> ${companyInfo.whatsapp}<br>
                    <strong><i class="fas fa-envelope"></i> Email:</strong> ${companyInfo.email}<br>
                    <strong><i class="fas fa-map-marker-alt"></i> Address:</strong> ${companyInfo.address}<br><br>
                    <strong>Working Hours:</strong> ${companyInfo.workingHours}<br><br>
                    <a href="https://wa.me/${companyInfo.whatsapp}" class="quick-action-btn whatsapp" target="_blank">
                        <i class="fab fa-whatsapp"></i> Chat on WhatsApp
                    </a>
                    <a href="tel:${companyInfo.phone}" class="quick-action-btn call">
                        <i class="fas fa-phone"></i> Call Now
                    </a>`,
                    options: ["Request a Quote", "Our Services"]
                },
                
                // Services
                "services": {
                    response: `${companyInfo.name} offers comprehensive construction services including:`,
                    options: ["Request a Quote", "Current Projects", "Contact Executive"],
                    custom: function() {
                        let servicesHTML = `${this.response}<br><br>`;
                        companyInfo.services.forEach(service => {
                            servicesHTML += `
                                <div class="service-item" onclick="handleServiceClick('${service.title}')">
                                    <h5>${service.title}</h5>
                                    <p>${service.description}</p>
                                </div>
                            `;
                        });
                        return servicesHTML;
                    }
                },
                "building construction": {
                    response: `Our <strong>Building Construction</strong> service includes:<br><br>
                    <ul>
                        <li>Commercial buildings (offices, malls, hotels)</li>
                        <li>Residential complexes (villas, apartments)</li>
                        <li>Industrial facilities (warehouses, factories)</li>
                        <li>Complete project management</li>
                    </ul>
                    <br>We use high-quality materials and modern construction techniques to ensure durability and compliance with local regulations.`,
                    options: ["Request a Quote", "Other Services", "Contact Executive"]
                },
                "road construction": {
                    response: `Our <strong>Road Construction</strong> expertise covers:<br><br>
                    <ul>
                        <li>Highway construction and expansion</li>
                        <li>Urban road networks</li>
                        <li>Bridge and overpass construction</li>
                        <li>Paving and asphalt works</li>
                    </ul>
                    <br>We specialize in durable road construction that withstands the region's climate conditions.`,
                    options: ["Request a Quote", "Other Services", "Contact Executive"]
                },
                "infrastructure": {
                    response: `Our <strong>Infrastructure Development</strong> services include:<br><br>
                    <ul>
                        <li>Water and sewage systems</li>
                        <li>Electrical infrastructure</li>
                        <li>Drainage and flood control</li>
                        <li>Public utility projects</li>
                    </ul>
                    <br>We work closely with government entities to deliver critical infrastructure projects.`,
                    options: ["Request a Quote", "Other Services", "Contact Executive"]
                },
                
                // Projects
                "projects": {
                    response: `We're currently working on several major projects in the region:<br><br>
                    <ul>${companyInfo.currentProjects.map(project => `<li>${project}</li>`).join('')}</ul>
                    <br>Would you like information about any specific project?`,
                    options: ["Request a Quote", "Our Services", "Contact Executive"]
                },
                
                // Quotes and Business
                "quote": {
                    response: `To provide you with an accurate quote, we'll need:<br><br>
                    <ol>
                        <li>Project type (building, road, etc.)</li>
                        <li>Approximate size/scope</li>
                        <li>Location</li>
                        <li>Timeline requirements</li>
                    </ol>
                    <br>You can share these details now or our project manager can contact you for a consultation.`,
                    options: ["Contact Executive", "Our Services"],
                    followUp: "Would you like to provide project details now or have someone contact you?"
                },
                "business": {
                    response: `In the Middle East construction market, ${companyInfo.name} specializes in:<br><br>
                    <ul>
                        <li>Government and private sector contracts</li>
                        <li>Turnkey construction solutions</li>
                        <li>Design-build projects</li>
                        <li>Public-private partnerships</li>
                    </ul>
                    <br>Our competitive advantages include local expertise, international standards, and strong supplier relationships.`,
                    options: ["Request a Quote", "Our Services", "Current Projects"]
                },
                "timeline": {
                    response: `Project timelines vary based on:<br><br>
                    <ul>
                        <li>Project scope and complexity</li>
                        <li>Approval processes</li>
                        <li>Weather conditions</li>
                        <li>Material availability</li>
                    </ul>
                    <br>For a specific project, our team can provide a detailed schedule during the planning phase.`,
                    options: ["Request a Quote", "Contact Executive"]
                },
                
                // Default
                "default": {
                    response: "I'm not sure I understand your construction-related question. Could you rephrase or choose from these options?",
                    options: ["Request a Quote", "Our Services", "Contact Executive"]
                }
            };
            
            // Initialize Chatbot
            function initChatbot() {
                // Start with greeting
                setTimeout(() => {
                    addBotMessage(knowledgeBase["greeting"].response);
                    updateOptions(knowledgeBase["greeting"].options);
                }, 500);
            }
            
            // Toggle Chatbot Visibility
            chatbotToggle.addEventListener('click', function() {
                chatbotContainer.classList.toggle('active');
                this.classList.remove('pulse');
            });
            
            chatbotClose.addEventListener('click', function() {
                chatbotContainer.classList.remove('active');
            });
            
            // Add Message to Chat
            function addMessage(message, type) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `chatbot-message ${type}`;
                
                if (type === 'typing') {
                    messageDiv.innerHTML = `
                        <div class="typing-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    `;
                } else {
                    messageDiv.innerHTML = `<p>${message}</p>`;
                }
                
                chatbotBody.appendChild(messageDiv);
                scrollToBottom();
                
                return messageDiv;
            }
            
            // Add User Message
            function addUserMessage(message) {
                addMessage(message, 'user');
            }
            
            // Add Bot Message with Typing Indicator
            function addBotMessage(message, delay = 1000) {
                // Show typing indicator
                const typingIndicator = addMessage('', 'typing');
                
                // Remove typing indicator and show actual message after delay
                setTimeout(() => {
                    chatbotBody.removeChild(typingIndicator);
                    const messageDiv = addMessage(message, 'bot');
                    
                    // Highlight any quick action buttons
                    setTimeout(() => {
                        const buttons = messageDiv.querySelectorAll('.quick-action-btn');
                        buttons.forEach(btn => {
                            btn.style.opacity = '1';
                            btn.style.transform = 'translateY(0)';
                        });
                    }, 100);
                }, delay);
            }
            
            // Update Quick Options
            function updateOptions(options) {
                chatbotOptions.innerHTML = '';
                options.forEach(option => {
                    const button = document.createElement('button');
                    button.className = 'chatbot-option';
                    button.textContent = option;
                    button.addEventListener('click', function() {
                        handleUserInput(option);
                    });
                    chatbotOptions.appendChild(button);
                });
            }
            
            // Scroll to Bottom of Chat
            function scrollToBottom() {
                chatbotBody.scrollTop = chatbotBody.scrollHeight;
            }
            
            // Handle Service Item Click
            window.handleServiceClick = function(service) {
                addUserMessage(service);
                const serviceKey = service.toLowerCase().replace(/ /g, '');
                if (knowledgeBase[serviceKey]) {
                    showBotResponse(serviceKey);
                } else {
                    showBotResponse('default');
                }
            }
            
            // Process User Input
            function handleUserInput(input) {
                addUserMessage(input);
                chatbotInput.value = '';
                
                // Hide options while processing
                chatbotOptions.style.display = 'none';
                
                // Process after short delay
                setTimeout(() => {
                    const inputLower = input.toLowerCase();
                    let responseKey = 'default';
                    
                    // Check for specific keywords
                    if (inputLower.includes('hi') || inputLower.includes('hello')) {
                        responseKey = 'greeting';
                    } 
                    else if (inputLower.includes('thank')) {
                        responseKey = 'thank you';
                    }
                    else if (inputLower.includes('about') || inputLower.includes('company') || inputLower.includes('who are you')) {
                        responseKey = 'about';
                    }
                    else if (inputLower.includes('contact') || inputLower.includes('call') || inputLower.includes('email') || inputLower.includes('address')) {
                        responseKey = 'contact';
                    }
                    else if (inputLower.includes('service') || inputLower.includes('offer') || inputLower.includes('what do you do') || input === 'Our Services') {
                        responseKey = 'services';
                    }
                    else if (inputLower.includes('building') || inputLower.includes('construction') || inputLower.includes('residential') || inputLower.includes('commercial')) {
                        responseKey = 'building construction';
                    }
                    else if (inputLower.includes('road') || inputLower.includes('highway') || inputLower.includes('asphalt') || inputLower.includes('paving')) {
                        responseKey = 'road construction';
                    }
                    else if (inputLower.includes('infrastructure') || inputLower.includes('sewage') || inputLower.includes('water') || inputLower.includes('electrical')) {
                        responseKey = 'infrastructure';
                    }
                    else if (inputLower.includes('project') || inputLower.includes('current') || inputLower.includes('ongoing') || input === 'Current Projects') {
                        responseKey = 'projects';
                    }
                    else if (inputLower.includes('quote') || inputLower.includes('price') || inputLower.includes('cost') || input === 'Request a Quote') {
                        responseKey = 'quote';
                    }
                    else if (inputLower.includes('business') || inputLower.includes('market') || inputLower.includes('middle east') || inputLower.includes('gcc')) {
                        responseKey = 'business';
                    }
                    else if (inputLower.includes('time') || inputLower.includes('duration') || inputLower.includes('how long') || inputLower.includes('schedule')) {
                        responseKey = 'timeline';
                    }
                    else if (inputLower.includes('executive') || inputLower.includes('manager') || inputLower.includes('representative') || input === 'Contact Executive') {
                        responseKey = 'contact';
                    }
                    
                    showBotResponse(responseKey);
                }, 300);
            }
            
            // Show Bot Response
            function showBotResponse(responseKey) {
                const response = knowledgeBase[responseKey] || knowledgeBase['default'];
                
                // Check if response has custom function
                const responseMessage = response.custom ? response.custom() : response.response;
                
                // Show bot response
                addBotMessage(responseMessage);
                
                // Update options after response
                setTimeout(() => {
                    updateOptions(response.options);
                    chatbotOptions.style.display = 'flex';
                    
                    // Show follow-up if exists
                    if (response.followUp) {
                        setTimeout(() => {
                            addBotMessage(response.followUp);
                        }, 800);
                    }
                }, 1000);
            }
            
            // Handle Send Button Click
            chatbotSend.addEventListener('click', function() {
                const message = chatbotInput.value.trim();
                if (message) {
                    handleUserInput(message);
                }
            });
            
            // Handle Enter Key
            chatbotInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const message = chatbotInput.value.trim();
                    if (message) {
                        handleUserInput(message);
                    }
                }
            });
            
            // Initialize the chatbot
            initChatbot();
        });