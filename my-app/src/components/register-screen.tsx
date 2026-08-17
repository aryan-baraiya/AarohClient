import React, { useState } from 'react';
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
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';
import { useTheme } from '@/hooks/use-theme';
import { Colors, Spacing, MaxContentWidth } from '@/constants/theme';

// --- Custom SVGs ---

const UserIcon = ({ color = '#60646C' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <Circle cx="12" cy="7" r="4" />
  </Svg>
);

const EmailIcon = ({ color = '#60646C' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <Path d="m22 6-10 7L2 6" />
  </Svg>
);

const LockIcon = ({ color = '#60646C' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </Svg>
);

const EyeIcon = ({ color = '#60646C' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <Circle cx="12" cy="12" r="3" />
  </Svg>
);

const EyeOffIcon = ({ color = '#60646C' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <Line x1="1" y1="1" x2="23" y2="23" />
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

// --- Component Props ---
interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onBackToLogin: () => void;
}

export function RegisterScreen({ onRegisterSuccess, onBackToLogin }: RegisterScreenProps) {
  const theme = useTheme();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Dynamic password strength meter calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: '#DDD' };
    if (pass.length < 6) return { score: 1, label: 'Weak', color: '#EA4335' };
    
    const hasNumbers = /\d/.test(pass);
    const hasUppercase = /[A-Z]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    
    // Strong if length >= 8, has numbers, and uppercase or special chars
    if (pass.length >= 8 && hasNumbers && (hasUppercase || hasSpecial)) {
      return { score: 3, label: 'Strong', color: '#34A853' };
    }
    return { score: 2, label: 'Medium', color: '#FBBC05' };
  };

  const strength = getPasswordStrength(password);

  const handleCreateAccount = () => {
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Missing Fields', 'Please fill in all form fields to register.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'The passwords entered do not match.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long.');
      return;
    }
    if (!agreeToTerms) {
      Alert.alert('Terms Agreement', 'You must agree to the Terms & Conditions and Privacy Policy to continue.');
      return;
    }

    Alert.alert(
      'Account Created',
      'Your account was successfully registered!',
      [{ text: 'OK', onPress: onRegisterSuccess }]
    );
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
          {/* Top spacer */}
          <View style={styles.topSpacer} />

          {/* Branding Logo Section */}
          <View style={styles.logoContainer}>
            <View style={styles.brandTitleRow}>
              <Text style={styles.brandAgro}>एग्रो</Text>
              <Text style={styles.brandPulse}>Pulse</Text>
            </View>
            <PulseWave color="#2E8B57" />
          </View>

          {/* Welcome/Register Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Create your account</Text>
            <Text style={[styles.subtitleText, { color: theme.textSecondary }]}>
              Let's get started 🍃
            </Text>
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

          {/* Register Option Card */}
          <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
            
            {/* Input Form */}
            <View style={styles.formContainer}>
              {/* Full Name Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIconWrapper}>
                  <UserIcon color="#60646C" />
                </View>
                <View style={styles.verticalDivider} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Full Name"
                  placeholderTextColor="#B0B4BA"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>

              {/* Email Address Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIconWrapper}>
                  <EmailIcon color="#60646C" />
                </View>
                <View style={styles.verticalDivider} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Email Address"
                  placeholderTextColor="#B0B4BA"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIconWrapper}>
                  <LockIcon color="#60646C" />
                </View>
                <View style={styles.verticalDivider} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Password"
                  placeholderTextColor="#B0B4BA"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
                  {showPassword ? <EyeOffIcon color="#60646C" /> : <EyeIcon color="#60646C" />}
                </TouchableOpacity>
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIconWrapper}>
                  <LockIcon color="#60646C" />
                </View>
                <View style={styles.verticalDivider} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Confirm Password"
                  placeholderTextColor="#B0B4BA"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  activeOpacity={0.7}
                >
                  {showConfirmPassword ? <EyeOffIcon color="#60646C" /> : <EyeIcon color="#60646C" />}
                </TouchableOpacity>
              </View>

              {/* Dynamic Password Strength Indicator Bars */}
              <View style={styles.strengthMeterRow}>
                {/* Weak indicator */}
                <View style={styles.strengthColumn}>
                  <View
                    style={[
                      styles.strengthBar,
                      { backgroundColor: strength.score >= 1 ? '#EA4335' : '#E0E1E6' },
                    ]}
                  />
                  <Text
                    style={[
                      styles.strengthLabel,
                      { color: strength.score === 1 ? '#EA4335' : '#B0B4BA' },
                    ]}
                  >
                    Weak
                  </Text>
                </View>

                {/* Medium indicator */}
                <View style={styles.strengthColumn}>
                  <View
                    style={[
                      styles.strengthBar,
                      { backgroundColor: strength.score >= 2 ? '#FBBC05' : '#E0E1E6' },
                    ]}
                  />
                  <Text
                    style={[
                      styles.strengthLabel,
                      { color: strength.score === 2 ? '#FBBC05' : '#B0B4BA' },
                    ]}
                  >
                    Medium
                  </Text>
                </View>

                {/* Strong indicator */}
                <View style={styles.strengthColumn}>
                  <View
                    style={[
                      styles.strengthBar,
                      { backgroundColor: strength.score >= 3 ? '#34A853' : '#E0E1E6' },
                    ]}
                  />
                  <Text
                    style={[
                      styles.strengthLabel,
                      { color: strength.score === 3 ? '#34A853' : '#B0B4BA' },
                    ]}
                  >
                    Strong
                  </Text>
                </View>
              </View>

              {/* Terms & Conditions Checkbox Row */}
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    agreeToTerms && styles.checkboxChecked,
                  ]}
                  onPress={() => setAgreeToTerms(!agreeToTerms)}
                  activeOpacity={0.8}
                >
                  {agreeToTerms && (
                    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={4}>
                      <Path d="M20 6L9 17L4 12" />
                    </Svg>
                  )}
                </TouchableOpacity>
                <Text style={styles.checkboxText}>
                  I agree to the <Text style={styles.greenText}>Terms & Conditions</Text> and{' '}
                  <Text style={styles.greenText}>Privacy Policy</Text>
                </Text>
              </View>

              {/* Create Account Submit Button */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleCreateAccount}
                activeOpacity={0.9}
              >
                <Text style={styles.submitButtonText}>Create Account</Text>
              </TouchableOpacity>
            </View>

            {/* Back to Login link */}
            <View style={styles.loginBackLinkRow}>
              <Text style={styles.alreadyHaveText}>Already have an account? </Text>
              <TouchableOpacity onPress={onBackToLogin}>
                <Text style={styles.loginLinkText}>Login</Text>
              </TouchableOpacity>
            </View>
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
  },
  titleText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1B3C18',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
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
  formContainer: {
    width: '100%',
    gap: Spacing.two,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E1E6',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    height: 46,
    width: '100%',
  },
  inputIconWrapper: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalDivider: {
    width: 1,
    height: 18,
    backgroundColor: '#E0E1E6',
    marginHorizontal: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
    height: '100%',
  },
  eyeButton: {
    padding: 6,
  },
  strengthMeterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 4,
    gap: 8,
  },
  strengthColumn: {
    flex: 1,
    alignItems: 'center',
  },
  strengthBar: {
    height: 4,
    width: '100%',
    borderRadius: 2,
    marginBottom: 4,
  },
  strengthLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.one,
    paddingHorizontal: 4,
    width: '100%',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: '#C0C4CC',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#1B3C18',
    borderColor: '#1B3C18',
  },
  checkboxText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#60646C',
    lineHeight: 16,
  },
  greenText: {
    color: '#2E8B57',
    fontWeight: '700',
  },
  submitButton: {
    backgroundColor: '#1B3C18',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: Spacing.two,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  loginBackLinkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.three,
  },
  alreadyHaveText: {
    fontSize: 14,
    color: '#60646C',
    fontWeight: '600',
  },
  loginLinkText: {
    color: '#2E8B57',
    fontSize: 14,
    fontWeight: '700',
  },
});
