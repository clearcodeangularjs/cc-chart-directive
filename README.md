Clearcode chart directive
=========

Adds chart using highcharts.

Installation
--------------
``` bower install clearcodeangularjs/cc-chart-directive --save ```


Usage
------

Add ``` cc.chart.directive``` module to your app module list :


```
angular
    .module('yourAwesomeApp', [
        'cc.chart.directive'
    ]);
```
and you are ready to go!

How to use :


```
    <chart data-input="data" data-config="chartConfig" />
```


And a little example, in controller:

```
   var config = {
    generateSeries: function () {
      return {
        series: [{
          name: 'TEST 1',
          unit: 'a',
          toTotal: true,
          data: [1,4,51,12,4,63,124,56,91,21],
          type: 'column',
          color: '#3ab3dc',
          pointInterval: 24 * 3600 * 1000
        },
        {
          name: 'TEST 2',
          unit: 'a',
          toTotal: true,
          data: [41,51,12,92,74,49,18,21,53,2],
          type: 'column',
          color: '#e43d5f',
          pointInterval: 24 * 3600 * 1000
        },
        {
          name: 'TEST 3',
          unit: 'a',
          data: [54,1,13,12,53,1,14,53,11,111],
          type: 'line',
          color: '#a8bdc4',
          dashStyle: 'ShortDash',
          pointInterval: 24 * 3600 * 1000,
        }]
      };
    },
    chart: {
      chart: {
        plotBorderColor: '#e0e0de',
        plotBorderWidth: 1
      },
      xAxis: {
        type: 'datetime',
        gridLineColor: '#e0e0de',
        gridLineWidth: 1,
        gridLineDashStyle: 'dash',
        tickLength: 0,
        lineWidth: 0
      },
      yAxis: [
        {
          title: '',
          endOnTick: true,
          labels: {
            formatter: function () {
              return numeral(this.value).format('0a');
            }
          },
          gridLineColor: '#e0e0de',
          gridLineDashStyle: 'dash',
          reversedStacks: false
        }
      ],
      legend: {
        itemStyle: {
          color: '#3a3e40',
          fontWeight: 'normal'
        }
      },
      plotOptions: {
        series: {
          pointStart: Date.UTC(2014,0,1),
          type: 'datetime'
        },
        column: {
          stacking: 'normal',
          pointPadding: 0.205
        },
        line: {
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false
              }
            }
          },
          states: {
            hover: {
              lineWidth: 2
            }
          }
        }
      },
      tooltip: {
        formatter: function () {
          var total = 0,
            stringArray = [];

          stringArray.push('<ul>');

          angular.forEach(this.points, function(point) {
            stringArray.push('<li><span class="label">' + point.series.name + '</span><br/><span class="value">' +
              numeral(point.y).format('0' + point.series.options.unit) + '</span></li>');
            if (point.series.options.toTotal) {
              total += point.y;
            }
          });

          stringArray.push(
            '<li><span class="label">TOTAL</span><br/><span class="value">' +
            numeral(total).format('0a') + '</span></li>'
          );

          // swap the last and second to last element
          // not very elegant but hey, it works

          (function swap (array) {
            var buff = array[array.length - 1];
            array[array.length - 1] = array[array.length - 2];
            array[array.length - 2] = buff;
          })(stringArray);

          stringArray.push('</ul>');

          return stringArray.join('');
        }
      }
    }
  };
    $scope.data = config.generateSeries();
    $scope.chartConfig = config.chart;
```

and in view:

```
    <chart data-input="data" data-config="chartConfig" />
```

Result:

![alt text](http://i.imgur.com/acu5yva.png "Logo Title Text 1")



Author
------

Witold Galecki


License
----

LGPL

