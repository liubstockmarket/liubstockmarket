// Get API

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://yh-finance.p.rapidapi.com/stock/v2/get-insider-transactions?symbol=AMRN&region=US",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "8dac42bdd2msh379cce62947963ep14d497jsn911506204ebc",
		"X-RapidAPI-Host": "yh-finance.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	const titlesOfTab = ["Data", "Value", "Name", "Entlty", "Role", "Shares", "Max Price"];
    createTab(titlesOfTab, response.insiderTransactions.transactions);
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

const createTab = (headData, bodyData) => {

    $("body").append(`
        <table id="tabWidthData" class="display" style="width:100%">
            <thead><tr id="headOfTab"></tr></thead>
            <tbody id="bodyOfTab"></tbody>
        </table>
    `);
    
    // create tab head
    $.each(headData, function(index, data) {
        $("#headOfTab").append(`<th>${data}</th>`)
    });
        
    // create tab body
    $.each(bodyData, function(index, data) {
        console.log(data);
        const newRow = $(`<tr>${data.filerName}</tr>`);
        $("<td></td>").html(data.startDate.fmt).appendTo(newRow);
        $("<td></td>").html(data.value ? data.value.longFmt : "Haven`t info").appendTo(newRow);
        $("<td></td>").html(data.filerName).appendTo(newRow);
        $("<td></td>").html("Haven`t info").appendTo(newRow);
        $("<td></td>").html("Haven`t info").appendTo(newRow);
        $("<td></td>").html(data.shares.longFmt).appendTo(newRow);
        $("<td></td>").html("Haven`t info").appendTo(newRow);

        newRow.appendTo("#bodyOfTab")
    });
    
    $('#tabWidthData').DataTable({
        order: [[3, 'desc']],
    });

}