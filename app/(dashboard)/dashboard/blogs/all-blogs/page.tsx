"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Eye, Heart, MessageCircle, Clock, Star, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  tags: string[]
  published: boolean
  featured: boolean
  readTime: string
  views: number
  likes: number
  comments: number
  createdAt: string
}

export default function AllBlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data
  useEffect(() => {
    const mockPosts: BlogPost[] = [
      {
        id: "1",
        title: "Getting Started with Next.js 14",
        excerpt:
          "Learn the fundamentals of Next.js 14 and its new features including App Router and Server Components.",
        content: "Full blog content here...",
        image: "/placeholder.svg?height=200&width=400",
        category: "Next.js",
        tags: ["Next.js", "React", "JavaScript", "Web Development"],
        published: true,
        featured: true,
        readTime: "8 min read",
        views: 2450,
        likes: 189,
        comments: 23,
        createdAt: "2024-01-20",
      },
      {
        id: "2",
        title: "React Best Practices in 2024",
        excerpt: "Discover the latest React best practices and patterns that will make your code more maintainable.",
        content: "Full blog content here...",
        image: "/placeholder.svg?height=200&width=400",
        category: "React",
        tags: ["React", "JavaScript", "Best Practices"],
        published: true,
        featured: false,
        readTime: "12 min read",
        views: 1890,
        likes: 156,
        comments: 34,
        createdAt: "2024-02-05",
      },
      {
        id: "3",
        title: "Building Scalable APIs with Node.js",
        excerpt: "A comprehensive guide to building scalable and maintainable APIs using Node.js and Express.",
        content: "Full blog content here...",
        image: "/placeholder.svg?height=200&width=400",
        category: "Node.js",
        tags: ["Node.js", "API", "Backend", "Express"],
        published: false,
        featured: false,
        readTime: "15 min read",
        views: 0,
        likes: 0,
        comments: 0,
        createdAt: "2024-02-15",
      },
    ]
    setPosts(mockPosts)
    setFilteredPosts(mockPosts)
  }, [])

  useEffect(() => {
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
  }, [posts, searchTerm, categoryFilter, statusFilter])

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setPosts(posts.filter((p) => p.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Blog Posts</h1>
          <p className="text-gray-600 mt-2">Manage and view all your blog posts</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/blogs/add-blog">
            <Plus className="h-4 w-4 mr-2" />
            Write New Post
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
                <SelectItem value="React">React</SelectItem>
                <SelectItem value="Next.js">Next.js</SelectItem>
                <SelectItem value="Node.js">Node.js</SelectItem>
                <SelectItem value="JavaScript">JavaScript</SelectItem>
                <SelectItem value="TypeScript">TypeScript</SelectItem>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <Image
                src={post.image || "/placeholder.svg"}
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
                    {post.comments}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  <Calendar className="h-3 w-3 inline mr-1" />
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(post.id)}
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

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No blog posts found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
