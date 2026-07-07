# FILE TREE
```
./
    .env.example
    .env.local
    .env.sentry-build-plugin
    .eslintrc.json
    .gitignore
    audit.py
    eslint.config.mjs
    full_file_list.txt
    next-env.d.ts
    next.config.ts
    package-lock.json
    package.json
    postcss.config.mjs
    PROJECT_STATE.md
    proxy.ts
    README.md
    sanity.cli.ts
    sanity.config.ts
    smoke-results.txt
    tailwind.config.ts
    tsconfig.json
    tsconfig.tsbuildinfo
    .github/
        copilot-instructions.md
        workflows/
            ci.yml
    .sixth/
        skills/
    .vercel/
        project.json
        README.txt
    .vscode/
        tasks.json
    app/
        ClientLayout.tsx
        globals.css
        HomepageClient.tsx
        icon.svg
        layout.tsx
        page.tsx
        robots.ts
        sitemap.ts
        about/
            page.tsx
        admin/
            submissions/
                page.tsx
        api/
            contact/
                route.ts
            industries/
                route.ts
            insights/
                route.ts
            pages/
                [slug]/
                    route.ts
            search/
                route.ts
            services/
                route.ts
            submissions/
                route.ts
        careers/
            page.tsx
        case-studies/
            [slug]/
                page.tsx
        contact/
            ContactContextMessage.tsx
            ContactForm.tsx
            NewsletterSection.tsx
            page.tsx
        debug/
            page.tsx
        how-we-work/
            page.tsx
        industries/
            page.tsx
            [slug]/
                page.tsx
        insights/
            error.tsx
            loading.tsx
            page.tsx
            [slug]/
                page.tsx
        legal-notices/
            page.tsx
        privacy/
            page.tsx
        privacy-policy/
            page.tsx
        regulatory-disclosures/
            page.tsx
        search/
            page.tsx
        services/
            error.tsx
            loading.tsx
            page.tsx
            [slug]/
                page.tsx
        studio/
            [[...tool]]/
                page.tsx
        terms/
            page.tsx
    components-v2/
        foundation/
            index.ts
            useHeroEntrance.ts
            useHeroSequence.ts
            useResponsiveValue.ts
            useScrollReveal.ts
        layout/
            SearchOverlay.tsx
            SiteFooter.tsx
            SiteHeader.tsx
            SiteHeaderClient.tsx
        sections/
            AtmosphericLayer.tsx
            CapabilityNavigator.tsx
            CapabilityPanelsSection.tsx
            ConstellationHero.tsx
            ContentSkeleton.tsx
            CTABlock.tsx
            DecisionGateway.tsx
            EngagementFrameworkSection.tsx
            FeaturedIndustriesSection.tsx
            FeaturedServicesSection.tsx
            HeroSection.tsx
            index.ts
            IndustriesHeroSection.tsx
            IndustriesOverview.tsx
            IndustryContextSection.tsx
            IndustryDetailHeroSection.tsx
            IndustryRelatedInsightsSection.tsx
            IndustryRelatedServicesSection.tsx
            IndustrySummarySection.tsx
            InsightInDevelopmentPlaceholder.tsx
            InsightsCarouselSection.tsx
            InsightsContentSection.tsx
            InsightsDetailHeroSection.tsx
            InsightsGridSection.tsx
            InsightsHeroSection.tsx
            InsightsIntroSection.tsx
            InsightsRelatedSection.tsx
            InstitutionalCTA.tsx
            InstitutionalMetricsSection.tsx
            MidPageImageBand.tsx
            PhaseBlock.tsx
            PridePhilosophySection.tsx
            SectionDivider.tsx
            SectionHeader.tsx
            SectionWrapper.tsx
            ServicesChallengeSection.tsx
            ServicesDeliverablesSection.tsx
            ServicesDeliveryModelSection.tsx
            ServicesDetailHeroSection.tsx
            ServicesGridSection.tsx
            ServicesHeroSection.tsx
            ServicesIntegrationSection.tsx
            ServicesIntroSection.tsx
            ServicesRelatedIndustriesSection.tsx
            ServicesRelatedInsightsSection.tsx
            SummaryBlock.tsx
            TrustSignalsSection.tsx
        ui/
            ArticleSidebar.tsx
            Breadcrumb.tsx
            Button.tsx
            DataHighlight.tsx
            EditorialIndustryCard.tsx
            GateWayLink.tsx
            HeroImagePlaceholder.tsx
            index.ts
            IndustryCard.tsx
            IndustryTag.tsx
            InsightCarouselCard.tsx
            OutcomeBlock.tsx
            PreviewBanner.tsx
            PullQuote.tsx
            RelatedKnowledge.tsx
            ServiceCard.tsx
    docs/
        sanity-replacement-strategy.md
        design-references/
            about-corporate-layout.png
            e-learning-about.png
            README.md
    exports/
        homepage-for-claude.md
    figma-reference/
        ATTRIBUTIONS.md
        package.json
        postcss.config.mjs
        vite.config.ts
        guidelines/
            Guidelines.md
        imports/
            pasted_text/
                about-page-refinement.md
                about-page-updates-1.md
                about-page-updates.md
                audit-report.md
                cta-image-refinement.md
                design-system-map.md
                industry-page-layout.md
                industry-page-refinement.md
                insight-card-design.md
                insight-page-layout.md
                insights-page-architecture.md
                knowledge-engine-architecture.json
                methodology-update.md
                pasted-attachment-1.txt
                pasted-attachment.txt
                philosophy-section.md
                related-perspectives-insights.md
                rsl-blue-chip-insights.md
                rsl-service-page-audit.md
                rsl-service-page-refinement.md
                rsl-website-nav-future-approach.md
                rsl-website-refinements.md
                service-industries-update.md
                services-page-refinement.md
                sticky-insights-responsive-aud.md
                structured-capabilities-update.md
        public/
            robots.txt
            sitemap.xml
        src/
            app/
                App.tsx
                routes.ts
                components/
                    CaseStudyTemplate.tsx
                    ColorSystem.tsx
                    ComponentLibrary.tsx
                    ComposedPageTemplate.tsx
                    DesignSystemLayout.tsx
                    FormComponents.tsx
                    GridSystem.tsx
                    InsightArticleTemplate.tsx
                    MotionSystem.tsx
                    RSLAbout.tsx
                    RSLCapabilities.tsx
                    RSLCapabilityDetail.tsx
                    RSLCaseStudyDetail.tsx
                    RSLContact.tsx
                    RSLCoverage.tsx
                    RSLHomepage.tsx
                    RSLIndustries.tsx
                    RSLIndustryDetail.tsx
                    RSLInsightDetail.tsx
                    RSLInsights.tsx
                    RSLServices.tsx
                    SpacingSystem.tsx
                    TypographySystem.tsx
                    figma/
                        ImageWithFallback.tsx
                    homepage/
                        HeroSection.tsx
                        IndustryCarousel.tsx
                        LowerSections.tsx
                        MiddleSections.tsx
                    ui/
                        accordion.tsx
                        alert-dialog.tsx
                        alert.tsx
                        aspect-ratio.tsx
                        avatar.tsx
                        badge.tsx
                        breadcrumb.tsx
                        button.tsx
                        calendar.tsx
                        card.tsx
                        carousel.tsx
                        chart.tsx
                        checkbox.tsx
                        collapsible.tsx
                        command.tsx
                        context-menu.tsx
                        dialog.tsx
                        drawer.tsx
                        dropdown-menu.tsx
                        form.tsx
                        hover-card.tsx
                        input-otp.tsx
                        input.tsx
                        label.tsx
                        menubar.tsx
                        navigation-menu.tsx
                        pagination.tsx
                        popover.tsx
                        progress.tsx
                        radio-group.tsx
                        resizable.tsx
                        scroll-area.tsx
... (truncated for size)
```

