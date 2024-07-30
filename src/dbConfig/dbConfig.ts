import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URL!) // ! means we are sure the value will come and not be undefined
        
        const connection = mongoose.connection
        connection.on('connected' , ()=>{
            console.log('Db is up and running');
            
        })

        connection.on('error' , (err)=>{
            console.log('Failed! make sure db is up and running' + err);
            process.exit() // here it will just stop the app
            
        })
    
    } catch (error) {
        console.log('DB connection Failed');
        console.log(error);
        
    }
}