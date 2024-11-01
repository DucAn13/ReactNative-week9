import { Text, View, Pressable, Image,SafeAreaView, FlatList, Dimensions, ScrollView} from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AntDesign from '@expo/vector-icons/AntDesign';

let BikeContext=React.createContext();
const BikeProvider=({children})=>{
  const [selectBike,changeSelectBike]=React.useState('');
  return(
    <BikeContext.Provider value={{ selectBike, changeSelectBike }}>
      {children}
    </BikeContext.Provider>
  )
}
const apiLink='https://66ff425c2b9aac9c997eb603.mockapi.io//Bike';
const Bike=({bike,navigation})=>{
  let {changeSelectBike}=React.useContext(BikeContext);
  let [heartColor,changeHeartColor]=React.useState(bike.liked?'red':'gray');
  let image='https://picsum.photos/200/300';
  return (
    <Pressable
      style={{
        borderRadius:10,
        backgroundColor:'#E941411A',
        padding:10,
        alignItems:'center',
        marginBottom:10,
        position:'relative',
        width:'50%'
        
      }}
      onPress={()=>{
        changeSelectBike(bike);
        navigation.navigate('Screen3');
        
      }}
    >
      <Pressable
        style={{
          position:'absolute',
          left:10,
          zIndex:1,
        }}
        onPress={() => {
          bike.liked = !bike.liked;
          changeHeartColor(heartColor == 'gray' ? 'red' : 'gray');
          const updatedBike = {
            ...bike,
            liked: bike.liked 
          };
          fetch(`${apiLink}/${bike.id}`, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify(updatedBike) 
          })
          .catch(error => {
            console.error('Error updating bike:', error);
          });
        }}
      >
        <AntDesign name="heart" size={24} color={heartColor} />
      </Pressable>
      <Image
        source={{uri:'https://picsum.photos/200/300'}}
        style={{
          width:100,
          height:100,
          
        }}
      />
      <Text
        style={{
          fontSize:20,
          color:'#00000099',
          marginTop:10
        }}
      >
        {bike.name}
      </Text>
      <Text
        style={{
          fontSize:20
        }}
      >
        <span style={{color:'#F7BA83'}}>$</span>{bike.price}
      </Text>
    </Pressable>
  )
}

