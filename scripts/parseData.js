zeit_infections = 0;
zeit_deaths = 0;
zeit_recoveries = 0;
// scale = 2;
zeit_custom_text = {};
timeString = '';
zeit_time = '';

zeit_bubbles = [];
state_bubbles = [];
bubbles = [];

morgen_bubbles =[];
morgen_custom_text = {};
morgen_infections = 0;
morgen_deaths = 0;
morgen_recoveries = 0;
morgen_time = '';

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
      high: '#d14f69', //EB3550
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
  scale = 1.0;
  // zeit_custom_text = {};
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
      zeit_bubbles.push(count_node);
      recovered_node =
        {
          centered: state,
          fillKey: "middle",
          radius: Math.sqrt(recovered)*scale,
          value:recovered,
          type: "1",
        };
      zeit_bubbles.push(recovered_node);
      dead_node =
        {
          centered: state,
          fillKey: "low",
          radius: Math.sqrt(dead)*scale,
          value: dead,
          type: "0",
        };
      zeit_bubbles.push(dead_node);
      zeit_custom_text[state] = count;
    }
    zeit_infections = data.totals.count;
    zeit_deaths = data.totals.dead;
    zeit_recoveries = data.totals.recovered;
    zeit_time = data.changeTimestamp;
  document.getElementById('time').innerHTML = data.changeTimestamp;
  document.getElementById('total_number').innerHTML = data.totals.count;
  document.getElementById('death_number').innerHTML = data.totals.dead;
  document.getElementById('recovery_number').innerHTML = data.totals.recovered;
  // console.log(zeit_bubbles.length);
  }


  d3.csv("https://interaktiv.morgenpost.de/corona-virus-karte-infektionen-deutschland-weltweit/data/Coronavirus.current.v2.csv", function(data)   
  {
    for (var i = data.length - 1; i >= 0; i--)
    {
      if((data[i].parent=="Deutschland") && (data[i].label!="Repatriierte"))
      {
        if (data[i].date>morgen_time)
        {
          morgen_time = data[i].date;
        }
        state = data[i].label;
        count = parseInt(data[i].confirmed);
        recovered = parseInt(data[i].recovered);
        dead = parseInt(data[i].deaths);
        if (isNaN(count))
        {
          count = 0;
        }
        if (isNaN(recovered))
        {
          recovered = 0;
        }
        if (isNaN(dead))
        {
          dead = 0;
        }
        morgen_infections += (count);
        morgen_recoveries += (recovered);
        morgen_deaths += (dead);
        count_node =
          {
            centered: state,
            fillKey: "high",
            radius: Math.sqrt(count)*scale,
            value: count,
            type: "2",
          };
        morgen_bubbles.push(count_node);
        recovered_node =
          {
            centered: state,
            fillKey: "middle",
            radius: Math.sqrt(recovered)*scale,
            value:recovered,
            type: "1",
          };
        morgen_bubbles.push(recovered_node);
        dead_node =
          {
            centered: state,
            fillKey: "low",
            radius: Math.sqrt(dead)*scale,
            value: dead,
            type: "0",
          };
        morgen_bubbles.push(dead_node);
        morgen_custom_text[state] = count;

      }
    }
  // console.log(morgen_bubbles.length);
  });


  setTimeout(() => {

  zeit_bubbles.sort(function (a, b) {
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
    // bubble_map.labels({'customLabelText': zeit_custom_text});
    bubble_map.bubbles(zeit_bubbles, {
      popupTemplate: function (geo, data) {
        return `<div class="hoverinfo">${data.centered}: ${data.value}</div>`;
      }
    });
    bubble_map.labels({'customLabelText': zeit_custom_text, "fontSize": 40});
  }, 1000);



}

document.addEventListener('DOMContentLoaded', function () {
  var checkbox = document.querySelector('input[type="checkbox"]');

  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      removeElementsByClass("labels");
      bubble_map.labels({'customLabelText': zeit_custom_text, "fontSize": 40});
      document.getElementById('total_number').innerHTML = zeit_infections;
      document.getElementById('recovery_number').innerHTML = zeit_recoveries;
      document.getElementById('death_number').innerHTML = zeit_deaths;
      document.getElementById('time').innerHTML = zeit_time;
  bubble_map.bubbles(zeit_bubbles, {
    popupTemplate: function (geo, data) {
      return `<div class="hoverinfo">${data.centered}: ${data.value}</div>`;
    }
  });
    }
    else
    {

      removeElementsByClass("labels");
      bubble_map.labels({'customLabelText': morgen_custom_text, "fontSize": 40});
      document.getElementById('total_number').innerHTML = morgen_infections;
      document.getElementById('recovery_number').innerHTML = morgen_recoveries;
      document.getElementById('death_number').innerHTML = morgen_deaths;
      document.getElementById('time').innerHTML = morgen_time;
  bubble_map.bubbles(morgen_bubbles, {
    popupTemplate: function (geo, data) {
      return `<div class="hoverinfo">${data.centered}: ${data.value}</div>`;
    }
  });
    }
  });
});


function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    for (var i = elements.length - 1; i >= 0; i--) {
      elements[i].innerHTML = "";
    }
}