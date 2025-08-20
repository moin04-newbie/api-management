import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Shield, Key, Users, BarChart3, Bell, FileText, ArrowRight, Check, Star, Github, Twitter, Linkedin } from 'lucide-react'
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFF8EC]">
      {/* Header */}
      <header className="border-b border-[#013C5A]/10 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#013C5A] rounded-lg flex items-center justify-center">
              <Key className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#013C5A]">KeyNest</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-[#013C5A] hover:text-[#013C5A]/80 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-[#013C5A] hover:text-[#013C5A]/80 transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="text-[#013C5A] hover:text-[#013C5A]/80 transition-colors">
              About
            </Link>
            <Link href="/auth">
              <Button variant="outline" className="border-[#013C5A] text-[#013C5A] hover:bg-[#013C5A] hover:text-white bg-transparent">
                Sign In
              </Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-[#013C5A] hover:bg-[#013C5A]/90 text-white">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-[#013C5A]/10 text-[#013C5A] hover:bg-[#013C5A]/20">
            🔐 Secure API Key Management
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-[#013C5A] mb-6 leading-tight">
            Secure, Elegant API Key Management for{" "}
            <span className="bg-gradient-to-r from-[#013C5A] to-[#013C5A]/70 bg-clip-text text-transparent">
              Developers & Teams
            </span>
          </h1>
          <p className="text-xl text-[#013C5A]/70 mb-8 max-w-2xl mx-auto">
            Say goodbye to key chaos. KeyNest provides effortless, secure API key management with enterprise-grade
            encryption, team collaboration, and comprehensive audit trails.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/auth">
              <Button size="lg" className="bg-[#013C5A] hover:bg-[#013C5A]/90 text-white px-8 py-3">
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-[#013C5A] text-[#013C5A] hover:bg-[#013C5A] hover:text-white px-8 py-3 bg-transparent"
            >
              Watch Demo
            </Button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-[#013C5A]/10">
              <img
                src="/placeholder.svg?height=400&width=800"
                alt="KeyNest Dashboard Preview"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#013C5A] mb-4">Everything you need to manage API keys securely</h2>
            <p className="text-xl text-[#013C5A]/70 max-w-2xl mx-auto">
              From creation to rotation, KeyNest handles your entire API key lifecycle with enterprise-grade security
              and team collaboration features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-[#013C5A]/10 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#013C5A]/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-[#013C5A]" />
                </div>
                <CardTitle className="text-[#013C5A]">Enterprise Security</CardTitle>
                <CardDescription>
                  Zero-trust architecture with client-side encryption and secure key storage
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-[#013C5A]/10 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#013C5A]/10 rounded-lg flex items-center justify-center mb-4">
                  <Key className="w-6 h-6 text-[#013C5A]" />
                </div>
                <CardTitle className="text-[#013C5A]">Lifecycle Management</CardTitle>
                <CardDescription>
                  Create, rotate, revoke, and monitor API keys with automated expiry handling
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-[#013C5A]/10 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#013C5A]/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-[#013C5A]" />
                </div>
                <CardTitle className="text-[#013C5A]">Team Collaboration</CardTitle>
                <CardDescription>
                  Multi-tenant workspaces with role-based access control and team management
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-[#013C5A]/10 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#013C5A]/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-[#013C5A]" />
                </div>
                <CardTitle className="text-[#013C5A]">Usage Analytics</CardTitle>
                <CardDescription>
                  Real-time monitoring with visual charts and comprehensive usage insights
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-[#013C5A]/10 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#013C5A]/10 rounded-lg flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-[#013C5A]" />
                </div>
                <CardTitle className="text-[#013C5A]">Smart Alerts</CardTitle>
                <CardDescription>
                  Proactive notifications for suspicious activity and upcoming expirations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-[#013C5A]/10 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#013C5A]/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-[#013C5A]" />
                </div>
                <CardTitle className="text-[#013C5A]">Audit Trails</CardTitle>
                <CardDescription>
                  Complete audit logs with timestamped activities and compliance reporting
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-[#FFF8EC]">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#013C5A] mb-4">How KeyNest Works</h2>
            <p className="text-xl text-[#013C5A]/70 max-w-2xl mx-auto">
              Get started in minutes with our intuitive workflow designed for developers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#013C5A] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-[#013C5A] mb-4">Create Your Workspace</h3>
              <p className="text-[#013C5A]/70">
                Set up your team workspace and invite members with appropriate permissions
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#013C5A] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-[#013C5A] mb-4">Add Your API Keys</h3>
              <p className="text-[#013C5A]/70">Securely store and organize your API keys with client-side encryption</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#013C5A] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-[#013C5A] mb-4">Monitor & Manage</h3>
              <p className="text-[#013C5A]/70">Track usage, rotate keys, and receive alerts for optimal security</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#013C5A] mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-[#013C5A]/70 max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-[#013C5A]/10 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-[#013C5A]">Free</CardTitle>
                <div className="text-4xl font-bold text-[#013C5A] mt-4">$0</div>
                <CardDescription>Perfect for individual developers</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Up to 10 API keys
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Basic encryption
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Email notifications
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    30-day audit logs
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-[#013C5A] hover:bg-[#013C5A]/90 text-white">Get Started Free</Button>
              </CardContent>
            </Card>

            <Card className="border-[#013C5A] border-2 hover:shadow-lg transition-shadow relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#013C5A] text-white">
                Most Popular
              </Badge>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-[#013C5A]">Pro</CardTitle>
                <div className="text-4xl font-bold text-[#013C5A] mt-4">$29</div>
                <CardDescription>For teams and growing businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Unlimited API keys
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Advanced encryption
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Team collaboration
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Priority support
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-[#013C5A] hover:bg-[#013C5A]/90 text-white">Start Pro Trial</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-[#FFF8EC]">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#013C5A] mb-4">Trusted by Developers Worldwide</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-[#013C5A]/10">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-[#013C5A]/80 mb-4">
                  "KeyNest transformed how our team manages API keys. The security features and audit trails give us
                  complete peace of mind."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#013C5A]/10 rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold text-[#013C5A]">Sarah Chen</div>
                    <div className="text-sm text-[#013C5A]/60">CTO, TechCorp</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#013C5A]/10">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-[#013C5A]/80 mb-4">
                  "The automated rotation and expiry alerts saved us from multiple potential security incidents. Highly
                  recommended!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#013C5A]/10 rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold text-[#013C5A]">Mike Rodriguez</div>
                    <div className="text-sm text-[#013C5A]/60">Lead Developer, StartupXYZ</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#013C5A]/10">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-[#013C5A]/80 mb-4">
                  "Clean interface, powerful features, and excellent security. KeyNest is exactly what we needed for our
                  growing team."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#013C5A]/10 rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold text-[#013C5A]">Emily Johnson</div>
                    <div className="text-sm text-[#013C5A]/60">DevOps Engineer, CloudCo</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#013C5A] text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Secure Your API Keys?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust KeyNest to manage their API keys securely. Start your free trial
            today.
          </p>
          <p className="text-sm text-white/60 mt-4">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#013C5A]/10 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-[#013C5A] rounded-lg flex items-center justify-center">
                  <Key className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-[#013C5A]">KeyNest</span>
              </div>
              <p className="text-[#013C5A]/70 mb-4">Secure, elegant API key management for developers and teams.</p>
              <div className="flex space-x-4">
                <Github className="w-5 h-5 text-[#013C5A]/60 hover:text-[#013C5A] cursor-pointer" />
                <Twitter className="w-5 h-5 text-[#013C5A]/60 hover:text-[#013C5A] cursor-pointer" />
                <Linkedin className="w-5 h-5 text-[#013C5A]/60 hover:text-[#013C5A] cursor-pointer" />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-[#013C5A] mb-4">Product</h3>
              <ul className="space-y-2 text-[#013C5A]/70">
                <li>
                  <Link href="#" className="hover:text-[#013C5A]">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#013C5A]">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#013C5A]">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#013C5A]">
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[#013C5A] mb-4">Company</h3>
              <ul className="space-y-2 text-[#013C5A]/70">
                <li>
                  <Link href="#" className="hover:text-[#013C5A]">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#013C5A]">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#013C5A]">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#013C5A]">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[#013C5A] mb-4">Support</h3>
              <ul className="space-y-2 text-[#013C5A]/70">
                <li>
                  <Link href="#" className="hover:text-[#013C5A]">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#013C5A]">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#013C5A]">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#013C5A]">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#013C5A]/10 mt-8 pt-8 text-center text-[#013C5A]/60">
            <p>&copy; 2024 KeyNest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
