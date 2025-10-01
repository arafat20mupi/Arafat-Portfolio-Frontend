"use client"

import type React from "react"

import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Plus,
    Edit,
    Trash2,
    Github,
    ExternalLink,
    Search,
    Eye,
    Heart,
    Calendar,
    Star,
    X,
    Save,
    AlertCircle,
    CheckCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Challenge {
    title: string
    description: string
}

interface Testimonial {
    text?: string
    author?: string
    role?: string
    avatar?: string
}

interface Project {
    _id?: string
    title: string
    slug?: string
    description: string
    longDescription: string
    image: string
    images: string[]
    tech: string[]
    category: "Full-Stack" | "Frontend" | "Backend" | "Mobile" | "Desktop"
    github: string
    live: string
    featured: boolean
    status: "completed" | "in-progress" | "planned"
    startDate: string
    endDate?: string
    duration: string
    team: string
    features: string[]
    challenges: Challenge[]
    testimonial?: Testimonial
    views: number
    likes: number
    createdAt?: string
    updatedAt?: string
}

const initialProject: Project = {
    title: "",
    description: "",
    longDescription: "",
    image: "",
    images: [],
    tech: [],
    category: "Full-Stack",
    github: "",
    live: "",
    featured: false,
    status: "completed",
    startDate: "",
    endDate: "",
    duration: "",
    team: "Solo Project",
    features: [],
    challenges: [],
    testimonial: {
        text: "",
        author: "",
        role: "",
        avatar: "",
    } as Testimonial,
    views: 0,
    likes: 0,
}

