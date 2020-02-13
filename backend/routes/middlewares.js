exports.isLoggedIn = (req, res, next) => {
    if(req.session.email){
        next();
    } else{
        res.status(401).send(false);
    }
}

exports.isLoggedInByUser = (req, res, next) => {
    if(req.session.authority == "ROLE_USER") {
        next();
    }
    else{
        res.status(403).send(false);
    }
}

exports.isLoggedInBySeller = (req, res, next) => {
    console.log(req.body);
    if(req.session.authority == "ROLE_SELLER") {
        next();
    }
    else{
        res.status(403).send(false);
    }
}

exports.isLoggedInByAdmin = (req, res, next) => {
    if(req.session.authority == "ROLE_ADMIN") {
        next();
    }
    else{
        res.status(403).send(false);
    }
}
