require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
//const bodyParser=require('bodyParser')
const cors = require('cors')
const path = require("path")
const noteroute = require('./routes/notesroutes');
const { MongoServerClosedError } = require("mongodb");
const userlog = require('./routes/login')
const userRoute = require('./routes/register');
const UserLogout = require('./routes/logout')
//const note = require("./models/note");
const cookieparser = require('cookie-parser')
const staticroute = require('./routes/staticroute')
const passport = require("passport")
const session = require("express-session")
const GoogleStrategy = require("passport-google-oauth20").Strategy





const app = express();
const port = 3030;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))
app.use(cors({
    origin: '*'
}))
app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const mongodb_atlasURL = process.env.MongoDb_URL

mongoose.connect(mongodb_atlasURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDb connected")).
    catch(err => console.log(err));





//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
}))



app.use(passport.initialize())
app.use(passport.session())



passport.use(
    new GoogleStrategy({
        clientID: process.env.Client_ID,
        clientSecret: process.env.Client_secret,
        callbackURL: "http://localhost:3030/auth/google/callback",
    },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile)
        }
    )
);

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))




app.get("/", (req, res) => {
    res.send("<a href='/auth/google'> Login with google </a>")
  })
  






app.get("/auth/google/",
    passport.authenticate("google", { scope: ["profile", "email"] })
)


app.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/profile")
    }
)

app.get("/profile", (req, res) => {
    res.send(`<h1>Welcome ${req.user.displayName} </h1>`)
})



 

















app.use('/', staticroute)
app.use('/api', noteroute);
app.use('/user', userRoute);
app.use('/user', userlog);
app.use('/user', UserLogout)

app.get("/cookie", (req, res) => {
    res.send(req.cookies)
})








app.listen(port, () => {
    console.log("Server running ")
})

