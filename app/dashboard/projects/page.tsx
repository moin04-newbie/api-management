"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  FolderOpen,
  Users,
  Key,
  MoreHorizontal,
  Calendar,
  Activity,
  Settings,
  Trash2,
  UserPlus,
} from "lucide-react"
import Link from "next/link"
import { fetchProjects, fetchMembersPreview, createProject, type Project, type Member } from "@/lib/firestore"

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [membersPreview, setMembersPreview] = useState<Member[]>([])
  const [newProjectName, setNewProjectName] = useState("")
  const [newProjectDesc, setNewProjectDesc] = useState("")
  const [newProjectTeam, setNewProjectTeam] = useState("")

  useEffect(() => {
    let isMounted = true
    Promise.all([fetchProjects(), fetchMembersPreview(8)]).then(([p, m]) => {
      if (!isMounted) return
      setProjects(p)
      setMembersPreview(m)
    })
    return () => {
      isMounted = false
    }
  }, [])

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.description || "").toLowerCase().includes(searchTerm.toLowerCase()),
  )

  async function handleCreateProject() {
    if (!newProjectName.trim()) return
    await createProject({ name: newProjectName.trim(), description: newProjectDesc.trim(), team: newProjectTeam.trim() })
    const updated = await fetchProjects()
    setProjects(updated)
    setIsCreateDialogOpen(false)
    setNewProjectName("")
    setNewProjectDesc("")
    setNewProjectTeam("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "development":
        return "bg-blue-100 text-blue-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#013C5A]">Projects</h1>
            <p className="text-[#013C5A]/70 mt-2">Organize your API keys by project and manage team access</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#013C5A] hover:bg-[#013C5A]/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Create a new project to organize your API keys and manage team access.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input id="name" placeholder="e.g., My Project" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Brief description of this project" value={newProjectDesc} onChange={(e) => setNewProjectDesc(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="team">Team</Label>
                  <Input id="team" placeholder="e.g., Core Team" value={newProjectTeam} onChange={(e) => setNewProjectTeam(e.target.value)} />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleCreateProject} className="bg-[#013C5A] hover:bg-[#013C5A]/90 text-white">
                  Create Project
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <Card className="border-[#013C5A]/10 mb-6">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-[#013C5A]/50" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#013C5A]/20 focus:border-[#013C5A]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="border-[#013C5A]/10 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#013C5A]/10 rounded-lg flex items-center justify-center">
                    <FolderOpen className="h-5 w-5 text-[#013C5A]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-[#013C5A]">{project.name}</CardTitle>
                    <Badge className={getStatusColor(project.status ?? "active")}>{project.status}</Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/projects/${project.id}`} className="flex items-center w-full">
                        <Settings className="mr-2 h-4 w-4" />
                        Manage Project
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Member
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{project.description}</CardDescription>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#013C5A]">{project.apiKeys}</div>
                  <div className="text-xs text-[#013C5A]/60 flex items-center justify-center">
                    <Key className="h-3 w-3 mr-1" />
                    API Keys
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#013C5A]">{project.members}</div>
                  <div className="text-xs text-[#013C5A]/60 flex items-center justify-center">
                    <Users className="h-3 w-3 mr-1" />
                    Members
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#013C5A]">{Math.floor(Math.random() * 100)}%</div>
                  <div className="text-xs text-[#013C5A]/60 flex items-center justify-center">
                    <Activity className="h-3 w-3 mr-1" />
                    Active
                  </div>
                </div>
              </div>

              {/* Team Members Preview */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#013C5A]/70">Team Members</span>
                  <span className="text-xs text-[#013C5A]/50">{project.members} total</span>
                </div>
                <div className="flex -space-x-2">
                  {membersPreview.slice(0, Math.min(4, project.members || 0)).map((member) => (
                    <Avatar key={member.id} className="w-8 h-8 border-2 border-white">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-[#013C5A] text-white text-xs">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {typeof project.members === "number" && project.members > 4 && (
                    <div className="w-8 h-8 rounded-full bg-[#013C5A]/10 border-2 border-white flex items-center justify-center">
                      <span className="text-xs text-[#013C5A] font-medium">+{project.members - 4}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#013C5A]/50">
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Created {project.createdAt}
                </span>
                <span>Last activity {project.lastActivity}</span>
              </div>

              <div className="mt-4">
                <Link href={`/dashboard/projects/${project.id}`}>
                  <Button className="w-full bg-[#013C5A] hover:bg-[#013C5A]/90 text-white">View Project</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card className="border-[#013C5A]/10">
          <CardContent className="p-12 text-center">
            <FolderOpen className="h-12 w-12 text-[#013C5A]/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#013C5A] mb-2">No projects found</h3>
            <p className="text-[#013C5A]/70 mb-4">
              {searchTerm ? "Try adjusting your search terms" : "Create your first project to organize your API keys"}
            </p>
            {!searchTerm && (
              <Button
                className="bg-[#013C5A] hover:bg-[#013C5A]/90 text-white"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Project
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
