import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Progress } from "@/src/components/ui/progress"
import { Code, Database, Cloud, Smartphone, Settings, Monitor, Server, GitBranch, Shield } from "lucide-react"

export default function SkillsPage() {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Monitor className="h-6 w-6" />,
      color: "bg-blue-500",
      skills: [
        { name: "React/Next.js", level: 95, experience: "3+ years" },
        { name: "TypeScript", level: 90, experience: "3+ years" },
        { name: "JavaScript (ES6+)", level: 95, experience: "4+ years" },
        { name: "Tailwind CSS", level: 92, experience: "2+ years" },
        { name: "Redux", level: 80, experience: "1+ years" },
        { name: "HTML5 & CSS3", level: 98, experience: "4+ years" },
        { name: "Responsive Design", level: 95, experience: "4+ years" },
      ],
    },
    {
      title: "Backend Development",
      icon: <Server className="h-6 w-6" />,
      color: "bg-green-500",
      skills: [
        { name: "Node.js", level: 90, experience: "2+ years" },
        { name: "Express.js", level: 90, experience: "2+ years" },
        { name: "RESTful APIs", level: 92, experience: "2+ years" },
        { name: "Microservices", level: 75, experience: "2+ years" },
        { name: "Authentication & Security", level: 85, experience: "2+ years" },
        { name: "API Documentation", level: 90, experience: "2+ years" },
      ],
    },
    {
      title: "Database & Storage",
      icon: <Database className="h-6 w-6" />,
      color: "bg-purple-500",
      skills: [
        { name: "MongoDB", level: 85, experience: "3+ years" },
        { name: "PostgreSQL", level: 88, experience: "1+ years" },
        { name: "MySQL", level: 80, experience: "1+ years" },
        // { name: "Redis", level: 70, experience: "1- years" },
        { name: "Database Design", level: 85, experience: "2+ years" },
        { name: "Firebase", level: 78, experience: "2+ years" },
      ],
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="h-6 w-6" />,
      color: "bg-orange-500",
      skills: [
        // { name: "AWS", level: 82, experience: "3+ years" },
        { name: "Vercel", level: 90, experience: "2+ years" },
        // { name: "Docker", level: 78, experience: "2+ years" },
        // { name: "CI/CD", level: 80, experience: "2+ years" },
        // { name: "Nginx", level: 75, experience: "2+ years" },
        // { name: "Linux/Ubuntu", level: 82, experience: "3+ years" },
        { name: "Monitoring & Logging", level: 70, experience: "2+ years" },
        { name: "Performance Optimization", level: 85, experience: "3+ years" },
      ],
    },
    {
      title: "Mobile Development",
      icon: <Smartphone className="h-6 w-6" />,
      color: "bg-pink-500",
      skills: [
        { name: "React Native", level: 50, experience: "6 Months" },
        { name: "Expo", level: 50, experience: "6 Months" },
        { name: "Progressive Web Apps", level: 85, experience: "2+ years" },
        { name: "Mobile UI/UX", level: 78, experience: "2+ years" },
        { name: "App Store Deployment", level: 70, experience: "6 Months" },
        { name: "Push Notifications", level: 75, experience: "6 Months" },
        // { name: "Offline Storage", level: 72, experience: "1+ years" },
        { name: "Mobile Performance", level: 75, experience: "2+ years" },
      ],
    },
    {
      title: "Tools & Workflow",
      icon: <Settings className="h-6 w-6" />,
      color: "bg-gray-500",
      skills: [
        { name: "Git & GitHub", level: 95, experience: "4+ years" },
        { name: "VS Code", level: 98, experience: "4+ years" },
        { name: "Webpack/Vite", level: 80, experience: "2+ years" },
        { name: "ESLint/Prettier", level: 90, experience: "2+ years" },
        // { name: "Jest/Testing Library", level: 82, experience: "2+ years" },
        { name: "Figma", level: 75, experience: "2+ years" },
        { name: "Postman", level: 88, experience: "2+ years" },
        // { name: "Agile/Scrum", level: 85, experience: "3+ years" },
      ],
    },
  ]

  const certifications = [
    {
      title: "Complete Web Development With Jhankhar Mahbub",
      issuer: "Programming Hero",
      date: "2023",
    },
    {
      title: "Web Design and Development",
      issuer: "NEDL Engineering Development Limited",
      date: "2024",
    },
    {
      title: "Presentation & Public Speaking",
      issuer: "10 Minute School",
      date: "2024",
    },
    {
      title: "Communication Secrets",
      issuer: "10 Minute School",
      date: "2024",
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Skills & Expertise</h1>
            <p className="text-xl text-gray-600 mb-8">
              A comprehensive overview of my technical skills, tools, and technologies I work with to create exceptional
              digital experiences.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">4+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">30+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">20+</div>
                <div className="text-sm text-gray-600">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">4+</div>
                <div className="text-sm text-gray-600">Certifications</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8">
              {skillCategories.map((category, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className={`p-2 rounded-lg ${category.color} text-white`}>{category.icon}</div>
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-900">{skill.name}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {skill.experience}
                              </Badge>
                              <span className="text-sm text-gray-500">{skill.level}%</span>
                            </div>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Certifications</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{cert.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{cert.issuer}</p>
                        <Badge variant="secondary" className="text-xs">
                          {cert.date}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Learning & Growth */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Continuous Learning</h2>
            <p className="text-xl text-gray-600 mb-8">
              Technology evolves rapidly, and I'm committed to staying current with the latest trends, tools, and best
              practices in web development.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Code className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Latest Technologies</h3>
                <p className="text-gray-600 text-sm">
                  Always exploring new frameworks, libraries, and development tools
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <GitBranch className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Open Source</h3>
                <p className="text-gray-600 text-sm">
                  Contributing to open source projects and learning from the community
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Practices</h3>
                <p className="text-gray-600 text-sm">
                  Following industry standards for security, performance, and maintainability
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