# IMAGE ASSETS
- public/favicon.ico
- public/file.svg
- public/globe.svg
- public/next.svg
- public/vercel.svg
- public/window.svg
- public/images/about/about-hero.jpg
- public/images/about/cta-bg.jpg
- public/images/about/firm-main.jpg
- public/images/about/footprint-map.jpg
- public/images/about/mission-main.jpg
- public/images/about/mission-overlay.jpg
- public/images/advisory/institutional-01.jpg
- public/images/advisory/institutional-02.jpg
- public/images/advisory/institutional-03.jpg
- public/images/capabilities/digital-ai.jpg
- public/images/capabilities/financial.jpg
- public/images/capabilities/strategy.jpg
- public/images/contact/contacthero.jpeg
- public/images/contact/contactimage2.jpg
- public/images/framework/stage-1.jpg
- public/images/framework/stage-2.jpg
- public/images/framework/stage-3.jpg
- public/images/framework/stage-4.jpg
- public/images/gateway/bg-texture.jpg
- public/images/gateway/executive.jpg
- public/images/hero/hero-bg.jpg
- public/images/industries/industry-1.jpg
- public/images/industries/industry-2.jpg
- public/images/industries/industry-3.jpg
- public/images/industries/industry-4.jpg
- public/images/industries/industry-5.jpg
- public/images/industries/industry-6.jpg
- public/images/industries/analytical/digital-command-center.jpg
- public/images/industries/analytical/financial-data-modeling.jpg
- public/images/industries/analytical/infrastructure-blueprints.jpg
- public/images/industries/consumer-retail/advisory.jpg
- public/images/industries/consumer-retail/foresight.jpg
- public/images/industries/consumer-retail/hero.jpg
- public/images/industries/education/advisory.jpg
- public/images/industries/education/foresight.jpg
- public/images/industries/education/hero.jpg
- public/images/industries/energy-resources/advisory.jpg
- public/images/industries/energy-resources/foresight.jpg
- public/images/industries/energy-resources/hero.jpg
- public/images/industries/financial-services/advisory.jpg
- public/images/industries/financial-services/foresight.jpg
- public/images/industries/financial-services/hero.jpg
- public/images/industries/healthcare-life-sciences/advisory.jpg
- public/images/industries/healthcare-life-sciences/foresight.jpg
- public/images/industries/healthcare-life-sciences/hero.jpg
- public/images/industries/hero/hero-boardroom.jpg
- public/images/industries/hero/hero-bridge-infrastructure.jpg
- public/images/industries/hero/hero-city-skyline.jpg
- public/images/industries/hero/hero-digital-command-center.jpg
- public/images/industries/industrials-manufacturing/advisory.jpg
- public/images/industries/industrials-manufacturing/foresight.jpg
- public/images/industries/industrials-manufacturing/hero.jpg
- public/images/industries/philosophy/consulting-office.jpg
- public/images/industries/philosophy/energy-grid.jpg
- public/images/industries/philosophy/logistics-port.jpg
- public/images/industries/philosophy/manufacturing-plant.jpg
- public/images/industries/private-capital/advisory.jpg
- public/images/industries/private-capital/foresight.jpg
- public/images/industries/private-capital/hero.jpg
- public/images/industries/public-sector-government/advisory.jpg
- public/images/industries/public-sector-government/foresight.jpg
- public/images/industries/public-sector-government/hero.jpg
- public/images/industries/real-estate-infrastructure/advisory.jpg
- public/images/industries/real-estate-infrastructure/foresight.jpg
- public/images/industries/real-estate-infrastructure/hero.jpg
- public/images/industries/sectors/consumer-retail.jpg
- public/images/industries/sectors/education.jpg
- public/images/industries/sectors/energy-resources.jpg
- public/images/industries/sectors/financial-services.jpg
- public/images/industries/sectors/healthcare-life-sciences.jpg
- public/images/industries/sectors/industrials-manufacturing.jpg
- public/images/industries/sectors/private-capital.jpg
- public/images/industries/sectors/public-sector-government.jpg
- public/images/industries/sectors/real-estate-infrastructure.jpg
- public/images/industries/sectors/technology-digital.jpg
- public/images/industries/sectors/transport-logistics.jpg
- public/images/industries/technology-digital/advisory.jpg
- public/images/industries/technology-digital/foresight.jpg
- public/images/industries/technology-digital/hero.jpg
- public/images/industries/transport-logistics/advisory.jpg
- public/images/industries/transport-logistics/foresight.jpg
- public/images/industries/transport-logistics/hero.jpg
- public/images/insights/insight-1.jpg
- public/images/insights/insight-2.jpg
- public/images/insights/insight-3.jpg
- public/images/insights/insight-4.jpg
- public/images/insights/insight-5.jpg
- public/images/insights/sectors/finance.jpg
- public/images/insights/sectors/infrastructure.jpg
- public/images/insights/sectors/public-policy.jpg
- public/images/insights/sectors/strategy.jpg
- public/images/insights/sectors/technology.jpg
- public/images/pride/pride-d.jpg
- public/images/pride/pride-e.jpg
- public/images/pride/pride-i.jpg
- public/images/pride/pride-p.jpg
- public/images/pride/pride-r.jpg
- public/images/sections/mentorship.jpeg
- public/images/sections/office-team.jpeg
- public/images/sections/real-estate-investment.jpeg
- public/images/sections/startup-meeting.jpeg
- public/images/sections/teamwork-conference.jpeg
- public/images/services/advisory-video-still.jpg
- public/images/services/creative-delivery.jpg
- public/images/services/hero-services.jpg
- public/images/team/vankeno.jpg

