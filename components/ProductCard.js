import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product, onPress }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    console.log("🛒 Adding to cart:", product.title);
    addToCart(product);

    Toast.show({
      type: 'success',
      text1: 'Added to cart!',
      position: 'bottom',
      visibilityTime: 1500,
      autoHide: true,
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        <View style={styles.priceRatingContainer}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.rating}>⭐ {product.rating?.rate || "0"}</Text>
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart} activeOpacity={0.7}>
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    maxWidth: "47%",
  },
  image: {
    width: "100%",
    height: 150,
    backgroundColor: "white",
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    height: 40,
  },
  priceRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4361ee",
  },
  rating: {
    fontSize: 12,
    color: "#666",
  },
  buttonWrapper: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  addButton: {
    backgroundColor: "#4361ee",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default ProductCard;
