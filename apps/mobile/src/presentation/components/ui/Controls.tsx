import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, spacing, radii } from '../../../shared/theme';

interface ToggleOptionProps {
  label: string;
  value: boolean;
  onToggle: () => void;
}

export function ToggleOption({ label, value, onToggle }: ToggleOptionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.track, value && styles.trackActive]}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <View style={[styles.thumb, value && styles.thumbActive]} />
      </TouchableOpacity>
    </View>
  );
}

interface SegmentOption {
  key: string;
  label: string;
}

interface SegmentPickerProps {
  label: string;
  options: SegmentOption[];
  selected: string;
  onSelect: (key: string) => void;
}

export function SegmentPicker({ label, options, selected, onSelect }: SegmentPickerProps) {
  return (
    <View style={styles.segmentContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.segmentRow}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt.key}
            style={[
              styles.segmentBtn,
              selected === opt.key && styles.segmentBtnActive,
            ]}
            onPress={() => onSelect(opt.key)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.segmentLabel,
                selected === opt.key && styles.segmentLabelActive,
              ]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

interface CounterProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

export function Counter({ label, value, min, max, onChange }: CounterProps) {
  return (
    <View style={styles.counterContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.counterRow}>
        <TouchableOpacity
          style={[styles.counterBtn, value <= min && styles.counterBtnDisabled]}
          onPress={() => value > min && onChange(value - 1)}
          activeOpacity={0.7}
        >
          <Text style={styles.counterBtnText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.counterValue}>{value}</Text>
        <TouchableOpacity
          style={[styles.counterBtn, value >= max && styles.counterBtnDisabled]}
          onPress={() => value < max && onChange(value + 1)}
          activeOpacity={0.7}
        >
          <Text style={styles.counterBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Toggle
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing[2],
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.secondary,
  },
  track: {
    width: 44,
    height: 24,
    borderRadius: radii.full,
    backgroundColor: colors.neutral[200],
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  trackActive: {
    backgroundColor: colors.brand.primary,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: radii.full,
    backgroundColor: colors.neutral[50],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  thumbActive: {
    alignSelf: 'flex-end',
  },

  // Segment
  segmentContainer: {
    marginBottom: spacing[3],
  },
  segmentRow: {
    flexDirection: 'row',
    gap: spacing[2],
    marginTop: spacing[2],
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border.light,
    alignItems: 'center',
  },
  segmentBtnActive: {
    borderColor: colors.brand.primary,
    backgroundColor: colors.overlay.brand,
  },
  segmentLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.secondary,
  },
  segmentLabelActive: {
    color: colors.brand.primaryDark,
    fontWeight: typography.fontWeight.semibold,
  },

  // Counter
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing[2],
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  counterBtn: {
    width: 32,
    height: 32,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnDisabled: {
    opacity: 0.3,
  },
  counterBtnText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  counterValue: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    minWidth: 24,
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
  },
});
