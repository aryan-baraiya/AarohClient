import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import Svg, { Circle, Path, G } from 'react-native-svg';

interface FieldSetupScreenProps {
  onContinue: () => void;
}

const AgroPulseLogo = () => (
  <Image
    source={require('@/assets/images/title.png')}
    style={styles.logoImage}
    contentFit="contain"
    priority="high"
  />
);

const HelpIcon = () => (
  <View style={styles.helpButton}>
    <Text style={styles.helpText}>?</Text>
  </View>
);

const StepIndicator = () => (
  <View style={styles.stepRow}>
    {[1, 2, 3].map((n, index) => (
      <React.Fragment key={n}>
        <View style={[styles.stepBubble, index === 0 && styles.stepBubbleActive]}>
          <Text style={[styles.stepLabel, index === 0 && styles.stepLabelActive]}>{n}</Text>
        </View>
        {n < 3 && <View style={styles.stepLine} />}
      </React.Fragment>
    ))}
  </View>
);

const FieldIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 32 32" aria-label="field icon">
    <G stroke="#2E8B57" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M6 20c3-6 7-9 12-11 1.5-0.8 3.1-1.3 4.9-1.6-1.4 4.2-3.7 8.3-7.2 12-2.1 2.2-5.1 3.6-9.7 4.6z" />
      <Path d="M8 24c2.8-2.7 6.2-4.7 10.1-6.1" />
      <Path d="M18 18c1.8 1.2 3.5 2.5 5.1 4" />
      <Circle cx="12" cy="12" r="1.2" fill="#2E8B57" stroke="none" />
    </G>
  </Svg>
);

const LocationIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 32 32" aria-label="location icon">
    <G fill="none" stroke="#2E8B57" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M16 27s8-6.5 8-13.5A8 8 0 0 0 8 13.5C8 20.5 16 27 16 27z" />
      <Circle cx="16" cy="13.5" r="2.8" fill="#2E8B57" stroke="none" />
    </G>
  </Svg>
);

export function FieldSetupScreen({ onContinue }: FieldSetupScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View style={styles.brandRow}>
            <AgroPulseLogo />
          </View>
          <HelpIcon />
        </View>

        <Text style={styles.title}>Field Setup</Text>

        <StepIndicator />

        <View style={styles.sectionCard}>
          <View style={styles.labelRow}>
            <FieldIcon />
            <Text style={styles.fieldLabel}>Enter the size of the field</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter the size"
              placeholderTextColor="#7C8C85"
              keyboardType="numeric"
            />
            <Text style={styles.unitText}>acres</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.labelRow}>
            <LocationIcon />
            <Text style={styles.fieldLabel}>Points where to place the device</Text>
          </View>

          <Text style={styles.helperText}>Distance between points</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder=""
              keyboardType="numeric"
              value=""
            />
            <Text style={styles.unitText}>meters</Text>
          </View>

          <Text style={styles.helperText}>Number of points</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder=""
              keyboardType="numeric"
              value=""
            />
          </View>
        </View>

        <View style={styles.checkboxRow}>
          <View style={styles.checkBox}>
            <Text style={styles.checkMark}>✓</Text>
          </View>
          <Text style={styles.checkboxText}>Device will be placed at the given distance interval across your field</Text>
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={onContinue} activeOpacity={0.9}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#eef2ee',
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 150,
    height: 38,
  },
  logoWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#F16B1C',
    fontStyle: 'italic',
  },
  logoAccent: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2C8B5A',
    marginLeft: 2,
    fontStyle: 'italic',
  },
  helpButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#E6F2EA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C9DCCF',
  },
  helpText: {
    color: '#1A3126',
    fontSize: 18,
    fontWeight: '700',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#183329',
    marginTop: 6,
    marginBottom: 18,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  stepBubble: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#D9E6DD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBubbleActive: {
    backgroundColor: '#2E8B57',
  },
  stepLabel: {
    color: '#4D625B',
    fontWeight: '700',
    fontSize: 13,
  },
  stepLabelActive: {
    color: '#fff',
  },
  stepLine: {
    width: 36,
    height: 2,
    backgroundColor: '#D0DDD4',
    marginHorizontal: 6,
  },
  sectionCard: {
    backgroundColor: '#F6FAF7',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CFE3D5',
    padding: 14,
    marginBottom: 18,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#183329',
    marginLeft: 8,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#BFD5C8',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    color: '#183329',
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 0,
  },
  unitText: {
    color: '#5A6F66',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
  },
  helperText: {
    color: '#4C5E57',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
    gap: 8,
  },
  checkBox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#2E8B57',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkMark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '900',
  },
  checkboxText: {
    flex: 1,
    color: '#2F4A42',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#2E8B57',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#2E8B57',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: { elevation: 4 },
    }),
  },
  continueText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
});
