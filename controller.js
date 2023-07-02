const  Add = require('./addmodel');
const user = require('./loginmodel');
const bcrypt = require ('bcrypt');




const loadhome = async(req,res)=>{
    try {
        res.render('home');

    }
    catch (error) {
        console.log(error.message);
    } 
}

const loadproduct = async(req,res)=>{
    try {
        const productlist = await Add.find({})
        res.render('product',{Add:productlist});

    }
    catch (error) {
        console.log(error.message);
    } 
}
const loadproduct1 = async(req,res)=>{
    try {
        const productlist = await Add.find({type:'Jewellery'})
        res.render('product1',{Add:productlist});

    }
    catch (error) {
        console.log(error.message);
    } 
}
const loadproduct2 = async(req,res)=>{
    try {
        const productlist = await Add.find({type:'Rukhawat'})
        res.render('product2',{Add:productlist});

    }
    catch (error) {
        console.log(error.message);
    } 
}
const loadproduct3 = async(req,res)=>{
    try {
        const productlist = await Add.find({type:'Platters'})
        res.render('product3',{Add:productlist});

    }
    catch (error) {
        console.log(error.message);
    } 
}

const loadadd = async(req,res)=>{
    try {
        res.render('add');

    }
    catch (error) {
        console.log(error.message);
    } 
}

const loadlogin = async(req,res)=>{
    try {
        res.render('login');

    }
    catch (error) {
        console.log(error.message);
    } 
}
const loadregister= async(req,res)=>{
    try {
        res.render('registeration');

    }
    catch (error) {
        console.log(error.message);
    } 
}

const securepassword = async(password)=>{
    try {
     const passwordHash = await bcrypt.hash(password,5);
     return passwordHash;
    } catch (error) {
      console.log(error.message)
    }
  }
const insertUser = async(req,res)=>{
    try {
        const username = req.body.username;
        const password = req.body.password;
        const cpassword = req.body.cpassword;
    
        if (password != cpassword) {
          return res.redirect("registeration");
        }
        
         const spassword = await securepassword(req.body.password)
        const User = new user({
          username:username,
          password:spassword,
         });
         const userData = await User.save();
    
    
         
    
         if(userData){
            //  sendVerifyMail(req.body.name, req.body.email, userData._id);
          res.render('registeration',{message:"user added succesfully"});
         }
        //  else{
        //   res.render('signup',{message:"user already exist."});
        //  }
    
        
    
    
       
      } 
      catch (error) {
          console.log(error.message);
    
      }
    }
const verifylogin = async(req,res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;
    
    
    const userData =  await user.findOne({username:username});
    
    if(userData){
       const passwordMatch = await bcrypt.compare(password,userData.password);
    
       if(passwordMatch){
        req.session.User_id = userData._id;
        res.redirect('/add');                  
                       
                     }
    
       else{
        res.render('login',{message:"Email and password is incorrect"})
       }
    }
    else{
        res.render('login',{message:"Email and password is incorrect"})
    }
    
    }
    catch(error){
        console.log(error.message);
    }
    };

const logout = async(req,res)=>{
    try{
        req.session.destroy();
        res.redirect('/');
    }
    catch(error){
        console.log(error.message)
    }
}

const addproduct = async(req,res)=>{
    try {
        
        const add = new Add({
            type:req.body.type,
            desc:req.body.desc,
            price:req.body.price,
            image:req.file.filename,
        });


       const addData = await add.save();

       if(addData){
        res.render('add',{message:"data added successfully"});
       }
       else{
        res.render('add',{message:"data not added"});
       }
    } 
    catch (error) {
        console.log(error.message);

    }
}


const deleteproduct = async(req,res)=>{
    try {
         const id = req.query.id;
          await Add.deleteOne({_id:id})
          res.redirect('/product');
    }
    catch (error) {
        console.log(error.message);
    } 
        
}


module.exports = {
    
    loadhome,
    loadproduct,
    loadproduct1,
    loadproduct2,
    loadproduct3,
    loadadd,
    loadlogin,
    verifylogin,
    logout,
    addproduct,
    insertUser,
    loadregister,
    deleteproduct

}