const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const user = mongoose.model("user" , userSchema);

// Hash the password before saving it to the database
exports.createUser = (username, email, password) => {
  return bcrypt.hash(password, 10).then((hashedPassword) => {
    let user = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    return user.save();
  });
};
exports.login = (email, password)=>{
    return new Promise((resolve, reject) => { 
        User.findOne({ email: email }).then(user => {
            if (!user) {
                reject('User not found');
            } else {
                bcrypt.compare(password, user.password).then(same => {
                    if (!same) {
                        reject("Incorrect Password")
                    } else {
                        resolve(user);
                    }
                })
            }
        })

    })
}