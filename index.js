
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');

app.use(cors()); // enable cors for all routes

app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb+srv://cs157:cs157@cs157.edmri.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
   function(err) {
      if (!err) {
         console.log("Database connection successful!");
      } else {
         console.log("Connection failed :(");
         console.log(err);
      }
   }
);
// nothing to see here

const empSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
});


const Employee = mongoose.model("Employee", empSchema);

app.post("/api/employees", (req, res) => {
  let newEmployee = new Employee(req.body);

  newEmployee.save(function(err,result) {
    if (!err) {
      res.status(201).send(result);
    } else {
      res.status(400).send(err);
    }
  })
});

app.get("/api/employees", (req, res) => {
 Employee.find().exec(function(err, result) {
    if (!err) {
      res.status(200).send(result);
    }else {
      res.status(500).send(err);
    }
  })
});


app.get("/api/employees/:id", (req, res) => {
  Employee.findById(req.params.id, function(err, result) {
    if (!err) {
      res.status(200).send(result);
    } else {
      res.status(500).sent(err);
    }
  })
});


app.put("/api/employees/:id", (req, res) => {
  Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    },
    function(err, result){
      if (!err) {
        res.status(200).send(result);
      } else {
        res.status(400).send(err);
      }
    }
  )
});


app.delete("/api/employees/:id", (req, res) => {
  Employee.findByIdAndDelete(
    req.params.id,
    function(err, result) {
      if (!err) {
        res.status(200).send(result);
      } else {
        res.status(400).send(err);
      }
    }
  )
});


app.delete("/api/employees", (req, res) => {
  Employee.deleteMany(function(err, result) {
    if (!err){
      res.status(200).send();
    } else {
      res.status(400).send(err);
    }
  })
});

app.listen(process.env.PORT || 5000, () => console.log("server started"));
