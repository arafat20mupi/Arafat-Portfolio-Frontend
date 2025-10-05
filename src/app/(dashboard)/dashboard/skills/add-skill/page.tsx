"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Label } from "@/src/components/ui/label"
import { Switch } from "@/src/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Slider } from "@/src/components/ui/slider"
import { Save, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddSkillPage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    level: [50],
    experience: "",
    description: "",
    icon: "",
    featured: false,
    projects: 0,
  })

  const categories = ["Frontend", "Backend", "Database", "Mobile", "Design", "Programming", "DevOps", "Testing"]

  const experienceOptions = [
    "< 6 months",
    "6 months - 1 year",
    "1+ years",
    "2+ years",
    "3+ years",
    "4+ years",
    "5+ years",
  ]

  const getLevelLabel = (level: number) => {
    if (level < 30) return "Beginner"
    if (level < 60) return "Intermediate"
    if (level < 85) return "Advanced"
    return "Expert"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const skillData = {
      ...formData,
      level: formData.level[0],
    }
    console.log("Skill data:", skillData)
    // Here you would typically send the data to your API
    alert("Skill added successfully!")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/skills/all-skills">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Skills
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Skill</h1>
          <p className="text-gray-600 mt-2">Add a new skill to your portfolio</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Skill Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Skill Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., React, Node.js, Python"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your experience and expertise with this skill"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="icon">Icon/Emoji</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="e.g., ⚛️, 🟢, 🐍"
                />
              </div>
              <div>
                <Label htmlFor="experience">Experience Level</Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) => setFormData({ ...formData, experience: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceOptions.map((exp) => (
                      <SelectItem key={exp} value={exp}>
                        {exp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>
                Proficiency Level: {formData.level[0]}% - {getLevelLabel(formData.level[0])}
              </Label>
              <div className="mt-3">
                <Slider
                  value={formData.level}
                  onValueChange={(value) => setFormData({ ...formData, level: value })}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Beginner (0-29%)</span>
                <span>Intermediate (30-59%)</span>
                <span>Advanced (60-84%)</span>
                <span>Expert (85-100%)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="projects">Number of Projects</Label>
                <Input
                  id="projects"
                  type="number"
                  min="0"
                  value={formData.projects}
                  onChange={(e) => setFormData({ ...formData, projects: Number.parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <Label htmlFor="featured">Featured Skill</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/dashboard/skills/all-skills">Cancel</Link>
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            Save Skill
          </Button>
        </div>
      </form>
    </div>
  )
}
