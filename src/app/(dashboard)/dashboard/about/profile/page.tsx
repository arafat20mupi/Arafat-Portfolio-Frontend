"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Label } from "@/src/components/ui/label"
import { Badge } from "@/src/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Save, Upload, X, Plus, MapPin, Mail, Github, Linkedin, Youtube } from "lucide-react"

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    personal: {
      firstName: "Arafat",
      lastName: "Islam",
      email: "arafat@example.com",
      phone: "+880 123 456 789",
      location: "Dhaka, Bangladesh",
      website: "https://arafatislam.dev",
      avatar: "/placeholder.svg?height=150&width=150",
      title: "Full Stack Developer",
      bio: "Passionate full-stack developer with 3+ years of experience in building modern web applications using React, Node.js, and cloud technologies.",
    },
    professional: {
      experience: "3+ years",
      currentRole: "Senior Full Stack Developer",
      company: "Tech Solutions Inc.",
      availability: "Available for freelance",
      hourlyRate: "$50",
      languages: ["Bengali", "English", "Hindi"],
      interests: ["Web Development", "AI/ML", "Open Source", "Teaching"],
    },
    social: {
      github: "https://github.com/arafat20mupi",
      linkedin: "https://www.linkedin.com/in/arafatislam03",
      youtube: "https://www.youtube.com/@learnwitharafatislam",
      twitter: "",
      instagram: "",
    },
  })

  const [newLanguage, setNewLanguage] = useState("")
  const [newInterest, setNewInterest] = useState("")

  const addLanguage = () => {
    if (newLanguage.trim() && !profileData.professional.languages.includes(newLanguage.trim())) {
      setProfileData({
        ...profileData,
        professional: {
          ...profileData.professional,
          languages: [...profileData.professional.languages, newLanguage.trim()],
        },
      })
      setNewLanguage("")
    }
  }

  const removeLanguage = (index: number) => {
    setProfileData({
      ...profileData,
      professional: {
        ...profileData.professional,
        languages: profileData.professional.languages.filter((_, i) => i !== index),
      },
    })
  }

  const addInterest = () => {
    if (newInterest.trim() && !profileData.professional.interests.includes(newInterest.trim())) {
      setProfileData({
        ...profileData,
        professional: {
          ...profileData.professional,
          interests: [...profileData.professional.interests, newInterest.trim()],
        },
      })
      setNewInterest("")
    }
  }

  const removeInterest = (index: number) => {
    setProfileData({
      ...profileData,
      professional: {
        ...profileData.professional,
        interests: profileData.professional.interests.filter((_, i) => i !== index),
      },
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Profile data:", profileData)
    alert("Profile updated successfully!")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 mt-2">Manage your personal and professional information</p>
      </div>

      {/* Profile Preview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profileData.personal.avatar || "/placeholder.svg"} alt="Profile" />
              <AvatarFallback className="text-2xl">
                {profileData.personal.firstName[0]}
                {profileData.personal.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">
                {profileData.personal.firstName} {profileData.personal.lastName}
              </h2>
              <p className="text-lg text-gray-600 mb-2">{profileData.personal.title}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {profileData.personal.location}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {profileData.personal.email}
                </span>
                <Badge variant="secondary">{profileData.professional.availability}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="social">Social Links</TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profileData.personal.avatar || "/placeholder.svg"} alt="Profile" />
                    <AvatarFallback>
                      {profileData.personal.firstName[0]}
                      {profileData.personal.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={profileData.personal.firstName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          personal: { ...profileData.personal, firstName: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={profileData.personal.lastName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          personal: { ...profileData.personal, lastName: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    value={profileData.personal.title}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        personal: { ...profileData.personal, title: e.target.value },
                      })
                    }
                    placeholder="e.g., Full Stack Developer"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.personal.bio}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        personal: { ...profileData.personal, bio: e.target.value },
                      })
                    }
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.personal.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          personal: { ...profileData.personal, email: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.personal.phone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          personal: { ...profileData.personal, phone: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.personal.location}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          personal: { ...profileData.personal, location: e.target.value },
                        })
                      }
                      placeholder="City, Country"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={profileData.personal.website}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          personal: { ...profileData.personal, website: e.target.value },
                        })
                      }
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Professional Tab */}
          <TabsContent value="professional">
            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      value={profileData.professional.experience}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          professional: { ...profileData.professional, experience: e.target.value },
                        })
                      }
                      placeholder="e.g., 3+ years"
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentRole">Current Role</Label>
                    <Input
                      id="currentRole"
                      value={profileData.professional.currentRole}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          professional: { ...profileData.professional, currentRole: e.target.value },
                        })
                      }
                      placeholder="e.g., Senior Developer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={profileData.professional.company}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          professional: { ...profileData.professional, company: e.target.value },
                        })
                      }
                      placeholder="Current company"
                    />
                  </div>
                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Input
                      id="availability"
                      value={profileData.professional.availability}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          professional: { ...profileData.professional, availability: e.target.value },
                        })
                      }
                      placeholder="e.g., Available for freelance"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate</Label>
                  <Input
                    id="hourlyRate"
                    value={profileData.professional.hourlyRate}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        professional: { ...profileData.professional, hourlyRate: e.target.value },
                      })
                    }
                    placeholder="e.g., $50"
                  />
                </div>

                {/* Languages */}
                <div>
                  <Label>Languages</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="Add language"
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLanguage())}
                    />
                    <Button type="button" onClick={addLanguage}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {profileData.professional.languages.map((language, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {language}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeLanguage(index)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <Label>Interests</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="Add interest"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addInterest())}
                    />
                    <Button type="button" onClick={addInterest}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {profileData.professional.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {interest}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeInterest(index)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Links Tab */}
          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <Label htmlFor="github" className="flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      GitHub
                    </Label>
                    <Input
                      id="github"
                      type="url"
                      value={profileData.social.github}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          social: { ...profileData.social, github: e.target.value },
                        })
                      }
                      placeholder="https://github.com/username"
                    />
                  </div>

                  <div>
                    <Label htmlFor="linkedin" className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Label>
                    <Input
                      id="linkedin"
                      type="url"
                      value={profileData.social.linkedin}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          social: { ...profileData.social, linkedin: e.target.value },
                        })
                      }
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  <div>
                    <Label htmlFor="youtube" className="flex items-center gap-2">
                      <Youtube className="h-4 w-4" />
                      YouTube
                    </Label>
                    <Input
                      id="youtube"
                      type="url"
                      value={profileData.social.youtube}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          social: { ...profileData.social, youtube: e.target.value },
                        })
                      }
                      placeholder="https://youtube.com/@username"
                    />
                  </div>

                  <div>
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      type="url"
                      value={profileData.social.twitter}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          social: { ...profileData.social, twitter: e.target.value },
                        })
                      }
                      placeholder="https://twitter.com/username"
                    />
                  </div>

                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      type="url"
                      value={profileData.social.instagram}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          social: { ...profileData.social, instagram: e.target.value },
                        })
                      }
                      placeholder="https://instagram.com/username"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
