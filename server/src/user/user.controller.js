const userModel = require("./user.model");
const crypter = require("../authentication");

module.exports = {
    async getUsers(req, res) {
            const users = await userModel.getAll();
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
        let checkUser = await userModel.checkByEmail(user.email);

        if (checkUser) return res.status(200).send(false);

        let hashedData = await crypter.hash(user.password);
        let objUser = {
          email: user.email,
          hashed_password: hashedData.hashedPassword, //atention here
          salt: hashedData.salt,                     // and here
          first_name: user.first_name,
          last_name: user.last_name,
          age: user.age,
          weight: user.weight,
          height: user.height,
          gender: user.gender,
          goals: user.goals,
          description: user.description,
          gym_attended: user.gym_attended,
        };

        userCreated = await userModel.create(objUser);
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
        // object to fill home user
        return validUser ? {
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          age: user.age,
          weight: user.weight,
          height: user.height,
          gender: user.gender,
          goals: user.goals,
          description: user.description,
          gym_attended: user.gym_attended,
        } : false;
      },
}