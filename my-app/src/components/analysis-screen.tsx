import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const trendData = [
  { label: 'N', value: 72, color: '#2E8B57' },
  { label: 'P', value: 58, color: '#4E9B67' },
  { label: 'K', value: 66, color: '#77B85B' },
  { label: 'pH', value: 48, color: '#D7B84A' },
];

export function AnalysisScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.headingRow}>
        <View>
          <Text style={styles.eyebrow}>FIELD INSIGHTS</Text>
          <Text style={styles.title}>Soil Analysis</Text>
          <Text style={styles.subtitle}>North Field  •  Latest scan: 16/07/2026</Text>
        </View>
        <TouchableOpacity style={styles.scanButton} activeOpacity={0.8}>
          <Text style={styles.scanButtonText}>↻  New scan</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Overall health</Text>
          <Text style={styles.summaryValue}>Good</Text>
          <Text style={styles.summaryHint}>Based on 8 readings</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Readings mapped</Text>
          <Text style={styles.summaryValue}>8</Text>
          <Text style={styles.summaryHint}>Across North Field</Text>
        </View>
      </View>

      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <View>
            <Text style={styles.panelTitle}>Nutrient balance</Text>
            <Text style={styles.panelSubtitle}>Current levels compared with ideal field range</Text>
          </View>
          <Text style={styles.period}>Current</Text>
        </View>
        <View style={styles.chart}>
          <View style={styles.targetLine} />
          {trendData.map((item) => (
            <View key={item.label} style={styles.barColumn}>
              <View style={styles.barTrack}>
                <View style={[styles.bar, { height: `${item.value}%`, backgroundColor: item.color }]} />
              </View>
              <Text style={styles.barValue}>{item.label === 'pH' ? '6.45' : item.label === 'N' ? '48.2' : item.label === 'P' ? '38.2' : '41.4'}</Text>
              <Text style={styles.barLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
        <View style={styles.legend}><View style={styles.legendMark} /><Text style={styles.legendText}>Ideal range threshold</Text></View>
      </View>

      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <View>
            <Text style={styles.panelTitle}>Field condition</Text>
            <Text style={styles.panelSubtitle}>What the latest readings tell us</Text>
          </View>
          <Text style={styles.zoneCount}>3 zones</Text>
        </View>
        <View style={styles.zoneRow}><View style={[styles.zoneDot, { backgroundColor: '#72B957' }]} /><View style={styles.zoneCopy}><Text style={styles.zoneTitle}>Most fertile</Text><Text style={styles.zoneDescription}>Strong nutrient availability in the east zone</Text></View><Text style={styles.zonePercent}>42%</Text></View>
        <View style={styles.zoneRow}><View style={[styles.zoneDot, { backgroundColor: '#F1CF49' }]} /><View style={styles.zoneCopy}><Text style={styles.zoneTitle}>Moderate fertility</Text><Text style={styles.zoneDescription}>Suitable for most recommended crops</Text></View><Text style={styles.zonePercent}>38%</Text></View>
        <View style={styles.zoneRow}><View style={[styles.zoneDot, { backgroundColor: '#E14B3D' }]} /><View style={styles.zoneCopy}><Text style={styles.zoneTitle}>Needs attention</Text><Text style={styles.zoneDescription}>Review potassium before the next crop</Text></View><Text style={styles.zonePercent}>20%</Text></View>
      </View>

      <View style={styles.alertPanel}>
        <Text style={styles.alertIcon}>!</Text>
        <View style={styles.alertCopy}><Text style={styles.alertTitle}>One reading needs attention</Text><Text style={styles.alertText}>Potassium is lower in the south-west zone. Check the recommendation tab for a precise fertilizer plan.</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { width: '100%', maxWidth: 760, alignSelf: 'center', paddingHorizontal: 16, paddingBottom: 120 },
  headingRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 },
  eyebrow: { color: '#2E8B57', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  title: { color: '#183329', fontSize: 28, fontWeight: '800', marginTop: 3 },
  subtitle: { color: '#687A70', fontSize: 11, marginTop: 4 },
  scanButton: { backgroundColor: '#194C2D', borderRadius: 18, paddingHorizontal: 13, paddingVertical: 9 },
  scanButtonText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  summaryRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  summaryCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#D8E4DA', padding: 13 },
  summaryLabel: { color: '#64766B', fontSize: 10, fontWeight: '700' },
  summaryValue: { color: '#194C2D', fontSize: 22, fontWeight: '800', marginTop: 4 },
  summaryHint: { color: '#829087', fontSize: 9, marginTop: 2 },
  panel: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#D8E4DA', padding: 14, marginBottom: 10 },
  panelHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 },
  panelTitle: { color: '#183329', fontSize: 14, fontWeight: '800' },
  panelSubtitle: { color: '#7A8980', fontSize: 10, marginTop: 3 },
  period: { color: '#2E8B57', fontSize: 10, fontWeight: '700', backgroundColor: '#EDF7EF', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
  chart: { height: 150, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', position: 'relative', borderBottomWidth: 1, borderBottomColor: '#DDE6DF' },
  targetLine: { position: 'absolute', left: 0, right: 0, bottom: '65%', borderTopWidth: 1, borderTopColor: '#B9D6BE', borderStyle: 'dashed' },
  barColumn: { height: '100%', alignItems: 'center', justifyContent: 'flex-end', width: '18%' },
  barTrack: { height: '82%', width: 26, justifyContent: 'flex-end', backgroundColor: '#F0F5F0', borderRadius: 8, overflow: 'hidden' },
  bar: { width: '100%', borderRadius: 8 },
  barValue: { color: '#264536', fontSize: 10, fontWeight: '800', marginTop: 6 },
  barLabel: { color: '#718178', fontSize: 10, marginTop: 3 },
  legend: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  legendMark: { width: 16, borderTopWidth: 1, borderTopColor: '#8DBA96', borderStyle: 'dashed', marginRight: 6 },
  legendText: { color: '#7A8980', fontSize: 9 },
  zoneCount: { color: '#2E8B57', fontSize: 10, fontWeight: '700' },
  zoneRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 9, borderTopWidth: 1, borderTopColor: '#EEF3EF' },
  zoneDot: { width: 10, height: 10, borderRadius: 5, marginRight: 9 },
  zoneCopy: { flex: 1 },
  zoneTitle: { color: '#294537', fontSize: 11, fontWeight: '800' },
  zoneDescription: { color: '#7A8980', fontSize: 9, marginTop: 2 },
  zonePercent: { color: '#294537', fontSize: 11, fontWeight: '800' },
  alertPanel: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#FFF8E8', borderRadius: 12, borderWidth: 1, borderColor: '#F0D88B', padding: 12 },
  alertIcon: { width: 19, height: 19, borderRadius: 10, backgroundColor: '#D8A91D', color: '#FFFFFF', textAlign: 'center', fontSize: 13, fontWeight: '800', marginRight: 9 },
  alertCopy: { flex: 1 },
  alertTitle: { color: '#624E16', fontSize: 11, fontWeight: '800' },
  alertText: { color: '#816D30', fontSize: 9, lineHeight: 13, marginTop: 3 },
});
