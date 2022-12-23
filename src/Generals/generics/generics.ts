import RandExp from "randexp";
const md5 = require("md5");
import bcrypt from "bcrypt";

const getPassword = () : string => {
    /* eslint-disable no-useless-escape */
    // eslint-disable-next-line prefer-regex-literals
    const passwordReg = new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9\.\-]+){6,15}$/);
    let rexp = new RandExp(passwordReg).gen();
    rexp = rexp.slice(-11) + "A@1c";
    if (/\d/.test(rexp)) return rexp;
    return rexp.replace(/.$/, (Math.floor(Math.random() * Math.floor(9))).toString());
  };
  
  const getEncryptedPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };


  export {getPassword};