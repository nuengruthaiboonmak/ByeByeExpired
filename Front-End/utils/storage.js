import AsyncStorage from '@react-native-async-storage/async-storage';

// ฟังก์ชันดึง user_id
export const getUserID = async () => {
  try {
    const userId = await AsyncStorage.getItem('user_id');
    return userId ? userId : null;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return null;
  }
};

// ฟังก์ชันบันทึก user_id
export const setUserID = async (userId) => {
  try {
    await AsyncStorage.setItem('user_id', userId);
  } catch (error) {
    console.error("Error setting user ID:", error);
  }
};

// ฟังก์ชันลบ user_id (เผื่อใช้ตอน Logout)
export const removeUserID = async () => {
  try {
    await AsyncStorage.removeItem('user_id');
  } catch (error) {
    console.error("Error removing user ID:", error);
  }
};