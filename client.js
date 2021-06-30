const ccxws=require('ccxws')

const binance=new ccxws.Binance();
const coinbasepro=new ccxws.CoinbasePro();
const kucoin=new ccxws.Kucoin();
const bitfinex=new ccxws.Bitfinex();
const bitmex=new ccxws.BitMEX();
const kraken=new ccxws.Kraken();
const ftx=new ccxws.Ftx();
const gemini=new ccxws.Gemini();
const hitbtc=new ccxws.HitBTC();
const huobi=new ccxws.Huobi();
const okex=new ccxws.OKEx();
const poloniex=new ccxws.Poloniex();

const btcbinance={id:'BTCUSDT',base:'BTC',quote:'USDT'}
const btccoinbasepro={id:'BTC-USD',base:'BTC',quote:'USD'}
const btckucoin={id:'BTC-USDT',base:'BTC',quote:'USDT'}
const btcbitfinex={id:'BTCUSD',base:'BTC',quote:'USD'}
const btcbitmex={id:'XBTUSD',base:'XBT',quote:'USD'}
const btckraken={id:'XBTUSDT',base:'XBT',quote:'USDT'}
const btcftx={id:'BTC/USDT',base:'BTC',quote:'USDT'}
const btcgemini={id:'BTCUSD',base:'BTC',quote:'USD'}
const btchitbtc={id:'BTCUSD',base:'BTC',quote:'USD'}
const btchuobi={id:'btcusdt',base:'BTC',quote:'USDT'}
const btcokex={id:'BTC-USDT',base:'BTC',quote:'USDT'}
const btcpoloniex={id:'USDT_BTC',base:'BTC',quote:'USDT'}

const validexchanges=['Binance','CoinbasePro','KuCoin','Bitfinex','BitMEX','Kraken','FTX','Gemini','HitBTC','Huobi','OKEx','Poloniex']
const exchangeindices={Binance:0,CoinbasePro:1,KuCoin:2,Bitfinex:3,BitMEX:4,Kraken:5,FTX:6,Gemini:7,HitBTC:8,Huobi:9,OKEx:10,Poloniex:11}
const bidexchangefees=[0.00075,0.0035,0.001,0.002,0.0003,0.0002,0.002,0.0015,0.001,0.002,0.0001,0.00125]
const askexchangefees=[0.00075,0.0035,0.001,0.0008,0.0008,0.0007,0.002,0.0025,0.0025,0.002,0.0003,0.00125]
var fiatcollection=[5000,5000,5000,5000,5000,5000,5000,5000,5000,5000,5000,5000]
var cryptocollection=[0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1]
var tickerbidlist=[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0]
var tickerasklist=[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0]
var bestbidexchange=''
var bestaskexchange=''
var bestbid=0.0
var bestask=1000000.0
var lastbid=0.0
var lastask=0.0

binance.on('ticker',ticker=>aggregate(ticker))
coinbasepro.on('ticker',ticker=>aggregate(ticker))
kucoin.on('ticker',ticker=>aggregate(ticker))
bitfinex.on('ticker',ticker=>aggregate(ticker))
bitmex.on('ticker',ticker=>aggregate(ticker))
kraken.on('ticker',ticker=>aggregate(ticker))
ftx.on('ticker',ticker=>aggregate(ticker))
gemini.on('ticker',ticker=>aggregate(ticker))
hitbtc.on('ticker',ticker=>aggregate(ticker))
huobi.on('ticker',ticker=>aggregate(ticker))
okex.on('ticker',ticker=>aggregate(ticker))
poloniex.on('ticker',ticker=>aggregate(ticker))

binance.subscribeTicker(btcbinance)
coinbasepro.subscribeTicker(btccoinbasepro)
kucoin.subscribeTicker(btckucoin)
bitfinex.subscribeTicker(btcbitfinex)
bitmex.subscribeTicker(btcbitmex)
kraken.subscribeTicker(btckraken)
ftx.subscribeTicker(btcftx)
gemini.subscribeTicker(btcgemini)
hitbtc.subscribeTicker(btchitbtc)
huobi.subscribeTicker(btchuobi)
okex.subscribeTicker(btcokex)
poloniex.subscribeTicker(btcpoloniex)

const aggregate=(ticker)=>{
  if(ticker.bid==tickerasklist[exchangeindices[ticker.exchange]]||ticker.ask==tickerasklist[exchangeindices[ticker.exchange]]){return}
  let localbestbid=0.0
  let localbestask=1000000.0
  tickerbidlist[exchangeindices[ticker.exchange]]=ticker.bid
  tickerasklist[exchangeindices[ticker.exchange]]=ticker.ask
  tickerbidlist.forEach((v,i)=>{if(v>localbestbid){localbestbid=v;localbestbidexchange=validexchanges[i]}})
  tickerasklist.forEach((v,i)=>{if(v<localbestask){localbestask=v;localbestaskexchange=validexchanges[i]}})
  if(localbestbid>localbestask){
    console.log(`[${ticker.base}/${ticker.quote}] Sell on ${localbestbidexchange} for ${localbestbid}`)
    console.log(`[${ticker.base}/${ticker.quote}] Buy on ${localbestaskexchange} for ${localbestask}`)
  }
  if(localbestbid>bestbid){bestbid=localbestbid}
  if(localbestask<bestask){bestask=localbestask}
}

const feecalculator=(bid,ask,bidexchange,askexchange)=>{
  // To do: apply dynamic fee aggregation
}
