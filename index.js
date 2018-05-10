
$(document).ready(function () {
  pm2Data = [],
  pm10Data = [];
 
  var pm10Data = [],
      pm25Data = [];
  var result;

  var pm10length = pm10Data.length;
  var pm25length = pm25Data.length;

   
   document.getElementById("pm2").innerHTML = "20";
   document.getElementById("pm10").innerHTML = "50";

  var ws = new WebSocket('wss://' + location.host);
  ws.onopen = function () {
    console.log('Successfully connect WebSocket');
  }
  ws.onmessage = function (message) {
    console.log('receive message' + message.data);
    try {
      var obj = JSON.parse(message.data);
      if(!obj.time || !obj.params.pm10) {
        return;
      }
	  
      document.getElementById("pm2").innerHTML = obj.params.pm2;
  	  document.getElementById("pm10").innerHTML = obj.params.pm10;
		if(obj.params.Temperature)
		{
		  timeData.push(timeS);
		  temperatureData.push(obj.params.Temperature);
		  tempimsi = obj.params.Temperature;
		  humiimsi = obj.params.Humidity;
		}
		else
		{
			timeData.push(timeS);
			var xxx = Math.floor((Math.random() * 2));
			temperatureData.push(tempimsi+xxx);
			document.getElementById("temp").innerHTML = tempimsi+xxx;
		}
      // only keep no more than 50 points in the line chart
      const maxLen = 10;
      var len = timeData.length;
      if (len > maxLen) {
        timeData.shift();
        temperatureData.shift();
      }

      if (obj.params.Humidity) {
        humidityData.push(obj.params.Humidity);
      }
      if (humidityData.length > maxLen) {
        humidityData.shift();
      }
	  if (obj.params.pm2) {
		  pm2Data.push(obj.params.pm2);
	  }
	  if (pm2Data.length > maxLen)
	  {
		  pm2Data.shift();
	  }
	 if(obj.params.pm2>100){
  document.getElementById("p2g5").innerHTML = "아주나쁨";
}else if(obj.params.pm2>50){
  document.getElementById("p2g5").innerHTML = "나쁨";
}else if(obj.params.pm2>15){
  document.getElementById("p2g5").innerHTML = "보통";
}else if(obj.params.pm2>0){
  document.getElementById("p2g5").innerHTML = "좋음";
}
if(obj.params.pm10>150){
  document.getElementById("p10g6").innerHTML = "아주나쁨";
}else if(obj.params.pm2>80){
  document.getElementById("p10g6").innerHTML = "나쁨";
}else if(obj.params.pm2>30){
  document.getElementById("p10g6").innerHTML = "보통";
}else if(obj.params.pm2>0){
  document.getElementById("p10g6").innerHTML = "좋음";
}
 if(obj.params.Temperature>30){
	document.getElementById("tempg7").innerHTML = "높음";
}else if(obj.params.Temperature>20){
	document.getElementById("tempg7").innerHTML = "쾌적";
}else if(obj.params.Temperature>0){
	document.getElementById("tempg7").innerHTML = "낮음";
}
      myLineChart.update();
         
      pm10Data.push(obj.params.pm10);
      pm25Data.push(obj.params.pm2);
      rpmData.push(obj.params.rpm);
     
    
     
         
      
      
    } catch (err) {
      console.error(err);
    }
  }
	
});
