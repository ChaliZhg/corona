yesterday_infections = 0;
yesterday_deaths = 0;
yesterday_recoveries = 0;
// scale = 2;
yesterday_custom_text = {};
timeString = '';
yesterday_time = '';
yesterday_bubbles = [];
yesterday_url = "https://teaof.life/corona/data/";
var today = new Date();
// var my_date = today.getDate();
var my_date = 25;
var my_month = today.getMonth()+1;
var my_year = today.getFullYear();
yesterday_url += (my_date-1).toString()+"0"+my_month.toString()+my_year.toString()+".csv";
document.getElementById('yesterday_date').innerHTML = "Yesterday ("+(my_date-1).toString()+".0"+my_month.toString()+")";
state_bubbles = [];
bubbles = [];

today_bubbles =[];
today_custom_text = {};
today_infections = 0;
today_deaths = 0;
today_recoveries = 0;
today_time = '';
today_url = "https://interaktiv.morgenpost.de/corona-virus-karte-infektionen-deutschland-weltweit/data/Coronavirus.current.v2.csv";


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

  d3.csv(today_url, function(data)   
  {
    for (var i = data.length - 1; i >= 0; i--)
    {
      if((data[i].parent=="Deutschland") && (data[i].label!="Repatriierte"))
      {
        if (data[i].date>today_time)
        {
          today_time = data[i].date;
        }
        state = data[i].label;
        count = parseInt(data[i].confirmed);
        recovered = parseInt(data[i].recovered);
        dead = parseInt(data[i].deaths);
        if (state=="nicht zugeordnet")
          continue;
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
        today_infections += (count);
        today_recoveries += (recovered);
        today_deaths += (dead);
        count_node =
          {
            centered: state,
            fillKey: "high",
            radius: Math.sqrt(count)*scale,
            value: count,
            type: "2",
          };
        today_bubbles.push(count_node);
        recovered_node =
          {
            centered: state,
            fillKey: "middle",
            radius: Math.sqrt(recovered)*scale,
            value:recovered,
            type: "1",
          };
        today_bubbles.push(recovered_node);
        dead_node =
          {
            centered: state,
            fillKey: "low",
            radius: Math.sqrt(dead)*scale,
            value: dead,
            type: "0",
          };
        today_bubbles.push(dead_node);
        today_custom_text[state] = count;

      }
    }

  today_bubbles.sort(function (a, b) {
    if (a.type > b.type) {
        return -1;
    }
    if (a.value > b.value) {
        return -1;
    }
    return 0;
  });

  document.getElementById('time').innerHTML = today_time;
  document.getElementById('total_number').innerHTML = today_infections;
  document.getElementById('death_number').innerHTML = today_deaths;
  document.getElementById('recovery_number').innerHTML = today_recoveries;
  // console.log(today_bubbles.length);
  });

  d3.csv(yesterday_url, function(data)   
  {
    for (var i = data.length - 1; i >= 0; i--)
    {
      if((data[i].parent=="Deutschland") && (data[i].label!="Repatriierte"))
      {
        if (data[i].date>yesterday_time)
        {
          yesterday_time = data[i].date;
        }
        state = data[i].label;
        count = parseInt(data[i].confirmed);
        recovered = parseInt(data[i].recovered);
        dead = parseInt(data[i].deaths);
        if (state=="nicht zugeordnet")
          continue;
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
        yesterday_infections += (count);
        yesterday_recoveries += (recovered);
        yesterday_deaths += (dead);
        count_node =
          {
            centered: state,
            fillKey: "high",
            radius: Math.sqrt(count)*scale,
            value: count,
            type: "2",
          };
        yesterday_bubbles.push(count_node);
        recovered_node =
          {
            centered: state,
            fillKey: "middle",
            radius: Math.sqrt(recovered)*scale,
            value:recovered,
            type: "1",
          };
        yesterday_bubbles.push(recovered_node);
        dead_node =
          {
            centered: state,
            fillKey: "low",
            radius: Math.sqrt(dead)*scale,
            value: dead,
            type: "0",
          };
        yesterday_bubbles.push(dead_node);
        yesterday_custom_text[state] = count;

      }
    }

  yesterday_bubbles.sort(function (a, b) {
    if (a.type > b.type) {
        return -1;
    }
    if (a.value > b.value) {
        return -1;
    }
    return 0;
  });
  // document.getElementById('time').innerHTML = yesterday_time;
  // document.getElementById('total_number').innerHTML = yesterday_infections;
  // document.getElementById('death_number').innerHTML = yesterday_deaths;
  // document.getElementById('recovery_number').innerHTML = yesterday_recoveries;

  // document.getElementById('infection_increase').innerHTML = today_infections - yesterday_infections;
  // document.getElementById('recovery_increase').innerHTML = today_recoveries - yesterday_recoveries;
  // document.getElementById('death_increase').innerHTML = today_deaths - yesterday_deaths;
  // console.log(today_bubbles.length);
  });


  setTimeout(() => {

  document.getElementById('total_number').innerHTML = today_infections;
  document.getElementById('death_number').innerHTML = today_deaths;
  document.getElementById('recovery_number').innerHTML = today_recoveries;

  today_bubbles.sort(function (a, b) {
    if (a.type > b.type) {
        return -1;
    }
    if (a.value > b.value) {
        return -1;
    }
    return 0;
  });

  yesterday_bubbles.sort(function (a, b) {
    if (a.type > b.type) {
        return -1;
    }
    if (a.value > b.value) {
        return -1;
    }
    return 0;
  });

  document.getElementById('infection_increase').innerHTML = "+"+(today_infections - yesterday_infections).toString();
  document.getElementById('recovery_increase').innerHTML = "+"+(today_recoveries - yesterday_recoveries).toString();
  document.getElementById('death_increase').innerHTML = "+"+(today_deaths - yesterday_deaths).toString();
    // only start drawing bubbles on the map when map has rendered completely.
    // bubble_map.labels({'customLabelText': yesterday_custom_text});
    bubble_map.bubbles(today_bubbles, {
      popupTemplate: function (geo, data) {
        return `<div class="hoverinfo">${data.centered}: ${data.value}</div>`;
      }
    });
    bubble_map.labels({'customLabelText': yesterday_custom_text, "fontSize": 40});
  }, 1000);



}

