const models = require("../models");
const { Op } = require("sequelize");
const crypto = require("crypto");
const session = require("express-session");

const createSalt = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf.toString("base64"));
      }
    });
  });
};

const createHashedPassword = async (inputPassword) => {
  const salt = await createSalt();

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(inputPassword, salt, 9999, 64, "sha512", (err, key) => {
      if (err) {
        reject(err);
      } else {
        resolve({ hashedPassword: key.toString("base64"), salt });
      }
    });
  });
};

const getHashedPassword = (inputPassword, salt) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(inputPassword, salt, 9999, 64, "sha512", (err, key) => {
      if (err) {
        reject(err);
      } else {
        resolve(key.toString("base64"));
      }
    });
  });
};

exports.Cpost_checkUserId = async (req, res) => {
  const user_id = req.body.user_id;
  const user = await models.User.findOne({
    where: { user_id },
  });

  if (user !== null) {
    return true;
    res.send({ result: true, message: "이미 사용중인 아이디입니다." });
  } else {
    return false;
    res.send({ result: true });
  }
};

exports.Cpost_register = async (req, res) => {
  const isUserIdExist = await checkUserId(req.body.user_id);

  if (isUserIdExist) {
    res.send({ result: false, message: "이미 사용 중인 아이디입니다." });
  } else {
    const { hashedPassword, salt } = await createHashedPassword(
      req.body.user_pw
    );

    const result = await models.User.create({
      user_id: req.body.user_id,
      user_pw: hashedPassword,
      user_name: req.body.user_name,
      user_country: req.body.user_country,
      user_salt: salt,
    });

    if (result) {
      res.send({ result: true, message: "회원가입이 완료되었습니다." });
    } else {
      res.send({
        result: false,
        message: "회언가입에 실패했습니다. 다시 시도해주세요.",
      });
    }
  }
};

exports.Cpost_login = async (req, res) => {
  const result = await models.User.findOne({
    where: {
      user_id: req.body.user_id,
    },
  });

  const dbPassword = result.dataValues.user_pw;
  const inputPassword = req.body.user_pw;
  const salt = result.dataValues.user_salt;
  const hashedPassword = await getHashedPassword(inputPassword, salt);

  if (dbPassword === hashedPassword) {
    res.send({ result: true, message: "로그인에 성공했습니다." });
  } else {
    res.send({
      result: false,
      message: "아이디 혹은 비밀번호가 맞지 않습니다.",
    });
  }
};
