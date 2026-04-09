import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { ArrowLeft, Camera, ImagePlus, Sparkles } from 'lucide-react-native';
import { Button } from '../components/ui';
import { useFurnitureStore } from '../store/furnitureStore';
import { analyzePhotoWithAI } from '../../infrastructure';
import { colors, typography, spacing, radii, shadows } from '../../shared/theme';

export function CameraScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ mode?: string }>();
  const {
    setReferencePhoto,
    setAnalysis,
    setAnalyzing,
    setAnalysisError,
    isAnalyzing,
  } = useFurnitureStore();

  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);

  const pickFromCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'We need camera access to photograph the furniture.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      base64: true,
    });
    if (!result.canceled && result.assets[0]?.base64) {
      setPhotoUri(result.assets[0].uri);
      setPhotoBase64(result.assets[0].base64);
    }
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      base64: true,
    });
    if (!result.canceled && result.assets[0]?.base64) {
      setPhotoUri(result.assets[0].uri);
      setPhotoBase64(result.assets[0].base64);
    }
  };

  const handleAnalyze = async () => {
    if (!photoUri || !photoBase64) return;

    try {
      setAnalyzing(true);
      setAnalysisError(null);
      setReferencePhoto(photoUri);

      const analysis = await analyzePhotoWithAI(photoBase64);
      setAnalysis(analysis);
      router.replace('/configurator');
    } catch (error: any) {
      setAnalysisError('Failed to analyze photo.');
      Alert.alert('Error', 'Could not analyze the photo. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  React.useEffect(() => {
    if (params.mode === 'gallery') {
      pickFromGallery();
    }
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Button
            label=""
            variant="ghost"
            size="sm"
            onPress={() => router.back()}
            icon={<ArrowLeft size={20} color={colors.text.primary} />}
          />
          <Text style={styles.headerTitle}>Reference photo</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.photoArea}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photo} resizeMode="contain" />
          ) : (
            <View style={styles.placeholder}>
              <Camera size={48} color={colors.neutral[300]} />
              <Text style={styles.placeholderText}>
                Take a photo of the furniture{'\n'}you'd like as reference
              </Text>
            </View>
          )}
        </View>

        <View style={styles.actions}>
          {!photoUri ? (
            <>
              <Button
                label="Take photo"
                variant="primary"
                size="lg"
                fullWidth
                onPress={pickFromCamera}
                icon={<Camera size={20} color={colors.text.inverse} />}
              />
              <Button
                label="Choose from gallery"
                variant="outline"
                size="lg"
                fullWidth
                onPress={pickFromGallery}
                icon={<ImagePlus size={20} color={colors.brand.primary} />}
              />
            </>
          ) : (
            <>
              <Button
                label={isAnalyzing ? 'Analyzing with AI...' : 'Analyze with AI'}
                variant="primary"
                size="lg"
                fullWidth
                loading={isAnalyzing}
                onPress={handleAnalyze}
                icon={!isAnalyzing ? <Sparkles size={20} color={colors.text.inverse} /> : undefined}
              />
              <Button
                label="Take another photo"
                variant="ghost"
                onPress={() => { setPhotoUri(null); setPhotoBase64(null); }}
              />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background.primary },
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing[3], paddingVertical: spacing[2],
    borderBottomWidth: 1, borderBottomColor: colors.border.light,
  },
  headerTitle: { fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.semibold, color: colors.text.primary },
  photoArea: { flex: 1, margin: spacing[4], borderRadius: radii.xl, overflow: 'hidden', backgroundColor: colors.background.secondary, ...shadows.sm },
  photo: { width: '100%', height: '100%' },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing[4] },
  placeholderText: { fontSize: typography.fontSize.base, color: colors.text.tertiary, textAlign: 'center', lineHeight: 22 },
  actions: { padding: spacing[4], paddingBottom: spacing[6], gap: spacing[3] },
});
