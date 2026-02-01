import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      theme: {
        current: 'dark',
        neonColor: 'cyan',
        setTheme: (theme) => set({ theme: { ...get().theme, current: theme } }),
        setNeonColor: (color) => set({ theme: { ...get().theme, neonColor: color } }),
      },
      workflow: {
        nodes: [],
        connections: [],
        setNodes: (nodes) => set({ workflow: { ...get().workflow, nodes } }),
        setConnections: (connections) => set({ workflow: { ...get().workflow, connections } }),
        addNode: (node) => set((state) => ({ workflow: { ...state.workflow, nodes: [...state.workflow.nodes, node] } })),
        removeNode: (nodeId) => set((state) => ({ workflow: { ...state.workflow, nodes: state.workflow.nodes.filter(n => n.id !== nodeId) } })),
        updateNode: (nodeId, updates) => set((state) => ({ workflow: { ...state.workflow, nodes: state.workflow.nodes.map(n => n.id === nodeId ? { ...n, ...updates } : n) } })),
        resetWorkflow: () => set({ workflow: { nodes: [], connections: [] } }),
      },
      ui: {
        sidebarOpen: true,
        demoView: 'chat',
        loading: false,
        loadingProgress: 0,
        loadingText: null,
        toggleSidebar: () => set((state) => ({ ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen } })),
        setDemoView: (view) => set((state) => ({ ui: { ...state.ui, demoView: view } })),
        setLoading: (loading) => set((state) => ({ ui: { ...state.ui, loading } })),
        setLoadingProgress: (progress) => set((state) => ({ ui: { ...state.ui, loadingProgress: progress } })),
        setLoadingText: (text) => set((state) => ({ ui: { ...state.ui, loadingText: text } })),
      },
      notifications: {
        items: [],
        addNotification: (notification) => set((state) => ({ 
          notifications: { 
            ...state.notifications, 
            items: [...state.notifications.items, { ...notification, id: Date.now() }] 
          } 
        })),
        removeNotification: (id) => set((state) => ({ 
          notifications: { 
            ...state.notifications, 
            items: ({ notifications }) => notifications.items.filter(n => n.id !== id) 
          } 
        })),
        clearNotifications: () => set(() => ({ notifications: { items: [] } })),
      },
      user: {
        isAuthenticated: false,
        apiToken: null,
        settings: {
          notifications: true,
          sounds: false,
          animations: true,
        },
        setAuthenticated: (isAuth) => set((state) => ({ user: { ...state.user, isAuthenticated: isAuth } })),
        setApiToken: (token) => set((state) => ({ user: { ...state.user, apiToken: token } })),
        updateSettings: (settings) => set((state) => ({ user: { ...state.user, settings: { ...state.user.settings, ...settings } } })),
      },
    }),
    {
      name: 'campay-storage',
      partialize: (state) => ({
        theme: state.theme,
        user: state.user,
      }),
    }
  )
)

export default useStore
