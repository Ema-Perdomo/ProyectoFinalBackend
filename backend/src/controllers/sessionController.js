import passport from "passport";

export const login = async (req, res) => {
    try {
        if (!req.user) { //Si no existe el usuario
            res.status(401).send('Usuario o contraseña invalidos')
        }
        //req.session guarda en MongoDB
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name,
        }

        res.status(200).send('Login exitoso')
    } catch (error) {
        res.status(500).send('Error al loguear usuario: ', error)

    }
};

export const register = async (req, res) => {
    try {
        if (!req.user) { //Si no existe el usuario
            return res.status(400).send('Usuario ya existente en la aplicacion')
        }
        res.status(200).send('Usuario registrado correctamente')
    } catch (error) {
        res.status(500).send('Error al registrar usuario: ', error)
    }
};



export const githubSession = async (req, res) => {
    req.session.user = {
        email: req.user.email,
        first_name: req.user.name,
    }
    res.redirect('/')
};

export const logout = async (req, res) => {
    req.session.destroy((e =>
        //Si hay error al cerrar sesion devuelvo el error sino redirijo a la pagina principal
        e ? res.status(500).send('Error al cerrar sesion') : res.status(200).redirect(/*"api/session/login" o: */ "/")
    ))
};

export const testJWT = async (req, res) => {
    if (req.user.role == 'user') 
        return res.status(403).send('Usuario no autorizado')
    else
        res.status(200).send(req.user)
};