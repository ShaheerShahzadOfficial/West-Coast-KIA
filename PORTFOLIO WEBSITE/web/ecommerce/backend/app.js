import express from "express";
import ProductRoute from "./Routes/Product/Product.js";
import bodyParser from "body-parser";
import cors from "cors"
import ErrorMiddleware from "./middleware/error.js";
import UserRoute from "./Routes/User/User.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload"
import OrderRoute from "./Routes/Order/Order.js";
import helmet from "helmet";
const app = express()

app.use(
    cors({
        origin: true,
        credentials: true,
    })
)
app.use(helmet())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }))

app.use("/products", ProductRoute)
app.use("/user", UserRoute)
app.use("/order", OrderRoute)



// Error  🤦‍♂️🤦‍♂️


app.use((req, res, next) => {
    res.status(404).json({
        Error: "🤬🤬🤬🤬🤬🤬 URL Not Found 🤬🤬🤬🤬🤬🤬"
    })
})

// Errormiddleware
app.use(ErrorMiddleware)




export default app