import React, {useEffect} from 'react';
import {
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Button, Text, Avatar} from 'react-native-paper';
const {height, width} = Dimensions.get('window');

/* Redux */
import {connect, useDispatch, useSelector} from 'react-redux';
import {userJoin} from '../store/actions/videoActions';

const Logo = require('../assets/logo.png');
const AvatarOne = require('../assets/a1.png');
const AvatarTwo = require('../assets/a2.png');
const AvatarThree = require('../assets/a3.png');
const AvatarFour = require('../assets/a4.png');
const AvatarFive = require('../assets/a5.png');

const users = [
  {name: 'Anna', avatar: AvatarOne},
  {name: 'Samuel', avatar: AvatarTwo},
  {name: 'David', avatar: AvatarThree},
  {name: 'John', avatar: AvatarFour},
  {name: 'Mike', avatar: AvatarFive},
];

function UserList({navigation}) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(userJoin());
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          height: height * 0.09,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={Logo}
          style={{
            height: 100,
            width: 100,
          }}
          resizeMode="contain"
        />
      </View>
      <View style={{flex: 1, padding: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <Button
            style={{
              backgroundColor: '#FFF',
              width: width * 0.4,
              borderColor: '#2D8CFF',
              borderWidth: 1,
              borderRadius: 5,
            }}
            mode="contained"
            onPress={() =>
              navigation.push('GroupCallScreen', {
                user: auth.user,
              })
            }>
            <Text
              style={{
                color: '#2D8CFF',
                fontSize: 20,
              }}>
              Join
            </Text>
          </Button>

          <Button
            style={{
              backgroundColor: '#FFF',
              width: width * 0.4,
              backgroundColor: '#2D8CFF',
              borderWidth: 1,
              borderRadius: 5,
            }}
            mode="contained">
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
              }}>
              Host
            </Text>
          </Button>
        </View>

        <View style={{paddingTop: 20}}>
          {auth.allUsers.length > 0 ? (
            <FlatList
              contentContainerStyle={{
                justifyContent: 'center',
                flexDirection: 'column',
              }}
              showsVerticalScrollIndicator={false}
              data={auth.allUsers}
              numColumns={1}
              renderItem={({item: {name}}) => {
                return (
                  <>
                    <TouchableOpacity onPress={() => true}>
                      {name ? <Users {...{name}} /> : null}
                    </TouchableOpacity>
                  </>
                );
              }}
              keyExtractor={(item) =>
                Math.random().toString(36).slice(2).toString()
              }
            />
          ) : null}
        </View>
      </View>
    </View>
  );
}

function Users({name, avatar}) {
  return (
    <View
      style={{
        position: 'relative',
        marginHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginVertical: 10,
        paddingVertical: 5,
        alignItems: 'center',
      }}>
      <View style={{flex: 1}}>
        <Avatar.Image
          size={50}
          source={users[0].avatar}
          // source={avatar}
          style={{
            backgroundColor: '#E0E8EA',
          }}
        />
      </View>
      <View style={{flex: 3}}>
        <Text style={{fontSize: 25}}>{name}</Text>
      </View>
    </View>
  );
}

const mapStateToProps = ({auth}) => ({
  auth,
});

export default connect(mapStateToProps, {})(UserList);
