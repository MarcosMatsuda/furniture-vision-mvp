import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useFurnitureStore } from '../../store/furnitureStore';
import { DimensionSlider, MaterialPicker, Counter } from '../ui';
import { DIMENSION_LIMITS } from '../../../domain/entities';
import { colors, typography, spacing } from '../../../shared/theme';

export function ConfigPanel() {
  const { config, setDimension, setMaterial, setShelves } = useFurnitureStore();

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <SectionTitle>Dimensions</SectionTitle>
      <DimensionSlider
        label="Width"
        value={config.dimensions.width}
        min={DIMENSION_LIMITS.width[0]}
        max={DIMENSION_LIMITS.width[1]}
        onValueChange={(v) => setDimension('width', v)}
      />
      <DimensionSlider
        label="Height"
        value={config.dimensions.height}
        min={DIMENSION_LIMITS.height[0]}
        max={DIMENSION_LIMITS.height[1]}
        onValueChange={(v) => setDimension('height', v)}
      />
      <DimensionSlider
        label="Depth"
        value={config.dimensions.depth}
        min={DIMENSION_LIMITS.depth[0]}
        max={DIMENSION_LIMITS.depth[1]}
        onValueChange={(v) => setDimension('depth', v)}
      />

      <SectionTitle>Shelves</SectionTitle>
      <Counter
        label="Shelf count"
        value={config.shelves}
        min={0}
        max={12}
        onChange={setShelves}
      />

      <SectionTitle>Material</SectionTitle>
      <MaterialPicker selected={config.material} onSelect={setMaterial} />
    </ScrollView>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  content: { padding: spacing[4], paddingBottom: spacing[10] },
  sectionTitle: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: spacing[5],
    marginBottom: spacing[2],
  },
});
