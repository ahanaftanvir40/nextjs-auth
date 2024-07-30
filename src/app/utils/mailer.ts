import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
import User from '@/models/userModel';

export async function sendMail({ email, emailType, userId } : any) {

try {
        const hashedToken = await bcrypt.hash(userId.toString() , 10)
    
        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId , {verifyToken:hashedToken , verifyTokenExpiry: Date.now() + 3600000})
        }else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId , {forgotPasswordToken: hashedToken , forgotPasswordTokenExpiry: Date.now() + 3600000})
        }
    
    
    
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "9573a43cd2c829",
                pass: "61bdc286dc47cc"
            }
        });
    
       
            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: 'ahanaf.tanvir@gmail.com', // sender address
                to: email, // list of receivers
                subject: emailType === 'VERIFY' ? 'Verify Your Email' : 'Reset Password', // Subject line
                html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
                or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                </p>`, // html body
            });
    
            console.log("Message sent: %s", info.messageId);
            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
} catch (error:any) {
    throw new Error(error.message)
}
    

    
}