$(document).ready(function() {
  // Since getDay() returns a number that corresponds to the current day, we use it to select day from array
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        d = new Date(),
        today = weekdays[d.getDay()];

  // First AJAX request to ipinfo api to retrieve users location
  $.ajax({
    type: 'GET',
    url: 'http://ipinfo.io/json'
  })
  .done((result) => {
    // Assigning users city and country
    const city = result.city,
          country = result.country;

    // Variables for second api request to openweathermap api
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country,
          key = '&APPID=6e19d1444dbeeede236c3f8c31cdcc28';

    // AJAX request to openweathermap for users local weather information
    $.ajax({
    type: 'GET',
    url: url + key,
    })
    .done((result) => {
      // Assigning results to variables & converting measurements
      const city = result.name + ", " + country,
            temperature = Math.round(result.main.temp),
            celsius = Math.round(temperature - 273.15) + "°C",
            fahrenheit = Math.round(temperature * 9/5 - 459.67) + "°F",
            humidity = result.main.humidity + '%',
            windMetric = Math.round(result.wind.speed) + ' M/S',
            windImperial = Math.round(result.wind.speed * 2.236936) + ' MPH',
            forecast = result.weather[0].id,
            description = result.weather[0].main;

      // Assigning results to their appropriate elements
      $(".date").text(today);
      $(".temperature").text(fahrenheit);
      $(".location").text(city);
      $(".forecast").text(description);
      $(".humidity").text(humidity);
      $(".wind").text(windImperial);

      // Alternates between metric and imperial when forecast section is clicked
      $(".forecast-container").click(() => {
        $(".temperature").text((i, text) => {
          return text === fahrenheit ? celsius : fahrenheit;
        }).addClass("animated flipInY");
        $(".wind").text((i, text) => {
          return text === windImperial ? windMetric : windImperial;
        }).addClass("animated flipInY");

        // To reset animation, setTimeOut used to remove animate.css classes (i know...not ideal)
        setTimeout(() => {
          $(".temperature").removeClass("animated flipInY");
        }, 300);
        setTimeout(() => {
          $(".wind").removeClass("animated flipInY");
        }, 300);
      });

      // Displays appropriate weather icon depending on forecast
      switch(description) {
        case "Thunderstorm":
          $(".icon").addClass("fa fa-bolt");
            break;
        case "Rain":
        case "Drizzle":
          $(".icon").addClass("fa fa-tint");
            break;
        case "Snow":
          $(".icon").addClass("fa fa-snowflake-o");
            break;
        case "Clear":
          $(".icon").addClass("fa fa-sun-o animated fadeInUp");
            break;
        case "Clouds":
          $(".icon").addClass("fa fa-cloud");
            break;
        case "Extreme":
          $(".icon").addClass("fa fa-exclamation-triangle");
            break;
        default:
          $(".icon").addClass("fa fa-sun-o");
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
