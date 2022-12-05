import mongoose from "mongoose";


const DBConnection = () => {
    const url = process.env.DB_URI

    mongoose.connect(url, { useNewUrlParser: true }).then((result) => {
        console.log(`DATABASE CONNECTED WITH THE HOST ${result.connection.host}`)
    })

    // .catch((err) => {
    //     console.error(err)
    // });

}

export default DBConnection