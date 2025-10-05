"use client"

import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { ArrowLeft } from "lucide-react"
import CreateBlog from "@/src/components/modules/blogs/CreateBlog"

export default function AddBlogPage() {

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
      </div>
      {/* Blog Form */}
      <CreateBlog />
    </div>
  )
}
