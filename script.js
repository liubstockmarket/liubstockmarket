const titlesOfTab = ["Date", "Value", "Name", "Role", "Shares", "Transition text"];

// Get list of companies

$("#searchCompany").on('input', (event) => {
    const searchData = event.target.value;
    if(searchData <= 1) return;
    
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://yh-finance.p.rapidapi.com/auto-complete?q=${searchData}&region=US`,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "9f7967c1fbmsh96ce5ac95f356ebp1c2470jsndd8798773eb5",
            "X-RapidAPI-Host": "yh-finance.p.rapidapi.com"
        }
    };

    $.ajax(settings).done(function (response) {
        $("#listOfCompany").empty();

        response.quotes.map((item) => {
            $("#listOfCompany").append(`<p class="companyName" date-symbol="${item.symbol}">${item.shortname}</p>`);
        });

        getCompanyData();
    });
});

// Get company data

const getCompanyData = () => {

    $(".companyName").click((event) => {
        const companyExchange = $(event.target).attr("date-symbol");
    
        const getCompany = {
            "async": true,
            "crossDomain": true,
            "url": `https://yh-finance.p.rapidapi.com/stock/v2/get-insider-transactions?symbol=${companyExchange}&region=US`,
            "method": "GET",
            "headers": {
                "X-RapidAPI-Key": "9f7967c1fbmsh96ce5ac95f356ebp1c2470jsndd8798773eb5",
                "X-RapidAPI-Host": "yh-finance.p.rapidapi.com"
            }
        };

        $.ajax(getCompany).done(function (response) {
            createTab(titlesOfTab, response.insiderTransactions.transactions);
        });

        $("#listOfCompany").empty();
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
        $("<td></td>").html(data.startDate.fmt).appendTo(newRow); // date
        $("<td></td>").html(data.value ? data.value.longFmt : "Haven`t info").appendTo(newRow); // value 
        $("<td></td>").html(data.filerName).appendTo(newRow); // name
        $("<td></td>").html(data.filerRelation).appendTo(newRow); // role
        $("<td></td>").html(data.shares.longFmt).appendTo(newRow); // shares
        $("<td></td>").html(data.transactionText ? data.transactionText : "Haven`t info").appendTo(newRow); // transition text

        newRow.appendTo("#bodyOfTab")
    });
    
    $('#tabWidthData').DataTable();
}