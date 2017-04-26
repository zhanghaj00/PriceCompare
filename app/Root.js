/**
 * Created by zhanghao on 2017/4/5.
 */


import React from 'react';
import {Navigator,View}  from 'react-native'


import App from './App';

import {job} from './QueryPriceTask';

export default  class Root extends React.Component{

    componentDidMount() {
        job();
    }
    render(){
        return(
            <View style={{flex: 1}}>
                <Navigator
                    initialRoute={{ name: "App", component: App }}
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return (
                            <Component  {...route.params} navigator = {navigator}  />
                        )
                    }}
                />
            </View>
        )
    }
}