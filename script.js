const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://alpha-vantage.p.rapidapi.com/query?interval=5min&function=TIME_SERIES_INTRADAY&symbol=MSFT&datatype=json&output_size=compact",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "8dac42bdd2msh379cce62947963ep14d497jsn911506204ebc",
		"X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});