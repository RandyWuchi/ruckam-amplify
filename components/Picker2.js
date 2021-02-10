import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import {
  Alert,
  Animated,
  Button,
  Dimensions,
  FlatList,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Text from './Text';
import Colors from '../constants/Colors';
import PickerItem from './PickerItem';
import { categories2 } from '../data/Categories';
import Screen from './Screen';

const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;
const colors = {
  yellow: '#FFE8A3',
  dark: '#2D2D2D',
};
const { width, height } = Dimensions.get('window');

const Icon = React.memo(({ icon, color }) => {
  return <MaterialCommunityIcons name={icon} color={color} size={ICON_SIZE} />;
});

const Item = React.memo(({ icon, color, name, showText }) => {
  return (
    <View style={styles.itemWrapper}>
      {showText ? (
        <Text style={[styles.itemText, { color }]}>{name}</Text>
      ) : (
        // for spacing purposes
        <View />
      )}
      <Icon icon={icon} color={color} />
    </View>
  );
});

const ConnectWithText = React.memo(() => {
  return (
    <View
      style={{
        position: 'absolute',
        top: height / 2 - ITEM_HEIGHT * 2,
        width: width * 0.7,
        paddingHorizontal: 14,
      }}
    >
      <Text
        style={{
          color: Colors.light.primary,
          fontSize: 40,
          fontWeight: '700',
          lineHeight: 52,
        }}
      >
        Choose a category
      </Text>
    </View>
  );
});

const ConnectButton = React.memo(({ onPress }) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: height / 2 + ITEM_HEIGHT / 2,
        paddingHorizontal: 14,
      }}
    >
      <View
        style={{
          height: ITEM_HEIGHT * 2,
          width: 4,
          backgroundColor: Colors.light.primary,
        }}
      />
      <TouchableOpacity
        onPress={onPress}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 12,
          backgroundColor: Colors.light.primary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        activeOpacity={0.8}
      >
        <Text style={{ fontSize: 30, fontWeight: '800', color: 'white' }}>
          Select
        </Text>
      </TouchableOpacity>
    </View>
  );
});

const List = React.memo(
  React.forwardRef(
    ({ color, showText, style, onScroll, onItemIndexChange }, ref) => {
      return (
        <Animated.FlatList
          ref={ref}
          data={categories2}
          style={style}
          keyExtractor={(item) => `${item.name}-${item.icon}`}
          bounces={false}
          scrollEnabled={!showText}
          scrollEventThrottle={16}
          onScroll={onScroll}
          decelerationRate='fast'
          snapToInterval={ITEM_HEIGHT}
          showsVerticalScrollIndicator={false}
          renderToHardwareTextureAndroid
          contentContainerStyle={{
            paddingTop: showText ? 0 : height / 2 - ITEM_HEIGHT / 2,
            paddingBottom: showText ? 0 : height / 2 - ITEM_HEIGHT / 2,
            paddingHorizontal: 20,
          }}
          renderItem={({ item }) => {
            return <Item {...item} color={color} showText={showText} />;
          }}
          onMomentumScrollEnd={(ev) => {
            const newIndex = Math.round(
              ev.nativeEvent.contentOffset.y / ITEM_HEIGHT
            );

            if (onItemIndexChange) {
              onItemIndexChange(newIndex);
            }
          }}
        />
      );
    }
  )
);

const Picker2 = ({
  icon,
  onSelectItem,
  placeholder,
  selectedItem,
  width = '100%',
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const onConnectPress = React.useCallback(() => {
    onSelectItem(categories2[index]);
    setModalVisible(false);
  }, [index]);
  const yellowRef = React.useRef();
  const darkRef = React.useRef();
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );
  const onItemIndexChange = React.useCallback(setIndex, []);
  React.useEffect(() => {
    scrollY.addListener((v) => {
      if (darkRef?.current) {
        darkRef.current.scrollToOffset({
          offset: v.value,
          animated: false,
        });
      }
    });
  });

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={Colors.light.medium}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <Text style={styles.text}>{selectedItem.name}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}
          <MaterialCommunityIcons
            name='chevron-down'
            size={20}
            color={Colors.light.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType='slide'>
        <Screen
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            paddingTop: StatusBar.currentHeight,
          }}
        >
          <StatusBar hidden />
          <ConnectWithText />
          <List
            ref={yellowRef}
            color={Colors.light.primary}
            style={StyleSheet.absoluteFillObject}
            onScroll={onScroll}
            onItemIndexChange={onItemIndexChange}
          />
          <List
            ref={darkRef}
            color={colors.dark}
            showText
            style={{
              position: 'absolute',
              backgroundColor: Colors.light.primary,
              width: '100%',
              height: ITEM_HEIGHT,
              top: height / 2 - ITEM_HEIGHT / 2,
            }}
          />
          <ConnectButton
            onPress={() => {
              setModalVisible(false);
              onSelectItem(categories2[index]);
            }}
          />
        </Screen>
      </Modal>
    </>
  );
};

export default Picker2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.white,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: Colors.light.medium,
    flex: 1,
  },
  text: {
    flex: 1,
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: ITEM_HEIGHT,
  },
  itemText: {
    fontSize: 26,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
});
