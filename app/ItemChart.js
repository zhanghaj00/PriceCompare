/**
 * Created by zhanghao on 2017/4/5.
 */

import React from 'react';
import {View, StyleSheet,Text,ListView,RefreshControl,TouchableNativeFeedback,Button} from 'react-native';

import {LineChart} from 'react-native-chart-android'


import TitleBar from './TitleBar'
import PriceStore from './PriceStore';
import {byTime} from './QueryPriceTask';

export  default  class ItemChart extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing:false,
            xValues: [],
            data: [],
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            listData:[]
        }


    }

    componentDidMount() {
        this._getItemdata();
    }

    _getItemdata(){
        let itemId = this.props.data.itemId;
        let thiz = this;
        if(itemId){
            PriceStore.cachedObject(itemId).then(function(value){
                let valueJson = JSON.parse(value);
                if(valueJson && valueJson.length > 0){
                    let xValues = new Array();
                    let data = new Array();
                    let listData = new Array();
                    valueJson.sort(byTime)
                    valueJson.forEach((items)=>{
                        listData.push(items);
                        if(xValues && data){
                            xValues.push(items.time);
                            data.push(parseInt(items.price));
                            console.log(data.length);
                        }
                    })
                    thiz.setState({
                        xValues:xValues,
                        data:data,
                        listData:listData
                    })
                }
            }).done();
        }
    }
    render(){
        let title = this.props.data.title ;
        let itemId = this.props.data.itemId;
        return(
            <View style={itemStyles.container}>
                <TitleBar backAction={this._backAction.bind(this)}/>
                <Text style={itemStyles.text}>{title}</Text>
                <View style={{flex:1,paddingTop:30,height:230,paddingRight:40,paddingLeft:40}}>
                    <LineChart style={{height:200}} data={this._getLineData()}
                               xAxis={{drawGridLines:false,gridLineWidth:1,position:"BOTTOM"}}/>
                </View>
                <Button
                    onPress={this._onItemPressClear.bind(this,itemId)}
                    title="保留最后一次数据"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
               {/* <TouchableNativeFeedback onPress={this._onItemPressClear.bind(this,itemId)}>
                    <Text style={itemStyles.textClear}>保留最后一次数据</Text>
                </TouchableNativeFeedback>*/}
                <View style={{flex:1,paddingTop:0}}>
                    <ListView
                        dataSource={this.state.dataSource.cloneWithRows(this.state.listData)}
                        renderRow={this._renderItem.bind(this)}
                        enableEmptySections = {true}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this._onRefresh.bind(this)}
                                tintColor="#ff0000"
                                title="下拉刷新"
                                titleColor="#00ff00"
                                colors={['#ff0000', '#00ff00', '#0000ff']}
                                progressBackgroundColor="#ffff00"
                            />
                        }
                    />
                </View>
            </View>
        )
    }
    _onItemPressClear(itemId){
        let thiz = this;
        PriceStore.cachedObject(itemId).then(function (value) {
            if (value) {
                let jsonValue = JSON.parse(value);
                console.log(jsonValue.sort(byTime));
                if(jsonValue && jsonValue.length > 0){
                    let value = jsonValue[jsonValue.length-1]
                    PriceStore.setObject(itemId, [value]);
                }
                thiz._getItemdata();
            }
        });
    }
    _renderItem(newsData){
        return(
            <TouchableNativeFeedback onPress={this._onItemPress.bind(this,newsData)}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={itemStyles.title} numberOfLines={2}>价格： {newsData.price} 时间： {newsData.time}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
    _onRefresh(){

    }
    _onItemPress(){

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
    title: {
        fontSize: 16,
        marginBottom: 8,
        color: '#000000',
        textAlign: 'center'
    },
    text:{
        alignItems:'center',
        textAlign:'center',
        fontSize:18,
        color: '#000001'
    },
    textClear:{
        alignItems:'center',
        textAlign:'center',
        fontSize:10,
        color: '#000001'
    },
})
