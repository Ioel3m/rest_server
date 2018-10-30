const jwt = require('jsonwebtoken')
//=========================
// VERIFICAR TOKEN

let checkToken = (req, res, next) => {

    let token = req.get('token')
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: "Token no válido"
            })
        }

        req.usuario = decoded.usuario
        next()
    })
}


//=========================
// VERIFICAR ROL
let checkRolAdmin = (req, res, next) => {

    if (req.usuario.role === 'ADMIN_ROLE') {
        next()
    } else {
        return res.status(401).json({
            ok: false,
            err: "No tiene permisos para realizar esta acción"
        })
    }

}




module.exports = {
    checkToken,
    checkRolAdmin
}