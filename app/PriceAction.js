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
            successCallback(result.p);
        })
        .catch((err) => {
            failCallback(err);
        });
}

export let getJdGoodsInfo = (jdUrl) =>{
    //https://item.m.jd.com/product/717252.html?
    // resourceType=jdapp_share&resourceValue=CopyURL&utm_source=
    // androidapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=CopyURL

    var $ = Cheerio.load(jdUrl);
    let title = $('body');
    let itemId = $('#pingjia').attr('report-pageparam');
    //let itemId = jdUrl.substring(29,jdUrl.index(".html"));
    if(itemId){
        fetchPrice(itemId,(price)=>{
            let value = PriceStore.cachedObject(itemId);
            let newPrice = {itemId:itemId,price:price,time:new Date()};
            if(value){
                value.push(newPrice);
            }else{
                PriceStore.setObject(itemId,[newPrice]);
            }
        })
    }
    //放入内存中
}