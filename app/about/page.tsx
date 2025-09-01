import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Award, Users, Code, Coffee } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const experiences = [
    {
      title: "Lead Web Developer",
      company: "CodeCraftor",
      period: "2023 - 2025",
      location: "Remote",
      description:
        "Led a team of developers to build scalable web applications using modern frameworks. Implemented best practices for code quality and performance optimization.",
    },
    {
      title: "Chief Technology Officer",
      company: "MobiNexa",
      period: "2024 - 2025",
      location: "Remote",
      description:
        "Oversaw the technology strategy and development for a mobile solutions company. Drove innovation and ensured alignment with business goals.",
    }
  ]

  const achievements = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Leadership",
      description: "Led a team of 10+ developers on multiple projects",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Open Source Contributor",
      description: "Active contributor to popular open-source projects",
    },
    {
      icon: <Coffee className="h-6 w-6" />,
      title: "15+ Projects Completed",
      description: "Successfully delivered projects for various clients",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Presentation & Public Speaking",
      description: "Experienced speaker at tech conferences and meetups",
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">About Me</h1>
              <p className="text-xl text-gray-600 mb-6">
                I'm a passionate full-stack developer with over 2 years of experience creating digital solutions that
                make a difference. I love turning complex problems into simple, beautiful, and intuitive designs.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or sharing knowledge with the developer community through blog posts and mentoring.
              </p>
              <div className="flex flex-wrap gap-4">
                <Badge variant="secondary" className="px-3 py-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  Dinajpur, Bangladesh
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  2+ Years Experience
                </Badge>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/arafat.jpg"
                alt="About me"
                width={400}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Work Experience</h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                        <p className="text-purple-600 font-medium">{exp.company}</p>
                      </div>
                      <div className="text-sm text-gray-500 mt-2 md:mt-0">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {exp.period}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{exp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Achievements & Certifications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <div className="text-purple-600">{achievement.icon}</div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                    <p className="text-gray-600 text-sm">{achievement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Detail Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Technical Skills</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Frontend</h3>
                <div className="space-y-4">
                  {[
                    { skill: "React/Next.js", level: 95 },
                    { skill: "TypeScript", level: 90 },
                    { skill: "Tailwind CSS", level: 95 },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 font-medium">{item.skill}</span>
                        <span className="text-gray-500">{item.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${item.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Backend</h3>
                <div className="space-y-4">
                  {[
                    { skill: "Node.js", level: 90 },
                    { skill: "Express.js", level: 90 },
                    { skill: "PostgreSQL", level: 55 },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 font-medium">{item.skill}</span>
                        <span className="text-gray-500">{item.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${item.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Let's Work Together</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities and interesting projects.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
