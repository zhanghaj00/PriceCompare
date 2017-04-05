/**
 * Created by zhanghao on 2017/4/5.
 */


import React,{Component} from 'react';
import {Navigator}  from 'react-native'


import App from './App';

export default  class Root extends React.Component{




    render(){
        return(
            <Navigator
                renderScene={(route, navigator) => {
                    let Component = App;
                    return (
                        <Component navigator = {navigator} route = {route}  />
                    )
                }}
            />
        )
    }
}