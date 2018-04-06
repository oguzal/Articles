# Javascript & Asynchronous programming

## Async programming in Javascript 
Asynchronous programming provides superior performance compared to synchronous programming. 
And with the promises it's now very easy to do async programming in ES6.

## Whats Is Really Async Programming ?
A good analogy to describe what async programming is ,  would be:
We have  a cook who doesn't start any  task before the previous task is finished . He gets a pizza order and then a french fries order. After he prepares the pizza and puts it into the oven he doesn't do anything until pizza is baked, which means he has a lot of idle times between tasks . This is synchronous way of working.

On the other hand we also have an async cook  who uses timer for  tasks and keeps switching between tasks to prevent idle time , he prepares the pizza into the oven, in the mean time he puts the french fries into the fryer and so on.

Obviously async cook will be utilizing his time much more efficiently and finishing  orders much quicker.

Sync Cook :  
|Make pizza|Fry French Fries|Cook Omelette|

Async cook:  
|Make pizza|Cook Omelette|  
   |Fry French Fries  

In programming we use async programming technique  to utilize idle time which happens during a  time consuming task, this task can be calls to web services or databases or something else .
During the async call  we can do other things until the result comes back, the execution flow will not be  blocked (unlike sync calls). All this can be done using promises.
Below is a sample javascript code which is using then() function (that's how we consume promises).(Here you need to send  your own API Key as "APPID" , which you can get for free from https://openweathermap.org/api.)

```javascript
var url = "http://api.openweathermap.org/data/2.5/";  
   var city = "New York";  
   var appID = "XX";  
   var commonParam = "?APPID=" + appID + "&q=" + city + "&units=imperial";  
   var urlWeather = url + "weather" + commonParam;  
   var promiseToCallWeatherApi = $.ajax({  
     url: urlWeather, dataType: 'json'  
    });  
    promiseToCallWeatherApi  
    .then(function (resultWeather) {  
       console.log("Temperature is: " + resultWeather.main.temp);  
     })  
      .catch(function (err) {  
        console.log("An error occurred getting weather info" + err);  
      })  
   console.log("Getting weather info..");  
```
The code calls a web service which provides weather info (line 9)
The response can  take less than a second time and in the mean time we want to show some message on the screen(line 16) and finally we want to show the result when it comes back (line 11). And if the call fails we want to show an error message (line 13-15)

Below is the result screen:     
![:](https://4.bp.blogspot.com/-kZrCn30WT4A/WgkFGBY4XTI/AAAAAAAAA8E/Z5yMROEIulEq-UtPlacky2fCGOVbR-kogCLcBGAs/s400/WeatherInfo1.PNG)  
As mentioned above async call  did not  block the execution and that's why the "Getting weather info" is displayed first which means line 16 is executed before the entire block of 11-14. First it made the api call on line 9, then executed line 16 , waited for the result and displayed the result after its done (line 11).

We can also chain multiple then () functions, which basically means : do this, then this then that..

```javascript
   var url = "http://api.openweathermap.org/data/2.5/";
    var city = "New York";  
    var appID = "xx";  
   var commonParam = "?APPID=" + appID + "&q=" + city + "&units=imperial";  
   var urlWeather = url + "weather" + commonParam;  
   var promiseToCallWeatherApi = $.ajax({  
      url: urlWeather, dataType: 'json'  
   });  
   promiseToCallWeatherApi  
      .then(function (resultWeather) {  
        console.log("Temperature is: " + resultWeather.main.temp);  
      })  
      .then(function (result) {  
        console.log("Enjoy the weather!");  
      })  
      .catch(function (err) {  
        console.log("An error occurred getting weather info" + err);  
      })  
    console.log("Getting weather info..");  
```
The result is:  
![](https://2.bp.blogspot.com/-JnRE3ZpknJk/WgkBDqVsB1I/AAAAAAAAA7s/d-BfTQGAOY05TUZLICWMHgOjLrv62jVPQCPcBGAYYCw/s320/WeatherInfo.PNG)


We can also make multiple api calls:
```javascript  
  var urlForecast = url + "forecast" + commonParam;  
   var promiseToCallWeatherApi = $.ajax({  
     url: urlWeather, dataType: 'json'  
   });  
    var promiseToCallForeCastApi = $.ajax({  
      url: urlForecast, dataType: 'json'  
    });  
    promiseToCallWeatherApi  
      .then(function (resultWeather) {  
       console.log("Temperature is: " + resultWeather.main.temp);  
     })  
      .then(function (result) {  
       return promiseToCallForeCastApi;  
      })  
      .then(function (resultForeCast) {  
        console.log("Forecast's first result is:" + JSON.stringify(resultForeCast.list[0].main));  
      })  
      .catch(function (err) {  
        console.log("An error occurred getting weather info" + err);  
      })  
      .then(function (result) {  
        console.log("Enjoy the weather!");  
      })  
    console.log("Getting weather info..");  
```
The result is as below:  
![](https://3.bp.blogspot.com/-nmAdlZtpARA/WgkyHKRXPMI/AAAAAAAAA8g/BSQVd6cz_qkQTN4-ijamKPz_JuE1jgF2ACLcBGAs/s640/Weather2.PNG)  
In the above I had to return the result of the call in line 13 so that the next then() function in the chain (line 15) will get the result as a parameter(resultForeCast).

The catch block above is applicable to both the then() functions . 
 So to identify where the error happened you can create some if else statements  inside the catch block and handle different type of errors .