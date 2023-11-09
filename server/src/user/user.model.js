const knex = require("../knex");

const users = "users";

module.exports = {
    users,
    getAll() {
        return knex
        .select({
            id: "id",
            email: "email",
            last_name: "last_name",
        }).from(users);
    },

    checkByEmail(email) {
        return knex.select({
            id: "id",
            email: "email",
            last_name: "last_name",
            first_name: "first_name",
            hashed_password: "hashed_password",
            age: "age",
            weight: "weight",
            height: "height",
            gender: "gender",
            goals: "goals",
            description: "description",
            gym_attended: "gym_attended",
        }).from(users)
        .where({email: email})
        .first();
    },
    
    getById(id) {
        return knex.select({
            id: "id",
            email: "email",
            last_name: "last_name",
        }).from(users)
        .where({id: id})
        .first();
    },


    create(user) {
        return knex(users)
            .insert([user])
            .returning('*')  
            .then((createdUser) => {
<<<<<<< HEAD
                return createdUser[0]; 
=======
                return createdUser[0];  
>>>>>>> 7411c21158be4448fc7e4bc67331c87a6954ebb2
            });
    },


    update(id, user) {
        return knex(users)
            .where("users.id", id)
            .update(user)
            .then(() => {
                return user
            })
    },

    delete(id) {
        return knex(users)
        .where({id: id})
        .del()
        .then(() => {
            return `User with id: ${id}, deleted.`
        })
    }, 
    // check by email if user exist
    checkUser(email) {
        return knex
        .select({
            id: "id",
            email: "email",
            first_name: "first_name",
            last_name: "last_name",
            hashed_password: "hashed_password",
            salt: "salt",
        }).from(users)
        .where({email: email})
    },
}