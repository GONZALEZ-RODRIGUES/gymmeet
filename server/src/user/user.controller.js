const userModel = require("./user.model");
const crypter = require("../authentication");

module.exports = {
    async getUsers(req, res) {
        console.log("alo: " + req)
            const users = await userModel.getAll();
            console.log("alo apos o model: " + req)
            res.status(200).send(users);
    },

    // if exists return true, otherwise false
    async checkByEmail(req, res) {
          const email = req.body.email
          const result = await userModel.checkByEmail(email);
          result ? res.status(200).send(true) : res.status(400).send(false);
    },

    async create(req, res) {
        let user = req.body;
        userCreated = await userModel.create(user);
        res.status(200).send(userCreated);
    },
    async update(req, res) {
        let userUpdated = req.body;
        let id = parseInt(req.params.id)
        userUpdated = await userModel.update(id, userUpdated);
        res.status(200).send(userUpdated + "User updated!");
    },
    async delete(req, res) {
        let userDeleted = parseInt(req.params.id);
        let deleted = await userModel.delete(userDeleted);
        res.status(200).send(deleted);
    },
    async login(data) {
        const email = data.email
        const user = await userModel.checkByEmail(email);
        
        if(!user) return false;
        const validUser = await crypter.check(
          data.password,
          user.hashed_password,
        );
        
        return validUser ? true : false;
        // if (validUser === true) {
        //   return true;
        // } else {
        //   return false;
        // }
      },
}