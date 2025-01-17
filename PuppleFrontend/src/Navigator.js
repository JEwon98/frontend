import React from 'react';
import {View, Text, StatusBar, Header} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import DogList from './DogList';
import Login from './Login';
import Tab2 from './Tab2'; // 인증탭 이름 추천 받아요  -> autntication
import ChattingPage from './ChattingRoom';
import EnrollStep1 from './Tab2/Tab2Component/Shelter/EnrollStep1';
import EnrollStep11 from './Tab2/Tab2Component/Shelter/EnrollStep11';
import EnrollStep2 from './Tab2/Tab2Component/Shelter/EnrollStep2';
import EnrollStep3 from './Tab2/Tab2Component/Shelter/EnrollStep3';
import EnrollPage from './Tab2/Tab2Component/Shelter/EnrollPage';
import TimeStamp from './Template/TimeStamp/';
//import WalkPassComponent from './Template/WalkPassCondition/WalkPassComponent/WalkPassCondition';
//import WalkPassCondition from './Template/WalkPassCondition';
import EnrollWalkAuth from './Tab2/Tab2Component/Shelter/EnrollWalkAuth';
import EnrollTimeAuth from './Tab2/Tab2Component/Shelter/EnrollTimeAuth';
import ChattingRoom from './ChattingRoom/ChattingComponent/ChattingRoom';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const LogStack = createStackNavigator();

const BottomNavigation = ({navigation}) => {
  return (
      <BottomTab.Navigator>

          <BottomTab.Screen
              name="DogList"
              component={DogList}
              options={{
                  tabBarLabel: '반려견리스트',
                  headerShown: false,
                  animationEnabled: false,
                  tabBarIcon: ()=> (
                      <MaterialCommunityIcons name="dog" size={25} />
                  )
              }}
          >
          </BottomTab.Screen>

          <BottomTab.Screen
              name="Tab2"
              component={Tab2}
              options={{
                  tabBarLabel: '인증',
                  headerShown: false,
                  animationEnabled: false,
                  // unmountOnBlur: true,
                  tabBarIcon: ()=> (
                      <MaterialCommunityIcons name="paw" size={25} />
                  ),
              }}
          >
          </BottomTab.Screen>


          <BottomTab.Screen
              name="ChattingPage"
              component={ChattingPage} // Timestamp
              options={{
                  tabBarLabel: '채팅',
                  headerShown: false,
                  animationEnabled: false,
                  tabBarIcon: ()=> (
                      <MaterialCommunityIcons name="message" size={25} />
                  )
              }}
          >
          </BottomTab.Screen>

          {/* <BottomTab.Screen
              name="BookStore"
              component={BookStore}
              options={{
                  tabBarLabel: '북스토어',
                  headerShown: false,
                  animationEnabled: false,
                  tabBarIcon: ()=> (
                      <MaterialCommunityIcons name="cart" size={25} />
                  )
              }}
          >
          </BottomTab.Screen>
          <BottomTab.Screen
              name="MyPage"
              component={MyPage}
              options={{
                  tabBarLabel: '마이페이지',
                  headerShown: false,
                  animationEnabled: false,
                  tabBarIcon: ()=> (
                      <MaterialCommunityIcons name="account" size={25} />
                  )
              }}
          >
          </BottomTab.Screen> */}
     

      </BottomTab.Navigator>
  )
}


const Enroll = () => {
  return (
    <LogStack.Navigator>

    </LogStack.Navigator>
    );
};


function Navigator() {

    return (

        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                // Hiding header for Splash Screen
                options={{headerShown: false}}
                /> */}

                <Stack.Screen
                    name="Auth"
                    component={Login}
                    options={{headerShown: false}}
                    
                />

                <Stack.Screen 
                name="BottomNav"
                component={BottomNavigation}
                options={{
                    headerShown: false,
                    animationEnabled: false
                }}/>

      <LogStack.Screen
          name="EnrollStep1"
          component={EnrollStep1}
          options={{
              title: "등록정보 글쓰기",
              headerShown: true,
              headerTransparent: false,
              headerBackTitle: "back", // x 표시로 바꾸기 
              // header shadow
              // header 반려견 삭제 버튼 
              // bottom navigation 사라져야하나?
              
          }}/>

        <LogStack.Screen
          name="EnrollStep11"
          component={EnrollStep11}
          options={{
              title: "등록정보 글쓰기",
              headerShown: true,
              headerTransparent: false,
              headerBackTitle: "back", // x 표시로 바꾸기 
              // header shadow
              // header 반려견 삭제 버튼 
              // bottom navigation 사라져야하나?
              
          }}/>

        <LogStack.Screen
          name="EnrollStep2"
          component={EnrollStep2}
          options={{
              title: "등록정보 글쓰기",
              headerShown: true,
              headerTransparent: false,
              headerBackTitle: "back", // x 표시로 바꾸기 
              // header shadow
              // header 반려견 삭제 버튼
              // bottom navigation 사라져야하나?
              
          }}/>

        <LogStack.Screen
            name="EnrollWalkAuth"
            component={EnrollWalkAuth}
            options={{
                title: "산책량 설정",
                headerShown: true,
                headerTransparent: false,
                headerBackTitle: "back", // x 표시로 바꾸기 
                // header shadow
                // header 반려견 삭제 버튼 
                // bottom navigation 사라져야하나?
                
            }}/>

        <LogStack.Screen
            name="EnrollTimeAuth"
            component={EnrollTimeAuth}
            options={{
                title: "시간량 설정",
                headerShown: true,
                headerTransparent: false,
                headerBackTitle: "back", // x 표시로 바꾸기 
                // header shadow
                // header 반려견 삭제 버튼 
                // bottom navigation 사라져야하나?
                
            }}/>

        <LogStack.Screen
          name="EnrollStep3"
          component={EnrollStep3}
          options={{
              title: "등록정보 글쓰기",
              headerShown: true,
              headerTransparent: false,
              headerBackTitle: "back", // x 표시로 바꾸기 
              // header shadow
              // header 반려견 삭제 버튼 
              // bottom navigation 사라져야하나?
              
          }}/>

         <LogStack.Screen
            name="EnrollPage"
            component={EnrollPage}
            options={{
                title: false,
                headerShown: true,
                headerTransparent: true,
                // header shadow
                // header 반려견 삭제 버튼 
                // bottom navigation 사라져야하나?
                
            }}/>

        <LogStack.Screen
            name="ChattingRoom"
            component={ChattingRoom}
            options={{
                title: false,
                headerShown: true,
                headerTransparent: false,
                headerBackTitle: "back", 
                // header shadow
                // header 반려견 삭제 버튼 
                // bottom navigation 사라져야하나?
                
            }}/>
         

            </Stack.Navigator>
        </NavigationContainer>
    )
}




export default Navigator;