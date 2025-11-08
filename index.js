import express from "express";
import axios from "axios";
import dotenv from "dotenv";  


const app = express();
const port = 3000;
dotenv.config(); 

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res) => {
    res.render("home.ejs"); 
});

app.get("/map", async (req, res) => {
    try {
      console.log(process.env.ISS_API_ID);
      const response = await axios.get("https://api.wheretheiss.at/v1/satellites/" + process.env.ISS_API_ID + "?units=miles");
      const result = {
        latitude : response.data.latitude,
        longitude : response.data.longitude,
        altitude : response.data.altitude,
      };
      
      res.render("map.ejs", { data : result });
    }
    catch(error) {
      res.render("map.ejs", { content : JSON.stringify(error) });
    }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});