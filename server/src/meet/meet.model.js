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
    //by !userId proximos 30 dias,
    getSuggestionMeets(userId) {
        return knex
          .select('meets.*', 'users.first_name as creator_first_name', 'users.last_name as creator_last_name')
          .from(meets)
          .join('users', 'meets.user_id', 'users.id')
          .whereNotExists(function () {
            this.select('*')
              .from('meet_participants')
              .whereRaw('meet_participants.meet_id = meets.meet_id')
              .andWhere('meet_participants.user_id', userId);
          })
          .andWhereNot({ user_id: userId })
          .andWhere('meet_date', '>=', knex.raw('CURRENT_DATE'))
          .andWhere('meet_date', '<', knex.raw(`CURRENT_DATE + 30`))
          .orderBy('meet_date');
    }
}