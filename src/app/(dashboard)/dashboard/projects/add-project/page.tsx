"use client"

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useState } from "react";
import React from "react";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; 
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Challenge = { title: string; description: string };
type ProjectFormValues = {
  title: string;
  description: string;
  longDescription: string;
  category: string;
  tech: string;
  github?: string;
  live?: string;
  duration?: string;
  team?: string;
  year?: string;
  image?: FileList;
  images?: FileList;
  features?: string;
  challenges?: Challenge[];
  testimonialName?: string;
  testimonialRole?: string;
  testimonialCompany?: string;
  testimonialQuote?: string;
  testimonialImage?: FileList;
};

export default function AddProjectPage() {
  const router = useRouter();
  const { register, handleSubmit, control, reset } = useForm<ProjectFormValues>({
    defaultValues: { challenges: [{ title: "", description: "" }] },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "challenges" });
  const [submitting, setSubmitting] = useState(false);
  const categories = ["Full-Stack", "Frontend", "Backend", "UI/UX", "Other"];

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("longDescription", data.longDescription);
      formData.append("category", data.category);
      formData.append("tech", data.tech);
      if (data.github) formData.append("github", data.github);
      if (data.live) formData.append("live", data.live);
      if (data.duration) formData.append("duration", data.duration);
      if (data.team) formData.append("team", data.team);
      if (data.year) formData.append("year", data.year);
      if (data.features) formData.append("features", data.features);

      // Images
      if (data.image && data.image[0]) formData.append("image", data.image[0]);
      if (data.images) Array.from(data.images).forEach((file) => formData.append("images", file));

      // Challenges
      if (data.challenges) formData.append("challenges", JSON.stringify(data.challenges));

      // Testimonial
      if (data.testimonialName) formData.append("testimonialName", data.testimonialName);
      if (data.testimonialRole) formData.append("testimonialRole", data.testimonialRole || "");
      if (data.testimonialCompany) formData.append("testimonialCompany", data.testimonialCompany || "");
      if (data.testimonialQuote) formData.append("testimonialQuote", data.testimonialQuote);
      if (data.testimonialImage && data.testimonialImage[0])
        formData.append("testimonialImage", data.testimonialImage[0]);

      const res = await fetch("/api/projects", { method: "POST", body: formData });
      const result = await res.json();

      if (result.success) {
        toast.success("Project added successfully!");
        reset();
      } else {
        toast.error(result.message || "Failed to add project");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 gap-5  ">
            {/* Basic Project Fields */}
            <div>
              <Label className="font-semibold">Project Title *</Label>
              <Input {...register("title", { required: true })} placeholder="Project title" />
            </div>
            <div>
              <Label className="font-semibold">Short Description *</Label>
              <Textarea {...register("description", { required: true })} rows={3} />
            </div>
            {/* <div className="">
              <Label className="font-semibold">Long Description *</Label>
              <Controller
                name="longDescription"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <ReactQuill className="h-45" value={field.value || ""} onChange={field.onChange} />}
              />
            </div> */}
            <div className="">
              <Label className="font-semibold">Long Description *</Label>
              <Controller
                name="longDescription"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <ReactQuill className="h-45" value={field.value || ""} onChange={field.onChange} />}
              />
            </div>

            <div className="mt-12">
              <Label className="font-semibold">Category *</Label>
              <select {...register("category", { required: true })} className="w-full border p-2 rounded">
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <Label className="font-semibold">Tech Stack *</Label>
              <Input {...register("tech", { required: true })} placeholder="React.js, Node.js" />
            </div>
            <div>
              <Label className="font-semibold">GitHub URL</Label>
              <Input {...register("github")} />
            </div>
            <div>
              <Label className="font-semibold">Live URL</Label>
              <Input {...register("live")} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div><Label className="font-semibold">Duration</Label><Input {...register("duration")} /></div>
              <div><Label className="font-semibold">Team</Label><Input {...register("team")} /></div>
              <div><Label className="font-semibold">Year</Label><Input {...register("year")} /></div>
            </div>
            <div>
              <Label className="font-semibold">Features (comma separated)</Label>
              <Textarea {...register("features")} rows={3} />
            </div>

            {/* Images */}
            <div>
              <Label className="font-semibold">Thumbnail Image *</Label>
              <Input type="file" {...register("image")} accept="image/*" required />
            </div>
            <div>
              <Label className="font-semibold">Additional Images</Label>
              <Input type="file" {...register("images")} accept="image/*" multiple />
            </div>

            {/* Challenges */}
            <div>
              <Label className="font-semibold">Challenges</Label>
              {fields.map((field, index) => (
                <div key={field.id} className="border p-2 mb-2 rounded space-y-2">
                  <Input placeholder="Challenge Title" {...register(`challenges.${index}.title` as const)} />
                  <Textarea placeholder="Challenge Description" {...register(`challenges.${index}.description` as const)} rows={2} />
                  <Button type="button" onClick={() => remove(index)}>Remove</Button>
                </div>
              ))}
              <Button type="button" onClick={() => append({ title: "", description: "" })}>Add Challenge</Button>
            </div>

            {/* Testimonial */}
            <div className="border p-2 space-y-2 rounded">
              <Label className="font-semibold">Testimonial</Label>
              <Input {...register("testimonialName")} placeholder="Name" />
              <Input {...register("testimonialRole")} placeholder="Role" />
              <Input {...register("testimonialCompany")} placeholder="Company" />
              <Textarea {...register("testimonialQuote")} placeholder="Quote" rows={2} />
              <Input type="file" {...register("testimonialImage")} accept="image/*" />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Add Project"}</Button>
        </div>
      </form>
    </div>
  );
}
