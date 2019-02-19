export default class SignalService {

    constructor(harmonicsNum,
                division,
                discreteSamples,
                accuracy,
                power) {
        this.harmonicsNum = harmonicsNum;
        this.division = division;
        this.discreteSamples = discreteSamples;
        this.accuracy = accuracy;
        this.power = power;

    };

    generateSingleHarmonic = (division) => {
        const chart = [];
        const amplitude = Math.random();
        const phase = Math.random() * Math.PI * 2;

        for (let i = 0; i <= this.discreteSamples; i = i + this.accuracy) {
            chart[i * (1 / this.accuracy)] = amplitude * Math.sin(division * i + phase);
        }
        // console.log(division);
        return chart;
    };

    generateHarmonics = () => {
        let harmonicCharts = [];
        for (let i = 1; i <= this.harmonicsNum; i++) {
            harmonicCharts[i - 1] = this.generateSingleHarmonic(this.division * (i))
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

    arrToObjects = (arr) => {
        let newArr = [];
        for (let i = 0; i <= arr.length; i++) {
            newArr[i] = {y: arr[i], label: i / (1 / this.accuracy)}
        }
        return newArr

    };

    signalOptions = (signalChart) => {
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

    timeOptions = (timeChart) => {
        return {
            animationEnabled: false,
            title: {
                text: "Dependence of time on the number of discrete samples"
            },
            axisY: {
                title: "Y: time",
                includeZero: false
            },
            axisX: {
                title: "X: discrete samples",
                includeZero: false
            },
            toolTip: {
                shared: true
            },
            data: [{
                type: "spline",
                name: "Number of discrete samples is 2^X",
                showInLegend: true,
                dataPoints: this.arrToObjects(timeChart)
            }]
        }
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

    generateSignalTrue = (samples) => {
        let chart = [];
        for (let i = 0; i < samples; i++) {
            let sum = 0;
            let amplitude = Math.random();
            let phase = Math.random() * 2 * Math.PI;
            for (let j = 1; j <= this.harmonicsNum; j++) {
                sum += amplitude * Math.sin(this.division * (j) + phase);
            }
            chart[i - 1] = sum;
        }
    };

    buildTimeChart = () => {
        let theoreticStart = 0;
        let theoreticEnd = 0;
        let timeChart = [];
        let samples = 2;

        for (let i = 0; i <= this.power; i++) {
            theoreticStart = window.performance.now();
            this.generateSignalTrue(samples);
            theoreticEnd = window.performance.now();
            timeChart[i] = (theoreticEnd - theoreticStart);
            samples = samples * 2;
        }
        return timeChart;
    };
}