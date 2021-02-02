const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 8000;

const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
const staticPath = path.join(__dirname, "../public")
app.set('view engine', 'hbs')
app.set("views", viewsPath);
hbs.registerPartials(partialPath);
app.use(express.static(staticPath));
// routing
app.get("/", (req,res) => {
    res.render("index")
})

app.get("/about", (req,res) => {
    res.render("about")
})

app.get("/weather", (req,res) => {
    res.render("weather")
})

app.get("*", (req,res) => {
    res.render("404", {
        errorMsg : "Oops! Page can't be found"
    })
})

app.listen(port, ()=>{
    console.log(`Listening to port number ${port}`);
})