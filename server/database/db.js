import mongoose from "mongoose"

const connection = async(USERNAME,PASSWORD)=>{
    const URL =`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.itl1l6l.mongodb.net/?retryWrites=true&w=majority`;
    try{
        await mongoose.connect(URL,{useNewUrlParser:true});
        console.log('Database Connnected Succefully')
    }
    catch(error){
        console.log(error)
        console.log('Error while connecting with database')

    }
}
export default connection