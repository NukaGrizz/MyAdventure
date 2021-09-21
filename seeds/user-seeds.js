const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
    username: 'alesmonde0',
    email: 'nwestnedge0@cbc.ca',
    password: 'password123',
    motto:'high as a kite',
    dob: '9/1/1980',
    hometown: 'miami',
    education: 'University of Miami',
    employment: 'healthcare',
    relationship_status: 'married',
    hobbies: 'photography, cycling',
    friends_ids: '2, 3, 4',
    user_img_url:'https://res.cloudinary.com/myadventureteam/image/upload/v1632164336/ryjaor3ui85sf5f6s0fx.jpg'
  },
  {
    username: 'jwilloughway1',
    email: 'rmebes1@sogou.com',
    password: 'password123',
    motto:'wheeling and dealing',
    dob: '10/1/1985',
    hometown: 'hialeah',
    education: 'University of Florida',
    employment: 'software dev',
    relationship_status: 'married',
    hobbies: 'painting',
    friends_ids: '3, 4, 5',
    user_img_url:'https://res.cloudinary.com/myadventureteam/image/upload/v1632164336/ryjaor3ui85sf5f6s0fx.jpg'
  },
  {
    username: 'iboddam2',
    email: 'cstoneman2@last.fm',
    password: 'password123',
    motto:'keep on keeping on',
    dob: '7/1/1982',
    hometown: 'denver',
    education: 'DeVry University',
    employment: '',
    relationship_status: 'single',
    hobbies: 'hiking, dancing, eating',
    friends_ids: '4, 5, 6',
    user_img_url:'https://res.cloudinary.com/myadventureteam/image/upload/v1632164336/ryjaor3ui85sf5f6s0fx.jpg'
  },
  {
    username: 'dstanmer3',
    email: 'ihellier3@goo.ne.jp',
    password: 'password123',
    motto:'into the breach once more',
    dob: '6/11/1990',
    hometown: 'tampa',
    education: '',
    employment: 'unemployed',
    relationship_status: 'single',
    hobbies: '',
    friends_ids: '9',
    user_img_url:'https://res.cloudinary.com/myadventureteam/image/upload/v1632164336/ryjaor3ui85sf5f6s0fx.jpg'
  },
  {
    username: 'djiri4',
    email: 'gmidgley4@weather.com',
    password: 'password123',
    motto:'my cat is cuter than you',
    dob: '2/15/1995',
    hometown: 'new york',
    education: 'New York University',
    employment: 'realtor',
    relationship_status: 'married',
    hobbies: 'boating, scuba diving',
    friends_ids: '7, 8',
    user_img_url:'https://res.cloudinary.com/myadventureteam/image/upload/v1632164336/ryjaor3ui85sf5f6s0fx.jpg'
  },
  {
    username: 'msprague5',
    email: 'larnout5@imdb.com',
    password: 'password123',
    motto:'looking for the best tacos',
    dob: '1/31/2000',
    hometown: 'naples',
    education: 'Florida National University',
    employment: 'nurse',
    relationship_status: '',
    hobbies: 'gym, listening to music, running',
    friends_ids: '1, 2, 3',
    user_img_url:'https://res.cloudinary.com/myadventureteam/image/upload/v1632164336/ryjaor3ui85sf5f6s0fx.jpg'
  },
  {
    username: 'mpergens6',
    email: 'hnapleton6@feedburner.com',
    password: 'password123',
    motto:'for science!',
    dob: '3/31/2005',
    hometown: 'Orlando',
    education: 'University of Florida',
    employment: 'I.T',
    relationship_status: 'single',
    hobbies: 'swimming, traveling',
    friends_ids: '3, 4, 5',
    user_img_url:'https://res.cloudinary.com/myadventureteam/image/upload/v1632164336/ryjaor3ui85sf5f6s0fx.jpg'
  },
  {
    username: 'tpenniell7',
    email: 'kperigo7@china.com.cn',
    password: 'password123',
    motto:'chasing sunsets...',
    dob: '4/10/2003',
    hometown: '',
    education: 'Keiser University',
    employment: 'Lawyer',
    relationship_status: 'divorced',
    hobbies: 'surfing, kite surfing, fishing, hunting',
    friends_ids:  '1, 3, 5',
    user_img_url:'https://res.cloudinary.com/myadventureteam/image/upload/v1632164336/ryjaor3ui85sf5f6s0fx.jpg'
  },
  {
    username: 'msabbins8',
    email: 'lmongain8@google.ru',
    password: 'password123',
    motto:'looking to network',
    dob: '1/12/2000',
    hometown: 'atlanta',
    education: 'Everglades University Orlando',
    employment: 'scuba instructor',
    relationship_status: 'widow',
    hobbies: 'traveling, car racing, painting',
    friends_ids: '2, 3, 7',
    user_img_url:'https://res.cloudinary.com/myadventureteam/image/upload/v1632164336/ryjaor3ui85sf5f6s0fx.jpg'
  },
  {
    username: 'jmacarthur9',
    email: 'bsteen9@epa.gov',
    password: 'password123',
    motto:'',
    dob: '5/20/1975',
    hometown: 'homestead',
    education: 'none',
    employment: 'farmer',
    relationship_status: 'married',
    hobbies: 'farming, eating',
    friends_ids: '5, 6, 9',
    user_img_url:'https://res.cloudinary.com/myadventureteam/image/upload/v1632164336/ryjaor3ui85sf5f6s0fx.jpg'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
