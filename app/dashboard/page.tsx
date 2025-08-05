"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Trophy, Users, DollarSign, Gift, Star,
  Award, Target, CheckCircle
} from "lucide-react"
import Link from "next/link"

interface InternData {
  name: string
  referralCode: string
  donationsRaised: number
  tasksCompleted: number
}

export default function Dashboard() {
  const [internData, setInternData] = useState<InternData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInternData = async () => {
      try {
        const mockData = {
          name: "Shreya Ghosh",
          referralCode: "shreya2025",
          donationsRaised: 2000,
          tasksCompleted: 10,
        }

        setTimeout(() => {
          setInternData(mockData)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching intern data:", error)
        setLoading(false)
      }
    }

    fetchInternData()
  }, [])

  const rewards = [
    { name: "First Donation", description: "Raised your first $100", unlocked: true, icon: DollarSign },
    { name: "Rising Star", description: "Reached $500 in donations", unlocked: true, icon: Star },
    { name: "Team Player", description: "Referred 5 new donors", unlocked: true, icon: Users },
    { name: "High Achiever", description: "Reach $1000 in donations", unlocked: true, icon: Trophy },
    { name: "Top Performer", description: "Reach $2000 in donations", unlocked: false, icon: Award },
    { name: "Elite Status", description: "Reach $5000 in donations", unlocked: false, icon: Target },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {internData?.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                Track your progress and achievements
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/leaderboard">
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Trophy className="h-4 w-4" />
                  View Leaderboard
                </Button>
              </Link>
              <Link href="/taskcompleted">
  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
    <CheckCircle className="h-4 w-4" />
    View Tasks
  </Button>
</Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Donations Raised</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${internData?.donationsRaised.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Referral Code</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{internData?.referralCode}</div>
              <p className="text-xs text-muted-foreground">Share with potential donors</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{internData?.tasksCompleted}</div>
              <p className="text-xs text-muted-foreground">Keep up the great work!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Rank</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#3</div>
              <p className="text-xs text-muted-foreground">Out of 25 interns</p>
            </CardContent>
          </Card>
        </div>

        {/* Rewards Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Rewards & Achievements
            </CardTitle>
            <CardDescription>
              Unlock rewards as you reach new milestones in your fundraising journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.map((reward, index) => {
                const IconComponent = reward.icon
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      reward.unlocked
                        ? "border-green-200 bg-green-50"
                        : "border-gray-200 bg-gray-50 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`p-2 rounded-full ${
                          reward.unlocked
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{reward.name}</h3>
                        <Badge variant={reward.unlocked ? "default" : "secondary"} className="text-xs">
                          {reward.unlocked ? "Unlocked" : "Locked"}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">{reward.description}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

