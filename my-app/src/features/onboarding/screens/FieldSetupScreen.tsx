import React, { useState } from 'react';
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

export function FieldSetupScreen({ onContinue }: FieldSetupScreenProps) {
  const [fieldSize, setFieldSize] = useState('');
  const [distance, setDistance] = useState('');
  const [pointCount, setPointCount] = useState('');

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
            <View style={styles.iconFrame}>
              <Image source={require('@/assets/images/feild&locationicon.png')} style={styles.fieldIconImage} contentFit="fill" />
            </View>
            <Text style={styles.fieldLabel}>Enter the size of the field</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter the size"
              placeholderTextColor="#7C8C85"
              keyboardType="numeric"
              value={fieldSize}
              onChangeText={setFieldSize}
            />
            <Text style={styles.unitText}>acres</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.labelRow}>
            <View style={styles.iconFrame}>
              <Image source={require('@/assets/images/feild&locationicon.png')} style={styles.locationIconImage} contentFit="fill" />
            </View>
            <Text style={styles.fieldLabel}>Points where to place the device</Text>
          </View>

          <Text style={styles.helperText}>Distance between points</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder=""
              keyboardType="numeric"
              value={distance}
              onChangeText={setDistance}
            />
            <Text style={styles.unitText}>meters</Text>
          </View>

          <Text style={styles.helperText}>Number of points</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder=""
              keyboardType="numeric"
              value={pointCount}
              onChangeText={setPointCount}
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
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 330,
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 108,
    height: 30,
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
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#315E4A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#315E4A',
  },
  helpText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    color: '#194C2D',
    marginTop: 1,
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  stepBubble: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#DCE5DF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBubbleActive: {
    backgroundColor: '#194C2D',
  },
  stepLabel: {
    color: '#4D625B',
    fontWeight: '700',
    fontSize: 12,
  },
  stepLabelActive: {
    color: '#fff',
  },
  stepLine: {
    width: 36,
    height: 2,
    backgroundColor: '#BBD0C2',
    marginHorizontal: 3,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#222222',
    padding: 12,
    marginBottom: 14,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconFrame: {
    width: 42,
    height: 42,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  fieldIconImage: {
    width: 84,
    height: 42,
  },
  locationIconImage: {
    width: 84,
    height: 42,
    transform: [{ translateX: -42 }],
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
    marginLeft: 7,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#BFD5C8',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    color: '#183329',
    fontSize: 13,
    fontWeight: '500',
    paddingVertical: 0,
  },
  unitText: {
    color: '#5A6F66',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 8,
  },
  helperText: {
    color: '#4C5E57',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 7,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 7,
  },
  checkBox: {
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: '#13D637',
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
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '400',
  },
  continueButton: {
    backgroundColor: '#194C2D',
    borderRadius: 16,
    paddingVertical: 11,
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
