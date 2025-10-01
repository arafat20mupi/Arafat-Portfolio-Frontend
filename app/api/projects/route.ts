import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/projects`;

    const response = await fetch(backendUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: "Backend error" },
        { status: response.status }
      );
    }

    // Revalidate ISR cache for projects page
    revalidateTag("projects");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
