"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { auth } from './firebase'

// Member Types
export interface Member {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  joinedAt?: string
  lastActive?: string
  projects?: string[]
  ownerId?: string
}

// API Key Types
export interface ApiKey {
  id: string
  name: string
  description?: string
  key: string
  project?: string
  projectId?: string
  userId?: string
  status: 'active' | 'inactive' | 'expired' | 'revoked'
  createdAt: string
  lastUsed?: string
  expiresAt?: string
  requests?: number
  environment?: string
  serviceName?: string
  website?: string
  docsUrl?: string
  monthlyLimit?: number
  monthlyCost?: number
  tags?: string[]
}

// Project Types
export interface Project {
  id: string
  name: string
  description: string
  status: 'planning' | 'active' | 'completed' | 'on-hold' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  progress: number // 0-100
  startDate: string
  dueDate: string
  budget: number
  spentBudget: number
  teamMembers: string[] // Member IDs
  tags: string[]
  milestones: Milestone[]
  tasks: Task[]
  createdAt: string
  updatedAt: string
  createdBy: string
}

export interface Milestone {
  id: string
  title: string
  description: string
  dueDate: string
  status: 'pending' | 'in-progress' | 'completed'
  progress: number
}

export interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'review' | 'completed'
  priority: 'low' | 'medium' | 'high'
  assignee: string
  dueDate: string
  estimatedHours: number
  actualHours: number
  tags: string[]
}

// Workspace Types
export interface Workspace {
  id: string
  name: string
  description: string
  slug: string
  createdAt: string
  updatedAt: string
  createdBy: string
  members: WorkspaceMember[]
  settings: WorkspaceSettings
}

export interface WorkspaceMember {
  userId: string
  role: 'admin' | 'member' | 'viewer'
  joinedAt: string
  permissions: string[]
}

export interface WorkspaceSettings {
  allowGuestAccess: boolean
  defaultProjectVisibility: 'public' | 'private'
  requireApprovalForProjects: boolean
}

// Source Types
export interface Source {
  id: string
  title: string
  description: string
  url: string
  type: 'article' | 'video' | 'document' | 'link' | 'other'
  tags: string[]
  sharedBy: string
  sharedAt: string
  projectId?: string
}

// Chat Message Types
export interface ChatMessage {
  id: string
  content: string
  senderId: string
  timestamp: string
  projectId?: string
  replyTo?: string
}

// Progress Types
export interface ProgressGoal {
  id: string
  title: string
  description: string
  target: number
  current: number
  unit: string
  dueDate: string
  projectId?: string
}

// Workspace Context Types
interface WorkspaceContextType {
  // Current Workspace
  currentWorkspace: Workspace | null
  setCurrentWorkspace: (workspace: Workspace | null) => void
  
