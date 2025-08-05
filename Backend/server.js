const express = require("express")
const cors = require("cors")
const path = require("path")
const fs = require("fs")

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Read data from JSON file
const getInternData = () => {
  try {
    const dataPath = path.join(__dirname, "data", "intern.json")
    const rawData = fs.readFileSync(dataPath, "utf8")
    return JSON.parse(rawData)
  } catch (error) {
    console.error("Error reading intern data:", error)
    return null
  }
}

// Routes
app.get("/api/intern", (req, res) => {
  try {
    const data = getInternData()
    if (!data) {
      return res.status(500).json({ error: "Failed to load intern data" })
    }

    res.json(data.intern)
  } catch (error) {
    console.error("Error in /api/intern:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.get("/api/leaderboard", (req, res) => {
  try {
    const data = getInternData()
    if (!data) {
      return res.status(500).json({ error: "Failed to load leaderboard data" })
    }

    // Sort by donations raised (descending)
    const sortedLeaderboard = data.leaderboard.sort((a, b) => b.donationsRaised - a.donationsRaised)

    res.json(sortedLeaderboard)
  } catch (error) {
    console.error("Error in /api/leaderboard:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/api/health`)
  console.log(`Intern data: http://localhost:${PORT}/api/intern`)
  console.log(`Leaderboard: http://localhost:${PORT}/api/leaderboard`)
})

module.exports = app
