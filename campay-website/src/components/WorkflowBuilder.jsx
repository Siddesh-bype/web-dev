import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Trash2, 
  Copy, 
  Play, 
  Download, 
  Zap,
  Globe,
  Database,
  MessageSquare,
  GitBranch,
  ArrowRight
} from 'lucide-react'

const nodeTypes = [
  { type: 'trigger', label: 'Webhook', icon: Globe, color: 'neon-cyan' },
  { type: 'trigger', label: 'HTTP Request', icon: Zap, color: 'neon-purple' },
  { type: 'action', label: 'Send Email', icon: MessageSquare, color: 'neon-magenta' },
  { type: 'action', label: 'Database', icon: Database, color: 'neon-blue' },
  { type: 'condition', label: 'Branch', icon: GitBranch, color: 'neon-purple' },
]

const initialNodes = [
  { id: 1, type: 'trigger', label: 'Webhook', x: 50, y: 100 },
  { id: 2, type: 'action', label: 'Validate', x: 250, y: 100 },
  { id: 3, type: 'action', label: 'Transform', x: 450, y: 100 },
  { id: 4, type: 'action', label: 'Notify', x: 650, y: 100 },
]

const initialConnections = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
]

export default function WorkflowBuilder({ onWorkflowChange }) {
  const [nodes, setNodes] = useState(initialNodes)
  const [connections, setConnections] = useState(initialConnections)
  const [selectedNode, setSelectedNode] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [draggedNode, setDraggedNode] = useState(null)

  const addNode = useCallback((nodeType) => {
    const newNode = {
      id: Date.now(),
      type: nodeType.type,
      label: nodeType.label,
      x: 50,
      y: 50 + nodes.length * 80,
    }
    setNodes([...nodes, newNode])
    onWorkflowChange({ nodes: [...nodes, newNode], connections })
  }, [nodes, connections, onWorkflowChange])

  const deleteNode = useCallback((nodeId) => {
    const newNodes = nodes.filter(n => n.id !== nodeId)
    const newConnections = connections.filter(c => c.from !== nodeId && c.to !== nodeId)
    setNodes(newNodes)
    setConnections(newConnections)
    setSelectedNode(null)
    onWorkflowChange({ nodes: newNodes, connections: newConnections })
  }, [nodes, connections, onWorkflowChange])

  const duplicateNode = useCallback((nodeId) => {
    const node = nodes.find(n => n.id === nodeId)
    if (node) {
      const newNode = {
        ...node,
        id: Date.now(),
        x: node.x + 30,
        y: node.y + 30,
      }
      setNodes([...nodes, newNode])
      onWorkflowChange({ nodes: [...nodes, newNode], connections })
    }
  }, [nodes, connections, onWorkflowChange])

  const handleDragStart = (e, node) => {
    setIsDragging(true)
    setDraggedNode(node.id)
    setSelectedNode(node.id)
  }

  const handleDragEnd = (e, node) => {
    setIsDragging(false)
    setDraggedNode(null)
    const rect = e.target.getBoundingClientRect()
    const parentRect = e.target.parentElement.getBoundingClientRect()
    const newX = rect.left - parentRect.left
    const newY = rect.top - parentRect.top
    
    const newNodes = nodes.map(n => 
      n.id === node.id ? { ...n, x: newX, y: newY } : n
    )
    setNodes(newNodes)
    onWorkflowChange({ nodes: newNodes, connections })
  }

  const handleDrag = (e) => {
    if (!isDragging || !draggedNode) return
    e.preventDefault()
    const parentRect = e.target.parentElement.getBoundingClientRect()
    const newX = e.clientX - parentRect.left - 60
    const newY = e.clientY - parentRect.top - 20
    
    const newNodes = nodes.map(n => 
      n.id === draggedNode ? { ...n, x: Math.max(0, newX), y: Math.max(0, newY) } : n
    )
    setNodes(newNodes)
  }

  const generateCode = useCallback(() => {
    const workflowCode = {
      trigger: nodes.find(n => n.type === 'trigger')?.label || 'webhook',
      steps: nodes.map(n => n.label),
      connections: connections,
    }
    return JSON.stringify(workflowCode, null, 2)
  }, [nodes, connections])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <Zap className="w-5 h-5 text-neon-cyan" />
          <span>Workflow Builder</span>
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setNodes(initialNodes)}
            className="px-3 py-2 text-sm rounded-lg bg-dark-card border border-dark-border hover:border-neon-cyan transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => alert('Deploying workflow...')}
            className="px-4 py-2 text-sm rounded-lg bg-neon-cyan text-black font-semibold flex items-center space-x-2 hover:scale-105 transition-transform"
          >
            <Play className="w-4 h-4" />
            <span>Deploy</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <div 
            className="glass-card rounded-xl p-4 min-h-[400px] relative overflow-hidden"
            onMouseMove={handleDrag}
            onMouseLeave={() => { setIsDragging(false); setDraggedNode(null) }}
          >
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-1 opacity-10">
              {Array.from({ length: 72 }).map((_, i) => (
                <div key={i} className="border border-neon-cyan/30" />
              ))}
            </div>

            {nodes.map((node, index) => {
              const nodeType = nodeTypes.find(t => t.label === node.label) || nodeTypes[0]
              const NodeIcon = nodeType.icon
              
              return (
                <motion.div
                  key={node.id}
                  drag
                  dragMomentum={false}
                  onDragStart={(e) => handleDragStart(e, node)}
                  onDragEnd={(e) => handleDragEnd(e, node)}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{ 
                    left: `${node.x}px`, 
                    top: `${node.y}px`,
                    position: 'absolute'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileDrag={{ scale: 1.1, zIndex: 100 }}
                  className={`absolute cursor-move ${
                    selectedNode === node.id 
                      ? 'ring-2 ring-neon-cyan ring-offset-2 ring-offset-dark-bg' 
                      : ''
                  }`}
                >
                  <div className="glass-card rounded-lg p-3 min-w-[160px] flex items-center space-x-3 neon-border hover:border-neon-cyan transition-colors">
                    <NodeIcon className={`w-5 h-5 text-${nodeType.color}`} />
                    <span className="text-sm font-medium text-white">{node.label}</span>
                    {selectedNode === node.id && (
                      <div className="flex space-x-1 ml-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); duplicateNode(node.id) }}
                          className="p-1 rounded hover:bg-neon-cyan/20"
                        >
                          <Copy className="w-3 h-3 text-gray-400 hover:text-neon-cyan" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteNode(node.id) }}
                          className="p-1 rounded hover:bg-red-500/20"
                        >
                          <Trash2 className="w-3 h-3 text-gray-400 hover:text-red-500" />
                        </button>
                      </div>
                    )}
                  </div>
                  {index < nodes.length - 1 && (
                    <ArrowRight className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  )}
                </motion.div>
              )
            })}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {nodeTypes.map((nodeType, index) => (
              <button
                key={index}
                onClick={() => addNode(nodeType)}
                className="px-3 py-2 rounded-lg bg-dark-card border border-dark-border hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all flex items-center space-x-2 text-sm"
              >
                <nodeType.icon className={`w-4 h-4 text-${nodeType.color}`} />
                <span className="text-gray-300">{nodeType.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-1">
          <div className="glass-card rounded-xl p-4 space-y-4">
            <h4 className="text-sm font-semibold text-white mb-4">Quick Actions</h4>
            
            <div className="space-y-2">
              <button
                onClick={() => navigator.clipboard.writeText(generateCode())}
                className="w-full px-3 py-2 rounded-lg bg-dark-card border border-dark-border hover:border-neon-cyan transition-colors flex items-center justify-center space-x-2 text-sm"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Code</span>
              </button>
              
              <button
                onClick={() => {
                  const blob = new Blob([generateCode()], { type: 'application/json' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = 'workflow.json'
                  a.click()
                }}
                className="w-full px-3 py-2 rounded-lg bg-dark-card border border-dark-border hover:border-neon-cyan transition-colors flex items-center justify-center space-x-2 text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>

            <div className="border-t border-dark-border pt-4">
              <h5 className="text-xs text-gray-400 mb-2">Workflow Stats</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Nodes</span>
                  <span className="text-white font-semibold">{nodes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Connections</span>
                  <span className="text-white font-semibold">{connections.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Complexity</span>
                  <span className={`font-semibold ${nodes.length > 5 ? 'text-yellow-500' : 'text-neon-cyan'}`}>
                    {nodes.length > 5 ? 'High' : 'Low'}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-dark-border pt-4">
              <h5 className="text-xs text-gray-400 mb-2">Tip</h5>
              <p className="text-xs text-gray-300">
                Click to select, drag to move, use quick actions to copy or export
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
