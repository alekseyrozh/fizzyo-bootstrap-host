

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
        var out = !visible ? 'inline' : 'none';
        document.getElementById('in0').style.display = inputDisplay;
        document.getElementById('in1').style.display = inputDisplay;
        document.getElementById('in2').style.display = inputDisplay;
        document.getElementById('in3').style.display = inputDisplay;
        document.getElementById('in4').style.display = inputDisplay;
        document.getElementById('in5').style.display = inputDisplay;
        document.getElementById('in6').style.display = inputDisplay;
        document.getElementById('in7').style.display = inputDisplay;

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
    });


    //
    $('#modify-prescription-save').on('click', function(e) {
        document.getElementById('modify-prescription').style.display = 'inline';

        document.getElementById('modify-prescription-save').style.display = 'none';
        document.getElementById('modify-prescription-cancel').style.display = 'none';


        input(false);
    });

    $('#modify-prescription-cancel').on('click', function(e) {
        document.getElementById('modify-prescription').style.display = 'inline';

        document.getElementById('modify-prescription-save').style.display = 'none';
        document.getElementById('modify-prescription-cancel').style.display = 'none';


        input(false);
    });