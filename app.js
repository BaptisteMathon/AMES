require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
// ----
// const nodemailer = require('nodemailer')
// ----

const app = express();
const PORT = process.env.PORT;

// Middleware
// ----
// app.use(bodyParser.urlencoded({extended: true}))
// ----
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

// ********************************************************************************

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'))
})

app.get('/logout', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'logout.html'))
})

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'))
})

app.get('/projects-list', async function(req, res) {
    try{
        const response = await fetch(process.env.URL_appJS);

        const allProjects = await response.json()
        
        let arrayProject = [];
        for(let i = 0; i < allProjects.length; i++){
            arrayProject.push(allProjects[i]['name']);
        }
        console.log({arrayProject})
        res.render('projects-list', {name: arrayProject})
    } catch(error){
        console.error("Erreur du test")
        res.status(500).send('ERROR')
    }
})

app.get('/projects-list/:nameProject', (req, res) => {
    res.render('project-detail', {name_project : req.params.nameProject})
    
})

// ----
// app.post('/send-email', (req, res) => {
//     const {name, email, message} = req.body

//     let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.EMAIL,
//             pass: process.env.PASSWORD
//         }
//     })

//     let mailOptions = {
//         from: process.env.EMAIL,
//         to: 'baptjsp59@gmail.com',
//         subject: `Nouveau message de ${name}`,
//         text: `Vous avez reçu un nouveau message de ${name} (${email}) : \n \n ${message}`
//     }

//     transporter.sendMail(mailOptions, (error, info) => {
//         if(error){
//             return res.status(500).send(error.toString())
//         }
//         res.send('Email envoyé: ' + info.response)
//     })
// })
// ----

app.listen(PORT, () => {
    console.log(`Server en cours d'exécution sur le http://localhost:${PORT}`)
})