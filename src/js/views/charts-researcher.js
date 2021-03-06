var ctx = document.getElementById("schedule").getContext('2d');

var sess1 = 30;
var sess2 = 30;
var sess3 = 30;
var day = 60 * 24;

var gap = (day - sess1 - sess2 - sess3);

var data = {
  datasets: [{
    data: [gap / 3, sess1, gap / 3, sess2, gap / 3, sess3],
    backgroundColor: [
      'lightblue',
      'lightgreen',
      'lightblue',
      'lightgreen',
      'lightblue',
      'lightgreen',
      'lightblue'
    ]
  }],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  // labels: [
  //   'Session 1: 10:00am 00:30min',
  //   'Yellow',
  //   'Blue'
  // ]
};

var options = {
  legend: {
    display: false
  },
  tooltips: {
    enabled: false
  }
}

var myDoughnutChart = new Chart(ctx, {
  type: 'doughnut',
  data: data,
  options: options
});



var input = function(visible) {
  var inputDisplay = visible ? 'inline' : 'none';
  var out = ! visible ? 'inline' : 'none';
  document.getElementById('in0').style.display = inputDisplay ;
  document.getElementById('in1').style.display = inputDisplay ;
  document.getElementById('in2').style.display = inputDisplay ;
  document.getElementById('in3').style.display = inputDisplay ;
  document.getElementById('in4').style.display = inputDisplay ;
  document.getElementById('in5').style.display = inputDisplay ;
  document.getElementById('in6').style.display = inputDisplay ;
  document.getElementById('in7').style.display = inputDisplay ;
  //
  document.getElementById('out0').style.display = out;
  document.getElementById('out1').style.display = out;
  document.getElementById('out2').style.display = out;
  document.getElementById('out3').style.display = out;
  document.getElementById('out4').style.display = out;
  document.getElementById('out5').style.display = out;
  document.getElementById('out6').style.display = out;
  document.getElementById('out7').style.display = out;
};



$('#modify-prescription').on('click', function(e) {
  document.getElementById('modify-prescription').style.display = 'none';

  document.getElementById('modify-prescription-save').style.display = 'inline';
  document.getElementById('modify-prescription-cancel').style.display = 'inline';

  input(true);
})


//
$('#modify-prescription-save').on('click', function(e) {
  document.getElementById('modify-prescription').style.display = 'inline';

  document.getElementById('modify-prescription-save').style.display = 'none';
  document.getElementById('modify-prescription-cancel').style.display = 'none';


  input(false);
})

$('#modify-prescription-cancel').on('click', function(e) {
  document.getElementById('modify-prescription').style.display = 'inline';

  document.getElementById('modify-prescription-save').style.display = 'none';
  document.getElementById('modify-prescription-cancel').style.display = 'none';


  input(false);
})



//
$('#modify-prescription-save').on('click', function(e) {
  document.getElementById('modify-prescription').style.display = 'inline';

  document.getElementById('modify-prescription-save').style.display = 'none';
  document.getElementById('modify-prescription-cancel').style.display = 'none';


  input(false);
})



var generateSessionArray = function() {
  var GREEN = "rgba(0,200,0,0.5)";
  var RED = "rgba(200, 0, 0, 0.5)";
  var GREEN_BOARDER = "rgba(0, 200, 0, 1)";
  var RED_BOARDER = "rgba(200, 0, 0, 1)";

  var month = "Nov"

  var prescribedSessVal = 3;
  var prescribedActivityVal = 60 * 3;

  var fakeSessions = {
    labels: [],
    counts: [],
    colours: [],
    boarderColours: [],
    goodBreathCounts: [],
    physicalActivityTimes: [],
    prescribedSess: [],
    prescribedActivity: []
  };

  for (var i = 1; i <= 15; i++) {
    var label = month + " " + i;
    var value = Math.floor(Math.random() * 6);
    var colour = value >= 3 ? GREEN : RED;
    var boarderColour = value >= 3 ? GREEN_BOARDER : RED_BOARDER;
    var goodBreathCount = Math.floor(Math.random() * 60);
    var physicalActivityTime = Math.floor(Math.random() * 180) + 50; // in minutes

    fakeSessions.labels.push(label);
    fakeSessions.counts.push(value);
    fakeSessions.colours.push(colour);
    fakeSessions.boarderColours.push(boarderColour);
    fakeSessions.goodBreathCounts.push(goodBreathCount);
    fakeSessions.physicalActivityTimes.push(physicalActivityTime);
    fakeSessions.prescribedSess.push(prescribedSessVal);
    fakeSessions.prescribedActivity.push(prescribedActivityVal);
  }

  return fakeSessions;
}


