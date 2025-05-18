"use client"

import { useEffect, useState } from "react"
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native"

// Get screen width to calculate image size
const { width } = Dimensions.get("window")
const imageSize = width / 3 - 12 // 3 images per row with some padding

const GalleryScreen = ({ navigation }) => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  // For demo purposes, we'll use dummy images
  // In a real app, you would load from AsyncStorage or a database
  useEffect(() => {
    const loadImages = async () => {
      try {
        // In a real app, you would load saved images from storage
        // const savedImages = await AsyncStorage.getItem('capturedImages');
        // if (savedImages) {
        //   setImages(JSON.parse(savedImages));
        // }

        // For demo, create dummy images
        const dummyImages = Array.from({ length: 12 }, (_, i) => ({
          id: i.toString(),
          uri: `https://via.placeholder.com/300x300?text=Photo+${i + 1}`,
          date: new Date(Date.now() - i * 86400000).toISOString(),
        }))

        setImages(dummyImages)
      } catch (error) {
        console.error("Error loading images:", error)
      } finally {
        setLoading(false)
      }
    }

    loadImages()
  }, [])

  const handleImagePress = (image) => {
    navigation.navigate("ImageDetail", { imageUri: image.uri })
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4361ee" />
        <Text style={styles.loadingText}>Loading gallery...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {images.length > 0 ? (
        <FlatList
          data={images}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.imageContainer} onPress={() => handleImagePress(item)}>
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imageText}>{`Photo ${Number.parseInt(item.id) + 1}`}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.galleryContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No photos yet</Text>
          <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate("Camera")}>
            <Text style={styles.buttonText}>Take a Photo</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#4361ee",
  },
  galleryContainer: {
    padding: 4,
  },
  imageContainer: {
    margin: 4,
    width: imageSize,
    height: imageSize,
    borderRadius: 8,
    overflow: "hidden",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  imageText: {
    color: "#666",
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  cameraButton: {
    backgroundColor: "#4361ee",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
})

export default GalleryScreen
