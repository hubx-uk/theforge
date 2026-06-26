alter table case_studies
  add column if not exists body text not null default '';

update case_studies set body = '## Background

Jovico World needed more than a polished storefront. The team was selling electric mobility products and solar equipment across Nigeria, but the customer journey still depended on manual product enquiries, scattered WhatsApp conversations, and an operations process that made it difficult to track interest, orders, and follow-up.

## What We Built

We designed and built a full-stack e-mobility commerce platform with a structured product catalog, category-specific specification tables, customer account flows, and a bespoke admin dashboard for day-to-day operations. The platform gives customers a clearer way to compare vehicles, solar panels, inverters, and related accessories while giving the internal team a single place to manage products and enquiries.

## Technical Approach

The build uses Next.js for the customer-facing experience, a Postgres-backed data model for products and orders, and admin tooling tailored to Jovico''s workflow. We separated customer and admin concerns, kept product data structured enough for future categories, and optimized the storefront for mobile-first browsing in low-bandwidth conditions.

## Outcome

Jovico now has a platform that can support catalog growth, customer self-service, and ongoing operational improvements. The engagement continues through an Inferno retainer focused on admin refinements, performance hardening, and new sales enablement features.'
where slug = 'jovico' and body = '';

update case_studies set body = '## The Challenge

Fabrica was growing, but its operations were spread across chat threads, spreadsheets, shared folders, and a static marketing site. The team needed a stronger digital foundation: one system for project visibility, quote management, client communication, and internal content updates.

## What We Built

We delivered a full construction platform with a public marketing site, admin CMS, client-facing project tracker, and quote workflow. Staff can create projects, update milestones, attach documents, and manage quote approvals. Clients can log in to follow progress, review documents, and reduce the constant back-and-forth that usually surrounds active construction work.

## Technical Approach

The system was built with Next.js and Supabase, using a clean data model for projects, clients, quotes, documents, and invoices. The admin experience was designed around practical operations rather than generic dashboards, so the team can move from enquiry to quote to project updates without duplicating work.

## Outcome

Fabrica moved from spreadsheet-heavy operations into a centralized workflow. Quote turnaround became faster, client update requests dropped sharply, and the business gained a platform it can extend as new project and billing needs emerge.'
where slug = 'fabrica' and body = '';

update case_studies set body = '## The Problem

Manella Stores had an e-commerce site that looked acceptable in the editor but performed poorly for real customers. The WooCommerce build depended on a heavy page-builder stack, too many plugins, and slow mobile pages. Since most traffic arrived on phones, performance issues were directly hurting conversion.

## What We Built

We rebuilt the storefront around a lean custom WooCommerce theme, simplified the plugin stack, optimized product templates, and redesigned the checkout experience for faster purchasing. The work focused on the places where speed, clarity, and trust most directly affect revenue.

## Technical Approach

The project combined theme development, WooCommerce optimization, caching, image delivery improvements, database cleanup, and a measured audit of the checkout funnel. We removed unnecessary page-builder overhead and replaced fragile plugin behavior with focused theme code.

## Outcome

Load time dropped from 6.4 seconds to 2.1 seconds, mobile conversion more than doubled, and cart abandonment fell. The store gained a cleaner technical base for ongoing SEO, conversion testing, and merchandising work.'
where slug = 'manella' and body = '';

update case_studies set body = '## The Situation

Hubx Consulting needed a digital presence that matched the clarity and authority of its advisory work. The brand had strong expertise, but the site did not communicate its positioning, services, or credibility with enough focus.

## What We Built

We created a sharp, performant marketing site with clear service messaging, stronger trust signals, and a structure that makes it easier for prospective clients to understand the firm''s value. The result is a professional web presence that supports business development rather than simply existing as a brochure.

## Technical Approach

The site was built with Next.js and Tailwind, keeping performance, accessibility, and content maintainability at the center. The page structure prioritizes quick scanning, service clarity, and conversion paths for qualified enquiries.

## Outcome

