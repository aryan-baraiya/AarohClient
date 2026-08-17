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
  Modal,
  Alert,
} from 'react-native';
import { Image } from 'expo-image';
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';
import { useTheme } from '@/hooks/use-theme';
import { Colors, Spacing, MaxContentWidth } from '@/constants/theme';

// --- Custom SVGs for premium look without file dependencies ---

const GoogleIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24">
    <Path
      fill="#EA4335"
      d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.68 1.54 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.89 3.02C6.2 7.7 8.89 5.04 12 5.04z"
    />
    <Path
      fill="#4285F4"
      d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.42 3.57v2.97h3.89c2.28-2.1 3.56-5.19 3.56-8.69z"
    />
    <Path
      fill="#FBBC05"
      d="M5.28 14.78a7.18 7.18 0 0 1 0-4.56L1.39 7.2a11.96 11.96 0 0 0 0 9.6l3.89-3.02z"
    />
    <Path
      fill="#34A853"
      d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.89-2.97c-1.09.73-2.48 1.17-4.07 1.17-3.11 0-5.8-2.66-6.72-5.54L1.39 15.8C3.37 19.69 7.35 22.33 12 23z"
    />
  </Svg>
);

const PhoneIcon = ({ color = '#1B3C18' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Svg>
);

const EmailIcon = ({ color = '#1B3C18' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <Path d="m22 6-10 7L2 6" />
  </Svg>
);

const UserIcon = ({ color = '#60646C' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <Circle cx="12" cy="7" r="4" />
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

const GlobeIcon = ({ color = '#60646C' }: { color?: string }) => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Line x1="2" y1="12" x2="22" y2="12" />
    <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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

// --- Component Props ---
interface LoginScreenProps {
  onLogin: () => void;
  onPhoneLoginRequested: (phone: string) => void;
  onRegisterRequested: () => void;
}

export function LoginScreen({ onLogin, onPhoneLoginRequested, onRegisterRequested }: LoginScreenProps) {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [langModalVisible, setLangModalVisible] = useState(false);

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'HI', name: 'हिन्दी (Hindi)' },
    { code: 'PB', name: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'GU', name: 'ગુજરાતી (Gujarati)' },
  ];

  const handleManualLogin = () => {
    const trimmedInput = email.trim();
    if (!trimmedInput || !password.trim()) {
      Alert.alert('Missing Fields', 'Please enter your email/phone and password to proceed.');
      return;
    }
    
    // Check if input looks like a phone number
    const phoneRegex = /^(\+?\d[\d\s-]{7,15})$/;
    if (phoneRegex.test(trimmedInput)) {
      onPhoneLoginRequested(trimmedInput);
    } else {
      // Simulate direct email login success
      onLogin();
    }
  };

  const handleSocialLogin = (type: string) => {
    if (type === 'Phone') {
      const trimmedInput = email.trim();
      const phoneRegex = /^(\+?\d[\d\s-]{7,15})$/;
      if (phoneRegex.test(trimmedInput)) {
        onPhoneLoginRequested(trimmedInput);
      } else {
        onPhoneLoginRequested('+91 1234567890');
      }
    } else {
      // Simulate login success
      onLogin();
    }
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
          {/* Top Bar with Language Selector */}
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.langSelector}
              onPress={() => setLangModalVisible(true)}
            >
              <GlobeIcon color="#60646C" />
              <Text style={styles.langText}>{selectedLanguage}</Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* Branding Logo Section */}
          <View style={styles.logoContainer}>
            <View style={styles.brandTitleRow}>
              <Text style={styles.brandAgro}>एग्रो</Text>
              <Text style={styles.brandPulse}>Pulse</Text>
            </View>
            <PulseWave color="#2E8B57" />
          </View>

          {/* Welcome Text */}
          <View style={styles.welcomeContainer}>
            <Text style={[styles.welcomeHello, { color: theme.text }]}>Hello,</Text>
            <View style={styles.welcomeSubRow}>
              <Text style={[styles.welcomeSubtext, { color: theme.textSecondary }]}>
                Welcome to एग्रो Pulse
              </Text>
              <Text style={styles.welcomeLeaf}>🍃</Text>
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

          {/* Login Option Card */}
          <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <LeafIcon color="#2E8B57" />
              <Text style={styles.cardTitle}>Login to continue</Text>
              <LeafIcon color="#2E8B57" />
            </View>

            {/* Google Login Button */}
            <TouchableOpacity
              style={styles.googleButton}
              onPress={() => handleSocialLogin('Google')}
              activeOpacity={0.9}
            >
              <View style={styles.googleIconWrapper}>
                <GoogleIcon />
              </View>
              <Text style={styles.googleButtonText}>Continue With Google</Text>
            </TouchableOpacity>

            {/* OR Separator */}
            <View style={styles.separatorRow}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>or</Text>
              <View style={styles.separatorLine} />
            </View>

            {/* Phone & Email side-by-side buttons */}
            <View style={styles.alternativeLoginsRow}>
              <TouchableOpacity
                style={styles.altLoginButton}
                onPress={() => handleSocialLogin('Phone')}
                activeOpacity={0.8}
              >
                <PhoneIcon color="#1B3C18" />
                <Text style={styles.altLoginButtonText}>Login with Phone</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.altLoginButton}
                onPress={() => handleSocialLogin('Email')}
                activeOpacity={0.8}
              >
                <EmailIcon color="#1B3C18" />
                <Text style={styles.altLoginButtonText}>Login with Email</Text>
              </TouchableOpacity>
            </View>

            {/* OR Separator */}
            <View style={styles.separatorRow}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>or</Text>
              <View style={styles.separatorLine} />
            </View>

            {/* Manual Form Inputs */}
            <View style={styles.formContainer}>
              {/* Email / Phone Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIconWrapper}>
                  <UserIcon color="#60646C" />
                </View>
                <View style={styles.verticalDivider} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Email or Phone Number"
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

              {/* Forgot Password */}
              <TouchableOpacity
                onPress={() => Alert.alert('Forgot Password', 'Password recovery will be available soon.')}
                style={styles.forgotPasswordContainer}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Submit Login Button */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleManualLogin}
                activeOpacity={0.9}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>

            {/* Link to Registration Screen */}
            <View style={styles.registerBackLinkRow}>
              <Text style={styles.dontHaveText}>Don't have an account? </Text>
              <TouchableOpacity onPress={onRegisterRequested}>
                <Text style={styles.registerLinkText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Language Selector Modal */}
      <Modal
        visible={langModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setLangModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setLangModalVisible(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: theme.backgroundSelected }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Select Language</Text>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={styles.modalItem}
                onPress={() => {
                  setSelectedLanguage(lang.code);
                  setLangModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.modalItemText,
                    selectedLanguage === lang.code && styles.modalItemActiveText,
                    { color: theme.text },
                  ]}
                >
                  {lang.name}
                </Text>
                {selectedLanguage === lang.code && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
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
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  langSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E1E6',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  langText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333333',
    marginHorizontal: 6,
  },
  dropdownArrow: {
    fontSize: 8,
    color: '#60646C',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: Spacing.one,
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
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  welcomeHello: {
    fontSize: 24,
    fontWeight: '800',
  },
  welcomeSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  welcomeSubtext: {
    fontSize: 16,
    fontWeight: '600',
  },
  welcomeLeaf: {
    fontSize: 18,
    marginLeft: 6,
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
    paddingTop: Spacing.three,
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.three,
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B3C18',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B3C18',
    borderRadius: 24,
    paddingVertical: 12,
    width: '100%',
    marginBottom: Spacing.two,
  },
  googleIconWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 4,
    position: 'absolute',
    left: 14,
  },
  googleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.two,
    width: '100%',
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E1E6',
  },
  separatorText: {
    fontSize: 13,
    color: '#60646C',
    marginHorizontal: 12,
    fontWeight: '600',
  },
  alternativeLoginsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  },
  altLoginButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E1E6',
    borderRadius: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    gap: 6,
  },
  altLoginButtonText: {
    color: '#1B3C18',
    fontSize: 12,
    fontWeight: '700',
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
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 2,
    marginBottom: Spacing.two,
  },
  forgotPasswordText: {
    color: '#2E8B57',
    fontSize: 13,
    fontWeight: '700',
  },
  loginButton: {
    backgroundColor: '#1B3C18',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: Spacing.one,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 20,
    padding: Spacing.three,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: Spacing.three,
  },
  modalItem: {
    width: '100%',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalItemText: {
    fontSize: 15,
  },
  modalItemActiveText: {
    fontWeight: '700',
    color: '#2E8B57',
  },
  checkmark: {
    color: '#2E8B57',
    fontWeight: '800',
    fontSize: 16,
  },
  registerBackLinkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.three,
  },
  dontHaveText: {
    fontSize: 14,
    color: '#60646C',
    fontWeight: '600',
  },
  registerLinkText: {
    color: '#2E8B57',
    fontSize: 14,
    fontWeight: '700',
  },
});
