"use client"

import { useState, useEffect } from "react"
import { useWorkspace } from "@/lib/workspace-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  MessageSquare, 
  Share2, 
  Code, 
  FileText, 
  Link, 
  Users, 
  Crown, 
  Star, 
  Target, 
  CheckCircle, 
  Clock, 
  Plus,
  Search,
  Filter,
  Pin,
  Send,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Download,
  GitBranch,
  Globe,
  BookOpen,
  Zap,
  ThumbsUp,
  FolderOpen
} from "lucide-react"

// Types
interface Source {
  id: string
  title: string
  description: string
  type: "code" | "repo" | "api" | "docs" | "resource"
  category: string
  tags: string[]
  content: string
  author: {
    id: string
    name: string
    avatar: string
    role: string
  }
  createdAt: string
  likes: number
  comments: Comment[]
  isPinned: boolean
  url?: string
}

interface Comment {
  id: string
  content: string
  author: {
    id: string
    name: string
    avatar: string
  }
  createdAt: string
  likes: number
}

interface ChatMessage {
  id: string
  content: string
  author: {
    id: string
    name: string
    avatar: string
    role: string
  }
  channel: string
  createdAt: string
  isPinned: boolean
  linkedTask?: string
  linkedSource?: string
}

interface TeamMember {
  id: string
  name: string
  avatar: string
  role: string
  skills: string[]
  bio: string
  portfolio: {
    github?: string
    linkedin?: string
    website?: string
  }
  contributions: {
    sourcesShared: number
    tasksCompleted: number
    messagesSent: number
  }
  currentRole: string
}

interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "done"
  priority: "low" | "medium" | "high"
  assignee: string
  dueDate: string
  category: string
  progress: number
}

interface Goal {
  id: string
  title: string
  description: string
  target: string
  current: number
  total: number
  deadline: string
  status: "on-track" | "at-risk" | "completed"
}

interface Project {
  id: string
  title: string
  description: string
  status: "planning" | "active" | "on-hold" | "completed" | "cancelled"
  priority: "low" | "medium" | "high" | "urgent"
  progress: number
  startDate: string
  dueDate: string
  owner: {
    id: string
    name: string
    avatar: string
  }
  team: Array<{
    id: string
    name: string
    avatar: string
    role: "lead" | "developer" | "designer" | "tester" | "reviewer"
  }>
  tags: string[]
  category: string
  budget: {
    allocated: number
    spent: number
    currency: string
  }
  milestones: Array<{
    id: string
    title: string
    description: string
    dueDate: string
    status: "pending" | "in-progress" | "completed"
    progress: number
  }>
  tasks: Array<{
    id: string
    title: string
    status: "todo" | "in-progress" | "review" | "done"
    assignee: string
    priority: "low" | "medium" | "high"
    dueDate: string
  }>
  files: Array<{
    id: string
    name: string
    type: string
    size: string
    uploadedBy: string
    uploadedAt: string
  }>
  createdAt: string
  updatedAt: string
}

// Mock Data
const initialSources: Source[] = [
  {
    id: "1",
    title: "YouTube: Complete React Tutorial 2024",
    description: "Comprehensive React tutorial covering hooks, context, and modern patterns",
    type: "resource",
    category: "Frontend",
    tags: ["React", "YouTube", "Tutorial", "Video"],
    content: "",
    author: {
      id: "2",
      name: "Mike Johnson",
      avatar: "/placeholder-user.jpg",
      role: "Backend Developer"
    },
    createdAt: "1 day ago",
    likes: 18,
    comments: [],
    isPinned: false,
    url: "https://youtube.com/watch?v=example-react-tutorial"
  },
  {
    id: "2",
    title: "GitHub: Microservices Architecture Examples",
    description: "Complete microservices implementation with Docker and Kubernetes",
    type: "repo",
    category: "Architecture",
    tags: ["Microservices", "Docker", "Kubernetes", "Node.js"],
    content: "https://github.com/example/microservices-demo",
    author: {
      id: "3",
      name: "Alex Rodriguez",
      avatar: "/placeholder-user.jpg",
      role: "Architect"
    },
    createdAt: "3 days ago",
    likes: 32,
    comments: [],
    isPinned: true,
    url: "https://github.com/example/microservices-demo"
  },
  {
    id: "3",
    title: "CSS Grid Layout Tutorial",
    description: "Complete guide to CSS Grid with practical examples and responsive design",
    type: "resource",
    category: "Frontend",
    tags: ["CSS", "Grid", "Layout", "Responsive"],
    content: "",
    author: {
      id: "1",
      name: "Sarah Chen",
      avatar: "/placeholder-user.jpg",
      role: "Senior Developer"
    },
    createdAt: "4 days ago",
    likes: 15,
    comments: [],
    isPinned: false,
    url: "https://css-tricks.com/snippets/css/complete-guide-grid/"
  },
  {
    id: "4",
    title: "Stack Overflow: Node.js Performance Optimization",
    description: "Best practices and techniques for optimizing Node.js applications",
    type: "resource",
    category: "Backend",
    tags: ["Node.js", "Performance", "Optimization", "Stack Overflow"],
    content: "",
    author: {
      id: "2",
      name: "Mike Johnson",
      avatar: "/placeholder-user.jpg",
      role: "Backend Developer"
    },
    createdAt: "1 week ago",
    likes: 28,
    comments: [],
    isPinned: false,
    url: "https://stackoverflow.com/questions/nodejs-performance-optimization"
  },
  {
    id: "5",
    title: "Medium: TypeScript Best Practices",
    description: "Advanced TypeScript patterns and real-world usage examples",
    type: "resource",
    category: "Frontend",
    tags: ["TypeScript", "Best Practices", "Medium", "Article"],
    content: "",
    author: {
      id: "1",
      name: "Sarah Chen",
      avatar: "/placeholder-user.jpg",
      role: "Senior Developer"
    },
    createdAt: "1 week ago",
    likes: 22,
    comments: [],
    isPinned: false,
    url: "https://medium.com/typescript-best-practices"
  },
  {
    id: "6",
    title: "MDN: JavaScript ES6+ Features",
    description: "Comprehensive guide to modern JavaScript features and syntax",
    type: "docs",
    category: "Frontend",
    tags: ["JavaScript", "ES6", "MDN", "Documentation"],
    content: "Modern JavaScript features including arrow functions, destructuring, and modules...",
    author: {
      id: "3",
      name: "Alex Rodriguez",
      avatar: "/placeholder-user.jpg",
      role: "Architect"
    },
    createdAt: "2 weeks ago",
    likes: 35,
    comments: [],
    isPinned: false,
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
  },
  {
    id: "7",
    title: "Dev.to: CSS Animation Techniques",
    description: "Creative CSS animations and transitions for modern web design",
    type: "resource",
    category: "Design",
    tags: ["CSS", "Animations", "Design", "Dev.to"],
    content: "",
    author: {
      id: "2",
      name: "Mike Johnson",
      avatar: "/placeholder-user.jpg",
      role: "Backend Developer"
    },
    createdAt: "2 weeks ago",
    likes: 19,
    comments: [],
    isPinned: false,
    url: "https://dev.to/css-animation-techniques"
  }
]

