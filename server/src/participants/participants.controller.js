const meetModel = require("../meet/meet.model");
const participantsModel = require("./participants.model");

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
    async joinMeet(req, res) {
      let meet = req.body;
      try {
        const joinCreated = await participantsModel.joinMeet(meet)
        res.status(200).send(joinCreated);
      } 
      catch {
        res.status(500).send("Server Problem creating meet and seeding participants");
      }
  },
    // meet id, id user, name/lastname com id do meet
    async getParticipants(req, res) {
          try {
            const id = parseInt(req.params.id);
            const participants = await participantsModel.getParticipants(id);
            if (participants) {
              res.status(200).send(participants);
            } else {
              // not found
              res.status(404).send("No participants yet");
            }
          } catch (err) {
            // server side error
            res.status(500).send("Server problem.");
          }
      },

}