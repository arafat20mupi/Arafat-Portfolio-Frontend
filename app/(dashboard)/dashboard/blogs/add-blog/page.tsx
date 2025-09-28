"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Plus, Save, ArrowLeft, Eye } from "lucide-react"
import Link from "next/link"

export default function AddBlogPage() {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    published: false,
    featured: false,
    image: "",
    readTime: "",
    tags: [] as string[],
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: [] as string[],
    },
  })

  const [newTag, setNewTag] = useState("")
  const [newKeyword, setNewKeyword] = useState("")
  const [previewMode, setPreviewMode] = useState(false)

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

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    })
  }

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.seo.keywords.includes(newKeyword.trim())) {
      setFormData({
        ...formData,
        seo: {
          ...formData.seo,
          keywords: [...formData.seo.keywords, newKeyword.trim()],
        },
      })
      setNewKeyword("")
    }
  }

  const removeKeyword = (index: number) => {
    setFormData({
      ...formData,
      seo: {
        ...formData.seo,
        keywords: formData.seo.keywords.filter((_, i) => i !== index),
      },
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Blog post data:", formData)
    // Here you would typically send the data to your API
    alert("Blog post saved successfully!")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/blogs/all-blogs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blogs
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Write New Blog Post</h1>
            <p className="text-gray-600 mt-2">Create and publish a new blog post</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
          <Eye className="h-4 w-4 mr-2" />
          {previewMode ? "Edit" : "Preview"}
        </Button>
      </div>

      {previewMode ? (
        // Preview Mode
        <Card>
          <CardContent className="p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <Badge className="mb-4">{formData.category}</Badge>
                <h1 className="text-4xl font-bold mb-4">{formData.title || "Blog Title"}</h1>
                <p className="text-xl text-gray-600 mb-6">{formData.excerpt || "Blog excerpt will appear here..."}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
                  <span>By Arafat Islam</span>
                  <span>•</span>
                  <span>{formData.readTime || "5 min read"}</span>
                  <span>•</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>

              {formData.image && (
                <img
                  src={formData.image || "/placeholder.svg"}
                  alt={formData.title}
                  className="w-full h-64 object-cover rounded-lg mb-8"
                />
              )}

              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap">{formData.content || "Your blog content will appear here..."}</div>
              </div>

              {formData.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-lg font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        // Edit Mode
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="content" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            {/* Content Tab */}
            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Blog Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title">Post Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter your blog post title"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Excerpt *</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Brief description of your blog post"
                      rows={3}
                      maxLength={300}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/300 characters</p>
                  </div>

                  <div>
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Write your blog post content here... You can use Markdown formatting."
                      rows={20}
                      className="font-mono text-sm"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <div>
                      <Label htmlFor="readTime">Read Time</Label>
                      <Input
                        id="readTime"
                        value={formData.readTime}
                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                        placeholder="e.g., 5 min read"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="image">Featured Image URL</Label>
                    <Input
                      id="image"
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <Label>Tags</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        placeholder="Add tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      />
                      <Button type="button" onClick={addTag}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(index)} />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Post Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={formData.published}
                        onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                      />
                      <Label htmlFor="published">Published</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                      />
                      <Label htmlFor="featured">Featured Post</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SEO Tab */}
            <TabsContent value="seo">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      value={formData.seo.metaTitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seo: { ...formData.seo, metaTitle: e.target.value },
                        })
                      }
                      placeholder="SEO title for search engines"
                      maxLength={60}
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.seo.metaTitle.length}/60 characters</p>
                  </div>

                  <div>
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      value={formData.seo.metaDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seo: { ...formData.seo, metaDescription: e.target.value },
                        })
                      }
                      placeholder="SEO description for search engines"
                      rows={3}
                      maxLength={160}
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.seo.metaDescription.length}/160 characters</p>
                  </div>

                  {/* SEO Keywords */}
                  <div>
                    <Label>SEO Keywords</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        placeholder="Add keyword"
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                      />
                      <Button type="button" onClick={addKeyword}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.seo.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="flex items-center gap-1">
                          {keyword}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeKeyword(index)} />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/dashboard/blogs/all-blogs">Cancel</Link>
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              {formData.published ? "Publish Post" : "Save Draft"}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
