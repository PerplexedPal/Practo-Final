import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import navigationStrings from '../constants/navigationStrings';
import colors from '../styles/colors';

function HomeStyle(props) {
  const {shoeList, cartCounter} = props;
  const navigation = useNavigation();
  let _renderItem = ({item}) => {
    const {
      name,
      image,
      originalPrice,
      reducedPrice,
      discount,
      caption,
    } = item;
    const {themeColor} = props;
    const {themeColor2} = props;
    return (
      <View style={styles.card}>
        <View>
          <TouchableOpacity>
            <View style={styles.cardImageView}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    navigationStrings.IMAGE_SCREEN,
                    (item = {item}),
                  )
                }>
                <View>
                  <Image style={styles.cardImage} source={image} />
                </View>
              </TouchableOpacity>
              <Text style={styles.productName}>{name}</Text>
              <Text style={styles.productCaption}>{caption}</Text>
              <View style={styles.priceView}>
                <Text style={styles.productReducedPrice}>
                  Rs.{reducedPrice}
                </Text>
                <Text style={styles.originalPrice}>
                  Rs.{originalPrice}{' '}
                </Text>

                <Text style={{fontSize: 12, color: colors.green1, marginLeft: 1}}>
                  ({discount}%OFF)
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              cartCounter(item);
            }}>
            <View
              style={{
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',

                marginVertical: 10,
                borderRadius: 5,
                backgroundColor: colors.themeColor2,
              }}>
              <Text style={styles.buttonText}>Book Now</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={shoeList}
      numColumns={2}
      renderItem={_renderItem}
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    padding: 5,
    borderColor: colors.lightGrey,
    marginBottom: 10,
  },
  cardImageView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: 'center',
  },
  cardImage: {height: 100, resizeMode: 'contain', width: '100%'},
  productName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    color: colors.themeColor
  },
  productCaption: {fontSize: 13, color: colors.green1},
  priceView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  productReducedPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.black,
  },
  originalPrice: {
    fontSize: 11,
    marginLeft: 7,
    textDecorationLine: 'line-through',
    color:colors.themeColor
  },
  buttonText: {color: colors.white},
});

const mapStateToProps = state => {
  return {
    themeColor: state.themeReducer.themeColor,
  };
};

export default connect(mapStateToProps)(HomeStyle);
