import mongoose from "mongoose";

export const connectDatabase = () => {
    mongoose
        .connect(process?.env?.MONGO_URL! as string)
        .then(() => {
            console.info("Database Status: \tConnected");
        })
        .catch((err) => console.error(err));
};