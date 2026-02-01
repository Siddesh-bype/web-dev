import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Download, Code2 } from 'lucide-react'

export default function CodePreview({ workflowData, language = 'javascript' }) {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef(null)

  const formatCode = useEventCallback(() => {
    if (!workflowData) {
      return `const workflow = {
  trigger: 'webhook',
  steps: ['validate', 'transform', 'notify'],
  integrations: ['slack', 'github']
};`
    }

    const code = workflowData.nodes ? `
const workflow = {
  trigger: "${workflowData.nodes.find(n => n.type === 'trigger')?.label || 'webhook'}",
  steps: [${workflowData.nodes.map(n => `'${n.label}'`).join(', ')}],
  connections: ${JSON.stringify(workflowData.connections || [])},
  createdAt: new Date().toISOString()
};

export default workflow;` : `const workflow = ${JSON.stringify(workflowData, null, 2)}`

    return code
  }, [workflowData])

  const code = formatCode()

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `workflow.${language === 'javascript' ? 'js' : 'json'}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const syntaxHighlight = (code) => {
    return code
      .replace(/(const|let|var|function|return|export|default|import|from|await|async)/g, '<span class="text-neon-magenta">$1</span>')
      .replace(/(workflow|trigger|steps|connections|createdAt)/g, '<span class="text-neon-purple">$1</span>')
      .replace(/'(.*?)'/g, '<span class="text-green-400">\'$1\'</span>')
      .replace(/\b(\d+)\b/g, '<span class="text-neon-blue">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="text-gray-500">$1</span>')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <Code2 className="w-5 h-5 text-neon-cyan" />
          <span>Code Preview</span>
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={copyToClipboard}
            className="px-3 py-2 text-sm rounded-lg bg-dark-card border border-dark-border hover:border-neon-cyan transition-colors flex items-center space-x-2"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="copied"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center space-x-2"
                >
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Copied</span>
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center space-x-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          <button
            onClick={downloadCode}
            className="px-3 py-2 text-sm rounded-lg bg-dark-card border border-dark-border hover:border-neon-cyan transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl overflow-hidden neon-border"
      >
        <div className="bg-dark-card/50 px-4 py-3 border-b border-dark-border flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-sm text-gray-400">{language}.js</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <span>{code.split('\n').length} lines</span>
            <span>•</span>
            <span>{code.length} chars</span>
          </div>
        </div>
        <pre 
          ref={codeRef}
          className="p-4 overflow-x-auto text-sm leading-relaxed font-mono bg-dark-bg/50"
          dangerouslySetInnerHTML={{ 
            __html: syntaxHighlight(code) 
          }}
        />
      </motion.div>

      <div className="glass-card rounded-xl p-4 space-y-3">
        <h4 className="text-sm font-semibold text-white">Quick Reference</h4>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded bg-neon-magenta"></span>
            <span className="text-gray-400">Keywords</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded bg-neon-purple"></span>
            <span className="text-gray-400">Properties</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded bg-green-400"></span>
            <span className="text-gray-400">Strings</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded bg-neon-blue"></span>
            <span className="text-gray-400">Numbers</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const useEventCallback = (fn) => {
  const fnRef = useRef(fn)
  useEffect(() => {
    fnRef.current = fn
  })
  return (...args) => fnRef.current(...args)
}
