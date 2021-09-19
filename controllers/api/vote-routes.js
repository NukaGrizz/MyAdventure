const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Vote } = require('../../models');
const withAuth = require('../../utils/auth');


  router.put('/upvote', withAuth, (req, res) => {
    // expects positive vote data
    Post.updateVote(
      { 
        ...req.body, 
        user_id: req.session.user_id, 
        negative_positive_vote: req.body.negative_positive_vote }, 
        { Vote, Comment, User })
      .then(updatedVoteData => res.json(updatedVoteData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.put('/:id', withAuth, (req, res) => {
    Post.update(
      {
        post_id: req.body.post_id
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(updatedVoteData => {
    if (!updatedVoteData) {
      res.status(404).json({ message: 'No vote found with this id' });
      
    } else {
      return (true);
    }
  });
}); 




  // then right after it make a near identical statement 
  // called downvote but make it do false for boolean
  router.put('/downvote', withAuth, (req, res) => {
    // custom static method created in models/Post.js
    Post.downvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
      .then(updatedVoteData => res.json(updatedVoteData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
 router.put('/:id', withAuth, (req, res) => {
  Post.update(
    {
      post_id: req.body.post_id
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(updatedVoteData => {
  if (!updatedVoteData) {
    res.status(404).json({ message: 'No vote found with this id' });
    
  } else {
    return (false);
  }

})

}); 

module.exports = router;