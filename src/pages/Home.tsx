// src/pages/Home.tsx

import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonPage,
  IonPopover,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { menu, settings } from "ionicons/icons";
import { APP_NAME, DATA } from "../app-data";
import * as AppGeneral from "../components/socialcalc/index.js";
import { useEffect, useState } from "react";
import { Local } from "../components/Storage/LocalStorage";
import Menu from "../components/Menu/Menu";
import Files from "../components/Files/Files";
import NewFile from "../components/NewFile/NewFile";

// ← NEW: import the hook
import {
  useInAppPurchase,
  InAppItem,
} from "../services/inAppPurchaseService";

import "./Home.css";

const Home: React.FC = () => {
  // your existing state/hooks
  const [showMenu, setShowMenu] = useState(false);
  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({ open: false, event: undefined });
  const [selectedFile, updateSelectedFile] = useState("default");
  const [billType, updateBillType] = useState(1);
  const [device] = useState("default");
  const store = new Local();

  // ← NEW: pull in purchases
  const {
    items: purchaseItems,
    error: purchaseError,
    lastPurchase,
    purchase,
    restore,
  } = useInAppPurchase();

  const closeMenu = () => setShowMenu(false);
  const activateFooter = (footer: number) => {
    AppGeneral.activateFooterButton(footer);
  };

  useEffect(() => {
    const data = DATA["home"][device]["msc"];
    AppGeneral.initializeApp(JSON.stringify(data));
  }, [device]);

  useEffect(() => {
    activateFooter(billType);
  }, [billType]);

  const footers = DATA["home"][device]["footers"];
  const footersList = footers.map((f) => (
    <IonButton
      key={f.index}
      expand="full"
      color="light"
      className="ion-no-margin"
      onClick={() => {
        updateBillType(f.index);
        activateFooter(f.index);
        setShowPopover({ open: false, event: undefined });
      }}
    >
      {f.name}
    </IonButton>
  ));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>{APP_NAME}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* settings / file controls */}
        <IonToolbar color="primary">
          <IonIcon
            icon={settings}
            slot="end"
            className="ion-padding-end"
            size="large"
            onClick={(e) =>
              setShowPopover({ open: true, event: e.nativeEvent })
            }
          />
          <Files
            store={store}
            file={selectedFile}
            updateSelectedFile={updateSelectedFile}
            updateBillType={updateBillType}
          />
          <NewFile
            file={selectedFile}
            updateSelectedFile={updateSelectedFile}
            store={store}
            billType={billType}
          />

          <IonPopover
            animated
            keyboardClose
            backdropDismiss
            event={showPopover.event}
            isOpen={showPopover.open}
            onDidDismiss={() =>
              setShowPopover({ open: false, event: undefined })
            }
          >
            {footersList}
          </IonPopover>
        </IonToolbar>

        {/* current file title */}
        <IonToolbar color="secondary">
          <IonTitle className="ion-text-center">
            Editing : {selectedFile}
          </IonTitle>
        </IonToolbar>

        {/* ← NEW PURCHASE UI */}
        <IonList>
          {purchaseItems.map((it: InAppItem) => (
            <IonItem key={it.id}>
              <IonLabel>
                {it.desc} — ₹{it.price.toFixed(2)}{" "}
                {it.status && <small>(owned)</small>}
              </IonLabel>
              <IonButton
                slot="end"
                onClick={() => purchase(it.id)}
                disabled={it.status}
              >
                {it.status ? "✓" : "Buy"}
              </IonButton>
            </IonItem>
          ))}
        </IonList>
        <IonButton expand="block" onClick={restore}>
          Restore Purchases
        </IonButton>
        {purchaseError && (
          <div style={{ color: "red", padding: "0.5em" }}>
            Error: {purchaseError.message || JSON.stringify(purchaseError)}
          </div>
        )}
        {lastPurchase && (
          <div style={{ padding: "0.5em", fontSize: "0.9em" }}>
            Last purchased: {lastPurchase.productId}
          </div>
        )}
        {/* ↑ END PURCHASE UI */}

        {/* your floating menu button */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowMenu(true)}>
            <IonIcon icon={menu} />
          </IonFabButton>
        </IonFab>

        {/* slide-in menu */}
        <Menu
          showM={showMenu}
          setM={closeMenu}
          file={selectedFile}
          updateSelectedFile={updateSelectedFile}
          store={store}
          bT={billType}
        />

        {/* existing worksheet container */}
        <div id="container">
          <div id="workbookControl"></div>
          <div id="tableeditor"></div>
          <div id="msg"></div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
