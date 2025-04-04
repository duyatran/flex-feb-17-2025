const bcrypt = require('bcryptjs');

const pw = "1234";

console.log("original password: ", pw);


// SHA family, MD5 
// bcrypt is a cryptographic hash function

// one way function: input => output
//   - input != output
//   - given output, you cannot figure out the input
//   - slight changes in input would make for significant in output
const hash = bcrypt.hashSync(pw, 10);
console.log("hash: ", hash);

// $2a$11$G6wBVQMGa5Z2C8aCz4iSv.r5LHAuOYR9XOhlrcMYf/n3JGWkH/bNS
const userPasswordHashWeSaveInDb = '$2a$11$G6wBVQMGa5Z2C8aCz4iSv.r5LHAuOYR9XOhlrcMYf/n3JGWkH/bNS';

const userPasswordFromUI = 'abcd123';
const result = bcrypt.compareSync(userPasswordFromUI, userPasswordHashWeSaveInDb);
console.log("result: ", result);

const result1 = bcrypt.compareSync("abcd12", userPasswordHashWeSaveInDb);
console.log("result: ", result1);

const salt = bcrypt.genSaltSync(10);
// const salt = "abcde"
console.log("salt: ", salt);
const saltedPassword = bcrypt.hashSync(pw, salt);
console.log("salted: ", saltedPassword);

const result2 = bcrypt.compareSync("1234", saltedPassword);
console.log("result2: ", result2);
// abcd123 => $2a$11$G6wBVQMGa5Z2C8aCz4iSv.r5LHAuOYR9XOhlrcMYf/n3JGWkH/bNS - from uber
// abcd123 => $2a$10$hJTrbOQOJrijrBaVgYpwUuf14VRDbPT18iabX.HQTavGuH37EgfbS - from doordash
// 1. same password
// 2. go through our password dictionary, hash every password to find the match here