// Configure axios defaults
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://arafat-portfolio-backend.vercel.app/api"

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
})

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token")
            window.location.href = "/admin/login"
        }
        return Promise.reject(error)
    },
)

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
    const [currentProject, setCurrentProject] = useState<Project>(initialProject)
    const [isEditing, setIsEditing] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [featuredFilter, setFeaturedFilter] = useState("all")

    // Form state for arrays
    const [newTechnology, setNewTechnology] = useState("")
    const [newFeature, setNewFeature] = useState("")
    const [newImage, setNewImage] = useState("")
    const [newChallenge, setNewChallenge] = useState<Challenge>({ title: "", description: "" })

    useEffect(() => {
        fetchProjects()
    }, [])

    useEffect(() => {
        filterProjects()
    }, [projects, searchTerm, categoryFilter, featuredFilter])

    const fetchProjects = async () => {
        try {
            setLoading(true)
            const response = await api.get(`${API_BASE_URL}/projects`)
            console.log(response.data);
            setProjects(response.data || [])
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch projects")
            console.error("Error fetching projects:", err)
        } finally {
            setLoading(false)
        }
    }

    const filterProjects = () => {
        let filtered = projects

        if (searchTerm) {
            filtered = filtered.filter(
                (project) =>
                    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    project.tech.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())),
            )
        }

        if (categoryFilter !== "all") {
            filtered = filtered.filter((project) => project.category === categoryFilter)
        }

        if (featuredFilter !== "all") {
            filtered = filtered.filter((project) => project.featured === (featuredFilter === "featured"))
        }

        setFilteredProjects(filtered)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccess("")

        try {
            if (isEditing && currentProject._id) {
                await api.put(`${API_BASE_URL}/projects/${currentProject._id}`, currentProject)
                setSuccess("Project updated successfully!")
            } else {
                await api.post(`${API_BASE_URL}/projects`, currentProject)
                setSuccess("Project created successfully!")
            }

            setIsDialogOpen(false)
            resetForm()
            fetchProjects()
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to save project")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return

        try {
            setLoading(true)
            await api.delete(`${API_BASE_URL}/projects/${id}`)
            setSuccess("Project deleted successfully!")
            fetchProjects()
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to delete project")
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (project: Project) => {
        setCurrentProject(project)
        setIsEditing(true)
        setIsDialogOpen(true)
    }

    const handleCreate = () => {
        resetForm()
        setIsEditing(false)
        setIsDialogOpen(true)
    }

    const resetForm = () => {
        setCurrentProject(initialProject)
        setNewTechnology("")
        setNewFeature("")
        setNewImage("")
        setNewChallenge({ title: "", description: "" })
    }

    const addTechnology = () => {
        if (newTechnology.trim()) {
            setCurrentProject({
                ...currentProject,
                tech: [...currentProject.tech, newTechnology.trim()],
            })
            setNewTechnology("")
        }
    }

    const removeTechnology = (index: number) => {
        setCurrentProject({
            ...currentProject,
            tech: currentProject.tech.filter((_, i) => i !== index),
        })
    }

    const addFeature = () => {
        if (newFeature.trim()) {
            setCurrentProject({
                ...currentProject,
                features: [...currentProject.features, newFeature.trim()],
            })
            setNewFeature("")
        }
    }

    const removeFeature = (index: number) => {
        setCurrentProject({
            ...currentProject,
            features: currentProject.features.filter((_, i) => i !== index),
        })
    }

    const addImage = () => {
        if (newImage.trim()) {
            setCurrentProject({
                ...currentProject,
                images: [...currentProject.images, newImage.trim()],
            })
            setNewImage("")
        }
    }

    const removeImage = (index: number) => {
        setCurrentProject({
            ...currentProject,
            images: currentProject.images.filter((_, i) => i !== index),
        })
    }

    const addChallenge = () => {
        if (newChallenge.title.trim() && newChallenge.description.trim()) {
            setCurrentProject({
                ...currentProject,
                challenges: [...currentProject.challenges, newChallenge],
            })
            setNewChallenge({ title: "", description: "" })
        }
    }

    const removeChallenge = (index: number) => {
        setCurrentProject({
            ...currentProject,
            challenges: currentProject.challenges.filter((_, i) => i !== index),
        })
    }

    return (
        <div className="min-h-screen bg-gray-50 p-16">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Projects Management</h1>
                        <p className="text-gray-600 mt-2">Manage your portfolio projects</p>
                    </div>
                    <Button onClick={handleCreate} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add New Project
                    </Button>
                </div>

                {/* Alerts */}
                {error && (
                    <Alert className="mb-6 border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-800">{error}</AlertDescription>
                    </Alert>
                )}

                {success && (
                    <Alert className="mb-6 border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">{success}</AlertDescription>
                    </Alert>
                )}

                {/* Filters */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        placeholder="Search projects..."
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
                                    <SelectItem value="Full-Stack">Full-Stack</SelectItem>
                                    <SelectItem value="Frontend">Frontend</SelectItem>
                                    <SelectItem value="Backend">Backend</SelectItem>
                                    <SelectItem value="Mobile">Mobile</SelectItem>
                                    <SelectItem value="Desktop">Desktop</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={featuredFilter} onValueChange={setFeaturedFilter}>
                                <SelectTrigger className="w-full md:w-48">
                                    <SelectValue placeholder="Featured" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Projects</SelectItem>
                                    <SelectItem value="featured">Featured Only</SelectItem>
                                    <SelectItem value="not-featured">Not Featured</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Projects Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <Card key={project._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="relative">
                                    <Image
                                        src={project.image || "/placeholder.svg?height=200&width=400"}
                                        alt={project.title}
                                        width={400}
                                        height={200}
                                        className="w-full h-48 object-cover"
                                    />
                                    {project.featured && (
                                        <Badge className="absolute top-2 right-2 bg-yellow-500">
                                            <Star className="h-3 w-3 mr-1" />
                                            Featured
                                        </Badge>
                                    )}
                                    <Badge
                                        className={`absolute top-2 left-2 ${project.status === "completed"
                                                ? "bg-green-500"
                                                : project.status === "in-progress"
                                                    ? "bg-blue-500"
                                                    : "bg-gray-500"
                                            }`}
                                    >
                                        {project.status}
                                    </Badge>
                                </div>

                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-lg line-clamp-1">{project.title}</h3>
                                        <Badge variant="outline">{project.category}</Badge>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>

                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {project?.tech?.slice(0, 3).map((tech, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs">
                                                {tech}
                                            </Badge>
                                        ))}
                                        {project?.tech?.length > 3 && (
                                            <Badge variant="secondary" className="text-xs">
                                                +{project.tech.length - 3}
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1">
                                                <Eye className="h-3 w-3" />
                                                {project.views}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Heart className="h-3 w-3" />
                                                {project.likes}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {project.duration}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2">
                                            {
                                                project?.live && (
                                                    <Link href={project?.live} target="_blank" rel="noopener noreferrer">
                                                        <Button variant="outline" size="sm">
                                                            <ExternalLink className="h-3 w-3" />
                                                        </Button>
                                                    </Link>
                                                )}
                                            {
                                                project?.github && (
                                                    <Link href={project?.github} target="_blank" rel="noopener noreferrer">
                                                        <Button variant="outline" size="sm">
                                                            <Github className="h-3 w-3" />
                                                        </Button>
                                                    </Link>
                                                )
                                            }
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                                                <Edit className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => project._id && handleDelete(project._id)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {filteredProjects.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No projects found matching your criteria.</p>
                    </div>
                )}

                {/* Project Form Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{isEditing ? "Edit Project" : "Create New Project"}</DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Tabs defaultValue="basic" className="w-full">
                                <TabsList className="grid w-full grid-cols-5">
                                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                                    <TabsTrigger value="content">Content</TabsTrigger>
                                    <TabsTrigger value="media">Media</TabsTrigger>
                                    <TabsTrigger value="details">Details</TabsTrigger>
                                    <TabsTrigger value="testimonial">Testimonial</TabsTrigger>
                                </TabsList>

                                {/* Basic Info Tab */}
                                <TabsContent value="basic" className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="title">Project Title *</Label>
                                            <Input
                                                id="title"
                                                value={currentProject.title}
                                                onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="category">Category *</Label>
                                            <Select
                                                value={currentProject.category}
                                                onValueChange={(value: any) => setCurrentProject({ ...currentProject, category: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Full-Stack">Full-Stack</SelectItem>
                                                    <SelectItem value="Frontend">Frontend</SelectItem>
                                                    <SelectItem value="Backend">Backend</SelectItem>
                                                    <SelectItem value="Mobile">Mobile</SelectItem>
                                                    <SelectItem value="Desktop">Desktop</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Short Description *</Label>
                                        <Textarea
                                            id="description"
                                            value={currentProject.description}
                                            onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                                            rows={3}
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="github">GitHub URL *</Label>
                                            <Input
                                                id="github"
                                                type="url"
                                                value={currentProject.github}
                                                onChange={(e) => setCurrentProject({ ...currentProject, github: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="live">Live URL *</Label>
                                            <Input
                                                id="live"
                                                type="url"
                                                value={currentProject.live}
                                                onChange={(e) => setCurrentProject({ ...currentProject, live: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="featured"
                                            checked={currentProject.featured}
                                            onCheckedChange={(checked) => setCurrentProject({ ...currentProject, featured: checked })}
                                        />
                                        <Label htmlFor="featured">Featured Project</Label>
                                    </div>
                                </TabsContent>

                                {/* Content Tab */}
                                <TabsContent value="content" className="space-y-4">
                                    <div>
                                        <Label htmlFor="longDescription">Long Description *</Label>
                                        <Textarea
                                            id="longDescription"
                                            value={currentProject.longDescription}
                                            onChange={(e) => setCurrentProject({ ...currentProject, longDescription: e.target.value })}
                                            rows={8}
                                            required
                                        />
                                    </div>

                                    {/* tech */}
                                    <div>
                                        <Label>tech</Label>
                                        <div className="flex gap-2 mb-2">
                                            <Input
                                                placeholder="Add technology"
                                                value={newTechnology}
                                                onChange={(e) => setNewTechnology(e.target.value)}
                                                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                                            />
                                            <Button type="button" onClick={addTechnology}>
                                                Add
                                            </Button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {currentProject?.tech?.map((tech, index) => (
                                                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                                    {tech}
                                                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTechnology(index)} />
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div>
                                        <Label>Features</Label>
                                        <div className="flex gap-2 mb-2">
                                            <Input
                                                placeholder="Add feature"
                                                value={newFeature}
                                                onChange={(e) => setNewFeature(e.target.value)}
                                                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                                            />
                                            <Button type="button" onClick={addFeature}>
                                                Add
                                            </Button>
                                        </div>
                                        <div className="space-y-2">
                                            {currentProject.features.map((feature, index) => (
                                                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                                    <span className="text-sm">{feature}</span>
                                                    <X className="h-4 w-4 cursor-pointer text-red-500" onClick={() => removeFeature(index)} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>

                                {/* Media Tab */}
                                <TabsContent value="media" className="space-y-4">
                                    <div>
                                        <Label htmlFor="image">Main Image URL *</Label>
                                        <Input
                                            id="image"
                                            type="url"
                                            value={currentProject.image}
                                            onChange={(e) => setCurrentProject({ ...currentProject, image: e.target.value })}
                                            required
                                        />
                                    </div>

                                    {/* Additional Images */}
                                    <div>
                                        <Label>Additional Images</Label>
                                        <div className="flex gap-2 mb-2">
                                            <Input
                                                placeholder="Add image URL"
                                                value={newImage}
                                                onChange={(e) => setNewImage(e.target.value)}
                                                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
                                            />
                                            <Button type="button" onClick={addImage}>
                                                Add
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {currentProject.images.map((image, index) => (
                                                <div key={index} className="relative">
                                                    <Image
                                                        src={image || "/placeholder.svg"}
                                                        alt={`Project image ${index + 1}`}
                                                        width={200}
                                                        height={150}
                                                        className="w-full h-24 object-cover rounded"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        className="absolute top-1 right-1 h-6 w-6 p-0"
                                                        onClick={() => removeImage(index)}
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>

                                {/* Details Tab */}
                                <TabsContent value="details" className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="status">Status</Label>
                                            <Select
                                                value={currentProject.status}
                                                onValueChange={(value: any) => setCurrentProject({ ...currentProject, status: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                                    <SelectItem value="planned">Planned</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="duration">Duration *</Label>
                                            <Input
                                                id="duration"
                                                value={currentProject.duration}
                                                onChange={(e) => setCurrentProject({ ...currentProject, duration: e.target.value })}
                                                placeholder="e.g., 3 months"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="startDate">Start Date *</Label>
                                            <Input
                                                id="startDate"
                                                type="date"
                                                value={currentProject.startDate}
                                                onChange={(e) => setCurrentProject({ ...currentProject, startDate: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="endDate">End Date</Label>
                                            <Input
                                                id="endDate"
                                                type="date"
                                                value={currentProject.endDate || ""}
                                                onChange={(e) => setCurrentProject({ ...currentProject, endDate: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="team">Team *</Label>
                                        <Input
                                            id="team"
                                            value={currentProject.team}
                                            onChange={(e) => setCurrentProject({ ...currentProject, team: e.target.value })}
                                            placeholder="e.g., Solo Project, 3 Developers"
                                            required
                                        />
                                    </div>

                                    {/* Challenges */}
                                    <div>
                                        <Label>Technical Challenges</Label>
                                        <div className="space-y-2 mb-2">
                                            <Input
                                                placeholder="Challenge title"
                                                value={newChallenge.title}
                                                onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
                                            />
                                            <Textarea
                                                placeholder="Challenge description"
                                                value={newChallenge.description}
                                                onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
                                                rows={2}
                                            />
                                            <Button type="button" onClick={addChallenge}>
                                                Add Challenge
                                            </Button>
                                        </div>
                                        <div className="space-y-2">
                                            {currentProject.challenges.map((challenge, index) => (
                                                <div key={index} className="bg-gray-50 p-3 rounded">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h4 className="font-medium text-sm">{challenge.title}</h4>
                                                        <X className="h-4 w-4 cursor-pointer text-red-500" onClick={() => removeChallenge(index)} />
                                                    </div>
                                                    <p className="text-sm text-gray-600">{challenge.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>

                                {/* Testimonial Tab */}
                                <TabsContent value="testimonial" className="space-y-4">
                                    <div>
                                        <Label htmlFor="testimonialText">Testimonial Text</Label>
                                        <Textarea
                                            id="testimonialText"
                                            value={currentProject.testimonial?.text || ""}
                                            onChange={(e) =>
                                                setCurrentProject({
                                                    ...currentProject,
                                                    testimonial: { ...currentProject.testimonial, text: e.target.value },
                                                })
                                            }
                                            rows={4}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="testimonialAuthor">Author Name</Label>
                                            <Input
                                                id="testimonialAuthor"
                                                value={currentProject.testimonial?.author || ""}
                                                onChange={(e) =>
                                                    setCurrentProject({
                                                        ...currentProject,
                                                        testimonial: { ...currentProject.testimonial, author: e.target.value },
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="testimonialRole">Author Role</Label>
                                            <Input
                                                id="testimonialRole"
                                                value={currentProject.testimonial?.role || ""}
                                                onChange={(e) =>
                                                    setCurrentProject({
                                                        ...currentProject,
                                                        testimonial: { ...currentProject.testimonial, role: e.target.value },
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="testimonialAvatar">Author Avatar URL</Label>
                                        <Input
                                            id="testimonialAvatar"
                                            type="url"
                                            value={currentProject.testimonial?.avatar || ""}
                                            onChange={(e) =>
                                                setCurrentProject({
                                                    ...currentProject,
                                                    testimonial: { ...currentProject.testimonial, avatar: e.target.value },
                                                })
                                            }
                                        />
                                    </div>
                                </TabsContent>
                            </Tabs>

                            <div className="flex justify-end gap-2 pt-4 border-t">
                                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            {isEditing ? "Updating..." : "Creating..."}
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4 mr-2" />
                                            {isEditing ? "Update Project" : "Create Project"}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
