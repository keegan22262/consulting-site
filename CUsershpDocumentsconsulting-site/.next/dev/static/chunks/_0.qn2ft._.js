(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/breakpoints.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BpCtx",
    ()=>BpCtx,
    "useBp",
    ()=>useBp,
    "useBreakpoint",
    ()=>useBreakpoint,
    "useResponsiveValue",
    ()=>useResponsiveValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
const MOBILE_MAX = 767;
const TABLET_MAX = 1023;
const BpCtx = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])("desktop");
function resolveBreakpoint(width) {
    if (width <= MOBILE_MAX) return "mobile";
    if (width <= TABLET_MAX) return "tablet";
    return "desktop";
}
function useBreakpoint() {
    _s();
    const [bp, setBp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("desktop");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useBreakpoint.useEffect": ()=>{
            const onResize = {
                "useBreakpoint.useEffect.onResize": ()=>setBp(resolveBreakpoint(window.innerWidth))
            }["useBreakpoint.useEffect.onResize"];
            onResize();
            window.addEventListener("resize", onResize);
            return ({
                "useBreakpoint.useEffect": ()=>window.removeEventListener("resize", onResize)
            })["useBreakpoint.useEffect"];
        }
    }["useBreakpoint.useEffect"], []);
    return bp;
}
_s(useBreakpoint, "fpG6TBAJKUP5bJNpX3ui3MpJk2A=");
function useBp() {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(BpCtx);
}
_s1(useBp, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
function useResponsiveValue(desktop, tablet, mobile) {
    _s2();
    const bp = useBp();
    if (bp === "mobile") return mobile;
    if (bp === "tablet") return tablet;
    return desktop;
}
_s2(useResponsiveValue, "Rohnms4TQ5x+hj/j25IHvT+SPwI=", false, function() {
    return [
        useBp
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components-v2/layout/SearchOverlay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function isUnifiedSearchResult(value) {
    if (!value || typeof value !== "object") return false;
    const record = value;
    return (record.type === "page" || record.type === "service" || record.type === "insight") && typeof record.title === "string" && typeof record.slug === "string" && typeof record.excerpt === "string";
}
const SearchOverlay = ({ open, onClose })=>{
    _s();
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const overlayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        query: "",
        results: [],
        loading: false
    });
    const [inputFocused, setInputFocused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchOverlay.useEffect": ()=>{
            if (open && inputRef.current) {
                inputRef.current.focus();
            }
        }
    }["SearchOverlay.useEffect"], [
        open
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchOverlay.useEffect": ()=>{
            if (!open) return;
            const handleKey = {
                "SearchOverlay.useEffect.handleKey": (e)=>{
                    if (e.key === "Escape") {
                        onClose();
                    }
                }
            }["SearchOverlay.useEffect.handleKey"];
            const handleTab = {
                "SearchOverlay.useEffect.handleTab": (e)=>{
                    if (e.key !== "Tab" || !overlayRef.current) return;
                    const focusable = overlayRef.current.querySelectorAll("input, button, a, [tabindex]:not([tabindex='-1'])");
                    if (focusable.length === 0) return;
                    const first = focusable[0];
                    const last = focusable[focusable.length - 1];
                    if (e.shiftKey && document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    } else if (!e.shiftKey && document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }["SearchOverlay.useEffect.handleTab"];
            window.addEventListener("keydown", handleKey);
            window.addEventListener("keydown", handleTab);
            return ({
                "SearchOverlay.useEffect": ()=>{
                    window.removeEventListener("keydown", handleKey);
                    window.removeEventListener("keydown", handleTab);
                }
            })["SearchOverlay.useEffect"];
        }
    }["SearchOverlay.useEffect"], [
        open,
        onClose
    ]);
    const runSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SearchOverlay.useCallback[runSearch]": async (query, controller)=>{
            if (query.length < 3) {
                setState({
                    "SearchOverlay.useCallback[runSearch]": (prev)=>({
                            ...prev,
                            results: [],
                            loading: false
                        })
                }["SearchOverlay.useCallback[runSearch]"]);
                return;
            }
            setState({
                "SearchOverlay.useCallback[runSearch]": (prev)=>({
                        ...prev,
                        loading: true
                    })
            }["SearchOverlay.useCallback[runSearch]"]);
            try {
                const response = await fetch("/api/search", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        q: query
                    }),
                    signal: controller.signal
                });
                if (!response.ok) {
                    setState({
                        "SearchOverlay.useCallback[runSearch]": (prev)=>({
                                ...prev,
                                results: [],
                                loading: false
                            })
                    }["SearchOverlay.useCallback[runSearch]"]);
                    return;
                }
                const data = await response.json();
                const items = Array.isArray(data?.data) ? data.data.filter(isUnifiedSearchResult) : [];
                setState({
                    "SearchOverlay.useCallback[runSearch]": (prev)=>({
                            ...prev,
                            results: items,
                            loading: false
                        })
                }["SearchOverlay.useCallback[runSearch]"]);
            } catch (error) {
                if (error?.name === "AbortError") return;
                setState({
                    "SearchOverlay.useCallback[runSearch]": (prev)=>({
                            ...prev,
                            results: [],
                            loading: false
                        })
                }["SearchOverlay.useCallback[runSearch]"]);
            }
        }
    }["SearchOverlay.useCallback[runSearch]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchOverlay.useEffect": ()=>{
            if (!open) return;
            const controller = new AbortController();
            const handle = window.setTimeout({
                "SearchOverlay.useEffect.handle": ()=>{
                    void runSearch(state.query, controller);
                }
            }["SearchOverlay.useEffect.handle"], 180);
            return ({
                "SearchOverlay.useEffect": ()=>{
                    controller.abort();
                    window.clearTimeout(handle);
                }
            })["SearchOverlay.useEffect"];
        }
    }["SearchOverlay.useEffect"], [
        open,
        runSearch,
        state.query
    ]);
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: overlayRef,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Search",
        className: "fixed inset-0 z-60 flex items-start justify-center bg-[rgba(10,10,10,0.5)]",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-24 w-full max-w-[640px] rounded-card bg-white shadow-[0_4px_24px_rgba(0,0,0,0.12)]",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex items-center gap-3 px-5 py-4 transition-colors duration-[120ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${inputFocused ? "border-b border-[var(--a700)]" : "border-b border-neutral-200"}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchIcon, {
                            className: "text-neutral-400"
                        }, void 0, false, {
                            fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ref: inputRef,
                            type: "text",
                            value: state.query,
                            placeholder: "Search insights, services, industries...",
                            "aria-label": "Search insights, services, industries",
                            onFocus: ()=>setInputFocused(true),
                            onBlur: ()=>setInputFocused(false),
                            onChange: (e)=>setState((prev)=>({
                                        ...prev,
                                        query: e.target.value
                                    })),
                            className: "w-full border-0 bg-transparent text-[0.9375rem] text-neutral-900 outline-none"
                        }, void 0, false, {
                            fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onClose,
                            "aria-label": "Close search",
                            className: "text-neutral-400 transition-colors duration-[120ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-neutral-700",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CloseIcon, {}, void 0, false, {
                                fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
                            lineNumber: 149,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
                    lineNumber: 132,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                state.results.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-h-[360px] overflow-y-auto px-5 py-4 text-[0.75rem] text-neutral-500",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-3 flex items-center justify-between border-b border-neutral-100 pb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-[var(--a700)]",
                                    children: "Knowledge Results"
                                }, void 0, false, {
                                    fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
                                    lineNumber: 162,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[0.6875rem] text-neutral-400",
                                    children: [
                                        state.results.length,
                                        " found"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
                                    lineNumber: 165,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
                            lineNumber: 161,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1",
                            children: state.results.map((result)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: `/${result.type === "page" ? "" : `${result.type}s/`}${result.slug}`,
                                    className: "flex items-center gap-3 rounded-card px-3 py-2 text-[0.75rem] text-neutral-700 transition-colors duration-[120ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-neutral-50",
                                    onClick: onClose,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `shrink-0 rounded-[2px] px-2 py-1 text-[0.5625rem] font-semibold uppercase tracking-[0.04em] ${result.type === "insight" ? "bg-[var(--a50)] text-[var(--a700)]" : result.type === "service" ? "bg-neutral-100 text-neutral-600" : "bg-neutral-100 text-neutral-500"}`,
                                            children: result.type === "page" ? "Page" : result.type
                                        }, void 0, false, {
                                            fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
                                            lineNumber: 177,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "truncate",
                                            children: result.title
                                        }, void 0, false, {
                                            fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
                                            lineNumber: 188,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, `${result.type}-${result.slug}`, true, {
                                    fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
                                    lineNumber: 171,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
                            lineNumber: 169,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
                    lineNumber: 160,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                state.results.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-5 py-6 text-[0.75rem] text-neutral-500",
                    children: state.loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Searching..."
                    }, void 0, false, {
                        fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
                        lineNumber: 198,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-2",
                                children: "Search across the RSL knowledge network."
                            }, void 0, false, {
                                fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
                                lineNumber: 201,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[0.6875rem] text-neutral-400",
                                children: "Try: AI, digital transformation, financial services, energy, governance..."
                            }, void 0, false, {
                                fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
                                lineNumber: 202,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
                    lineNumber: 196,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
            lineNumber: 128,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
        lineNumber: 120,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SearchOverlay, "90jYQDZoDtnjJDv4oSWbX5YqAOE=");
_c = SearchOverlay;
const __TURBOPACK__default__export__ = SearchOverlay;
function SearchIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        className: `h-5 w-5 ${className ?? ""}`,
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "11",
                cy: "11",
                r: "7"
            }, void 0, false, {
                fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
                lineNumber: 219,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m20 20-3.5-3.5"
            }, void 0, false, {
                fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
        lineNumber: 218,
        columnNumber: 5
    }, this);
}
_c1 = SearchIcon;
function CloseIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        className: "h-5 w-5",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6 6l12 12"
            }, void 0, false, {
                fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
                lineNumber: 228,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6 18L18 6"
            }, void 0, false, {
                fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
                lineNumber: 229,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components-v2/layout/SearchOverlay.tsx",
        lineNumber: 227,
        columnNumber: 5
    }, this);
}
_c2 = CloseIcon;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "SearchOverlay");
__turbopack_context__.k.register(_c1, "SearchIcon");
__turbopack_context__.k.register(_c2, "CloseIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components-v2/layout/SiteHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SiteHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$breakpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/breakpoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2d$v2$2f$layout$2f$SearchOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components-v2/layout/SearchOverlay.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const NAV_LINKS_DESKTOP = [
    "Industries",
    "Services",
    "Insights",
    "Coverage",
    "About",
    "Careers",
    "Contact"
];
const NAV_LINKS_MOBILE = [
    "Industries",
    "Services",
    "About",
    "Insights",
    "Coverage",
    "Careers",
    "Contact"
];
const NAV_HREFS = {
    Industries: "/industries",
    Services: "/services",
    Insights: "/insights",
    Coverage: "/coverage",
    About: "/about",
    Careers: "/careers",
    Contact: "/contact"
};
const NAV_SUB_SERVICES = [
    {
        label: "Strategy & Corporate Transformation",
        href: "/services/strategy"
    },
    {
        label: "Digital & AI Transformation",
        href: "/services/digital"
    },
    {
        label: "Financial Advisory, Audit & Risk",
        href: "/services/finance"
    },
    {
        label: "People & Organization",
        href: "/services/people"
    },
    {
        label: "Sustainability & ESG",
        href: "/services/esg"
    },
    {
        label: "Public Sector Advisory",
        href: "/services/public"
    },
    {
        label: "Digital Communication",
        href: "/services/comms"
    },
    {
        label: "Tax & Asset Management",
        href: "/services/tax"
    },
    {
        label: "Legal & Regulatory",
        href: "/services/legal"
    },
    {
        label: "SME Development",
        href: "/services/sme"
    }
];
const NAV_SUB_INDUSTRIES = [
    {
        label: "Financial Services",
        href: "/industries/financial-services"
    },
    {
        label: "Technology, Media & Telecommunications",
        href: "/industries/technology-digital"
    },
    {
        label: "Energy & Natural Resources",
        href: "/industries/energy-resources"
    },
    {
        label: "Healthcare & Life Sciences",
        href: "/industries/healthcare-life-sciences"
    },
    {
        label: "Public Sector & Government",
        href: "/industries/public-sector-government"
    },
    {
        label: "Industrials & Manufacturing",
        href: "/industries/industrials-manufacturing"
    },
    {
        label: "Consumer & Retail",
        href: "/industries/consumer-retail"
    },
    {
        label: "Transportation & Logistics",
        href: "/industries/transport-logistics"
    },
    {
        label: "Real Estate & Infrastructure",
        href: "/industries/real-estate-infrastructure"
    },
    {
        label: "Private Capital",
        href: "/industries/private-capital"
    },
    {
        label: "Education & Social Impact",
        href: "/industries/education"
    }
];
// Add MEGA_NAV_LINKS definition
const MEGA_NAV_LINKS = new Set([
    "Industries",
    "Services",
    "Insights"
]);
const MEGA_INDUSTRIES = {
    items: NAV_SUB_INDUSTRIES,
    relatedServices: [
        {
            label: "Strategy & Corporate Transformation",
            href: "/services/strategy"
        },
        {
            label: "Digital & AI Transformation",
            href: "/services/digital"
        },
        {
            label: "Financial Advisory, Audit & Risk",
            href: "/services/finance"
        }
    ],
    relatedInsights: [
        {
            label: "AI Readiness in Banking",
            href: "/insights/ai-readiness-assessment"
        },
        {
            label: "Corridor-Led Development",
            href: "/insights/corridor-led-development"
        },
        {
            label: "Renewable Energy Transition",
            href: "/insights/renewable-energy-transition"
        }
    ]
};
const MEGA_SERVICES = {
    items: NAV_SUB_SERVICES,
    relatedIndustries: [
        {
            label: "Financial Services",
            href: "/industries/financial-services"
        },
        {
            label: "Energy & Natural Resources",
            href: "/industries/energy-resources"
        },
        {
            label: "Technology, Media & Telecom",
            href: "/industries/technology-digital"
        }
    ],
    relatedInsights: [
        {
            label: "Scaling Advisory-Led Growth",
            href: "/insights/scaling-advisory-led-growth"
        },
        {
            label: "Capital Structure Optimization",
            href: "/insights/capital-structure-optimization"
        },
        {
            label: "Digital Government Transformation",
            href: "/insights/renewable-energy-transition"
        }
    ]
};
const MEGA_INSIGHTS = {
    categories: [
        {
            label: "Latest Thinking",
            href: "/insights"
        },
        {
            label: "Industry Insights",
            href: "/insights"
        },
        {
            label: "Research Reports",
            href: "/insights"
        },
        {
            label: "Transformation Perspectives",
            href: "/insights"
        }
    ],
    featured: [
        {
            title: "AI Readiness Assessment for African Enterprises",
            category: "Technology",
            href: "/insights/ai-readiness-assessment"
        },
        {
            title: "Corridor-Led Development: Unlocking Continental Trade Routes",
            category: "Infrastructure",
            href: "/insights/corridor-led-development"
        },
        {
            title: "Renewable Energy Transition and Institutional Readiness",
            category: "Public Policy",
            href: "/insights/renewable-energy-transition"
        }
    ]
};
const HERO_SELECTOR = "[data-homepage-hero]";
function SiteHeader() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const bp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$breakpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBreakpoint"])();
    const [hoveredLink, setHoveredLink] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [megaPanel, setMegaPanel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searchOpen, setSearchOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [drawerOpen, setDrawerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [navCollapsed, setNavCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasMounted, setHasMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSolid, setIsSolid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const megaTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isHomepage = pathname === "/";
    const activePage = NAV_LINKS_DESKTOP.find((label)=>{
        const href = NAV_HREFS[label];
        if (!href) return false;
        if (href === "/") return pathname === "/";
        return pathname?.startsWith(href);
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            const raf = requestAnimationFrame({
                "SiteHeader.useEffect.raf": ()=>setHasMounted(true)
            }["SiteHeader.useEffect.raf"]);
            return ({
                "SiteHeader.useEffect": ()=>cancelAnimationFrame(raf)
            })["SiteHeader.useEffect"];
        }
    }["SiteHeader.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            const onScroll = {
                "SiteHeader.useEffect.onScroll": ()=>{
                    setNavCollapsed(window.scrollY > 0);
                }
            }["SiteHeader.useEffect.onScroll"];
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            onScroll();
            return ({
                "SiteHeader.useEffect": ()=>window.removeEventListener("scroll", onScroll)
            })["SiteHeader.useEffect"];
        }
    }["SiteHeader.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            if (!isHomepage) {
                setIsSolid(true);
                return;
            }
            const onScroll = {
                "SiteHeader.useEffect.onScroll": ()=>{
                    const heroEl = document.querySelector(HERO_SELECTOR);
                    const heroHeight = heroEl?.getBoundingClientRect().height ?? 640;
                    setIsSolid(window.scrollY > heroHeight * 0.8);
                }
            }["SiteHeader.useEffect.onScroll"];
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            onScroll();
            return ({
                "SiteHeader.useEffect": ()=>window.removeEventListener("scroll", onScroll)
            })["SiteHeader.useEffect"];
        }
    }["SiteHeader.useEffect"], [
        isHomepage
    ]);
    const isMobileViewport = hasMounted && (bp === "mobile" || bp === "tablet");
    const drawerOpenSafe = isMobileViewport || navCollapsed ? drawerOpen : false;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            if (drawerOpenSafe) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
            return ({
                "SiteHeader.useEffect": ()=>{
                    document.body.style.overflow = "";
                }
            })["SiteHeader.useEffect"];
        }
    }["SiteHeader.useEffect"], [
        drawerOpenSafe
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            const onScroll = {
                "SiteHeader.useEffect.onScroll": ()=>{
                    if (megaPanel) setMegaPanel(null);
                }
            }["SiteHeader.useEffect.onScroll"];
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            return ({
                "SiteHeader.useEffect": ()=>window.removeEventListener("scroll", onScroll)
            })["SiteHeader.useEffect"];
        }
    }["SiteHeader.useEffect"], [
        megaPanel
    ]);
    const isInsightsPage = activePage === "Insights";
    const dynamicLabel = "Schedule an Introduction";
    const dynamicTo = "/contact";
    const hamburgerClassName = "inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-lg ring-1 ring-black/10 transition-transform duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.03]";
    const handleLinkEnter = (link)=>{
        setHoveredLink(link);
        if (MEGA_NAV_LINKS.has(link)) {
            if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
            setMegaPanel(link);
        }
    };
    const handleLinkLeave = ()=>{
        setHoveredLink(null);
        if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
        megaTimeoutRef.current = setTimeout(()=>{
            setMegaPanel(null);
        }, 150);
    };
    const handleMegaPanelEnter = ()=>{
        if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    };
    const handleMegaPanelLeave = ()=>{
        if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
        megaTimeoutRef.current = setTimeout(()=>{
            setMegaPanel(null);
            setHoveredLink(null);
        }, 100);
    };
    const navTextClass = isSolid ? "text-navy-darkest/80" : "text-white/80";
    const navActiveClass = isSolid ? "border-[--a700] text-navy-darkest" : "border-blue-light text-white";
    const navHoverClass = isSolid ? "border-[--a700] text-navy-darkest" : "border-white/60 text-white";
    const iconClass = isSolid ? "text-navy-darkest/70" : "text-white/80";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                "aria-label": "Primary navigation",
                className: `fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isSolid ? "bg-[--color-paper] shadow-sm" : "bg-transparent"}`,
                style: {
                    borderBottom: isSolid ? "1px solid rgba(2,16,36,.08)" : "1px solid transparent"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: `font-[var(--font-heading)] text-[1.25rem] font-medium tracking-[0.005em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--a700] ${isSolid ? "text-navy-darkest" : "text-white"}`,
                            children: "Rill Singh"
                        }, void 0, false, {
                            fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                            lineNumber: 231,
                            columnNumber: 11
                        }, this),
                        !isMobileViewport ? navCollapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setDrawerOpen(true),
                            "aria-label": "Open menu",
                            className: hamburgerClassName,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuIcon, {}, void 0, false, {
                                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                lineNumber: 248,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                            lineNumber: 242,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-6",
                                    children: NAV_LINKS_DESKTOP.map((link)=>{
                                        const href = NAV_HREFS[link] || "#";
                                        const isActive = link === activePage;
                                        const isHovered = hoveredLink === link;
                                        const hasMega = MEGA_NAV_LINKS.has(link);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: href,
                                            onMouseEnter: ()=>handleLinkEnter(link),
                                            onMouseLeave: handleLinkLeave,
                                            className: `inline-flex items-center gap-1 border-b pb-1 text-[0.75rem] transition-colors duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isActive ? navActiveClass : isHovered ? navHoverClass : `border-transparent ${navTextClass}`}`,
                                            children: [
                                                link,
                                                hasMega && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChevronDownIcon, {}, void 0, false, {
                                                    fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                                    lineNumber: 269,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, link, true, {
                                            fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                            lineNumber: 259,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                    lineNumber: 252,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setSearchOpen(true),
                                            "aria-label": "Search",
                                            className: `inline-flex items-center justify-center transition-colors duration-300 ${iconClass}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchIcon, {}, void 0, false, {
                                                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                                lineNumber: 281,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                            lineNumber: 275,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: dynamicTo,
                                            className: `rounded-card border px-4 py-3 text-[0.75rem] font-semibold transition-colors duration-120 ${isSolid ? "border-transparent bg-terracotta text-navy-darkest hover:bg-terracotta-hover" : "border-white/90 bg-transparent text-white hover:bg-white/12"}`,
                                            children: dynamicLabel
                                        }, void 0, false, {
                                            fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                            lineNumber: 283,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                    lineNumber: 274,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                            lineNumber: 251,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setSearchOpen(true),
                                    "aria-label": "Search",
                                    className: `inline-flex items-center justify-center transition-colors duration-300 ${iconClass}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchIcon, {}, void 0, false, {
                                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                        lineNumber: 304,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                    lineNumber: 298,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setDrawerOpen(true),
                                    "aria-label": "Open menu",
                                    className: hamburgerClassName,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuIcon, {}, void 0, false, {
                                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                        lineNumber: 312,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                    lineNumber: 306,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                            lineNumber: 297,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                    lineNumber: 230,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, this),
            !isMobileViewport && megaPanel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaNavPanel, {
                activePanel: megaPanel,
                onMouseEnter: handleMegaPanelEnter,
                onMouseLeave: handleMegaPanelLeave
            }, void 0, false, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 320,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2d$v2$2f$layout$2f$SearchOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: searchOpen,
                onClose: ()=>setSearchOpen(false)
            }, void 0, false, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 327,
                columnNumber: 7
            }, this),
            (isMobileViewport || navCollapsed) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileDrawer, {
                open: drawerOpenSafe,
                onClose: ()=>setDrawerOpen(false),
                activePage: activePage
            }, void 0, false, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 330,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(SiteHeader, "vLGxOzrBZnmxivU5e01OYzWEavE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$breakpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBreakpoint"]
    ];
});
_c = SiteHeader;
function MegaNavPanel({ activePanel, onMouseEnter, onMouseLeave }) {
    const content = activePanel === "Industries" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaIndustriesContent, {}, void 0, false, {
        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
        lineNumber: 351,
        columnNumber: 7
    }, this) : activePanel === "Services" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaServicesContent, {}, void 0, false, {
        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
        lineNumber: 353,
        columnNumber: 7
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaInsightsContent, {}, void 0, false, {
        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
        lineNumber: 355,
        columnNumber: 7
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-x-0 top-16 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur",
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto w-full max-w-7xl px-6 py-8 lg:px-8",
            children: content
        }, void 0, false, {
            fileName: "[project]/components-v2/layout/SiteHeader.tsx",
            lineNumber: 364,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
        lineNumber: 359,
        columnNumber: 5
    }, this);
}
_c1 = MegaNavPanel;
function MegaIndustriesContent() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-3 gap-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaSectionLabel, {
                        label: "Industries",
                        href: "/industries"
                    }, void 0, false, {
                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                        lineNumber: 373,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex flex-col",
                        children: MEGA_INDUSTRIES.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaNavItem, {
                                label: item.label,
                                href: item.href
                            }, item.label, false, {
                                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                lineNumber: 376,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                        lineNumber: 374,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 372,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaSectionLabel, {
                        label: "Relevant Services",
                        href: "/services"
                    }, void 0, false, {
                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                        lineNumber: 381,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex flex-col",
                        children: MEGA_INDUSTRIES.relatedServices.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaNavItem, {
                                label: item.label,
                                href: item.href
                            }, item.label, false, {
                                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                lineNumber: 384,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                        lineNumber: 382,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/services",
                        className: "mt-4 inline-block text-[0.75rem] font-semibold text-[--a700]",
                        children: "View all services ->"
                    }, void 0, false, {
                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                        lineNumber: 387,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 380,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaSectionLabel, {
                        label: "Related Insights",
                        href: "/insights"
                    }, void 0, false, {
                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                        lineNumber: 392,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex flex-col",
                        children: MEGA_INDUSTRIES.relatedInsights.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaNavItem, {
                                label: item.label,
                                href: item.href
                            }, item.label, false, {
                                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                lineNumber: 395,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                        lineNumber: 393,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/insights",
                        className: "mt-4 inline-block text-[0.75rem] font-semibold text-[--a700]",
                        children: "View all insights ->"
                    }, void 0, false, {
                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                        lineNumber: 398,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 391,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
        lineNumber: 371,
        columnNumber: 5
    }, this);
}
_c2 = MegaIndustriesContent;
function MegaServicesContent() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-3 gap-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaSectionLabel, {
                        label: "Services",
                        href: "/services"
                    }, void 0, false, {
                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                        lineNumber: 410,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex flex-col",
                        children: MEGA_SERVICES.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaNavItem, {
                                label: item.label,
                                href: item.href
                            }, item.label, false, {
                                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                lineNumber: 413,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                        lineNumber: 411,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 409,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaSectionLabel, {
                        label: "Relevant Industries",
                        href: "/industries"
                    }, void 0, false, {
                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                        lineNumber: 418,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex flex-col",
                        children: MEGA_SERVICES.relatedIndustries.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaNavItem, {
                                label: item.label,
                                href: item.href
                            }, item.label, false, {
                                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                lineNumber: 421,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                        lineNumber: 419,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/industries",
                        className: "mt-4 inline-block text-[0.75rem] font-semibold text-[--a700]",
                        children: "View all industries ->"
                    }, void 0, false, {
                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                        lineNumber: 424,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 417,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaSectionLabel, {
                        label: "Related Insights",
                        href: "/insights"
                    }, void 0, false, {
                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                        lineNumber: 429,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex flex-col",
                        children: MEGA_SERVICES.relatedInsights.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaNavItem, {
                                label: item.label,
                                href: item.href
                            }, item.label, false, {
                                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                lineNumber: 432,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                        lineNumber: 430,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/insights",
                        className: "mt-4 inline-block text-[0.75rem] font-semibold text-[--a700]",
                        children: "View all insights ->"
                    }, void 0, false, {
                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                        lineNumber: 435,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 428,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
        lineNumber: 408,
        columnNumber: 5
    }, this);
}
_c3 = MegaServicesContent;
function MegaInsightsContent() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-[1fr_2fr] gap-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaSectionLabel, {
                        label: "Insights Categories",
                        href: "/insights"
                    }, void 0, false, {
                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                        lineNumber: 447,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex flex-col",
                        children: MEGA_INSIGHTS.categories.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaNavItem, {
                                label: item.label,
                                href: item.href
                            }, item.label, false, {
                                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                lineNumber: 450,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                        lineNumber: 448,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 446,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaSectionLabel, {
                        label: "Featured Insights",
                        href: "/insights"
                    }, void 0, false, {
                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                        lineNumber: 455,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 grid grid-cols-3 gap-6",
                        children: MEGA_INSIGHTS.featured.map((insight)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaInsightCard, {
                                insight: insight
                            }, insight.title, false, {
                                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                lineNumber: 458,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                        lineNumber: 456,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 454,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
        lineNumber: 445,
        columnNumber: 5
    }, this);
}
_c4 = MegaInsightsContent;
function MegaSectionLabel({ label, href }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: "block border-b border-neutral-200 pb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-[--a700]",
        children: label
    }, void 0, false, {
        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
        lineNumber: 468,
        columnNumber: 5
    }, this);
}
_c5 = MegaSectionLabel;
function MegaNavItem({ label, href }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: "block py-2 text-[0.75rem] text-neutral-700 transition-colors duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-[--a700]",
        children: label
    }, void 0, false, {
        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
        lineNumber: 479,
        columnNumber: 5
    }, this);
}
_c6 = MegaNavItem;
function MegaInsightCard({ insight }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: insight.href,
        className: "group block rounded-card border border-neutral-200 px-4 py-4 transition-colors duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-neutral-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "block text-[0.625rem] font-semibold uppercase tracking-[0.04em] text-[--a700]",
                children: insight.category
            }, void 0, false, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 498,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mt-2 block text-[0.75rem] font-medium leading-[1.4] text-neutral-900 transition-colors duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:text-[--a700]",
                children: insight.title
            }, void 0, false, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 501,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mt-3 inline-flex items-center gap-1 text-[0.75rem] font-semibold text-[--a700]",
                children: "Read ->"
            }, void 0, false, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 504,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
        lineNumber: 494,
        columnNumber: 5
    }, this);
}
_c7 = MegaInsightCard;
function MobileDrawer({ open, onClose, activePage }) {
    _s1();
    const [subMenu, setSubMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const drawerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hamburgerButtonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Focus trap and ESC
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MobileDrawer.useEffect": ()=>{
            if (!open || !drawerRef.current) return;
            const handleTab = {
                "MobileDrawer.useEffect.handleTab": (e)=>{
                    if (e.key !== "Tab" || !drawerRef.current) return;
                    const focusable = drawerRef.current.querySelectorAll("button, a, [tabindex]:not([tabindex='-1'])");
                    if (focusable.length === 0) return;
                    const first = focusable[0];
                    const last = focusable[focusable.length - 1];
                    if (e.shiftKey && document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    } else if (!e.shiftKey && document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }["MobileDrawer.useEffect.handleTab"];
            const handleEsc = {
                "MobileDrawer.useEffect.handleEsc": (e)=>{
                    if (e.key === "Escape") onClose();
                }
            }["MobileDrawer.useEffect.handleEsc"];
            document.addEventListener("keydown", handleTab);
            document.addEventListener("keydown", handleEsc);
            return ({
                "MobileDrawer.useEffect": ()=>{
                    document.removeEventListener("keydown", handleTab);
                    document.removeEventListener("keydown", handleEsc);
                }
            })["MobileDrawer.useEffect"];
        }
    }["MobileDrawer.useEffect"], [
        open,
        onClose
    ]);
    const handleClose = ()=>{
        setSubMenu(null);
        onClose();
        // Restore focus to hamburger button
        if (hamburgerButtonRef.current) {
            hamburgerButtonRef.current.focus();
        }
        document.body.style.overflow = "";
    };
    const subItems = subMenu === "Services" ? NAV_SUB_SERVICES : subMenu === "Industries" ? NAV_SUB_INDUSTRIES : subMenu === "Insights" ? MEGA_INSIGHTS.categories : [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed inset-0 z-50 bg-[rgba(10,10,10,0.4)] transition-opacity duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${open ? "opacity-100" : "pointer-events-none opacity-0"}`,
                onClick: handleClose,
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 575,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: drawerRef,
                role: "dialog",
                "aria-modal": open ? "true" : undefined,
                "aria-label": "Navigation menu",
                className: `fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-90 flex-col bg-white transition-opacity duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${open ? "opacity-100" : "pointer-events-none opacity-0"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between border-b border-neutral-200 px-6 py-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-neutral-900",
                                children: "Menu"
                            }, void 0, false, {
                                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                lineNumber: 592,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleClose,
                                "aria-label": "Close menu",
                                className: "text-neutral-900",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CloseIcon, {}, void 0, false, {
                                    fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                    lineNumber: 596,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                lineNumber: 595,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                        lineNumber: 591,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto py-4",
                        children: subMenu === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col",
                            children: NAV_LINKS_MOBILE.map((link)=>{
                                const hasSubMenu = link === "Services" || link === "Industries" || link === "Insights";
                                const isActive = link === activePage;
                                if (hasSubMenu) {
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setSubMenu(link),
                                        className: `flex w-full items-center justify-between px-6 py-4 text-left text-[0.9375rem] transition-colors duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-neutral-50 ${isActive ? "font-semibold text-[--a700]" : "text-neutral-900"}`,
                                        children: [
                                            link,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChevronRightIcon, {}, void 0, false, {
                                                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                                lineNumber: 617,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, link, true, {
                                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                        lineNumber: 608,
                                        columnNumber: 21
                                    }, this);
                                }
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: NAV_HREFS[link] || "#",
                                    onClick: handleClose,
                                    className: `block px-6 py-4 text-[0.9375rem] transition-colors duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-neutral-50 ${isActive ? "font-semibold text-[--a700]" : "text-neutral-900"}`,
                                    children: link
                                }, link, false, {
                                    fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                    lineNumber: 622,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                            lineNumber: 602,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setSubMenu(null),
                                    className: "flex items-center gap-2 px-6 pb-4 pt-3 text-[0.75rem] font-semibold uppercase tracking-[0.04em] text-[--a700]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChevronLeftIcon, {}, void 0, false, {
                                            fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                            lineNumber: 642,
                                            columnNumber: 17
                                        }, this),
                                        "Back"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                    lineNumber: 637,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-b border-neutral-200 px-6 pb-4 text-[0.9375rem] font-semibold text-neutral-900",
                                    children: subMenu
                                }, void 0, false, {
                                    fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                    lineNumber: 645,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: NAV_HREFS[subMenu] || "#",
                                    onClick: handleClose,
                                    className: "block px-6 pb-3 pt-4 text-[0.75rem] font-semibold text-[--a700]",
                                    children: [
                                        "View all ",
                                        subMenu.toLowerCase(),
                                        "->"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                    lineNumber: 648,
                                    columnNumber: 15
                                }, this),
                                subItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: item.href,
                                        onClick: handleClose,
                                        className: "block px-6 py-3 text-[0.9375rem] text-neutral-700 transition-colors duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-neutral-50",
                                        children: item.label
                                    }, item.label, false, {
                                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                                        lineNumber: 656,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                            lineNumber: 636,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                        lineNumber: 600,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-neutral-200 px-6 py-5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/contact",
                            onClick: handleClose,
                            className: "block rounded-card bg-terracotta px-6 py-3 text-center text-[0.9375rem] font-semibold text-white hover:bg-terracotta-hover",
                            children: "Schedule an Introduction"
                        }, void 0, false, {
                            fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                            lineNumber: 670,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                        lineNumber: 669,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 582,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s1(MobileDrawer, "NT+b8wmH0uXjV4/XDSmh3q/M4k8=");
_c8 = MobileDrawer;
function SearchIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        className: "h-5 w-5",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "11",
                cy: "11",
                r: "7"
            }, void 0, false, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 686,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m20 20-3.5-3.5"
            }, void 0, false, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 687,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
        lineNumber: 685,
        columnNumber: 5
    }, this);
}
_c9 = SearchIcon;
function MenuIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        className: "h-6 w-6",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 6h18"
            }, void 0, false, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 695,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 12h18"
            }, void 0, false, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 696,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 18h18"
            }, void 0, false, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 697,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
        lineNumber: 694,
        columnNumber: 5
    }, this);
}
_c10 = MenuIcon;
function CloseIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        className: "h-6 w-6",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6 6l12 12"
            }, void 0, false, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 705,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6 18L18 6"
            }, void 0, false, {
                fileName: "[project]/components-v2/layout/SiteHeader.tsx",
                lineNumber: 706,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
        lineNumber: 704,
        columnNumber: 5
    }, this);
}
_c11 = CloseIcon;
function ChevronRightIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        className: "h-4 w-4",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "m9 6 6 6-6 6"
        }, void 0, false, {
            fileName: "[project]/components-v2/layout/SiteHeader.tsx",
            lineNumber: 714,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
        lineNumber: 713,
        columnNumber: 5
    }, this);
}
_c12 = ChevronRightIcon;
function ChevronLeftIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        className: "h-4 w-4",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "m15 6-6 6 6 6"
        }, void 0, false, {
            fileName: "[project]/components-v2/layout/SiteHeader.tsx",
            lineNumber: 722,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
        lineNumber: 721,
        columnNumber: 5
    }, this);
}
_c13 = ChevronLeftIcon;
function ChevronDownIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        className: "h-4 w-4",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "m6 9 6 6 6-6"
        }, void 0, false, {
            fileName: "[project]/components-v2/layout/SiteHeader.tsx",
            lineNumber: 730,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components-v2/layout/SiteHeader.tsx",
        lineNumber: 729,
        columnNumber: 5
    }, this);
}
_c14 = ChevronDownIcon;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14;
__turbopack_context__.k.register(_c, "SiteHeader");
__turbopack_context__.k.register(_c1, "MegaNavPanel");
__turbopack_context__.k.register(_c2, "MegaIndustriesContent");
__turbopack_context__.k.register(_c3, "MegaServicesContent");
__turbopack_context__.k.register(_c4, "MegaInsightsContent");
__turbopack_context__.k.register(_c5, "MegaSectionLabel");
__turbopack_context__.k.register(_c6, "MegaNavItem");
__turbopack_context__.k.register(_c7, "MegaInsightCard");
__turbopack_context__.k.register(_c8, "MobileDrawer");
__turbopack_context__.k.register(_c9, "SearchIcon");
__turbopack_context__.k.register(_c10, "MenuIcon");
__turbopack_context__.k.register(_c11, "CloseIcon");
__turbopack_context__.k.register(_c12, "ChevronRightIcon");
__turbopack_context__.k.register(_c13, "ChevronLeftIcon");
__turbopack_context__.k.register(_c14, "ChevronDownIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components-v2/layout/SiteFooter.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SiteFooter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
;
const SITEMAP_LINKS = [
    {
        label: "Services",
        href: "/services"
    },
    {
        label: "Industries",
        href: "/industries"
    },
    {
        label: "Insights",
        href: "/insights"
    }
];
const COMPANY_LINKS = [
    {
        label: "About",
        href: "/about"
    },
    {
        label: "Careers",
        href: "/careers"
    },
    {
        label: "Contact",
        href: "/contact"
    },
    {
        label: "Coverage",
        href: "/coverage"
    }
];
const LEGAL_LINKS = [
    {
        label: "Privacy Policy",
        href: "/privacy-policy"
    },
    {
        label: "Terms of Service",
        href: "/terms"
    }
];
const navLinkClass = "font-[var(--font-body)] text-[14px] leading-[2.2] text-[#C3D0DF] transition-colors duration-300 hover:text-white hover:underline";
function SiteFooter() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "bg-navy-darkest",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto w-full max-w-[72rem] px-6 pt-20 lg:px-16",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-14 sm:flex-row sm:flex-wrap sm:[column-gap:clamp(48px,7vw,96px)] sm:[row-gap:40px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2.5 sm:flex-[0_1_260px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-[var(--font-heading)] text-[1.05rem] font-normal text-white",
                                    children: "Rill Singh Limited"
                                }, void 0, false, {
                                    fileName: "[project]/components-v2/layout/SiteFooter.tsx",
                                    lineNumber: 31,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-[var(--font-body)] text-[13px] leading-[1.6] text-blue-light",
                                    children: "Pan-African institutional advisory. Precision-led consulting for growth, transformation, and execution."
                                }, void 0, false, {
                                    fileName: "[project]/components-v2/layout/SiteFooter.tsx",
                                    lineNumber: 34,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-[var(--font-body)] text-[13px] leading-[1.6] text-blue-light",
                                    children: "Nairobi, Kenya"
                                }, void 0, false, {
                                    fileName: "[project]/components-v2/layout/SiteFooter.tsx",
                                    lineNumber: 38,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components-v2/layout/SiteFooter.tsx",
                            lineNumber: 30,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            "aria-label": "Sitemap",
                            className: "flex flex-col sm:flex-[0_0_auto]",
                            children: SITEMAP_LINKS.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: link.href,
                                    className: navLinkClass,
                                    children: link.label
                                }, link.label, false, {
                                    fileName: "[project]/components-v2/layout/SiteFooter.tsx",
                                    lineNumber: 46,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components-v2/layout/SiteFooter.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            "aria-label": "Company",
                            className: "flex flex-col sm:flex-[0_0_auto]",
                            children: COMPANY_LINKS.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: link.href,
                                    className: navLinkClass,
                                    children: link.label
                                }, link.label, false, {
                                    fileName: "[project]/components-v2/layout/SiteFooter.tsx",
                                    lineNumber: 55,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components-v2/layout/SiteFooter.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1.5 sm:ml-auto sm:flex-[0_0_auto]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mb-1 font-[var(--font-body)] text-[12px] font-semibold uppercase tracking-[0.1em] text-blue-light",
                                    children: "Follow us"
                                }, void 0, false, {
                                    fileName: "[project]/components-v2/layout/SiteFooter.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "https://www.linkedin.com/company/rill-singh-limited",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: navLinkClass,
                                    children: "LinkedIn"
                                }, void 0, false, {
                                    fileName: "[project]/components-v2/layout/SiteFooter.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "https://wa.me/254793995142",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: navLinkClass,
                                    children: "WhatsApp"
                                }, void 0, false, {
                                    fileName: "[project]/components-v2/layout/SiteFooter.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components-v2/layout/SiteFooter.tsx",
                            lineNumber: 62,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components-v2/layout/SiteFooter.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-20 flex flex-col gap-4 border-t border-white/12 py-10 sm:flex-row sm:items-center sm:justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-[var(--font-body)] text-[13px] text-blue-light",
                            children: [
                                "© ",
                                new Date().getFullYear(),
                                " Rill Singh Limited"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components-v2/layout/SiteFooter.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-5",
                            children: LEGAL_LINKS.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: link.href,
                                    className: "font-[var(--font-body)] text-[13px] text-blue-light transition-colors duration-300 hover:text-white",
                                    children: link.label
                                }, link.label, false, {
                                    fileName: "[project]/components-v2/layout/SiteFooter.tsx",
                                    lineNumber: 92,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components-v2/layout/SiteFooter.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components-v2/layout/SiteFooter.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components-v2/layout/SiteFooter.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components-v2/layout/SiteFooter.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = SiteFooter;
var _c;
__turbopack_context__.k.register(_c, "SiteFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components-v2/ui/PreviewBanner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PreviewBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function PreviewBanner({ active = false, onExit }) {
    _s();
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (!active) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "fixed",
            bottom: "16px",
            left: "50%",
            marginLeft: "-160px",
            width: "320px",
            zIndex: 9999,
            backgroundColor: "var(--o600)",
            color: "#FFFFFF",
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-caption)",
            fontWeight: 600,
            padding: "12px 20px",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: "Preview Mode Active"
            }, void 0, false, {
                fileName: "[project]/components-v2/ui/PreviewBanner.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onExit,
                onMouseEnter: ()=>setHovered(true),
                onMouseLeave: ()=>setHovered(false),
                disabled: !onExit,
                style: {
                    fontFamily: "var(--font-primary)",
                    fontSize: "var(--text-caption)",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    backgroundColor: hovered ? "rgba(255,255,255,0.2)" : "transparent",
                    border: "1px solid rgba(255,255,255,0.5)",
                    borderRadius: "4px",
                    padding: "4px 12px",
                    cursor: onExit ? "pointer" : "default",
                    transition: "background-color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
                    opacity: onExit ? 1 : 0.6
                },
                children: "Exit"
            }, void 0, false, {
                fileName: "[project]/components-v2/ui/PreviewBanner.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components-v2/ui/PreviewBanner.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_s(PreviewBanner, "V8YbV+gTZxGliGj1g0fftBlvsq4=");
_c = PreviewBanner;
var _c;
__turbopack_context__.k.register(_c, "PreviewBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/ClientLayout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClientLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2d$v2$2f$layout$2f$SiteHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components-v2/layout/SiteHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2d$v2$2f$layout$2f$SiteFooter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components-v2/layout/SiteFooter.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2d$v2$2f$ui$2f$PreviewBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components-v2/ui/PreviewBanner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function ClientLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2d$v2$2f$layout$2f$SiteHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/ClientLayout.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2d$v2$2f$layout$2f$SiteFooter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/ClientLayout.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PreviewBannerGate, {}, void 0, false, {
                    fileName: "[project]/app/ClientLayout.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/ClientLayout.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c = ClientLayout;
function PreviewBannerGate() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const previewActive = searchParams?.get("preview") === "true";
    const handleExitPreview = ()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const url = new URL(window.location.href);
        url.searchParams.delete("preview");
        router.replace(`${url.pathname}${url.search}${url.hash}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2d$v2$2f$ui$2f$PreviewBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        active: previewActive,
        onExit: handleExitPreview
    }, void 0, false, {
        fileName: "[project]/app/ClientLayout.tsx",
        lineNumber: 33,
        columnNumber: 10
    }, this);
}
_s(PreviewBannerGate, "A57ZQKsSKoH4xi482IWIv7kTTfs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c1 = PreviewBannerGate;
var _c, _c1;
__turbopack_context__.k.register(_c, "ClientLayout");
__turbopack_context__.k.register(_c1, "PreviewBannerGate");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0.qn2ft._.js.map