import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send, Github, Linkedin, Twitter, MessageCircle } from "lucide-react";
import Link from "next/link";

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
];

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
];

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
];


async function sendContactForm(data: FormData) {
  "use server";
  const name = data.get("name")?.toString() || "";
  const email = data.get("email")?.toString() || "";
  const subject = data.get("subject")?.toString() || "";
  const message = data.get("message")?.toString() || "";

  console.log({ name, email, subject, message });
}


export default async function ContactPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Get In Touch</h1>
            <p className="text-xl text-gray-600 mb-8">
              Ready to start your next project? I'd love to hear about your ideas and discuss how we can bring them to life.
              Let's create something amazing together.
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
                    <form action={sendContactForm} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                          <Input id="name" name="name" type="text" required placeholder="Your full name" />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                          <Input id="email" name="email" type="email" required placeholder="your.email@example.com" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                        <Input id="subject" name="subject" type="text" required placeholder="Project inquiry, collaboration, etc." />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                        <Textarea id="message" name="message" required rows={6} placeholder="Tell me about your project..." />
                      </div>
                      <button type="submit" className="w-full py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition">
                        <Send className="inline-block mr-2 h-4 w-4" />
                        Send Message
                      </button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
