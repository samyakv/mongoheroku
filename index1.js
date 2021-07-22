var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")


const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/mydb123', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));





app.post("/sign_up", (req, res) => {
    // var name = req.body.name;
    var email = req.body.email;
    
    

    // var phno = req.body.phno;
    // var password = req.body.password;
    var initrefnum = req.body.demo;
    var newrefnum = req.body.newdemo;

    console.log("step");
    console.log("dd");
    var data = {
        "name": name,
        "email": email,
        "initrefnum": initrefnum,
        "newrefnum": newrefnum
    }


    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfull");
        console.log("dd");
    });
    // return res.redirect('index.html')
    console.log("dd");
})



app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index1.html');
}).listen(3000);


console.log("Listening on PORT 3000");
