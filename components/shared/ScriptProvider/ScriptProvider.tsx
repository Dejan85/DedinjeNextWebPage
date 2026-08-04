"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";
import { usePathname } from "next/navigation";
import { applyScriptToDom } from "@/lib/transliteration/transliterateDom";

export type Script = "cyr" | "lat";

const STORAGE_KEY = "dedinje-script";
const listeners = new Set<() => void>();

// Modul-nivo "external store" nad localStorage-om: čitanje ide preko
// useSyncExternalStore (server snapshot je uvek "cyr", da SSR/hidratacija
// budu konzistentni), pisanje obaveštava sve pretplaćene komponente.
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Script {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "lat" ? "lat" : "cyr";
}

function getServerSnapshot(): Script {
  return "cyr";
}

function writeScript(next: Script) {
  window.localStorage.setItem(STORAGE_KEY, next);
  listeners.forEach((listener) => listener());
}

type ScriptContextValue = {
  script: Script;
  setScript: (script: Script) => void;
  toggleScript: () => void;
};

const ScriptContext = createContext<ScriptContextValue | null>(null);

export function useScript() {
  const ctx = useContext(ScriptContext);
  if (!ctx) {
    throw new Error("useScript mora biti pozvan unutar ScriptProvider-a");
  }
  return ctx;
}

export default function ScriptProvider({ children }: { children: React.ReactNode }) {
  const script = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const setScript = useCallback((next: Script) => writeScript(next), []);

  const toggleScript = useCallback(() => {
    writeScript(script === "cyr" ? "lat" : "cyr");
  }, [script]);

  // Ćirilica/latinica postoje samo za srpski sadržaj — na /en rutama se
  // transliteracija nikad ne pokreće (engleski tekst kroz sr-lat→ćirilica
  // mapu bi se pretvorio u besmislen niz karaktera).
  const isEnglish = pathname?.startsWith("/en");

  // Re-transliterira ceo poddrvo pri svakoj promeni script-a ili rute, i
  // hvata dinamički učitan sadržaj preko MutationObserver-a (disconnect/
  // reconnect oko sopstvenih upisa da se izbegne beskonačna petlja).
  useEffect(() => {
    const root = rootRef.current;
    if (!root || isEnglish) return;

    const observer = new MutationObserver(() => {
      observer.disconnect();
      applyScriptToDom(root, script);
      observer.observe(root, { childList: true, subtree: true, characterData: true });
    });

    applyScriptToDom(root, script);
    observer.observe(root, { childList: true, subtree: true, characterData: true });

    return () => observer.disconnect();
  }, [script, pathname, isEnglish]);

  const value = useMemo(
    () => ({ script, setScript, toggleScript }),
    [script, setScript, toggleScript]
  );

  return (
    <ScriptContext.Provider value={value}>
      <div ref={rootRef}>{children}</div>
    </ScriptContext.Provider>
  );
}
