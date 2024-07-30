import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { sendMail } from "@/app/utils/mailer";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, username, password } = reqBody

        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ error: 'User Already Exists' }, { status: 400 })
        }

        let salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword

        })

        const savedUser = await newUser.save()
        console.log(savedUser);


        await sendMail({ email, emailType: 'VERIFY', userId: savedUser._id })

        return NextResponse.json({
            message: 'User Created Succesfully',
            success: true,
            savedUser
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}