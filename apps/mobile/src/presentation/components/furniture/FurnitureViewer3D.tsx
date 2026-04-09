/**
 * FurnitureViewer3D — WebView wrapper for Three.js configurator
 * Communicates with Three.js via postMessage bridge
 */

import React, { useRef, useCallback, useEffect, useImperativeHandle, forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { FurnitureConfig } from '../../../domain/entities';
import { colors } from '../../../shared/theme';

interface FurnitureViewer3DProps {
  config: FurnitureConfig;
  onReady?: () => void;
}

export interface FurnitureViewer3DRef {
  requestSnapshot: () => Promise<string>;
}

export const FurnitureViewer3D = forwardRef<FurnitureViewer3DRef, FurnitureViewer3DProps>(
  ({ config, onReady }, ref) => {
    const webViewRef = useRef<WebView>(null);
    const snapshotResolveRef = useRef<((dataUrl: string) => void) | null>(null);

    const sendConfig = useCallback(() => {
      if (webViewRef.current) {
        webViewRef.current.postMessage(
          JSON.stringify({ type: 'UPDATE_CONFIG', payload: config })
        );
      }
    }, [config]);

    useEffect(() => {
      sendConfig();
    }, [sendConfig]);

    useImperativeHandle(ref, () => ({
      requestSnapshot: () => {
        return new Promise<string>((resolve, reject) => {
          snapshotResolveRef.current = resolve;
          webViewRef.current?.postMessage(JSON.stringify({ type: 'SNAPSHOT' }));
          setTimeout(() => {
            if (snapshotResolveRef.current) {
              snapshotResolveRef.current = null;
              reject(new Error('Snapshot timeout'));
            }
          }, 5000);
        });
      },
    }));

    const handleMessage = useCallback(
      (event: WebViewMessageEvent) => {
        try {
          const data = JSON.parse(event.nativeEvent.data);
          if (data.type === 'READY') {
            sendConfig();
            onReady?.();
          } else if (data.type === 'SNAPSHOT_RESULT' && snapshotResolveRef.current) {
            snapshotResolveRef.current(data.data);
            snapshotResolveRef.current = null;
          }
        } catch {
          // ignore
        }
      },
      [sendConfig, onReady]
    );

    return (
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          source={require('../../../shared/assets/viewer3d.html')}
          style={styles.webview}
          onMessage={handleMessage}
          javaScriptEnabled
          domStorageEnabled
          allowFileAccess
          originWhitelist={['*']}
          scrollEnabled={false}
          bounces={false}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          androidLayerType="hardware"
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[200],
    borderRadius: 16,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
