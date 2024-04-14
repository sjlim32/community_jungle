import jwt from "jsonwebtoken";

function loginRequired(req, res, next) {
  const userToken = req.headers["authorization"]?.split(" ")[1];
  console.log(`middleware-userToken :::`, userToken); //debug//
  if (!userToken || userToken === "null") {
    res.status(401).json({
      result: "Unauthorized-approach",
      reason: "회원만 이용할 수 있는 서비스입니다.",
    });

    return;
  }

  try {
    const jwtDecoded = jwt.verify(userToken, process.env.PRIVATE_SECRET_KEY);
    req.user = jwtDecoded;
    next();
  } catch (error) {
    res.status(401).json({
      result: "Unauthorized-approach",
      reason: "인증되지 않은 정보 입니다.",
    });

    return;
  }
}

export { loginRequired };
