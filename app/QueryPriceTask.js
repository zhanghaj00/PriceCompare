/**
 * Created by zhanghao on 2017/4/6.
 */

import PriceStore from './PriceStore'

//import BackgroundJob from "react-native-background-job";
import {fetchPrice,getTBGoodsInfo} from './PriceAction';

/*export let  task = () => {
    // 要做的事情
    var backgroundSchedule = {
        jobKey: "myJob",
        timeout: 30000,
        job:job()
    }

    BackgroundJob.schedule(backgroundSchedule);
}*/

export let job = ()=>{
    PriceStore.getAllkey().then(function(dataJson){
        if(dataJson !== undefined ){
            dataJson.forEach((itemId)=> {
                if (itemId && itemId.length > 10) {
                    getTBGoodsInfo(itemId);
                } else {
                    fetchPrice(itemId, (price)=> {
                        PriceStore.cachedObject(itemId).then(function (value) {
                            let dateTime = new Date();
                            let timeStr = dateTime.getFullYear() + "" + (dateTime.getMonth() + 1) < 10 ? ("0" + (dateTime.getMonth() + 1)) : (dateTime.getMonth() + 1) + "" + dateTime.getDate();

                            if (value) {
                                let jsonValue = JSON.parse(value);
                                if (jsonValue[0].time == timeStr) {
                                    return;
                                }
                                PriceStore.clearCachedObject(itemId).then(function () {
                                    let newPrice = {
                                        itemId: itemId,
                                        price: price,
                                        title: jsonValue[0].title,
                                        time: timeStr,
                                        shortTitle: jsonValue[0].titleShort
                                    };
                                    jsonValue.push(newPrice);
                                    PriceStore.setObject(itemId, jsonValue);
                                })
                            }
                        });

                    });
                }
                console.log("flush new Data");
            })
        }

    });
}