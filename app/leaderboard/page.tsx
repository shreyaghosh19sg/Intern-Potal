"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, ArrowLeft, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"

interface LeaderboardEntry {
  name: string
  referralCode: string
  donationsRaised: number
  tasksCompleted: number
}

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const mockData = [
          { name: "Tiya Bose", referralCode: "tina2025", donationsRaised: 2400, tasksCompleted: 8 },
          { name: "Shreya Ghosh", referralCode: "shreya2025", donationsRaised: 2000, tasksCompleted: 10 },
          { name: "Suman Bera", referralCode: "suman2025", donationsRaised: 1900, tasksCompleted: 9 },
          { name: "Pihu Das", referralCode: "pihu2025", donationsRaised: 1750, tasksCompleted: 7 },
          { name: "Sohini Dey", referralCode: "sohini2025", donationsRaised: 1500, tasksCompleted: 6 },
          { name: "Ram Das", referralCode: "ram2025", donationsRaised: 1250, tasksCompleted: 8 },
          { name: "Raha Singh", referralCode: "raha2025", donationsRaised: 1000, tasksCompleted: 9 },
          { name: "Sini De", referralCode: "sini2025", donationsRaised: 800, tasksCompleted: 7 },
        ]

        setTimeout(() => {
          setLeaderboardData(mockData)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching leaderboard data:", error)
        setLoading(false)
      }
    }

    fetchLeaderboardData()
  }, [])

  const sortedData = [...leaderboardData].sort((a, b) =>
    sortOrder === "desc" ? b.donationsRaised - a.donationsRaised : a.donationsRaised - b.donationsRaised
  )

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 2:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
    }
  }

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">1st Place</Badge>
      case 1:
        return <Badge variant="secondary">2nd Place</Badge>
      case 2:
        return <Badge className="bg-amber-600 hover:bg-amber-700">3rd Place</Badge>
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
              <p className="text-gray-600 mt-1">See how you rank among all interns</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
              className="flex items-center gap-2"
            >
              {sortOrder === "desc" ? (
                <>
                  <TrendingDown className="h-4 w-4" />
                  Highest First
                </>
              ) : (
                <>
                  <TrendingUp className="h-4 w-4" />
                  Lowest First
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {sortedData.map((intern, index) => (
                <div key={intern.referralCode} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10">{getRankIcon(index)}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{intern.name}</h3>
                        {getRankBadge(index)}
                      </div>
                      <p className="text-gray-600 text-sm">Code: {intern.referralCode}</p>
                      <p className="text-sm text-purple-700">Tasks Completed: {intern.tasksCompleted}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">${intern.donationsRaised.toLocaleString()}</div>
                    <p className="text-gray-500 text-sm">raised</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">
                ${sortedData.reduce((sum, intern) => sum + intern.donationsRaised, 0).toLocaleString()}
              </div>
              <p className="text-gray-600 text-sm">Total Raised by All Interns</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">
                $
                {Math.round(
                  sortedData.reduce((sum, intern) => sum + intern.donationsRaised, 0) / sortedData.length,
                ).toLocaleString()}
              </div>
              <p className="text-gray-600 text-sm">Average per Intern</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">{sortedData.length}</div>
              <p className="text-gray-600 text-sm">Active Interns</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
