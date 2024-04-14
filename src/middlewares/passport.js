import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../schemas/userModel.js";
import secretOrKey from "./key.js";

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

const passportConfig = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findOne({ id: jwt_payload.id })
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.error(err));
    })
  );
};

export default passportConfig;
