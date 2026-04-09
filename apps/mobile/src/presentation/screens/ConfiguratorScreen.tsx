import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Share2 } from 'lucide-react-native';
import { FurnitureViewer3D, ConfigPanel } from '../components/furniture';
import type { FurnitureViewer3DRef } from '../components/furniture/FurnitureViewer3D';
import { Button } from '../components/ui';
import { useFurnitureStore } from '../store/furnitureStore';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import { colors, typography, spacing, radii, shadows } from '../../shared/theme';

const { height: SCREEN_H } = Dimensions.get('window');
const VIEWER_HEIGHT = SCREEN_H * 0.42;

export function ConfiguratorScreen() {
  const router = useRouter();
  const { config, isExporting, setExporting } = useFurnitureStore();
  const [viewerReady, setViewerReady] = useState(false);
  const viewerRef = useRef<FurnitureViewer3DRef>(null);

  const handleShare = async () => {
    try {
      setExporting(true);
      if (!viewerRef.current) {
        Alert.alert('Wait', 'The 3D viewer is still loading.');
        return;
      }
      const dataUrl = await viewerRef.current.requestSnapshot();
      const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
      const filePath = FileSystem.cacheDirectory + 'furniture-vision.png';
      await FileSystem.writeAsStringAsync(filePath, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(filePath, { mimeType: 'image/png' });
      }
    } catch (error) {
      console.error('Share failed:', error);
      Alert.alert('Error', 'Could not share the project.');
    } finally {
      setExporting(false);
    }
  };

  const dimensionText = `${config.dimensions.width} × ${config.dimensions.height} × ${config.dimensions.depth} cm`;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Button
          label="" variant="ghost" size="sm"
          onPress={() => router.back()}
          icon={<ArrowLeft size={20} color={colors.text.primary} />}
        />
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Configurator</Text>
          <Text style={styles.headerSub}>{dimensionText}</Text>
        </View>
        <Button
          label="" variant="ghost" size="sm"
          onPress={handleShare} loading={isExporting}
          icon={<Share2 size={20} color={colors.brand.primary} />}
        />
      </View>

      <View style={styles.viewerContainer}>
        <FurnitureViewer3D ref={viewerRef} config={config} onReady={() => setViewerReady(true)} />
        {!viewerReady && (
          <View style={styles.viewerLoading}>
            <Text style={styles.viewerLoadingText}>Loading 3D...</Text>
          </View>
        )}
        <View style={styles.viewerHint}>
          <Text style={styles.hintText}>drag to rotate · pinch to zoom</Text>
        </View>
      </View>

      <ConfigPanel />

      <View style={styles.bottomBar}>
        <Button
          label="Export image" variant="primary" size="lg" fullWidth
          loading={isExporting} onPress={handleShare}
          icon={<Share2 size={20} color={colors.text.inverse} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background.primary },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing[3], paddingVertical: spacing[2],
    borderBottomWidth: 1, borderBottomColor: colors.border.light,
  },
  headerCenter: { alignItems: 'center' },
  headerTitle: { fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.semibold, color: colors.text.primary },
  headerSub: { fontSize: typography.fontSize.xs, color: colors.text.tertiary, marginTop: 2 },
  viewerContainer: { height: VIEWER_HEIGHT, margin: spacing[3], borderRadius: radii.xl, overflow: 'hidden', position: 'relative', ...shadows.md },
  viewerLoading: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.background.secondary, alignItems: 'center', justifyContent: 'center' },
  viewerLoadingText: { fontSize: typography.fontSize.sm, color: colors.text.tertiary },
  viewerHint: { position: 'absolute', bottom: 8, left: 0, right: 0, alignItems: 'center' },
  hintText: { fontSize: typography.fontSize.xxs, color: colors.text.tertiary, backgroundColor: 'rgba(255,255,255,0.7)', paddingHorizontal: 10, paddingVertical: 3, borderRadius: radii.full, overflow: 'hidden' },
  bottomBar: { padding: spacing[4], paddingBottom: spacing[6], borderTopWidth: 1, borderTopColor: colors.border.light },
});
