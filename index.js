
import bodyParser from "body-parser";
import fs from "fs";
import qr from "qr-image";
import express from "express";
import path from "path";
var qr_data="https://google.com";
const port=3000;
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
var qr_svg;
qr_svg.pipe(fs.createWriteStream('public/qr_img.png'));


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