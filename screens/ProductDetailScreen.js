import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useCart } from "../context/CartContext"

const ProductDetailScreen = ({ route, navigation }) => {
  // Add fallback for missing product
  const {
    product = {
      id: 0,
      title: "Product Not Found",
      price: 0,
      description: "Product details could not be loaded.",
      category: "Unknown",
    },
  } = route.params || {}

  // Use a simpler version for debugging
  const cart = useCart()
  const { addToCart } = cart || { addToCart: () => console.log("Add to cart clicked") }

  console.log("ProductDetailScreen rendered", product?.title)

  const handleAddToCart = () => {
    addToCart(product)
    navigation.navigate("Cart")
  }

  const navigateToCamera = () => {
    navigation.navigate("Camera")
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Replace placeholder with actual product image */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{product.title}</Text>

            <View style={styles.priceContainer}>
              <Text style={styles.price}>${product.price?.toFixed(2) || "0.00"}</Text>
              <View style={styles.categoryContainer}>
                <Text style={styles.category}>{product.category || "Unknown"}</Text>
              </View>
            </View>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.description}>{product.description || "No description available."}</Text>

            <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>


        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cameraButton} onPress={navigateToCamera}>
            <Text style={styles.buttonText}>📷 Take a Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate("Cart")}>
            <Text style={styles.buttonText}>🛒 View Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    paddingBottom: 100, // Space for the buttons
  },
  imageContainer: {
    width: "100%",
    height: 300,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4361ee",
  },
  categoryContainer: {
    backgroundColor: "#e6e6ff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  category: {
    fontSize: 14,
    color: "#4361ee",
    textTransform: "capitalize",
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: "#4361ee",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addToCartButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  cameraButton: {
    flex: 1,
    backgroundColor: "#4361ee",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 5,
  },
  cartButton: {
    flex: 1,
    backgroundColor: "#22c55e",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
})

export default ProductDetailScreen
