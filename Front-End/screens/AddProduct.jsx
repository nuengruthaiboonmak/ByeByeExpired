import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import FormData from "form-data"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from "@react-native-community/datetimepicker";
import { getUserID } from '../utils/storage';  // ฟังก์ชัน getUserID ที่จะดึง user_id

const AddProductScreen = ({ navigation }) => {
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [storageDate, setStorageDate] = useState(new Date());
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [note, setNote] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [userName, setUserName] = useState("");
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [userId, setUserId] = useState(null);  // state สำหรับเก็บ user_id

  useEffect(() => {
    const checkUserID = async () => {
      try {
        const storedUserId = await getUserID();
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          Alert.alert("User not logged in", "Please log in to continue");
        }
      } catch (error) {
        console.error("Error fetching user_id:", error);
      }
    };
  
    checkUserID();
  }, []);
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setImageUri(result.assets[0].uri);  // แสดงตัวอย่างรูปที่เลือก
      console.log("Image URI: ", result.assets[0].uri);  // เพิ่มการตรวจสอบ URL ของภาพ
      uploadImage(result.assets[0].uri);  // อัปโหลดรูป
    } else {
      Alert.alert("กรุณาเลือกภาพ");
    }
  };

  const uploadImage = async (uri) => {
    let formData = new FormData();
    let filename = uri.split("/").pop();  // ดึงชื่อไฟล์
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    formData.append("file", {
      uri,
      name: filename,
      type,
    });

    try {
      let response = await axios.post("https://cuddly-space-lamp-jj4jqr7jvg5q2qvpg-5000.app.github.dev/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.file_url) {
        console.log("Image uploaded successfully:", response.data.file_url);  // ดู URL ที่ได้รับ
        setImageUri(response.data.file_url); // ตั้งค่าลิงก์รูปที่อัปโหลดแล้ว
      } else {
        console.log("No file_url received from server");
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const onChangeStorageDate = (event, selectedDate) => {
    const currentDate = selectedDate || storageDate;
    setStorageDate(currentDate);
  };

  const onChangeExpirationDate = (event, selectedDate) => {
    const currentDate = selectedDate || expirationDate;
    setExpirationDate(currentDate);
  };

  const saveProduct = async () => {
    if (!userId) {
      Alert.alert("ไม่พบข้อมูลผู้ใช้", "กรุณาเข้าสู่ระบบก่อนบันทึกข้อมูล");
      return;
    }
  
    if (!selectedStorage || !userName || !quantity || !imageUri) {
      Alert.alert("กรุณากรอกข้อมูลให้ครบถ้วน", "ข้อมูลบางส่วนยังไม่ถูกกรอก");
      return;
    }
  
    if (isNaN(quantity) || quantity <= 0) {
      Alert.alert("กรุณาใส่จำนวนสินค้าให้ถูกต้อง", "จำนวนสินค้าต้องเป็นตัวเลขและมากกว่า 0");
      return;
    }
  
    const productData = {
      name: userName,
      storage: selectedStorage,
      storage_date: storageDate.toISOString().split('T')[0],
      expiration_date: expirationDate.toISOString().split('T')[0],
      quantity: parseInt(quantity),
      note: note,
      user_id: parseInt(userId), // ใช้ userId จาก state
      photo: imageUri,
    };
  
    console.log("Product Data to be sent:", productData);
  
    try {
      const response = await axios.post(
        "https://cuddly-space-lamp-jj4jqr7jvg5q2qvpg-5000.app.github.dev/add_item",
        productData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);
  
      if (response.status === 201) {
        Alert.alert("สำเร็จ", "สินค้าถูกเพิ่มเรียบร้อยแล้ว", [
          { text: "ตกลง", onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    } catch (error) {
      console.error("Error saving product:", error);
  
      if (error.response) {
        console.error("Error response:", error.response.data);
        Alert.alert("เกิดข้อผิดพลาด", error.response.data.message || "ไม่สามารถบันทึกข้อมูลได้");
      } else if (error.request) {
        console.error("No response received:", error.request);
        Alert.alert("เกิดข้อผิดพลาด", "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
      } else {
        console.error("Error", error.message);
        Alert.alert("เกิดข้อผิดพลาด", "มีบางอย่างผิดพลาด กรุณาลองอีกครั้ง");
      }
    }
  };

  const [showStorageDatePicker, setShowStorageDatePicker] = useState(false);
  const [showExpirationDatePicker, setShowExpirationDatePicker] = useState(false);

  const showDatepicker = (type) => {
    if (type === "storage") {
      setShowExpirationDatePicker(false); // ปิด Expiration Date Picker หากเปิดอยู่
      setShowStorageDatePicker(true);     // เปิด Storage Date Picker
    } else if (type === "expiration") {
      setShowStorageDatePicker(false);    // ปิด Storage Date Picker หากเปิดอยู่
      setShowExpirationDatePicker(true);  // เปิด Expiration Date Picker
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Gradient Background */}
          <LinearGradient colors={["#B3D4FF", "#FFFFFF"]} style={styles.gradientBackground} />

          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.title}>New Product</Text>
            <TouchableOpacity onPress={saveProduct}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Image Placeholder */}
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.imagePlaceholder}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
              ) : (
                <Text style={styles.imagePlaceholderText}>Tap to add image</Text>
              )}
            </View>
          </TouchableOpacity>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter product name"
              value={userName}
              onChangeText={(text) => setUserName(text)}
              placeholderTextColor="#B0B0B0"
            />

            <Text style={styles.label}>Storage</Text>
            <DropDownPicker
              open={open}
              setOpen={setOpen}
              value={selectedStorage}
              setValue={setSelectedStorage}
              items={[
                { label: "Fridge", value: "fridge" },
                { label: "Freezer", value: "freezer" },
                { label: "Dry Food", value: "dry_food" },
              ]}
              placeholder="Select Storage"
              style={styles.picker}
              dropDownContainerStyle={styles.dropDownStyle}
            />

            <Text style={styles.label}>Storage Date</Text>
            <TouchableOpacity style={styles.dateInput} onPress={() => showDatepicker("storage")}>
              <Text style={{ flex: 1 }}>{storageDate.toLocaleDateString()}</Text>
              <Ionicons name="calendar-outline" size={20} color="gray" />
            </TouchableOpacity>

            <Text style={styles.label}>Expiration Date</Text>
            <TouchableOpacity style={styles.dateInput} onPress={() => showDatepicker("expiration")}>
              <Text style={{ flex: 1 }}>{expirationDate.toLocaleDateString()}</Text>
              <Ionicons name="calendar-outline" size={20} color="gray" />
            </TouchableOpacity>
            
            <Text style={styles.label}>Quantity</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter quantity"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              placeholderTextColor="#B0B0B0"
            />

            <Text style={styles.label}>Note</Text>
            <TextInput
              style={[styles.input, styles.noteInput]}
              placeholder="Notes"
              multiline
              value={note}
              onChangeText={setNote}
              placeholderTextColor="#B0B0B0"
            />
          </View>

          {/* DateTimePicker สำหรับ Storage Date */}
          {showStorageDatePicker && (
            <View style={styles.dateTimePickerStorageContainer}>
              <DateTimePicker
                value={storageDate}
                mode="date"
                display="spinner"
                textColor="black"
                onChange={onChangeStorageDate}
                style={styles.dateTimePicker}
              />
              <TouchableOpacity style={styles.confirmButton} onPress={() => setShowStorageDatePicker(false)}>
                <Text style={styles.confirmText}>Confirm Date</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* DateTimePicker สำหรับ Expiration Date */}
          {showExpirationDatePicker && (
            <View style={styles.dateTimePickerExpirationContainer}>
              <DateTimePicker
                value={expirationDate}
                mode="date"
                display="spinner"
                textColor="black"
                onChange={onChangeExpirationDate}
                style={[styles.dateTimePicker, { height: 150 }]}
              />
              <TouchableOpacity style={styles.confirmButton} onPress={() => setShowExpirationDatePicker(false)}>
                <Text style={styles.confirmText}>Confirm Date</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};



const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  gradientBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  cancelText: { fontSize: 16, color: "red" , fontWeight: "bold" },
  saveText: { fontSize: 16, color: "blue" , fontWeight: "bold"},
  title: { fontSize: 20, fontWeight: "bold", color: "#2D3B6B" },

  imagePlaceholder: {
    height: 120,
    width: 120,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: { color: "#ccc", textAlign: "center" },

  formContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 20,
    marginTop: 25,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },

  label: { fontSize: 14, fontWeight: "500", marginBottom: 5, color: "black" },
  input: {
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 10,
    marginBottom: 15,
    color: "black",
  },

  picker: {
    height: 40,
    width: "100%",
    justifyContent: "center",
    marginBottom: 20,
  },

  dropDownStyle: {
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
  },

  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  noteInput: { height: 80, textAlignVertical: "top" },

  dateTimePicker: {
    height: 100
  },

  dateTimePickerStorageContainer: {
    position: "absolute",
    top: "60%",
    left: "5%",
    backgroundColor: "white",
    borderRadius: 20,
    zIndex: 10,
    padding: 10,
  },

  dateTimePickerExpirationContainer: {
    position: "absolute",
    top: "60%",
    left: "5%",
    backgroundColor: "white",
    borderRadius: 20,
    zIndex: 10,
    padding: 10,
  },

  confirmButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 10,
  },

  confirmText: {
    color: "white",
    fontSize: 16,
  },

  imagePreview: {
    width: "100%",  
    height: "100%",
    borderRadius: 10, 
    resizeMode: "cover",
  },
  
});

export default AddProductScreen;