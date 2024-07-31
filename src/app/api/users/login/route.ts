import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        console.log(reqBody);


        const user = await User.findOne({ email: email })
        if (!user) {
            return NextResponse.json({ error: 'User Not Found' }, { status: 400 })
        }


        bcrypt.compare(password, user.password, function (err, res) {
            if (!res) {
                return NextResponse.json({ error: 'Enter valid credentials' }, { status: 500 })

            }
        });

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: '1d' })

        const response = NextResponse.json({
            message:'Login Successfull',
            success:true
        })

        response.cookies.set('token' , token , {httpOnly:true}) //httpOnly:true means no one can manipulate cookies

        return response


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}