// Demo functionality for interactive AI agent
document.addEventListener('DOMContentLoaded', function() {
    initDemoInterface();
    initChatInterface();
    initAgentConfiguration();
});

// Demo interface initialization
function initDemoInterface() {
    const testAgentBtn = document.getElementById('test-agent');
    if (testAgentBtn) {
        testAgentBtn.addEventListener('click', configureAndTestAgent);
    }
    
    // Initialize chat interface
    const sendBtn = document.getElementById('send-message');
    const userInput = document.getElementById('user-input');
    
    if (sendBtn && userInput) {
        sendBtn.addEventListener('click', () => sendMessage());
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// Agent configuration
function initAgentConfiguration() {
    const configInputs = document.querySelectorAll('#agent-name, #agent-tone, #agent-purpose, #ai-model');
    
    configInputs.forEach(input => {
        input.addEventListener('change', updateAgentPreview);
    });
}

function updateAgentPreview() {
    const agentName = document.getElementById('agent-name').value;
    const agentTone = document.getElementById('agent-tone').value;
    const agentPurpose = document.getElementById('agent-purpose').value;
    const aiModel = document.getElementById('ai-model').value;
    
    // Update the chat header with agent name
    const chatHeader = document.querySelector('.demo-chat-header h3');
    if (chatHeader && agentName) {
        chatHeader.textContent = agentName;
    }
    
    // Update model indicator
    updateModelIndicator(aiModel);
    
    // Store configuration for use in responses
    window.agentConfig = {
        name: agentName || 'AI Assistant',
        tone: agentTone,
        purpose: agentPurpose,
        model: aiModel
    };
}

function configureAndTestAgent() {
    const testBtn = document.getElementById('test-agent');
    
    // Show loading state
    testBtn.classList.add('loading');
    testBtn.disabled = true;
    
    // Update agent configuration
    updateAgentPreview();
    
    // Simulate agent configuration
    setTimeout(() => {
        testBtn.classList.remove('loading');
        testBtn.disabled = false;
        
        // Show success message
        showToast('Agent configured successfully!', 'success');
        
        // Add initial message from configured agent
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) {
            const welcomeMessage = generateWelcomeMessage();
            addChatMessage('bot', welcomeMessage);
        }
        
        // Focus on input
        const userInput = document.getElementById('user-input');
        if (userInput) {
            userInput.focus();
        }
    }, 1500);
}

function generateWelcomeMessage() {
    const config = window.agentConfig || {};
    const purposeMessages = {
        'support': 'Hello! I\'m your customer support assistant. How can I help you today?',
        'sales': 'Hi there! I\'m your sales assistant. Are you looking for information about our products?',
        'info': 'Welcome! I\'m your information provider. What would you like to know?'
    };
    
    const toneModifiers = {
        'professional': '',
        'friendly': ' 😊',
        'casual': ' Hey!'
    };
    
    let message = purposeMessages[config.purpose] || purposeMessages['support'];
    message += toneModifiers[config.tone] || '';
    
    return message;
}

// Chat interface functionality
function initChatInterface() {
    // Initialize with welcome message
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages && chatMessages.children.length === 1) {
        // Add typing indicator effect
        setTimeout(() => {
            addTypingIndicator();
            setTimeout(() => {
                removeTypingIndicator();
                addChatMessage('bot', 'Hello! I\'m your AI assistant. How can I help you today?');
            }, 1500);
        }, 500);
    }
}

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage('user', message);
    
    // Clear input
    userInput.value = '';
    
    // Show typing indicator
    addTypingIndicator();
    
    // Generate and add bot response
    setTimeout(() => {
        removeTypingIndicator();
        const botResponse = generateBotResponse(message);
        addChatMessage('bot', botResponse);
    }, 1000 + Math.random() * 1000);
}

function addChatMessage(sender, message) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const messageP = document.createElement('p');
    messageP.textContent = message;
    
    messageDiv.appendChild(messageP);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add animation
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(10px)';
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 100);
}

function addTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot typing-indicator';
    typingDiv.innerHTML = `
        <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function generateBotResponse(userMessage) {
    const config = window.agentConfig || {};
    const message = userMessage.toLowerCase();
    
    // Get model-specific response characteristics
    const modelCharacteristics = getModelCharacteristics(config.model);
    
    // Response templates based on purpose
    const responses = {
        'support': {
            greetings: modelCharacteristics.greetings.support,
            help: modelCharacteristics.responses.support,
            technical: modelCharacteristics.technical.support,
            default: modelCharacteristics.default.support
        },
        'sales': {
            greetings: modelCharacteristics.greetings.sales,
            pricing: modelCharacteristics.responses.sales,
            features: modelCharacteristics.features.sales,
            default: modelCharacteristics.default.sales
        },
        'info': {
            greetings: modelCharacteristics.greetings.info,
            general: modelCharacteristics.responses.info,
            default: modelCharacteristics.default.info
        }
    };
    
    const purposeResponses = responses[config.purpose] || responses['support'];
    
    // Tone adjustments
    const toneAdjustments = {
        'professional': {
            prefix: '',
            suffix: '',
            formal: true
        },
        'friendly': {
            prefix: '',
            suffix: ' 😊',
            formal: false
        },
        'casual': {
            prefix: 'Hey! ',
            suffix: '!',
            formal: false
        }
    };
    
    const tone = toneAdjustments[config.tone] || toneAdjustments['professional'];
    
    // Generate response based on message content
    let response = '';
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        response = purposeResponses.greetings[Math.floor(Math.random() * purposeResponses.greetings.length)];
    } else if (message.includes('help') || message.includes('issue') || message.includes('problem')) {
        response = purposeResponses.help[Math.floor(Math.random() * purposeResponses.help.length)];
    } else if (message.includes('price') || message.includes('cost') || message.includes('pricing')) {
        response = purposeResponses.pricing ? purposeResponses.pricing[Math.floor(Math.random() * purposeResponses.pricing.length)] : purposeResponses.default[0];
    } else if (message.includes('feature') || message.includes('capability') || message.includes('what can')) {
        response = purposeResponses.features ? purposeResponses.features[Math.floor(Math.random() * purposeResponses.features.length)] : purposeResponses.default[0];
    } else if (message.includes('technical') || message.includes('error') || message.includes('bug')) {
        response = purposeResponses.technical ? purposeResponses.technical[Math.floor(Math.random() * purposeResponses.technical.length)] : purposeResponses.default[0];
    } else {
        response = purposeResponses.default[Math.floor(Math.random() * purposeResponses.default.length)];
    }
    
    // Apply tone adjustments
    response = tone.prefix + response + tone.suffix;
    
    // Add model-specific signature
    if (modelCharacteristics.signature) {
        response += modelCharacteristics.signature;
    }
    
    // Add contextual follow-up questions
    const followUps = modelCharacteristics.followUps;
    
    if (Math.random() > 0.5) {
        response += followUps[Math.floor(Math.random() * followUps.length)];
    }
    
    return response;
}

// Demo analytics simulation
function trackDemoInteraction(action, data) {
    // Simulate analytics tracking
    console.log('Demo Interaction:', action, data);
    
    // In a real implementation, this would send to an analytics service
    const analyticsData = {
        action: action,
        data: data,
        timestamp: new Date().toISOString(),
        sessionId: generateSessionId()
    };
    
    // Store in localStorage for demo purposes
    const demoAnalytics = JSON.parse(localStorage.getItem('demoAnalytics') || '[]');
    demoAnalytics.push(analyticsData);
    localStorage.setItem('demoAnalytics', JSON.stringify(demoAnalytics));
}

function generateSessionId() {
    return 'demo_' + Math.random().toString(36).substr(2, 9);
}

// Enhanced demo features
function initAdvancedDemoFeatures() {
    // Add conversation history
    const conversationHistory = [];
    
    // Add sentiment analysis simulation
    function analyzeSentiment(message) {
        const positiveWords = ['great', 'awesome', 'excellent', 'good', 'love', 'amazing', 'wonderful'];
        const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'horrible', 'worst'];
        
        const words = message.toLowerCase().split(' ');
        let positiveScore = 0;
        let negativeScore = 0;
        
        words.forEach(word => {
            if (positiveWords.includes(word)) positiveScore++;
            if (negativeWords.includes(word)) negativeScore++;
        });
        
        if (positiveScore > negativeScore) return 'positive';
        if (negativeScore > positiveScore) return 'negative';
        return 'neutral';
    }
    
    // Add smart suggestions
    function generateSmartSuggestions(context) {
        const suggestions = {
            'support': [
                'Check our documentation',
                'Contact support team',
                'View troubleshooting guide'
            ],
            'sales': [
                'Schedule a demo',
                'See pricing plans',
                'View case studies'
            ],
            'info': [
                'Read our blog',
                'View tutorials',
                'Check FAQ'
            ]
        };
        
        const config = window.agentConfig || {};
        return suggestions[config.purpose] || suggestions['support'];
    }
    
    // Expose advanced functions for demo
    window.demoFeatures = {
        analyzeSentiment,
        generateSmartSuggestions,
        trackDemoInteraction
    };
}

// Model characteristics based on different AI models
function getModelCharacteristics(model) {
    const models = {
        'gpt-4': {
            greetings: {
                support: ['Hello! I\'m GPT-4 powered. How can I assist you today?', 'Hi! I\'m powered by GPT-4. What can I help you with?'],
                sales: ['Welcome! I\'m a GPT-4 agent. Are you interested in learning about our AI platform?', 'Hello! As a GPT-4 assistant, I\'d love to tell you about our solutions.'],
                info: ['Hello! I\'m powered by GPT-4. What information can I provide for you today?', 'Hi! I\'m a GPT-4 information provider. I\'m here to answer your questions.']
            },
            responses: {
                support: ['I\'m GPT-4 enhanced and here to help! Could you provide more details about your issue?', 'With GPT-4 capabilities, I\'d be happy to help. What seems to be the problem?'],
                sales: ['Leveraging GPT-4, I can show you flexible pricing plans starting at $29/month. Would you like me to explain the features?', 'With GPT-4 intelligence, our pricing is designed to scale with your needs. Can I tell you about our different plans?'],
                info: ['As a GPT-4 assistant, that\'s a great question! Let me provide you with accurate information.', 'Powered by GPT-4, I can help you with that. Here\'s what you need to know:']
            },
            technical: {
                support: ['With GPT-4\'s advanced reasoning, let me help you with that technical issue. Have you tried restarting the service?', 'GPT-4 enhanced analysis shows you\'re experiencing a technical problem. Let me guide you through troubleshooting steps.']
            },
            features: {
                sales: ['Our GPT-4 platform includes visual agent building, multi-channel deployment, and advanced analytics. What interests you most?', 'You\'ll love our GPT-4 powered drag-and-drop interface and powerful AI training tools.']
            },
            default: {
                support: ['Thank you for your message. My GPT-4 capabilities will ensure your request is handled efficiently.', 'I\'ve received your request and GPT-4 processing is working on finding the best solution for you.'],
                sales: ['With GPT-4 assistance, I\'d be happy to discuss how our platform can help your business.', 'Let me connect you with our sales team for GPT-4 enhanced personalized assistance.'],
                info: ['I\'m here to help with GPT-4 accuracy! Could you please clarify what information you\'re looking for?', 'Let me use GPT-4 to find the best information for your request.']
            },
            followUps: [' Is there anything else I can assist you with?', ' Would you like more information about this?', ' How else can I help you today?'],
            signature: ' 🤖'
        },
        'claude-3': {
            greetings: {
                support: ['Hello! I\'m Claude 3 and I\'m here to help. How can I assist you today?', 'Hi! As Claude 3, what can I help you with?'],
                sales: ['Welcome! I\'m powered by Claude 3. Are you interested in learning about our AI platform?', 'Hello! I\'m a Claude 3 assistant. I\'d love to tell you about our solutions.'],
                info: ['Hello! I\'m Claude 3. What information can I provide for you today?', 'Hi! I\'m Claude 3 and I\'m here to answer your questions.']
            },
            responses: {
                support: ['As Claude 3, I\'m designed to be helpful and harmless. Could you provide more details about your issue?', 'Claude 3 enables me to understand your needs better. What seems to be the problem?'],
                sales: ['With Claude 3\'s thoughtful analysis, I can show you flexible pricing plans starting at $29/month. Would you like me to explain the features?', 'Claude 3 helps me provide clear explanations. Our pricing is designed to scale with your needs. Can I tell you about our different plans?'],
                info: ['Claude 3 allows me to provide thoughtful, accurate information. That\'s a great question! Let me help.', 'Powered by Claude 3, I can provide comprehensive assistance. What would you like to know?']
            },
            technical: {
                support: ['Claude 3 helps me provide careful, step-by-step technical assistance. Let me help you with that issue. Have you tried restarting the service?', 'With Claude 3\'s analytical capabilities, I understand you\'re experiencing a technical problem. Let me guide you through troubleshooting steps.']
            },
            features: {
                sales: ['Our Claude 3 platform includes visual agent building, multi-channel deployment, and thoughtful analytics. What interests you most?', 'You\'ll appreciate Claude 3\'s careful approach in our drag-and-drop interface and powerful AI training tools.']
            },
            default: {
                support: ['Thank you for your message. Claude 3\'s constitutional AI principles ensure I\'ll handle your request responsibly.', 'I\'ve received your request and Claude 3 helps me find the most thoughtful solution for you.'],
                sales: ['With Claude 3 assistance, I\'d be happy to discuss how our platform can help your business thoughtfully.', 'Let me connect you with our sales team for Claude 3 enhanced personalized assistance.'],
                info: ['I\'m here to help! Claude 3 ensures I provide accurate, thoughtful information. What would you like to know?', 'Let me use Claude 3 to find comprehensive information for your request.']
            },
            followUps: [' Is there anything else I can thoughtfully help you with?', ' Would you like more detailed information about this?', ' How else can I assist you today?'],
            signature: ' 🎭'
        },
        'llama-3': {
            greetings: {
                support: ['Hello! I\'m powered by Llama 3. How can I assist you today?', 'Hi! I\'m a Llama 3 agent. What can I help you with?'],
                sales: ['Welcome! Running on Llama 3, are you interested in learning about our AI platform?', 'Hello! I\'m a Llama 3 assistant. I\'d love to tell you about our solutions.'],
                info: ['Hello! I\'m Llama 3. What information can I provide for you today?', 'Hi! Powered by Llama 3, I\'m here to answer your questions.']
            },
            responses: {
                support: ['Llama 3 enables efficient assistance! Could you provide more details about your issue?', 'With Llama 3\'s open-source power, I\'d be happy to help. What seems to be the problem?'],
                sales: ['Llama 3 powers our flexible pricing plans starting at $29/month. Would you like me to explain the features?', 'Llama 3 helps our pricing scale with your needs. Can I tell you about our different plans?'],
                info: ['Llama 3 provides comprehensive knowledge. That\'s a great question! Let me help.', 'Powered by Llama 3, I can provide open-source backed information. What would you like to know?']
            },
            technical: {
                support: ['Llama 3\'s open-source nature helps me provide transparent technical assistance. Let me help you with that issue. Have you tried restarting the service?', 'With Llama 3 capabilities, I understand you\'re experiencing a technical problem. Let me guide you through troubleshooting steps.']
            },
            features: {
                sales: ['Our Llama 3 platform includes visual agent building, multi-channel deployment, and open analytics. What interests you most?', 'You\'ll love our Llama 3 powered drag-and-drop interface and transparent AI training tools.']
            },
            default: {
                support: ['Thank you for your message. Llama 3 ensures I\'ll handle your request efficiently.', 'I\'ve received your request and Llama 3 is processing to find the best solution for you.'],
                sales: ['With Llama 3 assistance, I\'d be happy to discuss how our platform can help your business.', 'Let me connect you with our sales team for Llama 3 enhanced personalized assistance.'],
                info: ['I\'m here to help! Llama 3 ensures I provide comprehensive information. What would you like to know?', 'Let me use Llama 3 to find thorough information for your request.']
            },
            followUps: [' Is there anything else I can efficiently help you with?', ' Would you like more open information about this?', ' How else can I assist you today?'],
            signature: ' 🦙'
        },
        'gemini': {
            greetings: {
                support: ['Hello! I\'m Gemini-powered. How can I assist you today?', 'Hi! I\'m running on Google Gemini. What can I help you with?'],
                sales: ['Welcome! Powered by Google Gemini, are you interested in learning about our AI platform?', 'Hello! I\'m a Gemini assistant. I\'d love to tell you about our solutions.'],
                info: ['Hello! I\'m Google Gemini. What information can I provide for you today?', 'Hi! Gemini-enhanced, I\'m here to answer your questions.']
            },
            responses: {
                support: ['Gemini enables me to understand your needs deeply. Could you provide more details about your issue?', 'With Google\'s Gemini, I can provide comprehensive assistance. What seems to be the problem?'],
                sales: ['Gemini powers our intelligent pricing plans starting at $29/month. Would you like me to explain the features?', 'With Gemini insights, our pricing scales with your needs. Can I tell you about our different plans?'],
                info: ['Gemini provides extensive knowledge from Google. That\'s a great question! Let me help.', 'Powered by Google Gemini, I can provide deep, researched information. What would you like to know?']
            },
            technical: {
                support: ['Gemini\'s advanced understanding helps me provide expert technical assistance. Let me help you with that issue. Have you tried restarting the service?', 'With Gemini\'s analytical power, I understand you\'re experiencing a technical problem. Let me guide you through troubleshooting steps.']
            },
            features: {
                sales: ['Our Gemini platform includes visual agent building, multi-channel deployment, and Google-powered analytics. What interests you most?', 'You\'ll benefit from Gemini\'s intelligence in our drag-and-drop interface and advanced AI training tools.']
            },
            default: {
                support: ['Thank you for your message. Gemini ensures I\'ll handle your request with Google-level quality.', 'I\'ve received your request and Gemini is processing to find the optimal solution for you.'],
                sales: ['With Gemini assistance, I\'d be happy to discuss how our platform can help your business.', 'Let me connect you with our sales team for Gemini-enhanced personalized assistance.'],
                info: ['I\'m here to help! Gemini ensures I provide Google-quality information. What would you like to know?', 'Let me use Gemini to find comprehensive information for your request.']
            },
            followUps: [' Is there anything else I can intelligently help you with?', ' Would you like more Google-powered information about this?', ' How else can I assist you today?'],
            signature: ' 💎'
        },
        'custom': {
            greetings: {
                support: ['Hello! I\'m your custom-trained AI. How can I assist you today?', 'Hi! I\'m a specialized custom agent. What can I help you with?'],
                sales: ['Welcome! I\'m custom-trained for your business. Are you interested in learning about our AI platform?', 'Hello! I\'m a custom AI assistant. I\'d love to tell you about our solutions.'],
                info: ['Hello! I\'m your custom AI. What information can I provide for you today?', 'Hi! Custom-trained for your needs, I\'m here to answer your questions.']
            },
            responses: {
                support: ['Custom-trained for your specific needs! Could you provide more details about your issue?', 'My custom training helps me understand your business context. What seems to be the problem?'],
                sales: ['Custom-trained for your industry, I can show specialized pricing plans. Would you like me to explain the features?', 'My custom model understands your business needs. Our pricing scales accordingly. Can I tell you about our different plans?'],
                info: ['Custom-trained on your domain knowledge. That\'s a great question! Let me help with specialized information.', 'Powered by custom training, I can provide industry-specific insights. What would you like to know?']
            },
            technical: {
                support: ['Custom training enables me to provide domain-specific technical assistance. Let me help you with that issue. Have you tried restarting the service?', 'With custom model expertise, I understand you\'re experiencing a technical problem. Let me guide you through specialized troubleshooting steps.']
            },
            features: {
                sales: ['Our custom-trained platform includes specialized agent building, domain deployment, and industry analytics. What interests you most?', 'You\'ll benefit from our custom-trained drag-and-drop interface and specialized AI training tools.']
            },
            default: {
                support: ['Thank you for your message. My custom training ensures I\'ll handle your request with domain expertise.', 'I\'ve received your request and my custom model is processing to find the best solution for you.'],
                sales: ['With custom AI assistance, I\'d be happy to discuss how our platform can help your business.', 'Let me connect you with our sales team for custom model enhanced personalized assistance.'],
                info: ['I\'m here to help! My custom training ensures I provide industry-specific information. What would you like to know?', 'Let me use my custom model to find specialized information for your request.']
            },
            followUps: [' Is there anything else I can specially help you with?', ' Would you like more domain-specific information about this?', ' How else can I assist you today?'],
            signature: ' ⚙️'
        }
    };
    
    return models[model] || models['gpt-4'];
}

// Update model indicator in the demo
function updateModelIndicator(model) {
    const modelInfo = getModelCharacteristics(model);
    const demoHeader = document.querySelector('.demo-chat-header');
    
    // Remove existing model indicator
    const existingIndicator = demoHeader.querySelector('.model-indicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    // Add model indicator
    const indicator = document.createElement('div');
    indicator.className = 'model-indicator';
    indicator.innerHTML = `
        <span class="model-badge">Model: ${model.toUpperCase()}</span>
    `;
    
    demoHeader.appendChild(indicator);
}

// Initialize advanced demo features
initAdvancedDemoFeatures();