"use client"
import { Camera } from 'expo-camera'; // Added CameraType import
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useRef, useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CameraScreen = ({ navigation, route }) => {
  // Handle web platform
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webContainer}>
        <Text style={styles.webText}>Camera not supported on web</Text>
        <TouchableOpacity
          style={styles.webButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.webButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaPermission, setHasMediaPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [capturedImage, setCapturedImage] = useState(null);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');
      
      const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaPermission(mediaStatus === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
          exif: true,
          skipProcessing: true
        });
        setCapturedImage(photo.uri);
        
        if (hasMediaPermission) {
          await MediaLibrary.saveToLibraryAsync(photo.uri);
        }
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  const flipCamera = () => {
    setType(current => 
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const toggleFlash = () => {
    setFlashMode(current => 
      current === Camera.Constants.FlashMode.off 
        ? Camera.Constants.FlashMode.on 
        : Camera.Constants.FlashMode.off
    );
  };

  if (hasCameraPermission === null || hasMediaPermission === null) {
    return <View style={styles.loadingContainer} />;
  }

  if (hasCameraPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera permission was denied</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => Linking.openSettings()}
        >
          <Text style={styles.settingsButtonText}>Open Settings</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {capturedImage ? (
        <View style={styles.previewContainer}>
          <Image 
            source={{ uri: capturedImage }} 
            style={styles.preview} 
            resizeMode="contain"
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.retakeButton]}
              onPress={() => setCapturedImage(null)}
            >
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.useButton]}
              onPress={() => {
                navigation.navigate({
                  name: route.params?.returnScreen || 'ProductList',
                  params: { photo: capturedImage },
                  merge: true
                });
              }}
            >
              <Text style={styles.buttonText}>Use Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Camera 
          style={styles.camera} 
          type={type}
          ref={cameraRef}
          flashMode={flashMode}
          ratio="16:9"
        >
          <View style={styles.controls}>
            <TouchableOpacity 
              style={styles.controlButton} 
              onPress={flipCamera}
            >
              <Text style={styles.controlText}>🔄</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.captureButton} 
              onPress={takePicture}
              activeOpacity={0.7}
            />
            <TouchableOpacity 
              style={styles.controlButton} 
              onPress={toggleFlash}
            >
              <Text style={styles.controlText}>
                {flashMode === Camera.Constants.FlashMode.on ? '⚡' : '⚡❌'}
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  webContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  webText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  webButton: {
    backgroundColor: '#4361ee',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  webButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
  permissionText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  settingsButton: {
    backgroundColor: '#4361ee',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  settingsButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
    aspectRatio: 9/16,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    backgroundColor: 'black',
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  controlButton: {
    padding: 15,
  },
  controlText: {
    fontSize: 24,
    color: 'white',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: '#f0f0f0',
  },
  buttonRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  retakeButton: {
    backgroundColor: '#ff4444',
  },
  useButton: {
    backgroundColor: '#4361ee',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CameraScreen;