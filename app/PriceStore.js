/**
 * Created by zhanghao on 2017/4/6.
 */
import { AsyncStorage } from 'react-native';

let PriceStore = {
    async setObject(key, value){
        const jsonValue = JSON.stringify(value);
        return  await AsyncStorage.setItem(key, jsonValue, (error) => {
            // console.log(key + ' setOrRemoveObject error: ' + error);
        });
    },

     cachedObject(key){
        AsyncStorage.getItem(key)
            .then((data, error) => {
                if (data && data.length > 0) return JSON.parse(data);

                // console.log(key + ' cachedObject error: ' + error);
                return null;
            })
    },

    getAllkey(){
        AsyncStorage.getAllKeys()
            .then((data,error)=>{
                if(data && data.length > 0 ) return JSON.parse(data);
            })
        /*var value = await AsyncStorage.getAllKeys();
        return value;*/
    },
    async clearCachedObject(key){
        return await AsyncStorage.removeItem(key);
    },
}

export default PriceStore;