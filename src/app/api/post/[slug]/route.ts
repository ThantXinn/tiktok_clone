import { postDetailQuery } from "@/utils/groq";
import { NextResponse } from "next/server";
import { client } from "../../../../../sanity/lib/client";

export async function GET(request: Request,
  { params }: { params: { slug: string } }
) {
    const slug = params.slug
    
  const postDetails = await client.fetch(postDetailQuery(slug))
  //console.log(postDetailQuery(slug),postDetails)
  return NextResponse.json(postDetails[0],{status:200})
}