import React, {useState, createRef} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { NavigationContainer, useScrollToTop} from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Animation from 'lottie-react-native';
import axios from 'axios';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import { Divider } from 'react-native-paper';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
//import FilterDogList from '../../../DogList/FilterComponent/FilterDogList';
import FilterDogList from './FilterDogList11';
import { API_KEY2 } from '../../../../secret2';

// import Loader from './Components/Loader';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const bigOne = screenWidth > screenHeight ? screenWidth:screenHeight;
const smallOne = screenWidth < screenHeight ? screenWidth:screenHeight;

let selectedFilter = [
    {filter:'gender',value : ""}, //
    {filter:'kind',value : ""},  //
    {filter:'desexing',value : ""}, //
    {filter:'age',value : ""},
    {filter:'size',value : ""},
    {filter:'hair_loss',value : ""},
    {filter:'bark_term',value : ""},
    {filter:'activity',value : ""},
    {filter:'person_personality',value : ""},
]

let dogRegInfo = [
    {filter:'dogNm',value : ""}, //
    {filter:'gender',value : ""}, //
    {filter:'kind',value : ""}, //
    {filter:'desexing',value : ""},
    {filter:'registration_number',value : ""},
    {filter:'location',value : ""},
]


function animalGET(urls) {
    axios.get(urls)
        .then(function(response){
            // handle success
            console.log("** LOG: Success");
            //console.log(response);
            console.log("------------");

            careInfo = response.data.response.body.items.item
            console.log(careInfo);

            //showCheckBox(careInfo)

        })
        .catch(function (error) {
            //handle error
            //console.log("** Error:", urls);
            //showCheckBox(careInfo)
            careInfo = null
            console.log(error);
        });
    
    return careInfo

}

