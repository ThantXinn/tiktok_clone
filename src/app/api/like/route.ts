import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../../sanity/lib/client";

export async function PUT(req: NextRequest) {
    const { v4: uuidv4 } = require('uuid');
    const reqBody = await req.json();
    const { userId, postId, like } = await reqBody;
    const data:any[] = like ? await client
        .patch(postId)
        .setIfMissing({ likes: [] })
        .insert('after', 'likes[-1]', [
            {
                _key: uuidv4(),
                _ref: userId
            }
        ])
        .commit()
        : await client
            .patch(postId)
            .unset([`likes[_ref == "${userId}"]`])
            .commit();
    ;
    return NextResponse.json(data,{status:200})
}