const userModel = require("./user.model");

module.exports = {
    async getUsers(req, res) {
        console.log("alo" + req.params.id)
        if(req.params.id) {
            const id = parseInt(req.params.id);
            //console.log(req.params, "req do back")
            const user = await userModel.getById(id);
            res.status(200).send(user);
        } else {
            const users = await userModel.getAll();
            res.status(200).send(users);
        }
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
        const user = await userModel.checkUser(data.email);
        if(user[0] == undefined) return false;
        const validUser = await crypter.check(
          data.password,
          user[0].hashed_password,
          user[0].salt
        );
        if (validUser === true) {
          return true;
        } else {
          return false;
        }
      },
}