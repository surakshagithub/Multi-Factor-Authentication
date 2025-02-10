import express, { urlencoded } from "express";
import session from "express-session";
import passport from "passport";
import "dotenv/config";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import authRoutes from "./routes/authRoutes.js";
import "./config/passportConfig.js";

// to fetch the value from the .env file
// require("dotenv").config();
dbConnect();

const app = express();

//Middlewares
// We are using these middlewares to parse the incoming request data in JSON format or payload can be in URL encoded format
app.use(express.json());
app.use(urlencoded({ extended: true }));

const corsOptions = {
  origin: ["http://localhost:3001"],
  credentials: true, //access-control-allow-credentials:true
};

app.use(cors(corsOptions));
app.use(
  session({
    // help to identify the session of the user
    secret: process.env.SESSION_SECRET || "secret",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored in it
    cookie: {
      maxAge: 60000 * 60, // 1 hour
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/auth", authRoutes);

// Listen app
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
