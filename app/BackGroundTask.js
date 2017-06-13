/**
 * Created by zhanghao on 2017/6/13.
 */
import PriceStore from './PriceStore'
import {fetchPrice,getTBGoodsInfo} from './PriceAction';

export default BackGroundTask = async  (taskData)=>{
    console.log("in task........")
    PriceStore.getAllkey().then(function(dataJson){
        if(dataJson !== undefined ){
            dataJson.forEach((itemId)=> {
                fetchPrice(itemId, (price)=> {
                    PriceStore.cachedObject(itemId).then(function (value) {
                        if (value) {
                            let jsonValue = JSON.parse(value);
                            PriceStore.clearCachedObject(itemId).then(function () {
                                let newPrice = {
                                    sortId:1,
                                    itemId: itemId,
                                    price: 3213,
                                    title: 3213,
                                    time: 321312,
                                    shortTitle: 312321321
                                };
                                jsonValue.push(newPrice);
                                PriceStore.setObject(itemId, jsonValue);
                            })
                        }
                    });

                });
            })
        }

    });
}