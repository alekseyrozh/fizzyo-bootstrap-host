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




var input = function(visible) {
  var inputDisplay = visible ? 'inline' : 'none';
  var out = !visible ? 'inline' : 'none';
  document.getElementById('in0').style.display = inputDisplay;
  document.getElementById('in1').style.display = inputDisplay;
  document.getElementById('in2').style.display = inputDisplay;
  document.getElementById('in3').style.display = inputDisplay;
  document.getElementById('in4').style.display = inputDisplay;
  document.getElementById('in5').style.display = inputDisplay;
  document.getElementById('in6').style.display = inputDisplay;
  document.getElementById('in7').style.display = inputDisplay;
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
var sessions2 = generateSessionArray();
var sessions3 = generateSessionArray();



var col1 = "2,117,216"
var colour1 = {
  bg: "rgba(" + col1 + ",0.2)",
  hover: "rgba(" + col1 + ",1)",
  border: "rgba(" + col1 + ",1)"
}

var col2 = "2,216,117"
var colour2 = {
  bg: "rgba(" + col2 + ",0.2)",
  hover: "rgba(" + col2 + ",1)",
  border: "rgba(" + col2 + ",1)"
}


var col3 = "216,2,117"
var colour3 = {
  bg: "rgba(" + col3 + ",0.2)",
  hover: "rgba(" + col3 + ",1)",
  border: "rgba(" + col3 + ",1)"
}


// -- sess count
var ctx = document.getElementById("sess-count");


var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: sessions.labels,
    datasets: [{
      label: "Patient1",
      backgroundColor: colour1.bg,
      borderColor: colour1.border,
      borderWidth: 1,
      data: sessions.counts
    },{
      label: "Patient2",
      backgroundColor: colour2.bg,
      borderColor: colour2.border,
      borderWidth: 1,
      data: sessions2.counts
    },{
      label: "Patient2",
      backgroundColor: colour3.bg,
      borderColor: colour3.border,
      borderWidth: 1,
      data: sessions3.counts
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
      display: true
    }
  }
});

// -- breaths
var ctx = document.getElementById("breath-charts");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: sessions.labels,
    datasets: [{
        label: "Good Breaths",
        lineTension: 0.3,
        backgroundColor: colour1.bg,
        borderColor: colour1.border,
        pointRadius: 5,
        pointBackgroundColor: colour1.border,
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colour1.hover,
        pointHitRadius: 20,
        pointBorderWidth: 2,
        data: sessions.goodBreathCounts,
        // Changes this dataset to become a line
        type: 'line'
      }, {
        label: "Good Breaths",
        lineTension: 0.3,
        backgroundColor: colour2.bg,
        borderColor: colour2.border,
        pointRadius: 5,
        pointBackgroundColor: colour2.border,
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colour2.hover,
        pointHitRadius: 20,
        pointBorderWidth: 2,
        data: sessions2.goodBreathCounts,
        // Changes this dataset to become a line
        type: 'line'
      },
      {
        label: "Good Breaths",
        lineTension: 0.3,
        backgroundColor: colour3.bg,
        borderColor: colour3.border,
        pointRadius: 5,
        pointBackgroundColor: colour3.border,
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colour3.hover,
        pointHitRadius: 20,
        pointBorderWidth: 2,
        data: sessions3.goodBreathCounts,
        // Changes this dataset to become a line
        type: 'line'
      }
    ],
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
  type: 'line',
  data: {
    labels: sessions.labels,
    datasets: [{
      label: "Sessions",
      lineTension: 0.3,
      backgroundColor: colour1.bg,
      borderColor: colour1.border,
      pointRadius: 5,
      pointBackgroundColor: colour1.border,
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: colour1.hover,
      pointHitRadius: 20,
      pointBorderWidth: 2,
      data: sessions.physicalActivityTimes,
      type: 'line'
    },{
      label: "Sessions",
      lineTension: 0.3,
      backgroundColor: colour2.bg,
      borderColor: colour2.border,
      pointRadius: 5,
      pointBackgroundColor: colour2.border,
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: colour2.hover,
      pointHitRadius: 20,
      pointBorderWidth: 2,
      data: sessions2.physicalActivityTimes,
      type: 'line'
    },{
      label: "Sessions",
      lineTension: 0.3,
      backgroundColor: colour3.bg,
      borderColor: colour3.border,
      pointRadius: 5,
      pointBackgroundColor: colour3.border,
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: colour3.hover,
      pointHitRadius: 20,
      pointBorderWidth: 2,
      data: sessions3.physicalActivityTimes,
      type: 'line'
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
