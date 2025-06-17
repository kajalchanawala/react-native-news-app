import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { IMAGES } from '../../assets/images';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import FONTS from '../../utils/fonts';
import COLORS from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';

const BookmarkScreen = ({ bookmarks, toggleBookmark }) => {
  const navigation = useNavigation();

  const onArticlePress = article => {
    navigation.navigate('NewsDetails', { article });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => onArticlePress(item)}>
      {item.urlToImage ? (
        <Image source={{ uri: item.urlToImage }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <TouchableOpacity
          onPress={() => toggleBookmark(item)}
          style={styles.bookmarkButton}
        >
          <Image source={IMAGES.BOOKMARK_REMOVE} style={styles.removeIcon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <Animated.View
      entering={FadeInRight.duration(500)}
      exiting={FadeOutLeft.duration(300)}
      style={styles.flex}
    >
      <FlatList
        data={bookmarks}
        keyExtractor={item => item.url}
        renderItem={renderItem}
        style={styles.flex}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10, flexGrow: 1 }}
        ListEmptyComponent={
          <View
            style={[
              styles.flex,
              { alignItems: 'center', justifyContent: 'center' },
            ]}
          >
            <Text style={styles.empty}>No bookmarks saved.</Text>
          </View>
        }
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
    backgroundColor: '#ccc',
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 6,
    backgroundColor: '#eee',
  },
  content: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    color: COLORS.text,
    fontFamily: FONTS.bold,
    fontSize: 14,
  },
  bookmarkButton: {
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: COLORS.muted,
    fontSize: 16,
  },
  removeIcon: {
    width: 22,
    height: 22,
    tintColor: COLORS.error,
  },
});

export default BookmarkScreen;
