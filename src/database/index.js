import mongoose from 'mongoose'

const connectToDB = async () => {
    const connectionURL = "mongodb+srv://priyabhanderi2:9974226281@cluster0.h5xjars.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0"

    mongoose.connect(connectionURL).then(()=>{
        console.log("Database is successfully connected");
    }).catch((err)=>{console.log("No connection")})
    
    }
export default connectToDB;