const initialChatMessages: ChatMessage[] = [
  {
    id: "1",
    content: "Has anyone tried the new React 18 features?",
    author: {
      id: "1",
      name: "Sarah Chen",
      avatar: "/placeholder-user.jpg",
      role: "Senior Developer"
    },
    channel: "frontend",
    createdAt: "5 minutes ago",
    isPinned: false
  },
  {
    id: "2",
    content: "Yes! The concurrent features are amazing for performance",
    author: {
      id: "2",
      name: "Mike Johnson",
      avatar: "/placeholder-user.jpg",
      role: "Backend Developer"
    },
    channel: "frontend",
    createdAt: "3 minutes ago",
    isPinned: false
  }
]

const initialTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "/placeholder-user.jpg",
    role: "admin",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    bio: "Full-stack developer with 5+ years of experience",
    portfolio: {
      github: "https://github.com/sarahchen",
      linkedin: "https://linkedin.com/in/sarahchen"
    },
    contributions: {
      sourcesShared: 15,
      tasksCompleted: 28,
      messagesSent: 156
    },
    currentRole: "Senior Developer"
  },
  {
    id: "2",
    name: "Mike Johnson",
    avatar: "/placeholder-user.jpg",
    role: "member",
    skills: ["Python", "Django", "PostgreSQL", "Docker"],
    bio: "Backend developer specializing in Python and databases",
    portfolio: {
      github: "https://github.com/mikejohnson"
    },
    contributions: {
      sourcesShared: 8,
      tasksCompleted: 22,
      messagesSent: 89
    },
    currentRole: "Backend Developer"
  }
]

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Implement user authentication",
    description: "Add JWT-based authentication to the API",
    status: "in-progress",
    priority: "high",
    assignee: "Mike Johnson",
    dueDate: "2024-01-15",
    category: "Backend",
    progress: 75
  },
  {
    id: "2",
    title: "Design mobile responsive UI",
    description: "Make the dashboard mobile-friendly",
    status: "todo",
    priority: "medium",
    assignee: "Sarah Chen",
    dueDate: "2024-01-20",
    category: "Frontend",
    progress: 0
  }
]

const initialGoals: Goal[] = [
  {
    id: "1",
    title: "Q1 Product Launch",
    description: "Launch the new product features",
    target: "March 31, 2024",
    current: 8,
    total: 12,
    deadline: "2024-03-31",
    status: "on-track"
  },
  {
    id: "2",
    title: "API Documentation",
    description: "Complete comprehensive API documentation",
    target: "February 15, 2024",
    current: 3,
    total: 5,
    deadline: "2024-02-15",
    status: "at-risk"
  }
]

const initialProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform Redesign",
    description: "Complete redesign of the main e-commerce platform with modern UI/UX, improved performance, and mobile-first approach",
    status: "active",
    priority: "high",
    progress: 68,
    startDate: "2024-01-01",
    dueDate: "2024-03-31",
    owner: {
      id: "1",
      name: "Sarah Chen",
      avatar: "/placeholder-user.jpg"
    },
    team: [
      { id: "1", name: "Sarah Chen", avatar: "/placeholder-user.jpg", role: "lead" },
      { id: "2", name: "Mike Johnson", avatar: "/placeholder-user.jpg", role: "developer" },
      { id: "3", name: "Alex Rodriguez", avatar: "/placeholder-user.jpg", role: "designer" }
    ],
    tags: ["Frontend", "UI/UX", "E-commerce", "React"],
    category: "Frontend Development",
    budget: { allocated: 50000, spent: 34000, currency: "USD" },
    milestones: [
      { id: "1", title: "Design System", description: "Complete design system and component library", dueDate: "2024-01-15", status: "completed", progress: 100 },
      { id: "2", title: "Core Components", description: "Build reusable UI components", dueDate: "2024-02-01", status: "completed", progress: 100 },
      { id: "3", title: "Main Pages", description: "Implement main product and checkout pages", dueDate: "2024-02-15", status: "in-progress", progress: 75 },
      { id: "4", title: "Testing & QA", description: "Comprehensive testing and quality assurance", dueDate: "2024-03-15", status: "pending", progress: 0 }
    ],
    tasks: [
      { id: "1", title: "Design homepage layout", status: "done", assignee: "Alex Rodriguez", priority: "high", dueDate: "2024-01-10" },
      { id: "2", title: "Implement product grid", status: "in-progress", assignee: "Mike Johnson", priority: "high", dueDate: "2024-01-20" },
      { id: "3", title: "Add shopping cart functionality", status: "todo", assignee: "Sarah Chen", priority: "medium", dueDate: "2024-01-25" }
    ],
    files: [
      { id: "1", name: "design-system.sketch", type: "Design", size: "2.4 MB", uploadedBy: "Alex Rodriguez", uploadedAt: "2024-01-05" },
      { id: "2", name: "component-library.zip", type: "Code", size: "15.7 MB", uploadedBy: "Sarah Chen", uploadedAt: "2024-01-08" }
    ],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15"
  },
  {
    id: "2",
    title: "API Gateway Implementation",
    description: "Build a scalable API gateway with authentication, rate limiting, and monitoring for microservices architecture",
    status: "planning",
    priority: "urgent",
    progress: 15,
    startDate: "2024-02-01",
    dueDate: "2024-04-30",
    owner: {
      id: "2",
      name: "Mike Johnson",
      avatar: "/placeholder-user.jpg"
    },
    team: [
      { id: "2", name: "Mike Johnson", avatar: "/placeholder-user.jpg", role: "lead" },
      { id: "4", name: "Emma Wilson", avatar: "/placeholder-user.jpg", role: "developer" }
    ],
    tags: ["Backend", "API", "Microservices", "Node.js"],
    category: "Backend Development",
    budget: { allocated: 35000, spent: 5000, currency: "USD" },
    milestones: [
      { id: "1", title: "Architecture Design", description: "Design API gateway architecture", dueDate: "2024-02-15", status: "in-progress", progress: 60 },
      { id: "2", title: "Core Implementation", description: "Implement basic gateway functionality", dueDate: "2024-03-15", status: "pending", progress: 0 },
      { id: "3", title: "Security & Testing", description: "Add security features and testing", dueDate: "2024-04-15", status: "pending", progress: 0 }
    ],
    tasks: [
      { id: "1", title: "Research existing solutions", status: "done", assignee: "Mike Johnson", priority: "medium", dueDate: "2024-01-20" },
      { id: "2", title: "Design system architecture", status: "in-progress", assignee: "Mike Johnson", priority: "high", dueDate: "2024-02-01" },
      { id: "3", title: "Set up development environment", status: "todo", assignee: "Emma Wilson", priority: "low", dueDate: "2024-02-05" }
    ],
    files: [
      { id: "1", name: "architecture-diagram.pdf", type: "Documentation", size: "1.2 MB", uploadedBy: "Mike Johnson", uploadedAt: "2024-01-18" }
    ],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-18"
  },
  {
    id: "3",
    title: "Mobile App Development",
    description: "Create a cross-platform mobile app for iOS and Android using React Native with offline capabilities",
    status: "on-hold",
    priority: "medium",
    progress: 25,
    startDate: "2024-01-15",
    dueDate: "2024-06-30",
    owner: {
      id: "3",
      name: "Alex Rodriguez",
      avatar: "/placeholder-user.jpg"
    },
    team: [
      { id: "3", name: "Alex Rodriguez", avatar: "/placeholder-user.jpg", role: "lead" },
      { id: "5", name: "David Kim", avatar: "/placeholder-user.jpg", role: "developer" }
    ],
    tags: ["Mobile", "React Native", "iOS", "Android"],
    category: "Mobile Development",
    budget: { allocated: 75000, spent: 18000, currency: "USD" },
    milestones: [
      { id: "1", title: "App Design", description: "Complete app design and wireframes", dueDate: "2024-02-01", status: "completed", progress: 100 },
      { id: "2", title: "Core Features", description: "Implement basic app functionality", dueDate: "2024-03-01", status: "in-progress", progress: 40 },
      { id: "3", title: "Testing & Deployment", description: "Testing and app store deployment", dueDate: "2024-06-01", status: "pending", progress: 0 }
    ],
    tasks: [
      { id: "1", title: "Create app wireframes", status: "done", assignee: "Alex Rodriguez", priority: "high", dueDate: "2024-01-25" },
      { id: "2", title: "Set up React Native project", status: "done", assignee: "David Kim", priority: "medium", dueDate: "2024-01-30" },
      { id: "3", title: "Implement navigation", status: "in-progress", assignee: "David Kim", priority: "high", dueDate: "2024-02-10" }
    ],
    files: [
      { id: "1", name: "app-wireframes.fig", type: "Design", size: "8.9 MB", uploadedBy: "Alex Rodriguez", uploadedAt: "2024-01-20" },
      { id: "2", name: "project-setup.md", type: "Documentation", size: "45 KB", uploadedBy: "David Kim", uploadedAt: "2024-01-30" }
    ],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-30"
  }
]

