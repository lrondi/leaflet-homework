var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

d3.json(queryUrl, function(data) {

  var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 2.5,
    });

  L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
      maxZoom: 18,
      id:'mapbox.googleSat',
      subdomains:['mt0','mt1','mt2','mt3']
    }).addTo(myMap);
    
  function changeColor(mag){
    if (mag < 1){
      return '#5ffbf1'
    }
    else if (mag < 2){
      return '#2cedff'
    }
    else if (mag < 3){
      return '#83c4ff'
    }
    else if (mag < 4){
      return '#b5abff'
    }
    else if (mag < 5){
      return '#de8ad2'
    }
    else if (mag < 6){
      return '#e775a1'
    }
    else {
      return '#d16b6b'
    }
  };


  for (var i =0; i<data.features.length; i++){
    var coord = [data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]];
    L.circle(coord,{
      fillColor: changeColor(data.features[i].properties.mag),
      radius: data.features[i].properties.mag * 50000,
      fillOpacity: 0.75,
      color: '#000000',
      weight: 1
    }).bindPopup("<h3>"+ data.features[i].properties.place +"</h3><hr><p>" + new Date(data.features[i].properties.time) + "</p>").addTo(myMap);
  };

  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {
  
      var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 1, 2, 3, 4, 5, 6]
  
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + changeColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
  
      return div;
  };
  
  legend.addTo(myMap);
});