Hubx now has a faster and more credible brand presence that can support campaigns, referrals, and future content expansion.'
where slug = 'hubx-consulting' and body = '';

update case_studies set body = '## The Challenge

Vertex AI Solutions needed to validate demand for a new SaaS product before committing to a larger build. The team required a launch-ready landing page that could explain the product, capture waitlist interest, and support early pricing experiments.

## What We Built

We designed and developed a SaaS landing page with product positioning, animated feature sections, pricing signals, and a waitlist capture flow. The page gives the team a polished front door for campaigns while collecting structured leads in Supabase.

## Technical Approach

The build uses Next.js, Supabase, and lightweight motion patterns. We kept the page fast, focused, and easy to iterate so copy, pricing, and product claims can evolve as the team learns from early users.

## Outcome

Vertex gained a credible launch surface and a data-backed waitlist flow, giving the team a practical way to test positioning and collect early demand.'
where slug = 'vertex-ai' and body = '';

update case_studies set body = '## Overview

Meridian Finance needed a secure product experience for customers who track financial portfolios and pay for ongoing access. The project centered on real-time visibility, subscription management, and account access that could scale across multiple organizations.

## What We Built

We designed a multi-tenant dashboard with portfolio views, subscription billing, team access, and SSO-ready account architecture. The interface gives users a clear view of holdings and performance while giving administrators control over plans and permissions.

## Technical Approach

The stack combines Next.js, Supabase, Stripe, and a role-aware data model. We prioritized secure tenancy boundaries, responsive dashboard layouts, and billing flows that can support plan changes without manual intervention.

## Outcome

Meridian gained a flexible SaaS foundation for portfolio analytics, account management, and recurring revenue.'
where slug = 'meridian-finance' and body = '';

update case_studies set body = '## Overview

Josren Apparel needed an e-commerce experience designed for higher average order value, faster product discovery, and cleaner checkout behavior. The brand had demand, but the old storefront did not do enough to merchandise complementary products.

## What We Built

We built a storefront with product bundling, upsell prompts, optimized collection pages, and a checkout flow tuned for mobile shoppers. The experience helps customers assemble outfits and add related items without feeling interrupted.

## Technical Approach

The project used Next.js, Stripe, and custom checkout logic to keep the buying path quick while giving the team flexible merchandising controls. We focused on page speed, product presentation, and friction reduction.

## Outcome

The optimized flow increased average order value by 34% and gave the brand a stronger foundation for campaigns and collection launches.'
where slug = 'josren-apparel' and body = '';

update case_studies set body = '## Overview

Blueshift SaaS was moving from a monolithic product into a more modular B2B platform. The team needed tenant isolation, role-based access, API key management, and a cleaner foundation for enterprise customers.

## What We Built

We built the core SaaS architecture for organizations, users, roles, API keys, subscriptions, and admin controls. The product supports multiple customer workspaces and gives internal teams better tools for managing access and account state.

## Technical Approach

The build used Next.js, Supabase, tRPC, and Stripe, with tenancy and permissions designed into the data model from the start. We emphasized explicit authorization checks, audit-friendly actions, and extensible account structures.

## Outcome

Blueshift gained a scalable B2B foundation that can support enterprise onboarding, modular feature delivery, and future API expansion.'
where slug = 'blueshift-saas' and body = '';

update case_studies set body = '## Overview

Axioms Creative needed a fast brand and site launch that still felt deliberate, credible, and distinctive. The timeline was tight, but the launch needed to include more than a generic template.

## What We Built

We created a brand identity, visual system, landing page, service structure, and motion details in a five-day sprint. The result gave the agency a clear public presence for outreach, proposals, and early client conversations.

## Technical Approach

The site was built with Next.js and a custom visual direction shaped in Figma. We kept the system lean, expressive, and easy to update, using motion only where it reinforced the brand.

## Outcome

Axiom launched with a polished identity and marketing site on schedule, giving the team a practical brand platform without delaying business development.'
where slug = 'axioms' and body = '';
