const userModel = require('../models/user.model'); 

exports.getSignup = (req, res)=>{
    res.render('signup'), {
        error: req.flash('error')
    }
}

exports.postSignup = (req, res, next) => { 
    const { username, email, password, confirmPassword } = req.body; 
    
    if (!username ||!email ||!password ||!confirmPassword) {
        req.flash('error', 'All fields are required.');
        return res.redirect('/signup');
    }
    userModel.createUser(username, email, password, confirmPassword)
        .then(() => {
        res.redirect('/login')
        })
        .catch(err => {
            req.flash('error', err.message);
            res.redirect('/signup'); 
    })
}

exports.getLogin = (req, res) => {
    res.render('login'), {
        error: req.flash('error')
    }
}

exports.postLogin = (req, res, next) => {
    const { email, password } = req.body;
    
    userModel.login(email, password)
        .then(user => { 
            req.session.userId = user._id;
            req.session.isAdmin = user.isAdmin; 
        })
    .catch(err => {
        req.flash('error', 'Invalid email or password.');
        res.redirect('/login');
    })
}

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirec('/')
    })
}