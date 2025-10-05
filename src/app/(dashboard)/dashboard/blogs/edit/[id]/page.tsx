"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import toast from "react-hot-toast"
import { BlogPost } from "@/src/types"
import { Textarea } from "@/src/components/ui/textarea"

export default function EditPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id

  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch the blog post data
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/blogs/${id}`, { cache: "no-store" })
      if (!res.ok) return toast.error("Failed to load blog")
      const data: BlogPost = await res.json()
      setPost(data)
      setLoading(false)
    }
    fetchPost()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (!post) return <p>Blog not found</p>

  const handleChange = (field: keyof BlogPost, value: any) => {
    setPost({ ...post, [field]: value })
  }

  const handleSubmit = async () => {
    const res = await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    if (!res.ok) return toast.error("Failed to update blog")
    toast.success("Blog updated successfully")
    router.push("/dashboard/blogs/all-blogs") 
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4 py-6">
      <h1 className="text-2xl font-bold">Edit Blog</h1>
      <Input
        placeholder="Title"
        value={post.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />
      <Textarea
        placeholder="Excerpt"
        value={post.excerpt}
        onChange={(e) => handleChange("excerpt", e.target.value)}
      />
      <Textarea
        placeholder="Content"
        value={post.content}
        onChange={(e) => handleChange("content", e.target.value)}
      />
      <Input
        placeholder="Category"
        value={post.category}
        onChange={(e) => handleChange("category", e.target.value)}
      />
      <Input
        placeholder="Read Time"
        value={post.readTime}
        onChange={(e) => handleChange("readTime", e.target.value)}
      />

      {/* image */}
      <Input
        placeholder="Image URL"
        value={post.image || ""}
        onChange={(e) => handleChange("image", e.target.value)}
      />

      {/* Featured / Published */}
      <div className="flex gap-4 items-center">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={post.featured}
            onChange={(e) => handleChange("featured", e.target.checked)}
          />
          Featured
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={post.published}
            onChange={(e) => handleChange("published", e.target.checked)}
          />
          Published
        </label>
      </div>

      <Button onClick={handleSubmit}>Save Changes</Button>
    </div>
  )
}
