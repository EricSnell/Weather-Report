$(document).ready(function() {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        d = new Date(),
        today = weekdays[d.getDay()];

  $.ajax({
    type: 'GET',
    url: 'http://ipinfo.io/json'
  })
  .done((result) => {
    const city = result.city,
          country = result.country;

    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country,
          key = '&APPID=6e19d1444dbeeede236c3f8c31cdcc28';

    $.ajax({
    type: 'GET',
    url: url + key,
    })
    .done((result) => {
      const city = result.name + ", " + country,
            temperature = Math.round(result.main.temp),
            celsius = Math.round(temperature - 273.15) + "°C",
            fahrenheit = Math.round(temperature * 9/5 - 459.67) + "°F",
            humidity = result.main.humidity + '%',
            windMetric = Math.round(result.wind.speed) + ' M/S',
            windImperial = Math.round(result.wind.speed * 2.236936) + ' MPH',
            forecast = result.weather[0].id,
            description = result.weather[0].main;

      $(".date").text(today);
      $(".temperature").text(fahrenheit);
      $(".location").text(city);
      $(".forecast").text(description);
      $(".humidity").text(humidity);
      $(".wind").text(windImperial);

      $(".forecast-container").click(() => {
        $(".temperature").text((i, text) => {
          return text === fahrenheit ? celsius : fahrenheit;
        }).addClass("animated flipInY");
        $(".wind").text((i, text) => {
          return text === windImperial ? windMetric : windImperial;
        }).addClass("animated flipInY");

        setTimeout(() => {
          $(".temperature").removeClass("animated flipInY");
        }, 300);
        setTimeout(() => {
          $(".wind").removeClass("animated flipInY");
        }, 300);
      });

      switch(description) {
        case "Thunderstorm":
          $(".icon-container")
            .append("<i class='fa fa-bolt' aria-hidden='true'></i>");
            break;
        case "Rain":
        case "Drizzle":
          $(".icon-container")
            .append("<i class='fa fa-tint' aria-hidden='true'></i>");
            break;
        case "Snow":
          $(".icon-container")
            .append("<i class='fa fa-snowflake-o' aria-hidden='true'></i>");
            break;
        case "Clear":
          $(".icon-container")
            .append("<i class='fa fa-sun-o animated fadeInUp' aria-hidden='true'></i>");
            break;
        case "Clouds":
          $(".icon-container")
            .append("<i class='fa fa-cloud' aria-hidden='true'></i>");
            break;
        case "Extreme":
          $(".icon-container")
            .append("<i class='fa fa-exclamation-triangle' aria-hidden='true'></i>");
            break;
        default:
          $(".icon-container")
            .append("<i class='fa fa-sun-o' aria-hidden='true'></i>");
            break;
          break;
      }

    })
    .fail((error) => {
      console.log("Error: ", error);
    });

  })
  .fail((error) => {
    console.log("Error: ", error);
  });

});
