import { IonApp, setupIonicReact } from "@ionic/react";
import Home from "./pages/Home";
import { useEffect } from 'react';
import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';

/* CSS imports */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    const showAd = async () => {
      await AdMob.initialize({
        requestTrackingAuthorization: true,
        initializeForTesting: false,
      });

      await AdMob.showBanner({
        adId: 'ca-app-pub-6312756313711545/7197167387', 
        adSize: BannerAdSize.ADAPTIVE_BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: false,
      });
    };

    showAd();
  }, []);

  return (
    <IonApp>
      <Home />
    </IonApp>
  );
};

export default App;
