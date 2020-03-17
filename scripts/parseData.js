total = 0;
death = 0;
recovery = 0;
// scale = 2;
custom_text = {};
timeString = '';

national_bubbles = [];
state_bubbles = [];
bubbles = [];

var result;


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
      defaultFill: "#f4f4eb",
      high: 'rgb(166, 189, 219)', //EB3550
      middle: '#6FE88E',
      low: '#4D4D4D',
      subhigh: 'rgb(166, 189, 219)', //EBA19E
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

function setup(argument)
{
  scale = 1.5;
  custom_text = {};
  url = "https://interactive.zeit.de/cronjobs/2020/corona/data.json";
  loadJSON(url, gotContent, 'json');

  function gotContent(data)
  {
    result = data;
    load_states_data = data.states;
    for (var i = load_states_data.length - 1; i >= 0; i--)
    {
      state = load_states_data[i].state;
      count = (load_states_data[i].count);
      recovered = (load_states_data[i].recovered);
      dead = (load_states_data[i].dead);
      count_node =
        {
          centered: state,
          fillKey: "high",
          radius: Math.sqrt(count)*scale,
          value: count,
          type: "2",
        };
      national_bubbles.push(count_node);
      recovered_node =
        {
          centered: state,
          fillKey: "middle",
          radius: Math.sqrt(recovered)*scale,
          value:recovered,
          type: "1",
        };
      national_bubbles.push(recovered_node);
      dead_node =
        {
          centered: state,
          fillKey: "low",
          radius: Math.sqrt(dead)*scale,
          value: dead,
          type: "0",
        };
      national_bubbles.push(dead_node);
      custom_text[state] = count;
    }
  document.getElementById('time').innerHTML = data.changeTimestamp;
  document.getElementById('total_number').innerHTML = data.totals.count;
  document.getElementById('death_number').innerHTML = data.totals.dead;
  document.getElementById('recovery_number').innerHTML = data.totals.recovered;
  }
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
            'rheinlandpfalz',
            'brandenburg',
            'schleswig-holstein',
            'mecklenburg-vorpommern'
            ];

  for (var j = states.length - 1; j >= 0; j--)
  {
    url = "https://raw.githubusercontent.com/ChaliZhg/corona/master/data/"+states[j]+".csv";
    d3.csv(url, function(data)
    {
      for (var i = data.length - 1; i >= 0; i--)
      {
        if (data[i].Latitude!="")
        {
          anode =
          {
            latitude: data[i].Latitude,
            longitude: data[i].Longitude,
            fillKey: "subhigh",
            radius: Math.sqrt(data[i].Fälle)*scale,
            value: parseInt(data[i].Fälle),
            centered: data[i].Bundesland,
            borderWidth: 0.5,
            type: -3,
            city: states[j],
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
            value: parseInt(data[i].Fälle),
            centered: data[i].Bundesland,
            borderWidth: 0.5,
            type: -3,
          };
          state_bubbles.push(anode);
        }

      }
    });
  }

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
      // console.log([a.value, b.value])
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
  }, 1000);



}

document.addEventListener('DOMContentLoaded', function () {
  var checkbox = document.querySelector('input[type="checkbox"]');

  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
  bubble_map.bubbles(state_bubbles, {
    popupTemplate: function (geo, data) {
      return `<div class="hoverinfo">${data.centered}: ${data.value}</div>`;
    }
  });
    } else {
  bubble_map.bubbles(national_bubbles, {
    popupTemplate: function (geo, data) {
      return `<div class="hoverinfo">${data.centered}: ${data.value}</div>`;
    }
  });
    }
  });
});