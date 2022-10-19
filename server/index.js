import express from "express";
import colors from "colors";
import path from "path";
import fs from "fs";

const app = express()

const PORT = process.env.PORT || 4000;

const __dirname = path.resolve()

const routes = [];

// app.use(express.static("client"))

fs.readdir(__dirname + "/client", (err, files) => {
    files.forEach(file => {
        routes.push(path.parse(file).name)
    });
})

setTimeout(() => {

    app.listen(PORT, () => {
        console.log(`Server is listener on PORT:${colors.bgBlue(`http://localhost:${colors.bgRed(PORT)}`)}`)
    })

    routes.forEach(route => {
        app.get(`/${route}`, (req, res) => {
            res.sendFile(path.resolve(__dirname, "client", `${route}.html`))
        })
    })

    app.get(`/`, (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", `index.html`))
    })

    app.get(`/*`, (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", `error.html`))
    })
}, 1000)