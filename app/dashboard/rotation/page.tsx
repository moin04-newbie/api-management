"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Calendar, Clock, AlertTriangle } from "lucide-react"

export default function RotationSchedulePage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rotation Schedule</h1>
            <p className="text-gray-600 mt-1">Manage automated API key rotation notifications</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Rotation
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-8 mb-8 border-b border-gray-200">
        <button className="pb-3 px-1 border-b-2 border-blue-600 text-blue-600 font-medium">Active Schedules</button>
        <button className="pb-3 px-1 text-gray-500 hover:text-gray-700 font-medium">Rotation History</button>
        <button className="pb-3 px-1 text-gray-500 hover:text-gray-700 font-medium">Default Settings</button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">Total Scheduled</p>
                <div className="flex items-center space-x-3">
                  <p className="text-3xl font-bold text-gray-900">0</p>
                  <div className="p-2 rounded-lg bg-blue-50">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Updated 02:55:15</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">Upcoming (30d)</p>
                <div className="flex items-center space-x-3">
                  <p className="text-3xl font-bold text-gray-900">0</p>
                  <div className="p-2 rounded-lg bg-yellow-50">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Updated 02:55:15</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">Overdue</p>
                <div className="flex items-center space-x-3">
                  <p className="text-3xl font-bold text-gray-900">0</p>
                  <div className="p-2 rounded-lg bg-red-50">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Updated 02:55:15</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search schedules..."
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Filter:</span>
          <Select defaultValue="all-schedules">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-schedules">All Schedules</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Scheduled Rotations */}
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">All Scheduled Rotations (0)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No active rotation schedules</h3>
            <p className="text-gray-600 mb-6">Create your first schedule to get started</p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Schedule Your First Rotation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
