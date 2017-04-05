/**
 * Created by zhanghao on 2017/4/5.
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    RefreshControl,
    TouchableNativeFeedback
} from 'react-native'

import ItemChart from './ItemChart';


export  default  class App extends  React.Component{


    constructor(props){
        super(props);
        this.state ={
            isRefreshing:false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            data:[{id:1,title:'单车2',price:'21.5'},{id:2,title:'单车1',price:'21.5'}]
        }
    }

    componentDidMount(){
        this._getCacheData();
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>收藏的商品</Text>
                <View style={styles.list}>
                    <ListView
                        dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                        renderRow={this._renderItem.bind(this)}
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

    _onRefresh(){

    }

    _onItemPress(){
        console.log("press");
        this.props.navigator.push({
            name: 'ItemChart',
            component: ItemChart
        })
    }

    _renderItem(newsData){
        return(
            <TouchableNativeFeedback onPress={this._onItemPress.bind(this)}>
                <View style={{flexDirection:'row'}}>
                    <View style={styles.itemViewContainer}>
                        <Text style={styles.title} numberOfLines={2}>{newsData.title}   当前价格： {newsData.price}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }

    _getCacheData(){
        //获取缓存的数据
        //set Stat
        this.setState({
            data:[{id:1,title:'单车',price:'21.5'},{id:1,title:'单车2',price:'22.5'}]
        })

    }

}

const styles = StyleSheet.create({

    container:{
        flexDirection:'column',
        position:'absolute',
        top:60,
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
    list:{flex:1,paddingLeft:60,paddingRight:60,paddingTop:60},
    itemViewContainer:{
        flex:1,
        padding:10
    },
    title: {
        fontSize: 16,
        marginBottom: 8,
        color: '#000000',
        textAlign: 'center'
    },
    separator: {
        height: 1,
        backgroundColor: '#cccccc',
    },
})