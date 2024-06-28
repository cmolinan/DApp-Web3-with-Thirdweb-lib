const jwt = require('jsonwebtoken');

const verifyToken = (handler) => {
  return async (req, res) => {
    try {
      let token = req.headers['authorization'];
      
      if (!token) {    
        return res.status(403).send({ message: 'Token no proporcionado' });    
      }
      token = token.slice(7)
      
      const decoded = jwt.verify(token, process.env.JWT_KEY)
        // return res.status(901).send({ message: 'Token expirado' });
      req.userId = decoded.id;
      return handler(req, res);


    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        // 901 it's because when responseType = blob, the "Invalid Token" message does't reach the frontend
        return res.status(901).send({ message: 'Token expirado' });
      } else {
        return res.status(500).send({ message: 'Token inválido' });
      }
    }
  }
};

//Permanent token or Login Token
const verifyAPIToken = (handler) => {
  return async (req, res) => {
    try {
      let token = req.headers['authorization'];
      
      if (!token) {
        return res.status(403).send({ message: 'Token no proporcionado' });
      }

      token = token.slice(7); // Remueve 'Bearer ' de la cabecera
      if (token === process.env.API_TOKEN) {
        return handler(req, res); // Token API permanente
      }
      return res.status(401).send({ message: 'Token inválido' });

      // Reintenta para validar si es un Token de Login
      // Verifica si es un token estándar de login
      // jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      //   if (err) {
      //     if (err.name === 'TokenExpiredError') {
      //       return res.status(401).send({ message: 'Token expirado' });
      //     } else {
      //       return res.status(401).send({ message: 'Token inválido' });
      //     }
      //   } 
      //   return handler(req, res); // Token válido
      // });
    } catch (error) {
      return res.status(500).send({ message: 'Error interno del servidor' });
    }
  };
};

export { verifyAPIToken, verifyToken }
