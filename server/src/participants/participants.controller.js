// const participantsModel = require("./participants.model");
// const meetsrModel = require("../meet/meet.model");
// const meet_participants = "meet_participants";

// module.exports = {
//     meet_participants,

//     async create(meet) {
//         console.log(meet[0])
//         console.log(meet)
//         return knex(meet_participants)
//             .returning("*")
//             .insert({
//                 meet_id: meet[0].meet_id,
//                 user_id: meet[0].user_id
//             })
//     },
//     //by userId
//     getUserMeets(id) {
//         return knex.select("*").from(meets)
//         .where({user_id: id})
//     },
// }