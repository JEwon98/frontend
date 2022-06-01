import React, {Component, useCallback,useState,useEffect} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Pressable,
    useWindowDimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
    Modal

} from 'react-native';
import RNCamera from 'react-native-camera'
import CheckBox from '@react-native-community/checkbox';
import { CameraScreen } from 'react-native-camera-kit';
import { Camera, CameraType } from 'react-native-camera-kit';
import { launchCamera,launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { HS_API_END_POINT, USER_INFO } from '../../Shared/env';
import { set } from 'react-native-reanimated';

const MatPhotoResult=(props)=> {
    const [photoArr,setPhotoArr] = useState([])
    const [photoStr, setPhotoStr] = useState("")
    const [photodict, setPhotodict] = useState({"id":0,"img":""})
    
    const renderImage = ({item}) =>{
        
        // item = item.slice(1,-1)
        // if(item.length>2){
        //     // 
        item = item.trim().slice(1,-1)
        return (
        
        <View
        style={{alignSelf:'center',marginVertical:10,borderColor:'black',borderWidth:3}}>
            <Image style={{width:responsiveScreenWidth(70),height:responsiveScreenWidth(40)}} 
                    source={{uri:`data:image/jpeg;base64,${item}`}}/>
        </View>
        )
        // }
        
    }

    React.useEffect(()=>{
        console.log(props.userId,props.dogId)
        axios.post(`${HS_API_END_POINT}/api/mat_detector/getimage/`,{
            user_id:props.userId,
            dog_id:props.dogId,
        })
        .then(function(res){
            console.log(res.data[0].username)
            // res.data.map((oneRequest)=>{
            //     setAllRequest(allRequest=>([...allRequest,oneRequest]))
            // })
            setPhotoArr(res.data[0].photo.slice(1,-1).split(','))
            // for (var i = 0; i < photoStr.length; i++) { // 배열 arr의 모든 요소의 인덱스(index)를 출력함.
            //     var arr=[]
            //     setPhotodict({"id":i,"img":photoStr[i].trim().slice(1,-1)})
            //     var tmp_data={};
            //     tmp_data["id"] = i;
            //     tmp_data["img"] = photoArr[i].trim().slice(1,-1);
            //     // {id:i,img:tmp[i].slice(1,-1)}
            //     arr = photoArr
            //     setPhotoArr(()=>{arr.push(photodict)})
            // }
        })
        .catch(function(error){
            // console.log(error)
            console.log('fail get onlyone dog')
        })
    },[])
    return (
        <View style={{flex:1}}>
            <View style={{flex:2, justifyContent:'center'}}>
                <Text style={{textAlign:'center',fontSize:responsiveScreenFontSize(3), fontWeight:'bold'}}>
                    반려견을 위한 매트를 검출하기 위해
                </Text>
                <Text style={{textAlign:'center',fontSize:responsiveScreenFontSize(3), fontWeight:'bold'}}>
                    제출하였던 사진이에요!
                </Text>
            </View>
            <View  style={{flex:8}}>
                <FlatList
                data={photoArr}
                renderItem={renderImage}
                listKey={new Date().getTime().toString()}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    questBox : {
        margin:9,
        flex:1,
        backgroundColor:'white',
        borderRadius:15,
        padding:10
    },
    questText: {
        fontSize:responsiveScreenFontSize(2),
        fontWeight:'bold',
        marginBottom:5
    },
    questInput: {
        borderColor:'black',
        borderWidth:1,
        height:100,
        borderRadius:15, 
        padding:10, 
        fontSize:15
    },


})
export default MatPhotoResult;