/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import bodyParser from "body-parser";
import fs from "fs";
import qr from "qr-image";
import express from "express";
var qr_data="https://google.com";
const port=3000;
const app=express();
var qr_svg = qr.image(qr_data);
qr_svg.pipe(fs.createWriteStream('public/qr_img.png'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",(req,res)=>{
  res.render("index.ejs");
})

app.post("/generate",(req,res)=>{
  qr_data=req.body["URL"];
  if(qr_data){
  qr_svg = qr.image(qr_data);
  qr_svg.pipe(fs.createWriteStream('public/qr_img.png'));
  res.render("index.ejs",{data:"QR Generated "+qr_data});
  }
  else{
    qr_svg = qr.image(qr_data);
    qr_svg.pipe(fs.createWriteStream('public/qr_img.png'));
    res.render("index.ejs",{data:"No QR Generated"});
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});