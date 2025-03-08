import { NextRequest, NextResponse } from "next/server";

import { uploadToCloudinary } from "@/app/cloud/configUpload"

export async function POST(request: NextRequest) {
    const data = await request.formData()
    const file = data.get('files')

    if (!file) {
        return NextResponse.json("error al cargar la imagen")
    }

    if (typeof file === 'string') {
        return NextResponse.json("Error: file is a string, expected a File or Blob.");
    }
    const byte = await file.arrayBuffer();
    const buffer = Buffer.from(byte)

    const result = await uploadToCloudinary(buffer)

    
    return NextResponse.json({url:result.secure_url,image_name:result.display_name})
}