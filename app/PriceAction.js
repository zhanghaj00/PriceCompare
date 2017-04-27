/**
 * Created by zhanghao on 2017/4/7.
 */

import PriceStore from './PriceStore';
import Cheerio from 'cheerio';

export let fetchPrice =  (itemId,successCallback,failCallback) =>{

    var url = 'https://pm.3.cn/prices/mgets?origin=2&skuIds='+itemId;

    fetch(url)
        .then((response) => response.text())
        .then((responseText) => {
            let result = JSON.parse(responseText);
            successCallback(result[0].p);
        })
        .catch((err) => {
            failCallback(err);
        });
}

export let getJdGoodsInfo = (jdUrl) =>{
    //https://item.m.jd.com/product/717252.html?
    // resourceType=jdapp_share&resourceValue=CopyURL&utm_source=
    // androidapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=CopyURL
    fetch(jdUrl)
        .then((response) => response.text())
        .then((responseText) => {
            var $ = Cheerio.load(responseText);
            let title = $('.title-text').text();
            let titleShort = title.replace(/(^\s*)|(\s*$)/g, "").substring(0,6);
            let itemId = $('#pingjia').attr('report-pageparam');
            if(itemId){
                fetchPrice(itemId,(price)=>{
                    PriceStore.cachedObject(itemId).then(function(value){
                        let dateTime = new Date();
                        let timeStr = dateTime.getFullYear()+""+(dateTime.getMonth()+1)<10?("0"+(dateTime.getMonth()+1)):(dateTime.getMonth()+1) +"" +dateTime.getDate();
                        let newPrice = {itemId:itemId,price:price,title:title,time:timeStr,shortTitle:titleShort};
                        if(value){
                            let jsonValue = JSON.parse(value);
                            if(jsonValue[0].time == timeStr){return;}
                            PriceStore.clearCachedObject(itemId).then(function(){
                                jsonValue.push(newPrice);
                                PriceStore.setObject(itemId,jsonValue);
                            })

                        }else{
                            PriceStore.setObject(itemId,[newPrice]);
                        }
                    });

                })
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

export let getTBGoodsInfo = (tbUrl) =>{
    //http://zmnxbc.com/s/ceHwj?tm=aa3104
    fetch(tbUrl)
        .then((response) => response.text())
        .then((responseText) => {
            var $ = Cheerio.load(responseText);
            let scriptArray = $('script').toArray();

            if (scriptArray && scriptArray.length > 2) {
                var scriptStr = scriptArray[2].children[0].data;

                var jsonStr = scriptStr.split("=")[1].split(";")[0]

                var json = JSON.parse(jsonStr);

                if (json && json.itemPrice) {
                    let titleShort = json.title;
                    let title = json.content;
                    let url = tbUrl;
                    let price = json.itemPrice;

                    if (url) {
                        PriceStore.cachedObject(url).then(function (value) {
                            let dateTime = new Date();
                            let timeStr = dateTime.getFullYear() + "" + (dateTime.getMonth() + 1) < 10 ? ("0" + (dateTime.getMonth() + 1)) : (dateTime.getMonth() + 1) + "" + dateTime.getDate();
                            let newPrice = {
                                url: url,
                                price: price,
                                title: title,
                                time: timeStr,
                                shortTitle: titleShort
                            };
                            if (value) {
                                let jsonValue = JSON.parse(value);
                                if (jsonValue[0].time == timeStr) {
                                    return;
                                }
                                PriceStore.clearCachedObject(itemId).then(function () {
                                    jsonValue.push(newPrice);
                                    PriceStore.setObject(url, jsonValue);
                                })

                            } else {
                                PriceStore.setObject(url, [newPrice]);
                            }
                        });
                    }
                }
            }

        })
        .catch((err) => {
            console.log(err);
        });
}