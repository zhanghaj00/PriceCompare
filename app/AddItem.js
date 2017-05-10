/**
 * Created by zhanghao on 2017/4/5.
 */

import React from 'react';
import {View, StyleSheet,Text,TouchableNativeFeedback,Alert,TextInput,Button,DeviceEventEmitter} from 'react-native';

import {getJdGoodsInfo,getTBGoodsInfo} from './PriceAction';

import TitleBar from './TitleBar'

export  default  class AddItem extends React.Component{

    constructor(props) {
        super(props);
        this.state = { text: '请输入jd url',tbtext:"请输入tb url" };
    }

    componentDidMount() {
        console.log("in Item")
    }

    render(){
        return(
            <View style={itemStyles.container}>
                <TitleBar backAction={this._backAction.bind(this)}/>
                <Text style={itemStyles.text}>请粘贴JD的链接</Text>
                <View style={{flex:1,paddingTop:30,height:300}}>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                    />
                    <Button
                        onPress={this._addItem.bind(this)}
                        title="确认"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>

                <Text style={itemStyles.text}>请粘贴TB的链接</Text>
                <View style={{flex:1,paddingTop:30,height:300}}>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(tbtext) => this.setState({tbtext:tbtext})}
                        value={this.state.tbtext}
                    />
                    <Button
                        onPress={this._addTBItem.bind(this)}
                        title="确认"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </View>
        )
    }



    _addItem(){
        let url = this.state.text;
        if(!url){
            Alert.alert("请输入JD rul");
            return;
        }
        getJdGoodsInfo(url);
        Alert.alert("成功");
        DeviceEventEmitter.emit('finishAdd',url);
        this.props.navigator.pop();
    }

    _addTBItem(){
        let url = this.state.tbtext;
        if(!url){
            Alert.alert("请输入tb rul");
            return;
        }
        getTBGoodsInfo(url);
        Alert.alert("成功");
        DeviceEventEmitter.emit('finishAdd',url);
        this.props.navigator.pop();
    }
    _backAction(){
        //
        this.props.navigator.pop();
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
