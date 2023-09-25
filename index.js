const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./Routes/userRoutes");
const { empRouter } = require("./Routes/empRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/users",userRouter);
app.use("/emp",empRouter);


app.get("/",(req,res)=>{
    res.send("This is the home page.")
})

app.listen(7700, async()=>{
    try {
        await connection;
        console.log("Connected to the DB");
        console.log("server is running at 7700");
    } catch (err) {
        console.log(err);
    }
})