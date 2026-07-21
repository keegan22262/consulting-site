(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components-v2/ui/DiamondMotif.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DiamondMotif
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function DiamondMotif({ left, top, size, animate = false, playing = true }) {
    const ring = (scale, border)=>({
            position: "absolute",
            left,
            top,
            width: `calc(${size} * ${scale})`,
            aspectRatio: "1",
            transform: "translate(-50%, -50%) rotate(45deg)",
            border
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": "true",
                style: ring(1, "1px solid rgba(125,160,202,.14)")
            }, void 0, false, {
                fileName: "[project]/components-v2/ui/DiamondMotif.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": "true",
                style: ring(0.75, "1px solid rgba(125,160,202,.18)")
            }, void 0, false, {
                fileName: "[project]/components-v2/ui/DiamondMotif.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": "true",
                style: ring(0.52, "1px solid rgba(125,160,202,.22)")
            }, void 0, false, {
                fileName: "[project]/components-v2/ui/DiamondMotif.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": "true",
                style: ring(0.33, "1.5px solid rgba(193,122,70,.7)"),
                className: animate ? "animate-diamond-drift" : undefined,
                "data-playing": animate ? playing ? "true" : "false" : undefined
            }, void 0, false, {
                fileName: "[project]/components-v2/ui/DiamondMotif.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c = DiamondMotif;
var _c;
__turbopack_context__.k.register(_c, "DiamondMotif");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/motion/useReducedMotionPreference.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useReducedMotionPreference",
    ()=>useReducedMotionPreference
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const QUERY = "(prefers-reduced-motion: reduce)";
function useReducedMotionPreference() {
    _s();
    const subscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useReducedMotionPreference.useCallback[subscribe]": (onStoreChange)=>{
            const mql = window.matchMedia(QUERY);
            mql.addEventListener("change", onStoreChange);
            return ({
                "useReducedMotionPreference.useCallback[subscribe]": ()=>mql.removeEventListener("change", onStoreChange)
            })["useReducedMotionPreference.useCallback[subscribe]"];
        }
    }["useReducedMotionPreference.useCallback[subscribe]"], []);
    const getSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useReducedMotionPreference.useCallback[getSnapshot]": ()=>window.matchMedia(QUERY).matches
    }["useReducedMotionPreference.useCallback[getSnapshot]"], []);
    const getServerSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useReducedMotionPreference.useCallback[getServerSnapshot]": ()=>false
    }["useReducedMotionPreference.useCallback[getServerSnapshot]"], []);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribe, getSnapshot, getServerSnapshot);
}
_s(useReducedMotionPreference, "6LuqoTGNP6CEJsrpj4YvJl3qomg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/sections/services/data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// FALLBACK DATA — used only when Sanity CMS returns empty. Do not edit for live content.
// Sanity type: service
// Copy preserved verbatim from Figma reference (figma-reference/rslservices.tsx).
__turbopack_context__.s([
    "CLUSTERS",
    ()=>CLUSTERS,
    "SERVICES",
    ()=>SERVICES
]);
const CLUSTERS = [
    {
        id: "strategy-transformation",
        label: "Strategy & transformation"
    },
    {
        id: "finance-risk-regulation",
        label: "Finance, risk & regulation"
    },
    {
        id: "sustainability-public",
        label: "Sustainability & public impact"
    },
    {
        id: "growth-communications",
        label: "Growth & communications"
    }
];
const SERVICES = [
    {
        slug: "strategy",
        cluster: "strategy-transformation",
        title: "Strategy & Corporate Transformation",
        focusAreas: "Corporate strategy, M&A advisory, organizational transformation, and growth strategy.",
        approach: "We guide businesses in navigating complex challenges, offering strategic development and ongoing support for seamless execution and measurable results."
    },
    {
        slug: "digital",
        cluster: "strategy-transformation",
        title: "Digital & AI Transformation",
        focusAreas: "Digital strategy, AI implementation, automation, cloud migration, and cybersecurity.",
        approach: "We integrate advanced technology solutions to optimize operations, ensuring businesses stay ahead of the digital curve."
    },
    {
        slug: "finance",
        cluster: "finance-risk-regulation",
        title: "Financial Advisory, Audit & Risk Management",
        focusAreas: "Regulatory compliance, risk assessment, financial restructuring, and forensic accounting.",
        approach: "We provide expert advice on navigating complex financial landscapes, ensuring sustainability and growth."
    },
    {
        slug: "people",
        cluster: "strategy-transformation",
        title: "People & Organization Consulting",
        focusAreas: "Talent management, leadership development, organizational design, and change management.",
        approach: "We foster organizational growth by optimizing talent and leadership, ensuring businesses are agile and adaptive to change."
    },
    {
        slug: "esg",
        cluster: "sustainability-public",
        title: "Sustainability & ESG Consulting",
        focusAreas: "Sustainable business practices, ESG reporting, climate risk assessment, and circular economy strategies.",
        approach: "We help businesses embed sustainability into their core operations, meeting regulatory standards and driving environmental impact."
    },
    {
        slug: "public",
        cluster: "sustainability-public",
        title: "Public Sector & Government Advisory",
        focusAreas: "Policy analysis, public sector reform, digital government transformation, and public-private partnerships.",
        approach: "We assist governments and institutions in modernizing operations, improving governance, and fostering strategic partnerships."
    },
    {
        slug: "comms",
        cluster: "growth-communications",
        title: "Digital Communication & Social Media Consulting",
        focusAreas: "Social media strategy, digital brand management, content marketing, and influencer marketing.",
        approach: "We craft tailored digital strategies that enhance engagement, boost brand visibility, and drive growth."
    },
    {
        slug: "tax",
        cluster: "finance-risk-regulation",
        title: "Tax Advisory & Asset Management",
        focusAreas: "Tax compliance, international tax planning, wealth management, estate planning, and investment strategies.",
        approach: "We offer insightful and strategic tax planning solutions to optimize wealth management and ensure financial stability."
    },
    {
        slug: "legal",
        cluster: "finance-risk-regulation",
        title: "Legal & Regulatory Compliance Consulting",
        focusAreas: "Corporate governance, local regulatory compliance, international trade law, intellectual property, and labor law advisory.",
        approach: "We provide legal and regulatory expertise to ensure compliance and mitigate risk."
    },
    {
        slug: "sme",
        cluster: "growth-communications",
        title: "SME Development & Growth Consulting",
        focusAreas: "Business incubation, financing for SMEs, market entry strategies, operational efficiency, and export facilitation.",
        approach: "We help SMEs scale and expand through strategic planning, funding facilitation, and operational optimization."
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/sections/industries/data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ANALYTICAL_BLOCKS",
    ()=>ANALYTICAL_BLOCKS,
    "ANALYTICAL_IMAGES",
    ()=>ANALYTICAL_IMAGES,
    "BORDER_RADIUS",
    ()=>BORDER_RADIUS,
    "C",
    ()=>C,
    "F",
    ()=>F,
    "FILTER_CATEGORIES",
    ()=>FILTER_CATEGORIES,
    "HERO_BACKGROUNDS",
    ()=>HERO_BACKGROUNDS,
    "INDUSTRIES",
    ()=>INDUSTRIES,
    "INDUSTRY_IMAGES",
    ()=>INDUSTRY_IMAGES,
    "INSIGHT_CARD_H",
    ()=>INSIGHT_CARD_H,
    "INSIGHT_CAROUSEL_EASING",
    ()=>INSIGHT_CAROUSEL_EASING,
    "MAX_WIDTH",
    ()=>MAX_WIDTH,
    "M_CURVE",
    ()=>M_CURVE,
    "M_DUR",
    ()=>M_DUR,
    "PHILOSOPHY_CARDS",
    ()=>PHILOSOPHY_CARDS,
    "PHILOSOPHY_IMAGES",
    ()=>PHILOSOPHY_IMAGES,
    "SECTOR_INSIGHTS",
    ()=>SECTOR_INSIGHTS,
    "SECTOR_INSIGHT_IMAGES",
    ()=>SECTOR_INSIGHT_IMAGES,
    "TRANSFORMATION_FORCES",
    ()=>TRANSFORMATION_FORCES
]);
const C = {
    white: "#FFFFFF",
    a900: "#0C1C2E",
    a700: "#1B3A5C",
    a200: "#CBD7E6",
    n900: "#0F1720",
    n700: "#334155",
    n600: "#475569",
    n500: "#64748B",
    n400: "#94A3B8",
    n200: "#E2E8F0",
    n100: "#F1F5F9",
    n50: "#F8FAFC"
};
const F = "var(--font-dm-sans), 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const M_DUR = "200ms";
const M_CURVE = "ease";
const BORDER_RADIUS = "8px";
const MAX_WIDTH = "1280px";
const INSIGHT_CAROUSEL_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const INSIGHT_CARD_H = 520;
const HERO_BACKGROUNDS = [
    "/images/industries/hero/hero-boardroom.jpg",
    "/images/industries/hero/hero-bridge-infrastructure.jpg",
    "/images/industries/hero/hero-digital-command-center.jpg",
    "/images/industries/hero/hero-city-skyline.jpg"
];
const PHILOSOPHY_IMAGES = [
    "/images/industries/philosophy/energy-grid.jpg",
    "/images/industries/philosophy/manufacturing-plant.jpg",
    "/images/industries/philosophy/logistics-port.jpg",
    "/images/industries/philosophy/consulting-office.jpg"
];
const ANALYTICAL_IMAGES = [
    "/images/industries/analytical/financial-data-modeling.jpg",
    "/images/industries/analytical/infrastructure-blueprints.jpg",
    "/images/industries/analytical/digital-command-center.jpg"
];
const INDUSTRY_IMAGES = {
    "financial-services": "/images/industries/sectors/financial-services.jpg",
    "technology-digital": "/images/industries/sectors/technology-digital.jpg",
    "energy-resources": "/images/industries/sectors/energy-resources.jpg",
    "healthcare-life-sciences": "/images/industries/sectors/healthcare-life-sciences.jpg",
    "real-estate-infrastructure": "/images/industries/sectors/real-estate-infrastructure.jpg",
    "public-sector-government": "/images/industries/sectors/public-sector-government.jpg",
    "industrials-manufacturing": "/images/industries/sectors/industrials-manufacturing.jpg",
    "consumer-retail": "/images/industries/sectors/consumer-retail.jpg",
    "transport-logistics": "/images/industries/sectors/transport-logistics.jpg",
    "private-capital": "/images/industries/sectors/private-capital.jpg",
    education: "/images/industries/sectors/education.jpg"
};
const SECTOR_INSIGHT_IMAGES = {
    technology: "/images/insights/sectors/technology.jpg",
    finance: "/images/insights/sectors/finance.jpg",
    infrastructure: "/images/insights/sectors/infrastructure.jpg",
    publicPolicy: "/images/insights/sectors/public-policy.jpg",
    strategy: "/images/insights/sectors/strategy.jpg"
};
const INDUSTRIES = [
    {
        id: "financial-services",
        title: "Financial Services",
        description: "We support banks, capital markets players, insurers, asset/wealth managers, and fintechs as they modernize platforms, strengthen risk and compliance, and build better digital customer experiences.",
        challenge: "Navigating regulatory complexity while modernizing legacy platforms and building institutional-grade digital infrastructure.",
        capabilities: [
            "Strategy & Corporate Transformation",
            "Digital & AI Transformation",
            "Financial Advisory, Audit & Risk Management",
            "Tax Advisory & Asset Management",
            "Legal & Regulatory Compliance Consulting"
        ],
        regulatoryContext: "Banking; Capital Markets; Insurance; Asset/Wealth Management; Fintech"
    },
    {
        id: "healthcare-life-sciences",
        title: "Healthcare & Life Sciences",
        description: "We help healthcare providers and payers improve outcomes, access, and affordability through operational excellence and digital enablement.",
        challenge: "Improving patient outcomes and system efficiency while managing regulatory burden and technology adoption gaps.",
        capabilities: [
            "Strategy & Corporate Transformation",
            "Digital & AI Transformation",
            "People & Organization Consulting",
            "Public Sector & Government Advisory",
            "Legal & Regulatory Compliance Consulting"
        ],
        regulatoryContext: "Healthcare (Providers/Payers); Pharma & Biotech; Life Sciences; MedTech"
    },
    {
        id: "energy-resources",
        title: "Energy & Natural Resources",
        description: "We partner with energy and resources organizations to improve safety, reliability, and asset performance while navigating the transition to lower-carbon systems.",
        challenge: "Balancing operational reliability and cost efficiency with the accelerating transition to sustainable energy systems.",
        capabilities: [
            "Strategy & Corporate Transformation",
            "Sustainability & ESG Consulting",
            "Financial Advisory, Audit & Risk Management",
            "Public Sector & Government Advisory",
            "Legal & Regulatory Compliance Consulting"
        ],
        regulatoryContext: "Oil & Gas; Utilities; Renewables; Power & Grids; Mining; Metals; Natural Resources"
    },
    {
        id: "industrials-manufacturing",
        title: "Industrials & Manufacturing",
        description: "We help industrial companies raise productivity, improve quality, and strengthen supply networks across increasingly complex operations.",
        challenge: "Raising throughput and margins while managing volatile input costs, supply chain disruption, and digital transformation.",
        capabilities: [
            "Strategy & Corporate Transformation",
            "Digital & AI Transformation",
            "Financial Advisory, Audit & Risk Management",
            "People & Organization Consulting",
            "SME Development & Growth Consulting"
        ],
        regulatoryContext: "Industrial Manufacturing; Industrial Products & Services; Engineering/Construction Materials; Industrial Equipment"
    },
    {
        id: "consumer-retail",
        title: "Consumer & Retail",
        description: "We support consumer-facing companies in winning market share through sharper brand strategy, revenue growth management, and omnichannel execution.",
        challenge: "Winning share in fragmented markets while responding to rapidly shifting consumer behavior and channel dynamics.",
        capabilities: [
            "Strategy & Corporate Transformation",
            "Digital & AI Transformation",
            "Digital Communication & Social Media Consulting",
            "Tax Advisory & Asset Management",
            "Financial Advisory, Audit & Risk Management"
        ],
        regulatoryContext: "Retail; Consumer Products; Consumer Goods & Services; CPG; Food & Beverage; Luxury"
    },
    {
        id: "technology-digital",
        title: "Technology, Media & Telecommunications",
        description: "We help technology, media, and telecom companies scale growth, modernize operating models, and improve unit economics in fast-moving markets.",
        challenge: "Scaling growth and retention while modernizing operations and maintaining innovation velocity.",
        capabilities: [
            "Strategy & Corporate Transformation",
            "Digital & AI Transformation",
            "People & Organization Consulting",
            "Digital Communication & Social Media Consulting",
            "SME Development & Growth Consulting"
        ],
        regulatoryContext: "Technology; Software & Platforms; High Tech; Media & Entertainment; Telecommunications; Communications"
    },
    {
        id: "transport-logistics",
        title: "Transportation & Logistics",
        description: "We support airlines, shippers, logistics providers, and travel/hospitality businesses in optimizing networks, improving service reliability, and enhancing customer experience.",
        challenge: "Maintaining dependable operations and profitability through demand volatility and network complexity.",
        capabilities: [
            "Strategy & Corporate Transformation",
            "Digital & AI Transformation",
            "Financial Advisory, Audit & Risk Management",
            "People & Organization Consulting",
            "Sustainability & ESG Consulting"
        ],
        regulatoryContext: "Transportation; Logistics; Shipping; Travel; Tourism; Hospitality"
    },
    {
        id: "public-sector-government",
        title: "Public Sector & Government",
        description: "We work with governments, agencies, and defense organizations to improve service delivery, strengthen governance, and modernize legacy systems securely.",
        challenge: "Delivering measurable citizen outcomes while modernizing governance, technology, and institutional capability.",
        capabilities: [
            "Public Sector & Government Advisory",
            "Strategy & Corporate Transformation",
            "People & Organization Consulting",
            "Sustainability & ESG Consulting",
            "Financial Advisory, Audit & Risk Management"
        ],
        regulatoryContext: "Public Sector; Government (Federal/State/Local); Defense & Security; National Security"
    },
    {
        id: "real-estate-infrastructure",
        title: "Real Estate & Infrastructure",
        description: "We help owners, investors, and operators improve the performance of real assets across the lifecycle — from planning and development to operations and portfolio strategy.",
        challenge: "Improving returns and reducing risk across complex asset lifecycles in volatile market conditions.",
        capabilities: [
            "Strategy & Corporate Transformation",
            "Financial Advisory, Audit & Risk Management",
            "Legal & Regulatory Compliance Consulting",
            "Sustainability & ESG Consulting",
            "Tax Advisory & Asset Management"
        ],
        regulatoryContext: "Real Estate; Infrastructure; Construction; Capital Projects"
    },
    {
        id: "private-capital",
        title: "Private Capital",
        description: "We support investors across the deal lifecycle — from commercial due diligence through post-merger integration, value creation, and exit readiness.",
        challenge: "Accelerating value creation across portfolio companies while maintaining diligence discipline and exit readiness.",
        capabilities: [
            "Strategy & Corporate Transformation",
            "Financial Advisory, Audit & Risk Management",
            "Digital & AI Transformation",
            "People & Organization Consulting",
            "Tax Advisory & Asset Management"
        ],
        regulatoryContext: "Private Equity; Principal Investors; Private Capital"
    },
    {
        id: "education",
        title: "Education & Social Impact",
        description: "We help education institutions and social-impact organizations sharpen strategy, improve operating models, and measure outcomes more effectively.",
        challenge: "Delivering better outcomes at scale where resources are constrained and accountability is critical.",
        capabilities: [
            "Strategy & Corporate Transformation",
            "Public Sector & Government Advisory",
            "People & Organization Consulting",
            "Digital & AI Transformation",
            "Sustainability & ESG Consulting"
        ],
        regulatoryContext: "Education; Non-Profits; Social Enterprise; Foundations; Development Organizations"
    }
];
const PHILOSOPHY_CARDS = [
    {
        title: "Regulatory Calibration",
        body: "Advisory architecture must embed the regulatory environment of each sector — translating compliance requirements into operational governance.",
        image: PHILOSOPHY_IMAGES[0]
    },
    {
        title: "Market Intelligence",
        body: "Sector-specific competitive dynamics shape strategy. We map market structures before defining advisory scope.",
        image: PHILOSOPHY_IMAGES[1]
    },
    {
        title: "Operational Maturity",
        body: "Digital readiness and operational complexity differ across industries. Our frameworks are calibrated to each sector's transformation velocity.",
        image: PHILOSOPHY_IMAGES[2]
    },
    {
        title: "Cross-Sector Transfer",
        body: "Multi-sector presence generates compounding intelligence. Patterns from one industry systematically strengthen advisory quality across all others.",
        image: PHILOSOPHY_IMAGES[3]
    }
];
const SECTOR_INSIGHTS = [
    {
        category: "Technology",
        title: "AI Readiness Assessment for African Enterprises",
        excerpt: "Evaluating organizational, data, and infrastructure readiness for AI adoption across industries with varying levels of digital maturity.",
        source: "RSL Perspectives · January 2026",
        image: SECTOR_INSIGHT_IMAGES.technology,
        slug: "ai-readiness-assessment"
    },
    {
        category: "Finance",
        title: "Capital Structure Optimization in Volatile Currency Environments",
        excerpt: "Analytical methodology for managing multi-currency exposure and debt structuring in African markets subject to exchange rate instability.",
        source: "RSL Perspectives · December 2025",
        image: SECTOR_INSIGHT_IMAGES.finance,
        slug: "capital-structure-optimization"
    },
    {
        category: "Infrastructure",
        title: "Corridor-Led Development: Unlocking Continental Trade Routes",
        excerpt: "How integrated transport and logistics corridors are reshaping intra-African trade, enabling scale economics and catalysing industrial zones.",
        source: "RSL Perspectives · November 2025",
        image: SECTOR_INSIGHT_IMAGES.infrastructure,
        slug: "corridor-led-development"
    },
    {
        category: "Public Policy",
        title: "Renewable Energy Transition and Institutional Readiness",
        excerpt: "Assessing the regulatory, financial, and operational architectures required for governments and utilities to accelerate just energy transitions.",
        source: "RSL Perspectives · October 2025",
        image: SECTOR_INSIGHT_IMAGES.publicPolicy,
        slug: "renewable-energy-transition"
    },
    {
        category: "Strategy",
        title: "Scaling Advisory-Led Growth in Sub-Saharan Africa",
        excerpt: "A framework for enterprise advisory firms positioning against global incumbents while maintaining boutique delivery quality and cultural relevance.",
        source: "RSL Perspectives · February 2026",
        image: SECTOR_INSIGHT_IMAGES.strategy,
        slug: "scaling-advisory-led-growth"
    }
];
const ANALYTICAL_BLOCKS = [
    {
        headline: "Cross-Sector Pattern Recognition",
        body: "Compliance frameworks developed for financial services inform governance architecture across healthcare, energy, and public sector engagements — accelerating implementation through proven structural templates. Our multi-sector presence generates compounding intelligence that single-industry practices cannot replicate.",
        image: ANALYTICAL_IMAGES[0]
    },
    {
        headline: "Digital Maturity Benchmarking",
        body: "Technology transformation patterns observed in digital-native sectors provide calibrated benchmarks for organizations in traditional industries navigating digital operating model transitions. We measure readiness across data infrastructure, organizational capability, and technology adoption velocity.",
        image: ANALYTICAL_IMAGES[1]
    },
    {
        headline: "Capital Allocation Discipline",
        body: "Investment governance frameworks refined in capital-intensive sectors — energy, infrastructure, financial services — transfer directly to portfolio rationalization and growth strategy across all industries. Our analytical approach connects capital decisions to measurable strategic outcomes.",
        image: ANALYTICAL_IMAGES[2]
    }
];
const TRANSFORMATION_FORCES = [
    {
        title: "Regulatory Convergence",
        body: "Cross-border regulatory harmonization is reshaping compliance architectures across financial services, healthcare, and technology — creating both complexity and opportunity for institutions with multi-jurisdictional presence."
    },
    {
        title: "Digital Infrastructure Maturity",
        body: "The gap between digital-native and traditional sectors is narrowing as cloud, AI, and automation become baseline expectations. Organizations that delay transformation face accelerating competitive disadvantage."
    },
    {
        title: "Capital Reallocation",
        body: "ESG mandates, geopolitical risk, and shifting return expectations are fundamentally altering capital flows across sectors — from energy transition investment to infrastructure modernization."
    },
    {
        title: "Operational Resilience",
        body: "Supply chain disruption, cyber threats, and climate risk have elevated operational resilience from a compliance concern to a board-level strategic imperative across all industries."
    },
    {
        title: "Geopolitical Restructuring",
        body: "Trade realignment, sanctions regimes, and regional economic integration are redrawing the map of where and how institutions operate — demanding new advisory frameworks for strategic planning."
    }
];
const FILTER_CATEGORIES = [
    {
        label: "All Industries",
        ids: []
    },
    {
        label: "Financial Systems",
        ids: [
            "financial-services",
            "private-capital"
        ]
    },
    {
        label: "Infrastructure & Energy",
        ids: [
            "energy-resources",
            "real-estate-infrastructure",
            "transport-logistics"
        ]
    },
    {
        label: "Technology & Digital",
        ids: [
            "technology-digital"
        ]
    },
    {
        label: "Public Sector",
        ids: [
            "public-sector-government",
            "education"
        ]
    },
    {
        label: "Consumer & Industrial",
        ids: [
            "consumer-retail",
            "industrials-manufacturing"
        ]
    },
    {
        label: "Healthcare & Life Sciences",
        ids: [
            "healthcare-life-sciences"
        ]
    }
];
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2d$v2$2f$ui$2f$DiamondMotif$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components-v2/ui/DiamondMotif.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$motion$2f$useReducedMotionPreference$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/motion/useReducedMotionPreference.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sections$2f$services$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/sections/services/data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sections$2f$industries$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/sections/industries/data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
/* ── Presentation-only copy that doesn't belong in the CMS fallback data ── */ const CLUSTER_ONE_LINERS = {
    "strategy-transformation": "Direction, operating models, and the digital and human systems that carry them.",
    "finance-risk-regulation": "Financial clarity and compliance that hold up under scrutiny.",
    "sustainability-public": "ESG and public-sector work that moves policy into practice.",
    "growth-communications": "Positioning and growth systems for enterprises and SMEs."
};
const SERVICE_SHORT_LABELS = {
    strategy: "Strategy",
    digital: "Digital",
    people: "People",
    finance: "Finance",
    tax: "Tax",
    legal: "Legal",
    esg: "ESG",
    public: "Public",
    sme: "SME",
    comms: "Comms"
};
const DIFFERENTIATORS = [
    {
        title: "Institutional rigor",
        body: "Analysis and governance built to withstand board, investor, and regulator scrutiny."
    },
    {
        title: "Ground truth",
        body: "Judgment formed inside the markets where you operate — not observed from a distance."
    },
    {
        title: "Execution focus",
        body: "Engagements measured by what actually changes — not by the weight of the deck."
    }
];
const FEATURED_INDUSTRY_ID = "financial-services";
const SUPPORTING_INDUSTRY_IDS = [
    "public-sector-government",
    "energy-resources",
    "industrials-manufacturing"
];
function HomepageClient({ insights }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeroSection, {}, void 0, false, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DifferentiatorsSection, {}, void 0, false, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ServiceClustersSection, {}, void 0, false, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PointOfViewSection, {}, void 0, false, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IndustriesSection, {}, void 0, false, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            insights.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InsightsSection, {
                insights: insights
            }, void 0, false, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 62,
                columnNumber: 31
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CtaBandSection, {}, void 0, false, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c = HomepageClient;
/* ════════════════════════════════════════════════════════════════════
   SECTION 1 — HERO
════════════════════════════════════════════════════════════════════ */ function HeroSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "data-homepage-hero": true,
        className: "relative bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto w-full max-w-[72rem] px-6 pt-[clamp(96px,16vh,152px)] sm:px-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center gap-[clamp(18px,2.4vw,26px)] text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-[13px] font-semibold uppercase tracking-[.14em] text-eyebrow",
                            children: "Pan-African institutional advisory"
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "max-w-[38rem] font-[var(--font-heading)] text-[clamp(2.25rem,1.55rem+3vw,4.625rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-navy-darkest",
                            children: "Institutional advisory, built for African markets."
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/HomepageClient.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto w-full max-w-[72rem] px-6 pt-[clamp(36px,5vw,56px)] sm:px-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative min-h-[clamp(420px,50vw,640px)] overflow-hidden rounded-3xl bg-[linear-gradient(155deg,#0B355E_0%,#021024_78%)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2d$v2$2f$ui$2f$DiamondMotif$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            left: "78%",
                            top: "26%",
                            size: "100%"
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute right-[clamp(24px,3vw,40px)] top-[clamp(24px,3vw,40px)] flex w-[min(28rem,80%)] flex-col gap-5 rounded-2xl bg-[--color-paper] p-[clamp(24px,3.2vw,36px)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "max-w-[30ch] text-[clamp(15px,0.3vw+14px,17px)] leading-[1.6] text-[#37424F]",
                                    children: "We advise governments, investors, and enterprises across ten disciplines and eleven sectors — with the rigor boards expect and the ground truth execution demands."
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 89,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-4 sm:gap-7",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/contact",
                                            className: "rounded-[2px] bg-terracotta px-7 py-4 text-[15px] font-semibold leading-none text-navy-darkest transition-colors hover:bg-terracotta-hover",
                                            children: "Start a conversation"
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 94,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/services",
                                            className: "inline-flex items-center gap-1.5 text-[14px] font-semibold text-eyebrow transition-transform hover:translate-x-0.5 hover:underline",
                                            children: [
                                                "Explore our services ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "aria-hidden": "true",
                                                    children: "→"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomepageClient.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 38
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 100,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 93,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 88,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/HomepageClient.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto w-full max-w-[72rem] px-6 pb-[clamp(64px,8vw,96px)] pt-[clamp(24px,3vw,32px)] sm:px-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-[12px] font-medium uppercase tracking-[.08em] text-navy-darkest/55",
                    children: "10 disciplines · 11 sectors · Nairobi"
                }, void 0, false, {
                    fileName: "[project]/app/HomepageClient.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/HomepageClient.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
_c1 = HeroSection;
/* ════════════════════════════════════════════════════════════════════
   SECTION 2 — DIFFERENTIATORS
════════════════════════════════════════════════════════════════════ */ function DifferentiatorsSection() {
    _s();
    const reducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$motion$2f$useReducedMotionPreference$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotionPreference"])();
    const [playing, setPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const isPlaying = playing && !reducedMotion;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative bg-[--color-paper]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto flex w-full max-w-[72rem] flex-wrap items-center gap-10 px-6 py-[clamp(64px,8vw,96px)] sm:gap-20 sm:px-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-w-[340px] flex-[48_1_0%] flex-col gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[13px] font-bold uppercase tracking-[.14em] text-eyebrow",
                                children: "Why Rill Singh"
                            }, void 0, false, {
                                fileName: "[project]/app/HomepageClient.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-[var(--font-heading)] text-[clamp(2.25rem,1.5rem+3vw,4rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-navy-darkest",
                                children: "Built to advise. Structured to deliver."
                            }, void 0, false, {
                                fileName: "[project]/app/HomepageClient.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "max-w-[44ch] text-[17px] leading-[1.75] text-[#37424F]",
                                children: "We bring institutional-grade rigor and on-the-ground judgment to every engagement — advising governments, investors, and enterprises across ten disciplines and eleven sectors, and measuring ourselves by what actually changes."
                            }, void 0, false, {
                                fileName: "[project]/app/HomepageClient.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/contact",
                                    className: "inline-flex items-center gap-2.5 rounded-full bg-terracotta px-8 py-[18px] text-[14px] font-bold uppercase tracking-[.04em] text-navy-darkest transition-colors hover:bg-terracotta-hover",
                                    children: [
                                        "Start a conversation ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "aria-hidden": "true",
                                            children: "→"
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 146,
                                            columnNumber: 36
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/HomepageClient.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/HomepageClient.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-[360px] flex-[52_1_0%]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative aspect-[4/3] min-h-[320px] w-full overflow-hidden rounded-3xl bg-navy-darkest shadow-[0_24px_64px_-24px_rgba(2,16,36,.4)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-[linear-gradient(165deg,#021024_0%,#052659_100%)]"
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "aria-hidden": "true",
                                    className: "absolute inset-x-0 top-0 h-[14%]",
                                    style: {
                                        background: "rgba(125,160,202,.07)",
                                        clipPath: "polygon(0% 0%,8.33% 100%,16.66% 0%,25% 100%,33.33% 0%,41.66% 100%,50% 0%,58.33% 100%,66.66% 0%,75% 100%,83.33% 0%,91.66% 100%,100% 0%,100% 0%,0% 0%)"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 154,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "aria-hidden": "true",
                                    className: "absolute inset-x-0 bottom-0 h-[20%]",
                                    style: {
                                        background: "rgba(125,160,202,.09)",
                                        clipPath: "polygon(0% 100%,8.33% 25%,16.66% 100%,25% 25%,33.33% 100%,41.66% 25%,50% 100%,58.33% 25%,66.66% 100%,75% 25%,83.33% 100%,91.66% 25%,100% 100%)"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2d$v2$2f$ui$2f$DiamondMotif$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    left: "50%",
                                    top: "52%",
                                    size: "80%",
                                    animate: true,
                                    playing: isPlaying
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setPlaying((p)=>!p),
                                    "aria-label": isPlaying ? "Pause background motion" : "Play background motion",
                                    className: "absolute bottom-[18px] right-[18px] z-10 flex h-10 w-10 items-center justify-center rounded-[10px] border border-[rgba(247,246,242,.24)] bg-[rgba(247,246,242,.14)] transition-colors hover:bg-[rgba(247,246,242,.24)]",
                                    children: isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "h-3 w-[3px] rounded-[1px] bg-[--color-paper]"
                                            }, void 0, false, {
                                                fileName: "[project]/app/HomepageClient.tsx",
                                                lineNumber: 181,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "h-3 w-[3px] rounded-[1px] bg-[--color-paper]"
                                            }, void 0, false, {
                                                fileName: "[project]/app/HomepageClient.tsx",
                                                lineNumber: 182,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/HomepageClient.tsx",
                                        lineNumber: 180,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-0.5 h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-[--color-paper]"
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomepageClient.tsx",
                                        lineNumber: 185,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 152,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/HomepageClient.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto w-full max-w-[72rem] px-6 pb-[clamp(64px,8vw,96px)] sm:px-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-9 sm:flex-row",
                    children: DIFFERENTIATORS.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-1 flex-col gap-2.5 border-t border-navy-darkest/16 pr-2 pt-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-[var(--font-heading)] text-[19px] font-semibold leading-[1.3] text-navy-darkest",
                                    children: d.title
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 196,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[15px] leading-[1.6] text-[#5B6472]",
                                    children: d.body
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 199,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, d.title, true, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 195,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/HomepageClient.tsx",
                    lineNumber: 193,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 192,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/HomepageClient.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
_s(DifferentiatorsSection, "UmUov0DfD2HgLKXa8ryVNb3Vgvg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$motion$2f$useReducedMotionPreference$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotionPreference"]
    ];
});
_c2 = DifferentiatorsSection;
/* ════════════════════════════════════════════════════════════════════
   SECTION 3 — SERVICE CLUSTERS
════════════════════════════════════════════════════════════════════ */ function ServiceClustersSection() {
    const cardCopy = (clusterId)=>{
        const items = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sections$2f$services$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SERVICES"].filter((s)=>s.cluster === clusterId).slice(0, 3);
        return {
            one_liner: CLUSTER_ONE_LINERS[clusterId] ?? "",
            items
        };
    };
    const [c1, c2, c3, c4] = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sections$2f$services$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CLUSTERS"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto w-full max-w-[72rem] px-6 py-[clamp(64px,8vw,96px)] sm:px-16",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-[clamp(48px,6vw,72px)] flex max-w-[42rem] flex-col gap-4.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-[13px] font-bold uppercase tracking-[.14em] text-eyebrow",
                            children: "Services"
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 223,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-[var(--font-heading)] text-[clamp(2.25rem,1.5rem+3vw,4rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-navy-darkest",
                            children: "Ten disciplines. Four ways in."
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 224,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/HomepageClient.tsx",
                    lineNumber: 222,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-[clamp(20px,3vw,24px)] min-[700px]:flex-row",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ClusterCardBig, {
                            num: "01",
                            cluster: c1,
                            ...cardCopy(c1.id),
                            left: "60%",
                            top: "56%",
                            motifSize: "78%"
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 230,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-[clamp(20px,3vw,24px)] min-[700px]:w-[45%]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ClusterCardSmall, {
                                    num: "02",
                                    cluster: c2,
                                    ...cardCopy(c2.id),
                                    left: "84%",
                                    top: "10%",
                                    motifSize: "70%"
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 232,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ClusterCardSmall, {
                                    num: "03",
                                    cluster: c3,
                                    ...cardCopy(c3.id),
                                    left: "16%",
                                    top: "94%",
                                    motifSize: "70%"
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 233,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 231,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/HomepageClient.tsx",
                    lineNumber: 229,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative mt-[clamp(32px,5vw,48px)] overflow-hidden rounded-3xl bg-[linear-gradient(165deg,#021024_0%,#052659_100%)] p-[clamp(24px,3vw,32px)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2d$v2$2f$ui$2f$DiamondMotif$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            left: "82%",
                            top: "50%",
                            size: "clamp(160px,20vw,240px)"
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 238,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative z-[2] flex max-w-[26rem] flex-col gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[12px] font-bold tracking-[.12em] text-blue-light",
                                    children: "04"
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 240,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-[var(--font-heading)] text-[clamp(1.5rem,1.2rem+1.5vw,2rem)] font-normal leading-[1.15] text-white",
                                    children: c4.label
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 241,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[16px] leading-[1.55] text-[#C3D0DF]",
                                    children: cardCopy(c4.id).one_liner
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 244,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ServiceLinks, {
                                    items: cardCopy(c4.id).items
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 245,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 239,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative z-[2] mt-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/services",
                                className: "inline-flex items-center gap-2 rounded-full bg-terracotta px-[22px] py-3 text-[13px] font-bold text-navy-darkest transition-colors hover:bg-terracotta-hover",
                                children: [
                                    "Explore ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "aria-hidden": "true",
                                        children: "→"
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomepageClient.tsx",
                                        lineNumber: 252,
                                        columnNumber: 23
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/HomepageClient.tsx",
                                lineNumber: 248,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 247,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/HomepageClient.tsx",
                    lineNumber: 237,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-[clamp(8px,2vw,16px)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/services",
                        className: "inline-flex items-center gap-1.5 text-[15px] font-semibold text-eyebrow transition-transform hover:translate-x-0.5 hover:underline",
                        children: [
                            "Explore all ten disciplines ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": "true",
                                children: "→"
                            }, void 0, false, {
                                fileName: "[project]/app/HomepageClient.tsx",
                                lineNumber: 262,
                                columnNumber: 41
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/HomepageClient.tsx",
                        lineNumber: 258,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/HomepageClient.tsx",
                    lineNumber: 257,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/HomepageClient.tsx",
            lineNumber: 221,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/HomepageClient.tsx",
        lineNumber: 220,
        columnNumber: 5
    }, this);
}
_c3 = ServiceClustersSection;
function ServiceLinks({ items }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-0.5 flex flex-wrap items-center gap-2",
        children: items.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex items-center gap-2",
                children: [
                    i > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-white/30",
                        children: "·"
                    }, void 0, false, {
                        fileName: "[project]/app/HomepageClient.tsx",
                        lineNumber: 275,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/services/${s.slug}`,
                        className: "text-[14px] font-medium text-blue-light transition-colors hover:underline",
                        children: SERVICE_SHORT_LABELS[s.slug] ?? s.slug
                    }, void 0, false, {
                        fileName: "[project]/app/HomepageClient.tsx",
                        lineNumber: 276,
                        columnNumber: 11
                    }, this)
                ]
            }, s.slug, true, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 274,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/app/HomepageClient.tsx",
        lineNumber: 272,
        columnNumber: 5
    }, this);
}
_c4 = ServiceLinks;
function ClusterCardBig({ num, cluster, one_liner, items, left, top, motifSize }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative min-h-[320px] flex-1 overflow-hidden rounded-3xl bg-[linear-gradient(165deg,#021024_0%,#052659_100%)] p-[clamp(28px,3.5vw,40px)] min-[700px]:w-[55%] min-[700px]:flex-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2d$v2$2f$ui$2f$DiamondMotif$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                left: left,
                top: top,
                size: motifSize
            }, void 0, false, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 307,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-[2] flex h-full flex-col justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex max-w-[34rem] flex-col gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[12px] font-bold tracking-[.12em] text-blue-light",
                                children: num
                            }, void 0, false, {
                                fileName: "[project]/app/HomepageClient.tsx",
                                lineNumber: 310,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-[var(--font-heading)] text-[clamp(1.75rem,1.3rem+2.2vw,2.5rem)] font-normal leading-[1.15] text-white",
                                children: cluster.label
                            }, void 0, false, {
                                fileName: "[project]/app/HomepageClient.tsx",
                                lineNumber: 311,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[16px] leading-[1.55] text-[#C3D0DF]",
                                children: one_liner
                            }, void 0, false, {
                                fileName: "[project]/app/HomepageClient.tsx",
                                lineNumber: 314,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ServiceLinks, {
                                items: items
                            }, void 0, false, {
                                fileName: "[project]/app/HomepageClient.tsx",
                                lineNumber: 315,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/HomepageClient.tsx",
                        lineNumber: 309,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/services",
                            className: "inline-flex items-center gap-2 rounded-full bg-terracotta px-[22px] py-3 text-[13px] font-bold text-navy-darkest transition-colors hover:bg-terracotta-hover",
                            children: [
                                "Explore ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": "true",
                                    children: "→"
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 322,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 318,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/HomepageClient.tsx",
                        lineNumber: 317,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 308,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/HomepageClient.tsx",
        lineNumber: 306,
        columnNumber: 5
    }, this);
}
_c5 = ClusterCardBig;
function ClusterCardSmall({ num, cluster, one_liner, items, left, top, motifSize }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative aspect-[16/10] min-h-[180px] flex-1 overflow-hidden rounded-3xl bg-[linear-gradient(165deg,#021024_0%,#052659_100%)] p-[clamp(22px,2.6vw,28px)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2d$v2$2f$ui$2f$DiamondMotif$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                left: left,
                top: top,
                size: motifSize
            }, void 0, false, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 349,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-[2] flex h-full flex-col justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[11px] font-bold tracking-[.12em] text-blue-light",
                                children: num
                            }, void 0, false, {
                                fileName: "[project]/app/HomepageClient.tsx",
                                lineNumber: 352,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-[var(--font-heading)] text-[clamp(1.15rem,1rem+0.8vw,1.4rem)] font-normal leading-[1.2] text-white",
                                children: cluster.label
                            }, void 0, false, {
                                fileName: "[project]/app/HomepageClient.tsx",
                                lineNumber: 353,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[14px] leading-[1.5] text-[#C3D0DF]",
                                children: one_liner
                            }, void 0, false, {
                                fileName: "[project]/app/HomepageClient.tsx",
                                lineNumber: 356,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ServiceLinks, {
                                items: items
                            }, void 0, false, {
                                fileName: "[project]/app/HomepageClient.tsx",
                                lineNumber: 357,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/HomepageClient.tsx",
                        lineNumber: 351,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/services",
                            className: "inline-flex items-center gap-1.5 rounded-full bg-terracotta px-[18px] py-2.5 text-[12px] font-bold text-navy-darkest transition-colors hover:bg-terracotta-hover",
                            children: [
                                "Explore ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": "true",
                                    children: "→"
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 364,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 360,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/HomepageClient.tsx",
                        lineNumber: 359,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 350,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/HomepageClient.tsx",
        lineNumber: 348,
        columnNumber: 5
    }, this);
}
_c6 = ClusterCardSmall;
/* ════════════════════════════════════════════════════════════════════
   SECTION 4 — POINT OF VIEW
════════════════════════════════════════════════════════════════════ */ function PointOfViewSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative bg-[--color-paper]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto flex w-full max-w-[44rem] flex-col items-center px-6 py-[clamp(80px,9vw,128px)] text-center sm:px-16",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-[var(--font-heading)] text-[clamp(1.75rem,1.2rem+3.2vw,3.25rem)] font-normal leading-[1.2] tracking-[-0.01em] text-navy-darkest",
                    children: "Africa's next decade belongs to institutions that can execute."
                }, void 0, false, {
                    fileName: "[project]/app/HomepageClient.tsx",
                    lineNumber: 379,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-[clamp(32px,4vw,40px)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/about",
                        className: "inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue-mid transition-transform hover:translate-x-0.5 hover:underline",
                        children: [
                            "Our point of view, and the work behind it ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": "true",
                                children: "→"
                            }, void 0, false, {
                                fileName: "[project]/app/HomepageClient.tsx",
                                lineNumber: 387,
                                columnNumber: 55
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/HomepageClient.tsx",
                        lineNumber: 383,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/HomepageClient.tsx",
                    lineNumber: 382,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/HomepageClient.tsx",
            lineNumber: 378,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/HomepageClient.tsx",
        lineNumber: 377,
        columnNumber: 5
    }, this);
}
_c7 = PointOfViewSection;
/* ════════════════════════════════════════════════════════════════════
   SECTION 5 — INDUSTRIES
════════════════════════════════════════════════════════════════════ */ function IndustriesSection() {
    const featured = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sections$2f$industries$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INDUSTRIES"].find((i)=>i.id === FEATURED_INDUSTRY_ID);
    const supporting = SUPPORTING_INDUSTRY_IDS.map((id)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sections$2f$industries$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INDUSTRIES"].find((i)=>i.id === id)).filter((i)=>Boolean(i));
    if (!featured) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative overflow-hidden bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2d$v2$2f$ui$2f$DiamondMotif$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                left: "92%",
                top: "6%",
                size: "46%"
            }, void 0, false, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 408,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-[2] mx-auto w-full max-w-[72rem] px-6 py-[clamp(64px,8vw,96px)] sm:px-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-[clamp(40px,5vw,56px)] flex max-w-[42rem] flex-col gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[13px] font-bold uppercase tracking-[.14em] text-eyebrow",
                                children: "Industries"
                            }, void 0, false, {
                                fileName: "[project]/app/HomepageClient.tsx",
                                lineNumber: 411,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-[var(--font-heading)] text-[clamp(2.25rem,1.5rem+3vw,4rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-navy-darkest",
                                children: "Sector depth across the real economy."
                            }, void 0, false, {
                                fileName: "[project]/app/HomepageClient.tsx",
                                lineNumber: 412,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/HomepageClient.tsx",
                        lineNumber: 410,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3 overflow-x-auto pb-4 [scrollbar-width:thin] lg:gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-[clamp(360px,52vw,520px)] w-[88%] flex-none overflow-hidden rounded-2xl bg-[linear-gradient(165deg,#0B355E_0%,#021024_82%)] sm:w-[58%]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2d$v2$2f$ui$2f$DiamondMotif$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        left: "16%",
                                        top: "50%",
                                        size: "110%"
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomepageClient.tsx",
                                        lineNumber: 419,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-x-0 bottom-0 flex flex-col gap-2 rounded-t-2xl bg-[--color-paper] p-[22px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[0.65rem] font-bold uppercase tracking-[.12em] text-blue-mid",
                                                children: "Featured sector"
                                            }, void 0, false, {
                                                fileName: "[project]/app/HomepageClient.tsx",
                                                lineNumber: 421,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-[var(--font-heading)] text-[1.4rem] font-semibold leading-[1.2] text-navy-darkest",
                                                children: featured.title
                                            }, void 0, false, {
                                                fileName: "[project]/app/HomepageClient.tsx",
                                                lineNumber: 422,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[14px] leading-[1.5] text-[#37424F]",
                                                children: featured.description
                                            }, void 0, false, {
                                                fileName: "[project]/app/HomepageClient.tsx",
                                                lineNumber: 425,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/industries/${featured.id}`,
                                                className: "mt-1 inline-flex items-center gap-1.5 text-[14px] font-bold text-[#B08858] transition-transform hover:translate-x-0.5 hover:underline",
                                                children: [
                                                    "Explore sector ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        "aria-hidden": "true",
                                                        children: "→"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/HomepageClient.tsx",
                                                        lineNumber: 430,
                                                        columnNumber: 32
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/HomepageClient.tsx",
                                                lineNumber: 426,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/HomepageClient.tsx",
                                        lineNumber: 420,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/HomepageClient.tsx",
                                lineNumber: 418,
                                columnNumber: 11
                            }, this),
                            supporting.map((industry, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "group relative h-[clamp(360px,52vw,520px)] w-[88%] flex-none overflow-hidden rounded-2xl bg-[linear-gradient(165deg,#0F3E6B_0%,#052659_85%)] sm:w-[46%] lg:w-[34%]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2d$v2$2f$ui$2f$DiamondMotif$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            left: `${20 + i * 30}%`,
                                            top: i % 2 === 0 ? "16%" : "88%",
                                            size: "120%"
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 440,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-x-0 bottom-0 flex flex-col gap-1.5 overflow-hidden rounded-t-2xl bg-[--color-paper] p-[18px] lg:h-[34%] lg:transition-[height] lg:duration-500 lg:ease-[cubic-bezier(0.25,0.46,0.45,0.94)] lg:group-hover:h-full lg:group-focus-within:h-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-[0.65rem] font-bold uppercase tracking-[.12em] text-blue-mid",
                                                    children: "Sector"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomepageClient.tsx",
                                                    lineNumber: 442,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "max-w-[20ch] font-[var(--font-heading)] text-[1.15rem] font-semibold leading-[1.25] text-navy-darkest",
                                                    children: industry.title
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomepageClient.tsx",
                                                    lineNumber: 443,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[13px] leading-[1.5] text-[#37424F] lg:translate-y-2 lg:opacity-0 lg:transition-[opacity,transform] lg:duration-200 lg:ease-out lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100",
                                                    children: industry.description
                                                }, void 0, false, {
                                                    fileName: "[project]/app/HomepageClient.tsx",
                                                    lineNumber: 446,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/industries/${industry.id}`,
                                                    className: "inline-flex items-center gap-1.5 text-[13px] font-bold text-[#B08858] hover:underline lg:translate-y-2 lg:opacity-0 lg:transition-[opacity,transform] lg:duration-200 lg:ease-out lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100",
                                                    children: [
                                                        "Explore sector ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "aria-hidden": "true",
                                                            children: "→"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/HomepageClient.tsx",
                                                            lineNumber: 453,
                                                            columnNumber: 34
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/HomepageClient.tsx",
                                                    lineNumber: 449,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 441,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, industry.id, true, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 436,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/HomepageClient.tsx",
                        lineNumber: 417,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-[clamp(28px,3.5vw,36px)]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/industries",
                            className: "inline-flex items-center gap-1.5 text-[15px] font-semibold text-eyebrow transition-transform hover:translate-x-0.5 hover:underline",
                            children: [
                                "See all 11 sectors ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": "true",
                                    children: "→"
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 465,
                                    columnNumber: 32
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 461,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/HomepageClient.tsx",
                        lineNumber: 460,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/HomepageClient.tsx",
                lineNumber: 409,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/HomepageClient.tsx",
        lineNumber: 407,
        columnNumber: 5
    }, this);
}
_c8 = IndustriesSection;
/* ════════════════════════════════════════════════════════════════════
   SECTION 6 — INSIGHTS CAROUSEL
════════════════════════════════════════════════════════════════════ */ function InsightsSection({ insights }) {
    _s1();
    const reducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$motion$2f$useReducedMotionPreference$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotionPreference"])();
    const [index, setIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const last = insights.length - 1;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative bg-navy-darkest",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto w-full max-w-[72rem] px-6 py-[clamp(64px,8vw,96px)] sm:px-16",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-[clamp(40px,5vw,56px)] flex max-w-[42rem] flex-col gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-[13px] font-bold uppercase tracking-[.14em] text-blue-light",
                            children: "Insights"
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 485,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-[var(--font-heading)] text-[clamp(2.25rem,1.5rem+3vw,4rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-white",
                            children: "Latest thinking."
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 486,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/HomepageClient.tsx",
                    lineNumber: 484,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-hidden rounded-[20px]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex",
                        style: {
                            transform: `translateX(-${index * 100}%)`,
                            transition: reducedMotion ? "none" : "transform 300ms ease"
                        },
                        children: insights.map((insight, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative min-h-[380px] w-full flex-none overflow-hidden bg-[linear-gradient(165deg,#052659_0%,#021024_76%)] sm:min-h-[460px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2d$v2$2f$ui$2f$DiamondMotif$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        left: `${20 + i * 30}%`,
                                        top: i % 2 === 0 ? "30%" : "78%",
                                        size: "80%"
                                    }, void 0, false, {
                                        fileName: "[project]/app/HomepageClient.tsx",
                                        lineNumber: 504,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-[2] flex h-full max-w-[36rem] flex-col justify-end gap-3 p-[clamp(28px,4vw,48px)]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[11px] font-bold uppercase tracking-[.12em] text-blue-light",
                                                children: insight.category
                                            }, void 0, false, {
                                                fileName: "[project]/app/HomepageClient.tsx",
                                                lineNumber: 506,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-[var(--font-heading)] text-[clamp(1.5rem,1.2rem+1.6vw,2.15rem)] font-normal leading-[1.2] text-white",
                                                children: insight.title
                                            }, void 0, false, {
                                                fileName: "[project]/app/HomepageClient.tsx",
                                                lineNumber: 509,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[15px] leading-[1.55] text-[#C3D0DF]",
                                                children: insight.dek
                                            }, void 0, false, {
                                                fileName: "[project]/app/HomepageClient.tsx",
                                                lineNumber: 512,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-1 text-[13px] font-medium text-[#C3D0DF]/65",
                                                children: new Date(insight.date).toLocaleDateString("en-US", {
                                                    month: "long",
                                                    year: "numeric"
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/app/HomepageClient.tsx",
                                                lineNumber: 513,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/HomepageClient.tsx",
                                        lineNumber: 505,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, insight._id, true, {
                                fileName: "[project]/app/HomepageClient.tsx",
                                lineNumber: 500,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/HomepageClient.tsx",
                        lineNumber: 492,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/HomepageClient.tsx",
                    lineNumber: 491,
                    columnNumber: 9
                }, this),
                insights.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-[clamp(24px,3vw,32px)] flex items-center justify-center gap-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            "aria-label": "Previous insight",
                            disabled: index === 0,
                            onClick: ()=>setIndex((i)=>Math.max(0, i - 1)),
                            className: "flex h-9 w-9 items-center justify-center rounded-full border border-blue-light/35 text-blue-light transition-colors hover:border-blue-light hover:bg-blue-light/12 disabled:opacity-35",
                            children: "‹"
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 524,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: insights.map((insight, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    "aria-label": `Go to insight ${i + 1}`,
                                    "aria-current": i === index,
                                    onClick: ()=>setIndex(i),
                                    className: "h-[7px] rounded-full transition-[width,background] duration-200",
                                    style: {
                                        width: i === index ? 22 : 7,
                                        background: i === index ? "#7DA0CA" : "rgba(125,160,202,.28)"
                                    }
                                }, insight._id, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 535,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 533,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            "aria-label": "Next insight",
                            disabled: index === last,
                            onClick: ()=>setIndex((i)=>Math.min(last, i + 1)),
                            className: "flex h-9 w-9 items-center justify-center rounded-full border border-blue-light/35 text-blue-light transition-colors hover:border-blue-light hover:bg-blue-light/12 disabled:opacity-35",
                            children: "›"
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 546,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/HomepageClient.tsx",
                    lineNumber: 523,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-[clamp(24px,3vw,32px)] flex justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/insights",
                        className: "inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue-light transition-transform hover:translate-x-0.5 hover:underline",
                        children: [
                            "All insights ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": "true",
                                children: "→"
                            }, void 0, false, {
                                fileName: "[project]/app/HomepageClient.tsx",
                                lineNumber: 563,
                                columnNumber: 26
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/HomepageClient.tsx",
                        lineNumber: 559,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/HomepageClient.tsx",
                    lineNumber: 558,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/HomepageClient.tsx",
            lineNumber: 483,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/HomepageClient.tsx",
        lineNumber: 482,
        columnNumber: 5
    }, this);
}
_s1(InsightsSection, "puHdN+wdl6P0XsqMJW49Ex8eV0k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$motion$2f$useReducedMotionPreference$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotionPreference"]
    ];
});
_c9 = InsightsSection;
/* ════════════════════════════════════════════════════════════════════
   SECTION 7 — CTA BAND
════════════════════════════════════════════════════════════════════ */ function CtaBandSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative overflow-hidden bg-[--color-paper]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex w-full flex-col md:flex-row md:items-stretch",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-none flex-col gap-[22px] px-6 py-[clamp(56px,7vw,88px)] sm:px-16 md:w-[44%] md:justify-center md:px-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-[13px] font-bold uppercase tracking-[.14em] text-blue-mid",
                            children: "Get in touch"
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 579,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-[var(--font-heading)] text-[clamp(2.25rem,1.6rem+2.6vw,3.25rem)] font-semibold leading-[1.14] tracking-[-0.01em] text-navy-darkest",
                            children: "Let's discuss what's next for your institution."
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 580,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "max-w-[40ch] text-[17px] leading-[1.65] text-[#37424F]",
                            children: "A first conversation is free of charge — and free of theatre."
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 583,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3 flex flex-wrap items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "https://wa.me/254793995142",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "inline-flex items-center gap-2 rounded-full border-[1.5px] border-navy-darkest bg-transparent px-7 py-4 text-[14px] font-bold tracking-[.02em] text-navy-darkest transition-colors hover:bg-navy-darkest/6",
                                    children: [
                                        "Message us on WhatsApp ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "aria-hidden": "true",
                                            children: "↗"
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 593,
                                            columnNumber: 38
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 587,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/contact",
                                    className: "inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-4 text-[14px] font-bold tracking-[.02em] text-navy-darkest transition-colors hover:bg-terracotta-hover",
                                    children: [
                                        "Start a conversation ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "aria-hidden": "true",
                                            children: "↗"
                                        }, void 0, false, {
                                            fileName: "[project]/app/HomepageClient.tsx",
                                            lineNumber: 599,
                                            columnNumber: 36
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 595,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 586,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/HomepageClient.tsx",
                    lineNumber: 578,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex min-h-[320px] flex-none items-center justify-center overflow-hidden bg-[linear-gradient(155deg,#0B355E_0%,#021024_78%)] p-[clamp(28px,5vw,56px)] md:w-[56%]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2d$v2$2f$ui$2f$DiamondMotif$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            left: "38%",
                            top: "44%",
                            size: "150%"
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 605,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative z-[2] aspect-[4/5] w-[min(360px,84%)] bg-[--color-paper] p-2.5 shadow-[0_24px_64px_-20px_rgba(2,16,36,.5)]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-full w-full overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/images/team/vankeno.jpg",
                                    alt: "Rill Singh Limited advisory team",
                                    fill: true,
                                    className: "object-cover",
                                    sizes: "360px"
                                }, void 0, false, {
                                    fileName: "[project]/app/HomepageClient.tsx",
                                    lineNumber: 608,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/HomepageClient.tsx",
                                lineNumber: 607,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/HomepageClient.tsx",
                            lineNumber: 606,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/HomepageClient.tsx",
                    lineNumber: 604,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/HomepageClient.tsx",
            lineNumber: 577,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/HomepageClient.tsx",
        lineNumber: 576,
        columnNumber: 5
    }, this);
}
_c10 = CtaBandSection;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
__turbopack_context__.k.register(_c, "HomepageClient");
__turbopack_context__.k.register(_c1, "HeroSection");
__turbopack_context__.k.register(_c2, "DifferentiatorsSection");
__turbopack_context__.k.register(_c3, "ServiceClustersSection");
__turbopack_context__.k.register(_c4, "ServiceLinks");
__turbopack_context__.k.register(_c5, "ClusterCardBig");
__turbopack_context__.k.register(_c6, "ClusterCardSmall");
__turbopack_context__.k.register(_c7, "PointOfViewSection");
__turbopack_context__.k.register(_c8, "IndustriesSection");
__turbopack_context__.k.register(_c9, "InsightsSection");
__turbopack_context__.k.register(_c10, "CtaBandSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0m.gubz._.js.map