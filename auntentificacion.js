const jwt = require("jsonwebtoken");
require("dotenv").config();

const autorizacion = express();

const users = require("./users.json");

autorizacion.use(express.json());

autorizacion.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    res.status(401).send("Nombre o contraseña incorrectas");
  } else {
    const token = jwt.sign(user, process.env.SECRET_KEY);
    res.json({ token: token });
  }
});

function JWTValidation(req, res, next) {
  const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    res.status(401).json({ error: "NO AUTORIZADO" });
  }

  const dataToken = token.split(" ")[1];
  try {
    const decodedToken = jwt.verify(dataToken, process.env.SECRET_KEY);
    if (decodedToken.rol === "admin") {
      req.headers = { ...req.headers, rol: "admin" };
    } else if (decodedToken.rol === "user") {
      req.headers = { ...req.headers, rol: "user" };
    }
    next();
  } catch (error) {
    res.status(401).send("Token invalido");
  }
}

autorizacion.get("/premium-clients", JWTValidation, (req, res) => {
  if (req.headers.rol === "admin") {
    res.send("Bienvenido admin");
  } else {
    res.status(401).send("Acceso solo para Admin");
  }
});

autorizacion.get("/medium-clients", JWTValidation, (req, res) => {
  const valid = req.headers.rol;

  if (valid === "admin" || valid === "user") {
    res.send("Bienvenido a tu lista de tareas");
  } else {
    res.status(401).send("Acceso no autorizado");
  }
});

module.exports = autorizacion;