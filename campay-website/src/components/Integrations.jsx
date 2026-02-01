import { useState } from 'react'
import { motion } from 'framer-motion'

const integrations = [
  { id: 1, name: 'GitHub', category: 'Dev Tools', status: 'Ready', icon: 'Github', description: 'Automate repos, PRs, issues, and releases' },
  { id: 2, name: 'GitLab', category: 'Dev Tools', status: 'Ready', icon: 'Gitlab', description: 'CI/CD pipelines and repository automation' },
  { id: 3, name: 'Slack', category: 'Communication', status: 'Ready', icon: 'MessageSquare', description: 'Instant notifications and team alerts' },
  { id: 4, name: 'Notion', category: 'Productivity', status: 'Ready', icon: 'FileText', description: 'Page creation and database updates' },
  { id: 5, name: 'Trello', category: 'Productivity', status: 'Ready', icon: 'Trello', description: 'Card movements and list automation' },
  { id: 6, name: 'Linear', category: 'Dev Tools', status: 'Ready', icon: 'CheckCircle', description: 'Issue management and team collaboration' },
  { id: 7, name: 'Zapier', category: 'Automation', status: 'Ready', icon: 'Zap', description: 'Connect with 5000+ apps' },
  { id: 8, name: 'Webhook', category: 'Developer', status: 'Ready', icon: 'Globe', description: 'Custom HTTP webhook integration' },
  { id: 9, name: 'PostgreSQL', category: 'Database', status: 'Beta', icon: 'Database', description: 'Direct database connection' },
  { id: 10, name: 'MongoDB', category: 'Database', status: 'Beta', icon: 'Database', description: 'NoSQL database automation' },
  { id: 11, name: 'Twilio', category: 'Communication', status: 'Beta', icon: 'Mail', description: 'SMS and voice integration' },
  { id: 12, name: 'SendGrid', category: 'Communication', status: 'Ready', icon: 'Mail', description: 'Transactional email automation' },
  { id: 13, name: 'Google Calendar', category: 'Productivity', status: 'Beta', icon: 'Calendar', description: 'Event scheduling and management' },
  { id: 14, name: 'AWS', category: 'Cloud', status: 'Coming Soon', icon: 'Cloud', description: 'Cloud services integration' },
  { id: 15, name: 'Cloudflare', category: 'Cloud', status: 'Coming Soon', icon: 'Cloud', description: 'DNS and security automation' },
  { id: 16, name: 'Figma', category: 'Design', status: 'Beta', icon: 'Image', description: 'Design file notifications' },
  { id: 17, name: 'YouTube', category: 'Media', status: 'Beta', icon: 'Video', description: 'Video publishing automation' },
  { id: 18, name: 'Spotify', category: 'Media', status: 'Coming Soon', icon: 'Music', description: 'Music playlist management' },
]

const categories = ['All', 'Dev Tools', 'Communication', 'Productivity', 'Automation', 'Database', 'Cloud', 'Design', 'Media']

export default function Integrations() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       integration.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || integration.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getIcon = (iconName) => {
    const icons = {
      Github: '⚡',
      Gitlab: '🔧',
      MessageSquare: '💬',
      FileText: '📄',
      Trello: '📋',
      CheckCircle: '🔲',
      Zap: '⚡',
      Globe: '🌐',
      Database: '🗄️',
      Mail: '✉️',
      Calendar: '📅',
      Cloud: '☁️',
      Image: '🎨',
      Video: '📹',
      Music: '🎵',
    }
    return icons[iconName] || '⚡'
  }

  const getStatusClass = (status) => {
    if (status === 'Ready') return 'bg-green-500/20 text-green-400 border-green-500/50'
    if (status === 'Beta') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
    return 'bg-gray-500/20 text-gray-400 border-gray-500/50'
  }

  const getStatusButton = (status) => {
    if (status === 'Ready') {
      return (
        <button className="text-xs px-2 py-1 rounded bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 hover:bg-neon-cyan/30 transition-all">
          Connect
        </button>
      )
    }
    if (status === 'Beta') {
      return (
        <button className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 hover:bg-yellow-500/30 transition-all">
          Join Beta
        </button>
      )
    }
    return (
      <button className="text-xs px-2 py-1 rounded bg-gray-500/20 text-gray-400 border border-gray-500/50 hover:bg-gray-500/30 transition-all" disabled>
        Coming Soon
      </button>
    )
  }

  const renderIntegrationCard = (integration) => {
    const statusClass = getStatusClass(integration.status)
    
    return (
      <motion.div
        key={integration.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: integration.id * 0.05 }}
        whileHover={{ scale: 1.02, y: -4 }}
        className="glass-card rounded-xl p-6 neon-border hover:border-neon-cyan transition-all cursor-pointer"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-lg bg-dark-bg border border-dark-border flex items-center justify-center">
            <div className="text-2xl">
              {getIcon(integration.icon)}
            </div>
          </div>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusClass}`}>
            {integration.status}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
          {integration.name}
        </h3>

        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {integration.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{integration.category}</span>
          {getStatusButton(integration.status)}
        </div>
      </motion.div>
    )
  }

  return (
    <section id="integrations" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">500+</span> Integrations
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Connect Campay AI with your favorite tools and services
          </p>
        </motion.div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m6v0l-6-6m12 0v12l-6m6-6m12 0v12l-6-6-6m12 0v12l6-6m" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition-colors"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-neon-cyan text-black'
                      : 'bg-dark-card border border-dark-border text-gray-300 hover:border-neon-cyan hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredIntegrations.map((integration) => (
            renderIntegrationCard(integration)
          ))}
        </div>

        {filteredIntegrations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 text-lg mb-4">No integrations found</div>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All') }}
              className="text-neon-cyan hover:text-neon-cyan/80 transition-colors font-medium"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        <div className="text-center glass-card rounded-xl p-8 neon-border">
          <h3 className="text-xl font-bold text-white mb-4">
            Don't see your integration?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            We're constantly adding new integrations. Request your favorite tools and we'll prioritize them in our roadmap.
          </p>
          <button className="btn-primary bg-neon-cyan text-black">
            Request Integration
            <span className="w-4 h-4 inline ml-2">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}