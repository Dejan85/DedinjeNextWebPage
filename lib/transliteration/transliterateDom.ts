import { transliterate } from "./cyrillicToLatin";

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "CODE", "PRE", "INPUT", "TEXTAREA"]);

// Čuva original (ćirilični) tekst svakog node-a viđenog prvi put, da bi se
// transliteracija uvek radila iz izvora — ne iz trenutne (možda već
// transliterirane) DOM vrednosti. Bez ovoga, toggle napred-nazad kvari tekst.
const originalText = new WeakMap<Text, string>();

function shouldSkip(node: Node): boolean {
  let el = node.parentElement;
  while (el) {
    if (SKIP_TAGS.has(el.tagName) || el.hasAttribute("data-no-translit")) {
      return true;
    }
    el = el.parentElement;
  }
  return false;
}

/**
 * Prolazi kroz sve text node-ove ispod `root` i prikazuje ih na ćirilici
 * ili latinici u zavisnosti od `script`. Bezbedno za ponovljeno pozivanje
 * (npr. posle navigacije ili DOM mutacije).
 */
export function applyScriptToDom(root: Node, script: "cyr" | "lat") {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_SKIP;
      if (shouldSkip(node)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const textNodes: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    textNodes.push(current as Text);
    current = walker.nextNode();
  }

  for (const node of textNodes) {
    let original = originalText.get(node);
    if (original === undefined) {
      original = node.nodeValue ?? "";
      originalText.set(node, original);
    }
    const next = script === "lat" ? transliterate(original) : original;
    if (node.nodeValue !== next) {
      node.nodeValue = next;
    }
  }
}
