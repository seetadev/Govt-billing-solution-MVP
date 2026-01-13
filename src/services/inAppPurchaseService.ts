// src/services/inAppPurchaseService.ts

import { useEffect, useState, useCallback } from 'react';
import {
  PDF_10, PDF_25, PDF_50, PDF_100,
  SPE_10, SPE_500, SPE_1000
} from '../app-data';

declare global {
  interface Window { store: any; }
}

export interface InAppItem {
  id: string;
  desc: string;
  price: number;
  status: boolean;
  units: number;
}

const PRODUCT_IDS = [
  PDF_10, PDF_25, PDF_50, PDF_100,
  SPE_10, SPE_500, SPE_1000
];

export function useInAppPurchase() {
  const [items, setItems] = useState<InAppItem[]>([]);
  const [error, setError] = useState<any>(null);
  const [lastPurchase, setLastPurchase] = useState<{
    productId: string;
    receipt: any;
  } | null>(null);

  useEffect(() => {
    if (!window.store) {
      console.warn('InAppPurchase plugin not ready');
      return;
    }
    const store = window.store;

    store.verbosity = store.DEBUG;

    // 1) register products
    PRODUCT_IDS.forEach(id => {
      store.register({
        id,
        alias: id,
        type: id.startsWith('PDF')
          ? store.CONSUMABLE
          : store.NON_CONSUMABLE
      });
    });

    // 2) when loaded: map all to our state
    store.when('loaded', () => {
      const all = PRODUCT_IDS.map(id => {
        const p = store.get(id);
        return {
          id: p.id,
          desc: p.title || p.id,
          price: parseFloat(p.price || '0'),
          status: !!p.owned,
          units: parseInt(p.id.split('_')[1], 10) || 0
        };
      });
      setItems(all);
    });

    // 3) approved purchase
    store.when('approved', (p: any) => {
      p.finish();
      setItems(cur =>
        cur.map(i => i.id === p.id ? { ...i, status: true } : i)
      );
      setLastPurchase({ productId: p.id, receipt: p.transaction });
    });

    // 4) cancelled/refunded
    store.when('cancelled', (p: any) => {
      setItems(cur =>
        cur.map(i => i.id === p.id ? { ...i, status: false } : i)
      );
    });

    // 5) global errors
    store.error((e: any) => {
      console.error('IAP Error', e);
      setError(e);
    });

    // 6) kick things off
    store.refresh();

    // teardown on unmount
    return () => { store.off(); };
  }, []);

  const purchase = useCallback((id: string) => {
    return window.store.order(id);
  }, []);

  const restore = useCallback(() => {
    return window.store.refresh();
  }, []);

  return {
    items,
    error,
    lastPurchase,
    purchase,
    restore
  };
}
