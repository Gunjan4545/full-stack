const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://bhaveshc1509:wQR7FVGPKIa0nP5d@cluster0.1ggifzf.mongodb.net/nidhi?retryWrites=true&w=majority");

const express = require("express");
const app = express();
const session = require("express-session");
const config = require("./config");
app.use(session({secret:config.sessionSecret}));
app.use(express.static('./public'));
// app.use(express.static('./public/css'));

// const route = express();
// const auth = require("../middleware/auth");

app.set('view engine','ejs');
app.set('views','./views');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


const multer = require("multer");
const path = require("path");

app.use(express.static('public'))

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'public/Images'));
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);
    }
});
const upload = multer({storage:storage});
const Controller =  require("./controller");
app.get('/',Controller.loadhome);
app.get('/product',Controller.loadproduct);
app.get('/product1',Controller.loadproduct1);
app.get('/product2',Controller.loadproduct2);
app.get('/product3',Controller.loadproduct3);
app.get('/add',Controller.loadadd);
app.get('/login',Controller.loadlogin);
app.get('/logout',Controller.logout);
app.get('/register',Controller.loadregister);
app.get('/remove',Controller.deleteproduct);

app.post('/login',Controller.verifylogin);
app.post('/register',Controller.insertUser);
app.post('/add',upload.single('image'),Controller.addproduct);


app.listen(2000,function(){
    console.log("Server is running...")
});
