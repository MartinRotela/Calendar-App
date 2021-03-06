import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        mongoose.connect(process.env.DB_CNN!);
        console.log("Db online");
    } catch (e) {
        console.log(e);
        throw new Error("Database initialize error");
    }
};