document.addEventListener('DOMContentLoaded', function () {
  var checkbox = document.querySelector('input[type="checkbox"]');

  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      removeElementsByClass("labels");
      bubble_map.labels({'customLabelText': today_custom_text, "fontSize": 40});
      document.getElementById('total_number').innerHTML = today_infections;
      document.getElementById('recovery_number').innerHTML = today_recoveries;
      document.getElementById('death_number').innerHTML = today_deaths;
      // document.getElementById('time').innerHTML = today_time;
      document.getElementById('infection_increase').innerHTML = "+"+(today_infections - yesterday_infections).toString();
      document.getElementById('recovery_increase').innerHTML = "+"+(today_recoveries - yesterday_recoveries).toString();
      document.getElementById('death_increase').innerHTML = "+"+(today_deaths - yesterday_deaths).toString();
  bubble_map.bubbles(today_bubbles, {
    popupTemplate: function (geo, data) {
      return `<div class="hoverinfo">${data.centered}: ${data.value}</div>`;
    }
  });
    }
    else
    {
      removeElementsByClass("labels");
      bubble_map.labels({'customLabelText': yesterday_custom_text, "fontSize": 40});
      document.getElementById('infection_increase').innerHTML = "+"+(today_infections - yesterday_infections).toString();
      document.getElementById('recovery_increase').innerHTML = "+"+(today_recoveries - yesterday_recoveries).toString();
      document.getElementById('death_increase').innerHTML = "+"+(today_deaths - yesterday_deaths).toString();
      // document.getElementById('total_number').innerHTML = yesterday_infections;
      // document.getElementById('recovery_number').innerHTML = yesterday_recoveries;
      // document.getElementById('death_number').innerHTML = yesterday_deaths;
      // document.getElementById('time').innerHTML = yesterday_time;
      // document.getElementById('infection_increase').innerHTML = "";
      // document.getElementById('recovery_increase').innerHTML = "";
      // document.getElementById('death_increase').innerHTML = "";
  bubble_map.bubbles(yesterday_bubbles, {
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