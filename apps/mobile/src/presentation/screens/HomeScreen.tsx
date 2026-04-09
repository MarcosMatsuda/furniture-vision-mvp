import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Camera, ImagePlus } from 'lucide-react-native';
import { Button } from '../components/ui';
import { colors, typography, spacing, radii, shadows } from '../../shared/theme';

export function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.title}>Furniture Vision</Text>
          <Text style={styles.subtitle}>
            Turn a photo of a bookshelf into{'\n'}a customizable 3D project using AI
          </Text>
        </View>

        <View style={styles.actions}>
          <Button
            label="Get started"
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => router.push('/camera')}
            icon={<Camera size={20} color={colors.text.inverse} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function ActionCard({ icon, title, description, onPress }: {
  icon: React.ReactNode; title: string; description: string; onPress: () => void;
}) {
  return (
    <Button
      label=""
      variant="outline"
      size="lg"
      fullWidth
      onPress={onPress}
      icon={
        <View style={styles.cardContent}>
          {icon}
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardDesc}>{description}</Text>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background.primary },
  container: { flex: 1, justifyContent: 'space-between', padding: spacing[5], paddingTop: '35%', paddingBottom: spacing[10] },
  hero: { alignItems: 'center', marginBottom: spacing[8] },
  title: { fontSize: 32, fontWeight: '800', color: colors.brand.primary, marginBottom: spacing[2] },
  subtitle: { fontSize: typography.fontSize.base, color: colors.text.secondary, textAlign: 'center', lineHeight: 22 },
  actions: { gap: spacing[3] },
  cardContent: { flexDirection: 'row', alignItems: 'center', gap: spacing[3], width: '100%', paddingVertical: spacing[1] },
  cardText: { flex: 1 },
  cardTitle: { fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.semibold, color: colors.text.primary },
  cardDesc: { fontSize: typography.fontSize.sm, color: colors.text.tertiary, marginTop: 2 },
});
