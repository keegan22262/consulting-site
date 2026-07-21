(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components-v2/sections/ConstellationHero.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConstellationHero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
function createParticles(count, w, h) {
    const particles = [];
    for(let i = 0; i < count; i++){
        const r = 1.5 + Math.random();
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.15 + Math.random() * 0.15;
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: r,
            baseRadius: r,
            pulseTime: 0,
            isPulsing: false
        });
    }
    return particles;
}
function ConstellationCanvas() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const particlesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const mouseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0,
        active: false
    });
    const animFrameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const lastPulseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConstellationCanvas.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const isMobile = window.innerWidth < 768;
            const dpr = window.devicePixelRatio || 1;
            const particleCount = isMobile ? 30 : 70;
            function resize() {
                if (!canvas) return;
                const w = canvas.parentElement.clientWidth;
                const h = canvas.parentElement.clientHeight;
                canvas.width = w * dpr;
                canvas.height = h * dpr;
                canvas.style.width = `${w}px`;
                canvas.style.height = `${h}px`;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                // Reinit particles if canvas resized significantly
                if (particlesRef.current.length === 0 || Math.abs(w - (particlesRef.current[0]?.x ?? 0) * 2) > w) {
                    particlesRef.current = createParticles(particleCount, w, h);
                }
            }
            resize();
            if (particlesRef.current.length === 0) {
                const w = canvas.parentElement.clientWidth;
                const h = canvas.parentElement.clientHeight;
                particlesRef.current = createParticles(particleCount, w, h);
            }
            // Mouse interaction (desktop only)
            function onMouseMove(e) {
                if (isMobile) return;
                const rect = canvas.getBoundingClientRect();
                mouseRef.current.x = e.clientX - rect.left;
                mouseRef.current.y = e.clientY - rect.top;
                mouseRef.current.active = true;
            }
            function onMouseLeave() {
                mouseRef.current.active = false;
            }
            if (!isMobile) {
                canvas.addEventListener("mousemove", onMouseMove);
                canvas.addEventListener("mouseleave", onMouseLeave);
            }
            window.addEventListener("resize", resize);
            const CONNECTION_DIST = 180;
            function animate(time) {
                if (!canvas || !ctx) return;
                const w = canvas.parentElement.clientWidth;
                const h = canvas.parentElement.clientHeight;
                ctx.clearRect(0, 0, w, h);
                const particles = particlesRef.current;
                const mouse = mouseRef.current;
                // Pulse logic: trigger a random pulse every 3-4 seconds
                if (time - lastPulseRef.current > 3000 + Math.random() * 1000) {
                    const idx = Math.floor(Math.random() * particles.length);
                    particles[idx].isPulsing = true;
                    particles[idx].pulseTime = time;
                    lastPulseRef.current = time;
                }
                // Update particles
                for (const p of particles){
                    p.x += p.vx;
                    p.y += p.vy;
                    // Wrap edges
                    if (p.x < 0) p.x = w;
                    if (p.x > w) p.x = 0;
                    if (p.y < 0) p.y = h;
                    if (p.y > h) p.y = 0;
                    // Mouse repulsion
                    if (mouse.active && !isMobile) {
                        const dx = p.x - mouse.x;
                        const dy = p.y - mouse.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 120 && dist > 0) {
                            const force = (120 - dist) / 120;
                            p.x += dx / dist * force * 2;
                            p.y += dy / dist * force * 2;
                        }
                    }
                    // Pulse animation
                    if (p.isPulsing) {
                        const elapsed = time - p.pulseTime;
                        if (elapsed < 500) {
                            const progress = elapsed / 500;
                            p.radius = p.baseRadius + (6 - p.baseRadius) * Math.sin(progress * Math.PI);
                        } else {
                            p.radius = p.baseRadius;
                            p.isPulsing = false;
                        }
                    }
                }
                // Draw connection lines
                for(let i = 0; i < particles.length; i++){
                    for(let j = i + 1; j < particles.length; j++){
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < CONNECTION_DIST) {
                            const opacity = (1 - dist / CONNECTION_DIST) * 0.6;
                            const isPulseConnection = particles[i].isPulsing || particles[j].isPulsing;
                            const lineOpacity = isPulseConnection ? Math.min(opacity * 2, 0.8) : opacity;
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.strokeStyle = `rgba(84, 131, 179, ${lineOpacity})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                }
                // Draw particles
                for (const p of particles){
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    if (p.isPulsing) {
                        ctx.fillStyle = "rgba(125, 160, 202, 0.8)";
                    } else {
                        ctx.fillStyle = "rgba(84, 131, 179, 0.5)";
                    }
                    ctx.fill();
                }
                animFrameRef.current = requestAnimationFrame(animate);
            }
            animFrameRef.current = requestAnimationFrame(animate);
            return ({
                "ConstellationCanvas.useEffect": ()=>{
                    cancelAnimationFrame(animFrameRef.current);
                    window.removeEventListener("resize", resize);
                    if (!isMobile) {
                        canvas.removeEventListener("mousemove", onMouseMove);
                        canvas.removeEventListener("mouseleave", onMouseLeave);
                    }
                }
            })["ConstellationCanvas.useEffect"];
        }
    }["ConstellationCanvas.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "constellation-canvas"
    }, void 0, false, {
        fileName: "[project]/components-v2/sections/ConstellationHero.tsx",
        lineNumber: 210,
        columnNumber: 10
    }, this);
}
_s(ConstellationCanvas, "fFT8LiCBToHRdLAdI/BQZpcaSzA=");
_c = ConstellationCanvas;
function ConstellationHero() {
    _s1();
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // phase 0: initial (nothing visible)
    // phase 1: label fading in (300ms)
    // phase 2: typing headline (1100ms)
    // phase 3: typing complete, cursor blinking
    // phase 4: subtext fading in
    // phase 5: CTA fading in
    // phase 6: scroll indicator fading in
    // phase 7: all done
    const [typingProgress, setTypingProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [cursorVisible, setCursorVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showCursor, setShowCursor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const skippedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const phaseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const headline = "Institutional Advisory Built for Growth, Transformation, and Execution.";
    const charCount = headline.length;
    // Skip-to-end on scroll
    const skipToEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ConstellationHero.useCallback[skipToEnd]": ()=>{
            if (skippedRef.current) return;
            skippedRef.current = true;
            setTypingProgress(charCount);
            setShowCursor(false);
            setCursorVisible(false);
            setPhase(7);
            phaseRef.current = 7;
            if (sectionRef.current) {
                sectionRef.current.classList.add("hero-loaded");
            }
        }
    }["ConstellationHero.useCallback[skipToEnd]"], [
        charCount
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConstellationHero.useEffect": ()=>{
            const onScroll = {
                "ConstellationHero.useEffect.onScroll": ()=>{
                    if (phaseRef.current < 7 && window.scrollY > 50) {
                        skipToEnd();
                    }
                }
            }["ConstellationHero.useEffect.onScroll"];
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            return ({
                "ConstellationHero.useEffect": ()=>window.removeEventListener("scroll", onScroll)
            })["ConstellationHero.useEffect"];
        }
    }["ConstellationHero.useEffect"], [
        skipToEnd
    ]);
    // Animation timeline
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConstellationHero.useEffect": ()=>{
            if (skippedRef.current) return;
            const timers = [];
            // Phase 1: label fades in at 300ms
            timers.push(setTimeout({
                "ConstellationHero.useEffect": ()=>{
                    if (skippedRef.current) return;
                    setPhase(1);
                    phaseRef.current = 1;
                }
            }["ConstellationHero.useEffect"], 300));
            // Phase 2: typing starts at 1100ms
            timers.push(setTimeout({
                "ConstellationHero.useEffect": ()=>{
                    if (skippedRef.current) return;
                    setPhase(2);
                    phaseRef.current = 2;
                    setShowCursor(true);
                    // Type characters
                    for(let i = 1; i <= charCount; i++){
                        timers.push(setTimeout({
                            "ConstellationHero.useEffect": ()=>{
                                if (skippedRef.current) return;
                                setTypingProgress(i);
                                if (i === charCount) {
                                    // Typing complete
                                    setPhase(3);
                                    phaseRef.current = 3;
                                    // Cursor blinks for 1000ms then disappears
                                    timers.push(setTimeout({
                                        "ConstellationHero.useEffect": ()=>{
                                            if (skippedRef.current) return;
                                            setShowCursor(false);
                                        }
                                    }["ConstellationHero.useEffect"], 1000));
                                    // Phase 4: subtext at typing complete + 500ms
                                    timers.push(setTimeout({
                                        "ConstellationHero.useEffect": ()=>{
                                            if (skippedRef.current) return;
                                            setPhase(4);
                                            phaseRef.current = 4;
                                        }
                                    }["ConstellationHero.useEffect"], 500));
                                    // Phase 5: CTA at subtext + 1100ms (800ms fade + 300ms gap)
                                    timers.push(setTimeout({
                                        "ConstellationHero.useEffect": ()=>{
                                            if (skippedRef.current) return;
                                            setPhase(5);
                                            phaseRef.current = 5;
                                        }
                                    }["ConstellationHero.useEffect"], 1600));
                                    // Phase 6: scroll indicator at CTA + 1100ms
                                    timers.push(setTimeout({
                                        "ConstellationHero.useEffect": ()=>{
                                            if (skippedRef.current) return;
                                            setPhase(6);
                                            phaseRef.current = 6;
                                        }
                                    }["ConstellationHero.useEffect"], 2500));
                                    // Phase 7: all done
                                    timers.push(setTimeout({
                                        "ConstellationHero.useEffect": ()=>{
                                            if (skippedRef.current) return;
                                            setPhase(7);
                                            phaseRef.current = 7;
                                            if (sectionRef.current) {
                                                sectionRef.current.classList.add("hero-loaded");
                                            }
                                        }
                                    }["ConstellationHero.useEffect"], 3000));
                                }
                            }
                        }["ConstellationHero.useEffect"], i * 35));
                    }
                }
            }["ConstellationHero.useEffect"], 1100));
            return ({
                "ConstellationHero.useEffect": ()=>timers.forEach(clearTimeout)
            })["ConstellationHero.useEffect"];
        }
    }["ConstellationHero.useEffect"], [
        charCount
    ]);
    // Cursor blink interval
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConstellationHero.useEffect": ()=>{
            if (!showCursor) return;
            const interval = setInterval({
                "ConstellationHero.useEffect.interval": ()=>{
                    setCursorVisible({
                        "ConstellationHero.useEffect.interval": (v)=>!v
                    }["ConstellationHero.useEffect.interval"]);
                }
            }["ConstellationHero.useEffect.interval"], 530);
            return ({
                "ConstellationHero.useEffect": ()=>clearInterval(interval)
            })["ConstellationHero.useEffect"];
        }
    }["ConstellationHero.useEffect"], [
        showCursor
    ]);
    const done = phase >= 7 || skippedRef.current;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        className: `constellation-hero${done ? " hero-loaded" : ""}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "constellation-hero__canvas-wrap",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ConstellationCanvas, {}, void 0, false, {
                    fileName: "[project]/components-v2/sections/ConstellationHero.tsx",
                    lineNumber: 367,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components-v2/sections/ConstellationHero.tsx",
                lineNumber: 366,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "constellation-hero__gradient"
            }, void 0, false, {
                fileName: "[project]/components-v2/sections/ConstellationHero.tsx",
                lineNumber: 371,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "constellation-hero__content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "constellation-hero__label",
                        style: {
                            opacity: done || phase >= 1 ? 1 : 0,
                            transition: done ? "none" : "opacity 800ms ease"
                        },
                        children: "PAN-AFRICAN INSTITUTIONAL ADVISORY"
                    }, void 0, false, {
                        fileName: "[project]/components-v2/sections/ConstellationHero.tsx",
                        lineNumber: 376,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "constellation-hero__headline",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "constellation-hero__headline-inner",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: done ? headline : headline.slice(0, typingProgress)
                                    }, void 0, false, {
                                        fileName: "[project]/components-v2/sections/ConstellationHero.tsx",
                                        lineNumber: 389,
                                        columnNumber: 13
                                    }, this),
                                    !done && typingProgress < charCount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "transparent"
                                        },
                                        children: headline.slice(typingProgress)
                                    }, void 0, false, {
                                        fileName: "[project]/components-v2/sections/ConstellationHero.tsx",
                                        lineNumber: 391,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components-v2/sections/ConstellationHero.tsx",
                                lineNumber: 388,
                                columnNumber: 11
                            }, this),
                            showCursor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "constellation-hero__cursor",
                                style: {
                                    opacity: cursorVisible ? 1 : 0
                                },
                                children: "|"
                            }, void 0, false, {
                                fileName: "[project]/components-v2/sections/ConstellationHero.tsx",
                                lineNumber: 397,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components-v2/sections/ConstellationHero.tsx",
                        lineNumber: 387,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "constellation-hero__subtext",
                        style: {
                            opacity: done || phase >= 4 ? 1 : 0,
                            transition: done ? "none" : "opacity 800ms ease"
                        },
                        children: "We advise growth-stage companies, institutional operators, and public-sector leaders navigating structural complexity — delivering measurable outcomes with discipline."
                    }, void 0, false, {
                        fileName: "[project]/components-v2/sections/ConstellationHero.tsx",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            opacity: done || phase >= 5 ? 1 : 0,
                            transition: done ? "none" : "opacity 600ms ease"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/services",
                            className: "constellation-hero__cta",
                            children: "Explore Our Capabilities"
                        }, void 0, false, {
                            fileName: "[project]/components-v2/sections/ConstellationHero.tsx",
                            lineNumber: 426,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components-v2/sections/ConstellationHero.tsx",
                        lineNumber: 420,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components-v2/sections/ConstellationHero.tsx",
                lineNumber: 374,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "constellation-hero__scroll",
                style: {
                    opacity: done || phase >= 6 ? 1 : 0,
                    transition: done ? "none" : "opacity 400ms ease"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "constellation-hero__scroll-line"
                    }, void 0, false, {
                        fileName: "[project]/components-v2/sections/ConstellationHero.tsx",
                        lineNumber: 440,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "constellation-hero__scroll-text",
                        children: "SCROLL"
                    }, void 0, false, {
                        fileName: "[project]/components-v2/sections/ConstellationHero.tsx",
                        lineNumber: 441,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components-v2/sections/ConstellationHero.tsx",
                lineNumber: 433,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components-v2/sections/ConstellationHero.tsx",
        lineNumber: 361,
        columnNumber: 5
    }, this);
}
_s1(ConstellationHero, "a8FEmmIC5aF3Q2fT1JTPwILs/ZA=");
_c1 = ConstellationHero;
var _c, _c1;
__turbopack_context__.k.register(_c, "ConstellationCanvas");
__turbopack_context__.k.register(_c1, "ConstellationHero");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/HomepageClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomepageClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2d$v2$2f$sections$2f$ConstellationHero$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components-v2/sections/ConstellationHero.tsx [app-client] (ecmascript)");
"use client";
;
;
;
const FEATURED_CAPABILITIES = [
    {
        num: "01",
        name: "Strategy & Corporate Transformation",
        desc: "Enterprise strategy, operating model design, and transformation roadmaps.",
        href: "/services/strategy"
    },
    {
        num: "02",
        name: "Digital & AI Transformation",
        desc: "Digital modernisation, AI readiness, and technology implementation.",
        href: "/services/digital"
    },
    {
        num: "03",
        name: "Financial Advisory, Audit & Risk",
        desc: "Financial resilience, governance architecture, and risk management.",
        href: "/services/finance"
    }
];
const FEATURED_INDUSTRIES = [
    {
        num: "01",
        name: "Financial Services",
        desc: "Banks, capital markets, insurers, fintechs",
        href: "/industries/financial-services",
        accent: "#5483B3"
    },
    {
        num: "02",
        name: "Public Sector & Government",
        desc: "Ministries, agencies, parastatals",
        href: "/industries/public-sector-government",
        accent: "#7DA0CA"
    },
    {
        num: "03",
        name: "Technology, Media & Telecom",
        desc: "Platforms, telcos, digital infrastructure",
        href: "/industries/technology-digital",
        accent: "#5483B3"
    },
    {
        num: "04",
        name: "Energy & Natural Resources",
        desc: "Oil, gas, utilities, renewables, mining",
        href: "/industries/energy-resources",
        accent: "#7DA0CA"
    }
];
const FALLBACK_FEATURED = {
    _id: "f1",
    title: "AI Governance as a Competitive Differentiator",
    slug: "ai-governance-competitive-differentiator",
    excerpt: "How institutional AI governance frameworks are becoming the defining capability separating leading organisations from the rest in Africa\'s most dynamic sectors.",
    category: "Technology"
};
const FALLBACK_SUPPORTING = [
    {
        _id: "s1",
        title: "Africa Growth Outlook: Execution Determines Trajectory",
        slug: "africa-growth-outlook",
        category: "Strategy"
    },
    {
        _id: "s2",
        title: "Connectivity, Digital Identity, and Payment Rails Form a Growth Stack",
        slug: "connectivity-digital-identity",
        category: "Technology"
    }
];
/* ── Shared style tokens ───────────────────────────────────────────── */ const f = {
    heading: "var(--font-heading)",
    body: "var(--font-body)"
};
const overline = (color = "rgba(125,160,202,0.6)")=>({
        fontFamily: f.body,
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "6px",
        fontWeight: 500,
        color,
        marginBottom: "12px",
        display: "block"
    });
