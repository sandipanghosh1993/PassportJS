const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

//define model
const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
    //required: true
  },
  password: String
});

//on save hook, encrypt password
//Before saving a model, run this function
userSchema.pre('save', function (next) {
  const user = this;

  //generate a salt then run callback
  bcrypt.genSalt(10, (err, salt) => {
    if(err) { return next(err); }

    //hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if(err) { return next(err); }

      //overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) { return callback(err); }

    callback(null, isMatch);
  });
}

//create the model class
const ModelClass = mongoose.model('user', userSchema);

//export the model
module.exports = ModelClass;
