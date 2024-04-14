import { userService } from "../services/userService.js";

class UserController {
  async signUp(req, res, next) {
    const userInfo = req.body;
    try {
      req.data = await userService.addUser(userInfo);
      next();
    } catch (err) {
      next(err);
    }
  }

  async signIn(req, res, next) {
    const { id, nickname, password } = req.body;
    console.log("login proceeding,, ", { id }); //debug//
    try {
      const { access_token, refresh_token } = await userService.logIn({ id, password });
      // ? 로컬에서는 http로 api 통신이 이루어져 https인지 확인하는 secure 때문에 set cookie 불가
      // res.cookie("access", access_token, {
      //   secure: true,
      //   httpOnly: true,
      //   sameSite: "None",
      // });

      // res.cookie("refresh", refresh_token, {
      //   secure: true,
      //   httpOnly: true,
      //   sameSite: "None",
      // });
      req.data = { access_token, refresh_token };

      next();
    } catch (err) {
      next(err);
    }
  }

  async getUserName(req, res, next) {
    const userToken = req.user;

    try {
      if (!userToken) next(err);
      const user = await userService.getUser(userToken);

      console.log(`getUserName = user`, user.nickname); //debug//
      req.data = { _id: user._id, name: user.nickname, likedPosts: user.likedPosts };
      next();
    } catch (err) {
      next(err);
    }
  }
}

const userController = new UserController();

export { userController };
