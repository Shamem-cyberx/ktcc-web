document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotBody = document.getElementById('chatbotBody');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotOptions = document.getElementById('chatbotOptions');
    
    // Company Information
    const companyInfo = {
        name: "KTCC W.L.L",
        phone: "+973 35034495",
        whatsapp: "+973 35034495",
        email: "info@ktccgulf.com",
        address: "Flat No. 0, Building No. 194, Road No. 84, Block No. 903, Riffa, Bahrain",
        workingHours: "Sunday to Thursday, 8:00 AM - 5:00 PM",
        services: [
            {
                title: "Trenchless Technology",
                description: "Horizontal Directional Drilling (HDD) and other no-dig solutions for underground utilities.",
                key: "trenchless technology"
            },
            {
                title: "Building Construction",
                description: "Commercial and residential buildings with modern designs and high-quality materials.",
                key: "building construction"
            },
            {
                title: "Road Construction",
                description: "Highway, bridge, and urban road construction with durable materials.",
                key: "road construction"
            },
            {
                title: "Infrastructure Development",
                description: "Water, sewage, and electrical infrastructure projects.",
                key: "infrastructure development"
            },
            {
                title: "Renovation & Maintenance",
                description: "Building renovations, repairs, and ongoing maintenance services.",
                key: "renovation & maintenance"
            }
        ]
    };

    // Chatbot Knowledge Base
    const knowledgeBase = {
        // General
        "greeting": {
            response: `Welcome to ${companyInfo.name}! How can I assist you with your construction needs today?`,
            options: ["Request a Quote", "Our Services", "Contact Executive"]
        },
        "thank you": {
            response: "You're welcome! Is there anything else related to your construction project I can help with?",
            options: ["Request a Quote", "Our Services", "Contact Details"]
        },
        
        // Company Information
        "about": {
            response: `${companyInfo.name} is a leading construction contracting company in Bahrain specializing in:<br><br>
            <ul>
                <li>Trenchless Technology (HDD)</li>
                <li>Building Construction</li>
                <li>Road & Infrastructure</li>
                <li>Commercial Projects</li>
            </ul>
            <br>With extensive experience in the GCC region, we deliver quality projects on time and within budget.`,
            options: ["Our Services", "Contact Executive"]
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
            options: ["Request a Quote", "Contact Executive"],
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
        "trenchless technology": {
            response: `Our <strong>Trenchless Technology</strong> services provide innovative solutions for underground infrastructure with minimal surface disruption:<br><br>
            <ul>
                <li>Horizontal Directional Drilling (HDD) for pipelines up to 48" diameter</li>
                <li>Pipe jacking and microtunneling for precise installations</li>
                <li>Pipe bursting and rehabilitation for existing utilities</li>
                <li>Utility installation beneath roads and structures</li>
            </ul>
            <br>Benefits of our trenchless solutions:
            <ul>
                <li>Minimal environmental impact</li>
                <li>Reduced project timelines</li>
                <li>Lower overall costs</li>
                <li>Preservation of existing landscapes</li>
            </ul>`,
            options: ["Request a Quote", "Other Services", "Contact Executive"]
        },
        "building construction": {
            response: `Our <strong>Building Construction</strong> services deliver high-quality structures tailored to client needs:<br><br>
            <ul>
                <li>Commercial buildings (offices, malls, hotels)</li>
                <li>Residential complexes (villas, apartments)</li>
                <li>Industrial facilities (warehouses, factories)</li>
                <li>Complete project management from design to completion</li>
            </ul>
            <br>We ensure:
            <ul>
                <li>Compliance with Bahraini building codes</li>
                <li>Use of premium materials</li>
                <li>Strict quality control measures</li>
                <li>Timely project delivery</li>
            </ul>`,
            options: ["Request a Quote", "Other Services", "Contact Executive"]
        },
        "road construction": {
            response: `Our <strong>Road Construction</strong> expertise delivers durable transportation infrastructure:<br><br>
            <ul>
                <li>Highway construction and expansion projects</li>
                <li>Urban road networks and intersections</li>
                <li>Bridge and overpass construction</li>
                <li>Paving and asphalt works using modern techniques</li>
            </ul>
            <br>Key features:
            <ul>
                <li>Designed for Bahrain's climate conditions</li>
                <li>Heavy-duty construction for long lifespan</li>
                <li>Efficient drainage systems</li>
                <li>Safety-focused designs</li>
            </ul>`,
            options: ["Request a Quote", "Other Services", "Contact Executive"]
        },
        "infrastructure development": {
            response: `Our <strong>Infrastructure Development</strong> services build the foundations for modern communities:<br><br>
            <ul>
                <li>Water supply and sewage systems</li>
                <li>Electrical infrastructure and substations</li>
                <li>Drainage and flood control systems</li>
                <li>Public utility projects and networks</li>
            </ul>
            <br>Our approach ensures:
            <ul>
                <li>Integration with existing systems</li>
                <li>Future-proof designs</li>
                <li>Efficient resource management</li>
                <li>Compliance with municipal requirements</li>
            </ul>`,
            options: ["Request a Quote", "Other Services", "Contact Executive"]
        },
        "renovation & maintenance": {
            response: `Our <strong>Renovation & Maintenance</strong> services preserve and enhance existing structures:<br><br>
            <ul>
                <li>Building renovations and upgrades</li>
                <li>Structural repairs and reinforcements</li>
                <li>Facade restoration and modernization</li>
                <li>Preventive maintenance programs</li>
            </ul>
            <br>We provide:
            <ul>
                <li>Minimal disruption to operations</li>
                <li>Historic preservation expertise</li>
                <li>Energy efficiency improvements</li>
                <li>Cost-effective maintenance solutions</li>
            </ul>`,
            options: ["Request a Quote", "Other Services", "Contact Executive"]
        },
        
        // Projects
        "projects": {
            response: "We're currently engaged in several exciting projects across Bahrain. For specific inquiries about our current work, please contact our project management team who would be happy to provide details.",
            options: ["Request a Quote", "Our Services", "Contact Executive"]
        },
        
        // Quotes and Business
        "quote": {
            response: `To provide you with an accurate quote for your project, we typically require:<br><br>
            <ol>
                <li>Project type and scope details</li>
                <li>Site location and conditions</li>
                <li>Technical specifications (if available)</li>
                <li>Desired timeline and completion date</li>
            </ol>
            <br>Our estimating team can prepare a comprehensive proposal based on your requirements.`,
            options: ["Contact Executive", "Our Services"],
            followUp: "Would you like to discuss your project requirements now or have our team contact you?"
        },
        "business": {
            response: `As a leading Bahraini construction company, ${companyInfo.name} offers:<br><br>
            <ul>
                <li>Proven track record with government and private sector clients</li>
                <li>Comprehensive construction solutions</li>
                <li>Technical expertise in specialized areas</li>
                <li>Commitment to quality and safety standards</li>
            </ul>
            <br>Our competitive advantages include local market knowledge, international best practices, and strong supplier relationships.`,
            options: ["Request a Quote", "Our Services"]
        },
        "timeline": {
            response: `Project timelines are determined by several factors:<br><br>
            <ul>
                <li>Project complexity and scale</li>
                <li>Site conditions and accessibility</li>
                <li>Approval processes and permits</li>
                <li>Material availability and lead times</li>
            </ul>
            <br>For specific projects, we develop detailed schedules during the planning phase and provide regular progress updates.`,
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
    window.handleServiceClick = function(serviceTitle) {
        addUserMessage(serviceTitle);
        
        // Find the service by title to get its key
        const service = companyInfo.services.find(s => s.title === serviceTitle);
        if (service && knowledgeBase[service.key]) {
            showBotResponse(service.key);
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
            else if (inputLower.includes('trenchless') || inputLower.includes('hdd') || inputLower.includes('horizontal directional drilling')) {
                responseKey = 'trenchless technology';
            }
            else if (inputLower.includes('building') || inputLower.includes('construction') || inputLower.includes('residential') || inputLower.includes('commercial')) {
                responseKey = 'building construction';
            }
            else if (inputLower.includes('road') || inputLower.includes('highway') || inputLower.includes('asphalt') || inputLower.includes('paving')) {
                responseKey = 'road construction';
            }
            else if (inputLower.includes('infrastructure') || inputLower.includes('sewage') || inputLower.includes('water') || inputLower.includes('electrical')) {
                responseKey = 'infrastructure development';
            }
            else if (inputLower.includes('renovation') || inputLower.includes('maintenance') || inputLower.includes('repair')) {
                responseKey = 'renovation & maintenance';
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