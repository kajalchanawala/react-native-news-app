import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import FONTS from '../../utils/fonts';
import COLORS from '../../utils/colors';

const NewsDetailsScreen = ({ route }) => {
  const { article } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: article.urlToImage || 'https://picsum.photos/600/400' }}
        style={styles.image}
      />
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.author}>{article.author}</Text>
      <Text style={styles.description}>{article.description}</Text>
      <Text style={styles.content}>{article.content}</Text>
      <View style={{ flex: 1 }} />

      <TouchableOpacity
        onPress={() => Linking.openURL(article.url)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Read Full Article</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NewsDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: COLORS.background,
    paddingBottom: 32,
  },
  image: {
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
  author: {
    fontSize: 14,
    color: COLORS.muted,
    marginBottom: 10,
    fontFamily: FONTS.regular,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: FONTS.regular,
    color: COLORS.text,
  },
  content: {
    fontSize: 15,
    color: COLORS.muted,
    marginBottom: 16,
    fontFamily: FONTS.regular,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontFamily: FONTS.medium,
  },
});