# ENVIRONMENT VARIABLES
- ADMIN_SECRET
- CONTACT_RECEIVER_EMAIL
- DATABASE_URL
- NEXT_PUBLIC_SANITY_API_VERSION
- NEXT_PUBLIC_SANITY_DATASET
- NEXT_PUBLIC_SANITY_PROJECT_ID
- NEXT_PUBLIC_SITE_URL
- NODE_ENV
- RESEND_API_KEY
- RESEND_FROM_EMAIL
- SANITY_DATASET
- SANITY_PROJECT_ID
- SMTP_HOST
- SMTP_PASS
- SMTP_PORT
- SMTP_USER

# COMPONENT INVENTORY
- components-v2/layout/SearchOverlay.tsx
- components-v2/layout/SiteFooter.tsx
- components-v2/layout/SiteHeader.tsx
- components-v2/layout/SiteHeaderClient.tsx
- components-v2/sections/AtmosphericLayer.tsx
- components-v2/sections/CapabilityNavigator.tsx
- components-v2/sections/CapabilityPanelsSection.tsx
- components-v2/sections/ConstellationHero.tsx
- components-v2/sections/ContentSkeleton.tsx
- components-v2/sections/CTABlock.tsx
- components-v2/sections/DecisionGateway.tsx
- components-v2/sections/EngagementFrameworkSection.tsx
- components-v2/sections/FeaturedIndustriesSection.tsx
- components-v2/sections/FeaturedServicesSection.tsx
- components-v2/sections/HeroSection.tsx
- components-v2/sections/IndustriesHeroSection.tsx
- components-v2/sections/IndustriesOverview.tsx
- components-v2/sections/IndustryContextSection.tsx
- components-v2/sections/IndustryDetailHeroSection.tsx
- components-v2/sections/IndustryRelatedInsightsSection.tsx
- components-v2/sections/IndustryRelatedServicesSection.tsx
- components-v2/sections/IndustrySummarySection.tsx
- components-v2/sections/InsightInDevelopmentPlaceholder.tsx
- components-v2/sections/InsightsCarouselSection.tsx
- components-v2/sections/InsightsContentSection.tsx
- components-v2/sections/InsightsDetailHeroSection.tsx
- components-v2/sections/InsightsGridSection.tsx
- components-v2/sections/InsightsHeroSection.tsx
- components-v2/sections/InsightsIntroSection.tsx
- components-v2/sections/InsightsRelatedSection.tsx
- components-v2/sections/InstitutionalCTA.tsx
- components-v2/sections/InstitutionalMetricsSection.tsx
- components-v2/sections/MidPageImageBand.tsx
- components-v2/sections/PhaseBlock.tsx
- components-v2/sections/PridePhilosophySection.tsx
- components-v2/sections/SectionDivider.tsx
- components-v2/sections/SectionHeader.tsx
- components-v2/sections/SectionWrapper.tsx
- components-v2/sections/ServicesChallengeSection.tsx
- components-v2/sections/ServicesDeliverablesSection.tsx
- components-v2/sections/ServicesDeliveryModelSection.tsx
- components-v2/sections/ServicesDetailHeroSection.tsx
- components-v2/sections/ServicesGridSection.tsx
- components-v2/sections/ServicesHeroSection.tsx
- components-v2/sections/ServicesIntegrationSection.tsx
- components-v2/sections/ServicesIntroSection.tsx
- components-v2/sections/ServicesRelatedIndustriesSection.tsx
- components-v2/sections/ServicesRelatedInsightsSection.tsx
- components-v2/sections/SummaryBlock.tsx
- components-v2/sections/TrustSignalsSection.tsx
- components-v2/ui/ArticleSidebar.tsx
- components-v2/ui/Breadcrumb.tsx
- components-v2/ui/Button.tsx
- components-v2/ui/DataHighlight.tsx
- components-v2/ui/EditorialIndustryCard.tsx
- components-v2/ui/GateWayLink.tsx
- components-v2/ui/HeroImagePlaceholder.tsx
- components-v2/ui/IndustryCard.tsx
- components-v2/ui/IndustryTag.tsx
- components-v2/ui/InsightCarouselCard.tsx
- components-v2/ui/OutcomeBlock.tsx
- components-v2/ui/PreviewBanner.tsx
- components-v2/ui/PullQuote.tsx
- components-v2/ui/RelatedKnowledge.tsx
- components-v2/ui/ServiceCard.tsx
- figma-reference/src/app/components/CaseStudyTemplate.tsx
- figma-reference/src/app/components/ColorSystem.tsx
- figma-reference/src/app/components/ComponentLibrary.tsx
- figma-reference/src/app/components/ComposedPageTemplate.tsx
- figma-reference/src/app/components/DesignSystemLayout.tsx
- figma-reference/src/app/components/FormComponents.tsx
- figma-reference/src/app/components/GridSystem.tsx
- figma-reference/src/app/components/InsightArticleTemplate.tsx
- figma-reference/src/app/components/MotionSystem.tsx
- figma-reference/src/app/components/RSLAbout.tsx
- figma-reference/src/app/components/RSLCapabilities.tsx
- figma-reference/src/app/components/RSLCapabilityDetail.tsx
- figma-reference/src/app/components/RSLCaseStudyDetail.tsx
- figma-reference/src/app/components/RSLContact.tsx
- figma-reference/src/app/components/RSLCoverage.tsx
- figma-reference/src/app/components/RSLHomepage.tsx
- figma-reference/src/app/components/RSLIndustries.tsx
- figma-reference/src/app/components/RSLIndustryDetail.tsx
- figma-reference/src/app/components/RSLInsightDetail.tsx
- figma-reference/src/app/components/RSLInsights.tsx
- figma-reference/src/app/components/RSLServices.tsx
- figma-reference/src/app/components/SpacingSystem.tsx
- figma-reference/src/app/components/TypographySystem.tsx
- figma-reference/src/app/components/figma/ImageWithFallback.tsx
- figma-reference/src/app/components/homepage/HeroSection.tsx
- figma-reference/src/app/components/homepage/IndustryCarousel.tsx
- figma-reference/src/app/components/homepage/LowerSections.tsx
- figma-reference/src/app/components/homepage/MiddleSections.tsx
- figma-reference/src/app/components/ui/accordion.tsx
- figma-reference/src/app/components/ui/alert-dialog.tsx
- figma-reference/src/app/components/ui/alert.tsx
- figma-reference/src/app/components/ui/aspect-ratio.tsx
- figma-reference/src/app/components/ui/avatar.tsx
- figma-reference/src/app/components/ui/badge.tsx
- figma-reference/src/app/components/ui/breadcrumb.tsx
- figma-reference/src/app/components/ui/button.tsx
- figma-reference/src/app/components/ui/calendar.tsx
- figma-reference/src/app/components/ui/card.tsx
- figma-reference/src/app/components/ui/carousel.tsx
- figma-reference/src/app/components/ui/chart.tsx
- figma-reference/src/app/components/ui/checkbox.tsx
- figma-reference/src/app/components/ui/collapsible.tsx
- figma-reference/src/app/components/ui/command.tsx
- figma-reference/src/app/components/ui/context-menu.tsx
- figma-reference/src/app/components/ui/dialog.tsx
- figma-reference/src/app/components/ui/drawer.tsx
- figma-reference/src/app/components/ui/dropdown-menu.tsx
- figma-reference/src/app/components/ui/form.tsx
- figma-reference/src/app/components/ui/hover-card.tsx
- figma-reference/src/app/components/ui/input-otp.tsx
- figma-reference/src/app/components/ui/input.tsx
- figma-reference/src/app/components/ui/label.tsx
- figma-reference/src/app/components/ui/menubar.tsx
- figma-reference/src/app/components/ui/navigation-menu.tsx
- figma-reference/src/app/components/ui/pagination.tsx
- figma-reference/src/app/components/ui/popover.tsx
- figma-reference/src/app/components/ui/progress.tsx
- figma-reference/src/app/components/ui/radio-group.tsx
- figma-reference/src/app/components/ui/resizable.tsx
- figma-reference/src/app/components/ui/scroll-area.tsx
- figma-reference/src/app/components/ui/select.tsx
- figma-reference/src/app/components/ui/separator.tsx
- figma-reference/src/app/components/ui/sheet.tsx
- figma-reference/src/app/components/ui/sidebar.tsx
- figma-reference/src/app/components/ui/skeleton.tsx
- figma-reference/src/app/components/ui/slider.tsx
- figma-reference/src/app/components/ui/sonner.tsx
- figma-reference/src/app/components/ui/switch.tsx
- figma-reference/src/app/components/ui/table.tsx
- figma-reference/src/app/components/ui/tabs.tsx
- figma-reference/src/app/components/ui/textarea.tsx
- figma-reference/src/app/components/ui/toggle-group.tsx
- figma-reference/src/app/components/ui/toggle.tsx
- figma-reference/src/app/components/ui/tooltip.tsx
- figma-reference/src/app/lib/components/ArticleSidebar.tsx
- figma-reference/src/app/lib/components/Breadcrumb.tsx
- figma-reference/src/app/lib/components/ContentSkeleton.tsx
- figma-reference/src/app/lib/components/CTABlock.tsx
- figma-reference/src/app/lib/components/DataHighlight.tsx
- figma-reference/src/app/lib/components/EditorialIndustryCard.tsx
- figma-reference/src/app/lib/components/GatewayLink.tsx
- figma-reference/src/app/lib/components/HeroImagePlaceholder.tsx
- figma-reference/src/app/lib/components/IndustryCard.tsx
- figma-reference/src/app/lib/components/IndustryTag.tsx
- figma-reference/src/app/lib/components/InsightCarouselCard.tsx
- figma-reference/src/app/lib/components/InstitutionalCTA.tsx
- figma-reference/src/app/lib/components/InstitutionalFooter.tsx
- figma-reference/src/app/lib/components/MidPageImageBand.tsx
- figma-reference/src/app/lib/components/OutcomeBlock.tsx
- figma-reference/src/app/lib/components/PhaseBlock.tsx
- figma-reference/src/app/lib/components/PreviewBanner.tsx
- figma-reference/src/app/lib/components/PullQuote.tsx
- figma-reference/src/app/lib/components/RelatedKnowledge.tsx
- figma-reference/src/app/lib/components/SectionHeader.tsx
- figma-reference/src/app/lib/components/SectionWrapper.tsx
- figma-reference/src/app/lib/components/ServiceCard.tsx
- figma-reference/src/app/lib/components/SiteNav.tsx
- figma-reference/src/app/lib/components/SummaryBlock.tsx
- src/components/ScrollReveal.tsx

