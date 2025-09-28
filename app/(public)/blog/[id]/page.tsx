"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, ArrowLeft, Share2, BookmarkPlus, ThumbsUp, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { notFound } from "next/navigation"

// Mock blog data
const blogData = {
  "1": {
    id: 1,
    title: "How to Become a Skilled Frontend Developer",
    excerpt:
      "Discover the essential skills, tools, and best practices you need to become a professional Frontend Developer. From mastering HTML, CSS, and JavaScript to working with frameworks, APIs, and modern development tools.",
    content: `
# How to Become a Skilled Frontend Developer

If you want to build yourself as a Frontend Developer, there are some essential skills and tools you should master. These skills will help you create modern, responsive, and scalable web applications.

## Core Skills Every Frontend Developer Needs

### 1. HTML, CSS, and JavaScript
These are the building blocks of frontend development.
- HTML: Provides the structure of web pages.
- CSS: Styles the content to make it visually appealing.
- JavaScript: Adds interactivity and dynamic features to web pages.

### 2. Responsive Design
Ensure that your websites look good on all devices. Learn:
- Media Queries
- Flexbox and Grid System

### 3. JavaScript Frameworks & Libraries
Familiarity with at least one framework/library is essential:
- React
- Angular
- Vue.js

### 4. CSS Frameworks
These make styling faster and more efficient:
- Bootstrap
- Foundation
- Tailwind CSS

### 5. Cross-Browser Compatibility
Make sure your website works properly across different browsers.

### 6. Performance Optimization
Techniques to improve page loading speed and rendering performance.

### 7. Testing & Debugging
Ability to find and fix bugs efficiently during development.

### 8. Web APIs
Experience working with:
- RESTful APIs
- GraphQL

### 9. Development Tools
Tools that simplify development:
- Chrome DevTools
- Linting tools
- Bundlers (Webpack, Parcel)

### 10. Soft Skills
- Strong communication skills  
- Problem-solving mindset  
- Ability to work in a team  

## Project Management & Development Tools

In addition to coding skills, knowledge of project management and supporting tools is crucial.

### 1. Version Control Systems
- Git: Track changes and collaborate with teams.  
- GitHub: Code hosting, version control, collaboration, issue tracking, CI/CD, and contributing to open source.

### 2. Development Environments
- Visual Studio Code: Popular editor with extensive extensions.

### 3. Package Managers
- npm: Default package manager for Node.js.  
- Yarn: Faster, reliable package manager.

### 4. Build Tools
- Webpack: Module bundler.  
- Gulp: Automates tasks.  
- Parcel: Simple and fast bundler.

### 5. CSS Preprocessors
- SASS: Extended CSS with more features.  
- LESS: Makes CSS dynamic.

### 6. Development Utilities
- Chrome DevTools: Debugging directly in the browser.  
- Postman: API testing and development.

### 7. Design Tools
- Figma: UI/UX design and collaboration.  
- Adobe XD: Prototyping and UI design.

## Conclusion

By mastering these skills and tools, you can shape yourself into a professional Frontend Developer. Continuous learning, building real projects, and practicing with modern technologies will set you apart in the industry.
    `,
    image: "https://res.cloudinary.com/dkxmy7tds/image/upload/v1756710499/How-to-Become-a-Front-End-Developer-in-2020_bl0ulo.png",
    category: "Frontend Development",
    readTime: "10 min read",
    date: "2025-09-01",
    author: {
      name: "Arafat Islam",
      avatar: "https://res.cloudinary.com/dkxmy7tds/image/upload/v1755178100/8105wajc7t5-1755178098023-48050703714273076449129636737254704628286131n-jpg.jpg.jpg",
      bio: "Full Stack Web Developer | Expert in MERN Stack | Crafting Scalable & User-Centric Digital Solutions",
    },
    tags: ["Frontend", "JavaScript", "React", "CSS", "Web Development"],
    likes: 0,
    comments: 0,
    shares: 0,
  },
}


export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogData[params.id as keyof typeof blogData]

  if (!post) {
    notFound()
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-purple-50 to-blue-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <motion.div className="max-w-4xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants}>
              <Button asChild variant="ghost" className="mb-6">
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <Badge variant="secondary" className="mb-4">
                {post.category}
              </Badge>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">{post.title}</h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">{post.excerpt}</p>

              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{post.author.name}</div>
                    <div className="text-sm text-gray-500">{post.author.bio}</div>
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="flex items-center gap-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button variant="outline" size="sm">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  {post.likes}
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {post.comments}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <BookmarkPlus className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Image */}
      <motion.section
        className="py-12 bg-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Article Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <motion.article
                className="lg:col-span-3"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="prose prose-lg max-w-none">
                  {post.content.split("\n").map((paragraph, index) => {
                    if (paragraph.startsWith("# ")) {
                      return (
                        <h1 key={index} className="text-3xl font-bold text-gray-900 mb-6 mt-8">
                          {paragraph.slice(2)}
                        </h1>
                      )
                    }
                    if (paragraph.startsWith("## ")) {
                      return (
                        <h2 key={index} className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                          {paragraph.slice(3)}
                        </h2>
                      )
                    }
                    if (paragraph.startsWith("### ")) {
                      return (
                        <h3 key={index} className="text-xl font-bold text-gray-900 mb-3 mt-6">
                          {paragraph.slice(4)}
                        </h3>
                      )
                    }
                    if (paragraph.startsWith("```")) {
                      return null // Skip code block markers for this demo
                    }
                    if (paragraph.trim() === "") {
                      return null
                    }
                    return (
                      <p key={index} className="text-gray-600 mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    )
                  })}
                </div>

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="hover:bg-purple-100 cursor-pointer">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Author Bio */}
                <Card className="mt-8">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">About {post.author.name}</h3>
                        <p className="text-gray-600 mb-4">{post.author.bio}</p>
                        <div className="flex gap-4">
                          <Button asChild variant="outline" size="sm">
                            <Link href="/about">View Profile</Link>
                          </Button>
                          <Button asChild variant="outline" size="sm">
                            <Link href="/contact">Get In Touch</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.article>

              {/* Sidebar */}
              <motion.aside
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Table of Contents */}
                <Card className="mb-8  top-24">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h3>
                    <nav className="space-y-2">
                      <Link
                        href="#whats-new"
                        className="block text-sm text-gray-600 hover:text-purple-600 transition-colors"
                      >
                        What's New in Next.js 14
                      </Link>
                      <Link
                        href="#building-scale"
                        className="block text-sm text-gray-600 hover:text-purple-600 transition-colors"
                      >
                        Building for Scale
                      </Link>
                      <Link
                        href="#best-practices"
                        className="block text-sm text-gray-600 hover:text-purple-600 transition-colors"
                      >
                        Best Practices
                      </Link>
                      <Link
                        href="#conclusion"
                        className="block text-sm text-gray-600 hover:text-purple-600 transition-colors"
                      >
                        Conclusion
                      </Link>
                    </nav>
                  </CardContent>
                </Card>

                {/* Share */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Share2 className="mr-2 h-4 w-4" />
                        Twitter
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Share2 className="mr-2 h-4 w-4" />
                        LinkedIn
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Share2 className="mr-2 h-4 w-4" />
                        Copy Link
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.aside>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {/* <motion.section
        className="py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Related post"
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-2">
                        React
                      </Badge>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Related Article Title {i}</h3>
                      <p className="text-gray-600 text-sm mb-4">Brief description of the related article content...</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />5 min read
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section> */}
    </div>
  )
}
