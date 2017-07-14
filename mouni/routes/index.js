var express = require('express');
var router = express.Router();
var session = require('express-session');
var cva = require('./model');

router.post('/login',function(req,res){
 var Email=req.body.Email;
var Password=req.body.Password;

cva.findOne({Email:Email},function(err,cva){
if(err){
 return res.status(500).send();
}
if(!cva){
 return res.status(404).send();
}
cva.comparePassword(Password,function(err,isMatch){
if(isMatch && isMatch == true){
  req.session.cva=cva;
return res.status(200).send(cva);
  
}
else{
  return res.status(401).send();
}
});

});
});
router.get('/login',function(req,res){
if(!req.session.cva){
 return res.status(401).send({message:"Invalid Email or Password"});
}
return res.status(200).send({message:"successfully login"});
});
router.get('/logout',function(req,res){
req.session.destroy();
return res.status(200).send("successfully logout");
});
router.get('/', function(req, res ) {
 
cva.getcvas(function(err,cvas){
  if(err) throw err;
  res.json(cvas);
});
});
router.post('/', function(req,res){
  var newcva = {
 
    FirstName:req.body.FirstName,
    LastName:req.body.LastName,
    Email:req.body.Email,
    Password:req.body.Password,
    Mobl:req.body.Mobl
  };

cva.addcva(newcva,function(err,cva){
  if(err) throw err;
  res.json(cva);
   
});

});
router.put('/:_id',function(req,res){

  var newcva = {

     FirstName:req.body.FirstName,
    LastName:req.body.LastName,
    Email:req.body.Email,
    Password:req.body.Password,
    Mobl:req.body.Mobl
  }
cva.updatecva(req.params._id,update,function(err,cva){
  if(err) throw err;
  res.json(cva);
});
});
router.delete('/: _id',function(req,res){
cva.deletecva(req.params._id,function(err,cva){
  if(err) throw err;
  res.json(cva);
});
});
router.get('/:_id',function(req,res){
cva.getcva(req.params._id,function(err,cva){
  if(err) throw err;
  res.json(cva);
});
});



module.exports = router;
