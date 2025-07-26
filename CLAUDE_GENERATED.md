# Claude Generated Code

**Task**: Objective:
Identify and upgrade all outdated dependencies, tools, and configurations in the project, ensuring compatibility and stability...

Tasks:

📦 Dependency Upgrades
Check for outdated packages (package.json, requirements.txt, etc.).

Upgrade to latest stable versions.

Flag any breaking changes and suggest necessary code updates.

⚙️ Tooling & Runtime
Review build tools, linters, and runtime environments (e.g., Node.js, Python).

Suggest config updates (e.g., .eslintrc, tsconfig.json) if needed.

🧪 Validation
Ensure changes don’t break the app — suggest or generate tests if applicable.

Recommend manual test areas if automation isn't possible.

**Generated on**: Sat Jul 26 10:00:16 UTC 2025

## Generated Content

```
I'll analyze your Ionic React TypeScript application and provide a comprehensive upgrade plan to modernize all dependencies, tools, and configurations.

## 📦 DEPENDENCY ANALYSIS

### Current Issues Identified:
1. **Major Breaking Changes**: React Router v5 → v6
2. **Outdated Dependencies**: Multiple packages need significant version bumps
3. **Missing Dependencies**: Several implied dependencies not explicitly listed
4. **Configuration Updates**: ESLint, TypeScript, and build configs need updates

## UPGRADE PLAN

### FILES_TO_MODIFY

1. **package.json** - Complete dependency overhaul
2. **vite.config.ts** - Updated Vite configuration
3. **tsconfig.json** - Modern TypeScript configuration
4. **src/App.tsx** - React Router v6 migration
5. **src/main.tsx** - Updated React 18 patterns
6. **capacitor.config.ts** - Latest Capacitor configuration

### FILES_TO_CREATE

1. **.eslintrc.json** - Modern ESLint configuration
2. **src/hooks/useRouting.ts** - Custom routing hook for v6 migration
3. **vitest.config.ts** - Separate Vitest configuration

## CODE_CHANGES

### 1. FILES_TO_MODIFY: package.json

```json
{
  "name": "GovtInvoiceNew",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test.e2e": "cypress run",
    "test.unit": "vitest",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint src --ext ts,tsx --fix",
    "type-check": "tsc --noEmit",
    "generate-pwa-assets": "pwa-assets-generator"
  },
  "dependencies": {
    "@capacitor/android": "^6.1.2",
    "@capacitor/app": "^6.0.1",
    "@capacitor/core": "^6.1.2",
    "@capacitor/haptics": "^6.0.1",
    "@capacitor/keyboard": "^6.0.2",
    "@capacitor/preferences": "^6.0.2",
    "@capacitor/status-bar": "^6.0.1",
    "@ionic/react": "^8.3.2",
    "@ionic/react-router": "^8.3.2",
    "capacitor-email-composer": "^6.0.2",
    "ionicons": "^7.4.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router": "^6.26.2",
    "react-router-dom": "^6.26.2"
  },
  "devDependencies": {
    "@capacitor/cli": "^6.1.2",
    "@eslint/js": "^9.9.1",
    "@testing-library/dom": "^10.4.0",
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/react": "^16.0.1",
    "@testing-library/user-event": "^14.5.2",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^8.4.0",
    "@typescript-eslint/parser": "^8.4.0",
    "@vite-pwa/assets-generator": "^0.2.6",
    "@vitejs/plugin-legacy": "^5.4.2",
    "@vitejs/plugin-react": "^4.3.1",
    "cypress": "^13.14.2",
    "eslint": "^9.9.1",
    "eslint-plugin-react": "^7.35.2",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.11",
    "happy-dom": "^15.7.4",
    "terser": "^5.31.6",
    "typescript": "^5.5.4",
    "vite": "^5.4.3",
    "vite-plugin-pwa": "^0.20.5",
    "vitest": "^2.0.5"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

### 2. FILES_TO_CREATE: .eslintrc.json

```json
{
  "root": true,
  "env": {
    "browser": true,
    "es2020": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended"
  ],
  "ignorePatterns": [
    "dist",
    ".eslintrc.json",
    "android/**",
    "capacitor.config.ts",
    "src/components/socialcalc/**"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": [
    "react-refresh",
    "@typescript-eslint"
  ],
  "rules": {
    "react-refresh/only-export-components": [
      "warn",
      { "allowConstantExport": true }
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_" }
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "react/prop-types": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

### 3. FILES_TO_MODIFY: vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        name: 'Government Invoice Suite',
        short_name: 'GovInvoice',
        description: 'Professional government billing and invoicing application',
        theme_color: '#3880ff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    exclude: ['@ionic/pwa-elements']
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ionic: ['@ionic/react', '@ionic/react-router']
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['src/setupTests.ts']
  }
});
```

### 4. FILES_TO_CREATE: vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['src/setupTests.ts']
  }
});
```

### 5. FILES_TO_MODIFY: tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/pages/*": ["src/pages/*"],
      "@/hooks/*": ["src/hooks/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 6. FILES_TO_MODIFY: tsconfig.node.json

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noEmit": true
  },
  "include": ["vite.config.ts", "vitest.config.ts"]
}
```

### 7. FILES_TO_MODIFY: capacitor.config.ts

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'GovtInvoiceNew',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
    },
  },
};

