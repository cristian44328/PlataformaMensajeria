import jwt from 'jsonwebtoken';

export const authRequire = (req, res, next) => {

    //const cookie = req.cookies
    const { token } = req.cookies

    if (!token)
        return res.status(401).json({ message: "No token, authorization denied" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({ message: "Invalid token" });
        // console.log(user);

        req.user = user;
        next();
    });
}