var sessions = generateSessionArray();

// -- sess count
var ctx = document.getElementById("sess-count");

Chart.pluginService.register({
  afterDraw: function(chart) {
    if (typeof chart.config.options.lineAt != 'undefined') {
      var lineAt = chart.config.options.lineAt;
      var ctxPlugin = chart.chart.ctx;
      var xAxe = chart.scales[chart.config.options.scales.xAxes[0].id];
      var yAxe = chart.scales[chart.config.options.scales.yAxes[0].id];

      //loool what is that? :)

      // I'm not good at maths
      // So I couldn't find a way to make it work ...
      // ... without having the `min` property set to 0
      if (yAxe.min != 0) return;

      ctxPlugin.strokeStyle = "rgba(120, 50, 255, 0.7)";
      ctxPlugin.lineWidth = 3;
      ctxPlugin.beginPath();
      lineAt = (lineAt - yAxe.min) * (100 / yAxe.max);
      lineAt = (100 - lineAt) / 100 * (yAxe.height) + yAxe.top;
      ctxPlugin.moveTo(xAxe.left, lineAt);
      ctxPlugin.lineTo(xAxe.right, lineAt);
      ctxPlugin.stroke();
    }
  }
});

var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: sessions.labels,
    datasets: [{
      label: "Session Count",
      backgroundColor: sessions.colours,
      borderColor: sessions.boarderColours,
      borderWidth: 1,
      data: sessions.counts,
    }]
  },
  options: {
    lineAt: 3,
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: true
        },
        ticks: {
          //maxTicksLimit: 6
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Session Count'
        },
        ticks: {
          min: 0,
          max: 5,
          maxTicksLimit: 5,
          callback: function(label, index, labels) {
            return label;
          }
        },
        gridLines: {
          display: true
        }
      }],
    },
    legend: {
      display: false
    }
  }
});

// -- breaths
var ctx = document.getElementById("breath-charts");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: sessions.labels,
    datasets: [{
      label: "Good Breaths",
      lineTension: 0.3,
      backgroundColor: "rgba(2,117,216,0.2)",
      borderColor: "rgba(2,117,216,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(2,117,216,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(2,117,216,1)",
      pointHitRadius: 20,
      pointBorderWidth: 2,
      data: sessions.goodBreathCounts,
      // Changes this dataset to become a line
      type: 'line'
    }, {
      data: sessions.goodBreathCounts
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: true
        },
        ticks: {
          //maxTicksLimit: 7
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Good Breath Count'
        },
        ticks: {
          min: 0,
          max: 80,
          maxTicksLimit: 5,
          callback: function(label, index, labels) {
            return label;
          }
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
});

// -- Phisycal activity
var ctx = document.getElementById("activity-chart");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: sessions.labels,
    datasets: [{
      label: "Sessions",
      lineTension: 0.3,
      backgroundColor: "rgba(255,2,2,0.2)",
      borderColor: "rgba(255,2,2,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(255,2,2,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(2,117,216,1)",
      pointHitRadius: 20,
      pointBorderWidth: 2,
      data: sessions.physicalActivityTimes,
      type: 'line'
    }, {
      data: sessions.physicalActivityTimes,
      backgroundColor: "rgba(0,0,0,0.1)",
      borderColor: "rgba(0,0,0,0.1)"
    }],
  },
  options: {
    lineAt: 180,
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: true
        },
        ticks: {
          //maxTicksLimit: 7
        }
      }],
      yAxes: [{
        /*  ticks: {

          },*/
        scaleLabel: {
          display: true,
          labelString: 'Duration'
        },
        ticks: {
          min: 0,
          max: 300,
          maxTicksLimit: 5,
          callback: function(label, index, labels) {
            var h = Math.floor(label / 60);
            var m = Math.floor(label % 60);
            return h + ':' + m + (m >= 10 ? '' : '0');
          }
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
});
