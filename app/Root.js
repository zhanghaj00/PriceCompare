/**
 * Created by zhanghao on 2017/4/5.
 */


import React from 'react';
import {Navigator,View}  from 'react-native'


import App from './App';

export default  class Root extends React.Component{




    render(){
        return(
            <View style={{flex: 1}}>
                <Navigator
                    renderScene={(route, navigator) => {
                        let Component = App;
                        return (
                            <Component navigator = {navigator} route = {route}  />
                        )
                    }}
                />
            </View>
        )
    }
}