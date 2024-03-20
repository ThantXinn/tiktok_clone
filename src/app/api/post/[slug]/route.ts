import { postDetailQuery } from "@/utils/groq";
import { NextResponse } from "next/server";
import { client } from "../../../../../sanity/lib/client";

export async function GET(request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
    
  const postDetails = await client.fetch(postDetailQuery(slug))
  //console.log(postDetailQuery(slug),postDetails)
  return NextResponse.json(postDetails[0],{status:200})
}

export async function PUT(req: Request,{ params }: { params: { slug: string } }) {
    const reqBody = await req.json();
    const { userId, comment } = await reqBody;
    const slug = params.slug;
    //console.log(userId, comment, slug)
    const { v4: uuidv4 } = require('uuid');
    const data:any[] = await client
        .patch(slug)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
          {
              comment,
              _key: uuidv4(),
            postedBy: {
              _type: "postedBy",
              _ref:userId
              }
            }
        ])
        .commit()
    ;
    return NextResponse.json(data,{status:200})
}