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
import Svg, { Path, Circle, Rect, Line, Ellipse } from 'react-native-svg';
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

const DeviceIllustration = () => (
  <Svg width={200} height={160} viewBox="0 0 200 160">
    <Ellipse cx="98" cy="130" rx="32" ry="9" fill="#2E8B5715" />
    <Rect x="90" y="28" width="18" height="96" rx="9" fill="#2F3136" />
    <Rect x="84" y="18" width="30" height="18" rx="7" fill="#183F26" />
    <Rect x="95" y="8" width="8" height="14" rx="4" fill="#2E8B57" />
    <Circle cx="99" cy="72" r="5" fill="#34A853" />

    <Circle cx="146" cy="82" r="16" fill="none" stroke="#2E8B57" strokeWidth="2" strokeDasharray="4,3" />
    <Circle cx="146" cy="82" r="28" fill="none" stroke="#2E8B57" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5" />
    <Circle cx="146" cy="82" r="12" fill="#2E8B57" />
    <Path
      d="M143 78 l6 4 l-6 4 M143 78 l6 4 l-6 4 M146 77 l4 0"
      fill="none"
      stroke="white"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <Line x1="108" y1="82" x2="130" y2="82" stroke="#2E8B57" strokeWidth="1.6" strokeDasharray="4,3" />
  </Svg>
);

const PhoneBluetoothIcon = () => (
  <Svg width={50} height={50} viewBox="0 0 48 48">
    <Rect x="12" y="5" width="18" height="30" rx="3" fill="#EAF9EE" stroke="#2E8B57" strokeWidth="1.5" />
    <Circle cx="21" cy="31" r="2" fill="#2E8B57" />
    <Circle cx="32" cy="17" r="8" fill="#2E8B57" />
    <Path d="M29 13 l4 3.5 l-4 3.5 M29 13 l4 3.5 l-4 3.5" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M32 11 l2 2.5 l-2 2.5 l2 2.5 l-2 2.5" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);

const StickPowerIcon = () => (
  <Svg width={50} height={50} viewBox="0 0 48 48">
    <Rect x="18" y="10" width="12" height="30" rx="6" fill="#EAF9EE" stroke="#2E8B57" strokeWidth="1.5" />
    <Rect x="21" y="4" width="6" height="9" rx="3" fill="#2E8B57" />
    <Circle cx="24" cy="24" r="3.5" fill="#34A853" />
    <Circle cx="24" cy="24" r="7" fill="none" stroke="#34A853" strokeWidth="1" opacity="0.5" />
  </Svg>
);

const PhoneListIcon = () => (
  <Svg width={50} height={50} viewBox="0 0 48 48">
    <Rect x="8" y="6" width="22" height="36" rx="3" fill="#EAF9EE" stroke="#2E8B57" strokeWidth="1.5" />
    <Rect x="12" y="14" width="14" height="3" rx="1.5" fill="#2E8B57" opacity="0.5" />
    <Rect x="12" y="20" width="14" height="3" rx="1.5" fill="#2E8B57" />
    <Rect x="12" y="26" width="14" height="3" rx="1.5" fill="#2E8B57" opacity="0.5" />
    <Circle cx="36" cy="30" r="8" fill="#2E8B57" opacity="0.9" />
    <Path d="M33 30 l2 2 l4-4" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
    Icon: PhoneBluetoothIcon,
  },
  {
    number: 2,
    title: 'Power on the stick',
    description: 'Press and hold the power button until the LED starts blinking',
    Icon: StickPowerIcon,
  },
  {
    number: 3,
    title: 'Find and Connect',
    description: 'Tap the connect button below and select your AgroPulse Stick',
    Icon: PhoneListIcon,
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
    <SafeAreaView style={[styles.safeArea, { backgroundColor: '#0D1210' }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <View style={styles.logoRow}>
            <Text style={styles.brandAgro}>एग्रो</Text>
            <Text style={styles.brandPulse}>Pulse</Text>
          </View>

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
          <DeviceIllustration />
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
                <step.Icon />
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
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Spacing.four,
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
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.one,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1F2B27',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#325B49',
  },
  pulseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    marginVertical: Spacing.one,
  },
  pulseLine: {
    flex: 1,
    height: 2,
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    marginTop: Spacing.one,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.one,
    gap: 8,
  },
  titleText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#EAF7ED',
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '600',
  },
  illustrationContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.one,
    marginBottom: Spacing.one,
  },
  stepsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: Spacing.two,
  },
  stepsHeaderText: {
    fontSize: 18,
    color: '#EAF7ED',
    fontWeight: '800',
  },
  stepsContainer: {
    width: '94%',
    gap: Spacing.two,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141C18',
    borderWidth: 1,
    borderColor: '#294A3F',
    borderRadius: 18,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.two,
    gap: 10,
  },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2E8B57',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepBadgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 15,
    color: '#EAF7ED',
    fontWeight: '700',
    marginBottom: 2,
  },
  stepDescription: {
    fontSize: 12,
    color: '#B9C9C1',
    lineHeight: 17,
    fontWeight: '500',
  },
  stepIllustration: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '94%',
    backgroundColor: '#2E8B57',
    borderRadius: 24,
    paddingVertical: 15,
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
    fontSize: 16,
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
    backgroundColor: '#12251D',
  },
  footerNoteText: {
    color: '#EAF7ED',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  skipLink: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
    marginBottom: Spacing.two,
  },
  skipLinkText: {
    color: '#B7C9C1',
    fontSize: 13,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
