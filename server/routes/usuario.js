const express = require('express')
const app = express()
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const _ = require('underscore')

app.put('/usuario/:id', function (req, res) {
    let id = req.params.id
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

})

app.delete('/usuario/:id', function (req, res) {
    let id = req.params.id
    let body = _.pick(req.body, ['eliminar'])

    if (body.eliminar === true) {
        Usuario.findByIdAndRemove(id, (err, borrado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            if (!borrado) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario no encontrado'
                    }
                })
            }


            res.json({
                ok: true,
                borrado
            })
        })
    } else {
        Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true }, (err, usuarioActualizado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                usuarioActualizado
            })
        })
    }
})



app.get('/usuario', function (req, res) {
    let from = Number(req.query.from || 0)
    let limit = Number(req.query.limit || 0)
    Usuario.find({ estado: true }, 'nombre email').limit(limit).skip(from)

        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Usuario.count({ estado: true }, (err, total) => {
                res.json({
                    ok: true,
                    usuarios,
                    total
                })
            })
        })
    // res.json('GET usuario')
})

app.post('/usuario', function (req, res) {
    let body = req.body
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })

        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.get('/', function (req, res) {
    res.json('Server REst')
})

module.exports = app