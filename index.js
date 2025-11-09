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

function roundTo3Decimals(num) {
  return Math.floor(num * 10000)/10000;
}

app.get("/map", async (req, res) => {
    try {
      const response = await axios.get("https://api.wheretheiss.at/v1/satellites/" + process.env.ISS_API_ID + "?units=miles");
      const result = {
        latitude : roundTo3Decimals(response.data.latitude),
        longitude : roundTo3Decimals(response.data.longitude),
        altitude : roundTo3Decimals(response.data.altitude) + " miles",
        center : response.data.latitude + "," + response.data.longitude,
      };
      
      res.render("map.ejs", { data : result , maps_key : process.env.MAPS_API_KEY });
    }
    catch(error) {
      res.render("map.ejs", { content : JSON.stringify(error) });
    }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});