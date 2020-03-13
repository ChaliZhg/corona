total = 0;
death = 0;
recovery = 0;
scale = 3;
custom_text = {};
timeString = '';

national_bubbles = [];
state_bubbles = [];
bubbles = [];

//parse zeit's national data
d3.csv("https://interactive.zeit.de/cronjobs/2020/corona/bundeslaender.csv", function(data)
{
  for (var i = data.length - 1; i >= 0; i--) {
    if(data[i].Bundesland.length>0)
    {
      if(data[i].Bundesland=="Summe")
      {
        total = data[i].Fälle;
        death = data[i].Todesfälle;
        recovery = data[i].Genesene;
        if (death<10)
        {
          death = '0' + death.toString();
        }
      }
      else if(data[i].Bundesland=="Letzte Änderung")
      {
        timeString = data[i].Fälle;
      }
      else
      {
        if (data[i].Fälle=="")
        {
          data[i].Fälle = 0
        }
        infected_string = data[i].Fälle.toString();
        infected_string_split = infected_string.split(' ');
        infected_number = infected_string_split[0];
        anode = 
        {
          centered: data[i].Bundesland,
          fillKey: "high",
          radius: Math.sqrt(infected_number)*scale,
          value:infected_number,
          type: "2",
        };
        national_bubbles.push(anode);

        if (data[i].Todesfälle!='') {
          anode =
          {
            centered: data[i].Bundesland,
            fillKey: "low",
            radius: Math.sqrt(data[i].Todesfälle)*scale,
            value:data[i].Todesfälle,
            type: "0",
          };
          national_bubbles.push(anode);
        }
        if (data[i].Genesene!='') {
          anode =
          {
            centered: data[i].Bundesland,
            fillKey: "middle",
            radius: Math.sqrt(data[i].Genesene)*scale,
            value:data[i].Genesene,
            type: "1",
          };
          national_bubbles.push(anode);
        }
        var myString = data[i].Bundesland;
        // custom_text[myString] = data[i].Bundesland+" ("+infected_number + ")";
        custom_text[myString] = infected_number;
      }
    }
  };
  document.getElementById('time').innerHTML = timeString;
  document.getElementById('total_number').innerHTML = total;
  document.getElementById('death_number').innerHTML = death;
  document.getElementById('recovery_number').innerHTML = recovery;

});

states = ['sachsen',
          'sachsen-anhalt',
          'hessen',
          'bayern',
          'baden-wuerttemberg',
          'niedersachsen',
          'nordrhein-westfalen',
          'bremen',
          'hamburg',
          'berlin',
          'saarland',
          'thuringia',
          'rheinlandpfalz'
          ];

for (var i = states.length - 1; i >= 0; i--) {
  url = "https://raw.githubusercontent.com/ChaliZhg/corona/master/data/"+states[i]+".csv";
  d3.csv(url, function(data)
  {
    for (var i = data.length - 1; i >= 0; i--)
    {
      if (latitude: data[i].Latitude!="")
      {
        anode =
        {
          latitude: data[i].Latitude,
          longitude: data[i].Longitude,
          fillKey: "subhigh",
          radius: Math.sqrt(data[i].Fälle)*scale,
          value: data[i].Fälle,
          centered: data[i].Bundesland,
          borderWidth: 0.5,
          type: -3,
        };
        state_bubbles.push(anode);
      }
      else
      {
        anode =
        {
          centered: data[i].Bundesland,
          fillKey: "subhigh",
          radius: Math.sqrt(data[i].Fälle)*scale,
          value: data[i].Fälle,
          centered: data[i].Bundesland,
          borderWidth: 0.5,
          type: -3,
        };
        state_bubbles.push(anode);
      }

    }
  });
}


var bubble_map = new Datamap(
{
  element: document.getElementById('canvas'),
  scope: 'deu',
  responsive: true,
  geographyConfig:
  {
    popupOnHover: true,
    highlightOnHover: false,
    borderColor: '#444',
    borderWidth: 0.5,
  },
  fills:
  {
    defaultFill: "#dddddd",
    high: '#EB3550',
    middle: '#6FE88E',
    low: '#4D4D4D',
    subhigh: '#EB3550', //EBA19E
  },
  bubblesConfig:
  {
    fillOpacity:0.75,
    borderWidth: 1.5,
    borderOpacity: 1, 
    borderColor: '#FFFFFF',
    popupOnHover: true,
    radius: null,
    popupTemplate: function(geography, data)
    {
      return '<div class="hoverinfo"><strong>' + data.name + '</strong></div>';
    },
  },
// data: {
// 'Sachsen': { fillKey: 'defautlFill' },
// },
setProjection: function (element)
{
  var projection = d3.geo.mercator()
.center([16.0, 52]) // always in [East Latitude, North Longitude]
.scale(2600);
// .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
var path = d3.geo.path().projection(projection);
return { path: path, projection: projection };
}
});



//ISO ID code for city or <state></state>
setTimeout(() => {

  national_bubbles.sort(function (a, b) {
    if (a.type > b.type) {
        return -1;
    }
    if (b.type > a.type) {
        return 1;
    }
    return 0;
  });

  state_bubbles.sort(function (a, b) {
    if (a.value > b.value) {
        return -1;
    }
    if (b.value > a.value) {
        return 1;
    }
    return 0;
  });


  // only start drawing bubbles on the map when map has rendered completely.
  // bubble_map.labels({'customLabelText': custom_text});
  bubble_map.bubbles(national_bubbles, {
    popupTemplate: function (geo, data) {
      return `<div class="hoverinfo">${data.centered}: ${data.value}</div>`;
    }
  });
  bubble_map.labels({'customLabelText': custom_text, "fontSize": 40});
}, 1500);

document.addEventListener('DOMContentLoaded', function () {
  var checkbox = document.querySelector('input[type="checkbox"]');

  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
  bubble_map.bubbles(national_bubbles, {
    popupTemplate: function (geo, data) {
      return `<div class="hoverinfo">${data.centered}: ${data.value}</div>`;
    }
  });
      console.log('Checked');
    } else {
  bubble_map.bubbles(state_bubbles, {
    popupTemplate: function (geo, data) {
      return `<div class="hoverinfo">${data.centered}: ${data.value}</div>`;
    }
  });
      console.log('Not checked');
    }
  });
});