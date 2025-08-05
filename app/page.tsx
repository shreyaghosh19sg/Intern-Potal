"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/dashboard")
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-pulse bg-cover bg-no-repeat p-4">
      <Card className="w-full max-w-md shadow-2xl border border-gray-200 backdrop-blur-xl bg-white/80 transition-transform transform hover:scale-[1.02] duration-300">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-gray-800 tracking-tight animate-fade-in">
            🚀 Intern Portal
          </CardTitle>
          <CardDescription className="text-gray-600 animate-fade-in-up mt-2">
            Access your dashboard and track your progress.
          </CardDescription>
        </CardHeader>
        <CardContent className="animate-fade-in-up">
          <Tabs defaultValue="login" className="w-full transition-all duration-300">
            <TabsList className="grid w-full grid-cols-2 bg-gray-200 rounded-lg mb-4 overflow-hidden">
              <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">Login</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">Sign Up</TabsTrigger>
            </TabsList>

            {/* LOGIN FORM */}
            <TabsContent value="login" className="transition-all duration-300">
              <form onSubmit={handleLogin} className="space-y-4 animate-fade-in-up">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus:ring-2 focus:ring-purple-500 transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="focus:ring-2 focus:ring-purple-500 transition-all"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium hover:scale-[1.01] transition-all">
                  Login
                </Button>
              </form>
            </TabsContent>

            {/* SIGNUP FORM */}
            <TabsContent value="signup" className="transition-all duration-300">
              <form onSubmit={handleSignup} className="space-y-4 animate-fade-in-up">
                <div className="space-y-1">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus:ring-2 focus:ring-purple-500 transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="focus:ring-2 focus:ring-purple-500 transition-all"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium hover:scale-[1.01] transition-all">
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
