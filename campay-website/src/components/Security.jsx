import { motion } from 'framer-motion'
import { Shield, Lock, CheckCircle, Award, FileCheck, Eye, Globe, Zap, AlertCircle } from 'lucide-react'

const securityFeatures = [
  {
    icon: Shield,
    title: 'SOC 2 Type II',
    description: 'Certified compliance with SOC 2 Type II security standards',
    badge: 'Verified'
  },
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'All data encrypted at rest and in transit with AES-256',
    badge: 'Military Grade'
  },
  {
    icon: Globe,
    title: 'GDPR Compliant',
    description: 'Full compliance with EU General Data Protection Regulation',
    badge: 'EU Certified'
  },
  {
    icon: FileCheck,
    title: 'HIPAA Ready',
    description: 'Healthcare data protection and privacy compliance',
    badge: 'Healthcare'
  },
  {
    icon: Eye,
    title: 'Penetration Testing',
    description: 'Regular security audits by third-party experts',
    badge: 'Quarterly'
  },
  {
    icon: Zap,
    title: 'Real-time Monitoring',
    description: '24/7 threat detection and immediate response',
    badge: 'Always On'
  }
]

const complianceBadges = [
  { name: 'SOC 2', status: 'Certified', icon: CheckCircle },
  { name: 'GDPR', status: 'Compliant', icon: CheckCircle },
  { name: 'HIPAA', status: 'Ready', icon: CheckCircle },
  { name: 'PCI DSS', status: 'Level 1', icon: CheckCircle },
  { name: 'ISO 27001', status: 'Certified', icon: CheckCircle },
  { name: 'CCPA', status: 'Compliant', icon: CheckCircle },
]

export default function Security() {
  return (
    <section id="security" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Enterprise-Grade <span className="gradient-text">Security</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Your data security and privacy are our top priorities
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="glass-card rounded-2xl p-8 neon-border group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-neon-cyan" />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-neon-purple/20 text-neon-purple border border-neon-purple/50">
                    {feature.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card rounded-2xl p-8 mb-12 neon-border"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
            <Award className="w-8 h-8 text-neon-cyan" />
            <span>Compliance Certifications</span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {complianceBadges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="text-center p-4 rounded-xl bg-dark-bg/50 border border-dark-border hover:border-neon-cyan transition-colors cursor-pointer"
              >
                <badge.icon className="w-8 h-8 mx-auto mb-3 text-green-400" />
                <h4 className="text-sm font-bold text-white mb-1">{badge.name}</h4>
                <p className="text-xs text-gray-400">{badge.status}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-card rounded-xl p-6 text-center neon-border"
          >
            <div className="text-4xl font-bold gradient-text mb-2">99.99%</div>
            <div className="text-gray-400 text-sm mb-1">Uptime</div>
            <p className="text-xs text-gray-500">Last 12 months</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="glass-card rounded-xl p-6 text-center neon-border"
          >
            <div className="text-4xl font-bold gradient-text mb-2">0</div>
            <div className="text-gray-400 text-sm mb-1">Security Breaches</div>
            <p className="text-xs text-gray-500">Since inception</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="glass-card rounded-xl p-6 text-center neon-border"
          >
            <div className="text-4xl font-bold gradient-text mb-2">24/7</div>
            <div className="text-gray-400 text-sm mb-1">Monitoring</div>
            <p className="text-xs text-gray-500">Automated response</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="glass-card rounded-2xl p-8 neon-border"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 text-neon-cyan" />
            <span>Security Best Practices</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white mb-1">Role-Based Access Control</h4>
                <p className="text-sm text-gray-400">Granular permissions for team members</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white mb-1">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-400">Enhanced login security</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white mb-1">Audit Logging</h4>
                <p className="text-sm text-gray-400">Complete activity tracking</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white mb-1">Data Residency Options</h4>
                <p className="text-sm text-gray-400">Choose your data storage region</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white mb-1">Regular Backups</h4>
                <p className="text-sm text-gray-400">Automated daily backups</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white mb-1">Incident Response</h4>
                <p className="text-sm text-gray-400"><span className="font-semibold">30 min</span> average response time</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
