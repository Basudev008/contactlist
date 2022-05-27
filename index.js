const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded()); 
app.use(express.static('assets'));


//  middleware 1

// app.use(function(req,res,next){
//     console.log('middleware 1 called');
//     next();
// })

// middleware 2

// app.use(function(req,res,next){
//     console.log('middleware 2 called');
//     next();
// })



var contactList = [{
    name : "Arpan",
    phone : "1111111111"
},
{
    name : " Stark",
    phone : "1234567890"
},{
    name:"CodingNinjas",
    phone :"8394930294"
}
]

app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contact from db');
            return;

        }

        return res.render('home',{
            title : "Contacts List",
            contacts_list : contacts
        });
    });
   
});

app.post('/create-contact', function(req,res){
    // contactList.push({
    //     name: req.body.name,
    //     phone : req.body.phone
    // });

    Contact.create({
        name: req.body.name,
        phone : req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error in creating a contact');
            return;
        }

        console.log('*********',newContact);
        return res.redirect('back');
    });
    
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title: "Let us play with ejs"
    });
})


app.get('/delete-contact',function(req,res){
    //get the id from query in the url
    let id = req.query.id;

    //find the contact in the database using id and delete it
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log(err);
            return;
        }

        return res.redirect('back');
    });

    
});



app.listen(port,function(err){
    if(err){
        console.log('Error',err);
    }
    console.log('Yup! my express server is running on port',port);
})