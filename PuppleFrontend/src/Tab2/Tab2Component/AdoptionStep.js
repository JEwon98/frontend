
//import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useIsFocused} from 'react';
import {
    View, 
    Text, 
    Image, 
    StyleSheet, 
    FlatList,
    Pressable, 
    useWindowDimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal

} from 'react-native';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import {SafeAreaView} from 'react-native-safe-area-context';
import Walk from '../../Template/Walk/';
//import * as RNFS from 'react-native-fs'
import axios from 'axios';
//import { HS_API_END_POINT } from '../../Shared/env';
//import { setJwt,setUserInfo } from '../Store/Actions';
//import { connect } from 'react-redux';

const AdoptionStep = ({navigation,aboutDog})=>{
    // 1) dog에서 인증 절차 개수, 종류 받아오기 
    const isFocused = useIsFocused();

    // 2) 찜목록에서 인증 진행률 받아오기-해당 인증 절차에 관한  (판매자 아이디로)
    
    //React.useEffect(()=> {
        /*axios.post(`${HS_API_END_POINT}/api/users/wishlist/`,{ 
            email: USER_INFO.USER_EMAIL,}) */
        
        /*axios.post(`${HS_API_END_POINT}/api/users/wishlist/`,{
            "email":USER_INFO.USER_EMAIL,"dog_id":item.id})
        .then(function(res){
            if(res.data==="success"){
                console.log(success);
            }
        })
        .catch(function(error){
            console.log(error);
        });*/
    //},[isFocused]);

    // 3) 인증 진행률을 list로 넘기기 

    // 4) progress bar 순으로 // 동의서 -> 설문지 -> 인증 절차 1, 2, 3... 순으로 cloumn 나열

    // 5) 

    // 또 빠뜨린거 없나..?

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [parentWidth, setParentWidth] = useState({width:0});
    const onLayout=(event)=>{
        const {x,y,height,width} = event.nativeEvent.layout;
        setParentWidth({width:width});
    };
    return (
        <View style={styles.container} onLayout={onLayout}>
            <View style={{marginVertical:20}}>
            <Modal
            animationType='slide'
            transparent={false}
            visible={modalVisible}
            onRequestClose={()=>{
                setModalVisible(!modalVisible)
            }}>
                <View
                style={{flexDirection:'column',flex:1}}>
                    <Pressable
                    style={{marginTop:40,
                        marginBottom:40,
                        zIndex:1,}}
                    onPress={()=>{
                        setModalVisible(!modalVisible)
                    }}>
                        <Text
                        style={{fontSize:20,color:'#006ef9'}}>{'←'}돌아가기</Text>
                    </Pressable>
                    <Walk/>
                </View>
            </Modal>
            <Pressable
            onPress={()=>{setModalVisible(true)}}
            style={{
                // width:parentWidth.width,
                borderColor:'purple',
                borderWidth:3,
                borderRadius:40,
                marginHorizontal:60,
                width:parentWidth.width/1.5,
                alignSelf:'center',
                flexDirection:'row',
                justifyContent:'space-between'
                }}>
                <Text
                style={{fontSize:25}}>Walk</Text>
                <Text
                style={{fontSize:25}}>75%</Text>
            </Pressable>
            </View>
            <View>
            <Modal
            animationType='slide'
            transparent={false}
            visible={modalVisible2}
            onRequestClose={()=>{
                setModalVisible2(!modalVisible2)
            }}>
                <View
                style={{flexDirection:'column',flex:1}}>
                    <Pressable
                    style={{marginTop:40,
                        marginBottom:40,
                        zIndex:1,}}
                    onPress={()=>{
                        setModalVisible2(!modalVisible2)
                    }}>
                        <Text
                        style={{fontSize:20,color:'#006ef9'}}>{'←'}돌아가기2</Text>
                    </Pressable>
                    <Walk/>
                </View>
            </Modal>
            <Pressable
            onPress={()=>{setModalVisible2(true)}}
            style={{
                borderColor:'purple',
                borderWidth:3,
                borderRadius:40,
                marginHorizontal:60}}>
                <Text
                style={{fontSize:25,textAlign:'center'}}>Other Auth</Text>
            </Pressable>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    bookBox: {
        margin:'5%',
        alignItems:'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
    pressItemStyle: { 
        height: '90%',
        alignItems:'center',
        shadowColor: 'gray',
        shadowOffset: {
          width: 3,
          height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 30
    },
    image: {
      width: '100%',
      height: '100%',
      borderWidth:1,
      borderColor: '#C2C2C2',
      borderRadius: 5

    },
    title: {
        width: '100%',
        textAlign: 'center',
        height: '10%',
        overflow: 'hidden',
        fontSize: responsiveScreenFontSize(0.9)
    },
    removeButton: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 100,
      backgroundColor: 'red',
      position: 'absolute',
      alignSelf: 'flex-end',
      marginTop: 5,
      zIndex: 10
    },
    button: {
        marginHorizontal:5,
        borderRadius: 15,
        padding: 15,
        elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#9C27B0",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },

})

export default AdoptionStep;