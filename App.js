import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar } from "expo-status-bar"
import React, { useEffect } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"

import { CartProvider } from "./context/CartContext"
import CameraScreen from "./screens/CameraScreen"
import CapturedImageScreen from "./screens/CapturedImageScreen"
import CartScreen from "./screens/CartScreen"
import ProductDetailScreen from "./screens/ProductDetailScreen"
import ProductListScreen from "./screens/ProductListScreen"

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const FallbackScreen = () => (
  <ScrollView contentContainerStyle={styles.fallback}>
    <Text style={styles.fallbackText}>Loading App...</Text>
    <Text style={styles.fallbackSubtext}>
      If you see this screen for more than a few seconds, there might be an issue with the app initialization.
    </Text>
  </ScrollView>
)

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.fallback}>
          <Text style={styles.fallbackText}>Something went wrong.</Text>
        </View>
      )
    }
    return this.props.children
  }
}

const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName="ProductList"
    screenOptions={{
      headerStyle: { backgroundColor: "#4361ee" },
      headerTintColor: "#fff",
      headerTitleStyle: { fontWeight: "bold" },
    }}
  >
    <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: "Products" }} />
    <Stack.Screen
      name="ProductDetail"
      component={ProductDetailScreen}
      options={({ route }) => ({
        title: route.params?.product?.title || "Product Detail",
      })}
    />
    <Stack.Screen name="Camera" component={CameraScreen} options={{ title: "Take a Photo" }} />
    <Stack.Screen name="CapturedImage" component={CapturedImageScreen} options={{ title: "Captured Photo" }} />
    <Stack.Screen name="Cart" component={CartScreen} options={{ title: "Shopping Cart" }} />
  </Stack.Navigator>
)

export default function App() {
  useEffect(() => {
    console.log("App component mounted")
    return () => console.log("App component unmounted")
  }, [])

  return (
    <ErrorBoundary>
      <CartProvider>
        <NavigationContainer fallback={<FallbackScreen />}>
          <StatusBar style="auto" />
          <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
              drawerStyle: {
                backgroundColor: "#f8f9fa",
                width: 240,
              },
              headerShown: true, // Enable header to show the drawer toggle button
            }}
          >
            <Drawer.Screen name="Home" component={StackNavigator} options={{ title: "Home" }} />
            <Drawer.Screen name="Cart" component={CartScreen} options={{ title: "Shopping Cart" }} />
            <Drawer.Screen name="Camera" component={CameraScreen} options={{ title: "Take a Photo" }} />
          </Drawer.Navigator>
        </NavigationContainer>
      </CartProvider>
    </ErrorBoundary>
  )
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  fallbackText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  fallbackSubtext: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
  },
})
