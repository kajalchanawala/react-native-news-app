import { Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListingScreen from '../screens/NewsList';
import BookmarkScreen from '../screens/Bookmark';
import { getBookmarks, saveBookmarks } from '../helpers/bookmarkStorage';
import { IMAGES } from '../assets/images';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsDetailsScreen from '../screens/NewsDetails';

const Stack = createNativeStackNavigator();

const ListingStack = ({ bookmarks, toggleBookmark }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="ListingScreen"
      options={{ title: 'Health News', headerTitleAlign: 'center' }}
    >
      {() => (
        <ListingScreen bookmarks={bookmarks} toggleBookmark={toggleBookmark} />
      )}
    </Stack.Screen>
    <Stack.Screen
      name="NewsDetails"
      component={NewsDetailsScreen}
      options={{ title: 'Article Details', headerTitleAlign: 'center' }}
    />
  </Stack.Navigator>
);

const BookmarkStack = ({ bookmarks, toggleBookmark }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="BookmarkScreen"
      options={{ title: 'Bookmarked News', headerTitleAlign: 'center' }}
    >
      {() => (
        <BookmarkScreen bookmarks={bookmarks} toggleBookmark={toggleBookmark} />
      )}
    </Stack.Screen>
    <Stack.Screen
      name="NewsDetails"
      component={NewsDetailsScreen}
      options={{ title: 'Article Details', headerTitleAlign: 'center' }}
    />
  </Stack.Navigator>
);

const RootStackNavigator = () => {
  const Tab = createBottomTabNavigator();

  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const stored = getBookmarks();
    setBookmarks(stored);
  }, []);

  const toggleBookmark = article => {
    setBookmarks(prev => {
      const exists = prev.find(b => b.url === article.url);
      const updated = exists
        ? prev.filter(b => b.url !== article.url)
        : [...prev, article];
      saveBookmarks(updated);
      return updated;
    });
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let icon = route.name === 'Listing' ? IMAGES.NEWS : IMAGES.BOOKMARK;
            return (
              <Image
                source={icon}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? '#1e90ff' : '#888',
                }}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Listing">
          {() => (
            <ListingStack
              bookmarks={bookmarks}
              toggleBookmark={toggleBookmark}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Bookmarks">
          {() => (
            <BookmarkStack
              bookmarks={bookmarks}
              toggleBookmark={toggleBookmark}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;

const styles = StyleSheet.create({});
