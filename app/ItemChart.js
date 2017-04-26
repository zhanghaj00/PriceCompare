/**
 * Created by zhanghao on 2017/4/5.
 */

import React from 'react';
import {View, StyleSheet,Text} from 'react-native';

import {LineChart} from 'react-native-chart-android'


import TitleBar from './TitleBar'
import PriceStore from './PriceStore';

export  default  class ItemChart extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            xValues: [],
            data :  [],
        }
    }

    componentDidMount() {
        let itemId = this.props.data.itemId;
        let thiz = this;
        if(itemId){
            PriceStore.cachedObject(itemId).then(function(value){
                let valueJson = JSON.parse(value);
                if(valueJson && valueJson.length > 0){
                    let xValues = new Array();
                    let data = new Array();
                    valueJson.forEach((items)=>{
                        if(xValues && data){
                            xValues.push(items.time);
                            data.push(parseInt(items.price));
                            console.log(data.length);
                            thiz.setState({
                                xValues:xValues,
                                data:data
                            })
                        }
                    })
                }
            }).done();
        }
    }

    render(){
        let title = this.props.data.title ;
        return(
            <View style={itemStyles.container}>
                <TitleBar backAction={this._backAction.bind(this)}/>
                <Text style={itemStyles.text}>{title}</Text>
                <View style={{flex:1,paddingTop:30,paddingBottom:500}}>
                    <LineChart style={{flex:1}} data={this._getLineData()}
                               xAxis={{drawGridLines:false,gridLineWidth:1,position:"BOTTOM"}}/>
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
            xValues:this.state.xValues,
            yValues:[
                {
                    data:this.state.data,
                    label:'t',
                    config:{
                        color:'blue'
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
