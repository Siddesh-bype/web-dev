import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Zap, CheckCircle2, Layout, Code } from 'lucide-react'
import WorkflowBuilder from './WorkflowBuilder'
import CodePreview from './CodePreview'

export default function LiveDemo() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m Campay AI. Tell me what workflow you\'d like to automate!' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [viewMode, setViewMode] = useState('chat')
  const [workflowData, setWorkflowData] = useState(null)

  const workflows = [
    { name: 'GitHub PR Automation', icon: '⚡', time: '2 min' },
    { name: 'Slack Notifications', icon: '💬', time: '1 min' },
    { name: 'Data Sync Pipeline', icon: '🔄', time: '3 min' }
  ]

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages([...messages, userMessage])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: `I've analyzed your request and generated a workflow automation. Here's what I've created:\n\n1. **Trigger**: Webhook\n2. **Actions**: Validate → Transform → Send\n3. **Integration**: Ready to deploy\n\nWould you like me to deploy this workflow?`
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleQuickAction = (workflow) => {
    const userMessage = { role: 'user', content: `Create a ${workflow.name} workflow` }
    setMessages([...messages, userMessage])
    setIsTyping(true)

    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: `Perfect! I've created your ${workflow.name} workflow in ${workflow.time}. Switch to the builder view to customize and deploy!`
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
      setViewMode('builder')
    }, 1500)
  }

  const handleWorkflowChange = (data) => {
    setWorkflowData(data)
  }

  return (
    <section id="demo" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Try <span className="gradient-text">Campay AI</span> Live
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the power of AI-driven workflow automation
          </p>
        </motion.div>

        <div className="mb-8 flex justify-center">
          <div className="glass-card rounded-xl p-1 inline-flex space-x-1">
            <button
              onClick={() => setViewMode('chat')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                viewMode === 'chat' 
                  ? 'bg-neon-cyan text-black' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layout className="w-4 h-4" />
              <span>Chat</span>
            </button>
            <button
              onClick={() => setViewMode('builder')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                viewMode === 'builder' 
                  ? 'bg-neon-cyan text-black' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Builder</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl overflow-hidden neon-border"
          >
            <div className="bg-dark-card/50 px-6 py-4 border-b border-dark-border flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Zap className="w-4 h-4 text-neon-cyan" />
                  <span className="text-sm">Campay AI Agent</span>
                </div>
              </div>
              <span className="text-xs text-gray-500">v1.0</span>
            </div>

            <div className="p-6 h-[400px] overflow-y-auto space-y-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-start space-x-3 ${message.role === 'user' ? 'justify-end' : ''}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[85%] p-4 rounded-xl ${message.role === 'user' ? 'bg-neon-purple/20 text-white' : 'bg-dark-card text-gray-200'}`}>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-neon-cyan flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-black" />
                      </div>
                    )}
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-dark-card p-4 rounded-xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-4 border-t border-dark-border">
              <div className="flex flex-wrap gap-2 mb-3">
                {workflows.map((workflow, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(workflow)}
                    className="px-3 py-2 rounded-lg bg-dark-card hover:bg-dark-card/80 text-sm text-gray-300 hover:text-neon-cyan transition-colors border border-dark-border hover:border-neon-cyan/50"
                  >
                    {workflow.icon} {workflow.name}
                  </button>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Describe your workflow automation..."
                  className="flex-1 bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition-colors"
                />
                <button
                  onClick={handleSend}
                  className="px-4 py-3 bg-neon-cyan rounded-lg hover:bg-neon-cyan/80 transition-colors"
                >
                  <Send className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <WorkflowBuilder onWorkflowChange={handleWorkflowChange} />
            {workflowData && (
              <CodePreview workflowData={workflowData} />
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { label: 'Workflows Created', value: '10K+', icon: CheckCircle2 },
            { label: 'API Calls / Day', value: '50M+', icon: Zap },
            { label: 'Uptime', value: '99.99%', icon: CheckCircle2 }
          ].map((stat, index) => (
            <div key={index} className="glass-card rounded-xl p-6 text-center neon-border">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-neon-cyan" />
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