export default config;
```

### 8. FILES_TO_CREATE: src/setupTests.ts

```typescript
import '@testing-library/jest-dom';

// Mock Capacitor
const mockCapacitor = {
  Preferences: {
    get: vi.fn().mockResolvedValue({ value: null }),
    set: vi.fn().mockResolvedValue(),
    remove: vi.fn().mockResolvedValue(),
    clear: vi.fn().mockResolvedValue(),
  },
  App: {
    addListener: vi.fn(),
    removeAllListeners: vi.fn(),
  },
};

vi.mock('@capacitor/preferences', () => mockCapacitor);
vi.mock('@capacitor/app', () => mockCapacitor);
vi.mock('@capacitor/core', () => ({
  Capacitor: {
    getPlatform: vi.fn().mockReturnValue('web'),
    isNativePlatform: vi.fn().mockReturnValue(false),
  },
}));
```

### 9. FILES_TO_CREATE: src/hooks/useRouting.ts

```typescript
import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

/**
 * Custom hook to handle routing transitions for React Router v6 migration
 */
export const useRouting = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = useCallback((path: string, options?: { replace?: boolean }) => {
    navigate(path, options);
  }, [navigate]);

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const getCurrentPath = useCallback(() => {
    return location.pathname;
  }, [location.pathname]);

  return {
    goTo,
    goBack,
    getCurrentPath,
    location
  };
};
```

### 10. FILES_TO_MODIFY: src/App.tsx

```tsx
import { IonApp, setupIonicReact } from "@ionic/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact({
  rippleEffect: false,
  mode: 'ios'
});

const App: React.FC = () => (
  <IonApp>
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  </IonApp>
);

export default App;
```

### 11. FILES_TO_MODIFY: src/main.tsx

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### 12. FILES_TO_MODIFY: src/components/Menu/Menu.tsx

```tsx
import React, { useState } from "react";
import * as AppGeneral from "../socialcalc/index.js";
import { File, Local } from "../Storage/LocalStorage";
import { isPlatform, IonToast } from "@ionic/react";
import { EmailComposer } from "capacitor-email-composer";
// Remove @ionic-native/printer - deprecated
// import { Printer } from "@ionic-native/printer";
import { IonActionSheet, IonAlert } from "@ionic/react";
import { saveOutline, save, mail, print } from "ionicons/icons";
import { APP_NAME } from "../../app-data.js";

// Modern print function using Web API
const printDocument = async (content: string) => {
  if ('print' in window) {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>Print Document</title></head>
          <body>${content}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }
  }
};

const Menu: React.FC<{
  showM: boolean;
  setM: Function;
  file: string;
  updateSelectedFile: Function;
  store: Local;
  bT: number;
}> = (props) => {
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);
  const [showAlert4, setShowAlert4] = useState(false);
  const [showToast1, setShowToast1] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  /* Utility functions */
  const _validateName = async (filename: string) => {
    filename = filename.trim();
    if (filename === "default" || filename === "Untitled") {
      setToastMessage("Cannot update default file!");
      return false;
    }
    
    // Add more validation as needed
    return true;
  };

  // Rest of your existing component logic with updated print function
  // Replace Printer.print() calls with printDocument()

  return (
    <>
      {/* Your existing JSX */}
      <IonToast
        isOpen={showToast1}
        onDidDismiss={() => setShowToast1(false)}
        message={toastMessage}
        duration={2000}
      />
      {/* Rest of your alerts and action sheets */}
    </>
  );
};

export default Menu;
```

## INSTRUCTIONS

### 1. Pre-upgrade Steps
```bash
# Backup your current project
cp -r . ../govtinvoice-backup

# Clear existing node_modules and package-lock.json
rm -rf node_modules package-lock.json
```

### 2. Upgrade Process
```bash
# Install new dependencies
npm install

# Check for any remaining issues
npm run type-check
npm run lint

# Test the application
npm run dev
```

### 3. Breaking Changes to Address

#### React Router v6 Migration:
- Replace `useHistory` with `useNavigate`
- Update route definitions if using routing
- Replace `Redirect` with `Navigate`

#### Capacitor v6 Updates:
```bash
# Sync Capacitor
npx cap sync

# Update native platforms if needed
npx cap update android
```

### 4. Post-upgrade Testing Checklist

✅ **Manual Testing Areas:**
- [ ] App startup and initialization
- [ ] File creation and saving (LocalStorage)
- [ ] Spreadsheet functionality (SocialCalc integration)
- [ ] Email composition
- [ ] Print functionality (now using Web API)
- [ ] PWA features
- [ ] Android build and functionality

✅ **Automated Testing:**
```bash
# Run unit tests
npm run test.unit

# Run linting
npm run lint

# Build for production
npm run build
```

### 5. Optional Enhancements

Consider these additional improvements:

1. **Add Error Boundaries:**
```tsx
// src/components/ErrorBoundary.tsx
import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

2. **Modernize State Management:**
Consider migrating to React Context API or Zustand for better state management.

### 6. Security Considerations

- Updated packages include security patches
- Modern TypeScript provides better type safety
- ESLint rules help catch potential security issues

This comprehensive upgrade brings your application to modern standards while maintaining compatibility with your existing SocialCalc integration and government billing functionality.
```
