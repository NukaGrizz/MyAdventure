const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');

// landing page for site renders login page unless logined in which renders dashboard
router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// get single post
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_text',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username', 'user_img_url']
        }
      },
      {
        model: User,
        attributes: ['username', 'user_img_url']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      const post = dbPostData.get({ plain: true });
      User.findOne({
        attributes: { exclude: ['password'] },
        where: {
          id: req.session.user_id
        },
        include: [
          {
            model: Post,
            attributes: ['id', 'title', 'post_text', 'created_at']
          },
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'created_at'],
            include: {
              model: Post,
              attributes: ['title']
            }
          },
          {
            model: Post,
            attributes: ['title'],
            through: Vote,
            as: 'voted_posts'
          }
        ]
      })
      .then(dbUserData => {
        console.log(dbUserData)
        const user = dbUserData.get({ plain: true });
        console.log(user);
        res.render('single-post', { user, post, loggedIn: req.session.loggedIn });
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// render login page or redirect to dashboard if already logged in
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

//renders signup page or redirect to dashboard if already logged in
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
