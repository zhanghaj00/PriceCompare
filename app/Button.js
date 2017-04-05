/**
 * Created by zhanghao on 2017/4/5.
 */
import React from 'react';
import {View,TouchableOpacity,StyleSheet,Text } from 'react-native'


export  default class Button extends React.Component{


    render() {
        return (
            <TouchableOpacity activeOpacity ={0.5} underlayColor="#B5B5B5" onPress={this.props.onPress}>
                <View  style={[styles.button,this.props.style]}>
                    <Text>{this.props.text}</Text>
                </View>
            </TouchableOpacity >
        );
    }
}


const styles = StyleSheet.create({
    button:{
        height:50,
        justifyContent:'center',
        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor:'#e5e5e5'
    }
});
