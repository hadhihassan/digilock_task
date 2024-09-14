import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./config/connectDatabase";
import { authRoutes } from "./routes/authRoutes";
import { adminRoutes } from "./routes/adminRouter";

dotenv.config();



const app: Express = express();
const port = process.env.PORT || 4000;

connectDatabase();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(
    express.json({
        limit: "50mb",
    })
);


// app.use((req: Request, res: Response, next) => {
//     console.log(req.body)
//     next()
// });
app.use(authRoutes)
app.use(adminRoutes)



app.listen(port, () => {
    console.log(`Server Status: \t\tRunning on http://localhost:${port}`);
});