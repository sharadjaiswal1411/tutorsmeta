const Joi = require('joi');//class
const express= require('express');
const app=express();
app.use(express.json());//here we are using middleware

const courses=[
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'},

];
// app.get()
// .post
// .put
// .delete

// route is define below
app.get('/',(req,res)=>{
    res.send('hello world!');//print in webpage
    //res.send(courses);//array of no.
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);//array of no.
});

app.get('/api/courses/:id',(req,res)=>{
    //res.send(req.params.id); //send is like return
    //http://localhost:5000/api/courses/5   5 is displayed.
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) //404 data not avaliable
        res.status(404).send('given id is not found');
    res.send(course);
});

app.get('/api/date/:year/:month',(req,res)=>{
    res.send(req.params);
    //http://localhost:5000/api/date/2018/1   2018 1 is displayed.
});

app.get('/api/date/:year/:month',(req,res)=>{
    res.send(req.query);
    //http://localhost:5000/api/date/2018/1   2018 1 is displayed.
});


app.post('/api/courses',(req,res)=>{
    //designing schema
    const schema=Joi.object({
        name:Joi.string().min(3).required()
    });
    const result=schema.validate(req.body);
//    console.log(result);
    if(result.error){
        //400 Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }
    //add new course
    const course={id:courses.length+1,name:req.body.name};
    courses.push(course);
    res.send(courses);//display api.
});


app.put('/api/courses/:id',(req,res)=>{
    //look up the courses
    const cours =courses.find(c=>c.id===parseInt(req.params.id));
    //if courses not existing, return 404 (i.e. resourse not found)
    if(!cours) //404 data not avaliable
        res.status(404).send('given id is not found');
    //validate courses
    const schem=Joi.object({
        name:Joi.string().min(3).required()
    });
    const resul=schem.validate(req.body);
    //if validate courses, return 400 (i.e. Bad Request)
    if(resul.error){
        res.status(400).send(resul.error.details[0].message);
        return;
    }
    //update courses
    cours.name=req.body.name;
    
    //return update courses
    res.send(courses);

});

function validateCourse(course){
     //validate courses
     const schem=Joi.object({
        name:Joi.string().min(3).required()
    });
    return schem.validate(course);

}

app.post('/api/course',(req,res)=>{
    //designing schema
        //validate courses
    //const resul=validateCourse(req.body);
    const {error}=validateCourse(req.body); //=resul.error
    
    //if validate courses, return 400 (i.e. Bad Request)
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    //add new course
    const course={id:courses.length+1,name:req.body.name};
    courses.push(course);
    res.send(courses);//display api.
});

app.put('/api/course/:id',(req,res)=>{
    //look up the courses
    const cours =courses.find(c=>c.id===parseInt(req.params.id));
    //if courses not existing, return 404 (i.e. resourse not found)
    if(!cours) //404 data not avaliable
    {    
        return res.status(404).send('given id is not found');
    }
    
    //validate courses
    //const resul=validateCourse(req.body);
    const {error}=validateCourse(req.body); //=resul.error
    
    //if validate courses, return 400 (i.e. Bad Request)
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    //update courses
    cours.name=req.body.name;
    
    //return update courses
    res.send(courses);

});







//tutor api for update

app.put('/api/tutor/:id',(req,res)=>{
    //look up the courses
    const cours =courses.find(c=>c.id===parseInt(req.params.id));
    //if courses not existing, return 404 (i.e. resourse not found)
    if(!cours) //404 data not avaliable
    {    
        return res.status(404).send('given id is not found');
    }
    
    //validate courses
    //const resul=validateCourse(req.body);
    const {error}=validateCourse(req.body); //=resul.error
    
    //if validate courses, return 400 (i.e. Bad Request)
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    //update courses
    cours.name=req.body.name;
    
    //return update courses
    res.send(courses);

});









app.delete('/api/courses/:id',(req,res)=>{
    //look up the courses
    const cours =courses.find(c=>c.id===parseInt(req.params.id));
    //if courses not existing, return 404 (i.e. resourse not found)
    if(!cours) //404 data not avaliable
        res.status(404).send('given id is not found');
    
  
    //delete courses
    const index= courses.indexOf(cours);
    courses.splice(index,1);

    //return update courses
    res.send(courses);

});

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening on port ${port}`));//print in cmd