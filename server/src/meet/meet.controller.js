const meetModel = require("./meet.model");
const participantsModel = require("../participants/participants.model");

module.exports = {

    async create(req, res) {
        let meet = req.body;
        try {
          const meetCreated = await meetModel.create(meet);
          const meetParticipants = await participantsModel.create(meetCreated)
          console.log(meetParticipants)
          res.status(200).send(meetCreated);
        } 
        catch {
          res.status(500).send("Server Problem creating meet and seeding participants");
        }
    },
    //meets by user Id (he created)
    async getUserMeets(req, res) {
        if (req.params.id) {
          //by id
          try {
            const id = parseInt(req.params.id);
            const meets = await meetModel.getUserMeets(id);
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