/**
 * Created by zhanghao on 2017/4/5.
 */

import React from 'react';
import {View,StyleSheet} from 'react-native';

import Button from './Button'


export default class TitleBar extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.isMain?
                    <Button text={"添加URL"} style={styles.button} onPress={this.props.addItemAction}/>:
                    <Button text={"返回"} style={styles.button} onPress={this.props.backAction}/>
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        height:50,
        justifyContent:'flex-start',
        borderBottomWidth:1,
        borderBottomColor:'#e5e5e5'
    },
    button:{
        width:80
    }
});