import React, { useState, useEffect } from 'react';
import { csv } from 'd3';
import { AGGREATE_DATA_URL } from './constants';
import { Box } from '@material-ui/core';

import CanvasJSReact from './canvasjs/canvasjs.stock.react';
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;


const LineChart = () => {
    const [isLoaded, setLoaded] = useState(false);
    const [datasets, setDatasets] = useState([]);
    const [dateRange, setDateRange] = useState([]);

    useEffect(() => {
        csv(AGGREATE_DATA_URL, null, null)
            .then(data => {
                const revenue = data.map(d => ({
                    x: new Date(d.date),
                    y: Number(d.total_rev)
                }));
                const volume = data.map(d => ({
                    x: new Date(d.date),
                    y: Number(d.total_vol)
                }));
                setDatasets({ revenue, volume });

                const dateRange = revenue.reduce((acc, data) => ({
                    minimum: acc.minimum > data.x ? data.x : acc.minimum,
                    maximum: acc.maximum < data.x ? data.x : acc.maximum
                }), { minimum: new Date(8640000000000000), maximum: new Date(-8640000000000000) });
                setDateRange(dateRange);
                setLoaded(true);
            })
    }, []);

    const options = {
        title: {
            text: "Stock Chart"
        },
        theme: "light2",
        charts: [{
            axisX: {
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true,
                    valueFormatString: "MMM DD YYYY"
                }
            },
            axisY: {
                title: "Total Revenue",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true,
                }
            },
            toolTip: {
                shared: true
            },
            data: [{
                name: "Revenue",
                type: "splineArea",
                color: "#3576a8",
                yValueFormatString: "#,###.##",
                xValueFormatString: "MMM DD YYYY",
                dataPoints: datasets.revenue
            }]
        },
        {
            axisX: {
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true,
                    valueFormatString: "MMM DD YYYY"
                }
            },
            axisY: {
                title: "Total Volume",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true,
                }
            },
            toolTip: {
                shared: true
            },
            data: [{
                name: "Volume",
                type: "splineArea",
                color: "#65e3a3",
                xValueFormatString: "MMM DD YYYY",
                dataPoints: datasets.volume
            }]
        }],
        navigator: {
            slider: dateRange
        }
    };
    const containerProps = {
        width: "100%",
        height: "700px",
        margin: "auto"
    };

    return (
        <Box p={4}>
            {isLoaded && (
                <CanvasJSStockChart containerProps={containerProps} options={options} />
            )}
        </Box>
    );
}

export default LineChart;