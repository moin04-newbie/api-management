"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Shield, Key, Users, BarChart3, Bell, FileText, ArrowRight, Check, Star, Github, Twitter, Linkedin } from 'lucide-react'
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['hero']));
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);

      // Check which sections are visible
      const newVisibleSections = new Set<string>();
      
      Object.entries(sectionRefs.current).forEach(([sectionId, element]) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // Section is visible if it's in the viewport
          if (rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2) {
            newVisibleSections.add(sectionId);
          }
        }
      });

      setVisibleSections(newVisibleSections);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#A191D8]">
      {/* Header */}
      <header className="sticky top-0 z-50 flex justify-center pt-4 px-4">
        <div className={`backdrop-blur-xl rounded-2xl border w-full max-w-2xl shadow-lg transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 border-gray-200/50' 
            : 'bg-white/90 border-white/30'
        }`}>
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Modern Logo */}
              <div className="flex items-center space-x-3">
                <div className="relative w-10 h-10">
                  <div className={`absolute w-6 h-6 rounded-full left-0 shadow-sm transition-colors duration-300 ${
                    isScrolled ? 'bg-[#9F8CDD]' : 'bg-[#9F8CDD]'
                  }`}></div>
                  <div className={`absolute w-6 h-6 rounded-full right-0 opacity-80 shadow-sm transition-colors duration-300 ${
                    isScrolled ? 'bg-[#A191D8]' : 'bg-[#A191D8]'
                  }`}></div>
                </div>
                <span className={`text-xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-[#9F8CDD]' : 'text-[#9F8CDD]'
                }`}>KeyNest</span>
              </div>
              
              {/* Navigation links */}
              <nav className="hidden md:flex items-center space-x-8 ml-8">
                <Link href="#" className={`font-semibold transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-[#9F8CDD]/80 hover:text-[#9F8CDD]' 
                    : 'text-[#9F8CDD]/80 hover:text-[#9F8CDD]'
                }`}>
                  Home
                </Link>
                <Link href="#features" className={`font-semibold transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-[#9F8CDD]/80 hover:text-[#9F8CDD]' 
                    : 'text-[#9F8CDD]/80 hover:text-[#9F8CDD]'
                }`}>
                  Features
                </Link>
              </nav>
            </div>
            
            {/* Right side - buttons and hamburger */}
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex items-center space-x-4">
                <Link href="/auth">
                  <Button variant="outline" className={`transition-all duration-300 ${
                    isScrolled 
                      ? 'border-[#9F8CDD]/30 text-[#9F8CDD] hover:bg-[#9F8CDD]/10 bg-transparent' 
                      : 'border-[#9F8CDD]/30 text-[#9F8CDD] hover:bg-[#9F8CDD]/10 bg-transparent'
                  }`}>
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button className={`transition-all duration-300 ${
                    isScrolled 
                      ? 'bg-[#9F8CDD] text-white hover:bg-[#A191D8]' 
                      : 'bg-[#9F8CDD] text-white hover:bg-[#A191D8]'
                  } font-semibold shadow-sm`}>Get Started</Button>
                </Link>
              </nav>
              
              {/* Hamburger menu */}
              <button className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1">
                <div className={`w-6 h-0.5 rounded transition-colors duration-300 ${
                  isScrolled ? 'bg-[#9F8CDD]' : 'bg-[#9F8CDD]'
                }`}></div>
                <div className={`w-6 h-0.5 rounded transition-colors duration-300 ${
                  isScrolled ? 'bg-[#9F8CDD]' : 'bg-[#9F8CDD]'
                }`}></div>
                <div className={`w-6 h-0.5 rounded transition-colors duration-300 ${
                  isScrolled ? 'bg-[#9F8CDD]' : 'bg-[#9F8CDD]'
                }`}></div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        ref={(el) => { sectionRefs.current['hero'] = el; }}
        className={`py-20 px-4 transition-all duration-1000 ease-out ${
          visibleSections.has('hero') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-white/20 text-white border-white/30">
            🔐 Secure API Key Management
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Secure, Elegant API Key Management for{" "}
            <span className="relative">
              <span className="absolute inset-0 bg-gradient-to-r from-white to-[#9F8CDD] rounded-full blur-lg opacity-30 animate-pulse"></span>
              <span className="relative bg-gradient-to-r from-black to-[#4a3c8c] bg-clip-text text-transparent">
                Developers & Teams
              </span>
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Say goodbye to key chaos. KeyNest provides effortless, secure API key management with enterprise-grade
            encryption, team collaboration, and comprehensive audit trails.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/auth">
              <Button size="lg" className="bg-white text-[#9F8CDD] hover:bg-white/90 px-8 py-3 shadow-lg font-semibold">
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3 bg-transparent"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={(el) => { sectionRefs.current['features'] = el; }}
        id="features" 
        className={`py-20 px-4 bg-white relative overflow-hidden transition-all duration-1000 ease-out ${
          visibleSections.has('features') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Fast Moving Lines */}
        <div className="absolute top-20 left-0 w-1 h-20 bg-black/30 transform -skew-x-12 animate-pulse" style={{animationDuration: '0.8s', animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-0 w-1 h-16 bg-black/25 transform skew-x-12 animate-pulse" style={{animationDuration: '1.2s', animationDelay: '0.3s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-1 h-24 bg-black/20 transform -skew-x-12 animate-pulse" style={{animationDuration: '0.6s', animationDelay: '0.6s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-18 bg-black/30 transform skew-x-12 animate-pulse" style={{animationDuration: '1s', animationDelay: '0.9s'}}></div>
        <div className="absolute bottom-10 right-10 w-1 h-14 bg-black/25 transform -skew-x-12 animate-pulse" style={{animationDuration: '0.7s', animationDelay: '1.2s'}}></div>
        <div className="absolute top-1/3 left-1/3 w-1 h-22 bg-black/20 transform skew-x-12 animate-pulse" style={{animationDuration: '0.9s', animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-16 bg-black/30 transform -skew-x-12 animate-pulse" style={{animationDuration: '0.8s', animationDelay: '1.8s'}}></div>
        <div className="absolute top-1/4 right-1/4 w-1 h-20 bg-black/25 transform skew-x-12 animate-pulse" style={{animationDuration: '1.1s', animationDelay: '2.1s'}}></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Everything you need to manage API keys securely</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From creation to rotation, KeyNest handles your entire API key lifecycle with enterprise-grade security
              and team collaboration features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className={`bg-white border border-gray-200 hover:shadow-lg transition-all duration-700 hover:shadow-xl ${
              visibleSections.has('features') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`} style={{transitionDelay: '200ms'}}>
              <CardHeader>
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-black">Enterprise Security</CardTitle>
                <CardDescription className="text-gray-600">
                  Zero-trust architecture with client-side encryption and secure key storage
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className={`bg-white border border-gray-200 hover:shadow-lg transition-all duration-700 hover:shadow-xl ${
              visibleSections.has('features') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`} style={{transitionDelay: '400ms'}}>
              <CardHeader>
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                  <Key className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-black">Lifecycle Management</CardTitle>
                <CardDescription className="text-gray-600">
                  Create, rotate, revoke, and monitor API keys with automated expiry handling
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className={`bg-white border border-gray-200 hover:shadow-lg transition-all duration-700 hover:shadow-xl ${
              visibleSections.has('features') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`} style={{transitionDelay: '600ms'}}>
              <CardHeader>
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-black">Team Collaboration</CardTitle>
                <CardDescription className="text-gray-600">
                  Multi-tenant workspaces with role-based access control and team management
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className={`bg-white border border-gray-200 hover:shadow-lg transition-all duration-700 hover:shadow-xl ${
              visibleSections.has('features') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`} style={{transitionDelay: '800ms'}}>
              <CardHeader>
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-black">Usage Analytics</CardTitle>
                <CardDescription className="text-gray-600">
                  Real-time monitoring with visual charts and comprehensive usage insights
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className={`bg-white border border-gray-200 hover:shadow-lg transition-all duration-700 hover:shadow-xl ${
              visibleSections.has('features') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`} style={{transitionDelay: '1000ms'}}>
              <CardHeader>
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-black">Smart Alerts</CardTitle>
                <CardDescription className="text-gray-600">
                  Proactive notifications for suspicious activity and upcoming expirations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className={`bg-white border border-gray-200 hover:shadow-lg transition-all duration-700 hover:shadow-xl ${
              visibleSections.has('features') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`} style={{transitionDelay: '1200ms'}}>
              <CardHeader>
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-black">Audit Trails</CardTitle>
                <CardDescription className="text-gray-600">
                  Complete audit logs with timestamped activities and compliance reporting
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section 
        ref={(el) => { sectionRefs.current['how-it-works'] = el; }}
        className={`py-20 px-4 bg-gradient-to-r from-[#A191D8] via-[#A191D8] via-[#A191D8] via-[#A191D8] via-black to-black transition-all duration-1000 ease-out ${
          visibleSections.has('how-it-works') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How KeyNest Works</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Get started in minutes with our intuitive workflow designed for developers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 - Purple Theme */}
            <div className={`text-center transition-all duration-700 ${
              visibleSections.has('how-it-works') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`} style={{transitionDelay: '200ms'}}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-[#9F8CDD]">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Create Your Workspace</h3>
              <p className="text-white/80">
                Set up your team workspace and invite members with appropriate permissions
              </p>
            </div>

            {/* Step 2 - Purple Theme (transitioning) */}
            <div className={`text-center transition-all duration-700 ${
              visibleSections.has('how-it-works') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`} style={{transitionDelay: '400ms'}}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-[#9F8CDD]">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Add Your API Keys</h3>
              <p className="text-white/80">Securely store and organize your API keys with client-side encryption</p>
            </div>

            {/* Step 3 - Black & White Theme */}
            <div className={`text-center transition-all duration-700 ${
              visibleSections.has('how-it-works') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`} style={{transitionDelay: '600ms'}}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-black">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Monitor & Manage</h3>
              <p className="text-white/80">Track usage, rotate keys, and receive alerts for optimal security</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section 
        ref={(el) => { sectionRefs.current['pricing'] = el; }}
        id="pricing" 
        className={`py-20 px-4 bg-gradient-to-r from-black via-black to-[#A191D8] transition-all duration-1000 ease-out ${
          visibleSections.has('pricing') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Free</CardTitle>
                <div className="text-4xl font-bold text-white mt-4">$0</div>
                <CardDescription className="text-white/70">Perfect for individual developers</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-white/90">Up to 10 API keys</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-white/90">Basic encryption</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-white/90">Email notifications</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-white/90">30-day audit logs</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-white text-black hover:bg-white/90 font-semibold">Get Started Free</Button>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/20 hover:bg-white/10 transition-all duration-300 hover:shadow-xl relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-black font-semibold">
                Most Popular
              </Badge>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Pro</CardTitle>
                <div className="text-4xl font-bold text-white mt-4">$29</div>
                <CardDescription className="text-white/70">For teams and growing businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-white/90">Unlimited API keys</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-white/90">Advanced encryption</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-white/90">Team collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-white/90">Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-white/90">Priority support</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-white text-black hover:bg-white/90 font-semibold">Start Pro Trial</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        ref={(el) => { sectionRefs.current['testimonials'] = el; }}
        className={`py-20 px-4 bg-gradient-to-r from-[#A191D8] via-[#A191D8] via-[#A191D8] via-black to-black transition-all duration-1000 ease-out ${
          visibleSections.has('testimonials') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Trusted by Developers Worldwide</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/80 mb-4">
                  "KeyNest transformed how our team manages API keys. The security features and audit trails give us
                  complete peace of mind."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/10 rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold text-white">Sarah Chen</div>
                    <div className="text-sm text-white/60">CTO, TechCorp</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/80 mb-4">
                  "The automated rotation and expiry alerts saved us from multiple potential security incidents. Highly
                  recommended!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/10 rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold text-white">Mike Rodriguez</div>
                    <div className="text-sm text-white/60">Lead Developer, StartupXYZ</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/80 mb-4">
                  "Clean interface, powerful features, and excellent security. KeyNest is exactly what we needed for our
                  growing team."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/10 rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold text-white">Emily Johnson</div>
                    <div className="text-sm text-white/60">DevOps Engineer, CloudCo</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={(el) => { sectionRefs.current['cta'] = el; }}
        className={`py-20 px-4 text-white relative overflow-hidden transition-all duration-1000 ease-out ${
          visibleSections.has('cta') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-black z-0">
          {/* Animated floating elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-[#9F8CDD]/40 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/15 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-[#A191D8]/35 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-10 right-10 w-28 h-28 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
          
          {/* Additional black and white elements */}
          <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-black/25 rounded-lg animate-pulse" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-[#9F8CDD]/45 rounded-lg animate-bounce" style={{animationDelay: '1.2s'}}></div>
          <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-black/30 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-18 h-18 bg-[#A191D8]/30 rounded-lg animate-bounce" style={{animationDelay: '1.8s'}}></div>
        </div>
        
        {/* Moving gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/60 via-black/50 to-black/80 z-0 animate-pulse"></div>
        
        {/* Subtle glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl z-0 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl z-0 animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white to-[#A191D8] bg-clip-text text-transparent">
            Ready to Secure Your API Keys?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of developers who trust KeyNest to manage their API keys securely. Start your free trial
            today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" className="bg-white text-[#9F8CDD] hover:bg-white/90 px-8 py-4 rounded-full shadow-lg font-semibold text-lg">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full bg-transparent font-semibold text-lg">
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm text-white/70 mt-4">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer 
        ref={(el) => { sectionRefs.current['footer'] = el; }}
        className={`bg-white border-t border-[#013C5A]/10 py-12 px-4 transition-all duration-1000 ease-out ${
          visibleSections.has('footer') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
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
