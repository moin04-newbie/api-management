"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Clock, AlertTriangle, CheckCircle, Search, TrendingUp } from "lucide-react"

export default function MonitoringPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Monitoring</h1>
            <p className="text-gray-600 mt-1">Monitor API key security, health, and performance</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-8 mb-8 border-b border-gray-200">
        <button className="pb-3 px-1 border-b-2 border-blue-600 text-blue-600 font-medium flex items-center">
          <TrendingUp className="h-4 w-4 mr-2" />
          Overview
        </button>
        <button className="pb-3 px-1 text-gray-500 hover:text-gray-700 font-medium flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Alert Management
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">Security Score</p>
                <div className="flex items-center space-x-3">
                  <p className="text-3xl font-bold text-gray-900">100%</p>
                  <div className="p-2 rounded-lg bg-green-50">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-green-600 font-medium">+5%</span>
                  <span className="text-sm text-gray-500 ml-2">0 unresolved events</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Updated 10 min ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">Avg Response Time</p>
                <div className="flex items-center space-x-3">
                  <p className="text-3xl font-bold text-gray-900">N/A</p>
                  <div className="p-2 rounded-lg bg-blue-50">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-green-600 font-medium">+5%</span>
                  <span className="text-sm text-gray-500 ml-2">vs last week</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Updated 5 min ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">Error Rate</p>
                <div className="flex items-center space-x-3">
                  <p className="text-3xl font-bold text-gray-900">N/A</p>
                  <div className="p-2 rounded-lg bg-red-50">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-green-600 font-medium">-2%</span>
                  <span className="text-sm text-gray-500 ml-2">vs last week</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Updated 5 min ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card className="border border-gray-200 mb-8">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <CardTitle className="text-gray-900">Active Alerts (0)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">All systems operational</h3>
            <p className="text-gray-500">No active alerts</p>
          </div>
        </CardContent>
      </Card>

      {/* Security Events */}
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">Security Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events..."
                className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Select defaultValue="all-keys">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-keys">All API Keys</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-severities">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-severities">All Severities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-events">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-events">All Events</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No security events</h3>
            <p className="text-gray-500">Your API keys are secure and performing well</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
