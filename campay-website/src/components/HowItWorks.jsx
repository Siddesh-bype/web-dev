import { motion } from 'framer-motion'
import { Link2, Workflow, Rocket } from 'lucide-react'

const steps = [
  {
    icon: Link2,
    title: 'Connect Your Tools',
    description: 'Link your existing services and data sources with our one-click integrations',
    color: 'neon-cyan'
  },
  {
    icon: Workflow,
    title: 'Define Workflows',
    description: 'Use our visual builder or AI prompts to create powerful automation logic',
    color: 'neon-purple'
  },
  {
    icon: Rocket,
    title: 'Deploy Instantly',
    description: 'Deploy to production with automatic scaling and monitoring included',
    color: 'neon-magenta'
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How <span className="gradient-text">Campay</span> Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From idea to production in three simple steps
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-magenta transform -translate-y-1/2" />
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="glass-card rounded-2xl p-8 text-center neon-border relative z-10">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-dark-card to-dark-bg border-2 border-neon-cyan flex items-center justify-center mb-6 animate-pulse-slow">
                    <span className="text-4xl font-bold gradient-text">{index + 1}</span>
                  </div>
                  
                  <div className="w-16 h-16 mx-auto rounded-xl bg-dark-card border border-dark-border flex items-center justify-center mb-6">
                    <step.icon className={`w-8 h-8 text-${step.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    className="hidden md:flex justify-center -mt-12 relative z-0"
                  >
                    <div className="w-12 h-12 rounded-full bg-dark-bg border-2 border-neon-purple flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-neon-purple animate-ping" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="glass-card rounded-2xl p-12 neon-border max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 gradient-text">Ready to automate?</h3>
            <p className="text-gray-400 mb-8 text-lg">
              Join thousands of developers building intelligent workflows with Campay
            </p>
            <button className="btn-primary bg-neon-cyan text-black">
              Start Building for Free
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
