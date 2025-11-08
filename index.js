import express from "express";
import axios from "axios";
import dotenv from "dotenv";  


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res) => {
    res.render("home.ejs"); 
});

app.get("/map", async (req, res) => {
    try {
      const response = await axios.get("https://api.wheretheiss.at/v1/satellites/" + process.env.ISS_API_ID + "?units=miles");
      const result = {
        latitude : response.latitude,
        longitude : response.longitude,
        altitude : response.altitude,
      };
      console.log(result);
      res.render("map.ejs", { data : result });
    }
    catch(error) {
      res.render("map.ejs", { content : JSON.stringify(error.reponse.data) });
    }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});