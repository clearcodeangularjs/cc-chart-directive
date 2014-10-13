/*

    Copyright (C) 2012-2013 by Clearcode <http://clearcode.cc>
    and associates (see AUTHORS).

    This file is part of cc-chart-directive.

    cc-chart-directive is free software: you can redistribute it and/or modify
    it under the terms of the Lesser GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    cc-chart-directive is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with cc-chart-directive.  If not, see <http://www.gnu.org/licenses/>.

*/
(function (angular, $, Highcharts) {

  'use strict';

  var utils = {
    processResponse: function (chart, data) {
      // check if there are multiple series in the response
      if (data.series && angular.isArray(data.series)) {
        // check if the chart is empty and if it is,
        // just add series from the response
        if (chart.series.length === 0) {
          data.series.forEach(function (serie) {
            chart.addSeries(serie);
          });
        } else {
          // if response method is set to 'replace'
          // remove all series from the chart
          if (data.method === 'replace' || !data.method) {
            while(chart.series.length > 0) {
              chart.series[0].remove();
            }
          }
          // iterate over the supplied series and alter the chart
          angular.forEach(data.series, function (serie, index) {
            if (data.method === 'shift') {
              chart.series[index].addPoint(serie.data[serie.data.length - 1], true, true);
            } else if (data.method === 'update'){
              chart.series[index].setData(serie.data, true);
            } else if (data.method === 'replace' || !data.method) {
              chart.addSeries(serie, true, true);
            }
          });
        }
      // if there is just one series in the response
      } else {
        if (chart.series.length === 0) {
          chart.addSeries(data);
        } else {
          if (data.method === 'shift') {
            chart.series[0].addPoint(data.data[data.data.length - 1], true, true);
          } else if (data.method === 'update') {
            chart.series[0].setData(data.data, true);
          } else if (data.method === 'replace' || !data.method){
            chart.series[0].remove();
            chart.addSeries(data, true, true);
          }
        }
      }
    }
  };

  angular.module('cc.chart.directive', [])
    .directive('chart', function () {
      return {
        restrict: 'E',
        template: '<div class="chart"></div>',
        replace: true,
        scope: {
          config: '=',
          data: '=input'
        },
        link: function (scope, element) {

          var chart,
            defaults = {
              tooltip: {
                shared: true,
                useHTML: true,
                borderWidth: 0,
                shadow: false,
                backgroundColor: null,
                style: {
                  padding: 0
                },
                followPointer: false,
              },
              legend: {
                layout: 'horizontal',
                align: 'left',
                padding: 0,
                x: 40,
                y: 15,
                verticalAlign: 'top',
                floating: true,
                backgroundColor: 'transparent',
                borderWidth: 0,
                symbolHeight: 2
              },
              chart: {
                margin: [50, 50, 50, 50],
                renderTo: element[0]
              },
              credits : {
                enabled: false
              },
              title: {
                text: ''
              },
              plotOptions: {
                column: {
                  borderRadius: 2,
                  borderWidth: 0
                },
                spline: {
                  marker: {
                    symbol: 'circle'
                  }
                }
              }
            };

          scope.$watch('config', function (config) {
            if (config && !chart) {
              chart = new Highcharts.Chart($.extend(true, {}, defaults, config));
            }
          });

          scope.$watch('data', function (data) {
            if (data && chart) {
              utils.processResponse(chart, data);
            }
          });

        }
      };
    });

})(window.angular, window.jQuery, window.Highcharts);
