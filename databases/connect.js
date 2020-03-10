const orm = require('orm');

orm.connect("postgres://fbpmikuirpyucp:db8eb433e3f6c14f2eaa226f3b583614b5d7ea5d71207c6f48b0900b70486a7e@ec2-54-217-204-34.eu-west-1.compute.amazonaws.com:5432/del3tp43se4rda", function (err, db) {
  if (err) throw err;
  console.log('Connect successfull');
});