function HomepageClient({ featured, supporting }) {
    const feat = featured ?? FALLBACK_FEATURED;
    const supp = supporting.length >= 2 ? supporting : FALLBACK_SUPPORTING;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2d$v2$2f$sections$2f$ConstellationHero$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    backgroundColor: "#021024"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: "1200px",
                        margin: "0 auto",
                        padding: "96px 40px",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "80px",
                        alignItems: "center"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: overline(),
                                    children: "THE MANDATE"
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 141,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    style: {
                                        fontFamily: f.heading,
                                        fontSize: "clamp(28px, 3.5vw, 44px)",
                                        fontWeight: 400,
                                        color: "#FFFFFF",
                                        lineHeight: 1.15,
                                        marginBottom: "28px",
                                        letterSpacing: "-0.02em"
                                    },
                                    children: [
                                        "We don't just advise.",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "#7DA0CA"
                                            },
                                            children: "We architect outcomes."
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 152,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: f.body,
                                        fontSize: "17px",
                                        fontWeight: 300,
                                        color: "rgba(255,255,255,0.55)",
                                        lineHeight: 1.8,
                                        marginBottom: "20px",
                                        maxWidth: "480px"
                                    },
                                    children: "Rill Singh Limited partners with growth-stage companies, institutional operators, and sovereign entities across Africa — building the strategic, financial, and operational infrastructure that compounds over time."
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: f.body,
                                        fontSize: "16px",
                                        fontWeight: 300,
                                        color: "rgba(255,255,255,0.4)",
                                        lineHeight: 1.8,
                                        maxWidth: "480px"
                                    },
                                    children: "Ten integrated disciplines. One delivery architecture. Zero tolerance for recommendations without accountability."
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 169,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: "4px"
                            },
                            children: [
                                {
                                    number: "10",
                                    label: "Advisory Disciplines",
                                    desc: "Integrated under one delivery architecture"
                                },
                                {
                                    number: "11",
                                    label: "Industry Sectors",
                                    desc: "From financial services to public infrastructure"
                                },
                                {
                                    number: "100%",
                                    label: "Senior-Led",
                                    desc: "The people you meet are the people who deliver"
                                }
                            ].map((stat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        borderLeft: "2px solid rgba(84,131,179,0.25)",
                                        paddingLeft: "32px",
                                        paddingTop: "8px",
                                        paddingBottom: "32px",
                                        transition: "border-color 0.25s ease, padding-left 0.25s ease"
                                    },
                                    onMouseEnter: (e)=>{
                                        e.currentTarget.style.borderLeftColor = "#7DA0CA";
                                        e.currentTarget.style.paddingLeft = "40px";
                                    },
                                    onMouseLeave: (e)=>{
                                        e.currentTarget.style.borderLeftColor = "rgba(84,131,179,0.25)";
                                        e.currentTarget.style.paddingLeft = "32px";
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                display: "block",
                                                fontFamily: f.heading,
                                                fontSize: "56px",
                                                fontWeight: 400,
                                                color: "#FFFFFF",
                                                lineHeight: 1,
                                                marginBottom: "8px"
                                            },
                                            children: stat.number
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 207,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                display: "block",
                                                fontFamily: f.body,
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                color: "#7DA0CA",
                                                marginBottom: "6px"
                                            },
                                            children: stat.label
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 218,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                display: "block",
                                                fontFamily: f.body,
                                                fontSize: "13px",
                                                color: "rgba(255,255,255,0.3)",
                                                lineHeight: 1.5
                                            },
                                            children: stat.desc
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 228,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, stat.label, true, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 189,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 183,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/HomepageClient.tsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    backgroundColor: "#F8FBFF"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: "1200px",
                        margin: "0 auto",
                        padding: "96px 40px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "space-between",
                                marginBottom: "48px",
                                flexWrap: "wrap",
                                gap: "16px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: overline("#5483B3"),
                                            children: "CAPABILITIES"
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 260,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: {
                                                fontFamily: f.heading,
                                                fontSize: "clamp(26px, 3.5vw, 40px)",
                                                fontWeight: 400,
                                                color: "#021024",
                                                lineHeight: 1.1,
                                                letterSpacing: "-0.02em",
                                                margin: 0
                                            },
                                            children: "What We Do"
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 261,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 259,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/services",
                                    style: {
                                        fontFamily: f.body,
                                        fontSize: "13px",
                                        color: "#5483B3",
                                        textDecoration: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        paddingBottom: "4px",
                                        borderBottom: "1px solid rgba(84,131,179,0.3)"
                                    },
                                    children: "View all 10 capabilities →"
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 273,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 251,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                borderTop: "1px solid #E2E8F0"
                            },
                            children: FEATURED_CAPABILITIES.map((cap)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: cap.href,
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "28px 0",
                                        borderBottom: "1px solid #E2E8F0",
                                        textDecoration: "none",
                                        gap: "24px",
                                        transition: "padding-left 0.2s ease, background 0.2s ease",
                                        position: "relative"
                                    },
                                    onMouseEnter: (e)=>{
                                        e.currentTarget.style.paddingLeft = "16px";
                                        const n = e.currentTarget.querySelector(".cap-name");
                                        const d = e.currentTarget.querySelector(".cap-desc");
                                        const a = e.currentTarget.querySelector(".cap-arrow");
                                        const b = e.currentTarget.querySelector(".cap-bar");
                                        if (n) n.style.color = "#5483B3";
                                        if (d) d.style.color = "#4A5568";
                                        if (a) {
                                            a.style.opacity = "1";
                                            a.style.transform = "translateX(4px)";
                                        }
                                        if (b) b.style.height = "100%";
                                    },
                                    onMouseLeave: (e)=>{
                                        e.currentTarget.style.paddingLeft = "0";
                                        const n = e.currentTarget.querySelector(".cap-name");
                                        const d = e.currentTarget.querySelector(".cap-desc");
                                        const a = e.currentTarget.querySelector(".cap-arrow");
                                        const b = e.currentTarget.querySelector(".cap-bar");
                                        if (n) n.style.color = "#021024";
                                        if (d) d.style.color = "#6B7280";
                                        if (a) {
                                            a.style.opacity = "0";
                                            a.style.transform = "translateX(0)";
                                        }
                                        if (b) b.style.height = "0%";
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "cap-bar",
                                            style: {
                                                position: "absolute",
                                                left: 0,
                                                top: 0,
                                                width: "2px",
                                                height: "0%",
                                                backgroundColor: "#5483B3",
                                                transition: "height 0.2s ease"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 328,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: f.body,
                                                fontSize: "13px",
                                                color: "#9CA3AF",
                                                flexShrink: 0,
                                                width: "32px"
                                            },
                                            children: cap.num
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 339,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                flex: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "cap-name",
                                                    style: {
                                                        display: "block",
                                                        fontFamily: f.heading,
                                                        fontSize: "clamp(17px, 2vw, 22px)",
                                                        fontWeight: 400,
                                                        color: "#021024",
                                                        marginBottom: "5px",
                                                        transition: "color 0.2s ease"
                                                    },
                                                    children: cap.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomepageClient.tsx",
                                                    lineNumber: 351,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "cap-desc",
                                                    style: {
                                                        display: "block",
                                                        fontFamily: f.body,
                                                        fontSize: "14px",
                                                        color: "#6B7280",
                                                        lineHeight: 1.5,
                                                        transition: "color 0.2s ease"
                                                    },
                                                    children: cap.desc
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomepageClient.tsx",
                                                    lineNumber: 362,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 350,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "cap-arrow",
                                            style: {
                                                fontSize: "20px",
                                                color: "#5483B3",
                                                opacity: 0,
                                                flexShrink: 0,
                                                transition: "opacity 0.2s ease, transform 0.2s ease"
                                            },
                                            "aria-hidden": "true",
                                            children: "→"
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 375,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, cap.href, true, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 291,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 289,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/HomepageClient.tsx",
                    lineNumber: 248,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    backgroundColor: "#021024"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: "1200px",
                        margin: "0 auto",
                        padding: "96px 40px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "space-between",
                                marginBottom: "48px",
                                flexWrap: "wrap",
                                gap: "16px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: overline(),
                                            children: "LATEST THINKING"
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 408,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: {
                                                fontFamily: f.heading,
                                                fontSize: "clamp(26px, 3.5vw, 40px)",
                                                fontWeight: 400,
                                                color: "#FFFFFF",
                                                lineHeight: 1.1,
                                                letterSpacing: "-0.02em",
                                                margin: 0,
                                                maxWidth: "520px"
                                            },
                                            children: "Ideas shaping tomorrow's institutions."
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 409,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 407,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/insights",
                                    style: {
                                        fontFamily: f.body,
                                        fontSize: "13px",
                                        color: "#5483B3",
                                        textDecoration: "none",
                                        paddingBottom: "4px",
                                        borderBottom: "1px solid rgba(84,131,179,0.3)"
                                    },
                                    children: "Explore all insights →"
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 422,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 399,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: `/insights/${feat.slug}`,
                            style: {
                                display: "block",
                                backgroundColor: "#052659",
                                borderLeft: "4px solid #5483B3",
                                padding: "48px",
                                textDecoration: "none",
                                marginBottom: "2px",
                                transition: "background 0.2s ease, border-color 0.2s ease"
                            },
                            onMouseEnter: (e)=>{
                                e.currentTarget.style.backgroundColor = "#0a3070";
                                e.currentTarget.style.borderLeftColor = "#7DA0CA";
                            },
                            onMouseLeave: (e)=>{
                                e.currentTarget.style.backgroundColor = "#052659";
                                e.currentTarget.style.borderLeftColor = "#5483B3";
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: "48px",
                                    flexWrap: "wrap",
                                    alignItems: "flex-start"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            flex: "1 1 300px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: overline("#5483B3"),
                                                children: feat.category
                                            }, void 0, false, {
                                                fileName: "[project]/app/HomepageClient.tsx",
                                                lineNumber: 454,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontFamily: f.heading,
                                                    fontSize: "clamp(20px, 2.5vw, 30px)",
                                                    fontWeight: 400,
                                                    color: "#FFFFFF",
                                                    lineHeight: 1.25,
                                                    marginBottom: "16px",
                                                    letterSpacing: "-0.01em"
                                                },
                                                children: feat.title
                                            }, void 0, false, {
                                                fileName: "[project]/app/HomepageClient.tsx",
                                                lineNumber: 455,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/HomepageClient.tsx",
                                        lineNumber: 453,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            flex: "1 1 280px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontFamily: f.body,
                                                    fontSize: "15px",
                                                    color: "rgba(255,255,255,0.5)",
                                                    lineHeight: 1.75,
                                                    marginBottom: "24px"
                                                },
                                                children: feat.excerpt
                                            }, void 0, false, {
                                                fileName: "[project]/app/HomepageClient.tsx",
                                                lineNumber: 468,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: f.body,
                                                    fontSize: "14px",
                                                    color: "#7DA0CA",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "6px"
                                                },
                                                children: "Read article →"
                                            }, void 0, false, {
                                                fileName: "[project]/app/HomepageClient.tsx",
                                                lineNumber: 477,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/HomepageClient.tsx",
                                        lineNumber: 467,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/HomepageClient.tsx",
                                lineNumber: 452,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 435,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                                gap: "2px"
                            },
                            children: supp.map((ins)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/insights/${ins.slug}`,
                                    style: {
                                        display: "block",
                                        backgroundColor: "rgba(255,255,255,0.03)",
                                        padding: "28px 32px",
                                        textDecoration: "none",
                                        borderLeft: "1px solid rgba(84,131,179,0.15)",
                                        transition: "background 0.2s ease"
                                    },
                                    onMouseEnter: (e)=>{
                                        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                                        const t = e.currentTarget.querySelector(".ins-t");
                                        if (t) t.style.color = "#7DA0CA";
                                    },
                                    onMouseLeave: (e)=>{
                                        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
                                        const t = e.currentTarget.querySelector(".ins-t");
                                        if (t) t.style.color = "#FFFFFF";
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                ...overline("#5483B3"),
                                                marginBottom: "10px"
                                            },
                                            children: ins.category
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 516,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ins-t",
                                            style: {
                                                fontFamily: f.heading,
                                                fontSize: "17px",
                                                fontWeight: 400,
                                                color: "#FFFFFF",
                                                lineHeight: 1.4,
                                                display: "block",
                                                transition: "color 0.2s ease"
                                            },
                                            children: ins.title
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 517,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, ins._id, true, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 498,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 492,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/HomepageClient.tsx",
                    lineNumber: 396,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 395,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    backgroundColor: "#FFFFFF"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: "1200px",
                        margin: "0 auto",
                        padding: "96px 40px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "space-between",
                                marginBottom: "48px",
                                flexWrap: "wrap",
                                gap: "16px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: overline("#5483B3"),
                                            children: "SECTORS"
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 552,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: {
                                                fontFamily: f.heading,
                                                fontSize: "clamp(26px, 3.5vw, 40px)",
                                                fontWeight: 400,
                                                color: "#021024",
                                                lineHeight: 1.1,
                                                letterSpacing: "-0.02em",
                                                margin: 0
                                            },
                                            children: "Industries We Serve"
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 553,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 551,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/industries",
                                    style: {
                                        fontFamily: f.body,
                                        fontSize: "13px",
                                        color: "#5483B3",
                                        textDecoration: "none",
                                        paddingBottom: "4px",
                                        borderBottom: "1px solid rgba(84,131,179,0.3)"
                                    },
                                    children: "View all 11 industries →"
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 565,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 543,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: "1px",
                                backgroundColor: "#E2E8F0"
                            },
                            children: FEATURED_INDUSTRIES.map((ind)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: ind.href,
                                    style: {
                                        display: "flex",
                                        flexDirection: "column",
                                        padding: "40px 36px",
                                        backgroundColor: "#FFFFFF",
                                        textDecoration: "none",
                                        minHeight: "200px",
                                        transition: "background 0.2s ease",
                                        position: "relative",
                                        overflow: "hidden"
                                    },
                                    onMouseEnter: (e)=>{
                                        e.currentTarget.style.backgroundColor = "#F8FBFF";
                                        const n = e.currentTarget.querySelector(".ind-name");
                                        const a = e.currentTarget.querySelector(".ind-arrow");
                                        const bar = e.currentTarget.querySelector(".ind-bar");
                                        if (n) n.style.color = "#5483B3";
                                        if (a) a.style.transform = "translateX(4px)";
                                        if (bar) bar.style.width = "100%";
                                    },
                                    onMouseLeave: (e)=>{
                                        e.currentTarget.style.backgroundColor = "#FFFFFF";
                                        const n = e.currentTarget.querySelector(".ind-name");
                                        const a = e.currentTarget.querySelector(".ind-arrow");
                                        const bar = e.currentTarget.querySelector(".ind-bar");
                                        if (n) n.style.color = "#021024";
                                        if (a) a.style.transform = "translateX(0)";
                                        if (bar) bar.style.width = "0%";
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "ind-bar",
                                            style: {
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                height: "2px",
                                                width: "0%",
                                                backgroundColor: ind.accent,
                                                transition: "width 0.3s ease"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 616,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: f.body,
                                                fontSize: "11px",
                                                color: "#9CA3AF",
                                                marginBottom: "16px"
                                            },
                                            children: ind.num
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 626,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ind-name",
                                            style: {
                                                fontFamily: f.heading,
                                                fontSize: "22px",
                                                fontWeight: 400,
                                                color: "#021024",
                                                lineHeight: 1.3,
                                                marginBottom: "10px",
                                                flex: 1,
                                                transition: "color 0.2s ease"
                                            },
                                            children: ind.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 634,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: f.body,
                                                fontSize: "13px",
                                                color: "#6B7280",
                                                lineHeight: 1.5,
                                                marginBottom: "24px"
                                            },
                                            children: ind.desc
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 646,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ind-arrow",
                                            style: {
                                                fontSize: "14px",
                                                color: "#5483B3",
                                                transition: "transform 0.2s ease",
                                                display: "block"
                                            },
                                            "aria-hidden": "true",
                                            children: "→"
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 655,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, ind.href, true, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 585,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 578,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/HomepageClient.tsx",
                    lineNumber: 540,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 539,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    background: "linear-gradient(160deg, #021024 0%, #052659 50%, #021024 100%)",
                    padding: "120px 40px",
                    textAlign: "center"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: "600px",
                        margin: "0 auto"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                ...overline("rgba(125,160,202,0.5)"),
                                textAlign: "center"
                            },
                            children: "NEXT STEP"
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 680,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontFamily: f.heading,
                                fontSize: "clamp(28px, 4vw, 44px)",
                                fontWeight: 400,
                                color: "#FFFFFF",
                                lineHeight: 1.15,
                                letterSpacing: "-0.02em",
                                marginBottom: "20px"
                            },
                            children: "Begin a Conversation With Our Advisory Team."
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 683,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontFamily: f.body,
                                fontSize: "17px",
                                fontWeight: 300,
                                color: "rgba(255,255,255,0.5)",
                                lineHeight: 1.75,
                                marginBottom: "40px",
                                maxWidth: "480px",
                                margin: "0 auto 40px"
                            },
                            children: "Every engagement begins with a structured diagnostic conversation — before we propose anything."
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 694,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/contact",
                            style: {
                                display: "inline-block",
                                backgroundColor: "#5483B3",
                                color: "#FFFFFF",
                                padding: "16px 48px",
                                borderRadius: "4px",
                                fontFamily: f.body,
                                fontSize: "13px",
                                fontWeight: 500,
                                letterSpacing: "2px",
                                textTransform: "uppercase",
                                textDecoration: "none",
                                marginBottom: "16px"
                            },
                            children: "Schedule an Introduction"
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 709,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: "16px"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/about",
                                style: {
                                    fontFamily: f.body,
                                    fontSize: "13px",
                                    color: "rgba(125,160,202,0.4)",
                                    textDecoration: "none"
                                },
                                children: "Or explore our firm overview →"
                            }, void 0, false, {
                                fileName: "[project]/app/HomepageClient.tsx",
                                lineNumber: 728,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 727,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/HomepageClient.tsx",
                    lineNumber: 679,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 674,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c = HomepageClient;
var _c;
__turbopack_context__.k.register(_c, "HomepageClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_062zswb._.js.map