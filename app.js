const express=require("express");
const ejs=require("ejs");
const bodyParser=require('body-parser');
const child_process=require("child_process");
const upload=require("express-fileupload");
const mongoose=require("mongoose");
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose");
const session=require("express-session");
const { finished } = require("stream");


const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(upload());
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(session({
    secret:"i will never tell anybody my secrete.",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/mlDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.set("useCreateIndex",true);

const userScema=new mongoose.Schema({
    id:Number,
    Fname:String,
    Lname:String,
    username:String,
    password:String
});
userScema.plugin(passportLocalMongoose);

const dataScema=new mongoose.Schema({
    id:Number,
    data:JSON
});

const User=mongoose.model("User",userScema);
passport.use(User.createStrategy());


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get("/",function(req,res){
    res.sendFile(__dirname+"/home.html");
});
app.get("/home.html",function(req,res){
    res.redirect("/");
});
app.get("/img-classification",function(req,res){
    res.sendFile(__dirname+"/imgClassification.html");
});





app.post("/load-classifier",function(req,res){
    if(req.files){
        var sai=req.files.file1;
        sai.mv("./upload/img.jpg",function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log("cat/dog image has been uploaded");
                res.redirect("/loading-output");
            }
        });
    }
});

global.classifier_data="update please";
app.post("/loading-output",function(req,res){
    const python=child_process.spawn('python',['./upload/classification.py']);

    python.stdout.on('data',function(data){
        classifier_data=data.toString();
        res.redirect("/classifier-output");
    });
});

app.get("/classifier-output",function(req,res){
    res.render("droutput",{output:classifier_data});
});

//Digit recognition
app.get("/DigitRecognition",function(req,res){
    res.sendFile(__dirname+"/dr.html");
});

app.post("/dr-loading",function(req,res){
    if(req.files){
        var img=req.files.drFile;
        img.mv("./upload/drimg.jpg",function(err){
            if(err){
                console.log("err in dr image uploading");
            }
            else{
                console.log("dr image uploaded");
                res.redirect("/dr-output");
            }
        })
    }
});

app.get("/dr-output",function(req,res){
    var python=child_process.spawn('python',['./upload/drW.py']);
    python.stdout.on('data',function(data){
        dr_data=data.toString();
        res.render("droutput",{output:dr_data});
    });
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/signup",function(req,res){
    res.render("signup");
});
app.post("/signup",function(req,res){
    var data=req.body;

    // var newUser=new User({
    //     Fname:data.fname,
    //     Lname:data.lname
    // });

    // newUser.save(function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log("user details saved");
    //     }
    // });

    User.register({username:data.username},data.password,function(err,User){
        if(err){
            console.log(err);
            res.redirect("/signup");
        }
        else{
            passport.authenticate("local")(req,res,function(){

                User.update({username:data.username},{Fname:data.fname,Lname:data.lname},function(err){
                    if(err){
                        console.log("cannot update extra details");
                    }
                    else{
                        console.log("updated users extra details");
                    }
                });
                res.redirect("/");
                
            });
        }
    });
});  

app.get("/signin",function(req,res){
    res.render("signin");
});

app.post("/signin",function(req,res){
    res.send("welcome to future");
});

app.listen(process.env.PORT || "3000",function(){
    console.log("listening to port 3000");
});


