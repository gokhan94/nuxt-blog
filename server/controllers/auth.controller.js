const bcrypt = require('bcrypt-nodejs')
const jwt  = require('jsonwebtoken')
const keys = require('../keys')
const User = require('../models/user.model')

module.exports.login = async (req, res) => {
  const userData = await User.findOne({login: req.body.login})

  if (userData) {
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, userData.password)

    if (isPasswordCorrect) {
      const token = jwt.sign({
        login: userData.login,
        userId: userData._id
      }, keys.JWT, {expiresIn: 60 * 60})
      
      res.json({token})
    } else {
      res.status(401).json({message: 'Şifreler Uyuşmamaktadır'})
    }
  } else {
    res.status(404).json({message: 'Kullanıcı bulunamadı'})
  }
}

module.exports.createUser = async (req, res) => {
  const userData = await User.findOne({login: req.body.login})

  if (userData) {
    res.status(409).json({message: 'Bu üyelik zaten alınmış'})
  } else {

    //encryption
    const salt = bcrypt.genSaltSync(10)

    const user = new User({
      login: req.body.login,
      password: bcrypt.hashSync(req.body.password, salt)
    })

    await user.save()
    res.status(201).json(user)
  }

}

module.exports.userAll = async (req, res) => {
  try {
    const users = await User.find().sort({date: -1})
    res.json(users)
  } catch (e) {
    res.status(500).json(e)
  }
}