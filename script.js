// Get API

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=compact&datatype=json",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "8dac42bdd2msh379cce62947963ep14d497jsn911506204ebc",
		"X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});

// Show statistic

window.onload = function () {
    var options = {
        animationEnabled: true,
        title: {
            text: "Mobile Phones Used For",                
            fontColor: "Peru"
        },	
        axisY: {
            tickThickness: 0,
            lineThickness: 0,
            valueFormatString: " ",
            includeZero: true,
            gridThickness: 0                    
        },
        axisX: {
            tickThickness: 0,
            lineThickness: 0,
            labelFontSize: 18,
            labelFontColor: "Peru"				
        },
        data: [{
            indexLabelFontSize: 26,
            toolTipContent: "<span style=\"color:#62C9C3\">{indexLabel}:</span> <span style=\"color:#CD853F\"><strong>{y}</strong></span>",
            indexLabelPlacement: "inside",
            indexLabelFontColor: "white",
            indexLabelFontWeight: 600,
            indexLabelFontFamily: "Verdana",
            color: "#62C9C3",
            type: "bar",
            dataPoints: [
                { y: 21, label: "21%", indexLabel: "Video" },
                { y: 25, label: "25%", indexLabel: "Dining" },
                { y: 33, label: "33%", indexLabel: "Entertainment" },
                { y: 36, label: "36%", indexLabel: "News" },
                { y: 42, label: "42%", indexLabel: "Music" },
                { y: 49, label: "49%", indexLabel: "Social Networking" },
                { y: 50, label: "50%", indexLabel: "Maps/ Search" },
                { y: 55, label: "55%", indexLabel: "Weather" },
                { y: 61, label: "61%", indexLabel: "Games" }
            ]
        }]
    };
    
    $("#chartContainer").CanvasJSChart(options);
    }

    // Tabs 

    $(document).ready(function () {
        $('#example').DataTable({
            order: [[3, 'desc']],
        });
    });