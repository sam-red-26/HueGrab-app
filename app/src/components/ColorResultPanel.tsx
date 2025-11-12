import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { ColorResult } from '../types/color';
import { useClipboard } from '../hooks/useClipboard';
import { useShare } from '../hooks/useShare';
import { useHaptics } from '../hooks/useHaptics';

interface ColorResultPanelProps {
  colorResult: ColorResult;
  onDismiss: () => void;
}

export function ColorResultPanel({ colorResult, onDismiss }: ColorResultPanelProps) {
  const { copyToClipboard, copied } = useClipboard();
  const { shareColor, isSharing } = useShare();
  const { triggerLight, triggerSuccess } = useHaptics();

  const handleCopyHex = async () => {
    triggerLight();
    await copyToClipboard(colorResult.hex);
    triggerSuccess();
  };

  const handleCopyRgb = async () => {
    triggerLight();
    await copyToClipboard(colorResult.rgb);
    triggerSuccess();
  };

  const handleShare = async () => {
    triggerLight();
    await shareColor(colorResult.hex, colorResult.rgb);
  };

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="slide"
      onRequestClose={onDismiss}
    >
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={onDismiss}>
        {/* Panel */}
        <Pressable style={styles.panel} onPress={(e) => e.stopPropagation()}>
          {/* Color Preview */}
          <View style={[styles.colorPreview, { backgroundColor: colorResult.hex }]} />

          {/* Color Codes */}
          <View style={styles.codesContainer}>
            <View style={styles.codeRow}>
              <Text style={styles.codeLabel}>HEX</Text>
              <Text style={styles.codeValue}>{colorResult.hex}</Text>
              <Pressable style={styles.copyButton} onPress={handleCopyHex}>
                <Text style={styles.buttonText}>
                  {copied ? '✓ Copied' : 'Copy'}
                </Text>
              </Pressable>
            </View>

            <View style={styles.codeRow}>
              <Text style={styles.codeLabel}>RGB</Text>
              <Text style={styles.codeValue}>{colorResult.rgb}</Text>
              <Pressable style={styles.copyButton} onPress={handleCopyRgb}>
                <Text style={styles.buttonText}>
                  {copied ? '✓ Copied' : 'Copy'}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <Pressable 
              style={[styles.actionButton, styles.shareButton]} 
              onPress={handleShare}
              disabled={isSharing}
            >
              <Text style={styles.actionButtonText}>
                {isSharing ? 'Sharing...' : 'Share'}
              </Text>
            </Pressable>

            <Pressable 
              style={[styles.actionButton, styles.doneButton]} 
              onPress={onDismiss}
            >
              <Text style={styles.actionButtonText}>Done</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  panel: {
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
  },
  colorPreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  codesContainer: {
    marginBottom: 24,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  codeLabel: {
    color: '#8E8E93',
    fontSize: 14,
    fontWeight: '600',
    width: 50,
  },
  codeValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    fontFamily: 'monospace',
  },
  copyButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  shareButton: {
    backgroundColor: '#007AFF',
  },
  doneButton: {
    backgroundColor: '#2C2C2E',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
