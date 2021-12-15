let count = 0;

const Supersector = {
	"0000": "Total nonfarm",
	"0500": "Total private",
	"0600": "Goods-producing",
	"0700": "Service-providing",
	"0800": "Private service-providing",
	"1000": "Mining and logging",
	"2000": "Construction",
	"3000": "Manufacturing",
	"3100": "Durable Goods",
	"3200": "Nondurable Goods",
	"4000": "Trade, transportation, and utilities",
	"4142": "Wholesale trade",
	"4200": "Retail trade",
	"4300": "Transportation and warehousing",
	"4422": "Utilities",
	"5000": "Information",
	"5500": "Financial activities",
	"6000": "Professional and business services",
	"6500": "Education and health services",
	"7000": "Leisure and hospitality",
	"8000": "Other services",
	"9000": "Government"
};
let sectorKeys = Object.keys(Supersector);

const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
	lightRed: 'rgb(255, 142, 142)',
	pink: 'rgb(255, 0, 255)',
	lightPink: 'rgb(255, 153, 204)',
	maroon: 'rgb(153, 0, 76)',
    orange: 'rgb(255, 159, 64)',
	lightOrange: 'rgb(255, 178, 102)',
	brown: 'rgb(102, 51, 0)',
    yellow: 'rgb(255, 205, 86)',
	gold: 'rgb(117, 109, 4)',
    green: 'rgb(75, 192, 192)',
	lightGreen: 'rgb(102, 255, 102)',
	olive: 'rgb(51, 102, 0)',
    blue: 'rgb(54, 162, 235)',
	lightBlue: 'rgb(102, 255, 255)',
	skyBlue: 'rgb(0, 102, 102)',
    purple: 'rgb(153, 102, 255)',
	lightPurple: 'rgb(255, 153, 255)',
    grey: 'rgb(201, 203, 207)',
	black: 'rgb(0, 0, 0)', 
	bluePurple: 'rgb(153, 153, 255)', 
	seaGreen: 'rgb(0, 255, 200)' 
};
let CHART_COLORS_KEYS = Object.keys(CHART_COLORS);
 
const CHART_COLORS_50_Percent = {
    red: 'rgba(255, 99, 132, 0.5)',
	lightRed: 'rgba(255, 142, 142, 0.5)',
	pink: 'rgba(255, 0, 255, 0.5)',
	lightPink: 'rgba(255, 153, 204, 0.5)',
	maroon: 'rgba(153, 0, 76, 0.5)',
    orange: 'rgba(255, 159, 64, 0.5)',
	lightOrange: 'rgba(255, 178, 102, 0.5)',
	brown: 'rgba(102, 51, 0, 0.5)',
    yellow: 'rgba(255, 205, 86, 0.5)',
	gold: 'rgba(117, 109, 4, 0.5)',
    green: 'rgba(75, 192, 192, 0.5)',
	lightGreen: 'rgba(102, 255, 102, 0.5)',
	olive: 'rgba(51, 102, 0, 0.5)',
    blue: 'rgba(54, 162, 235, 0.5)',
	lightBlue: 'rgba(102, 255, 255, 0.5)',
	skyBlue: 'rgba(0, 102, 102, 0.5)',
    purple: 'rgba(153, 102, 255, 0.5)',
	lightPurple: 'rgba(255, 153, 255, 0.5)',
    grey: 'rgba(201, 203, 207, 0.5)',
	black: 'rgba(0, 0, 0, 0.5)', 
	bluePurple: 'rgba(153, 153, 255, 0.5)', 
	seaGreen: 'rgba(0, 255, 200, 0.5)' 
};
let CHART_COLORS_50_Percent_KEY = Object.keys(CHART_COLORS_50_Percent);

let stop = false;
function responseHandler() {
	if (this.status == 200) {
		let dataArray = this.response.Results.series[0].data;
		let seriesID = this.response.Results.series[0].seriesID;
		let graphLine = {
			label: "",
			data:[],
			borderColor: "",
			backgroundColor: "",
			hidden:true
			}
		graphLine.label = (Supersector[seriesID.substring(3,7)]);
		graphLine.borderColor = (CHART_COLORS_KEYS[count]);
		graphLine.backgroundColor = (CHART_COLORS_50_Percent_KEY[count]);
	
		if(stop == false){
			for (let i = dataArray.length -1; i >= 0; i--) {
				data.labels.push(dataArray[i].periodName + " " + dataArray[i].year);
				stop = true;
				//stops loop from repeating labels on x axis of graph
			}
		}
		for(let i = dataArray.length -1; i >= 0; i--) {
			graphLine.data.push(dataArray[i].value);
		}

		data.datasets.push(graphLine);
		count++

		console.log(this.response);
    }else {
		console.log ("error");
	}
};


const data = {
	labels: [],
	datasets: []
};

const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Number of Employees in Thousands based on US Labor Statistics'
        }
      }
    }
};


const myChart = new Chart(
    document.getElementById('myChart'),config
	);
	//creation of chart


for (i = 0; i < sectorKeys.length; i++){
	let getData = new XMLHttpRequest()
	getData.addEventListener("load", responseHandler);
	let x = "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU";
	let z = "000001?registrationkey="/*Insert your own API key here*/;
	getData.open("GET", x + sectorKeys[i] + z);
	getData.responseType = "json";
	getData.send();
}
//loops to GET request from each Super Sector and stores in responseHandeler function



