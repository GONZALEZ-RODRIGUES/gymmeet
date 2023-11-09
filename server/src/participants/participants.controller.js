const meetModel = require("../meet/meet.model");
const participantsModel = require("./participants.model");

module.exports = {

    async create(req, res) {
        let meet = req.body;
        try {
          const meetCreated = await meetModel.create(meet);
          const meetParticipants = await participantsModel.create(meetCreated)
          console.log(meetParticipants)
          console.log(meetCreated)
          res.status(200).send(meetCreated);
        } 
        catch {
          res.status(500).send("Server Problem creating meet and seeding participants");
        }
    },
    //meets by user Id (he created)
    async getParticipants(req, res) {
        if (req.params.id) {

          try {
            const id = parseInt(req.params.id);
            const participants = await participantsModel.getParticipants(id);
            console.log(participants);
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
        } else {
          // by user_name and pw
          try {
            const user = await userModel.checkUser(req.body.user_name);
            const validUser = await crypter.check(
              req.body.password,
              user[0].hashed_password,
              user[0].salt
            );
            if (validUser) {
              res.status(200).send(user);
            } else {
              res.status(404).send("Invalid user or password");
            }
          } catch (err) {
            res.status(500).send("Server problem. user name and pw");
          }
        }
      },

}