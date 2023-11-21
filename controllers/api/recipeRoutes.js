const router = require('express').Router();
const { Recipe } = require('../../models');
const withAuth = require('../../utils/auth');
const nodemailer = require("nodemailer");

// const mailUser = process.env.mailUser;  Next version: Use .env or similar solution for secure auth.
// const mailPass = process.env.mailPass;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
      user: 'tonymagrady@gmail.com',
      pass: 'lqdywchghygtefxw'
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!recipeData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/email', withAuth, async (req, res) => {
  // async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: req.body.toEmail,
    subject: "Recipe Description",    // Subject line
    text: `${req.body.description}`,  // plain text body
    html: `${req.body.description}`,  // html body
  });
  res.json(info);
  if (!res.status(200)) {
    console.log('Response code:', res);
  }
});

module.exports = router;
