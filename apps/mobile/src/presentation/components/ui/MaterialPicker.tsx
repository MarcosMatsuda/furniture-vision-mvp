import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors, typography, spacing, radii } from '../../../shared/theme';
import { WoodMaterial } from '../../../domain/entities';

const MATERIALS: { key: WoodMaterial; label: string; hex: string }[] = [
  { key: 'branco', label: 'Branco', hex: colors.wood.branco },
  { key: 'carvalho', label: 'Carvalho', hex: colors.wood.carvalho },
  { key: 'tabaco', label: 'Tabaco', hex: colors.wood.tabaco },
  { key: 'preto', label: 'Preto', hex: colors.wood.preto },
  { key: 'freijo', label: 'Freijó', hex: colors.wood.freijo },
  { key: 'nogueira', label: 'Nogueira', hex: colors.wood.nogueira },
  { key: 'cinza', label: 'Cinza', hex: colors.wood.cinza },
  { key: 'amendoa', label: 'Amêndoa', hex: colors.wood.amendoa },
  { key: 'canela', label: 'Canela', hex: colors.wood.canela },
];

interface MaterialPickerProps {
  selected: WoodMaterial;
  onSelect: (material: WoodMaterial) => void;
}

export function MaterialPicker({ selected, onSelect }: MaterialPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Material</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.grid}>
          {MATERIALS.map((mat) => (
            <TouchableOpacity
              key={mat.key}
              style={[
                styles.swatch,
                selected === mat.key && styles.swatchActive,
              ]}
              onPress={() => onSelect(mat.key)}
              activeOpacity={0.7}
            >
              <View
                style={[styles.swatchColor, { backgroundColor: mat.hex }]}
              />
              <Text
                style={[
                  styles.swatchLabel,
                  selected === mat.key && styles.swatchLabelActive,
                ]}
              >
                {mat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[4],
  },
  title: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing[2],
  },
  grid: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  swatch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    paddingVertical: spacing[1] + 2,
    paddingHorizontal: spacing[2] + 2,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border.light,
  },
  swatchActive: {
    borderColor: colors.brand.primary,
    backgroundColor: colors.overlay.brand,
  },
  swatchColor: {
    width: 14,
    height: 14,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  swatchLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.secondary,
  },
  swatchLabelActive: {
    color: colors.brand.primaryDark,
  },
});
