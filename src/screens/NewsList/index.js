import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { IMAGES } from "../../assets/images";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { fetchHealthNews } from "../../services";
import { useNavigation } from "@react-navigation/native";
import FONTS from "../../utils/fonts";
import COLORS from "../../utils/colors";

const ListingScreen = ({ bookmarks, toggleBookmark }) => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    setLoading(true);
    try {
      const data = await fetchHealthNews();
      setArticles(data);
    } catch (err) {
      console.error("Failed to load news:", err);
      Alert.alert("Error", "Unable to load news articles.");
    } finally {
      setLoading(false);
    }
  };

  const isBookmarked = (url) => bookmarks.some((b) => b.url === url);

  const onArticlePress = (article) => {
    navigation.navigate("NewsDetails", { article });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => onArticlePress(item)}
      >
        {item.urlToImage ? (
          <Image
            source={{ uri: item.urlToImage || "https://picsum.photos/600/400" }}
            style={styles.image}
          />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
        <View style={styles.content}>
          <Text numberOfLines={2} style={styles.title}>
            {item.title}
          </Text>
          <Text numberOfLines={3} style={styles.description}>
            {item.description || "No description available."}
          </Text>
          <TouchableOpacity
            hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
            onPress={() => toggleBookmark(item)}
            style={styles.bookmarkButton}
          >
            <Image
              source={
                isBookmarked(item.url)
                  ? IMAGES.BOOKMARK_ACTIVE
                  : IMAGES.BOOKMARK_INACTIVE
              }
              style={styles.bookmarkIcon}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View
      entering={FadeInRight.duration(500)}
      exiting={FadeOutLeft.duration(300)}
      style={styles.flex}
    >
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.url}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 10 }}
          ListEmptyComponent={
            <View
              style={[
                styles.flex,
                { alignItems: "center", justifyContent: "center" },
              ]}
            >
              <Text style={styles.empty}>No News Found.</Text>
            </View>
          }
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.background,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    padding: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
  imagePlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  content: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
    fontFamily: FONTS.medium,
  },
  description: {
    fontSize: 13,
    color: COLORS.muted,
    fontFamily: FONTS.regular,
  },
  bookmarkButton: {
    alignSelf: "flex-end",
    marginTop: 5,
  },
  bookmarkIcon: {
    width: 22,
    height: 22,
    tintColor: COLORS.primary,
    resizeMode: "contain",
  },
  empty: {
    fontSize: 14,
    color: COLORS.muted,
    fontFamily: FONTS.regular,
  },
});

export default ListingScreen;
