"use client"

import { useForm, Controller } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Label } from "@/src/components/ui/label"
import { Switch } from "@/src/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Save } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; 

import toast from "react-hot-toast"
import { useState } from "react"

type BlogFormValues = {
  title: string
  excerpt: string
  content: string
  category: string
  readTime?: string
  image?: FileList
  tags?: string
  published: boolean
  featured: boolean
  metaTitle?: string
  metaDescription?: string
  keywords?: string
}

export default function CreateBlog() {
  const { register, handleSubmit, control, watch, setValue, reset, formState: { errors } } = useForm<BlogFormValues>({
    defaultValues: { published: false, featured: false },
  })
  const [submitting, setSubmitting] = useState(false)

  const categories = ["React", "Next.js", "JavaScript", "TypeScript", "Node.js", "CSS", "Web Development", "Tutorial", "Tips"]

  const onSubmit = async (data: BlogFormValues) => {
    try {
      setSubmitting(true)
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("excerpt", data.excerpt)
      formData.append("content", data.content)
      formData.append("category", data.category)
      if (data.readTime) formData.append("readTime", data.readTime)
      if (data.image && data.image[0]) formData.append("image", data.image[0])
      formData.append("published", data.published ? "true" : "false")
      formData.append("featured", data.featured ? "true" : "false")
      if (data.tags) formData.append("tags", data.tags)
      if (data.metaTitle) formData.append("metaTitle", data.metaTitle)
      if (data.metaDescription) formData.append("metaDescription", data.metaDescription)
      if (data.keywords) formData.append("keywords", data.keywords)
      formData.append("authorId", "1")

      const res = await fetch("/api/blogs", { method: "POST", body: formData })
      if (res.ok) {
        toast.success("Blog submitted successfully!")
        reset()
      } else {
        const errData = await res.json()
        toast.error(errData.message || "Failed to submit blog")
      }
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Blog Content */}
        <Card>
          <CardHeader>
            <CardTitle>Blog Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title">Post Title *</Label>
              <Input
                id="title"
                {...register("title", { required: "Title is required" })}
                placeholder="Enter blog post title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt *</Label>
              <Textarea
                id="excerpt"
                {...register("excerpt", { required: "Excerpt is required", maxLength: { value: 300, message: "Max 300 characters" } })}
                placeholder="Brief description"
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">{watch("excerpt")?.length || 0}/300 characters</p>
              {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>}
            </div>

            <div>
              <Label htmlFor="content">Content *</Label>
              <Controller
                name="content"
                control={control}
                rules={{ required: "Content is required" }}
                render={({ field }) => (
                  <ReactQuill
                    theme="snow"
                    className="bg-white h-72 py-6"
                    value={field.value || ""}
                    onChange={field.onChange}
                    modules={{
                      toolbar: [
                        ["bold", "italic", "underline"],
                        ["link", "image"],
                        [{ list: "ordered" }, { list: "bullet" }],
                      ]
                    }}
                  />
                )}
              />
              {errors.content && <p className="text-red-500 text-sm mt-5">{errors.content.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select onValueChange={(value) => setValue("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
              </div>

              <div>
                <Label htmlFor="readTime">Read Time</Label>
                <Input id="readTime" {...register("readTime")} placeholder="e.g., 5 min read" />
              </div>
            </div>

            <div>
              <Label htmlFor="image">Featured Image *</Label>
              <Input id="image" type="file" accept="image/*" {...register("image", { required: "Image is required" })} />
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input id="tags" {...register("tags")} placeholder="e.g. react, nextjs, tutorial" />
            </div>
          </CardContent>
        </Card>

        {/* Post Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Post Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Switch
                id="published"
                checked={watch("published")}
                onCheckedChange={(checked) => setValue("published", checked)}
              />
              <Label htmlFor="published">Published</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="featured"
                checked={watch("featured")}
                onCheckedChange={(checked) => setValue("featured", checked)}
              />
              <Label htmlFor="featured">Featured Post</Label>
            </div>
          </CardContent>
        </Card>

        {/* SEO Settings */}
        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input id="metaTitle" {...register("metaTitle")} maxLength={60} />
              <p className="text-xs text-gray-500 mt-1">{watch("metaTitle")?.length || 0}/60 characters</p>
            </div>

            <div>
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea id="metaDescription" {...register("metaDescription")} rows={3} maxLength={160} />
              <p className="text-xs text-gray-500 mt-1">{watch("metaDescription")?.length || 0}/160 characters</p>
            </div>

            <div>
              <Label htmlFor="keywords">SEO Keywords (comma separated)</Label>
              <Input id="keywords" {...register("keywords")} placeholder="e.g. web, frontend, react" />
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/dashboard/blogs/all-blogs">Cancel</Link>
          </Button>
          <Button type="submit" disabled={submitting}>
            <Save className="h-4 w-4 mr-2" />
            {submitting ? "Submitting..." : watch("published") ? "Publish Post" : "Save Draft"}
          </Button>
        </div>
      </form>
    </div>
  )
}
