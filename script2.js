

const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }

function settings(companyExchange) {
    return {
        "async": false,
        "crossDomain": true,
        "url": `https://yh-finance.p.rapidapi.com/stock/v3/get-upgrades-downgrades?symbol=${companyExchange}&region=US`,
    
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "94baaa7a48mshe5132cddafc88a6p15c145jsn13bb39e411c8",
            "X-RapidAPI-Host": "yh-finance.p.rapidapi.com"
        }
    }
  
};

["VFC", "PYPL", "SWI", "CCL", "BA", "CRWD", "GTLB", "TRIP", "RIVN"].forEach(element => {
    $.ajax(settings(element)).done(function (response) {
        //$("#listOfAnalysis").empty();
    console.log(response);
        response.quoteSummary.result[0].upgradeDowngradeHistory.history.slice(0, 3).map((item, ind) => {
            const date = new Date(item.epochGradeDate * 1000);
            if (ind < 1) {
                //$("#titleStock").text = 'dddd';
                if (isToday(date)) {
                    //alert(element);
                    document.title = 'Attention!' + element;
                    $("#topListOfAnalysis").append(`<p style="background-color:red" class="companyName">${element}: ${date.toLocaleString()} | ${item.firm} [${item.fromGrade} -> ${item.toGrade}]</p>`);
                    //$("#listOfAnalysis").append(`<p style="background-color:red" class="companyName">${element}: ${date.toLocaleString()} | ${item.firm} [${item.fromGrade} -> ${item.toGrade}]</p>`);
                }
                $("#listOfAnalysis").append(`<p style="background-color:yellow" class="companyName">${element}: ${date.toLocaleString()} | ${item.firm} [${item.fromGrade} -> ${item.toGrade}]</p>`);

            } else {
                $("#listOfAnalysis").append(`<p class="companyName">${element}: ${date.toLocaleString()} |  ${item.firm} [${item.fromGrade} -> ${item.toGrade}]</p>`);

            }
        });
    
    });    
});
