import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import StatusBar from '../../Components/StatusBar';
import strings from '../../constants/lang';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import imagePath from '../../constants/imagePath';
import SearchBar1 from '../../Components/SearchBar1';
import { TouchableOpacity } from 'react-native-gesture-handler';
import actions from '../../redux/actions';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import Geolocation from 'react-native-geolocation-service';
import { locationPermission } from '../../utils/permissions';
import styles from './styles';

// create a component
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      searchData: [],
      isLoading: false,
      timeout: null,
      getUserLocation: false,
      serchingLoader: false,
    };
  }

  apicall = () => {
    const { search } = this.state;
    this.setState({ searchingLoader: true });
    actions
      .search(search)
      .then(res => {
        console.log(res.data, 'search');
        this.setState({ searchData: [...res.data], searchingLoader: false });
      })
      .catch(err => {
        this.setState({ searchingLoader: false });
        console.log(err);
      });
  };

  getSearchValue = search => {
    this.setState({ search: search });
    if (this.searchTimeOut) {
      clearTimeout(this.searchTimeOut);
    }
    this.searchTimeOut = setTimeout(() => {
      this.apicall();
    }, 600);
    console.log(search);
  };

  searchLoader = () => {
    const { searchingLoader } = this.state;
    return (
      <View style={{ position: 'absolute', right: 20, top: 18 }}>
        {searchingLoader ? (
          <ActivityIndicator size={'small'} color={colors.red} />
        ) : null}
      </View>
    );
  };

  buttonLoader = () => {
    const { isLoading } = this.state;
    return (
      <View style={styles.footer}>
        {isLoading ? (
          <ActivityIndicator
            size={'large'}
            color={colors.red}
            style={{ margin: 15 }}
          />
        ) : null}
      </View>
    );
  };

  nearLocation = () => {
    locationPermission().then(res => {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position.coords.latitude);
          const { latitude, longitude } = position.coords;
          this.setState({ isLoading: true });
          actions
            .userLocation(latitude, longitude)
            .then(res => {
              console.log(res.data, 'location');
              this.setState({ searchData: res.data, isLoading: false });
            })
            .catch(err => {
              this.setState({ isLoading: false });
              console.log(err);
            });
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    });
  };

  _renderItem = searchData => {
    const { themeColor } = this.props;
    console.log(searchData.item.bio, 'render');

    return (
      <View style={styles.cardView}>
        <TouchableOpacity>
          <View style={styles.card}>
            <View style={styles.cardImageView}>
              <Image
                style={styles.cardImage}
                source={{ uri: searchData.item.profileImg[0].original }}
              />
              <View style={styles.cardTextView}>
                <View>
                  <Text style={styles.cardFullName}>
                    {searchData.item.fullName}
                  </Text>
                  <View style={styles.cardEmailView}>
                    <Text numberOfLines={1} style={{ color: themeColor }}>
                      {searchData.item.email}
                    </Text>
                  </View>
                  <View style={styles.bioInCard}>
                    <Text numberOfLines={1} style={styles.bioTextInCard}>
                      {searchData.item.bio}
                    </Text>
                  </View>

                  <View style={styles.sentImageView}>
                    <TouchableOpacity>
                      <Image
                        style={styles.sentImageInCard}
                        source={imagePath.sentImage}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <Image
                        style={styles.heartImageInCard}
                        source={imagePath.heartImage}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <Text
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          borderRadius: 15,
                          backgroundColor: themeColor,
                          color: colors.white,
                        }}>
                        More Info
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { themeColor } = this.props;
    const {
      search,
      searchData,
      isLoading,
      getUserLocation,
      searchingLoader,
    } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar bgColor={themeColor} />

        <View style={styles.navSignup}>
          <Text
            style={{
              fontFamily: fontFamily.bold,
              fontSize: 20,
              color: themeColor,
            }}>
            {strings.SEARCH}
          </Text>

          <TouchableOpacity
            onPress={() =>
              this.setState({ getUserLocation: !getUserLocation, searchData: [] })
            }>
            <View>
              <Text
                style={{
                  padding: 10,
                  backgroundColor: themeColor,
                  color: colors.white,
                  borderRadius: 15,
                }}>
                Location
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: colors.white,
            paddingVertical: 10,
            position: 'relative',
          }}>
          {!getUserLocation ? (
            <>
              <SearchBar1
                onChangeText={this.getSearchValue}
                value={search}
                placeholder="search user here"
              />
              {this.searchLoader()}
            </>
          ) : (
            <>
              <ButtonWithLoader
                btnText="Near By Location"
                borderColor={themeColor}
                btnTextStyle={20}
                color={themeColor}
                btnStyle={styles.buttonStyle}
                onPress={this.nearLocation}
              />
              {this.buttonLoader()}
            </>
          )}
        </View>

        <FlatList
          data={searchData}
          renderItem={item => this._renderItem(item)}
        />
        {/* <Loader isLoading={isLoading}/> */}
      </View>
    );
  }
}

// define your styles

const mapStateToProps = state => {
  return {
    themeColor: state.themeReducer.themeColor,
  };
};

//make this component available to the app
export default connect(mapStateToProps)(Search);
