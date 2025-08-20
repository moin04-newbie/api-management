"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Key, Activity, TrendingUp, AlertTriangle, Plus, BarChart3, Clock, Shield, Filter } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { getPlan } from "@/lib/subscription"
import { useRouter } from "next/navigation"

import { fetchApiKeys } from "@/lib/firestore"

export default function DashboardPage() {
  const [plan, setPlanState] = useState<"free" | "pro">("free")
  const [totalKeys, setTotalKeys] = useState(0)
  const router = useRouter()
  useEffect(() => {
    setPlanState(getPlan())
    fetchApiKeys().then((keys) => setTotalKeys(keys.length))
  }, [])

  const stats = [
    { title: "Total API Keys", value: `${totalKeys}/${plan === "pro" ? 25 : 5}`, icon: Key, color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "Active Keys", value: `${totalKeys}`, icon: Activity, color: "text-green-600", bgColor: "bg-green-50" },
    { title: "API Calls Today", value: "0", subtitle: "7-day trend", icon: BarChart3, color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "Security Score", value: "100%", subtitle: "No security events", change: "+2%", changeSubtitle: "7-day trend", icon: Shield, color: "text-green-600", bgColor: "bg-green-50" },
  ]

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitor your API key security and usage</p>
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => router.push("/dashboard/keys")}
            aria-label="Create API Key"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create API Key
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </div>
                  {stat.subtitle && <p className="text-sm text-gray-500 mt-1">{stat.subtitle}</p>}
                  {stat.change && (
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                      <span className="text-sm text-gray-500 ml-2">{stat.changeSubtitle}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* API Usage Analytics */}
        <div className="lg:col-span-2">
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-gray-600" />
                  <div>
                    <CardTitle className="text-gray-900">API Usage Analytics</CardTitle>
                    <CardDescription>Visualize your API usage over time</CardDescription>
                  </div>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All API Keys</SelectItem>
                    <SelectItem value="active">Active Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {/* Tab Navigation */}
              <div className="flex space-x-6 mb-6 border-b border-gray-200">
                <button className="pb-2 px-1 border-b-2 border-blue-600 text-blue-600 font-medium text-sm">
                  Total Requests
                </button>
                <button className="pb-2 px-1 text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Avg Response Time
                </button>
                <button className="pb-2 px-1 text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Error Rate
                </button>
              </div>

              {/* Pro Feature Banner */}
              {plan !== "pro" && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="bg-orange-100 p-1 rounded">
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-orange-800">Pro Feature</h4>
                      <p className="text-sm text-orange-700 mt-1">
                        You're viewing historical usage data from when you had a Pro subscription. Upgrade to Pro to
                        resume collecting new usage data and access advanced analytics features.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Current Week Display */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <span className="text-sm font-medium text-gray-900">Current Week Jul 27 - Aug 2</span>
              </div>

              {/* Empty Chart Area */}
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No usage data available</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Alerts */}
        <div>
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts to display</h3>
                <p className="text-gray-500 text-sm">Your system is running smoothly</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