  // Workspaces Management
  workspaces: Workspace[]
  userWorkspaces: Workspace[]
  createWorkspace: (workspace: Omit<Workspace, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateWorkspace: (id: string, updates: Partial<Workspace>) => Promise<void>
  deleteWorkspace: (id: string) => Promise<void>
  switchWorkspace: (workspaceId: string) => Promise<void>
  
  // Team Members (scoped to current workspace)
  teamMembers: Member[]
  totalMembers: number
  activeMembers: number
  pendingInvites: number
  refreshTeamMembers: () => Promise<void>
  addTeamMember: (member: Omit<Member, 'id'>) => Promise<void>
  updateTeamMember: (id: string, updates: Partial<Member>) => Promise<void>
  removeTeamMember: (id: string) => Promise<void>
  
  // API Keys (scoped to current workspace)
  apiKeys: ApiKey[]
  totalApiKeys: number
  activeApiKeys: number
  refreshApiKeys: () => Promise<void>
  addApiKey: (apiKey: Omit<ApiKey, 'id' | 'createdAt'>) => Promise<void>
  updateApiKey: (id: string, updates: Partial<ApiKey>) => Promise<void>
  deleteApiKey: (id: string) => Promise<void>
  
  // Projects (scoped to current workspace)
  projects: Project[]
  totalProjects: number
  activeProjects: number
  completedProjects: number
  refreshProjects: () => Promise<void>
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  addProjectActivity: (projectId: string, activity: Omit<WorkspaceContextType['recentActivity'][0], 'id' | 'timestamp'>) => void
  
  // Sources (scoped to current workspace)
  sources: Source[]
  refreshSources: () => Promise<void>
  addSource: (source: Omit<Source, 'id' | 'sharedAt'>) => Promise<void>
  updateSource: (id: string, updates: Partial<Source>) => Promise<void>
  deleteSource: (id: string) => Promise<void>
  
  // Team Chat (scoped to current workspace)
  chatMessages: ChatMessage[]
  refreshChatMessages: () => Promise<void>
  sendMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => Promise<void>
  
  // Progress Tracking (scoped to current workspace)
  progressGoals: ProgressGoal[]
  refreshProgressGoals: () => Promise<void>
  addProgressGoal: (goal: Omit<ProgressGoal, 'id'>) => Promise<void>
  updateProgressGoal: (id: string, updates: Partial<ProgressGoal>) => Promise<void>
  deleteProgressGoal: (id: string) => Promise<void>
  
        // Workspace Stats
      workspaceStats: {
        totalProjects: number
        activeCollaborations: number
        recentActivity: number
        securityScore: number
        projectProgress: number
        totalBudget: number
        spentBudget: number
      }
  
  // Recent Activity
  recentActivity: Array<{
    id: string
    type: 'team' | 'api' | 'workspace' | 'project' | 'source' | 'chat' | 'progress'
    action: string
    description: string
    timestamp: string
    user: string
    projectId?: string
  }>
  
  // Add activity
  addActivity: (activity: Omit<WorkspaceContextType['recentActivity'][0], 'id' | 'timestamp'>) => void
  
  // User Permissions
  userRole: 'admin' | 'member' | 'viewer' | null
  hasPermission: (permission: string) => boolean
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined)

export function useWorkspace() {
  const context = useContext(WorkspaceContext)
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider')
  }
  return context
}

interface WorkspaceProviderProps {
  children: ReactNode
}

