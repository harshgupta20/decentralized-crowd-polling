const express = require("express");
const cors = require("cors");
const app = express();

const cloudinaryUpload = require("./utils/cloudinaryUpload");

app.use(cors());
app.use(express.json({ limit: "50mb" })); // Increase limit to 50MB
app.use(express.urlencoded({ extended: true, limit: "50mb" })); // Increase limit for form data

app.post("/test", async (req, res) => {
    try {
        const {image, option, text} = req.body;

        const uploadResult = await cloudinaryUpload(image, "test");
        res.status(200).send({ success: true, data: uploadResult });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error: error.message || "Something went wrong!" });
    }
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});
