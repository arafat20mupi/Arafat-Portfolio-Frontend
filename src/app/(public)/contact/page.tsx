"use client"

import type React from "react"

import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Badge } from "@/src/components/ui/badge"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  Calendar,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      value: "arafatislam6619@gmail.com",
      link: "mailto:arafatislam6619@gmail.com",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      value: "+88 017 22-172906",
      link: "tel:+8801722172906",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Location",
      value: "Dhaka, Bangladesh",
      link: "https://www.google.com/maps?q=Dhaka,+Bangladesh",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Response Time",
      value: "Within 24 hours",
      link: "https://www.linkedin.com/in/arafatislam03",
    },
  ]

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      name: "GitHub",
      url: "https://github.com/arafat20mupi",
      username: "@arafat20mupi",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/arafatislam03",
      username: "@arafatislam03",
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      name: "Twitter",
      url: "https://x.com/arafat_isl49899",
      username: "@arafat_isl49899",
    },
  ]

  const services = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "API Development",
    "Consulting",
    "Code Review",
    "Technical Support",
    "Maintenance",
    "Quality Assurance",
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Get In Touch</h1>
            <p className="text-xl text-gray-600 mb-8">
              Ready to start your next project? I'd love to hear about your ideas and discuss how we can bring them to
              life. Let's create something amazing together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {services.map((service) => (
                <Badge key={service} variant="secondary" className="px-3 py-1">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <MessageCircle className="h-6 w-6 text-purple-600" />
                      Send Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <div className="text-center py-8">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                        <p className="text-gray-600">Thank you for reaching out. I'll get back to you soon.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name *
                            </label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Your full name"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address *
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="your.email@example.com"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                            Subject *
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            type="text"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Project inquiry, collaboration, etc."
                          />
                        </div>
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                            Message *
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            required
                            rows={6}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
                          />
                        </div>
                        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                  <p className="text-gray-600 mb-8">
                    Feel free to reach out through any of these channels. I'm always happy to discuss new opportunities
                    and answer any questions you might have.
                  </p>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="bg-purple-100 rounded-full p-3">
                          <div className="text-purple-600">{info.icon}</div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{info.title}</h3>
                          <Link href={info.link} className="text-gray-600 hover:text-purple-600 transition-colors">
                            {info.value}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect With Me</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <Link
                        key={index}
                        href={social.url}
                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors group"
                      >
                        {social.icon}
                        <div>
                          <div className="font-medium">{social.name}</div>
                          <div className="text-sm text-gray-500 group-hover:text-purple-500">{social.username}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      Availability
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Current Status</span>
                        <Badge className="bg-green-100 text-green-800">Available</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Response Time</span>
                        <span className="font-medium">Within 24 hours</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Time Zone</span>
                        <span className="font-medium">GMT+6</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Preferred Contact</span>
                        <span className="font-medium">Email</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What's your typical project timeline?</h3>
                <p className="text-gray-600 mb-6">
                  Project timelines vary based on complexity, but most websites take 2-6 weeks, while larger
                  applications can take 2-4 months.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you work with international clients?</h3>
                <p className="text-gray-600 mb-6">
                  Yes! I work with clients worldwide and am comfortable with different time zones and communication
                  preferences.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What's included in your development service?
                </h3>
                <p className="text-gray-600 mb-6">
                  Full-stack development, responsive design, testing, deployment, and 30 days of post-launch support are
                  included.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you provide ongoing maintenance?</h3>
                <p className="text-gray-600 mb-6">
                  Yes, I offer maintenance packages for ongoing updates, security patches, and feature additions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
