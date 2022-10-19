import express from "express";
import colors from "colors";
import path from "path";

const app = express()

const PORT = process.env.PORT || 4000;

const __dirname = path.resolve()

// app.use(express.static("client"))

app.listen(PORT, () => {
    console.log(`Server is listener on PORT:${colors.bgBlue(`http://localhost:${colors.bgRed(PORT)}`)}`)
})

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "index.html"))
});

app.get("/colors", (req, res) => {
    // get dirname and send file error.html
    res.sendFile(path.resolve(__dirname, "client", "colors.html"))
})

app.get("/page1", (req, res) => {
    // get dirname and send file error.html
    res.sendFile(path.resolve(__dirname, "client", "page1.html"))
})

// this block olways end
app.get("/*", (req, res) => {
    // get dirname and send file error.html
    res.sendFile(path.resolve(__dirname, "client", "error.html"))
})
