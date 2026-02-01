import { motion } from 'framer-motion'
import { 
  Workflow, 
  Globe, 
  Zap, 
  Code, 
  BarChart3, 
  Puzzle,
  ArrowRight
} from 'lucide-react'

const features = [
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Create complex automated workflows with visual builders and AI assistance. No manual coding required.',
    color: 'neon-cyan'
  },
  {
    icon: Globe,
    title: 'API Integrations',
    description: 'Connect with 500+ services and APIs. Native integrations with GitHub, Slack, Jira, and more.',
    color: 'neon-magenta'
  },
  {
    icon: Zap,
    title: 'Real-time Processing',
    description: 'Process millions of events per second with our distributed AI infrastructure.',
    color: 'neon-purple'
  },
  {
    icon: Code,
    title: 'Custom Scripts',
    description: 'Write custom JavaScript/Python scripts and let Campay optimize and scale them automatically.',
    color: 'neon-blue'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Monitor performance, track errors, and optimize workflows with detailed analytics.',
    color: 'neon-cyan'
  },
  {
    icon: Puzzle,
    title: 'Developer API',
    description: 'Full REST and GraphQL API for programmatic control over your automation infrastructure.',
    color: 'neon-magenta'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Developers Love <span className="gradient-text">Campay</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to build, deploy, and scale intelligent automation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card rounded-2xl p-8 neon-border hover:border-neon-cyan transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-xl bg-${feature.color}/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-8 h-8 text-${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-neon-cyan transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-4 flex items-center text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-medium">Learn more</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
