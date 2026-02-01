import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, Star, ArrowRight } from 'lucide-react'

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: 'Free',
      price: isAnnual ? 0 : 0,
      description: 'Perfect for getting started',
      features: [
        '1,000 workflow runs/month',
        '5 integrations',
        'Basic analytics',
        'Community support',
        '1 workspace'
      ],
      popular: false,
      cta: 'Start Free'
    },
    {
      name: 'Pro',
      price: isAnnual ? 29 : 35,
      description: 'For serious developers',
      features: [
        'Unlimited workflow runs',
        'Unlimited integrations',
        'Advanced analytics',
        'Priority support',
        '5 workspaces',
        'Custom domains',
        'API access'
      ],
      popular: true,
      cta: 'Get Started'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: [
        'Everything in Pro',
        'SSO & SAML',
        'Dedicated support',
        'SLA guarantees',
        'Unlimited workspaces',
        'Custom integrations',
        'On-premise deployment',
        'Training & onboarding'
      ],
      popular: false,
      cta: 'Contact Sales'
    }
  ]

  return (
    <section id="pricing" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Choose the plan that fits your needs
          </p>

          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${isAnnual ? 'bg-neon-cyan' : 'bg-dark-card'}`}
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${isAnnual ? 'left-8' : 'left-1'}`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Annual <span className="text-neon-cyan">(Save 17%)</span>
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`relative glass-card rounded-2xl p-8 neon-border ${
                plan.popular ? 'border-neon-cyan ring-2 ring-neon-cyan/20' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-neon-cyan to-neon-purple text-black text-xs font-bold px-4 py-1 rounded-full flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  {typeof plan.price === 'number' ? (
                    <>
                      <span className="text-5xl font-bold gradient-text">${plan.price}</span>
                      <span className="text-gray-400 ml-2">/mo</span>
                    </>
                  ) : (
                    <span className="text-5xl font-bold gradient-text">{plan.price}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-neon-cyan' : 'text-gray-500'}`} />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'btn-primary bg-neon-cyan text-black hover:scale-105'
                    : 'btn-secondary hover:scale-105'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 inline ml-2" />
              </button>
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
          <div className="glass-card rounded-2xl p-8 neon-border max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Zap className="w-6 h-6 text-neon-cyan" />
              <h3 className="text-xl font-bold">Need a custom solution?</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Contact our team for enterprise pricing, on-premise deployments, or custom integrations
            </p>
            <button className="btn-secondary">
              Contact Sales
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
