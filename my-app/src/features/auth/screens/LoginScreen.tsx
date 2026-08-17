import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, Platform, KeyboardAvoidingView, SafeAreaView,
  Modal, Alert,
} from 'react-native';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { FarmerMascot } from '@/components/brand/FarmerMascot';
import {
  GoogleIcon, PhoneIcon, EmailIcon, UserIcon, LockIcon,
  EyeIcon, EyeOffIcon, GlobeIcon, LeafIcon,
} from '@/components/brand/SvgIcons';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, MaxContentWidth } from '@/constants/theme';

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
    const phoneRegex = /^(\+?\d[\d\s-]{7,15})$/;
    if (phoneRegex.test(trimmedInput)) {
      onPhoneLoginRequested(trimmedInput);
    } else {
      onLogin();
    }
  };

  const handleSocialLogin = (type: string) => {
    if (type === 'Phone') {
      const trimmedInput = email.trim();
      const phoneRegex = /^(\+?\d[\d\s-]{7,15})$/;
      onPhoneLoginRequested(phoneRegex.test(trimmedInput) ? trimmedInput : '+91 1234567890');
    } else {
      onLogin();
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          {/* Language Selector */}
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.langSelector} onPress={() => setLangModalVisible(true)}>
              <GlobeIcon color="#60646C" />
              <Text style={styles.langText}>{selectedLanguage}</Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* Brand */}
          <View style={styles.brandWrapper}>
            <BrandLogo size="lg" />
          </View>

          {/* Welcome */}
          <View style={styles.welcomeContainer}>
            <Text style={[styles.welcomeHello, { color: theme.text }]}>Hello,</Text>
            <View style={styles.welcomeSubRow}>
              <Text style={[styles.welcomeSubtext, { color: theme.textSecondary }]}>Welcome to एग्रो Pulse</Text>
              <Text style={styles.welcomeLeaf}>🍃</Text>
            </View>
          </View>

          {/* Mascot */}
          <View style={styles.mascotWrapper}>
            <FarmerMascot />
          </View>

          {/* Card */}
          <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
            <View style={styles.cardHeader}>
              <LeafIcon color="#2E8B57" />
              <Text style={styles.cardTitle}>Login to continue</Text>
              <LeafIcon color="#2E8B57" />
            </View>

            <TouchableOpacity style={styles.googleButton} onPress={() => handleSocialLogin('Google')} activeOpacity={0.9}>
              <View style={styles.googleIconWrapper}><GoogleIcon /></View>
              <Text style={styles.googleButtonText}>Continue With Google</Text>
            </TouchableOpacity>

            <View style={styles.separatorRow}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>or</Text>
              <View style={styles.separatorLine} />
            </View>

            <View style={styles.alternativeLoginsRow}>
              <TouchableOpacity style={styles.altLoginButton} onPress={() => handleSocialLogin('Phone')} activeOpacity={0.8}>
                <PhoneIcon color="#1B3C18" />
                <Text style={styles.altLoginButtonText}>Login with Phone</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.altLoginButton} onPress={() => handleSocialLogin('Email')} activeOpacity={0.8}>
                <EmailIcon color="#1B3C18" />
                <Text style={styles.altLoginButtonText}>Login with Email</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.separatorRow}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>or</Text>
              <View style={styles.separatorLine} />
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <View style={styles.inputIconWrapper}><UserIcon color="#60646C" /></View>
                <View style={styles.verticalDivider} />
                <TextInput style={styles.textInput} placeholder="Email or Phone Number" placeholderTextColor="#B0B4BA" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputIconWrapper}><LockIcon color="#60646C" /></View>
                <View style={styles.verticalDivider} />
                <TextInput style={styles.textInput} placeholder="Password" placeholderTextColor="#B0B4BA" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} autoCapitalize="none" autoCorrect={false} />
                <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)} activeOpacity={0.7}>
                  {showPassword ? <EyeOffIcon color="#60646C" /> : <EyeIcon color="#60646C" />}
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Password recovery will be available soon.')} style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginButton} onPress={handleManualLogin} activeOpacity={0.9}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.registerBackLinkRow}>
              <Text style={styles.dontHaveText}>Don't have an account? </Text>
              <TouchableOpacity onPress={onRegisterRequested}>
                <Text style={styles.registerLinkText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Language Modal */}
      <Modal visible={langModalVisible} transparent animationType="fade" onRequestClose={() => setLangModalVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setLangModalVisible(false)}>
          <View style={[styles.modalContent, { backgroundColor: theme.backgroundSelected }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Select Language</Text>
            {languages.map((lang) => (
              <TouchableOpacity key={lang.code} style={styles.modalItem} onPress={() => { setSelectedLanguage(lang.code); setLangModalVisible(false); }}>
                <Text style={[styles.modalItemText, selectedLanguage === lang.code && styles.modalItemActiveText, { color: theme.text }]}>{lang.name}</Text>
                {selectedLanguage === lang.code && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: Spacing.four, alignItems: 'center', maxWidth: MaxContentWidth, width: '100%', alignSelf: 'center' },
  topBar: { width: '100%', flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: Spacing.three, paddingVertical: Spacing.two },
  langSelector: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E0E1E6', borderRadius: 20, paddingVertical: 4, paddingHorizontal: 12, backgroundColor: '#FFFFFF' },
  langText: { fontSize: 12, fontWeight: '700', color: '#333333', marginHorizontal: 6 },
  dropdownArrow: { fontSize: 8, color: '#60646C' },
  brandWrapper: { marginBottom: Spacing.two, width: '100%', alignItems: 'center' },
  welcomeContainer: { alignItems: 'center', marginBottom: Spacing.two },
  welcomeHello: { fontSize: 24, fontWeight: '800' },
  welcomeSubRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  welcomeSubtext: { fontSize: 16, fontWeight: '600' },
  welcomeLeaf: { fontSize: 18, marginLeft: 6 },
  mascotWrapper: { marginBottom: Spacing.three },
  card: { width: '94%', borderRadius: 24, paddingHorizontal: Spacing.three, paddingTop: Spacing.three, paddingBottom: Spacing.four, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.12, shadowRadius: 16 }, android: { elevation: 8 }, web: { shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 20 } }) },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.three, gap: 8 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#1B3C18' },
  googleButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1B3C18', borderRadius: 24, paddingVertical: 12, width: '100%', marginBottom: Spacing.two },
  googleIconWrapper: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 4, position: 'absolute', left: 14 },
  googleButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  separatorRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: Spacing.two, width: '100%' },
  separatorLine: { flex: 1, height: 1, backgroundColor: '#E0E1E6' },
  separatorText: { fontSize: 13, color: '#60646C', marginHorizontal: 12, fontWeight: '600' },
  alternativeLoginsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', gap: 8 },
  altLoginButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E0E1E6', borderRadius: 16, paddingVertical: 10, backgroundColor: '#FFFFFF', gap: 6 },
  altLoginButtonText: { color: '#1B3C18', fontSize: 12, fontWeight: '700' },
  formContainer: { width: '100%', gap: Spacing.two },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E0E1E6', borderRadius: 20, backgroundColor: '#FFFFFF', paddingHorizontal: 12, height: 46, width: '100%' },
  inputIconWrapper: { width: 24, alignItems: 'center', justifyContent: 'center' },
  verticalDivider: { width: 1, height: 18, backgroundColor: '#E0E1E6', marginHorizontal: 10 },
  textInput: { flex: 1, fontSize: 14, color: '#333333', height: '100%' },
  eyeButton: { padding: 6 },
  forgotPasswordContainer: { alignSelf: 'flex-end', marginTop: 2, marginBottom: Spacing.two },
  forgotPasswordText: { color: '#2E8B57', fontSize: 13, fontWeight: '700' },
  loginButton: { backgroundColor: '#1B3C18', borderRadius: 24, paddingVertical: 12, alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: Spacing.one },
  loginButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  registerBackLinkRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: Spacing.three },
  dontHaveText: { fontSize: 14, color: '#60646C', fontWeight: '600' },
  registerLinkText: { color: '#2E8B57', fontSize: 14, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', borderRadius: 20, padding: Spacing.three, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: Spacing.three },
  modalItem: { width: '100%', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  modalItemText: { fontSize: 15 },
  modalItemActiveText: { fontWeight: '700', color: '#2E8B57' },
  checkmark: { color: '#2E8B57', fontWeight: '800', fontSize: 16 },
});
