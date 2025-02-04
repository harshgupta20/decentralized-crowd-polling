const express = require("express");
const app = express();

const cloudinaryUpload = require("./utils/cloudinaryUpload");


app.get("/test", (req, res) => {
    cloudinaryUpload();
    res.send("Hello World!");
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});