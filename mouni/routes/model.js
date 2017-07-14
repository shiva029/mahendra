var mongoose = require('mongoose');
bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;

var data = new mongoose.Schema({

   FirstName:String,
    LastName:String,
    Email:String,
    Password:String,
   Mobl:String
});
data.pre('save', function(next) {
    var cva = this;

    // only hash the password if it has been modified (or is new)
    if (!cva.isModified('Password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(cva.Password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            cva.Password = hash;
            next();
        });
    });
});
data.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.Password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

var cva =mongoose.model('cva',data);
module.exports=cva;
module.exports.getcvas= function(callback){
    cva.find(callback);
};
module.exports.addcva= function(newcva,callback){
    cva.create(newcva,callback);
};
module.exports.updatecva= function(id,newcva,callback){
    cva.findByIdAndUpdate(id,newcva,callback);
};
module.exports.deletecva= function(id,callback){
    cva.findByIdAndRemove(id,callback);
};
module.exports.getcva= function(id,callback){
    cva.findById(id,callback);
};

