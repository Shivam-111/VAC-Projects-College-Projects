const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.static("public"));

app.use(express.json());

app.post("/check-age", (req, res) => {

    console.log(req.body);

    res.send("Data Received Successfully");

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});