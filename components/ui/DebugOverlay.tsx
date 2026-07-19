"use client";

import React, { useEffect, useState, useCallback } from "react";

interface OverflowEntry {
  tag: string;
  id: string;
  classes: string;
  scrollWidth: number;
  rectWidth: number;
  parentWidth: number;
  position: string;
  transform: string;
}

interface StackEntry {
  tag: string;
  id: string;
  classes: string;
  position: string;
  zIndex: string;
  transform: string;
  filter: string;
  backdropFilter: string;
  opacity: string;
  mixBlendMode: string;
  isolation: string;
  contain: string;
  willChange: string;
  createsContext: boolean;
}

export function DebugOverlay() {
  const visible = process.env.NODE_ENV === "development";

  const [metrics, setMetrics] = useState<Record<string, string | number | boolean>>({
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0,
    visualViewportWidth: 0,
    visualViewportHeight: 0,
    clientWidth: 0,
    clientHeight: 0,
    devicePixelRatio: 1,
    userAgent: "",
    breakpoint: "",
    isTouch: false,
    lenisClass: false,
    framerMotionFinished: false,
  });

  const [overflows, setOverflows] = useState<OverflowEntry[]>([]);
  const [stackContexts, setStackContexts] = useState<StackEntry[]>([]);
  const [tab, setTab] = useState<"metrics" | "overflow" | "stack">("metrics");
  const [minimized, setMinimized] = useState(false);

  const scanOverflow = useCallback(() => {
    const vw = window.innerWidth;
    const results: OverflowEntry[] = [];
    const all = document.querySelectorAll("*");
    all.forEach((el) => {
      if (el === document.documentElement || el === document.body) return;
      const rect = el.getBoundingClientRect();
      const htmlEl = el as HTMLElement;
      if (htmlEl.scrollWidth > vw || rect.width > vw) {
        const parentRect = el.parentElement?.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        results.push({
          tag: el.tagName.toLowerCase(),
          id: el.id || "",
          classes: el.className?.toString().slice(0, 80) || "",
          scrollWidth: htmlEl.scrollWidth,
          rectWidth: Math.round(rect.width),
          parentWidth: parentRect ? Math.round(parentRect.width) : 0,
          position: cs.position,
          transform: cs.transform === "none" ? "none" : cs.transform.slice(0, 60),
        });
      }
    });
    setOverflows(results);
  }, []);

  const auditStackingContext = useCallback(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const entries: StackEntry[] = [];
    // Walk up from hero content to document root
    let current: HTMLElement | null = hero;
    while (current && current !== document.documentElement) {
      const cs = window.getComputedStyle(current);
      const creates =
        cs.position === "fixed" ||
        cs.position === "sticky" ||
        (cs.position !== "static" && cs.zIndex !== "auto") ||
        cs.opacity !== "1" ||
        cs.transform !== "none" ||
        cs.filter !== "none" ||
        cs.backdropFilter !== "none" ||
        cs.mixBlendMode !== "normal" ||
        cs.isolation === "isolate" ||
        cs.contain === "layout" ||
        cs.contain === "paint" ||
        cs.contain === "strict" ||
        cs.contain === "content" ||
        (cs.willChange !== "auto" && (cs.willChange.includes("transform") || cs.willChange.includes("opacity")));

      entries.push({
        tag: current.tagName.toLowerCase(),
        id: current.id || "",
        classes: current.className?.toString().slice(0, 60) || "",
        position: cs.position,
        zIndex: cs.zIndex,
        transform: cs.transform === "none" ? "—" : cs.transform.slice(0, 40),
        filter: cs.filter === "none" ? "—" : cs.filter,
        backdropFilter: cs.backdropFilter === "none" ? "—" : cs.backdropFilter,
        opacity: cs.opacity,
        mixBlendMode: cs.mixBlendMode,
        isolation: cs.isolation,
        contain: cs.contain || "none",
        willChange: cs.willChange || "auto",
        createsContext: creates,
      });
      current = current.parentElement;
    }

    // Also scan all direct children of hero for stacking contexts
    const heroChildren = hero.querySelectorAll("*");
    heroChildren.forEach((child) => {
      const cs = window.getComputedStyle(child);
      const creates =
        cs.position === "fixed" ||
        cs.position === "sticky" ||
        (cs.position !== "static" && cs.zIndex !== "auto") ||
        cs.opacity !== "1" ||
        cs.transform !== "none" ||
        cs.filter !== "none" ||
        cs.backdropFilter !== "none" ||
        cs.mixBlendMode !== "normal" ||
        cs.isolation === "isolate";

      if (creates) {
        entries.push({
          tag: (child as HTMLElement).tagName.toLowerCase(),
          id: child.id || "",
          classes: child.className?.toString().slice(0, 60) || "",
          position: cs.position,
          zIndex: cs.zIndex,
          transform: cs.transform === "none" ? "—" : cs.transform.slice(0, 40),
          filter: cs.filter === "none" ? "—" : cs.filter,
          backdropFilter: cs.backdropFilter === "none" ? "—" : cs.backdropFilter,
          opacity: cs.opacity,
          mixBlendMode: cs.mixBlendMode,
          isolation: cs.isolation,
          contain: cs.contain || "none",
          willChange: cs.willChange || "auto",
          createsContext: creates,
        });
      }
    });

    setStackContexts(entries);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const updateMetrics = () => {
      const iw = window.innerWidth;
      const ih = window.innerHeight;
      const ow = window.outerWidth;
      const oh = window.outerHeight;
      const vvw = window.visualViewport ? window.visualViewport.width : 0;
      const vvh = window.visualViewport ? window.visualViewport.height : 0;
      const cw = document.documentElement.clientWidth;
      const ch = document.documentElement.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      const ua = navigator.userAgent;

      let bp = "xs (< 640px)";
      if (iw >= 1536) bp = "2xl (>= 1536px)";
      else if (iw >= 1280) bp = "xl (>= 1280px)";
      else if (iw >= 1024) bp = "lg (>= 1024px)";
      else if (iw >= 768) bp = "md (>= 768px)";
      else if (iw >= 640) bp = "sm (>= 640px)";

      const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const lenis = document.documentElement.classList.contains("lenis");
      const fmFinished = (window as unknown as Record<string, boolean>).__framerMotionFinished || false;

      // Check hero content visibility
      const heroSection = document.getElementById("hero");
      let heroContentVisible = false;
      if (heroSection) {
        const containers = heroSection.querySelectorAll("h1");
        if (containers.length > 0) {
          const h1 = containers[0];
          const rect = h1.getBoundingClientRect();
          const cs = window.getComputedStyle(h1);
          heroContentVisible = rect.width > 0 && rect.height > 0 && cs.opacity !== "0";
        }
      }

      setMetrics({
        innerWidth: iw,
        innerHeight: ih,
        outerWidth: ow,
        outerHeight: oh,
        visualViewportWidth: Math.round(vvw),
        visualViewportHeight: Math.round(vvh),
        clientWidth: cw,
        clientHeight: ch,
        devicePixelRatio: dpr,
        userAgent: ua,
        breakpoint: bp,
        isTouch: touch,
        lenisClass: lenis,
        framerMotionFinished: fmFinished,
        heroH1Visible: heroContentVisible,
      });
    };

    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    const interval = setInterval(updateMetrics, 1000);

    return () => {
      window.removeEventListener("resize", updateMetrics);
      clearInterval(interval);
    };
  }, [visible]);

  if (!visible) return null;

  const panelStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "10px",
    left: "10px",
    zIndex: 99999,
    background: "rgba(10, 10, 15, 0.96)",
    border: "1px solid rgba(255, 153, 0, 0.4)",
    borderRadius: "8px",
    padding: minimized ? "6px 10px" : "10px",
    width: minimized ? "auto" : "310px",
    maxHeight: minimized ? "auto" : "70vh",
    overflowY: "auto",
    fontFamily: "monospace",
    fontSize: "9px",
    lineHeight: "1.4",
    color: "#f4f4f7",
    boxShadow: "0 4px 20px rgba(0,0,0,0.8)",
    pointerEvents: "auto",
    WebkitOverflowScrolling: "touch",
  };

  if (minimized) {
    return (
      <div style={panelStyle} onClick={() => setMinimized(false)}>
        <span style={{ color: "#ff9900", fontWeight: "bold" }}>📱 DEBUG</span>
      </div>
    );
  }

  return (
    <div style={panelStyle}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "4px" }}>
        <span style={{ color: "#ff9900", fontWeight: "bold" }}>📱 SCD DEBUG PANEL</span>
        <span onClick={() => setMinimized(true)} style={{ cursor: "pointer", color: "#888", fontSize: "12px" }}>▼</span>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "6px" }}>
        {(["metrics", "overflow", "stack"] as const).map((t) => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              if (t === "overflow") scanOverflow();
              if (t === "stack") auditStackingContext();
            }}
            style={{
              padding: "3px 8px",
              background: tab === t ? "rgba(255,153,0,0.2)" : "rgba(255,255,255,0.05)",
              border: tab === t ? "1px solid rgba(255,153,0,0.5)" : "1px solid rgba(255,255,255,0.1)",
              borderRadius: "4px",
              color: tab === t ? "#ff9900" : "#aaa",
              fontSize: "9px",
              cursor: "pointer",
            }}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Metrics Tab */}
      {tab === "metrics" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <div><strong>innerWidth:</strong> {String(metrics.innerWidth)}px</div>
          <div><strong>innerHeight:</strong> {String(metrics.innerHeight)}px</div>
          <div><strong>outerWidth:</strong> {String(metrics.outerWidth)}px</div>
          <div><strong>outerHeight:</strong> {String(metrics.outerHeight)}px</div>
          <div><strong>visualViewport:</strong> {String(metrics.visualViewportWidth)}×{String(metrics.visualViewportHeight)}</div>
          <div><strong>clientWidth:</strong> {String(metrics.clientWidth)}px</div>
          <div><strong>clientHeight:</strong> {String(metrics.clientHeight)}px</div>
          <div><strong>DPR:</strong> {String(metrics.devicePixelRatio)}</div>
          <div style={{ wordBreak: "break-all" }}><strong>UA:</strong> {String(metrics.userAgent)}</div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "3px", marginTop: "3px" }}></div>
          <div><strong>Breakpoint:</strong> <span style={{ color: "#ff9900" }}>{String(metrics.breakpoint)}</span></div>
          <div><strong>Touch:</strong> {metrics.isTouch ? "✅ YES" : "❌ NO"}</div>
          <div><strong>Lenis (.lenis):</strong> {metrics.lenisClass ? "✅ ACTIVE" : "❌ DISABLED"}</div>
          <div><strong>FM Done:</strong> {metrics.framerMotionFinished ? "✅" : "❌"}</div>
          <div><strong>Hero H1 Visible:</strong> {metrics.heroH1Visible ? "✅ YES" : "🔴 NO — INVISIBLE"}</div>
        </div>
      )}

      {/* Overflow Tab */}
      {tab === "overflow" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <button
            onClick={scanOverflow}
            style={{ padding: "4px 8px", background: "rgba(255,153,0,0.15)", border: "1px solid rgba(255,153,0,0.3)", borderRadius: "4px", color: "#ff9900", fontSize: "9px", cursor: "pointer", marginBottom: "4px" }}
          >
            🔄 RESCAN
          </button>
          {overflows.length === 0 ? (
            <div style={{ color: "#4ade80" }}>✅ No overflow detected</div>
          ) : (
            overflows.slice(0, 15).map((o, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "3px" }}>
                <div style={{ color: "#f87171" }}>&lt;{o.tag}&gt; {o.id ? `#${o.id}` : ""}</div>
                <div style={{ wordBreak: "break-all", color: "#888" }}>{o.classes}</div>
                <div>scrollW: {o.scrollWidth} | rectW: {o.rectWidth} | parentW: {o.parentWidth}</div>
                <div>pos: {o.position} | transform: {o.transform}</div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Stacking Context Tab */}
      {tab === "stack" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <button
            onClick={auditStackingContext}
            style={{ padding: "4px 8px", background: "rgba(255,153,0,0.15)", border: "1px solid rgba(255,153,0,0.3)", borderRadius: "4px", color: "#ff9900", fontSize: "9px", cursor: "pointer", marginBottom: "4px" }}
          >
            🔄 RE-AUDIT
          </button>
          {stackContexts.length === 0 ? (
            <div style={{ color: "#888" }}>Click RE-AUDIT to scan</div>
          ) : (
            stackContexts.map((s, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "3px" }}>
                <div style={{ color: s.createsContext ? "#f87171" : "#4ade80" }}>
                  {s.createsContext ? "⚠️ " : "✓ "}&lt;{s.tag}&gt; {s.id ? `#${s.id}` : ""}
                </div>
                <div style={{ wordBreak: "break-all", color: "#888" }}>{s.classes}</div>
                <div>z: {s.zIndex} | pos: {s.position} | op: {s.opacity}</div>
                <div>blend: {s.mixBlendMode} | transform: {s.transform}</div>
                {s.willChange !== "auto" && <div style={{ color: "#fbbf24" }}>will-change: {s.willChange}</div>}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