export default function WorkspacePage() {
  // Custom CSS for line-clamp utilities
  const lineClampStyles = `
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `
  const [sources, setSources] = useState<Source[]>(initialSources)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [goals, setGoals] = useState<Goal[]>(initialGoals)
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  
  const { 
    teamMembers: contextTeamMembers, 
    totalMembers, 
    activeMembers,
    addActivity
  } = useWorkspace()
  
  // Use context team members instead of local state
  const teamMembers = contextTeamMembers.length > 0 ? contextTeamMembers.map(member => ({
    id: member.id,
    name: member.name,
    avatar: member.avatar || "/placeholder-user.jpg",
    role: member.role === "Owner" ? "admin" : member.role === "Editor" ? "member" : "viewer",
    skills: [], // Default empty skills array since Member type doesn't have skills
    bio: "", // Default empty bio since Member type doesn't have bio
    portfolio: {
      github: "", // Default empty since Member type doesn't have github
      linkedin: "", // Default empty since Member type doesn't have linkedin
      website: ""
    },
    contributions: {
      sourcesShared: 0, // Default 0 since Member type doesn't have contributions
      tasksCompleted: 0,
      messagesSent: 0
    },
    currentRole: member.role
  })) : initialTeamMembers
  
  const [activeTab, setActiveTab] = useState("sources")
  
  // Handle URL tab parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tabParam = urlParams.get('tab')
    if (tabParam && ['sources', 'chat', 'projects', 'profiles', 'roles', 'progress', 'recent'].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [selectedChannel, setSelectedChannel] = useState("general")
  
  const [showSourceDialog, setShowSourceDialog] = useState(false)
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false)
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false)
  const [newSource, setNewSource] = useState<{
    title: string
    description: string
    type: "code" | "repo" | "api" | "docs" | "resource"
    category: string
    tags: string
    content: string
    url: string
  }>({
    title: "",
    description: "",
    type: "code",
    category: "Frontend",
    tags: "",
    content: "",
    url: ""
  })
  const [newMember, setNewMember] = useState<{
    name: string
    email: string
    role: "admin" | "member" | "viewer"
    currentRole: string
    skills: string
    bio: string
  }>({
    name: "",
    email: "",
    role: "member",
    currentRole: "",
    skills: "",
    bio: ""
  })
  const [myProfile, setMyProfile] = useState<{
    name: string
    email: string
    bio: string
    skills: string[]
    portfolio: {
      github: string
      linkedin: string
      website: string
    }
  }>({
    name: "Sarah Chen",
    email: "sarah@example.com",
    bio: "Full-stack developer with 5+ years of experience",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    portfolio: {
      github: "https://github.com/sarahchen",
      linkedin: "https://linkedin.com/in/sarahchen",
      website: ""
    }
  })

  const [newProject, setNewProject] = useState<{
    title: string
    description: string
    status: "planning" | "active" | "on-hold" | "completed" | "cancelled"
    priority: "low" | "medium" | "high" | "urgent"
    startDate: string
    dueDate: string
    category: string
    tags: string
    budget: string
  }>({
    title: "",
    description: "",
    status: "planning",
    priority: "medium",
    startDate: "",
    dueDate: "",
    category: "",
    tags: "",
    budget: ""
  })

  const categories = ["all", "Frontend", "Backend", "Architecture", "DevOps", "Design", "Mobile", "Video", "Article", "Documentation"]
  const projectCategories = ["Frontend Development", "Backend Development", "Mobile Development", "DevOps", "Design", "Research", "Infrastructure", "Testing", "Documentation"]

  const handleCreateSource = () => {
    const source: Source = {
      id: Date.now().toString(),
      title: newSource.title,
      description: newSource.description,
      type: newSource.type,
      category: newSource.category,
      tags: newSource.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      content: newSource.content,
      author: {
        id: "1",
        name: "Sarah Chen",
        avatar: "/placeholder-user.jpg",
        role: "Senior Developer"
      },
      createdAt: "Just now",
      likes: 0,
      comments: [],
      isPinned: false,
      url: newSource.url
    }
    
    setSources([source, ...sources])
    
    // Add activity for new source
    addActivity({
      type: 'workspace',
      action: 'share_source',
      description: `Shared new source: ${source.title}`,
      user: 'Current User'
    })
    
    setShowSourceDialog(false)
    setNewSource({
      title: "",
      description: "",
      type: "code",
      category: "Frontend",
      tags: "",
      content: "",
      url: ""
    })
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    
    const message: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      author: {
        id: "1",
        name: "Sarah Chen",
        avatar: "/placeholder-user.jpg",
        role: "Senior Developer"
      },
      channel: selectedChannel,
      createdAt: "Just now",
      isPinned: false
    }
    
    setChatMessages([...chatMessages, message])
    setNewMessage("")
  }

  const handleAddMember = () => {
    const member: TeamMember = {
      id: Date.now().toString(),
      name: newMember.name,
      avatar: "/placeholder-user.jpg",
      role: newMember.role,
      skills: newMember.skills.split(",").map(skill => skill.trim()).filter(skill => skill),
      bio: newMember.bio,
      portfolio: {},
      contributions: {
        sourcesShared: 0,
        tasksCompleted: 0,
        messagesSent: 0
      },
      currentRole: newMember.currentRole
    }
    
    // Add activity for new member
    addActivity({
      type: 'workspace',
      action: 'add_member',
      description: `Added ${newMember.name} to workspace`,
      user: 'Current User'
    })
    
    setShowAddMemberDialog(false)
    setNewMember({
      name: "",
      email: "",
      role: "member",
      currentRole: "",
      skills: "",
      bio: ""
    })
  }

  const handleUpdateProfile = () => {
    setMyProfile({
      ...myProfile,
      skills: myProfile.skills
    })
    setShowProfileDialog(false)
  }

  const handleCreateProject = () => {
    const project: Project = {
      id: Date.now().toString(),
      title: newProject.title,
      description: newProject.description,
      status: newProject.status,
      priority: newProject.priority,
      progress: 0,
      startDate: newProject.startDate,
      dueDate: newProject.dueDate,
      owner: {
        id: "1",
        name: "Sarah Chen",
        avatar: "/placeholder-user.jpg"
      },
      team: [
        { id: "1", name: "Sarah Chen", avatar: "/placeholder-user.jpg", role: "lead" }
      ],
      tags: newProject.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      category: newProject.category,
      budget: { allocated: parseFloat(newProject.budget) || 0, spent: 0, currency: "USD" },
      milestones: [],
      tasks: [],
      files: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }
    
    setProjects([project, ...projects])
    
    // Add activity for new project
    addActivity({
      type: 'workspace',
      action: 'create_project',
      description: `Created new project: ${project.title}`,
      user: 'Current User'
    })
    
    setShowNewProjectDialog(false)
    setNewProject({
      title: "",
      description: "",
      status: "planning",
      priority: "medium",
      startDate: "",
      dueDate: "",
      category: "",
      tags: "",
      budget: ""
    })
  }

  const filteredSources = sources.filter(source => {
    const matchesCategory = selectedCategory === "all" || source.category === selectedCategory
    const matchesSearch = source.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         source.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         source.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: lineClampStyles }} />
             <div className="space-y-8">
       <div className="flex items-start justify-between">
         <div className="max-w-2xl">
           <h1 className="text-4xl font-bold text-gray-900 mb-3">Workspace</h1>
           <p className="text-lg text-gray-600 leading-relaxed">Collaborate, share resources, and track team progress</p>
         </div>
                  <div className="flex flex-col space-y-3 pt-2">
            <Button onClick={() => setShowAddMemberDialog(true)} variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 px-6">
              <Users className="h-4 w-4 mr-2" />
              Add Member
            </Button>
            <Button onClick={() => setShowProfileDialog(true)} variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 px-6">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
       </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                 <TabsList className="grid w-full grid-cols-6">
           <TabsTrigger value="sources">Sources</TabsTrigger>
           <TabsTrigger value="chat">Team Chat</TabsTrigger>
           <TabsTrigger value="profiles">Profiles</TabsTrigger>
           <TabsTrigger value="roles">Roles</TabsTrigger>
           <TabsTrigger value="progress">Progress</TabsTrigger>
           <TabsTrigger value="recent">Recent</TabsTrigger>
         </TabsList>

                 {/* Sources Tab */}
         <TabsContent value="sources" className="space-y-8">
           {/* Sources Header */}
           <div className="p-8 rounded-2xl border border-gray-200">
             <div className="flex items-start justify-between">
               <div className="max-w-xl">
                 <h3 className="text-3xl font-bold text-gray-900 mb-3">Team Sources</h3>
                 <p className="text-lg text-gray-700 leading-relaxed">Share and discover resources from your team</p>
               </div>
               <Button onClick={() => setShowSourceDialog(true)} className="px-8 py-3 text-lg shadow-lg">
                 <Plus className="h-5 w-5 mr-3" />
                 Share Source
               </Button>
             </div>
           </div>

           {/* Search and Filter Controls */}
           <div className="p-6 rounded-xl border border-gray-200">
             <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
               <div className="flex-1 min-w-0">
                 <Input
                   placeholder="Search sources by title, description, or tags..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="max-w-md text-lg py-3"
                 />
               </div>
               <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                 <SelectTrigger className="w-56 py-3">
                   <SelectValue placeholder="Select category" />
                 </SelectTrigger>
                 <SelectContent>
                   {categories.map(category => (
                     <SelectItem key={category} value={category}>
                       {category === "all" ? "All Categories" : category}
                     </SelectItem>
                   ))}
                 </SelectContent>
               </Select>
             </div>
           </div>

                     {/* Sources Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
             {filteredSources.map((source, index) => (
               <div key={source.id} className={`bg-white border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                 index % 3 === 0 ? 'p-8' : 
                 index % 3 === 1 ? 'p-7' : 'p-6'
               }`}>
                {/* Source Header with Icon */}
                <div className="flex items-center space-x-3 mb-4">
                                     <div className="w-12 h-12 rounded-lg flex items-center justify-center border border-gray-200">
                    {source.type === "code" && <Code className="h-6 w-6" />}
                    {source.type === "repo" && <GitBranch className="h-6 w-6" />}
                    {source.type === "docs" && <FileText className="h-6 w-6" />}
                    {source.type === "resource" && <Link className="h-6 w-6" />}
                    {source.type === "api" && <Zap className="h-6 w-6" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">{source.category}</Badge>
                      {source.isPinned && <Pin className="h-3 w-3 text-yellow-500" />}
                    </div>
                  </div>
                </div>

                {/* Source Content */}
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{source.title}</h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">{source.description}</p>

                {/* URL Display */}
                {source.url && (
                                     <div className="mb-4 p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Link className="h-4 w-4 text-blue-600" />
                      <a 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium truncate"
                      >
                        {source.url.includes('youtube.com') ? 'YouTube' :
                         source.url.includes('github.com') ? 'GitHub' :
                         source.url.includes('google.com') ? 'Google' :
                         source.url.includes('stackoverflow.com') ? 'Stack Overflow' :
                         source.url.includes('medium.com') ? 'Medium' :
                         source.url.includes('dev.to') ? 'Dev.to' :
                         source.url.includes('css-tricks.com') ? 'CSS Tricks' :
                         source.url.includes('mdn.com') ? 'MDN' :
                         source.url.includes('w3schools.com') ? 'W3Schools' :
                         'External Link'}
                      </a>
                    </div>
                  </div>
                )}

                {/* Code Preview */}
                {source.type === "code" && source.content && (
                                     <div className="mb-4 border border-gray-200 text-gray-700 p-3 rounded-lg font-mono text-xs overflow-x-auto">
                    <div className="line-clamp-3">{source.content}</div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {source.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {source.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{source.tags.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={source.author.avatar} />
                      <AvatarFallback className="text-xs">{source.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-600">{source.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <span>{source.createdAt}</span>
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{source.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredSources.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <FileText className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No sources found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery || selectedCategory !== "all" 
                  ? "Try adjusting your search or filters"
                  : "Be the first to share a source with your team!"
                }
              </p>
              {!searchQuery && selectedCategory === "all" && (
                <Button onClick={() => setShowSourceDialog(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Share First Source
                </Button>
              )}
            </div>
          )}
        </TabsContent>

                 {/* Team Chat Tab */}
         <TabsContent value="chat" className="space-y-8">
           <div className="p-8 rounded-2xl border border-gray-200 mb-8">
             <h3 className="text-3xl font-bold text-gray-900 mb-3">Team Chat</h3>
             <p className="text-lg text-gray-700">Stay connected with your team in real-time</p>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
             {/* Channels */}
             <div className="p-6 border rounded-2xl">
               <h3 className="text-xl font-semibold mb-6 text-gray-900">Channels</h3>
               <div className="space-y-3">
                 {["general", "frontend", "backend", "design", "devops"].map(channel => (
                   <button
                     key={channel}
                     onClick={() => setSelectedChannel(channel)}
                     className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                       selectedChannel === channel
                         ? "border-2 border-gray-300 text-gray-800"
                         : "hover:bg-gray-50 text-gray-700"
                     }`}
                   >
                     # {channel}
                   </button>
                 ))}
               </div>
             </div>

                         {/* Chat Messages */}
             <div className="col-span-1 lg:col-span-3 border rounded-2xl">
               <div className="p-6 border-b border-gray-100">
                 <h3 className="text-xl font-semibold text-gray-900">#{selectedChannel}</h3>
                 <p className="text-sm text-gray-500 mt-1">Active now • {chatMessages.filter(msg => msg.channel === selectedChannel).length} messages</p>
               </div>
               
               <div className="h-96 overflow-y-auto p-6 space-y-6">
                 {chatMessages
                   .filter(msg => msg.channel === selectedChannel)
                   .map(message => (
                     <div key={message.id} className="flex space-x-4">
                       <Avatar className="w-10 h-10 flex-shrink-0 border-2 border-gray-100">
                         <AvatarImage src={message.author.avatar} />
                         <AvatarFallback className="text-sm">{message.author.name[0]}</AvatarFallback>
                       </Avatar>
                       <div className="flex-1">
                         <div className="flex items-center space-x-3 mb-2">
                           <span className="font-semibold text-gray-900">{message.author.name}</span>
                           <Badge variant="outline" className="text-xs px-2 py-1">{message.author.role}</Badge>
                           <span className="text-xs text-gray-400">{message.createdAt}</span>
                           {message.isPinned && <Pin className="h-4 w-4 text-yellow-500" />}
                         </div>
                         <p className="text-gray-800 text-lg leading-relaxed">{message.content}</p>
                       </div>
                     </div>
                   ))}
               </div>

               <div className="p-6 border-t border-gray-100">
                 <div className="flex space-x-3">
                   <Input
                     placeholder="Type a message..."
                     value={newMessage}
                     onChange={(e) => setNewMessage(e.target.value)}
                     onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                     className="text-lg py-3 px-4 rounded-xl"
                   />
                   <Button onClick={handleSendMessage} className="px-6 py-3 rounded-xl">
                     <Send className="h-5 w-5" />
                   </Button>
                 </div>
               </div>
             </div>
          </div>
                 </TabsContent>

                   

                   {/* Profiles Tab */}
         <TabsContent value="profiles" className="space-y-8">
           {/* My Profile Section */}
           <div className="p-8 border border-gray-200 rounded-3xl shadow-sm">
             <div className="flex items-center justify-between mb-6">
               <h3 className="text-3xl font-bold text-blue-900">My Profile</h3>
               <Button onClick={() => setShowProfileDialog(true)} variant="outline" size="lg" className="border-blue-300 text-blue-700 hover:bg-blue-100 px-6 py-3 rounded-xl">
                 <Edit className="h-5 w-5 mr-2" />
                 Edit Profile
               </Button>
             </div>
             <div className="flex items-start space-x-8">
               <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
                 <AvatarImage src="/placeholder-user.jpg" />
                 <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">{myProfile.name[0]}</AvatarFallback>
               </Avatar>
               
               <div className="flex-1">
                 <div className="flex items-center space-x-4 mb-4">
                   <h4 className="text-3xl font-bold text-blue-900">{myProfile.name}</h4>
                   <Badge variant="default" className="px-4 py-2 text-lg">You</Badge>
                 </div>
                 
                 <p className="text-blue-800 text-lg leading-relaxed mb-6">{myProfile.bio}</p>
                 
                 <div className="flex flex-wrap gap-3 mb-6">
                   {myProfile.skills.map(skill => (
                     <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm font-medium">
                       {skill}
                     </Badge>
                   ))}
                 </div>

                 <div className="flex space-x-4">
                   {myProfile.portfolio.github && (
                     <a
                       href={myProfile.portfolio.github}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="inline-flex items-center space-x-3 px-6 py-3 bg-white rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-50 transition-all duration-200 hover:shadow-md"
                     >
                       <GitBranch className="h-5 w-5" />
                       <span className="font-medium">GitHub</span>
                     </a>
                   )}
                   {myProfile.portfolio.linkedin && (
                     <a
                       href={myProfile.portfolio.linkedin}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="inline-flex items-center space-x-3 px-6 py-3 bg-white rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-50 transition-all duration-200 hover:shadow-md"
                     >
                       <Globe className="h-5 w-5" />
                       <span className="font-medium">LinkedIn</span>
                     </a>
                   )}
                   {myProfile.portfolio.website && (
                     <a
                       href={myProfile.portfolio.website}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="inline-flex items-center space-x-3 px-6 py-3 bg-white rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-50 transition-all duration-200 hover:shadow-md"
                     >
                       <Globe className="h-5 w-5" />
                       <span className="font-medium">Website</span>
                     </a>
                   )}
                 </div>
               </div>
             </div>
           </div>

                     <div className="grid gap-8">
             {teamMembers.map((member, index) => (
               <div key={member.id} className={`border rounded-2xl hover:shadow-lg transition-all duration-300 ${
                 index % 2 === 0 ? 'p-8' : 'p-7'
               }`}>
                 <div className="flex items-start space-x-6">
                   <Avatar className={`${index % 2 === 0 ? 'w-20 h-20' : 'w-18 h-18'} border-4 border-gray-100`}>
                     <AvatarImage src={member.avatar} />
                     <AvatarFallback className={`${index % 2 === 0 ? 'text-xl' : 'text-lg'} bg-gradient-to-br from-gray-600 to-gray-800 text-white`}>{member.name[0]}</AvatarFallback>
                   </Avatar>
                   
                   <div className="flex-1">
                     <div className="flex items-center space-x-4 mb-4">
                       <h3 className={`${index % 2 === 0 ? 'text-2xl' : 'text-xl'} font-bold text-gray-900`}>{member.name}</h3>
                       <Badge variant={member.role === "admin" ? "default" : "secondary"} className="px-3 py-1">
                         {member.role === "admin" ? "Admin" : "Member"}
                       </Badge>
                       <Badge variant="outline" className="px-3 py-1">{member.currentRole}</Badge>
                     </div>
                     
                     <p className="text-gray-600 text-lg leading-relaxed mb-6">{member.bio}</p>
                     
                     <div className="grid grid-cols-3 gap-6 mb-6">
                       <div className="text-center p-4 border border-gray-200 rounded-xl">
                         <div className="text-3xl font-bold text-gray-600 mb-1">{member.contributions.sourcesShared}</div>
                         <div className="text-sm text-gray-700 font-medium">Sources Shared</div>
                       </div>
                       <div className="text-center p-4 border border-gray-200 rounded-xl">
                         <div className="text-3xl font-bold text-gray-600 mb-1">{member.contributions.tasksCompleted}</div>
                         <div className="text-sm text-gray-700 font-medium">Tasks Completed</div>
                       </div>
                       <div className="text-center p-4 border border-gray-200 rounded-xl">
                         <div className="text-3xl font-bold text-gray-600 mb-1">{member.contributions.messagesSent}</div>
                         <div className="text-sm text-gray-700 font-medium">Messages Sent</div>
                       </div>
                     </div>

                     <div className="flex flex-wrap gap-3 mb-6">
                       {member.skills.map((skill: string) => (
                         <Badge key={skill} variant="outline" className="px-3 py-1 text-sm">
                           {skill}
                         </Badge>
                       ))}
                     </div>

                     <div className="flex space-x-4">
                       {member.portfolio.github && (
                         <a
                           href={member.portfolio.github}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-gray-600 hover:text-gray-900 transition-colors"
                         >
                           <GitBranch className="h-6 w-6" />
                         </a>
                       )}
                       {member.portfolio.linkedin && (
                         <a
                           href={member.portfolio.linkedin}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-gray-600 hover:text-gray-900 transition-colors"
                         >
                           <Globe className="h-6 w-6" />
                         </a>
                       )}
                     </div>
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </TabsContent>

        {/* Roles Tab */}
        <TabsContent value="roles" className="space-y-6">
          {/* Team Management Header */}
          <div className="p-6 border rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold">Team Management</h3>
                <p className="text-gray-600 mt-1">Manage team members, roles, and permissions</p>
              </div>
              <Button onClick={() => setShowAddMemberDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Total Members</span>
                </div>
                <div className="text-2xl font-bold text-gray-600 mt-2">{totalMembers}</div>
              </div>
              <div className="p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-2">
                  <Crown className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Admins</span>
                </div>
                <div className="text-2xl font-bold text-gray-600 mt-2">{teamMembers.filter(m => m.role === 'admin').length}</div>
              </div>
              <div className="p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Active</span>
                </div>
                <div className="text-2xl font-bold text-gray-600 mt-2">{activeMembers}</div>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Role Management</h3>
            <div className="space-y-4">
              {teamMembers.map(member => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-500">Current: {member.currentRole}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Select defaultValue={member.role}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress" className="space-y-6">
          {/* Goals */}
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Team Goals</h3>
            <div className="grid gap-4">
              {goals.map(goal => (
                <div key={goal.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{goal.title}</h4>
                    <Badge 
                      variant={
                        goal.status === "completed" ? "default" : 
                        goal.status === "on-track" ? "secondary" : "destructive"
                      }
                    >
                      {goal.status.replace("-", " ")}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{goal.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Target: {goal.target}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        {goal.current} / {goal.total}
                      </span>
                      <div className="w-24 border border-gray-300 rounded-full h-2">
                        <div 
                          className="border border-gray-400 h-2 rounded-full" 
                          style={{ width: `${(goal.current / goal.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Task Board</h3>
            <div className="grid grid-cols-3 gap-6">
              {["todo", "in-progress", "done"].map(status => (
                <div key={status} className="space-y-3">
                  <h4 className="font-medium text-gray-700 capitalize">
                    {status.replace("-", " ")} ({tasks.filter(t => t.status === status).length})
                  </h4>
                  <div className="space-y-3">
                    {tasks
                      .filter(task => task.status === status)
                      .map(task => (
                        <div key={task.id} className="p-3 bg-gray-50 rounded-lg border">
                          <h5 className="font-medium mb-2">{task.title}</h5>
                          <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{task.assignee}</span>
                            <span>{task.dueDate}</span>
                          </div>
                          {task.status === "in-progress" && (
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>{task.progress}%</span>
                              </div>
                                                             <div className="w-full border border-gray-300 rounded-full h-2">
                                 <div 
                                   className="border border-gray-400 h-2 rounded-full" 
                                   style={{ width: `${task.progress}%` }}
                                 />
                               </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Recent Tab */}
        <TabsContent value="recent" className="space-y-6">
                     <div className="p-6 border border-gray-200 rounded-lg">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-2xl font-bold text-gray-900">Recent Team Activity</h3>
               <p className="text-gray-700 mt-1">Latest sources, messages, and team updates</p>
             </div>
           </div>

                     {/* Recent Projects */}
           <div className="p-6 border rounded-lg">
             <h3 className="text-xl font-semibold mb-4 flex items-center">
               <FolderOpen className="h-5 w-5 mr-2 text-purple-600" />
               Recent Projects
             </h3>
             <div className="space-y-4">
               {projects.slice(0, 3).map(project => (
                 <div key={project.id} className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50">
                   <div className="flex-shrink-0">
                                            <Badge 
                         variant={
                           project.status === 'active' ? 'default' :
                           project.status === 'planning' ? 'secondary' :
                           project.status === 'completed' ? 'default' : 'outline'
                         }
                       >
                       {project.status}
                     </Badge>
                   </div>
                   <div className="flex-1 min-w-0">
                     <h4 className="font-medium text-gray-900 truncate">{project.title}</h4>
                     <p className="text-sm text-gray-500 truncate">{project.description}</p>
                     <div className="flex items-center space-x-2 mt-1">
                       <span className="text-xs text-gray-500">Progress: {project.progress}%</span>
                       <span className="text-xs text-gray-500">•</span>
                       <span className="text-xs text-gray-500">Due: {project.dueDate}</span>
                     </div>
                   </div>
                   <div className="text-right text-sm text-gray-500">
                     <div>{project.owner.name}</div>
                     <div className="text-xs">{project.team.length} members</div>
                   </div>
                 </div>
               ))}
               {projects.length === 0 && (
                 <div className="text-center py-8 text-gray-500">
                   <FolderOpen className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                   <p>No projects created yet</p>
                 </div>
               )}
             </div>
           </div>

           {/* Recent Sources */}
           <div className="p-6 border rounded-lg">
             <h3 className="text-xl font-semibold mb-4 flex items-center">
               <FileText className="h-5 w-5 mr-2 text-blue-600" />
               Recently Shared Sources
             </h3>
            <div className="space-y-4">
              {sources.slice(0, 3).map(source => (
                <div key={source.id} className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-shrink-0">
                    <Badge variant="outline">
                      {source.type}
                    </Badge>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{source.title}</h4>
                    <p className="text-sm text-gray-500 truncate">{source.description}</p>
                    {source.url && (
                      <div className="flex items-center space-x-1 mt-1">
                        <Link className="h-3 w-3 text-blue-600" />
                        <a 
                          href={source.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-700 truncate"
                        >
                          {source.url}
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div>{source.createdAt}</div>
                    <div className="flex items-center space-x-1">
                      <span>{source.likes}</span>
                      <ThumbsUp className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              ))}
              {sources.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No sources shared yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Messages */}
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
              Recent Team Messages
            </h3>
            <div className="space-y-4">
              {chatMessages.slice(0, 3).map(message => (
                <div key={message.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={message.author.avatar} />
                    <AvatarFallback>{message.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm">{message.author.name}</span>
                      <Badge variant="outline" className="text-xs">#{message.channel}</Badge>
                      <span className="text-xs text-gray-500">{message.createdAt}</span>
                    </div>
                    <p className="text-gray-900 text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              {chatMessages.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No messages yet</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Source Dialog */}
      <Dialog open={showSourceDialog} onOpenChange={setShowSourceDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Share New Source</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newSource.title}
                onChange={(e) => setNewSource({ ...newSource, title: e.target.value })}
                placeholder="Enter source title"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newSource.description}
                onChange={(e) => setNewSource({ ...newSource, description: e.target.value })}
                placeholder="Describe the source"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type</Label>
                                                  <Select value={newSource.type} onValueChange={(value: "code" | "repo" | "api" | "docs" | "resource") => setNewSource({ ...newSource, type: value })}>
                   <SelectTrigger>
                     <SelectValue />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="code">Code Snippet</SelectItem>
                     <SelectItem value="repo">GitHub Repository</SelectItem>
                     <SelectItem value="api">API Documentation</SelectItem>
                     <SelectItem value="docs">Documentation</SelectItem>
                     <SelectItem value="resource">Resource Link</SelectItem>
                   </SelectContent>
                 </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newSource.category} onValueChange={(value) => setNewSource({ ...newSource, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(cat => cat !== "all").map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={newSource.tags}
                onChange={(e) => setNewSource({ ...newSource, tags: e.target.value })}
                placeholder="React, JavaScript, Best Practices"
              />
            </div>
                         <div>
               <Label htmlFor="content">Content</Label>
               <Textarea
                 id="content"
                 value={newSource.content}
                 onChange={(e) => setNewSource({ ...newSource, content: e.target.value })}
                 placeholder="Enter code, URL, or content"
                 rows={4}
               />
             </div>
             <div>
               <Label htmlFor="url">URL (Optional)</Label>
               <Input
                 id="url"
                 type="url"
                 value={newSource.url}
                 onChange={(e) => setNewSource({ ...newSource, url: e.target.value })}
                 placeholder="https://youtube.com, https://github.com, etc."
               />
               <p className="text-xs text-gray-500 mt-1">
                 URLs from YouTube, GitHub, Stack Overflow, Medium, MDN, and other platforms will be automatically detected and displayed with appropriate icons.
               </p>
             </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowSourceDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateSource} className="bg-blue-600 hover:bg-blue-700">
                Share Source
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Team Member Dialog */}
      <Dialog open={showAddMemberDialog} onOpenChange={setShowAddMemberDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="member-name">Full Name</Label>
                <Input
                  id="member-name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="member-email">Email</Label>
                <Input
                  id="member-email"
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="member-role">Role</Label>
                                 <Select value={newMember.role} onValueChange={(value: "admin" | "member" | "viewer") => setNewMember({ ...newMember, role: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="member-current-role">Current Role</Label>
                <Input
                  id="member-current-role"
                  value={newMember.currentRole}
                  onChange={(e) => setNewMember({ ...newMember, currentRole: e.target.value })}
                  placeholder="e.g., Senior Developer"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="member-skills">Skills (comma separated)</Label>
              <Input
                id="member-skills"
                value={newMember.skills}
                onChange={(e) => setNewMember({ ...newMember, skills: e.target.value })}
                placeholder="React, TypeScript, Node.js"
              />
            </div>
            <div>
              <Label htmlFor="member-bio">Bio</Label>
              <Textarea
                id="member-bio"
                value={newMember.bio}
                onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                placeholder="Brief description about the team member"
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddMemberDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMember} className="bg-blue-600 hover:bg-blue-700">
                Add Member
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit My Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="profile-name">Full Name</Label>
                <Input
                  id="profile-name"
                  value={myProfile.name}
                  onChange={(e) => setMyProfile({ ...myProfile, name: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="profile-email">Email</Label>
                <Input
                  id="profile-email"
                  type="email"
                  value={myProfile.email}
                  onChange={(e) => setMyProfile({ ...myProfile, email: e.target.value })}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="profile-bio">Bio</Label>
              <Textarea
                id="profile-bio"
                value={myProfile.bio}
                onChange={(e) => setMyProfile({ ...myProfile, bio: e.target.value })}
                placeholder="Tell us about yourself"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="profile-skills">Skills (comma separated)</Label>
              <Input
                id="profile-skills"
                value={myProfile.skills.join(", ")}
                onChange={(e) => setMyProfile({ ...myProfile, skills: e.target.value.split(",").map(s => s.trim()).filter(s => s) })}
                placeholder="React, TypeScript, Node.js"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="profile-github">GitHub URL</Label>
                <Input
                  id="profile-github"
                  value={myProfile.portfolio.github}
                  onChange={(e) => setMyProfile({ ...myProfile, portfolio: { ...myProfile.portfolio, github: e.target.value } })}
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <Label htmlFor="profile-linkedin">LinkedIn URL</Label>
                <Input
                  id="profile-linkedin"
                  value={myProfile.portfolio.linkedin}
                  onChange={(e) => setMyProfile({ ...myProfile, portfolio: { ...myProfile.portfolio, linkedin: e.target.value } })}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <Label htmlFor="profile-website">Website URL</Label>
                <Input
                  id="profile-website"
                  value={myProfile.portfolio.website}
                  onChange={(e) => setMyProfile({ ...myProfile, portfolio: { ...myProfile.portfolio, website: e.target.value } })}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowProfileDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateProfile} className="bg-green-600 hover:bg-green-700">
                Update Profile
              </Button>
            </div>
          </div>
                  </DialogContent>
        </Dialog>

        {/* Create Project Dialog */}
        <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="project-title">Project Title</Label>
                  <Input
                    id="project-title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="Enter project title"
                  />
                </div>
                <div>
                  <Label htmlFor="project-category">Category</Label>
                  <Select value={newProject.category} onValueChange={(value) => setNewProject({ ...newProject, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectCategories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="project-description">Description</Label>
                <Textarea
                  id="project-description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Describe the project goals and scope"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="project-status">Status</Label>
                  <Select value={newProject.status} onValueChange={(value: "planning" | "active" | "on-hold" | "completed" | "cancelled") => setNewProject({ ...newProject, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="project-priority">Priority</Label>
                  <Select value={newProject.priority} onValueChange={(value: "low" | "medium" | "high" | "urgent") => setNewProject({ ...newProject, priority: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="project-budget">Budget (USD)</Label>
                  <Input
                    id="project-budget"
                    type="number"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="project-start-date">Start Date</Label>
                  <Input
                    id="project-start-date"
                    type="date"
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="project-due-date">Due Date</Label>
                  <Input
                    id="project-due-date"
                    type="date"
                    value={newProject.dueDate}
                    onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="project-tags">Tags (comma separated)</Label>
                <Input
                  id="project-tags"
                  value={newProject.tags}
                  onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                  placeholder="React, TypeScript, Node.js, etc."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowNewProjectDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateProject} className="bg-purple-600 hover:bg-purple-700">
                  Create Project
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        </div>
      </>
    )
  }
