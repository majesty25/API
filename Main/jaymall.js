const express = require('express');
const app = express();
const mysql = require('mysql2');
const Joi = require('joi');
const bodyParser = require('body-parser');
const { Router } = require('express');
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

const con = mysql.createConnection({
    host: 'localhost',
    user: 'Majesty',
    password: 'JOE892550.bitcoin',
    database: 'majesty_store'
});

//RETREIVING USER FROM THE DATABASE 
app.get('/customers/:email/:password', async (req, res) => { 
    con.connect(function(err) {
      if (err) {
        return console.error('error: ' + err.message);
      }
      else{
        con.query("SELECT * FROM user", function (err, result) {    
        const email = req.params.email;
        const password = req.params.password;

        const cust = result?result.filter(function(row) {    
          return  (row.Email === email && row.Password === password);
        }): [];
        console.log(cust);
        res.send(JSON.stringify(cust));
      });
      } 
      

      console.log('Connected to the MySQL server.');
    }); 

});

//ADDING USER TO THE DATABASE
app.post('/CUSTOMER', async (req, res) => {
    const user = req.body; 
    const name = user.name; 
    const age = user.age; 

    //USER INPUT VALIDATION SCHEMA
    const schema = Joi.object({ 
      name: Joi.string() .min(6) .required(),
      age: Joi.number().required()
    });

    const validation = schema.validate(user);    

      //CHECKING SENDING VALIDATION ERROR MESSAGE IF THERE IS ANY
      if (validation.error){
        res.status(400).send(validation.error.details[0].message);
        re(validation.error.details[0].message);
        
        return;
      }
      con.connect(function(err) {      
            var sql = `INSERT INTO customer (Name, Age) VALUES ('${user.name}', '${user.age}')`;
            con.query(sql, function (err) {
                if (err) throw err;
                console.log("1 record inserted");
             });
            });
            res.send('Insrted'); 
    
});


//RETRIEVING ITEMS FROM THE DATABASE
app.get('/items', (req, res) => {
     con.connect(function(err) {
      if (err) {
        console.error('error: ' + err.message);
        res.status.send(err.message);
        return 
      }
      else{
        con.query("SELECT * FROM item", function (err, result) {
          //CHECKING IF TABLE EXIST
          if (err){
             console.error('error: ' + err.message);
             res.send([]);
          } 
          else{
            const items = result?result.filter(function(row) {    
          return  row;
        }): [];
        console.log(items);
        res.send(JSON.stringify(items));
          }        
        
      });
      } 
      

      console.log('Connected to the MySQL server.');
    }); 

});

app.get('/USER', (req, res) => {
    res.send("New router");
});





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});