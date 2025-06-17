import { storage } from '../..';

export const saveBookmarks = bookmarks => {
  storage.set('bookmarks', JSON.stringify(bookmarks));
};

export const getBookmarks = () => {
  const data = storage.getString('bookmarks');
  return data ? JSON.parse(data) : [];
};
