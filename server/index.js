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

    // test start

    app.route('/test')
        .get(function (req, res) {
            res.sendFile(path.resolve(__dirname, "client", "test.html"));
            console.log("get")
        })
        .post(function (req, res) {
            const date = new Date()

            res.send(`Data send: ${date}`);
            console.log(colors.bgMagenta("post"), date)

            console.log(req.body)
        })
        .put(function (req, res) {
            res.send('Update the book');
            console.log("put")
        });
    // test end

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