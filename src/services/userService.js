import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../schemas/userModel.js";

class UserService {
  constructor(User) {
    this.User = User;
  }

  async addUser(userInfo) {
    const { id, nickname, password } = userInfo;

    const findUser = await this.User.findOne({ id: id });
    if (findUser) throw new Error(`존재하는 사용자 입니다.`);

    const hash = parseInt(process.env.SALT_HASH);
    const hashedPassword = await bcrypt.hash(password, hash);
    const userData = { ...userInfo, password: hashedPassword };

    const user = await this.User.create(userData);
    if (!user) throw new Error(`서버 문제로 회원가입에 실패했습니다.`);

    return user;
  }

  async logIn({ id, password }) {
    const user = await this.User.findOne({ id: id });
    if (!user) throw new Error("존재하지 않는 사용자입니다.");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw new Error("비밀번호가 일치하지 않습니다.");

    const access_token = jwt.sign({ type:"access", userCode: user._id }, process.env.PRIVATE_SECRET_KEY, { expiresIn: "10h" });
    const refresh_token = jwt.sign({ type:"refresh", userCode: user._id }, process.env.PRIVATE_SECRET_KEY, { expiresIn: "24h" });
    return { access_token, refresh_token };
  }

  async getUser(access_token) {
    const user = await User.findById({ _id: access_token.userCode });
    if (!user) throw new Error(`DB에서 일치하는 사용자를 찾지 못했습니다.`);

    return user;
  }
}

const userService = new UserService(User);

export { userService, UserService };
