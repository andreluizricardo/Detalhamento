const express = require("express");
const router = express.Router();
const User = require("./UserAdm");
const Users = require("../user/User");
const bcrypt = require("bcryptjs");
const adminAuth = require("../middleware/adminAuth");
const { json } = require("body-parser");

router.get("/admin/users/new", adminAuth, (req, res) => {
    res.render("admin/users/new");
});

router.get("/", adminAuth, (req, res) => {
    Users.findAll()
    .then(users => {
        res.render("admin/users/index", { users: users });
    });
});

router.get("/admin", adminAuth, (req, res) => {
    User.findAll()
    .then(users => {
        res.render("admin/users/admindex", { users: users });
    });
});

router.post("/users/save", adminAuth, (req, res) => {
    var nome = req.body.nome;
    var login = req.body.login;
    var password = req.body.password;

    User.findOne({where: {login: login}})
    .then(user => {
            if(user == undefined) {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);

                if(login != "" || password != "" || nome != "")  {
                    User.create({
                        nome: nome,
                        login: login,
                        password: hash
                    }).then(() =>{
                        Users.findAll()
                        .then(users => {
                            res.render("admin/users/admindex", { users: users });
                        });
                    })
                    .catch((error) => {
                        res.redirect("/admin/users/new");
                    });
                } else {
                    res.redirect("/admin/users/new");
            }
        } else {
            res.redirect("/admin/users/new");
        }
    }); 
});

router.get("/admin/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id;

    if(id != undefined) {
        if(!isNaN(id)) {
            User.findByPk(id)
            .then(user => {
                if(user != undefined) {
                    res.render("admin/users/edit", {user: user});
                } else {
                    res.redirect("/admin/users");
                }
            });
        } else {
           res.redirect("/admin/users");
        }
    } else {
        res.redirect("/admin/users");
    }
});

router.get("/admin/users/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id;

    if(id != undefined) {
        if(!isNaN(id)) {
            User.findByPk(id)
            .then( user => {
                if(user != undefined) {
                    res.render("admin/users/edit", {user: user});
                } else {
                    res.redirect("/admin");
                }
            });
        } else {
           res.redirect("/admin");
        }
    } else {
        res.redirect("/admin");
    }
});

router.post("/useradm/update", adminAuth, (req, res) => {
    var id = req.body.id;
    var nome = req.body.nome;
    var login = req.body.login;
    var password = req.body.password;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    User.update(
        {   
            nome: nome,
            login: login,
            password: hash
        },
        {
            where: { id: id }
        }
    ).then(() => {
        res.redirect("/admin");
    });    
});

router.post("/useradm/delete", (req, res) => {
    var id = req.body.id;
    if(id != undefined) {
        if(!isNaN(id)) {
            User.destroy({
                where: {
                    id: id
                }
            })
            .then(() => {
                Users.findAll()
                .then(users => {
                    res.render("admin/users/admindex", { users: users });
                });
            })
        } else {
            res.redirect("/admin");
        }
    } else {
        res.redirect("/admin");
    }
});

router.get("/login", (req, res) => {
    res.render("admin/users/login")
});

router.post("/antenticate", (req, res) => {
    var login = req.body.login;
    var password = req.body.password;
 
    if(login != "" || password != "") {
         User.findOne({
             where: {
                 login: login
             }
         }).then(user => {
             if(user != undefined) {
                 var correct = bcrypt.compareSync(password, user.password);
 
                 if(correct) {
                     req.session.user = {
                         id: user.id,
                         login: user.login,
                         nome: user.nome
                     }
                     res.redirect("/");
                 } else {
                     res.redirect("/login");
                 }
 
             } else {
                 res.redirect("/login");
             }
         })
    } else {
         res.redirect("/login");
    }
 });

 router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/login");
});

module.exports = router;