const express = require("express");
const { getWeather } = require("./utlis/getWeather");
const path = require("path");
const app = express();
const pathPublic = path.join(__dirname, "./public");
const PORT = process.env.PORT || 3000;

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
