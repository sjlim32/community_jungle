import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../schemas/userModel.js";

class UserService {
  constructor(User) {
    this.User = User;
  }

  async addUser(userInfo) {
    const { id, nickname, password } = userInfo;
    console.log("try signUp = ", userInfo); //debug

    const findUser = await this.User.findOne({ id: id });
    if (findUser) throw new Error(`존재하는 사용자 입니다.`);

    const hashedPassword = await bcrypt.hash(password, process.env.SALT_HASH);
    const userData = { ...userInfo, password: hashedPassword };

    const user = await this.User.create(userData);

    return user;
  }

  async logIn({ id, password }) {
    const user = await this.User.findOne({ id: id });
    if (!user) throw new Error("존재하지 않는 사용자입니다.");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw new Error("비밀번호가 일치하지 않습니다.");

    const access_token = jwt.sign(
      { userCode: user._id, userId: user.id, userName: user.nickname },
      process.env.PRIVATE_SECRET_KEY,
      { expiresIn: "5m" }
    );
    const refresh_token = jwt.sign(
      { userCode: user._id, userId: user.id, userName: user.nickname },
      process.env.PRIVATE_SECRET_KEY,
      { expiresIn: "24h" }
    );
    return { access_token, refresh_token };
  }
}

const userService = new UserService(User);

export { userService, UserService };
