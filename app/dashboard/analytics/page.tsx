"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Code, TrendingUp, Clock, AlertTriangle, Filter } from 'lucide-react'
import { useEffect, useState } from "react"
import { getPlan } from "@/lib/subscription"

export default function AnalyticsPage() {
  const [plan, setPlanState] = useState<"free" | "pro">("free")
  useEffect(() => { setPlanState(getPlan()) }, [])

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-1">Detailed usage analytics and insights for your API keys</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Code className="h-4 w-4 mr-2" />
            Generate Tracking Script
          </Button>
        </div>
      </div>

      {/* Pro Feature Required Banner */}
      {plan !== "pro" && (
        <Card className="border border-orange-200 bg-orange-50 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-orange-800 mb-2">Pro Feature Required</h3>
                <p className="text-orange-700 mb-4">
                  You're viewing historical usage data from when you had a Pro subscription. Upgrade to Pro to resume
                  collecting new usage data and access advanced analytics features.
                </p>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  Learn More About Tracking Scripts
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Start Tracking Section */}
      <Card className="border border-blue-200 bg-blue-50 mb-8">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Code className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Start Tracking API Usage</h3>
              <p className="text-blue-700 mb-2">
                Generate custom tracking scripts to automatically monitor your API usage across different applications
                and programming languages.
              </p>
              <p className="text-blue-700 mb-4">
                <span className="font-medium">Supported:</span> JavaScript, Python, PHP, Go, cURL
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Usage Analytics */}
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
                    You're viewing historical usage data from when you had a Pro subscription. Upgrade to Pro to resume
                    collecting new usage data and access advanced analytics features.
                  </p>
                </div>
              </div>
            </div>
          )}

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

          {/* Empty Chart Area */}
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No analytics data available</p>
              <p className="text-sm text-gray-400 mt-1">Start tracking your API usage to see detailed analytics</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
