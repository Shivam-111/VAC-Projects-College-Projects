const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Student = require("./models/Student");

const app = express();

app.use(cors());
app.use(express.json());

const path = require("path");

app.use(express.static(path.join(__dirname, "../frontend")));

// Connect Database
connectDB();

app.get("/", (req, res) => {
    res.send("Student Registration Server Running");
});


app.post("/register", async (req, res) => {

    try {

        const student = new Student({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            course: req.body.course
        });

        await student.save();

        res.json({
            message: "Student Registered Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});



const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});