function Screen1({route,navigation}){

  return(
    <SafeAreaView>
      <View
        style={{
          padding:10,
          justifyContent:'center',
          flex:1,
          alignItems:'center'
        }}
      >
        <Text
          style={{
            textAlign:'center',
            fontWeight:600,
            fontSize:20,
            marginBottom:30,

          }}
        >
          A premium online store for sporter and their stylish choice
        </Text>
        <View
          style={{
            backgroundColor:"#E941411A",
            borderRadius:30,
            padding:30,
            paddingTop:60,
            justifyContent:'center',
            alignItems:'center'
          }}
        >
          <Image 
            source={{uri:'https://picsum.photos/200/300'}}
            style={{
              width:292,
              height:270
            }}
          />
        </View>
        <Text
          style={{
            fontWeight:700,
            fontSize:30,
            width:200,
            textAlign:'center',
            marginTop:20
          }}
        >
          POWER BIKE SHOP
        </Text>
        <Pressable
          style={{
            borderRadius:30,
            backgroundColor:'red',
            justifyContent:'center',
            alignItems:'center',
            width:'80%',
            padding:15,
            marginTop:50,
          }}
          onPress={()=>{
            navigation.navigate('Screen2')
          }}
        >
          <Text
            style={{
              color:'white',
              fontSize:16,
              fontWeight:700
            }}
          >
            Get Started
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

function Screen2({route,navigation}){
  let [activeAll,ChangeActiveAll]=React.useState(true);
  let [activeRoadBike,ChangeActiveRoadBike]=React.useState(false);
  let [activeMountain,ChangeActiveMountain]=React.useState(false);
  let [BikeList,changeBikeList]=React.useState([]);
  let [BikeFilter,ChangeBikeFilter]=React.useState(BikeList);
  React.useEffect(()=>{
    fetch(apiLink)
    .then((response)=>{
      if(!response.ok){
        throw new Error('404')
      }
      return response.json();
    })
    .then((data)=>{
      changeBikeList(data);
      ChangeBikeFilter(data);
    })
  },[])

  return(
    <SafeAreaView    
      style={{
        flex:1,
        backgroundColor:'white'
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow:1,
          justifyContent:'center',
          alignItems:'center',
          padding:10
        }}
      >
        <Text
          style={{
            width:'100%',
            color:'red',
            fontSize:25,
            fontWeight:700,
            marginVertical:30
          }}
        >
          The world’s Best Bike
        </Text>
        <View
          style={{
            width:'100%',
            flexDirection: 'row',
            justifyContent:'space-between',
            marginBottom:10,
          }}
        >
          <Pressable
            style={{
              borderRadius:10,
              borderWidth:1,
              borderColor:'red',
              width:'27%',
              padding:5,
              alignItems:'center'
            }}
            onPress={()=>{
              ChangeActiveAll(true);
              ChangeActiveRoadBike(false);
              ChangeActiveMountain(false)
              ChangeBikeFilter(BikeList);
            }}
          >
            <Text
              style={{
                color:`${activeAll?'red':'gray'}`
              }}
            >
              All
            </Text>
          </Pressable>
          <Pressable
            style={{
              borderRadius:10,
              borderWidth:1,
              borderColor:'red',
              width:'27%',
              padding:5,
              alignItems:'center'
            }}
            onPress={()=>{
              ChangeActiveAll(false);
              ChangeActiveRoadBike(true);
              ChangeActiveMountain(false)
              ChangeBikeFilter(BikeList.filter(x=>x.type==='RoadBike'));
            }}
          >
            <Text
              style={{
                color:`${activeRoadBike?'red':'gray'}`
              }}
            >
              RoadBike
            </Text>
          </Pressable>
          <Pressable
            style={{
              borderRadius:10,
              borderWidth:1,
              borderColor:'red',
              width:'27%',
              padding:5,
              alignItems:'center'
            }}
            onPress={()=>{
              ChangeActiveAll(false);
              ChangeActiveRoadBike(false);
              ChangeActiveMountain(true)
              ChangeBikeFilter(BikeList.filter(x=>x.type==='Mountain'));
            }}
          >
            <Text
              style={{
                color:`${activeMountain?'red':'gray'}`
              }}
            >
              Mountain
            </Text>
          </Pressable>
        </View>
        <FlatList
          data={BikeFilter}
          keyExtractor={item=>item.id}
          renderItem={({item})=>(
            <Bike bike={item} navigation={navigation}></Bike>
          )}
          columnWrapperStyle={{
            columnGap:10,
            rowGap:10,
            justifyContent:'space-between'
            
          }}
          numColumns={2}
          style={{
            width:'100%',
            flexGrow:1
          }}
        >
        </FlatList>
      </ScrollView>
    </SafeAreaView>
  )
}
function Screen3({route,navigation}){
  let {selectBike}=React.useContext(BikeContext);
  let [heartColor,changeHeartColor]=React.useState(selectBike.liked?'red':'gray')
  return(
    <SafeAreaView
      style={{
        padding:10,
        justifyContent:'space-between',
        flex:1
      }}
    >
      <View>
        <View
          style={{
            borderRadius:10,
            backgroundColor:'#E941411A',
            padding:10,
            alignItems:'center',
            marginBottom:10,
          }}
        >
          <Image
            source={selectBike.image}
            style={{
              width:'90%',
              height:200,
              resizeMode:'contain'
            }}
          />
        </View>
        <Text
          style={{
            fontSize:35
          }}
        >
          {selectBike.name}
        </Text>
        <View
          style={{
            flexDirection:'row'
          }}
        >
          <Text
            style={{
              color:"#00000096",
              fontSize:25,
              paddingStart:10,
              marginEnd:30
            }}
          >
            {selectBike.discount}% OFF {selectBike.price*(1-selectBike.discount/100)}$
          </Text>
          <Text
            style={{
              fontSize:25,
              textDecorationLine:'line-through'
            }}
          >
            {selectBike.price}$
          </Text>
        </View>
        <Text
          style={{
            fontSize:25,
            marginTop:20
          }}
        >
          Descriptions
        </Text>
        <Text
          style={{
            fontSize:25,
            color:'#00000091',
            marginTop:10
          }}
        >
          {selectBike.description}
        </Text>
      </View>
      <View
        style={{
          flexDirection:'row',
          marginTop:20
        }}
      >
        <Pressable
          onPress={()=>{
            selectBike.liked=!(selectBike.liked);
            changeHeartColor(selectBike.liked?'red':'gray');
            const updatedBike = {
              ...selectBike,
              liked: selectBike.liked 
            };
            fetch(`${apiLink}/${selectBike.id}`, {
              method: 'PUT', 
              headers: {
                'Content-Type': 'application/json' 
              },
              body: JSON.stringify(updatedBike) 
            })
            .catch(error => {
              console.error('Error updating bike:', error);
            });
          }}
        >
          <AntDesign name="heart" size={44} color={heartColor} />
        </Pressable>
        <Pressable
          style={{
            backgroundColor:'red',
            borderRadius:30,
            height:54,
            flex:1,
            marginStart:30,
            justifyContent:'center',
            alignItems:'center'
          }}
          onPress={()=>{navigation.replace('Screen2')}}
        >
          <Text
            style={{
              fontSize:25,
              color:'white'
            }}
          >
            Add to card
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
const Stack=createNativeStackNavigator();
export default function App() {
  let bike={
  id:1,
  name:'bike1',
  image:'./assets/bithree_removebg-preview.png',
  price:100,
  type:'Mountain',
  discount:0.15,
  liked:false
  };

  return (
    <BikeProvider value={bike}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Screen1'>
        <Stack.Screen name='Screen1' component={Screen1}/>
        <Stack.Screen name='Screen2' component={Screen2}/>
        <Stack.Screen name='Screen3' component={Screen3}/>
      </Stack.Navigator>
    </NavigationContainer>
    </BikeProvider>
  );
}

