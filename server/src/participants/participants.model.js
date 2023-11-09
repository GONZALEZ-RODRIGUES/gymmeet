const knex = require("../knex");

const meet_participants = "meet_participants";

module.exports = {
    meet_participants,

    create(meet) {
        return knex(meet_participants)
            .returning("*")
            .insert({
                meet_id: meet[0].meet_id,
                user_id: meet[0].user_id
            })
    },
    
    getParticipants(id) {
        
        return knex.select('meet_participants.participant_id', 'users.id', 'users.first_name', 'users.last_name', 'meet_participants.meet_id')
        .from(meet_participants)
        .join('meets', 'meet_participants.meet_id', 'meets.meet_id')
        .join('users', 'meet_participants.user_id', 'users.id')
        .where('meet_participants.meet_id', id)
        .then((result) => {
            return result
        })
        .catch((error) => {
          console.error(error);
        });
    },
}