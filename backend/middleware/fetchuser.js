const jwt = require('jsonwebtoken');
const JWT_SECRET = "rahulisgood$boy";


const fetchuser = (req,res, next) => {
    // Get the user : from the jwt token , and get id to req object 
    const token = req.header('auth-token');

    if(!token){
        res.status(401).send({error:" plz authenticate using a valid token"})
    }
    try {
        // we can verify token with our JWT_SECRET and || then we can get our "user": jo hamne [createuser & loginuser]response me diya tha 
        const data = jwt.verify(token , JWT_SECRET);
        // ab ham [req] me , token se jo user return mila hai use [req] me jod dete hai || ab req.user me vhi id aajayegi 
        req.user = data.user;
        // ab next function mean : async vala, jo auth.js me he vo call hoga
        next();
    }
    catch (error) {
        res.status(401).send({ error:" plz authenticate using a valid token" })
    }
}

module.exports = fetchuser;