"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Plus, Search, Edit, Trash2, Star, Code, Database, Palette, Server, Smartphone, Globe } from "lucide-react"
import Link from "next/link"

interface Skill {
  id: string
  name: string
  category: string
  level: number
  experience: string
  description: string
  icon: string
  featured: boolean
  projects: number
  createdAt: string
}

const categoryIcons = {
  Frontend: Globe,
  Backend: Server,
  Database: Database,
  Mobile: Smartphone,
  Design: Palette,
  Programming: Code,
}

export default function AllSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")

  // Mock data
  useEffect(() => {
    const mockSkills: Skill[] = [
      {
        id: "1",
        name: "React",
        category: "Frontend",
        level: 90,
        experience: "3+ years",
        description: "Advanced React development with hooks, context, and modern patterns",
        icon: "⚛️",
        featured: true,
        projects: 15,
        createdAt: "2024-01-10",
      },
      {
        id: "2",
        name: "Node.js",
        category: "Backend",
        level: 85,
        experience: "2+ years",
        description: "Server-side JavaScript development with Express and various databases",
        icon: "🟢",
        featured: true,
        projects: 12,
        createdAt: "2024-01-12",
      },
      {
        id: "3",
        name: "MongoDB",
        category: "Database",
        level: 80,
        experience: "2+ years",
        description: "NoSQL database design and optimization",
        icon: "🍃",
        featured: false,
        projects: 8,
        createdAt: "2024-01-15",
      },
      {
        id: "4",
        name: "TypeScript",
        category: "Programming",
        level: 88,
        experience: "2+ years",
        description: "Type-safe JavaScript development for large-scale applications",
        icon: "🔷",
        featured: true,
        projects: 10,
        createdAt: "2024-01-18",
      },
      {
        id: "5",
        name: "Figma",
        category: "Design",
        level: 75,
        experience: "1+ years",
        description: "UI/UX design and prototyping",
        icon: "🎨",
        featured: false,
        projects: 6,
        createdAt: "2024-01-20",
      },
      {
        id: "6",
        name: "React Native",
        category: "Mobile",
        level: 70,
        experience: "1+ years",
        description: "Cross-platform mobile app development",
        icon: "📱",
        featured: false,
        projects: 4,
        createdAt: "2024-01-25",
      },
    ]
    setSkills(mockSkills)
    setFilteredSkills(mockSkills)
  }, [])

  useEffect(() => {
    let filtered = skills

    if (searchTerm) {
      filtered = filtered.filter(
        (skill) =>
          skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          skill.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((skill) => skill.category === categoryFilter)
    }

    if (levelFilter !== "all") {
      if (levelFilter === "beginner") {
        filtered = filtered.filter((skill) => skill.level < 50)
      } else if (levelFilter === "intermediate") {
        filtered = filtered.filter((skill) => skill.level >= 50 && skill.level < 80)
      } else if (levelFilter === "advanced") {
        filtered = filtered.filter((skill) => skill.level >= 80)
      }
    }

    setFilteredSkills(filtered)
  }, [skills, searchTerm, categoryFilter, levelFilter])

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      setSkills(skills.filter((s) => s.id !== id))
    }
  }

  const getLevelLabel = (level: number) => {
    if (level < 50) return "Beginner"
    if (level < 80) return "Intermediate"
    return "Advanced"
  }

  const getLevelColor = (level: number) => {
    if (level < 50) return "text-yellow-600"
    if (level < 80) return "text-blue-600"
    return "text-green-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Skills</h1>
          <p className="text-gray-600 mt-2">Manage and showcase your technical skills</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/skills/add-skill">
            <Plus className="h-4 w-4 mr-2" />
            Add New Skill
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Frontend">Frontend</SelectItem>
                <SelectItem value="Backend">Backend</SelectItem>
                <SelectItem value="Database">Database</SelectItem>
                <SelectItem value="Mobile">Mobile</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Programming">Programming</SelectItem>
              </SelectContent>
            </Select>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner (0-49%)</SelectItem>
                <SelectItem value="intermediate">Intermediate (50-79%)</SelectItem>
                <SelectItem value="advanced">Advanced (80-100%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => {
          const CategoryIcon = categoryIcons[skill.category as keyof typeof categoryIcons] || Code
          return (
            <Card key={skill.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{skill.icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg">{skill.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          <CategoryIcon className="h-3 w-3 mr-1" />
                          {skill.category}
                        </Badge>
                        {skill.featured && (
                          <Badge className="bg-yellow-500 text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{skill.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Proficiency</span>
                    <span className={`text-sm font-medium ${getLevelColor(skill.level)}`}>
                      {getLevelLabel(skill.level)} ({skill.level}%)
                    </span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Experience: {skill.experience}</span>
                  <span>{skill.projects} projects</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">Added {new Date(skill.createdAt).toLocaleDateString()}</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(skill.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No skills found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
