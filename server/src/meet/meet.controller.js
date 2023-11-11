const meetModel = require("./meet.model");
const participantsModel = require("../participants/participants.model");
const dayjs = require('dayjs')

module.exports = {

    async create(req, res) {
        let meet = req.body;
        try {
          const meetCreated = await meetModel.create(meet);
          const meetParticipants = await participantsModel.create(meetCreated)

          res.status(200).send(meetCreated);
        } 
        catch {
          res.status(500).send("Server Problem creating meet and seeding participants");
        }
    },
    //meets by user Id (he created)
    async getUserMeets(req, res) {

          try {
            const id = parseInt(req.params.id);
            const meets = await meetModel.getUserMeets(id);
            const joinedMeets = await participantsModel.getParticipants(id);
            if (meets) {
              res.status(200).send(meets);
            } else {
              // not found
              res.status(404).send("User without created meets");
            }
          } catch (err) {
            // server side error
            res.status(500).send("Server problem.");
          }
      },

      async getSuggestionMeets(req, res) {
        //id user
        
          const id = parseInt(req.params.id);
          const sMeets = await meetModel.getSuggestionMeets(id);

          if(sMeets) {
            res.status(200).send(sMeets);
          } else {
            res.status(404).send("No meets to suggest");
          }

      },

}