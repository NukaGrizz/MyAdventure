const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create our User model
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// create fields/columns for User model
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        },
        motto: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            validate: {
                isDate: true
            }
        },
        hometown: {
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                is: /^[a-zA-Z\s]*$/
            }
        },
        education: {
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                is: /^[a-zA-Z\s]*$/
            }
        },
        employment: {
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                is: /^[a-zA-Z\s]*$/
            }
        },
        relationship_status: {
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                isAlpha: true
            }
        },
        hobbies: {
          type: DataTypes.STRING,
          allowNull: true,
          validate: {
            is: /^[a-zA-Z\s]*$/
          }
        },

        friends_ids: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        user_img_url: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "https://res.cloudinary.com/myadventureteam/image/upload/v1632164336/ryjaor3ui85sf5f6s0fx.jpg"
        },
    },
    {
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },

            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;
