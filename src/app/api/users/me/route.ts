import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { getTokenData } from "@/app/utils/getTokenData";
connect()

export async function GET(request:NextRequest) {
    
try {
        const userId = await getTokenData(request)
        const user = await User.findOne({_id: userId}).select('-password') // select('-password') means password field will not show
        
        if(!user){
            return NextResponse.json({ error: 'Something Went Wrong try Logging in' }, { status: 400 })
        }

        return NextResponse.json({
            message: 'Welcome To Your Profile',
            data: user
        })

} catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
}
}