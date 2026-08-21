import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Image } from 'expo-image';
import Svg, { Path, Line, Circle } from 'react-native-svg';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, MaxContentWidth } from '@/constants/theme';

const PulseWave = ({ color = '#2E8B57' }: { color?: string }) => (
  <View style={styles.pulseContainer}>
    <View style={[styles.pulseLine, { backgroundColor: `${color}40` }]} />
    <Svg width={50} height={20} viewBox="0 0 50 20">
      <Path
        d="M0 10 H15 L18 2 L22 18 L26 7 L29 13 L32 10 H50"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
    <View style={[styles.pulseLine, { backgroundColor: `${color}40` }]} />
  </View>
);

const BluetoothIcon = ({ color = '#FFFFFF', size = 20 }: { color?: string; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <Path d="m6.5 6.5 11 11L12 23V1l5.5 5.5-11 11" />
  </Svg>
);

const HelpIcon = ({ color = '#E5F5EA' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="9" />
    <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <Line x1="12" y1="17" x2="12.01" y2="17" />
  </Svg>
);

const LeafIcon = ({ color = '#2E8B57' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2z" />
    <Path d="M9.8 6.1C12 8 15 11 19 12" />
  </Svg>
);

const CheckIcon = ({ color = '#2E8B57' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20 6 9 17l-5-5" />
  </Svg>
);

interface ConnectDeviceScreenProps {
  onConnected: () => void;
  onSkip: () => void;
}

const STEPS = [
  {
    number: 1,
    title: 'Turn on Bluetooth',
    description: 'Enable Bluetooth on your phone',
    image: require('@/assets/images/phoneIcon.png'),
  },
  {
    number: 2,
    title: 'Power on the stick',
    description: 'Press and hold the power button until the LED starts blinking',
    image: require('@/assets/images/StickIcon.png'),
  },
  {
    number: 3,
    title: 'Find and Connect',
    description: 'Tap the connect button below and select your AgroPulse Stick',
    image: require('@/assets/images/all3icon.png'),
  },
];

export function ConnectDeviceScreen({ onConnected, onSkip }: ConnectDeviceScreenProps) {
  const theme = useTheme();
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      Alert.alert('Device Found!', 'AgroPulse Stick connected successfully.', [
        { text: 'Continue', onPress: onConnected },
      ]);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Image
            source={require('@/assets/images/title.png')}
            style={styles.brandTitleImage}
            contentFit="contain"
            priority="high"
          />

          <TouchableOpacity
            style={styles.helpButton}
            onPress={() =>
              Alert.alert('Help', 'For assistance, visit agroPulse.com/support or contact our support team.')
            }
            activeOpacity={0.8}
          >
            <HelpIcon color="#E5F5EA" />
          </TouchableOpacity>
        </View>

        <PulseWave color="#2E8B57" />

        <View style={styles.titleContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.titleText}>Connect Your Device</Text>
            <BluetoothIcon color="#2E8B57" size={26} />
          </View>

          <Text style={[styles.subtitleText, { color: '#C7D8CF' }]}>
            {'Follow the steps below to connect your\nAgroPulse Device via Bluetooth'}
          </Text>
        </View>

        <View style={styles.illustrationContainer}>
          <Image source={require('@/assets/images/stick.png')} style={styles.stickImage} contentFit="contain" />
        </View>

        <View style={styles.stepsHeaderRow}>
          <LeafIcon color="#2E8B57" />
          <Text style={styles.stepsHeaderText}>3 Simple Steps</Text>
          <LeafIcon color="#2E8B57" />
        </View>

        <View style={styles.stepsContainer}>
          {STEPS.map((step) => (
            <View key={step.number} style={styles.stepCard}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>{step.number}</Text>
              </View>

              <View style={styles.stepTextContainer}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>

              <View style={styles.stepIllustration}>
                <Image source={step.image} style={[styles.stepImage, step.number === 3 && styles.allStepsImage]} contentFit="contain" />
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.scanButton, scanning && styles.scanButtonScanning]}
          onPress={handleScan}
          activeOpacity={0.9}
          disabled={scanning}
        >
          <BluetoothIcon color="#FFFFFF" size={22} />
          <Text style={styles.scanButtonText}>{scanning ? 'Scanning...' : 'Scan & Connect Stick'}</Text>
        </TouchableOpacity>

        <View style={styles.footerNoteRow}>
          <View style={styles.checkWrap}>
            <CheckIcon color="#2E8B57" />
          </View>
          <Text style={styles.footerNoteText}>Make sure your stick is powered on & in range</Text>
        </View>

        <TouchableOpacity onPress={onSkip} style={styles.skipLink}>
          <Text style={styles.skipLinkText}>Skip for now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 12,
    alignItems: 'center',
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 0,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTitleImage: {
    width: 116,
    height: 31,
  },
  brandAgro: {
    fontSize: 32,
    fontWeight: '900',
    color: '#F16B1C',
  },
  brandPulse: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2E8B57',
    fontStyle: 'italic',
    marginLeft: 2,
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
  pulseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    height: 1,
    marginTop: 5,
    marginBottom: 10,
  },
  pulseLine: {
    flex: 1,
    height: 1,
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    marginTop: 0,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    gap: 8,
  },
  titleText: {
    fontSize: 21,
    fontWeight: '800',
    color: '#194C2D',
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
    fontWeight: '500',
    color: '#111111',
  },
  illustrationContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 3,
  },
  stickImage: {
    width: 190,
    height: 118,
  },
  stepsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 7,
  },
  stepsHeaderText: {
    fontSize: 14,
    color: '#194C2D',
    fontWeight: '800',
  },
  stepsContainer: {
    width: '94%',
    gap: 5,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#A6B5A8',
    borderRadius: 9,
    paddingVertical: 5,
    paddingHorizontal: 5,
    gap: 7,
  },
  stepBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E7F4E8',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepBadgeText: {
    color: '#27824A',
    fontSize: 11,
    fontWeight: '800',
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 11,
    color: '#111111',
    fontWeight: '700',
    marginBottom: 2,
  },
  stepDescription: {
    fontSize: 8,
    color: '#777777',
    lineHeight: 10,
    fontWeight: '400',
  },
  stepIllustration: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepImage: {
    width: 38,
    height: 38,
  },
  allStepsImage: {
    width: 114,
    transform: [{ translateX: -38 }],
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '94%',
    backgroundColor: '#194C2D',
    borderRadius: 18,
    paddingVertical: 10,
    marginTop: Spacing.three,
    marginBottom: Spacing.two,
    ...Platform.select({
      ios: {
        shadowColor: '#2E8B57',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
      },
      android: { elevation: 4 },
      web: {
        shadowColor: '#2E8B57',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.22,
        shadowRadius: 12,
      },
    }),
  },
  scanButtonScanning: {
    backgroundColor: '#3AA96B',
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  footerNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: Spacing.one,
    paddingHorizontal: Spacing.three,
  },
  checkWrap: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6F4E8',
  },
  footerNoteText: {
    color: '#333333',
    fontSize: 8,
    textAlign: 'center',
    fontWeight: '600',
  },
  skipLink: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
    marginBottom: Spacing.two,
  },
  skipLinkText: {
    color: '#777777',
    fontSize: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
