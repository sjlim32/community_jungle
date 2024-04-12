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
    console.log("login proceeding,, ", { id });
    try {
      const { access_token, refresh_token } = await userService.logIn({ id, password });
      // res.cookie("token", access_token, {
      //   secure: true,
      //   httpOnly: true,
      //   sameSite: "None",
      // });

      // res.cookie("refresh", refresh_token, {
      //   secure: true,
      //   httpOnly: true,
      //   sameSite: "None",
      // });
      res.setHeader("Set-Cookie", access_token, refresh_token);

      next();
    } catch (err) {
      next(err);
    }
  }
}
const userController = new UserController();

export { userController };
