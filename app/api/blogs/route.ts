import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"

export async function POST(req: Request) {
    try {
        const formData = await req.formData()

        const backendUrl = process.env.NEXT_PUBLIC_API_URL + "/blogs"

        const response = await fetch(backendUrl, {
            method: "POST",
            body: formData,
        })

        if (!response.ok) {
            return NextResponse.json(
                { success: false, message: "Backend error" },
                { status: response.status }
            )
        }

        revalidateTag("blogs")

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        )
    }
}



export async function getBlogs() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
        next: {
            tags: ["blogs"],
        },
    })

    if (!res.ok) throw new Error("Failed to fetch blogs")
    return res.json()
}