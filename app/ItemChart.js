/**
 * Created by zhanghao on 2017/4/5.
 */

import React from 'react';
import {View, StyleSheet,Text} from 'react-native';

import {LineChart} from 'react-native-chart-android'


import TitleBar from './TitleBar'

export  default  class ItemChart extends React.Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("in Item")
    }

    render(){
        return(
            <View style={itemStyles.container}>
                <TitleBar backAction={this._backAction.bind(this)}/>
                <Text style={itemStyles.text}>收藏的商品1</Text>
                <View style={{flex:1,paddingTop:30,paddingBottom:500}}>
                    <LineChart style={{flex:1}} data={this._getLineData()}/>
                </View>
            </View>
        )
    }

    _backAction(){
        //
        this.props.navigator.pop();
    }
    _getLineData() {

        var data={
            xValues:['1','2','3'],
            yValues:[
                {
                    data:[1.0,5.0,6.0],
                    label:'test1',
                    config:{
                        color:'blue'
                    }
                },
                {
                    data:[3.0,15.0,22],
                    label:'test2',
                    config:{
                        color:'red'
                    }
                },
                {
                    data:[7,12,22],
                    label:'test2',
                    config:{
                        color:'yellow'
                    }
                }
            ]
        };
        return data;
    }

}

const itemStyles = StyleSheet.create({

    container:{
        flexDirection:'column',
        position:'absolute',
        top:10,
        left:0,
        right:0,
        bottom:0
    },
    text:{
        alignItems:'center',
        textAlign:'center',
        fontSize:18,
        color: '#000001'
    },
})
