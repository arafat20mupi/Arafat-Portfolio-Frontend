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
  Search,
  Eye,
  Heart,
  MessageCircle,
  Clock,
  Star,
  X,
  Save,
  AlertCircle,
  CheckCircle,
  FileText,
} from "lucide-react"
import Image from "next/image"

interface BlogPost {
  _id?: string
  title: string
  slug?: string
  excerpt: string
  content: string
  image: string
  category: string
  tags: string[]
  authorId: number
  published: boolean
  featured: boolean
  readTime: string
  views: number
  likes: number
  comments: any[]
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
  createdAt?: string
  updatedAt?: string
}

const initialPost: BlogPost = {
  title: "",
  excerpt: "",
  content: "",
  image: "",
  category: "Web Development",
  tags: [],
  authorId: 1,
  published: false,
  featured: false,
  readTime: "",
  views: 0,
  likes: 0,
  comments: [],
  seo: {
    metaTitle: "",
    metaDescription: "",
    keywords: [],
  },
}

const categories = [
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "CSS",
  "Web Development",
  "Tutorial",
  "Tips",
]

// Configure axios
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add response interceptor
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

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [currentPost, setCurrentPost] = useState<BlogPost>(initialPost)
  const [isEditing, setIsEditing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Form state
  const [newTag, setNewTag] = useState("")
  const [newKeyword, setNewKeyword] = useState("")

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [posts, searchTerm, categoryFilter, statusFilter])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await api.get("/blog")
      setPosts(response.data.posts || [])
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch blog posts")
      console.error("Error fetching posts:", err)
    } finally {
      setLoading(false)
    }
  }

  const filterPosts = () => {
    let filtered = posts

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((post) => post.category === categoryFilter)
    }

    if (statusFilter !== "all") {
      if (statusFilter === "published") {
        filtered = filtered.filter((post) => post.published)
      } else if (statusFilter === "draft") {
        filtered = filtered.filter((post) => !post.published)
      } else if (statusFilter === "featured") {
        filtered = filtered.filter((post) => post.featured)
      }
    }

    setFilteredPosts(filtered)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      if (isEditing && currentPost._id) {
        await api.put(`/blog/${currentPost._id}`, currentPost)
        setSuccess("Post updated successfully!")
      } else {
        await api.post("/blog", currentPost)
        setSuccess("Post created successfully!")
      }

      setIsDialogOpen(false)
      resetForm()
      fetchPosts()
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save post")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      setLoading(true)
      await api.delete(`/blog/${id}`)
      setSuccess("Post deleted successfully!")
      fetchPosts()
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete post")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (post: BlogPost) => {
    setCurrentPost(post)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleCreate = () => {
    resetForm()
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setCurrentPost(initialPost)
    setNewTag("")
    setNewKeyword("")
  }

  const addTag = () => {
    if (newTag.trim() && !currentPost.tags.includes(newTag.trim())) {
      setCurrentPost({
        ...currentPost,
        tags: [...currentPost.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const removeTag = (index: number) => {
    setCurrentPost({
      ...currentPost,
      tags: currentPost.tags.filter((_, i) => i !== index),
    })
  }

  const addKeyword = () => {
    if (newKeyword.trim() && !currentPost.seo.keywords.includes(newKeyword.trim())) {
      setCurrentPost({
        ...currentPost,
        seo: {
          ...currentPost.seo,
          keywords: [...currentPost.seo.keywords, newKeyword.trim()],
        },
      })
      setNewKeyword("")
    }
  }

  const removeKeyword = (index: number) => {
    setCurrentPost({
      ...currentPost,
      seo: {
        ...currentPost.seo,
        keywords: currentPost.seo.keywords.filter((_, i) => i !== index),
      },
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
            <p className="text-gray-600 mt-2">Manage your blog posts and articles</p>
          </div>
          <Button onClick={handleCreate} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Blog Post
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
                    placeholder="Search posts..."
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
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Posts</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Posts Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={post.image || "/placeholder.svg?height=200&width=400"}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    {post.featured && (
                      <Badge className="bg-yellow-500">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    <Badge className={post.published ? "bg-green-500" : "bg-gray-500"}>
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <Badge className="absolute top-2 left-2" variant="outline">
                    {post.category}
                  </Badge>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-2 mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{post.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {post.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {post.comments.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {post.createdAt && new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(post)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => post._id && handleDelete(post._id)}
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

        {filteredPosts.length === 0 && !loading && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No blog posts found matching your criteria.</p>
          </div>
        )}

        {/* Blog Post Form Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Blog Post" : "Create New Blog Post"}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                </TabsList>

                {/* Basic Info Tab */}
                <TabsContent value="basic" className="space-y-4">
                  <div>
                    <Label htmlFor="title">Post Title *</Label>
                    <Input
                      id="title"
                      value={currentPost.title}
                      onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Excerpt *</Label>
                    <Textarea
                      id="excerpt"
                      value={currentPost.excerpt}
                      onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                      rows={3}
                      maxLength={300}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">{currentPost.excerpt.length}/300 characters</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={currentPost.category}
                        onValueChange={(value) => setCurrentPost({ ...currentPost, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
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
                    <div>
                      <Label htmlFor="readTime">Read Time</Label>
                      <Input
                        id="readTime"
                        value={currentPost.readTime}
                        onChange={(e) => setCurrentPost({ ...currentPost, readTime: e.target.value })}
                        placeholder="e.g., 5 min read"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="image">Featured Image URL *</Label>
                    <Input
                      id="image"
                      type="url"
                      value={currentPost.image}
                      onChange={(e) => setCurrentPost({ ...currentPost, image: e.target.value })}
                      required
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <Label>Tags</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        placeholder="Add tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      />
                      <Button type="button" onClick={addTag}>
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentPost.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(index)} />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Content Tab */}
                <TabsContent value="content" className="space-y-4">
                  <div>
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                      id="content"
                      value={currentPost.content}
                      onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                      rows={20}
                      className="font-mono text-sm"
                      placeholder="Write your blog post content here... You can use Markdown formatting."
                      required
                    />
                  </div>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={currentPost.published}
                        onCheckedChange={(checked) => setCurrentPost({ ...currentPost, published: checked })}
                      />
                      <Label htmlFor="published">Published</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="featured"
                        checked={currentPost.featured}
                        onCheckedChange={(checked) => setCurrentPost({ ...currentPost, featured: checked })}
                      />
                      <Label htmlFor="featured">Featured Post</Label>
                    </div>
                  </div>
                </TabsContent>

                {/* SEO Tab */}
                <TabsContent value="seo" className="space-y-4">
                  <div>
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      value={currentPost.seo.metaTitle}
                      onChange={(e) =>
                        setCurrentPost({
                          ...currentPost,
                          seo: { ...currentPost.seo, metaTitle: e.target.value },
                        })
                      }
                      maxLength={60}
                    />
                    <p className="text-xs text-gray-500 mt-1">{currentPost.seo.metaTitle.length}/60 characters</p>
                  </div>

                  <div>
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      value={currentPost.seo.metaDescription}
                      onChange={(e) =>
                        setCurrentPost({
                          ...currentPost,
                          seo: { ...currentPost.seo, metaDescription: e.target.value },
                        })
                      }
                      rows={3}
                      maxLength={160}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {currentPost.seo.metaDescription.length}/160 characters
                    </p>
                  </div>

                  {/* SEO Keywords */}
                  <div>
                    <Label>SEO Keywords</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        placeholder="Add keyword"
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                      />
                      <Button type="button" onClick={addKeyword}>
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentPost.seo.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="flex items-center gap-1">
                          {keyword}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeKeyword(index)} />
                        </Badge>
                      ))}
                    </div>
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
                      {isEditing ? "Update Post" : "Create Post"}
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
