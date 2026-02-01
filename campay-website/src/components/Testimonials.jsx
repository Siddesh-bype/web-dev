import { motion } from 'framer-motion'
import { Star, Quote, Github, Twitter } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Senior Developer at Stripe',
    avatar: 'SC',
    content: 'Campay transformed how we handle internal automation. We reduced deployment time by 80% and our engineers love the intuitive interface.',
    rating: 5,
    social: 'twitter'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO at TechFlow',
    avatar: 'MR',
    content: 'The AI workflow builder is incredibly smart. It understands our requirements and generates production-ready code in seconds.',
    rating: 5,
    social: 'github'
  },
  {
    name: 'Emily Watson',
    role: 'DevOps Engineer at CloudScale',
    avatar: 'EW',
    content: 'Finally, an automation tool that actually works for developers. The API integrations are seamless and the uptime is exceptional.',
    rating: 5,
    social: 'twitter'
  },
  {
    name: 'David Kim',
    role: 'Product Lead at InnovateCo',
    avatar: 'DK',
    content: 'Campay enabled us to ship features 3x faster. The visual workflow builder makes it easy for non-devs to understand and contribute.',
    rating: 5,
    social: 'github'
  }
]

export default function Testimonials() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by <span className="gradient-text">Developers</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See what our community is saying about Campay
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-2xl p-8 neon-border relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-neon-cyan/20" />
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center font-bold text-white">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
                {testimonial.social === 'github' ? (
                  <Github className="w-5 h-5 text-gray-400 hover:text-neon-cyan cursor-pointer transition-colors" />
                ) : (
                  <Twitter className="w-5 h-5 text-gray-400 hover:text-neon-cyan cursor-pointer transition-colors" />
                )}
              </div>

              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-neon-cyan text-neon-cyan" />
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-6 text-gray-400">
            <span className="text-sm">Trusted by teams at</span>
            <div className="flex items-center space-x-6">
              {['Stripe', 'GitHub', 'Vercel', 'Cloudflare', 'Linear'].map((company, index) => (
                <span key={index} className="text-lg font-semibold text-gray-500 hover:text-neon-cyan cursor-pointer transition-colors">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
