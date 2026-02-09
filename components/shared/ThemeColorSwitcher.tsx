"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./ThemeColorSwitcher.module.css";

const STORAGE_KEY = "theme.primary";
const DEFAULT_PRIMARY = "#2a9df4";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function normalizeHex(input: string) {
  let v = input.trim().toLowerCase();
  if (!v) return "";
  if (!v.startsWith("#")) v = `#${v}`;
  if (/^#[0-9a-f]{3}$/.test(v)) {
    // expand #abc -> #aabbcc
    v = `#${v[1]}${v[1]}${v[2]}${v[2]}${v[3]}${v[3]}`;
  }
  if (!/^#[0-9a-f]{6}$/.test(v)) return "";
  return v;
}

function hexToRgb(hex: string) {
  const v = normalizeHex(hex);
  if (!v) return null;
  const r = parseInt(v.slice(1, 3), 16);
  const g = parseInt(v.slice(3, 5), 16);
  const b = parseInt(v.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number) {
  const to = (n: number) =>
    clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

function rgbToHsl(r: number, g: number, b: number) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;

  let h = 0;
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  return { h, s, l };
}

function hslToRgb(h: number, s: number, l: number) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let rp = 0;
  let gp = 0;
  let bp = 0;
  if (h >= 0 && h < 60) [rp, gp, bp] = [c, x, 0];
  else if (h >= 60 && h < 120) [rp, gp, bp] = [x, c, 0];
  else if (h >= 120 && h < 180) [rp, gp, bp] = [0, c, x];
  else if (h >= 180 && h < 240) [rp, gp, bp] = [0, x, c];
  else if (h >= 240 && h < 300) [rp, gp, bp] = [x, 0, c];
  else [rp, gp, bp] = [c, 0, x];

  return {
    r: (rp + m) * 255,
    g: (gp + m) * 255,
    b: (bp + m) * 255,
  };
}

function deriveVariants(primaryHex: string) {
  const rgb = hexToRgb(primaryHex);
  if (!rgb) return null;
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const dark = hslToRgb(h, s, clamp(l - 0.12, 0, 1));
  const darker = hslToRgb(h, s, clamp(l - 0.22, 0, 1));
  const light = hslToRgb(h, s, clamp(l + 0.12, 0, 1));

  return {
    primary: primaryHex,
    primaryDark: rgbToHex(dark.r, dark.g, dark.b),
    primaryDarker: rgbToHex(darker.r, darker.g, darker.b),
    primaryLight: rgbToHex(light.r, light.g, light.b),
  };
}

function applyPrimary(primaryHex: string) {
  const variants = deriveVariants(primaryHex);
  if (!variants) return;
  const root = document.documentElement;
  root.style.setProperty("--primary", variants.primary);
  root.style.setProperty("--primary-dark", variants.primaryDark);
  root.style.setProperty("--primary-darker", variants.primaryDarker);
  root.style.setProperty("--primary-light", variants.primaryLight);

  const rgbPrimary = hexToRgb(variants.primary);
  const rgbDark = hexToRgb(variants.primaryDark);
  const rgbDarker = hexToRgb(variants.primaryDarker);
  const rgbLight = hexToRgb(variants.primaryLight);

  if (rgbPrimary)
    root.style.setProperty(
      "--primary-rgb",
      `${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}`
    );
  if (rgbDark)
    root.style.setProperty(
      "--primary-dark-rgb",
      `${rgbDark.r}, ${rgbDark.g}, ${rgbDark.b}`
    );
  if (rgbDarker)
    root.style.setProperty(
      "--primary-darker-rgb",
      `${rgbDarker.r}, ${rgbDarker.g}, ${rgbDarker.b}`
    );
  if (rgbLight)
    root.style.setProperty(
      "--primary-light-rgb",
      `${rgbLight.r}, ${rgbLight.g}, ${rgbLight.b}`
    );
}

export default function ThemeColorSwitcher() {
  const [open, setOpen] = useState(false);
  const getInitialHex = () => {
    if (typeof window === "undefined") return DEFAULT_PRIMARY;
    const saved = localStorage.getItem(STORAGE_KEY);
    const normalized = saved ? normalizeHex(saved) : "";
    return normalized || DEFAULT_PRIMARY;
  };

  const [hex, setHex] = useState(getInitialHex);
  const [lastApplied, setLastApplied] = useState(getInitialHex);

  const presets = useMemo(
    () => [
      "#2a9df4", // default
      "#2563eb", // blue
      "#0ea5e9", // sky
      "#14b8a6", // teal
      "#22c55e", // green
      "#f59e0b", // amber
      "#ef4444", // red
      "#a855f7", // purple
      "#111827", // dark
    ],
    []
  );

  useEffect(() => {
    // Apply initial color to CSS variables (no state updates)
    applyPrimary(hex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const apply = (value: string) => {
    const normalized = normalizeHex(value);
    if (!normalized) return;
    setHex(normalized);
    applyPrimary(normalized);
    setLastApplied(normalized);
    localStorage.setItem(STORAGE_KEY, normalized);
  };

  const reset = () => {
    setHex(DEFAULT_PRIMARY);
    applyPrimary(DEFAULT_PRIMARY);
    setLastApplied(DEFAULT_PRIMARY);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className={styles.root}>
      {open && (
        <div
          className={styles.panel}
          role="dialog"
          aria-label="Theme color switcher"
        >
          <div className={styles.header}>
            <div className={styles.title}>
              <i className="fas fa-palette" />
              Боја теме
            </div>
            <button
              className={styles.close}
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <i className="fas fa-xmark" />
            </button>
          </div>
          <div className={styles.body}>
            <div className={styles.row}>
              <input
                className={styles.colorInput}
                type="color"
                value={hex}
                onChange={(e) => apply(e.target.value)}
                aria-label="Primary color picker"
              />
              <input
                className={styles.textInput}
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                onBlur={() => apply(hex)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") apply(hex);
                }}
                placeholder="#2a9df4"
                aria-label="Primary color hex"
              />
            </div>

            <div className={styles.swatches} aria-label="Presets">
              {presets.map((p) => {
                const active = normalizeHex(p) === normalizeHex(lastApplied);
                return (
                  <button
                    key={p}
                    className={`${styles.swatch} ${active ? styles.swatchActive : ""}`}
                    style={{ background: p }}
                    onClick={() => apply(p)}
                    aria-label={`Set primary color ${p}`}
                    type="button"
                  />
                );
              })}
            </div>

            <div className={styles.actions}>
              <button className={styles.btn} onClick={reset} type="button">
                Reset
              </button>
              <button
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={() => apply(hex)}
                type="button"
              >
                Primeni
              </button>
            </div>

            <div className={styles.hint}>
              Menja <code>--primary</code> varijable globalno i pamti izbor
              lokalno.
            </div>
          </div>
        </div>
      )}

      <button
        className={styles.fab}
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle theme color switcher"
        type="button"
      >
        <i className="fas fa-wand-magic-sparkles" />
      </button>
    </div>
  );
}
