const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const app = express();
const connection = require("./database/database");
const usersController = require("./user/UserController");
const userAdmController = require("./userAdm/UserAdmController");
const fileUpload = require("express-fileupload");

app.set('view engine', 'ejs');
app.use(session({
    secret: "detalhamento",
    cookie: {
        maxAge: 9000000
    }
}));

app.use(express.static('public'));
app.use(fileUpload());


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/", usersController)
app.use("/", userAdmController);
connection
    .authenticate()
    .then(() => {
        console.log("database conneceted")
    })
    .catch((error) => {
        console.log(error);
    });


app.listen(8080, () => {
    console.log("█▀▄ █▀▀ ▀█▀ █▀█ █   █ █ █▀█ █▄ ▄█ █▀▀ █▄ █ ▀█▀ █▀█ ")
    console.log("█ █ █▀▀  █  █▀█ █   █▀█ █▀█ █ ▀ █ █▀▀ █ ▀█  █  █ █ ");
    console.log("▀▀▀ ▀▀▀  ▀  ▀ ▀ ▀▀▀ ▀ ▀ ▀ ▀ ▀   ▀ ▀▀▀ ▀  ▀  ▀  ▀▀▀ ");
});    