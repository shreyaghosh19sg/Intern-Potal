"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

interface InternData {
  name: string
  referralCode: string
  donationsRaised: number
  tasksCompleted: number
}

export default function TaskCompletedPage() {
  const [data, setData] = useState<InternData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mockData: InternData[] = [
      { name: "Shreya Ghosh", referralCode: "shreya2025", tasksCompleted: 10, donationsRaised: 2000 },
      { name: "Suman Bera", referralCode: "suman2025", tasksCompleted: 9, donationsRaised: 1800 },
      { name: "Raha Singh", referralCode: "raha2025", tasksCompleted: 9, donationsRaised: 1750 },
      { name: "Tiya Bose", referralCode: "tina2025", tasksCompleted: 8, donationsRaised: 1500 },
      { name: "Ram Das", referralCode: "ram2025", tasksCompleted: 8, donationsRaised: 1450 },
      { name: "Pihu Das", referralCode: "pihu2025", tasksCompleted: 7, donationsRaised: 1200 },
      { name: "Sini De", referralCode: "sini2025", tasksCompleted: 7, donationsRaised: 1150 },
      { name: "Sohini Dey", referralCode: "sohini2025", tasksCompleted: 6, donationsRaised: 1000 },
    ]

    setTimeout(() => {
      setData(mockData)
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/dashboard">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">All Intern Tasks</h1>
        </div>

        <div className="space-y-4">
          {data.map((intern) => (
            <Card key={intern.referralCode}>
              <CardHeader>
                <CardTitle className="text-lg flex justify-between items-center">
                  {intern.name}
                  <span className="text-sm text-muted-foreground">Code: {intern.referralCode}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div className="text-purple-600 font-semibold">
                  Tasks Completed: {intern.tasksCompleted}
                </div>
                <div className="text-green-600 font-semibold">
                  Donations: ${intern.donationsRaised.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
