const express=require('express')

const app=express()
//Requiring Routes
const indexRoutes=require("./routes/index")

//Middlewares
app.use('/public', express.static('public'))
app.set("view engine", 'ejs')


app.use("/", indexRoutes);

app.get('*', function(req, res){
  res.render('404');
});

app.listen(3000, ()=>{
    console.log(`Server has started at post 3000`)
})