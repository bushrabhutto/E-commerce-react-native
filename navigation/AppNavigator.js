import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import CartScreen from "../screens/CartScreen"
import HomeScreen from "../screens/HomeScreen"
import ProductDetailScreen from "../screens/ProductDetailScreen"

const Stack = createStackNavigator()

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#3a0ca3",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "E-Commerce App" }} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: "Product Details" }} />
        <Stack.Screen name="Cart" component={CartScreen} options={{ title: "Shopping Cart" }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
