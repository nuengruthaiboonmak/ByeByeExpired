import { createStackNavigator } from '@react-navigation/stack';
// นำเข้าไฟล์ต่างๆ ที่จำเป็น
import LoadScreen from "../screens/Load";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import ProfileScreen from "../screens/Profile";
import OverviewScreen from "../screens/Overview";
import AddProductScreen from "../screens/AddProduct.jsx";
import ShowDetailProductScreen from "../screens/ShowDetailProduct";
import StorageFridgeScreen from "../screens/StorageFridge";
import StorageFreezerScreen from "../screens/StorageFreezer";
import StorageDryFoodScreen from "../screens/StorageDryFood";
import NearlyExpiredScreen from "../screens/NearlyExpired";
import AllProductScreen from "../screens/AllProduct";
import ExpiredScreen from "../screens/Expired";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Load" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Load" component={LoadScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Overview" component={OverviewScreen} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
      <Stack.Screen name="ShowDetailProduct" component={ShowDetailProductScreen} />
      <Stack.Screen name="StorageFridge" component={StorageFridgeScreen} />
      <Stack.Screen name="StorageFreezer" component={StorageFreezerScreen} />
      <Stack.Screen name="StorageDryFood" component={StorageDryFoodScreen} />
      <Stack.Screen name="NearlyExpired" component={NearlyExpiredScreen} />
      <Stack.Screen name="AllProduct" component={AllProductScreen} />
      <Stack.Screen name="Expired" component={ExpiredScreen} />
    </Stack.Navigator>
  );
}
