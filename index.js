var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const mailTransporter = require('./mail')
// const { getMaxListeners } = require("./mail")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/mydb22', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));





app.post("/sign_up", (req, res) => {
    // var name = req.body.name;
    var email1 = req.body.email;
    console.log(req.body);
    // var phno = req.body.phno;
    // var password = req.body.password;
    // var initrefnum = req.body.demo;
    // var newrefnum = req.body.newdemo;

    console.log("step1");

    var data = {
        // "name": name,
        "email": email1
        // "initrefnum": initrefnum,
        // "newrefnum": newrefnum
    }


    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    
    mailTransporter.sendMail({
        from: 'entpsave@gmail.com',  //this should be same as above auth.user
        to: `${req.body.email}`,
        subject: 'Test',
        text: 'hello',
        html: `Hello  thank you for contacting. We will get in touch`
      }).then(res=>{
          console.log("success........", res)
        //   resp.send(`email sent to ${req.body.email} successfully`);
      }).catch(e=>{
          console.log("failed........", e)
      });
      
      return res.redirect('index.html')

})



app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index1.html');
}).listen(3000);


console.log("Listening on PORT 3000");





