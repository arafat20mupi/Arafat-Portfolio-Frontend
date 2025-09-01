import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, ArrowRight, Search, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BlogPage() {
  const blogPosts = [
    {
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
      category: "React",
      readTime: "8 min read",
      date: "2024-01-15",
      author: {
        name: "Arafat Islam",
        avatar: "https://res.cloudinary.com/dkxmy7tds/image/upload/v1755178100/8105wajc7t5-1755178098023-48050703714273076449129636737254704628286131n-jpg.jpg.jpg",
        bio: "Full Stack Web Developer | Expert in MERN Stack | Crafting Scalable & User-Centric Digital Solutions",
      },
      tags: ["Frontend", "JavaScript", "React", "CSS", "Web Development"],
      likes: 0,
      comments: 0,
      shares: 0,
      featured: true,
    },
  ]

  const categories = ["All", "React", "TypeScript", "CSS", "Backend", "DevOps", "Performance", "PWA"]

  const featuredPosts = blogPosts.filter((post) => post.featured)
  const recentPosts = blogPosts.slice(0, 6)

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Blog & Insights</h1>
            <p className="text-xl text-gray-600 mb-8">
              Sharing knowledge, experiences, and insights about web development, programming, and the latest trends in
              technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search articles..." className="pl-10" />
              </div>
              <Button variant="outline">Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button key={category} variant={category === "All" ? "default" : "outline"} className="rounded-full">
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Featured Articles</h2>
          <div className="max-w-6xl mx-auto">
            {/* Main Featured Post */}
            <div className="mb-12">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={featuredPosts[0]?.image || "/placeholder.svg?height=400&width=600"}
                      alt={featuredPosts[0]?.title || "Featured post"}
                      width={600}
                      height={400}
                      className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="secondary">{featuredPosts[0]?.category}</Badge>
                      <div className="flex items-center text-sm text-gray-500 gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(featuredPosts[0]?.date || "").toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {featuredPosts[0]?.readTime}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                      {featuredPosts[0]?.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">{featuredPosts[0]?.excerpt}</p>
                    <Button asChild className="self-start">
                      <Link href={`/blog/${featuredPosts[0]?.id}`}>
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </div>

            {/* Secondary Featured Posts */}
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.slice(1, 3).map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-500 gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/blog/${post.id}`}>Read More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Recent Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {recentPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500 gap-2">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500 gap-1">
                      <User className="h-3 w-3" />
                      John Doe
                    </div>
                    <span className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/blog/all">
                View All Articles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Subscribe to my newsletter to get the latest articles, tutorials, and insights delivered directly to your
            inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button variant="secondary" size="lg">
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-purple-200 mt-4">No spam, unsubscribe at any time.</p>
        </div>
      </section>
    </div>
  )
}
