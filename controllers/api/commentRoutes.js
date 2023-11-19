const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
    try {
      console.log(req.body.body)
      const newComment = await Comment.create({
        body: req.body.body,
        recipe_id: req.body.recipe_id,
        user_id: req.session.user_id,
      });
  
      console.log(newComment);
      res.status(200).json(newComment);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  });

  router.delete('/:id', withAuth, async (req, res) => {
    console.log("hello")
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;