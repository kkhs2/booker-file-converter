// hooks/useScanner.js
import {useRef, useEffect} from 'preact/hooks';

const CDN_URL = 'https://cdn.jsdelivr.net/npm/scandit-sdk@5.x';
const ENGINE_LOCATION = 'https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build/';

function loadScandit() {
  if (window.ScanditSDK) return Promise.resolve();
  return new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = CDN_URL;
    s.onload = () => res();
    s.onerror = () => rej(new Error('Could not load ScanditSDK'));
    document.head.appendChild(s);
  });
}

export default function useScanner({licenseKey, onScanSuccess}) {
  const pickerRef = useRef(null);

  // Try to get from API if not provided (API not implemented at present)
  //if (!licenseKey) {
  //  getLicenseKey();
  //}
  
  useEffect(() => {
    return () => {
      if (pickerRef.current) {
        pickerRef.current.destroy();
        pickerRef.current = null;
      }
    };
  }, []);

  async function getLicenseKey() {
    fetch('/api/2.0/scanner/getlicence', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }

      licenseKey = response.json();
    });
  }

  async function startScan() {
    try {
      await loadScandit();

      await window.ScanditSDK.configure(licenseKey, {
        engineLocation: ENGINE_LOCATION,
      });

      const settings = new window.ScanditSDK.ScanSettings({
        enabledSymbologies: ["ean8", "ean13", "upca", "upce", "code128", "code39", "itf"],
        // ignore duplicate scans for this long
        codeDuplicateFilter: 7000,
      });

      // Ensure only creating the picker once
      if (!pickerRef.current) {
        pickerRef.current = await window.ScanditSDK.BarcodePicker.create(
          document.getElementById('barcode-picker'),
          {
            playSoundOnScan: true,
            vibrateOnScan: true,
            torch: true,
            scanSettings: settings,
          }
        );

        // Hook scan events
        pickerRef.current.on('scan', (scanResult) => {
          const code = scanResult.barcodes[0]?.data;
          if (code) onScanSuccess(code);
        });
      }

      // Start streaming & scanning
      await pickerRef.current.resumeScanning();
    } catch (err) {
      console.error('Scandit scan failed to start:', err);
    }
  }

  async function stopScan() {
    if (pickerRef.current) {
      await pickerRef.current.pauseScanning();
    }
  }

  return {startScan, stopScan};
}
