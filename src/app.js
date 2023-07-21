const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/registers");
const bcrypt = require("bcryptjs");
const port = process.env.port || 3000;

const static_path = path.join(__dirname, "../templates/public");
const template_path = path.join(__dirname, "../templates/views");
const template_partials = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(template_partials);

app.get("/", (req, res) => {
    res.render("login");
});
app.get("/register", (req, res) => {
    res.render("register");
});
app.get("/login", (req, res) => {
    res.render("login");
});
app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;
        if (password === confirmpassword) {
            const registerStudent = new Register({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword
            })
            const registered = await registerStudent.save();
            res.status(201).render("home");

        } else {
            res.send("password not matching")
        }
    } catch (error) {
        res.status(400).send(error);
    }
});
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Register.findOne({ email: email });
        const isMatch = await bcrypt.compare(password,useremail.password);
        if (isMatch) {
            res.status(201).render("home");
        } else {
            console.log("wrong password");
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
});
app.listen(port, () => {
    console.log(`server is running on port number ${port}`);
})