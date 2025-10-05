import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Github,
  Edit,
  Trash2,
  Star,
  Eye,
  Heart,
  Calendar,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { IProject } from "@/src/interface/type";

interface ProjectsPageProps {
  search?: string;
  category?: string;
  status?: string;
}

async function fetchProjects(): Promise<IProject[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export default async function AllProjectsPage({
  search = "",
  category = "all",
  status = "all",
}: ProjectsPageProps) {
  let projects = await fetchProjects();

  // ------------------------
  // Server-side filtering
  // ------------------------
  projects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tech?.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = category === "all" || p.category === category;
    // Optional: if you have status field in IProject
    const matchesStatus = status === "all" || (p as any).status === status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">All Projects</h1>
          <p className="text-gray-600 mt-2">Manage and view all your projects</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/projects/add-project">Add New Project</Link>
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Image + badges */}
            <div className="relative">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              {project.featured && (
                <Badge className="absolute top-2 right-2 bg-yellow-500">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>

            {/* Content */}
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg line-clamp-1">
                  {project.title}
                </h3>
                <Badge variant="outline">{project.category}</Badge>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {project.description}
              </p>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tech?.slice(0, 3).map((t, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {t}
                  </Badge>
                ))}
                {project.tech && project.tech.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{project.tech.length - 3}
                  </Badge>
                )}
              </div>

              {/* Meta info */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {(project as any).views || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {(project as any).likes || 0}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {project.year || "N/A"}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {project.live && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={project.live} target="_blank">
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  )}
                  {project.github && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={project.github} target="_blank">
                        <Github className="h-3 w-3" />
                      </Link>
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No projects fallback */}
      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
