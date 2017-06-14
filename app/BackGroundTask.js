/**
 * Created by zhanghao on 2017/6/13.
 */
import PriceStore from './PriceStore'
import {fetchPrice,getTBGoodsInfo} from './PriceAction';

export default BackGroundTask = async  (taskData)=>{

    this.timer = setTimeout(
        () => { console.log('把一个定时器的引用挂在this上::::'); console.log(taskData);},
        2000
    );

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