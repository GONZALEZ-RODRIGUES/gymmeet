const bcrypt = require("bcrypt");
const saltRounds = 10; //iterations to create salt

module.exports = {
  hash: hashPassword, //create hash
  check: checkPassword, //verify pw with an existent hash
};

async function hashPassword(password) { //client pw received

  const newerSalt = await bcrypt.genSalt(saltRounds); //create salt with 10 rounds
  const newerHash = await bcrypt.hash(password, newerSalt); //create a hash with client pw and created salt

  return { hashedPassword: newerHash, salt: newerSalt };
}

async function checkPassword(password, hash) {
  let bool = false;
  bool = await bcrypt.compare(password, hash);
  return bool;
}