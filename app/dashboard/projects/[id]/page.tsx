"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getProject, fetchApiKeys, fetchMembers, deleteProject, type ApiKey, type Member, type Project } from "@/lib/firestore"
import { Key, Users, Calendar, Trash2, ArrowLeft } from "lucide-react"

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const projectId = params.id

  useEffect(() => {
    if (!projectId) return
    ;(async () => {
      const p = await getProject(projectId)
      setProject(p)
      const [keys, mems] = await Promise.all([
        fetchApiKeys(projectId),
        fetchMembers(projectId),
      ])
      setApiKeys(keys)
      setMembers(mems)
    })()
  }, [projectId])

  if (!project) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" onClick={() => router.push("/dashboard/projects")}> <ArrowLeft className="h-4 w-4 mr-2"/> Back</Button>
        <div className="text-gray-700 mt-4">Loading project…</div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#013C5A]">{project.name}</h1>
          <p className="text-[#013C5A]/70">{project.description || "No description provided."}</p>
        </div>
        <Button variant="destructive" onClick={async () => { await deleteProject(project.id); router.push("/dashboard/projects") }}>
          <Trash2 className="h-4 w-4 mr-2"/> Delete Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-[#013C5A]/10">
          <CardHeader>
            <CardTitle className="text-[#013C5A]">Overview</CardTitle>
            <CardDescription>Project metadata</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4"/> Created {project.createdAt || "—"}</div>
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4"/> Last Activity {project.lastActivity || "—"}</div>
          </CardContent>
        </Card>

        <Card className="border-[#013C5A]/10 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-[#013C5A] flex items-center"><Key className="h-5 w-5 mr-2"/> API Keys ({apiKeys.length})</CardTitle>
            <CardDescription>Keys linked to this project</CardDescription>
          </CardHeader>
          <CardContent>
            {apiKeys.length === 0 ? (
              <div className="text-sm text-[#013C5A]/70">No API keys yet.</div>
            ) : (
              <ul className="text-sm space-y-2">
                {apiKeys.map(k => (
                  <li key={k.id} className="flex justify-between border rounded p-2">
                    <span>{k.name}</span>
                    <span className="text-[#013C5A]/60">{k.environment}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card className="border-[#013C5A]/10 md:col-span-3">
          <CardHeader>
            <CardTitle className="text-[#013C5A] flex items-center"><Users className="h-5 w-5 mr-2"/> Team Members ({members.length})</CardTitle>
            <CardDescription>People with access to this project</CardDescription>
          </CardHeader>
          <CardContent>
            {members.length === 0 ? (
              <div className="text-sm text-[#013C5A]/70">No members yet.</div>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {members.map(m => (
                  <li key={m.id} className="border rounded p-3">
                    <div className="font-medium">{m.name}</div>
                    <div className="text-[#013C5A]/70">{m.email}</div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


