import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../../sanity/lib/client";

export async function POST(req: NextRequest) {
    const reqBody = await req.json();
    const { session } = await reqBody;
    //console.log(session.user.id)
    try {
        await client.createIfNotExists({
          _id: session.user.id,
          _type: "user",
          userName: session.user?.name,
          image: session.user?.image,
        }).then(() => {
            return NextResponse.json({message:"user already created"},{status:200})
        })
        return NextResponse.json({message:"user created successfull"},{status:200})
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}