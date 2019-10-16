const passport = require('passport')
const {Router} = require('express')
const upload = require('../middleware/upload')
const postController    = require('../controllers/post.controller')
const router = Router()

// /api/post
// Admin
// /api/post/admin
router.post(
  '/admin/',
  passport.authenticate('jwt', {session: false}),
  upload.single('image'),
  postController.create
)

router.get(
  '/admin/',
  passport.authenticate('jwt', {session: false}),
  postController.getAll
)

router.get(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  postController.getById
)

router.put(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  postController.update
)

router.delete(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  postController.remove
)

// Normal Kullanıcıların erişebileceği link yapısı
// /api/post
router.get('/',    postController.getAll)
router.get('/:id', postController.getById)
router.put('/add/view/:id', postController.addView)



module.exports = router
