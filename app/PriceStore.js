/**
 * Created by zhanghao on 2017/4/6.
 */
import { AsyncStorage } from 'react-native';

let PriceStore = {
     setObject(key, value){
        const jsonValue = JSON.stringify(value);
        return   AsyncStorage.setItem(key, jsonValue, (error) => {
            // console.log(key + ' setOrRemoveObject error: ' + error);
        });
    },

     cachedObject(key){
       return  AsyncStorage.getItem(key)
            .then((data, error) => {
                if (data && data.length > 0) return data;
                // console.log(key + ' cachedObject error: ' + error);
            })
    },

    getAllkey(){
          return AsyncStorage.getAllKeys()
            .then((data,error)=>{
                if(data && data.length > 0 )  return  data;
            });
       /* return await AsyncStorage.getAllKeys();*/
        /*var value = await AsyncStorage.getAllKeys();
        return value;*/
    },
    clearCachedObject(key){
        return  AsyncStorage.removeItem(key);
    },
}

export default PriceStore;