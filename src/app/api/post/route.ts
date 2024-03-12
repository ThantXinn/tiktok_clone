import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../../sanity/lib/client";

export async function POST(req:NextRequest) {
    const reqBody = await req.json();
    const {caption,topic,videoAsset,session} = await reqBody;
    try {
        await client.create({
            _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset._id,
          },
        },
        userId: session.user.id,
        postedBy: {
            _type: "postedBy",
            _ref:session.user.id
        },
        topic,
        }).then(() => {
            return NextResponse.json({message:"ok"},{status:200})
        })
        
        return NextResponse.json({message:"video created successful"},{status:200})
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}