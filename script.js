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
    console.log(response.insiderTransactions.transactions);
	const titlesOfTab = ["Date", "Value", "Name", "Entlty", "Role", "Shares", "Transition text", "Max Price"];
    createTab(titlesOfTab, response.insiderTransactions.transactions);
    cheateStatistic(3, 5, 5, 9)
});

// Show statistic

const cheateStatistic = (line1, line2, line3, line4) => {
    var options = {
        animationEnabled: true,
        title: {
            text: "Insider Trading Volume",                
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
            indexLabelFontSize: 20,
            toolTipContent: "<span style=\"color:#62C9C3\">{indexLabel}:</span> <span style=\"color:#CD853F\"><strong>{y}</strong></span>",
            indexLabelPlacement: "inside",
            indexLabelFontColor: "white",
            indexLabelFontWeight: 600,
            indexLabelFontFamily: "Verdana",
            color: "#62C9C3",
            type: "bar",
            dataPoints: [
                { y: line1, label: "1-3", indexLabel: "months" },
                { y: line2, label: "3-6", indexLabel: "months" },
                { y: line3, label: "6-9", indexLabel: "months" },
                { y: line4, label: "9-12", indexLabel: "months" },
            ]
        }]
    };
    
    $("#chartContainer").CanvasJSChart(options);
}

// Tabs 

const createTab = (tabHead, tabBody) => {

    $("body").append(`
        <table id="tabWidthData" class="display" style="width:100%">
            <thead><tr id="headOfTab"></tr></thead>
            <tbody id="bodyOfTab"></tbody>
        </table>
    `);
    
    // create tab head
    $.each(tabHead, function(index, data) {
        $("#headOfTab").append(`<th>${data}</th>`)
    });
        
    // create tab body
    $.each(tabBody, function(index, data) {
        const newRow = $(`<tr>${data.filerName}</tr>`);
        $("<td></td>").html(data.startDate.fmt).appendTo(newRow); // date
        $("<td></td>").html(data.value ? data.value.longFmt : "Haven`t info").appendTo(newRow); // value 
        $("<td></td>").html(data.filerName).appendTo(newRow); // name
        $("<td></td>").html("Haven`t info").appendTo(newRow); // entlty
        $("<td></td>").html(data.filerRelation).appendTo(newRow); // role
        $("<td></td>").html(data.shares.longFmt).appendTo(newRow); // shares
        $("<td></td>").html(data.transactionText ? data.transactionText : "Haven`t info").appendTo(newRow); // transition text
        $("<td></td>").html("Haven`t info").appendTo(newRow); // max price

        newRow.appendTo("#bodyOfTab")
    });
    
    $('#tabWidthData').DataTable();

}