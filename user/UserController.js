const express = require("express");
const fileupload = require("express-fileupload");
const app = express();
const router = express.Router();
const User = require('./User');
const slugify = require("slugify");
const adminAuth = require("../middleware/adminAuth");
app.use(fileupload());

router.get("/user/new", (req, res) => {
    res.render("users/new");
});

router.post("/user/save", (req, res) => {
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    var identidade = req.body.identidade;
    var emissor = req.body.emissor;
    var uf = req.body.uf;
    var cpf = req.body.cpf;
    var dataNascimento = req.body.dataNascimento;
    var nomePai = req.body.nomePai;
    var nomeMae = req.body.nomeMae;
    var permissao = req.body.permissao;
    var acc = req.body.acc;
    var slug = slugify(nome + "-" + sobrenome);
    var img = req.files.imagem.name = slug+".jpg";
    // req.files.imagem.mv(__dirname + '/img/' + img);
    req.files.imagem.mv('public/img/' + img);

    User.create({
        nome: nome,
        sobrenome: sobrenome,
        identidade: identidade,
        orgEmissor: emissor,
        uf: uf,
        cpf: cpf,
        dtNascimento: dataNascimento,
        nomePai: nomePai,
        nomeMae: nomeMae,
        permissao: permissao,
        acc: acc,
        img: img,
        slug: slug
    }).then(() => {
        res.redirect("/user/"+slug);
    });
});

router.get("/user/:slug", (req, res) => {
    var slug = req.params.slug;
    User.findOne({
        where:{
            slug: slug
        }
    }).then(user => {
        if( user != null) {
            res.render("users/index", { user: user });
        } else {
            res.redirect("/");
        }
    }).catch(erro => {
        res.redirect("/");
    })
});

router.get("/user/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id;

    if(id != undefined){
        if(isNaN(id)){

        }
        User.findByPk(id)
        .then(user => {
            if(user != undefined){
                res.render("users/edit", {user: user});
            } else {
                res.redirect("/admin/users/");
            }
        }).catch(erro => {
            res.redirect("/admin/users/");
        });
    } else {

    }
});

router.post("/user/update", (req, res) => {
    var id = req.body.id;
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    var identidade = req.body.identidade;
    var emissor = req.body.emissor;
    var uf = req.body.uf;
    var cpf = req.body.cpf;
    var dataNascimento = req.body.dataNascimento;
    var nomePai = req.body.nomePai;
    var nomeMae = req.body.nomeMae;
    var permissao = req.body.permissao;
    var acc = req.body.acc;
    var img = req.body.img;
    var slug = slugify(nome + "-" + sobrenome);
    // var img = req.files.imagem.name = slug+".jpg";
    // req.files.imagem.mv('public/img/' + img);

    User.update({
        nome: nome,
        sobrenome: sobrenome,
        identidade: identidade,
        orgEmissor: emissor,
        uf: uf,
        cpf: cpf,
        dtNascimento: dataNascimento,
        nomePai: nomePai,
        nomeMae: nomeMae,
        permissao: permissao,
        acc: acc,
        // img: img,
        slug: slug
    },
    { where: {
        id: id
    }}).then(() => {
        res.redirect("/");
    });
});

router.post("/user/delete", (req, res) => {
    var id = req.body.id;
    if(id != undefined) {
        if(!isNaN(id)) {
            User.destroy({
                where: {
                    id: id
                }
            })
            .then(() => {
                res.redirect("/");
            })
        } else {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
});

module.exports = router;