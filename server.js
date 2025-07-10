
const express = require('express')
const app = express()
const fs = require("fs")
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
   fs.readFile(__dirname + "/users.json", 'utf8', function (err, data) {
      if (err) {
         res.status(500).send("Error reading file");
         return;
      }
      res.end(data);
   });
});

app.get('/:id', function (req, res) {
   fs.readFile(__dirname + "/users.json", 'utf8', function (err, data) {
      if (err) {
         res.status(500).send("Error reading file");
         return;
      }
      var users = JSON.parse(data);
      var user = users[req.params.id];
      res.end(JSON.stringify(user));
   });
});

app.post('/', function (req, res) {
   fs.readFile(__dirname + "/users.json", 'utf8', function (err, data) {
      if (err) {
         res.status(500).send("Error reading file");
         return;
      }
      var users = JSON.parse(data);
      var user = req.body.user4;
      users[user.id] = user;
      res.end(JSON.stringify(users));
   });
});

app.delete('/:id', function (req, res) {
   fs.readFile(__dirname + "/users.json", 'utf8', function (err, data) {
      if (err) {
         res.status(500).send("Error reading file");
         return;
      }
      data = JSON.parse(data);
      var id = req.params.id;
      var user = data[id];
      delete data[id];
      res.end(JSON.stringify(data));
   });
});

app.put("/:id", function (req, res) {
   fs.readFile(__dirname + "/users.json", 'utf8', function (err, data) {
      if (err) {
         res.status(500).send("Error reading file");
         return;
      }
      var users = JSON.parse(data);
      var id = req.params.id;
      users[id] = req.body;
      res.end(JSON.stringify(users));
   });
});

// Use dynamic port for compatibility with Render
const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});
