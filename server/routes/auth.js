const { Router } = require('express')
const passport   = require('passport')
const {login, createUser, userAll} = require('../controllers/auth.controller')
const router = Router()


// /api/auth/admin/login
router.post('/admin/login', login)


// /api/auth/admin/create
router.post(
	'/admin/create', 
	passport.authenticate('jwt', {session: false}),
	createUser
)

// /api/auth/admin/list
router.get(
	'/admin/allUser', 
	passport.authenticate('jwt', {session: false}),
	userAll
)



module.exports = router