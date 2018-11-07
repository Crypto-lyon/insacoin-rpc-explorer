var Decimal = require("decimal.js");
Decimal8 = Decimal.clone({ precision:8, rounding:8 });

var ltcCurrencyUnits = [
        {
                name:"ISC",
                multiplier:1,
                default:true,
                values:["", "isc", "ISC"],
                decimalPlaces:8
        },
        {
                name:"insa",
                multiplier:1000,
                values:["insa"],
                decimalPlaces:5
        },
        {
                name:"cryptolyon",
                multiplier:1000000,
                values:["photon"],
                decimalPlaces:2
        },
        {
                name:"leonod",
                multiplier:100000000,
                values:["leonod", "lnd"],
                decimalPlaces:0
        }
];

module.exports = {
        name:"INSAcoin",
        ticker:"ISC",
        logoUrl:"/img/logo/ltc.svg",
        siteTitle:"INSAcoin Explorer",
        nodeTitle:"INSAcoin Full Node",
        nodeUrl:"https://crypto-lyon.fr",
        demoSiteUrl: "https://crypto-lyon.fr",
        miningPoolsConfigUrls:[
                "",
        ],
        maxBlockWeight: 4000000,
        currencyUnits:ltcCurrencyUnits,
        currencyUnitsByName:{"ISC":ltcCurrencyUnits[0], "insa":ltcCurrencyUnits[1], "cryptolyon":ltcCurrencyUnits[2], "leonod":ltcCurrencyUnits[3]},
	baseCurrencyUnit:ltcCurrencyUnits[3],
	feeSatoshiPerByteBucketMaxima: [5, 10, 25, 50, 100, 150, 200, 250],
	genesisBlockHash: "12a765e31ffd4059bada1e25190f6e98c99d9714d334efa41a195a7e7e04bfe2",
	genesisCoinbaseTransactionId: "97ddfbbae6be97fd6cdf3e7ca13232a3afff2353e29badfab7f73011edd4ced9",
	genesisCoinbaseTransaction: {
		"txid":"97ddfbbae6be97fd6cdf3e7ca13232a3afff2353e29badfab7f73011edd4ced9",
		"hash":"97ddfbbae6be97fd6cdf3e7ca13232a3afff2353e29badfab7f73011edd4ced9",
		"blockhash":"12a765e31ffd4059bada1e25190f6e98c99d9714d334efa41a195a7e7e04bfe2",
		"version":1,
		"locktime":0,
		"size":199,
		"vsize":199,
		"time":1317972665,
		"blocktime":1317972665,
		"vin":[
			{
				"prev_out":{
					"hash":"0000000000000000000000000000000000000000000000000000000000000000",
					"n":4294967295
				},
				"coinbase":"04ffff001d0104404e592054696d65732030352f4f63742f32303131205374657665204a6f62732c204170706c65e280997320566973696f6e6172792c2044696573206174203536"
			}
		],
		"vout":[
			{
				"value":"50.00000000",
				"n":0,
				"scriptPubKey":{
					"hex":"040184710fa689ad5023690c80f3a49c8f13f8d45b8c857fbcbc8bc4a8e4d3eb4b10f4d4604fa08dce601aaf0f470216fe1b51850b4acf21b179c45070ac7b03a9 OP_CHECKSIG",
					"type":"pubkey",
					"reqSigs":1,
					"addresses":[
						"Ler4HNAEfwYhBmGXcFP2Po1NpRUEiK8km2"
					]
				}
			}
		]
	},
	historicalData: [
		{
			type: "blockheight",
			date: "2011-10-07",
			blockHeight: 0,
			blockHash: "1952e403e8d57b1802ce37b7cc95a371a5627cc74b2b52794339e7cf4ca95ac7",
			summary: "The insacoin genesis block.",
			alertBodyHtml: "This is the first block in the insacoin blockchain.",
			referenceUrl: "https://crypto-lyon.fr/"
		},
	],
	exchangeRateData:{
		jsonUrl:"https://api.coinmarketcap.com/v1/ticker/Litecoin/",
		exchangedCurrencyName:"usd",
		responseBodySelectorFunction:function(responseBody) {
			if (responseBody[0] && responseBody[0].price_usd) {
				return responseBody[0].price_usd;
			}
			
			return -1;
		}
	},
	blockRewardFunction:function(blockHeight) {
		var eras = [ new Decimal8(50) ];
		for (var i = 1; i < 34; i++) {
			var previous = eras[i - 1];
			eras.push(new Decimal8(previous).dividedBy(2));
		}

		var index = Math.floor(blockHeight / 840000);

		return eras[index];
	}
};
