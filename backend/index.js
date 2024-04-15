const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require("./db/users");
const Product = require('./db/Product');
const Jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cors());

const jwtkey = 'e-comm';

app.post("/signup", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;

  Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ result: "Something went wrong" });
    }
    res.send({result , auth : token})
  })

})

app.post('/login', async (req, res) => {
  if (req.body.email && req.body.password) {
    const user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ result: "Something went wrong" });
        }
        res.send({user, auth : token})
      })

    } else {
      res.send({ result: "nothing found" });
    }
  } else {
    res.send({ result: "nothing found" });
  }

})





app.post('/add', verifyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
})





app.get('/products', verifyToken, async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "no results found" })
  }

})



app.delete('/product/:id', verifyToken, async (req, res) => {
  res.send(req.params.id);

  const result = await Product.deleteOne({ _id: req.params.id });
  // console.log(result);
})


app.get('/product/:id', verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result)
  } else {
    res.send({ result: "not found" })
  }
})

app.put('/product/:id', verifyToken, async (req, res) => {
  let result = await Product.updateOne({ _id: req.params.id },
    {
      $set: req.body
    });
  res.send(result);
})


app.get('/search/:key',verifyToken, async (req, res) => {
  let result = await Product.find({
    "$or": [
      { name: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } }
    ]
  });
  res.send(result);
})


function verifyToken(req, res, next){
  let token = req.headers['authorization'];

  if(token){
    token = token.split(' ')[1];
    Jwt.verify(token, jwtkey, (err, valid)=>{
      if(err){
        res.status(401).send({result :"please provide valid token"});
      }else{
        next();
      }
    })
  }else{
    res.status(403).send({result :"please add token with header"});
  }
}

app.listen(5000);