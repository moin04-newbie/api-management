"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutDashboard, Key, RotateCcw, BarChart3, Shield, Bell, LogOut, Menu, Settings, HelpCircle, FolderOpen, Users, ChevronDown } from 'lucide-react'
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { getPlan, setPlan as setPlanValue } from "@/lib/subscription"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "API Keys", href: "/dashboard/keys", icon: Key },
  { name: "Rotation Schedule", href: "/dashboard/rotation", icon: RotateCcw },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Monitoring", href: "/dashboard/monitoring", icon: Shield },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [plan, setPlanState] = useState<"free" | "pro">("free")
  const [projectsMenuOpen, setProjectsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    let unsubscribe: (() => void) | undefined
    ;(async () => {
      const { onAuthStateChanged } = await import("@/lib/auth")
      unsubscribe = onAuthStateChanged((u) => {
        if (!u) {
          router.push("/auth")
          return
        }
        setUser({
          id: u.uid,
          name: u.displayName || u.email || "User",
          email: u.email,
          avatar: u.photoURL,
        })
      })
      setPlanState(getPlan())
    })()
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [router])

  const handleLogout = async () => {
    const { signOutUser } = await import("@/lib/auth")
    await signOutUser()
    router.push("/")
  }

  const handleUpgrade = () => {
    setPlanValue("pro")
    setPlanState("pro")
  }
  const handleDowngrade = () => {
    setPlanValue("free")
    setPlanState("free")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-900">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl">
          <div className="flex h-16 items-center px-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Key className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">KeyNest</span>
            </div>
          </div>
          <nav className="mt-6 px-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}

            {/* Projects group (mobile) */}
            <button
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg mb-1 transition-colors ${
                pathname.startsWith("/dashboard/projects") || pathname.startsWith("/dashboard/keys") || pathname.startsWith("/dashboard/team")
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={() => setProjectsMenuOpen((o) => !o)}
            >
              <span className="flex items-center space-x-3">
                <FolderOpen className="h-5 w-5" />
                <span className="font-medium">Projects</span>
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${projectsMenuOpen ? "rotate-180" : ""}`} />
            </button>
            {projectsMenuOpen && (
              <div className="ml-6">
                <Link
                  href="/dashboard/keys"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                    pathname.startsWith("/dashboard/keys")
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Key className="h-5 w-5" />
                  <span className="font-medium">API Keys</span>
                </Link>
                <Link
                  href="/dashboard/team"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                    pathname.startsWith("/dashboard/team")
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Users className="h-5 w-5" />
                  <span className="font-medium">Team Members</span>
                </Link>
                <Link
                  href="/dashboard/projects"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                    pathname.startsWith("/dashboard/projects")
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <FolderOpen className="h-5 w-5" />
                  <span className="font-medium">Projects</span>
                </Link>
              </div>
            )}
          </nav>

          {/* Upgrade Section */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className={`rounded-lg p-4 ${plan === "pro" ? "bg-green-50 border border-green-200" : "bg-orange-50 border border-orange-200"}`}>
              {plan === "pro" ? (
                <div className="flex items-start space-x-2">
                  <div className="bg-green-100 p-1 rounded">
                    <span className="text-green-700 text-sm font-bold">✓</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-green-800">You're on Pro</h4>
                    <p className="text-xs text-green-700 mt-1">Advanced analytics and notifications unlocked.</p>
                    <Button onClick={handleDowngrade} variant="outline" className="w-full mt-3 text-green-800 border-green-300">
                      Downgrade to Free
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start space-x-2">
                  <div className="bg-orange-100 p-1 rounded">
                    <span className="text-orange-600 text-sm font-bold">👑</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-orange-800">Upgrade to Pro</h4>
                    <p className="text-xs text-orange-700 mt-1">Unlock advanced features and up to 25 API keys.</p>
                    <Button onClick={handleUpgrade} className="w-full mt-3 bg-orange-600 hover:bg-orange-700 text-white text-sm py-2">
                      Upgrade to Pro - $9/month
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Key className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">KeyNest</span>
            </div>
          </div>

          <nav className="flex-1 mt-6 px-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}

            {/* Projects group (desktop) */}
            <button
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg mb-1 transition-colors ${
                pathname.startsWith("/dashboard/projects") || pathname.startsWith("/dashboard/keys") || pathname.startsWith("/dashboard/team")
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={() => setProjectsMenuOpen((o) => !o)}
            >
              <span className="flex items-center space-x-3">
                <FolderOpen className="h-5 w-5" />
                <span className="font-medium">Projects</span>
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${projectsMenuOpen ? "rotate-180" : ""}`} />
            </button>
            {projectsMenuOpen && (
              <div className="ml-6">
                <Link
                  href="/dashboard/keys"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                    pathname.startsWith("/dashboard/keys")
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Key className="h-5 w-5" />
                  <span className="font-medium">API Keys</span>
                </Link>
                <Link
                  href="/dashboard/team"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                    pathname.startsWith("/dashboard/team")
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Users className="h-5 w-5" />
                  <span className="font-medium">Team Members</span>
                </Link>
                <Link
                  href="/dashboard/projects"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                    pathname.startsWith("/dashboard/projects")
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <FolderOpen className="h-5 w-5" />
                  <span className="font-medium">Projects</span>
                </Link>
              </div>
            )}
          </nav>

          {/* Upgrade Section */}
          <div className="px-4 pb-4">
            <div className={`rounded-xl p-4 shadow-sm ${plan === "pro" ? "bg-green-50 border border-green-200" : "bg-orange-50 border border-orange-200"}`}>
              {plan === "pro" ? (
                <div className="flex items-start space-x-2">
                  <div className="bg-green-100 p-1 rounded">
                    <span className="text-green-700 text-sm font-bold">✓</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-green-800">You're on Pro</h4>
                    <p className="text-xs text-green-700 mt-1">Advanced analytics and notifications unlocked.</p>
                    <Button onClick={handleDowngrade} variant="outline" className="w-full mt-3 text-green-800 border-green-300">
                      Downgrade to Free
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start space-x-2">
                  <div className="bg-orange-100 p-1 rounded">
                    <span className="text-orange-600 text-sm font-bold">👑</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-orange-800">Upgrade to Pro</h4>
                    <p className="text-xs text-orange-700 mt-1 leading-relaxed">Unlock advanced features and up to 25 API keys.</p>
                    <Button onClick={handleUpgrade} className="w-full mt-3 bg-orange-600 hover:bg-orange-700 text-white text-sm py-2 rounded-lg">
                      Upgrade to Pro - $9/month
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-2">
                  <Avatar className="w-8 h-8 mr-3">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-blue-600 text-white text-sm">
                      {user.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <div className="flex space-x-1">
                    <Settings className="h-4 w-4 text-gray-400" />
                    <LogOut className="h-4 w-4 text-gray-400" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="flex items-center w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/help" className="flex items-center w-full">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Help & Support
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8">{children}</main>
      </div>
    </div>
  )
}
