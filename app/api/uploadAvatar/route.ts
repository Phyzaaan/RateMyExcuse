import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/utils/supabase/admin";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "A file is required" },
        { status: 400 },
      );
    }

    const extension = file.name.split(".").pop() || "png";
    const fileName = `${Math.random().toString(36).slice(2)}.${extension}`; // example: x8y9z0a1b.png

    const { data, error } = await supabaseAdmin.storage
      .from("Avatar")
      .upload(fileName, file, {
        contentType: file.type || "application/octet-stream",
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Avatar upload failed:", error);

      return NextResponse.json(
        { error: error.message || "Failed to upload avatar" },
        { status: 500 },
      );
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from("Avatar")
      .getPublicUrl(data?.path || fileName);

    return NextResponse.json(
      {
        publicUrl: publicUrlData.publicUrl,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Avatar route error:", error);

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
