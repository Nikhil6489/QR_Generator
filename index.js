
import bodyParser from "body-parser";
import fs from "fs";
import qr from "qr-image";
import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


var qr_data="https://github.com/Nikhil6489";
const port=process.env.PORT||3000;
const app=express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
  res.render("index.ejs",{data:null});
})

app.post("/generate",(req,res)=>{
  qr_data=req.body["URL"];
  if(qr_data){
  const qr_svg = qr.image(qr_data);
  const qr_img_path=path.join(__dirname,'public','qr_img.png')
  const write=fs.createWriteStream(qr_img_path)
  qr_svg.pipe(write);
  write.on("finish",()=>{
    res.render("index.ejs", { data: `QR Generated:`+qr_data });
  })
  write.on("error",(err)=>{
    res.render("index.ejs", { data: "Error Generating QR CODE" });
  })
  }else{
    res.render("index.ejs", { data: "No QR Generated" });
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});