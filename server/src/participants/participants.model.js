const knex = require("../knex");

const meet_participants = "meet_participants";

module.exports = {
    meet_participants,

    create(meet) {
        console.log(meet[0].meet_id)
        return knex(meet_participants)
            .returning("*")
            .insert({
                meet_id: meet[0].meet_id,
                user_id: meet[0].user_id
            })
    },
    //by userId
    getUserMeets(id) {
        return knex.select("*").from(meets)
        .where({user_id: id})
    },
}