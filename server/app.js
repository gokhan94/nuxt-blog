const express    	= require('express')
const bodyParser 	= require('body-parser')
const mongoose   	= require('mongoose')
const passport   	= require('passport')
const passportStrategy = require('./middleware/passport-strategy')
const authRoutes 	= require('./routes/auth')
const postRoutes 	= require('./routes/post')
const commentRoutes = require('./routes/comment')
const keys		 	= require('./keys')
const app 	     	= express()

//Database Connect
mongoose.connect(keys.MONGO_URI, {useNewUrlParser: true})
.then(() => console.log('Bağlantı Başarılı'))
.catch(error => console.log(error))


app.use(passport.initialize())
passport.use(passportStrategy)

//BodyParser Settings
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(passport.initialize())


//Routes Ara Katmanı
app.use('/api/auth/', authRoutes)
app.use('/api/post',  postRoutes)
app.use('/api/comment',  commentRoutes)



module.exports = app