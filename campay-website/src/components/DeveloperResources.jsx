import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Play, Code2, Terminal, BookOpen, Download, ExternalLink, FileCode, Cpu, Network, Zap, ArrowRight } from 'lucide-react'

const codeExamples = [
  {
    language: 'JavaScript',
    icon: FileCode,
    code: `const campay = require('campay-ai');

const workflow = await campay.create({
  trigger: 'webhook',
  actions: ['validate', 'transform', 'send']
});

await workflow.deploy();`,
    badge: 'ES6+'
  },
  {
    language: 'Python',
    icon: Terminal,
    code: `from campay import Workflow

workflow = Workflow(
    trigger='webhook',
    actions=['validate', 'transform', 'send']
)

await workflow.deploy()`,
    badge: '3.8+'
  },
  {
    language: 'Node.js',
    icon: Cpu,
    code: `import { createWorkflow } from '@campay/sdk';

const workflow = createWorkflow({
  trigger: 'webhook',
  steps: [
    { type: 'validate', config: { strict: true } },
    { type: 'transform', config: { format: 'json' } },
    { type: 'send', config: { endpoint: '/api/notify' } }
  ]
});`,
    badge: '16+'
  }
]

const apiEndpoints = [
  {
    method: 'POST',
    endpoint: '/api/v1/workflows',
    description: 'Create a new workflow',
    color: 'text-green-400'
  },
  {
    method: 'GET',
    endpoint: '/api/v1/workflows',
    description: 'List all workflows',
    color: 'text-blue-400'
  },
  {
    method: 'PUT',
    endpoint: '/api/v1/workflows/:id',
    description: 'Update a workflow',
    color: 'text-yellow-400'
  },
  {
    method: 'DELETE',
    endpoint: '/api/v1/workflows/:id',
    description: 'Delete a workflow',
    color: 'text-red-400'
  },
  {
    method: 'POST',
    endpoint: '/api/v1/workflows/:id/deploy',
    description: 'Deploy a workflow',
    color: 'text-neon-cyan'
  }
]

const quickStarts = [
  {
    title: 'Installation',
    command: 'npm install @campay/sdk',
    icon: Download,
    description: 'Install the official SDK'
  },
  {
    title: 'Authentication',
    command: 'campay.auth("YOUR_API_KEY")',
    icon: Zap,
    description: 'Set up API authentication'
  },
  {
    title: 'Create Workflow',
    command: 'campay.create({ trigger: "webhook" })',
    icon: Code2,
    description: 'Create your first workflow'
  },
  {
    title: 'Deploy',
    command: 'await workflow.deploy()',
    icon: Play,
    description: 'Deploy to production'
  }
]

export default function DeveloperResources() {
  const [copied, setCopied] = useState(null)

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <section id="developer-resources" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Developer <span className="gradient-text">Resources</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to integrate Campay AI into your projects
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
            <Code2 className="w-6 h-6 text-neon-cyan" />
            <span>Code Examples</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {codeExamples.map((example, index) => {
              const Icon = example.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card rounded-2xl overflow-hidden neon-border"
                >
                  <div className="bg-dark-card/50 px-6 py-4 border-b border-dark-border flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-neon-cyan" />
                      <span className="text-lg font-semibold text-white">{example.language}</span>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-neon-purple/20 text-neon-purple border border-neon-purple/50">
                      {example.badge}
                    </span>
                  </div>

                  <div className="p-4">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                  </div>

                  <button
                    onClick={() => handleCopy(example.code, `code-${index}`)}
                    className="w-full px-4 py-3 text-sm rounded-lg bg-dark-bg border border-dark-border hover:border-neon-cyan transition-colors flex items-center justify-center space-x-2"
                  >
                    {copied === `code-${index}` ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
            <Network className="w-6 h-6 text-neon-cyan" />
            <span>API Endpoints</span>
          </h3>

          <div className="glass-card rounded-2xl overflow-hidden neon-border">
            <div className="bg-dark-card/50 px-6 py-4 border-b border-dark-border">
              <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-400">
                <div className="col-span-2">Method</div>
                <div className="col-span-4">Endpoint</div>
                <div className="col-span-6">Description</div>
              </div>
            </div>

            <div className="divide-y divide-dark-border">
              {apiEndpoints.map((endpoint, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-dark-bg/50 transition-colors cursor-pointer"
                >
                  <div className="col-span-2">
                    <span className={`font-semibold ${endpoint.color}`}>
                      {endpoint.method}
                    </span>
                  </div>
                  <div className="col-span-4">
                    <code className="text-neon-cyan text-sm">{endpoint.endpoint}</code>
                  </div>
                  <div className="col-span-6 text-gray-300 text-sm">
                    {endpoint.description}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-dark-card/50 px-6 py-4 border-t border-dark-border flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Base URL: <code className="text-neon-cyan">https://api.campay.ai/v1</code>
              </div>
              <button className="text-neon-cyan text-sm font-medium hover:text-neon-cyan/80 transition-colors flex items-center space-x-2">
                <span>Full Documentation</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
            <Zap className="w-6 h-6 text-neon-cyan" />
            <span>Quick Start</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {quickStarts.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="glass-card rounded-xl p-6 neon-border group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-neon-cyan" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                      <p className="text-sm text-gray-400 mb-4">{step.description}</p>
                      <div className="bg-dark-bg rounded-lg p-3 border border-dark-border">
                        <code className="text-neon-purple text-sm">{step.command}</code>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(step.command, `quick-${index}`)}
                    className="mt-4 w-full px-4 py-3 text-sm rounded-lg bg-dark-bg border border-dark-border hover:border-neon-cyan transition-colors flex items-center justify-center space-x-2"
                  >
                    {copied === `quick-${index}` ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="glass-card rounded-2xl p-8 neon-border"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-6 md:space-y-0 md:space-x-8">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center space-x-3">
                <BookOpen className="w-6 h-6 text-neon-cyan" />
                <span>Need Help?</span>
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Explore our comprehensive documentation, tutorials, and community resources to get the most out of Campay AI. From basic setup to advanced integrations, we've got you covered.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-3 rounded-lg bg-neon-cyan text-black font-semibold hover:scale-105 transition-transform flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Documentation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button className="px-6 py-3 rounded-lg btn-secondary flex items-center space-x-2">
                <Code2 className="w-5 h-5" />
                <span>API Reference</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button className="px-6 py-3 rounded-lg btn-secondary flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Tutorials</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
