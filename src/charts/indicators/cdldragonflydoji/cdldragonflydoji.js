﻿/**
 * Created by Mahboob.M on 1/3/16
 */

define(["jquery", "common/rivetsExtra", "lodash", "jquery-ui", 'color-picker'], function($, rv, _) {

    function closeDialog() {
        $(this).dialog("close");
        $(this).find("*").removeClass('ui-state-error');
    }

    function init(containerIDWithHash, _callback) {

        require(['text!charts/indicators/cdldragonflydoji/cdldragonflydoji.html', 'text!charts/indicators/indicators.json'], function ($html, data) {

            $html = $($html);

            $html.appendTo("body");

            data = JSON.parse(data);
            var current_indicator_data = data.cdldragonflydoji;
            var state = {
                "title": current_indicator_data.long_display_name,
                "description": current_indicator_data.description
            }
            rv.bind($html[0], state);

            var options = {
                autoOpen: false,
                resizable: false,
                width: 350,
                height: 400,
                modal: true,
                my: 'center',
                at: 'center',
                of: window,
                buttons: [
                    {
                        text: "OK",
                        click: function () {

                            var series = $($(".cdldragonflydoji").data('refererChartID')).highcharts().series[0];
                            series.addIndicator('cdldragonflydoji', {
                                cdlIndicatorCode : 'cdldragonflydoji',
                                onSeriesID : series.options.id
                            });

                            closeDialog.call($html);
                        }
                    },
                    {
                        text: "Cancel",
                        click: function () {
                            closeDialog.call(this);
                        }
                    }
                ],
                icons: {
                    close: 'custom-icon-close',
                    minimize: 'custom-icon-minimize',
                    maximize: 'custom-icon-maximize'
                }
            };
            $html.dialog(options)
              .dialogExtend(_.extend(options, {maximizable:false, minimizable:false, collapsable:false}));

            if ($.isFunction(_callback)) {
                _callback(containerIDWithHash);
            }

        });

    }

    return {

        open: function (containerIDWithHash) {

            if ($(".cdldragonflydoji").length == 0) {
                init(containerIDWithHash, this.open);
                return;
            }

            $(".cdldragonflydoji").data('refererChartID', containerIDWithHash).dialog("open");

        }

    };

});