const AnimalNumberAPI = (props) => {

    /*********깃허브에 올리면 안됨*********** */
    //const animal1 = "410097800331388";

    const [animalNumber, setAnimalNumber] = useState('');
    const [RFID, setRFID] = useState('');
    const [ownerBirth, setOwnerBirth] = useState('');
    const [ownerName, setOwnerName] = useState("");


    const passwordInputRef = createRef();

    const onChangeText = (name) => {
        setName(name);
    }

    const onChangeNum = (RFID) => {
        setNum(RFID);
    }

    const sendDogInfo = (careInfo) => {
        props.onChangeDogInfo(careInfo, animalNumber)
        console.log("** ************************** ** ");
    }

    
    const animalNumberAPI = async () => {
        if(animalNumber === ""){
            Alert.alert(
                "번호를 입력해주세요!"
            );
        }
        else{

            console.log("** 입력 정보: ", animalNumber, ownerName);

            var url = `http://openapi.animal.go.kr/openapi/service/rest/animalShelterSrvc/shelterInfo`;
            
            // 원래 이 쿼리를 써야하지만, demo를 위해서 - 동물센터 번호가 없기 때문에 이름으로만 검색
            // var queryParams = `?` + encodeURIComponent('care_reg_no') + '=' + encodeURIComponent(animalNumber); /* */
            // queryParams += `&` + encodeURIComponent('care_nm') + '=' + encodeURIComponent(ownerName); /* */
            // queryParams += `&` + encodeURIComponent('ServiceKey') + '=' + API_KEY2; /* Service Key*/
            
            var queryParams = `?` + encodeURIComponent('serviceKey') + '=' + API_KEY2; /* Service Key*/
            queryParams += `&` + encodeURIComponent('care_nm') + '=' + encodeURIComponent(ownerName); /* */
            
            console.log('url:', url+queryParams)
            Promise.all([animalGET(url+queryParams)]) 
            .then(careInfo => {
                console.log("careInfo:",careInfo) // 동물센터정보
                sendDogInfo(careInfo)
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    return (

        <View style={styles.formArea}>
                
                        <TextInput
                            style={[styles.textFormTop, styles.textFrom]}
                            onChangeText={(AnimalNumber) =>
                                setAnimalNumber(AnimalNumber)
                            }
                            placeholder="보호센터등록번호(필수)" 
                            placeholderTextColor="#C9C9C9"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                passwordInputRef.current &&
                                passwordInputRef.current.focus()
                            }
                            underlineColorAndroid="#f000"
                            blurOnSubmit={false}
                        />
                        <TextInput
                            style={[styles.textFormBottom, styles.textFrom]}
                            onChangeText={(OwnerName) =>
                                setOwnerName(OwnerName)
                            }
                            placeholder="동물보호센터명(선택)" //12345
                            placeholderTextColor="#C9C9C9"
                            keyboardType="default"
                            ref={passwordInputRef}
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                            secureTextEntry={false}
                            underlineColorAndroid="#f000"
                            returnKeyType="next"
                        />

                    <TouchableOpacity 
                        onPress={animalNumberAPI}
                        style={styles.nextBtn}>
                        <Text style={[styles.botText, {color: 'white'}]}>조회하기</Text>
                    </TouchableOpacity>
                    </View>
    )
}

const data = [
    { title : '등록하시는 분은 누구인가요? ', filterNumber : 0},
];

const choicesName=[
    ['개인분양자','동물보호소'],
];

function EnrollStep1({navigation}) {
    const ref = React.useRef(null);
    const [careInfo, setDogInfo] = useState(null);
    const [animalNumber, setAnimalNumber] = useState(null);
    const [animalName, setAnimalName] = useState(null);

    useScrollToTop(ref);

    const onChangeDogInfo = (careInfo, animalNumber) => {
        setDogInfo(careInfo)
        setAnimalNumber(animalNumber)
        console.log("Changed !", careInfo, animalNumber);
    } // props 로 자식에서 부모로 값 전달하는 거 하던 중


    const {width, height} = useWindowDimensions();

    const gotoNextScreen = (careInfo) => {
        /*if(name === ""){
            Alert.alert(
                "소개를 입력해주세요!"
            );
        }
        else*/
        //if{
            
            dogRegInfo[0].value=animalName
            dogRegInfo[1].value=selectedFilter[0].value
            dogRegInfo[2].value=selectedFilter[1].value
            dogRegInfo[3].value=selectedFilter[2].value
            dogRegInfo[4].value=""
            dogRegInfo[5].value=careInfo.orgNm

            console.log("---navigate to EnrollStep2---> ", selectedFilter, dogRegInfo);

            navigation.navigate('EnrollStep2',{selectedFilter:selectedFilter.slice(3,), dogRegInfo:dogRegInfo});
        //}
    }

    return (
       
        <KeyboardAwareScrollView style={{ backgroundColor: "white", flex: 1 }} >   

           
        <View style={{flex:1,flexDirection:'column', padding:'3%',backgroundColor:'white'}}>

            <ScrollView ref = {ref} style={[styles.scrollView]}> 

                <View style={{justifyContent:'flex-start'}}>
                    <Text style={styles.title}>Step 1. 반려견 정보 작성하기{'\n'}</Text>
                    <Text style={[styles.subtitle]}>반려견 분양을 위해 보호소 번호 조회가 필요해요. </Text>
                    
                    <AnimalNumberAPI onChangeDogInfo={onChangeDogInfo} >  </AnimalNumberAPI>

                    <Text>{careInfo === null ? null : 
                    
                        (careInfo[0] === undefined || careInfo[0] === 'undefined') ?
                        <Icon name='close-circle' color='red'> 조회 실패</Icon>  : 
                    <Icon name='check-circle' color='green'> 조회 완료</Icon> }
                    </Text>
                   
                <Divider style={{margin:"5%"}} />
                
                </View>
                
                <View style={[{justifyContent:'flex-start'}]}>
                    {/*<Text style={[styles.subtitle, {marginTop: "3%"}]}> 동물등록된 반려견 분양이 가능해요. </Text>*/}
                    
                    {console.log("** dog: ", careInfo)}
                    {careInfo == null || (careInfo[0] === undefined || careInfo[0] === 'undefined') ? 
                    null : 

                    <>

                        <Text style={styles.subtitle}>보호소 등록 정보의 지역을 확인해주세요. </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <View style={styles.btnTxtStyles}>
                                <Text >지역</Text>
                            </View>
                            <View style={[{flex:1},styles.btnTxtStyles]}>
                                <Text>{careInfo[0].orgNm}</Text>
                            </View>
                        </View>
                        
                        <Divider style={{margin:"5%"}} />
                        
                        <Text style={styles.subtitle}>반려견 정보를 입력해주세요. </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <View style={styles.btnTxtStyles}>
                                <Text>이름</Text>
                            </View>

                            <View style={[{flex:1},styles.btnTxtStyles]}>
                                <TextInput
                                style={[styles.textFormMiddle, styles.textFrom,  {borderRadius:7}]}
                                onChangeText={(AnimalName) =>
                                    setAnimalName(AnimalName)
                                }
                                placeholder="반려견 이름" 
                                placeholderTextColor="#C9C9C9"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current &&
                                    passwordInputRef.current.focus()
                                }
                                underlineColorAndroid="#f000"
                                blurOnSubmit={false}
                                />
                            </View>
                        </View>
                       
                        <Divider style={{margin:"5%"}} />

                        <Text style={styles.subtitle}>반려견 정보를 체크해주세요. </Text>
                        
                        <FilterDogList selectedFilter={selectedFilter}>   
                        </FilterDogList>

                        <Divider style={{margin:"5%"}} />

                        
                        <View  style={{flex:3,justifyContent:'flex-end'}}>
                            <TouchableOpacity 
                                onPress={() => {
                                    gotoNextScreen(careInfo[0]);
                                }}
                                style={styles.nextBtn}>
                                <Text style={[styles.botText, {color: 'white'}]}>다음</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    }
                   {   console.log("---selectedFilter---> ", selectedFilter)}
                   {   console.log("---dogRegInfo---> ", dogRegInfo, animalName)}

                </View>


                <View style={[styles.board,{backgroundColor:'#E1BEE7',borderRadius:20}]}>
                    
                </View>
        
                    
            </ScrollView>
        </View>
        </KeyboardAwareScrollView>
    );
}

/*

board 안에 있는 것

{data.map((x) => (
                    <Choice
                        text={x.title}
                        btnTxtStyles={styles.btnTxtStyles}
                        btnstyles={styles.btnstyles}
                        btnstylesSelect={styles.btnstylesSelect}
                        onValueChange={handleValueChange}
                        choicesCount={choicesName[x.filterNumber].length}
                        choicesName={choicesName[x.filterNumber]}
                    />
                    ))}
                      
                    <View style={[styles.formArea, {width: width > height ? '40%': '75%'}]}>
                        <TextInput
                            style={[styles.textFormTop, {height: width >height ? '35%' : '25%'}]}
                            onChangeText={(UserEmail) =>
                                setUserEmail(UserEmail)
                            }
                            placeholder="동물등록번호" //dummy@abc.com
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                passwordInputRef.current &&
                                passwordInputRef.current.focus()
                            }
                            underlineColorAndroid="#f000"
                            blurOnSubmit={false}
                        />
                        <TextInput
                            style={[styles.textFormBottom,{height: width >height ? '35%' : '25%'}]}
                            onChangeText={(UserPassword) =>
                                setUserPassword(UserPassword)
                            }
                            placeholder="소유자 성명" //12345
                            placeholderTextColor="#8b9cb5"
                            keyboardType="default"
                            ref={passwordInputRef}
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                            secureTextEntry={false}
                            underlineColorAndroid="#f000"
                            returnKeyType="next"
                        />
                        </View>


     <View style={{flex:0.5, justifyContent:'center', marginLeft:"3%"}}>

                        <ScrollView ref = {ref} style={styles.scrollView}> 
                    
                        </ScrollView>
                    
                    </View>


            <View style={{flex:1,flexDirection:'column', padding:'3%',backgroundColor:'#fff'}}>
                <View style={{flex:0.5}}/>

                <View style={[styles.board,{backgroundColor:'#E1BEE7',borderRadius:20}]}>
                    
                    <View style={{flex:0.5, justifyContent:'center', marginLeft:"3%"}}>
                    </View>
                    {data.map((x) => (
                    <Choice
                        text={x.title}
                        btnTxtStyles={styles.btnTxtStyles}
                        btnstyles={styles.btnstyles}
                        btnstylesSelect={styles.btnstylesSelect}
                        onValueChange={handleValueChange}
                        choicesCount={choicesName[x.filterNumber].length}
                        choicesName={choicesName[x.filterNumber]}
                    />
                    ))}
                      
            <View style={[styles.formArea, {width: width > height ? '40%': '75%'}]}>
                  <TextInput
                      style={[styles.textFormTop, {height: width >height ? '35%' : '25%'}]}
                      onChangeText={(UserEmail) =>
                        setUserEmail(UserEmail)
                      }
                      placeholder="동물등록번호" //dummy@abc.com
                      placeholderTextColor="#8b9cb5"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      returnKeyType="next"
                      onSubmitEditing={() =>
                          passwordInputRef.current &&
                          passwordInputRef.current.focus()
                      }
                      underlineColorAndroid="#f000"
                      blurOnSubmit={false}
                  />
                  <TextInput
                      style={[styles.textFormBottom,{height: width >height ? '35%' : '25%'}]}
                      onChangeText={(UserPassword) =>
                        setUserPassword(UserPassword)
                      }
                      placeholder="소유자 성명" //12345
                      placeholderTextColor="#8b9cb5"
                      keyboardType="default"
                      ref={passwordInputRef}
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      secureTextEntry={false}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                  />
                {/* <Text style={{...styles.TextValidation}}>유효하지 않은 ID입니다.</Text> }
                </View>
                </View>
            
            <TouchableOpacity 
                onPress={gotoNextScreen}
                style={styles.nextBtn} 
            >
                <Text style={[styles.botText, {color: 'white'}]}>다음</Text>
            </TouchableOpacity>
                <View style={{flex:0.2}}/>
            </View>

*/ 

const checkBoxBaseStyles = {
    height: 40,
    width: 40,
    margin: 10,
};

const labelDimentions = {
  width: 100
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'white',
        padding:"2%",
    },
    board:{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    title: {
        flex:1,
        fontSize: bigOne*0.03,
        fontWeight:'bold',
        textAlign:'left',
        //marginLeft: "5%",
        //marginTop: "5%",
    },
    subtitle:{
        flex:1,
        fontSize: bigOne*0.02,
        fontWeight:'bold',
        color:'rgba(0,0,0,0.7)',
        textAlign:'left',
        marginBottom: '3%',
        //marginLeft: "5%",        
        // marginTop: "3%",

    },
    activityIndicator: {
      alignItems: 'center',
      height: 80,
    },
    btn: {
      height: bigOne*0.04,
      width: '50%',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue',
    },
    botText: {
        textAlign:'center',
        fontSize: bigOne*0.017,
        fontWeight:'bold',
    },
    nextBtn: {
    marginTop: 5,
    flex:1,
    //height: '100%',
    height: 30,
    width:'100%',
    //maxHeight:50,
    borderRadius:7,
    backgroundColor:'#9C27B0',
    justifyContent: 'center',
    //alignItems: 'center',
},  
input: {
    height: bigOne*0.1,
    margin: 12,
    marginBottom: 15,
    borderBottomWidth: 3,
    padding: 10,
    borderBottomColor:'#9C27B0',
    fontSize:bigOne*0.02,
},
    card: {
        backgroundColor: '#FBEDFD',
        flex: 1,
        borderRadius: 15, // to provide rounded corners
        margin:20,
        justifyContent:'center',
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 9
    },
    btnstyles: {
        ...checkBoxBaseStyles,
        borderWidth: 2,
        borderColor: '#d3a4fc',
        borderRadius: 100,
        //backgroundColor: '#FFFFFF',
      },
      btnstylesSelect: {
        ...checkBoxBaseStyles,
        backgroundColor: '#d3a4fc',
        borderRadius: 100,
      },
      btnTxtStyles: {
        ...labelDimentions,
        alignItems: 'center',
        fontSize: bigOne*0.02,
      },
      choicesHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: labelDimentions.width
      },

      button: {
        width:"50%",
        marginHorizontal:10,
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
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize:responsiveFontSize(2)
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      formArea: {
        paddingVertical:"3%",
        flex: 1,
      },
      textFrom: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#C9C9C9',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
      },
      textFormTop: {
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        borderBottomWidth: 1,
      },
      textFormMiddle: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
      },
      textFormBottom: {
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
        borderTopWidth: 1,
      },
      btnTxtStyles: {
        ...labelDimentions,
        alignItems: 'center',
        marginVertical:'3%'
      },
  });
export default EnrollStep1;