export function WorkspaceProvider({ children }: WorkspaceProviderProps) {
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null)
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [teamMembers, setTeamMembers] = useState<Member[]>([])
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [sources, setSources] = useState<Source[]>([])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [progressGoals, setProgressGoals] = useState<ProgressGoal[]>([])
  const [recentActivity, setRecentActivity] = useState<WorkspaceContextType['recentActivity']>([])

  // Get current user ID from Firebase auth - this will update when auth state changes
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  // Define functions first
  const addActivity = useCallback((activity: Omit<WorkspaceContextType['recentActivity'][0], 'id' | 'timestamp'>) => {
    const newActivity = {
      ...activity,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toLocaleString()
    }
    
    setRecentActivity(prev => [newActivity, ...prev.slice(0, 9)]) // Keep only last 10 activities
  }, [])

  // Workspace Management Functions
  const createWorkspace = useCallback(async (workspace: Omit<Workspace, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newWorkspace: Workspace = {
      ...workspace,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    setWorkspaces(prev => [...prev, newWorkspace])
    
    // Add current user as admin, only if currentUserId is not null
    if (currentUserId) {
      newWorkspace.members.push({
        userId: currentUserId,
        role: 'admin',
        joinedAt: new Date().toISOString(),
        permissions: ['*'] // All permissions for admin
      })
    }
    
    addActivity({
      type: 'workspace',
      action: 'created',
      description: `Workspace "${newWorkspace.name}" created`,
      user: 'System'
    })
  }, [addActivity, currentUserId])

  const updateWorkspace = useCallback(async (id: string, updates: Partial<Workspace>) => {
    setWorkspaces(prev => prev.map(workspace => 
      workspace.id === id 
        ? { ...workspace, ...updates, updatedAt: new Date().toISOString() }
        : workspace
    ))
    
    addActivity({
      type: 'workspace',
      action: 'updated',
      description: `Workspace updated`,
      user: 'System'
    })
  }, [addActivity])

  const deleteWorkspace = useCallback(async (id: string) => {
    const workspace = workspaces.find(w => w.id === id)
    setWorkspaces(prev => prev.filter(w => w.id !== id))
    
    if (currentWorkspace?.id === id) {
      setCurrentWorkspace(null)
    }
    
    if (workspace) {
      addActivity({
        type: 'workspace',
        action: 'deleted',
        description: `Workspace "${workspace.name}" deleted`,
        user: 'System'
      })
    }
  }, [addActivity, workspaces, currentWorkspace])

  const switchWorkspace = useCallback(async (workspaceId: string) => {
    const workspace = workspaces.find(w => w.id === workspaceId)
    if (workspace) {
      setCurrentWorkspace(workspace)
      
      // Clear current workspace data
      setTeamMembers([])
      setApiKeys([])
      setProjects([])
      setSources([])
      setChatMessages([])
      setProgressGoals([])
      setRecentActivity([])
      
      // Load new workspace data
      await Promise.all([
        refreshTeamMembers(),
        refreshApiKeys(),
        refreshProjects(),
        refreshSources(),
        refreshChatMessages(),
        refreshProgressGoals()
      ])
      
      addActivity({
        type: 'workspace',
        action: 'switched',
        description: `Switched to workspace "${workspace.name}"`,
        user: 'System'
      })
    }
  }, [workspaces, addActivity])

  // Team Members Functions
  const refreshTeamMembers = useCallback(async () => {
    console.log('refreshTeamMembers called, currentWorkspace:', !!currentWorkspace)
    if (!currentWorkspace) return
    
    try {
      // Mock data - in production, this would fetch from Firestore with workspace filter
      const mockMembers: Member[] = [
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Developer', lastActive: '2 hours ago' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', lastActive: '1 hour ago' },
        { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'Project Manager', lastActive: '30 minutes ago' },
        { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'QA Engineer', lastActive: '3 hours ago' },
        { id: '5', name: 'David Brown', email: 'david@example.com', role: 'DevOps Engineer', lastActive: '1 day ago' }
      ]
      
      console.log('Setting team members:', mockMembers)
      setTeamMembers(mockMembers)
      
      addActivity({
        type: 'team',
        action: 'refresh',
        description: 'Team members refreshed',
        user: 'System'
      })
    } catch (error) {
      console.error('Failed to fetch team members:', error)
    }
  }, [currentWorkspace, addActivity])

  const addTeamMember = useCallback(async (member: Omit<Member, 'id'>) => {
    const newMember: Member = {
      ...member,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }
    
    setTeamMembers(prev => [...prev, newMember])
    
    addActivity({
      type: 'team',
      action: 'added',
      description: `Team member "${newMember.name}" added`,
      user: 'System'
    })
  }, [addActivity])

  const updateTeamMember = useCallback(async (id: string, updates: Partial<Member>) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === id ? { ...member, ...updates } : member
    ))
    
    addActivity({
      type: 'team',
      action: 'updated',
      description: 'Team member updated',
      user: 'System'
    })
  }, [addActivity])

  const removeTeamMember = useCallback(async (id: string) => {
    const member = teamMembers.find(m => m.id === id)
    setTeamMembers(prev => prev.filter(m => m.id !== id))
    
    if (member) {
      addActivity({
        type: 'team',
        action: 'removed',
        description: `Team member "${member.name}" removed`,
        user: 'System'
      })
    }
  }, [addActivity, teamMembers])

  // API Keys Functions
  const refreshApiKeys = useCallback(async () => {
    if (!currentWorkspace) return
    
    try {
      // Mock data - in production, this would fetch from Firestore with workspace filter
      const mockKeys: ApiKey[] = [
        { id: '1', name: 'Production API Key', key: 'prod_123456789', status: 'active', createdAt: '2024-01-01', lastUsed: '2024-01-25' },
        { id: '2', name: 'Development API Key', key: 'dev_987654321', status: 'active', createdAt: '2024-01-15', lastUsed: '2024-01-24' },
        { id: '3', name: 'Testing API Key', key: 'test_456789123', status: 'inactive', createdAt: '2024-01-10', lastUsed: '2024-01-20' }
      ]
      
      setApiKeys(mockKeys)
      
      addActivity({
        type: 'api',
        action: 'refresh',
        description: 'API keys refreshed',
        user: 'System'
      })
    } catch (error) {
      console.error('Failed to fetch API keys:', error)
    }
  }, [currentWorkspace, addActivity])

  const addApiKey = useCallback(async (apiKey: Omit<ApiKey, 'id' | 'createdAt'>) => {
    const newApiKey: ApiKey = {
      ...apiKey,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    }
    
    setApiKeys(prev => [...prev, newApiKey])
    
    addActivity({
      type: 'api',
      action: 'created',
      description: `API key "${newApiKey.name}" created`,
      user: 'System'
    })
  }, [addActivity])

  const updateApiKey = useCallback(async (id: string, updates: Partial<ApiKey>) => {
    setApiKeys(prev => prev.map(key => 
      key.id === id ? { ...key, ...updates } : key
    ))
    
    addActivity({
      type: 'api',
      action: 'updated',
      description: 'API key updated',
      user: 'System'
    })
  }, [addActivity])

  const deleteApiKey = useCallback(async (id: string) => {
    const apiKey = apiKeys.find(k => k.id === id)
    setApiKeys(prev => prev.filter(k => k.id !== id))
    
    if (apiKey) {
      addActivity({
        type: 'api',
        action: 'deleted',
        description: `API key "${apiKey.name}" deleted`,
        user: 'System'
      })
    }
  }, [addActivity, apiKeys])

  // Projects Functions
  const refreshProjects = useCallback(async () => {
    console.log('refreshProjects called, currentWorkspace:', !!currentWorkspace)
    if (!currentWorkspace) return
    
    try {
      // Mock data - in production, this would fetch from Firestore with workspace filter
      const mockProjects: Project[] = [
        {
          id: '1',
          name: 'API Gateway Redesign',
          description: 'Redesign and modernize the API gateway infrastructure with microservices architecture and enhanced security features',
          status: 'active',
          priority: 'high',
          progress: 65,
          startDate: '2024-01-15',
          dueDate: '2024-03-30',
          budget: 500000,
          spentBudget: 325000,
          teamMembers: ['1', '2', '3'],
          tags: ['backend', 'infrastructure', 'api', 'microservices', 'security'],
          milestones: [
            { id: 'm1', title: 'Architecture Design', description: 'Complete system architecture and technical specifications', dueDate: '2024-02-01', status: 'completed', progress: 100 },
            { id: 'm2', title: 'Development Phase', description: 'Core development work and API implementation', dueDate: '2024-02-28', status: 'in-progress', progress: 65 },
            { id: 'm3', title: 'Testing & Deployment', description: 'Final testing, security audit, and production deployment', dueDate: '2024-03-30', status: 'pending', progress: 0 }
          ],
          tasks: [
            { id: 't1', title: 'Design API endpoints', description: 'Design new REST API endpoints with OpenAPI documentation', status: 'completed', priority: 'high', assignee: '1', dueDate: '2024-01-25', estimatedHours: 16, actualHours: 14, tags: ['design'] },
            { id: 't2', title: 'Implement authentication', description: 'Implement JWT authentication with OAuth2 integration', status: 'in-progress', priority: 'high', assignee: '2', dueDate: '2024-02-10', estimatedHours: 24, actualHours: 18, tags: ['security'] },
            { id: 't3', title: 'Database optimization', description: 'Optimize database queries and implement caching layer', status: 'todo', priority: 'medium', assignee: '3', dueDate: '2024-02-20', estimatedHours: 20, actualHours: 0, tags: ['database'] }
          ],
          createdAt: '2024-01-15',
          updatedAt: '2024-01-25',
          createdBy: '1'
        },
        {
          id: '2',
          name: 'Mobile App Development',
          description: 'Develop a comprehensive mobile application for iOS and Android with cross-platform compatibility',
          status: 'planning',
          priority: 'medium',
          progress: 15,
          startDate: '2024-02-01',
          dueDate: '2024-06-30',
          budget: 1200000,
          spentBudget: 180000,
          teamMembers: ['2', '4', '5'],
          tags: ['mobile', 'ios', 'android', 'ui/ux', 'react-native', 'cross-platform'],
          milestones: [
            { id: 'm4', title: 'UI/UX Design', description: 'Complete mobile app design and user experience planning', dueDate: '2024-02-28', status: 'in-progress', progress: 15 },
            { id: 'm5', title: 'Development', description: 'Core app development with React Native framework', dueDate: '2024-05-15', status: 'pending', progress: 0 },
            { id: 'm6', title: 'Testing & Launch', description: 'Comprehensive testing and app store launch preparation', dueDate: '2024-06-30', status: 'pending', progress: 0 }
          ],
          tasks: [
            { id: 't4', title: 'Design app wireframes', description: 'Create detailed wireframes for all app screens', status: 'in-progress', priority: 'medium', assignee: '4', dueDate: '2024-02-15', estimatedHours: 40, actualHours: 6, tags: ['design'] },
            { id: 't5', title: 'Set up development environment', description: 'Configure React Native development environment', status: 'todo', priority: 'low', assignee: '2', dueDate: '2024-02-20', estimatedHours: 8, actualHours: 0, tags: ['setup'] }
          ],
          createdAt: '2024-01-20',
          updatedAt: '2024-01-25',
          createdBy: '2'
        }
      ]
      
      console.log('Setting projects:', mockProjects)
      setProjects(mockProjects)
      
      addActivity({
        type: 'project',
        action: 'refresh',
        description: 'Projects refreshed',
        user: 'System'
      })
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    }
  }, [currentWorkspace, addActivity])

  const addProject = useCallback(async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...project,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    setProjects(prev => [newProject, ...prev])
    
    addActivity({
      type: 'project',
      action: 'created',
      description: `Project "${newProject.name}" created`,
      user: 'System',
      projectId: newProject.id
    })
  }, [addActivity])

  const updateProject = useCallback(async (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id 
        ? { ...project, ...updates, updatedAt: new Date().toISOString() }
        : project
    ))
    
    const project = projects.find(p => p.id === id)
    if (project) {
      addActivity({
        type: 'project',
        action: 'updated',
        description: `Project "${project.name}" updated`,
        user: 'System',
        projectId: id
      })
    }
  }, [addActivity, projects])

  const deleteProject = useCallback(async (id: string) => {
    const project = projects.find(p => p.id === id)
    setProjects(prev => prev.filter(p => p.id !== id))
    
    if (project) {
      addActivity({
        type: 'project',
        action: 'deleted',
        description: `Project "${project.name}" deleted`,
        user: 'System'
      })
    }
  }, [addActivity, projects])

  const addProjectActivity = useCallback((projectId: string, activity: Omit<WorkspaceContextType['recentActivity'][0], 'id' | 'timestamp'>) => {
    addActivity({
      ...activity,
      projectId
    })
  }, [addActivity])

  // Sources Functions
  const refreshSources = useCallback(async () => {
    if (!currentWorkspace) return
    
    try {
      // Mock data - in production, this would fetch from Firestore with workspace filter
      const mockSources: Source[] = [
        {
          id: '1',
          title: 'React Best Practices Guide',
          description: 'Comprehensive guide to React development best practices',
          url: 'https://react.dev/learn',
          type: 'article',
          tags: ['react', 'frontend', 'best-practices'],
          sharedBy: '1',
          sharedAt: '2024-01-25'
        },
        {
          id: '2',
          title: 'API Design Principles',
          description: 'Modern API design principles and patterns',
          url: 'https://example.com/api-design',
          type: 'document',
          tags: ['api', 'design', 'architecture'],
          sharedBy: '2',
          sharedAt: '2024-01-24'
        }
      ]
      
      setSources(mockSources)
      
      addActivity({
        type: 'source',
        action: 'refresh',
        description: 'Sources refreshed',
        user: 'System'
      })
    } catch (error) {
      console.error('Failed to fetch sources:', error)
    }
  }, [currentWorkspace, addActivity])

  const addSource = useCallback(async (source: Omit<Source, 'id' | 'sharedAt'>) => {
    const newSource: Source = {
      ...source,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sharedAt: new Date().toISOString()
    }
    
    setSources(prev => [newSource, ...prev])
    
    addActivity({
      type: 'source',
      action: 'shared',
      description: `Source "${newSource.title}" shared`,
      user: 'System'
    })
  }, [addActivity])

  const updateSource = useCallback(async (id: string, updates: Partial<Source>) => {
    setSources(prev => prev.map(source => 
      source.id === id ? { ...source, ...updates } : source
    ))
    
    addActivity({
      type: 'source',
      action: 'updated',
      description: 'Source updated',
      user: 'System'
    })
  }, [addActivity])

  const deleteSource = useCallback(async (id: string) => {
    const source = sources.find(s => s.id === id)
    setSources(prev => prev.filter(s => s.id !== id))
    
    if (source) {
      addActivity({
        type: 'source',
        action: 'deleted',
        description: `Source "${source.title}" deleted`,
        user: 'System'
      })
    }
  }, [addActivity, sources])

  // Chat Functions
  const refreshChatMessages = useCallback(async () => {
    if (!currentWorkspace) return
    
    try {
      // Mock data - in production, this would fetch from Firestore with workspace filter
      const mockMessages: ChatMessage[] = [
        {
          id: '1',
          content: 'Good morning team! How are we doing with the API redesign?',
          senderId: '1',
          timestamp: '2024-01-25T09:00:00Z'
        },
        {
          id: '2',
          content: 'Making good progress! The authentication module is almost complete.',
          senderId: '2',
          timestamp: '2024-01-25T09:05:00Z'
        }
      ]
      
      setChatMessages(mockMessages)
      
      addActivity({
        type: 'chat',
        action: 'refresh',
        description: 'Chat messages refreshed',
        user: 'System'
      })
    } catch (error) {
      console.error('Failed to fetch chat messages:', error)
    }
  }, [currentWorkspace, addActivity])

  const sendMessage = useCallback(async (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    }
    
    setChatMessages(prev => [...prev, newMessage])
    
    addActivity({
      type: 'chat',
      action: 'sent',
      description: 'New message sent',
      user: 'System'
    })
  }, [addActivity])

  // Progress Functions
  const refreshProgressGoals = useCallback(async () => {
    if (!currentWorkspace) return
    
    try {
      // Mock data - in production, this would fetch from Firestore with workspace filter
      const mockGoals: ProgressGoal[] = [
        {
          id: '1',
          title: 'Complete API Endpoints',
          description: 'Finish designing all API endpoints',
          target: 20,
          current: 15,
          unit: 'endpoints',
          dueDate: '2024-02-01'
        },
        {
          id: '2',
          title: 'Code Review Coverage',
          description: 'Achieve 100% code review coverage',
          target: 100,
          current: 85,
          unit: '%',
          dueDate: '2024-01-31'
        }
      ]
      
      setProgressGoals(mockGoals)
      
      addActivity({
        type: 'progress',
        action: 'refresh',
        description: 'Progress goals refreshed',
        user: 'System'
      })
    } catch (error) {
      console.error('Failed to fetch progress goals:', error)
    }
  }, [currentWorkspace, addActivity])

  const addProgressGoal = useCallback(async (goal: Omit<ProgressGoal, 'id'>) => {
    const newGoal: ProgressGoal = {
      ...goal,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }
    
    setProgressGoals(prev => [...prev, newGoal])
    
    addActivity({
      type: 'progress',
      action: 'added',
      description: `Progress goal "${newGoal.title}" added`,
      user: 'System'
    })
  }, [addActivity])

  const updateProgressGoal = useCallback(async (id: string, updates: Partial<ProgressGoal>) => {
    setProgressGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, ...updates } : goal
    ))
    
    addActivity({
      type: 'progress',
      action: 'updated',
      description: 'Progress goal updated',
      user: 'System'
    })
  }, [addActivity])

  const deleteProgressGoal = useCallback(async (id: string) => {
    const goal = progressGoals.find(g => g.id === id)
    setProgressGoals(prev => prev.filter(g => g.id !== id))
    
    if (goal) {
      addActivity({
        type: 'progress',
        action: 'deleted',
        description: `Progress goal "${goal.title}" deleted`,
        user: 'System'
      })
    }
  }, [addActivity, progressGoals])

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('Auth state changed:', user ? 'User signed in' : 'User signed out')
      if (user) {
        // Set current user ID
        setCurrentUserId(user.uid)
        
        // User is signed in, initialize workspaces
        const mockWorkspaces: Workspace[] = [
          {
            id: '1',
            name: 'KeyNest Main',
            description: 'Main workspace for KeyNest platform development',
            slug: 'keynest-main',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-25T00:00:00Z',
            createdBy: user.uid,
            members: [
              { userId: user.uid, role: 'admin', joinedAt: '2024-01-01T00:00:00Z', permissions: ['*'] }
            ],
            settings: {
              allowGuestAccess: false,
              defaultProjectVisibility: 'private',
              requireApprovalForProjects: true
            }
          },
          {
            id: '2',
            name: 'Side Projects',
            description: 'Personal and experimental projects',
            slug: 'side-projects',
            createdAt: '2024-01-15T00:00:00Z',
            updatedAt: '2024-01-25T00:00:00Z',
            createdBy: user.uid,
            members: [
              { userId: user.uid, role: 'admin', joinedAt: '2024-01-15T00:00:00Z', permissions: ['*'] }
            ],
            settings: {
              allowGuestAccess: true,
              defaultProjectVisibility: 'public',
              requireApprovalForProjects: false
            }
          }
        ]
        
        console.log('Setting workspaces:', mockWorkspaces)
        setWorkspaces(mockWorkspaces)
        
        // Set first workspace as current
        if (mockWorkspaces.length > 0) {
          console.log('Setting current workspace:', mockWorkspaces[0])
          setCurrentWorkspace(mockWorkspaces[0])
          
          // Immediately load data for this workspace
          setTimeout(() => {
            console.log('Immediately loading data for new workspace...')
            Promise.all([
              refreshTeamMembers(),
              refreshApiKeys(),
              refreshProjects(),
              refreshSources(),
              refreshChatMessages(),
              refreshProgressGoals()
            ]).then(() => {
              console.log('Initial data load completed')
            }).catch((error) => {
              console.error('Error in initial data load:', error)
            })
          }, 200)
        }
      } else {
        // User is signed out, clear workspaces
        console.log('Clearing all data - user signed out')
        setCurrentUserId(null)
        setWorkspaces([])
        setCurrentWorkspace(null)
        setTeamMembers([])
        setApiKeys([])
        setProjects([])
        setSources([])
        setChatMessages([])
        setProgressGoals([])
        setRecentActivity([])
      }
    })

    return () => unsubscribe()
  }, [])

  // Load workspace data when current workspace changes
  useEffect(() => {
    console.log('Data loading effect triggered:', { currentWorkspace: !!currentWorkspace, currentUserId: !!currentUserId })
    if (currentWorkspace && currentUserId) {
      console.log('Loading workspace data...')
      // Add a small delay to ensure auth state is fully established
      const timer = setTimeout(() => {
        console.log('Executing data loading...')
        Promise.all([
          refreshTeamMembers(),
          refreshApiKeys(),
          refreshProjects(),
          refreshSources(),
          refreshChatMessages(),
          refreshProgressGoals()
        ]).then(() => {
          console.log('All data loaded successfully')
        }).catch((error) => {
          console.error('Error loading data:', error)
        })
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [currentWorkspace, currentUserId, refreshTeamMembers, refreshApiKeys, refreshProjects, refreshSources, refreshChatMessages, refreshProgressGoals])

  // Calculate derived stats
  const totalMembers = teamMembers.length
  const activeMembers = teamMembers.filter(m => (m.lastActive || "").includes("hour")).length
  const pendingInvites = 2 // This could be fetched from a separate collection
  
  const totalApiKeys = apiKeys.length
  const activeApiKeys = apiKeys.filter(key => key.status === 'active').length

  const totalProjects = projects.length
  const activeProjects = projects.filter(p => p.status === 'active').length
  const completedProjects = projects.filter(p => p.status === 'completed').length

  const workspaceStats = {
    totalProjects,
    activeCollaborations: teamMembers.filter(m => (m as any)?.contributions?.messagesSent > 0).length,
    recentActivity: recentActivity.length,
    securityScore: 100, // This could be calculated based on API key security, team permissions, etc.
    projectProgress: projects.length > 0 ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length) : 0,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    spentBudget: projects.reduce((sum, p) => sum + p.spentBudget, 0)
  }

  // User permissions
  const userRole = currentWorkspace?.members.find(m => m.userId === currentUserId)?.role || null
  
  console.log('User role calculation:', {
    currentWorkspace: !!currentWorkspace,
    currentUserId,
    members: currentWorkspace?.members,
    userRole
  })
  
  const hasPermission = useCallback((permission: string) => {
    if (!currentWorkspace || !userRole) return false
    const member = currentWorkspace.members.find(m => m.userId === currentUserId)
    if (!member) return false
    
    if (member.permissions.includes('*')) return true
    return member.permissions.includes(permission)
  }, [currentWorkspace, userRole, currentUserId])

  // User workspaces (workspaces where user is a member)
  const userWorkspaces = workspaces.filter(workspace => 
    workspace.members.some(member => member.userId === currentUserId)
  )

  const value: WorkspaceContextType = {
    // Current Workspace
    currentWorkspace,
    setCurrentWorkspace,
    
    // Workspaces Management
    workspaces,
    userWorkspaces,
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
    switchWorkspace,
    
    // Team Members
    teamMembers,
    totalMembers,
    activeMembers,
    pendingInvites,
    refreshTeamMembers,
    addTeamMember,
    updateTeamMember,
    removeTeamMember,
    
    // API Keys
    apiKeys,
    totalApiKeys,
    activeApiKeys,
    refreshApiKeys,
    addApiKey,
    updateApiKey,
    deleteApiKey,
    
    // Projects
    projects,
    totalProjects,
    activeProjects,
    completedProjects,
    refreshProjects,
    addProject,
    updateProject,
    deleteProject,
    addProjectActivity,
    
    // Sources
    sources,
    refreshSources,
    addSource,
    updateSource,
    deleteSource,
    
    // Team Chat
    chatMessages,
    refreshChatMessages,
    sendMessage,
    
    // Progress Tracking
    progressGoals,
    refreshProgressGoals,
    addProgressGoal,
    updateProgressGoal,
    deleteProgressGoal,
    
    // Workspace Stats
    workspaceStats,
    
    // Recent Activity
    recentActivity,
    addActivity,
    
    // User Permissions
    userRole,
    hasPermission
  }

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  )
}
