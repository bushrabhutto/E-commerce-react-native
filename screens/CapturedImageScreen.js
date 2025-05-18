import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

// Simplified CapturedImageScreen for debugging
const CapturedImageScreen = ({ route, navigation }) => {
  console.log("CapturedImageScreen rendered")

  // Add fallback for missing imageUri
  const { imageUri = "https://via.placeholder.com/400x600?text=No+Image" } = route.params || {}

  const retakePicture = () => {
    navigation.navigate("Camera")
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>Captured Image</Text>
          <Text style={styles.placeholderSubtext}>(Image display is simplified for debugging)</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={retakePicture}>
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ProductList")}>
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
  },
  placeholderText: {
    color: "white",
    fontSize: 24,
    marginBottom: 10,
  },
  placeholderSubtext: {
    color: "#ccc",
    fontSize: 14,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: "black",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
})

export default CapturedImageScreen
