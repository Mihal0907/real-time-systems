export default class SignalService {

    generateSingleHarmonic = (division, discreteSamples, accuracy) => {
        const chart = [];
        const amplitude = Math.random();
        const phase = Math.random() * Math.PI * 2;

        for (let i = 0; i <= discreteSamples; i = i + accuracy) {
            chart[i * (1 / accuracy)] = amplitude * Math.sin(division * i + phase);
        }
        console.log(division);
        return chart;
    };

    generateHarmonics = (harmonicsNum, division, discreteSamples, accuracy) => {
        let harmonicCharts = [];
        for (let i = 1; i <= harmonicsNum; i++) {
            harmonicCharts[i-1] = this.generateSingleHarmonic(division * i, discreteSamples, accuracy)
        }
        return harmonicCharts;
    };

    generateSignal = (harmonicCharts) => {
        let signalChart = [];
        for (let i = 0; i < harmonicCharts[1].length; i++) {
            let sum = 0;
            for (let j = 0; j < harmonicCharts.length; j++) {
                sum += harmonicCharts[j][i];
            }
            signalChart[i] = sum;
        }
        return signalChart;
    };

    arrToObjects = (arr, accuracy) => {
        let newArr = [];
        for (let i = 0; i <= arr.length; i++) {
            newArr[i] = {y: arr[i], label: i / (1 / accuracy)}
        }
        return newArr

    };

    siganalOptions = (signalChart) => {
        return {
            animationEnabled: false,
            title: {
                text: "Generated signal timeChart"
            },
            axisY: {
                title: "Y",
                includeZero: false
            },
            axisX: {
                title: "X",
                includeZero: false
            },
            toolTip: {
                shared: true
            },
            data: [{
                type: "line",
                name: "",
                showInLegend: true,
                dataPoints: this.arrToObjects(signalChart)
            }]
        }
    };

    harmonicsOptions = (harmonicCharts) => {
        let harmonicOptions = {

            animationEnabled: false,
            title: {
                text: "Harmonics timeChart"
            },
            axisY: {
                title: "Y",
                includeZero: false
            },
            axisX: {
                title: "X",
                includeZero: false
            },
            toolTip: {
                shared: true
            },
            data: []
        };

        for (let i = 0; i < harmonicCharts.length; i++) {
            harmonicOptions.data[i] = {
                type: "spline",
                name: `${i + 1}`,
                showInLegend: true,
                dataPoints: this.arrToObjects(harmonicCharts[i], 0.5)
            }
        }

        return harmonicOptions;
    };

    mathExpectation = (arr) => {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return (sum / arr.length);
    };

    mathDispersion = (arr, exp) => {
        let sum = 0;
        let num = 0;
        for (let i = 0; i < arr.length; i++) {
            num = (exp - arr[i]);
            sum += Math.pow(num, 2);
        }

        return sum / (arr.length - 1);
    };

    generateSignalTrue = (harmonicsNum, division, discreteSamples) => {
        let chart = [];
        for (let i = 0; i < discreteSamples; i++) {
            let sum = 0;
            let amplitude = Math.random();
            let phase = Math.random() * 2 * Math.PI;
            for (let j = 0; j < harmonicsNum; j++) {
                sum += amplitude * Math.sin(division * (j + 1) + phase);
            }
            chart[i] = sum;
        }
    };

    buildTimeChart = (harmonicsNum, division, power) => {
        let theoreticStart = 0;
        let theoreticEnd = 0;
        let timeChart = [];
        let sample = 2;

        for (let i = 0; i <= power; i++) {
            theoreticStart = window.performance.now();
            this.generateSignalTrue(harmonicsNum, division, sample);
            theoreticEnd = window.performance.now();
            timeChart[i] = {x: i, y: (theoreticEnd - theoreticStart)};
            sample = sample * 2;
        }
        console.log(timeChart);
        return timeChart;
    };
}