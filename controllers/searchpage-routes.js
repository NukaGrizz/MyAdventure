const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment, Vote} = require('../models');

// get all users:  search/users and redner search users page
router.get('/users', (req, res) => {
    console.log('======================');
    User.findAll({
        attributes: [
            'username',
            'motto',
            'user_img_url'
        ]
    })
        .then(dbUserData => {
            const users = dbUserData.map(user => user.get({plain: true}));
            console.log(users);

            User.findOne({
                attributes: {exclude: ['password']},
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
                .then(currentUserData => {
                    console.log(currentUserData)
                    const user = currentUserData.get({plain: true});
                    console.log(user);
                    res.render('searchpage-users', {
                        users,
                        user,
                        loggedIn: req.session.loggedIn
                    });
                })
        }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

// get all posts: search/posts and render shearch post page
router.get('/posts', (req, res) => {
    console.log('======================');
    Post.findAll({
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
            // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
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
            const posts = dbPostData.map(post => post.get({plain: true}));
            console.log(posts)
            User.findOne({
                attributes: {exclude: ['password']},
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
                    const user = dbUserData.get({plain: true});
                    console.log(user);
                    res.render('searchpage-posts', {posts, user, loggedIn: req.session.loggedIn});
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get single post and render single post page
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
                res.status(404).json({message: 'No post found with this id'});
                return;
            }

            const post = dbPostData.get({plain: true});

            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn
            });
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
