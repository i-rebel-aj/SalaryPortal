const express=require('express')

const app=express()
//Requiring Routes
const indexRoutes=require("./routes/index")

//Middlewares
app.use('/public', express.static('public'))
app.set("view engine", 'ejs')


app.use("/", indexRoutes);


app.get('/facultyHome', function(req, res){
  res.render('faculty_home');
});

app.post('/facultyHome', function(req, res){
  res.render('faculty_home');
});

app.get('/salaryRecpt', function(req, res){
  res.render('salary');
});

app.get('/applyleave', function(req, res){
  res.render('applyleave');
});


app.get('*', function(req, res){
  res.render('404');
});

app.listen(3000, ()=>{
    console.log(`Server has started at post 3000`)
})