var express = require('express');
const { Timestamp } = require('mongodb');
var router = express.Router();
var db = require('../config/connections');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/login',(req,res)=>{
  const {email,password} = req.body;
  db.get().collection('admin').findOne({email:req.body.email},(err,data)=>{
    
    if(data.password === req.body.password){
      res.render('home');
    }else{
      res.render('login',{err:'invalid email or password'});
    }
  })
})

  // router.post('/test',(req,res)=>{

  //   const {email,password} =req.body;

  //   db.get().collection('admin').insertOne({
  //     email:email,
  //     password:password
  //   }).then(()=>{
  //     res.send('data saved');
  //   })

  // })


  router.get('/home',(req,res)=>{
    db.get().collection('retailers').find().toArray((err,data)=>{
      if(err) throw err;
      // console.log(data);
      res.render('home',{data:data,date:Date.now()});
    })
    
  });

  router.post('/add_retailer',(req,res)=>{

    const inTime= req.body.intime;
    const outTime= req.body.outTime;

    

    db.get().collection('retailers').insertOne({
      name:req.body.name,
      inTime:req.body.intime,
      outTime:req.body.outtime,
      date:Date.now()
    }).then(()=>{
      db.get().collection('retailers').find().toArray((err,data)=>{
        if(err) throw err;
        // console.log(data);
        res.render('home',{data:data,date:Date.now()});
      });
      
    });
  
    
   
  })


  
  



module.exports = router;
