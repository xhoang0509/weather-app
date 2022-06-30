const asyncRequest = require("async-request");
const getWeather = async (address) => {
  const token = "17fe5c5cd5b5c72f9884640182cc4aa7";
  const url = `http://api.weatherstack.com/current?access_key=${token}&query=${address}`;
  try {
    const response = await asyncRequest(url);
    const data = await JSON.parse(response.body);
    return {
      success: true,
      temperature: data.current.temperature,
      wind_speed: data.current.wind_speed,
      precip: data.current.precip,
      cloudcover: data.current.cloudcover,
      country: data.location.country,
      region: data.location.region,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error,
    };
  }
};

const express = require("express");
const async = require("hbs/lib/async");
const path = require("path");
const app = express();
const pathPublic = path.join(__dirname, "./public");
const PORT = 3000;

app.use(express.static(pathPublic));
app.set("view engine", "hbs");

app.get("/", async (req, res) => {
  const params = req.query;
  const location = params.address;
  if (location) {
    const weather = await getWeather(location);
    res.render("weather", {
      isSearch: true,
      temperature: weather.temperature,
      wind_speed: weather.wind_speed,
      precip: weather.precip,
      cloudcover: weather.cloudcover,
      country: weather.country,
      region: weather.region,
    });
  } else {
    res.render("weather", {
      isSearch: false,
    });
  }
});

app.listen(PORT, () => {
  console.log(`app run on http://localhost:${PORT}`);
});
