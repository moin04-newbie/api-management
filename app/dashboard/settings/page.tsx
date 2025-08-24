"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { onAuthStateChanged, changePassword, signOutUser } from "@/lib/auth"
import { getPlan, setPlan } from "@/lib/subscription"
import { Mail, Lock, Eye, EyeOff, Shield, Crown, Check, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

type Tab = "account" | "billing"

export default function SettingsPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>("account")
  const [email, setEmail] = useState("")
  const [plan, setPlanState] = useState<"free" | "pro">("free")
  const [showPass, setShowPass] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {
    const unsub = onAuthStateChanged((u) => {
      if (u?.email) setEmail(u.email)
    })
    setPlanState(getPlan())
    return () => unsub()
  }, [])

  const handleLogout = async () => {
    try {
      await signOutUser()
      router.push("/") // Redirect to landing page
    } catch (error) {
      console.error("Logout error:", error)
      // Still redirect even if there's an error
      router.push("/")
    }
  }

  const updateEmail = async () => {
    alert("Email update requires re-authentication; implement with Firebase updateEmail().")
  }

  const updatePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    if (!email) { alert("No authenticated user"); return }
    try {
      await changePassword(email, currentPassword, newPassword)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      alert("Password updated successfully")
    } catch (e: any) {
      alert(e?.message || "Failed to update password")
    }
  }

  const handleUpgrade = () => {
    setPlan("pro"); setPlanState("pro")
  }
  const handleDowngrade = () => {
    setPlan("free"); setPlanState("free")
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="h-fit lg:col-span-1">
          <CardHeader>
            <CardTitle>User Settings</CardTitle>
            <CardDescription>Manage your account and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <button
              className={`w-full text-left px-3 py-2 rounded ${tab === "account" ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"}`}
              onClick={() => setTab("account")}
            >
              Account & Security
            </button>
            <button
              className={`w-full text-left px-3 py-2 rounded ${tab === "billing" ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"}`}
              onClick={() => setTab("billing")}
            >
              Billing
            </button>
            
            {/* Logout Button */}
            <div className="pt-4 border-t border-gray-200">
              <Button 
                variant="outline" 
                className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {tab === "account" ? (
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account email and password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Email */}
              <div>
                <Label className="text-sm">Email Address</Label>
                <div className="mt-2 flex gap-2 items-center">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input className="pl-9" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <Button onClick={updateEmail}>Update</Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">You'll need to confirm your new email address</p>
              </div>

              {/* Password */}
              <div>
                <h3 className="font-medium mb-2">Change Password</h3>
                <div className="grid gap-3 max-w-xl">
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type={showPass ? "text" : "password"}
                      className="pl-9 pr-10"
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type={showPass ? "text" : "password"}
                      className="pl-9 pr-10"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button type="button" className="absolute right-3 top-3 text-gray-400" onClick={() => setShowPass(v => !v)}>
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type={showPass ? "text" : "password"}
                      className="pl-9 pr-10"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <Button onClick={updatePassword}>Update Password</Button>
                  </div>
                </div>
              </div>

              {/* Two-Factor placeholder */}
              <div>
                <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                <div className="border rounded p-6 text-center text-gray-600">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  Two-factor authentication is not enabled.
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Billing & Subscription</CardTitle>
              <CardDescription>Choose the plan that works for you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Free Plan */}
                <div className={`border rounded-xl p-6 ${plan === "free" ? "ring-2 ring-blue-500" : ""}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <h3 className="text-xl font-semibold">Free Tier</h3>
                    </div>
                    {plan === "free" && (
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">Current Plan</span>
                    )}
                  </div>
                  <div className="text-3xl font-bold">$0 <span className="text-base font-normal">/forever</span></div>
                  <ul className="mt-4 space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600"/> Up to 5 API keys</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600"/> Advanced key management</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600"/> In-app notifications</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600"/> Enhanced security features</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600"/> HTTPS encryption</li>
                  </ul>
                  <div className="mt-6">
                    {plan === "free" ? (
                      <Button variant="outline" className="w-full" disabled>Current Plan</Button>
                    ) : (
                      <Button variant="outline" className="w-full" onClick={handleDowngrade}>Switch to Free</Button>
                    )}
                  </div>
                </div>

                {/* Pro Plan */}
                <div className={`border rounded-xl p-6 ${plan === "pro" ? "ring-2 ring-green-600" : ""}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Crown className="h-5 w-5 text-orange-600" />
                      <h3 className="text-xl font-semibold">Pro Plan</h3>
                    </div>
                  </div>
                  <div className="text-3xl font-bold">$9 <span className="text-base font-normal">/per month</span></div>
                  <ul className="mt-4 space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600"/> Up to 25 API keys</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600"/> Advanced analytics & reporting</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600"/> Email notifications & alerts</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600"/> Enterprise security features</li>
                  </ul>
                  <div className="mt-6">
                    {plan === "pro" ? (
                      <Button className="w-full" disabled>You're on Pro</Button>
                    ) : (
                      <Button className="w-full" onClick={handleUpgrade}>Upgrade to Pro</Button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-2">Cancel anytime</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}


