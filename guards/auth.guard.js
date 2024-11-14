exports.isAuth = (req, res, next) => {
    if (req.session.userId) next(); 
    else res.redirect('/login');  // Redirect to login page if user is not authenticated
}

exports.notAuth = (req, res, next) => {
    if (!req.session.userId) next(); 
    else res.redirect('/');  // Redirect to home page if user is already authenticated
}