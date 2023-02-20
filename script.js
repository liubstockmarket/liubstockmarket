const titlesOfTab = ["Date", "Value", "Name", "Role", "Shares", "Transition text"];

// Get API

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://yh-finance.p.rapidapi.com/stock/v2/get-insider-transactions?symbol=AMRN&region=US",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "d375ea9c64mshe845eb2bbf97628p100f53jsnaf425ee2c250",
		"X-RapidAPI-Host": "yh-finance.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
    
    // Sort data
    const defaultDataWay = response.insiderTransactions.transactions;

    const allElements = []

    for (let i=0; i<defaultDataWay.length; i++) {
        const element = {
            "data": defaultDataWay[i].startDate.fmt,
            "value": defaultDataWay[i].value ? defaultDataWay[i].value.raw : "Haven`t info",
            "name": defaultDataWay[i].filerName,
            "role": defaultDataWay[i].filerRelation,
            "shares": defaultDataWay[i].shares.raw,
            "transactionText": defaultDataWay[i].transactionText ? defaultDataWay[i].transactionText : "Haven`t info",
        }

        allElements.push(element);
    }

    const allNames = [];
    let final = [];

    allElements.forEach((e) => {
      let match = false;

      final.forEach((i) => {
        if (e.name == i.name) match = true;
      });

      if (!match) {
        let obj = {
          name: e.name,
          values: [e],
        }
        allNames.push(e.name);
        final.push(obj);
      } else {
        final.forEach((i) => {
          if (e.name == i.name) i.values.push(e);
        });
      }
    });

    console.log(final);

    generateDropBox(final, allNames);
      
    // Call functions for gerenration statistic and table
    createTab(titlesOfTab, final[0].values);
    cheateStatistic(3, 5, 5, 9);
});

// DropBox

const generateDropBox = (allData, allNames) => {
    let test;
    allNames.map((item) => {
        $("#companyNames").append(`<option value='volvo'>${item}</option>`);
    });

    $("#companyNames").click(() => {
        const conceptName = $('#companyNames').find(":selected").text();

        allData.map((company) => {
            if(company.name===conceptName) createTab(titlesOfTab, company.values);
        })
    });
}

// Show statistic

const cheateStatistic = (line1, line2, line3, line4) => {
    let options = {
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

    $("#tabWidthData_wrapper").remove();

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
        $("<td></td>").html(data.data).appendTo(newRow); // date
        $("<td></td>").html(data.value ? data.value : "Haven`t info").appendTo(newRow); // value 
        $("<td></td>").html(data.name).appendTo(newRow); // name
        $("<td></td>").html(data.role).appendTo(newRow); // role
        $("<td></td>").html(data.shares).appendTo(newRow); // shares
        $("<td></td>").html(data.transactionText ? data.transactionText : "Haven`t info").appendTo(newRow); // transition text

        newRow.appendTo("#bodyOfTab")
    });
    
    $('#tabWidthData').DataTable();
}