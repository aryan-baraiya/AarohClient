import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Image } from 'expo-image';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, MaxContentWidth } from '@/constants/theme';

// --- Custom SVGs ---

const EditIcon = ({ color = '#2E8B57' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 20h9" />
    <Path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </Svg>
);

const LeafIcon = ({ color = '#1B3C18' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2z" />
    <Path d="M9.8 6.1C12 8 15 11 19 12" />
  </Svg>
);

const PulseWave = ({ color = '#1B3C18' }: { color?: string }) => (
  <View style={styles.pulseContainer}>
    <View style={[styles.pulseLine, { backgroundColor: color + '40' }]} />
    <Svg width={50} height={20} viewBox="0 0 50 20" style={styles.pulseSvg}>
      <Path
        d="M0 10 H15 L18 2 L22 18 L26 7 L29 13 L32 10 H50"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
    <View style={[styles.pulseLine, { backgroundColor: color + '40' }]} />
  </View>
);

interface OtpScreenProps {
  phoneNumber: string;
  onVerifySuccess: () => void;
  onBackToLogin: () => void;
}

export function OtpScreen({ phoneNumber, onVerifySuccess, onBackToLogin }: OtpScreenProps) {
  const theme = useTheme();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const inputsRef = useRef<(TextInput | null)[]>([]);

  // Timer countdown hook
  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleResendOtp = () => {
    setSecondsLeft(30);
    setOtp(['', '', '', '']);
    inputsRef.current[0]?.focus();
    Alert.alert('OTP Sent', 'A new 4-digit code has been sent to your mobile number.');
  };

  const handleChangeText = (text: string, index: number) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    // Take the last character typed
    newOtp[index] = cleanText.substring(cleanText.length - 1);
    setOtp(newOtp);

    // Shift focus forward if entered a digit
    if (cleanText && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputsRef.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 4) {
      Alert.alert('Invalid OTP', 'Please enter all 4 digits of the verification code.');
      return;
    }
    // Simulate verification success
    onVerifySuccess();
  };

  const formatTime = (seconds: number) => {
    return `00:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Spacer to align layout */}
          <View style={styles.topSpacer} />

          {/* Branding Logo Section */}
          <View style={styles.logoContainer}>
            <View style={styles.brandTitleRow}>
              <Text style={styles.brandAgro}>एग्रो</Text>
              <Text style={styles.brandPulse}>Pulse</Text>
            </View>
            <PulseWave color="#2E8B57" />
          </View>

          {/* Title & Subtitle */}
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Verify Your Number</Text>
            <Text style={[styles.subtitleText, { color: theme.textSecondary }]}>
              We have sent a 4-digit OTP to
            </Text>
            <View style={styles.phoneEditRow}>
              <Text style={[styles.phoneText, { color: theme.text }]}>
                {phoneNumber}
              </Text>
              <TouchableOpacity
                onPress={onBackToLogin}
                style={styles.editButton}
                activeOpacity={0.7}
              >
                <EditIcon color="#2E8B57" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Farmer Mascot Image */}
          <View style={styles.mascotContainer}>
            <Image
              source={require('@/assets/images/farmer_illustration.png')}
              style={styles.mascotImage}
              contentFit="contain"
              priority="high"
            />
          </View>

          {/* OTP Input Card */}
          <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
            {/* Card Header */}
            <Text style={styles.cardTitle}>Enter 4-digit OTP</Text>

            {/* OTP Code Fields Row */}
            <View style={styles.otpInputRow}>
              {otp.map((digit, i) => (
                <TextInput
                  key={i}
                  ref={(ref) => {
                    inputsRef.current[i] = ref;
                  }}
                  style={styles.otpInputBox}
                  value={digit}
                  onChangeText={(text) => handleChangeText(text, i)}
                  onKeyPress={(e) => handleKeyPress(e, i)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  autoFocus={i === 0}
                  autoCorrect={false}
                  placeholderTextColor="#B0B4BA"
                />
              ))}
            </View>

            {/* Timer or Resend Row */}
            <View style={styles.timerRow}>
              {secondsLeft > 0 ? (
                <View style={styles.timerTextContainer}>
                  <Text style={styles.timerLabel}>Resend OTP in </Text>
                  <Text style={styles.timerCount}>{formatTime(secondsLeft)}</Text>
                </View>
              ) : (
                <TouchableOpacity onPress={handleResendOtp} activeOpacity={0.7}>
                  <Text style={styles.resendText}>Resend OTP</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Verify OTP Button */}
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={handleVerifyOtp}
              activeOpacity={0.9}
            >
              <Text style={styles.verifyButtonText}>Verify OTP</Text>
            </TouchableOpacity>

            {/* Change Number Backlink */}
            <TouchableOpacity
              onPress={onBackToLogin}
              style={styles.changeNumberLink}
              activeOpacity={0.7}
            >
              <Text style={styles.changeNumberText}>Change mobile number</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Spacing.four,
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    maxWidth: MaxContentWidth,
  },
  topSpacer: {
    height: Spacing.four,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.two,
    width: '100%',
  },
  brandTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  brandAgro: {
    fontSize: 36,
    fontWeight: '900',
    color: '#E65A00',
    marginRight: 4,
  },
  brandPulse: {
    fontSize: 36,
    fontWeight: '800',
    color: '#2E8B57',
    fontStyle: 'italic',
  },
  pulseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    height: 20,
  },
  pulseLine: {
    flex: 1,
    height: 2,
  },
  pulseSvg: {
    marginHorizontal: 2,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  titleText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1B3C18',
    textAlign: 'center',
    marginBottom: Spacing.one,
  },
  subtitleText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  phoneEditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    gap: 8,
  },
  phoneText: {
    fontSize: 18,
    fontWeight: '800',
  },
  editButton: {
    padding: 4,
  },
  mascotContainer: {
    width: '100%',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.three,
  },
  mascotImage: {
    width: 260,
    height: 180,
  },
  card: {
    width: '94%',
    borderRadius: 24,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.four,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
      web: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
      },
    }),
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#60646C',
    marginBottom: Spacing.three,
    textAlign: 'center',
  },
  otpInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: Spacing.one,
    marginBottom: Spacing.three,
    gap: 12,
  },
  otpInputBox: {
    flex: 1,
    height: 56,
    borderWidth: 1,
    borderColor: '#C0C4CC',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    color: '#1B3C18',
    ...Platform.select({
      web: {
        outlineStyle: 'none' as any,
      },
    }),
  },
  timerRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.three,
  },
  timerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#60646C',
  },
  timerCount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2E8B57',
  },
  resendText: {
    color: '#2E8B57',
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  verifyButton: {
    backgroundColor: '#1B3C18',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: Spacing.three,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  changeNumberLink: {
    padding: 4,
  },
  changeNumberText: {
    color: '#2E8B57',
    fontSize: 14,
    fontWeight: '700',
  },
});
