const knex = require("../knex");

const meets = "meets";

module.exports = {
    meets,

    create(meet) {
        return knex(meets)
            .returning("*")
            .insert([meet])
    },
    //by userId
    getUserMeets(id) {
        return knex.select("*").from(meets)
        .where({user_id: id})
    },
}