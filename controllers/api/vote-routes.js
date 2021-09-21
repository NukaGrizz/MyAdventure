const router = require('express').Router();
const sequelize = require('../../config/connection');
const router = require('express').Router();
const { User, Vote } = require('../../models');


router.get('/', (req, res) => {
 // find a vote by its `id`
  // be sure to include its associated data
  Vote.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Vote,
        attributes: ['id', 'user_id', 'post_id', 'created_at']
      }]
  })
  .then(dbVoteData => {
    if (!dbVoteData) {
      console.log("No vote found with this id'");
    } else {
        return;
    }
    res.json(dbVoteData);
  })
});

router.post('/', (req, res) => {
  Vote.create(req.body)
  .then((dbVoteData) => res.json(dbVoteData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});




router.put('/:id', (req, res) => {
    // update a tag's name by its `id` value
  Vote.update(req.body,
    {
      where: {
        id: req.params.id,
      },
    }
  )
        .then(dbVoteData => {
          if (!dbVoteData[0]) {
            res.status(404).json({ message: 'No vote found with this id' });
            return;
          }
          res.json(dbVoteData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });





module.exports = router;
