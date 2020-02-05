'use strict';
const Sequelize = require('sequelize');

//Book model
module.exports = (sequelize) => {
    class Book extends Sequelize.Model {

    }
    //static class init() method on the model name (Book) to initialize and configure the model
    Book.init({
        title: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: {
                    msg: 'Title is required'
                }
            }
        },
        author: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: {
                    msg: 'Author is required'
                }
            }
        },
        genre: Sequelize.STRING,
        year: Sequelize.INTEGER
    }, { sequelize }) //required option sequelize property that defines the sequelize instance to attach to the model

    return Book
}
