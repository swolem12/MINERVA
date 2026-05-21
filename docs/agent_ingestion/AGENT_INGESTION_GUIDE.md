# MINERVA Agent Ingestion Guide

This package is designed to be ingested by autonomous or semi-autonomous coding agents.

## Agent Priority Order

Read files in this order:

1. `README.md`
2. `package_manifest.json`
3. `toon_packages/core/application_manifest.toon`
4. `toon_packages/curriculum/verified_afoqt_scope.toon`
5. `toon_packages/core/question_generation_governor.toon`
6. `toon_packages/core/system_architecture.toon`
7. `toon_packages/ui/ui_design_system.toon`
8. `toon_packages/mobile/mobile_systems.toon`
9. `build_prompts/MASTER_100K_BUILD_PROMPT.md`

## Critical Build Constraint

Do not create a generic math app.

MINERVA is scoped to AFOQT quantitative preparation, specifically Arithmetic Reasoning and Math Knowledge.

## Agent Behavior Rules

- Preserve the MINERVA name everywhere.
- Enforce centered typography and layouts.
- Build mobile-first.
- Preserve Android and PWA deployment support.
- Use Firebase as the default backend architecture.
- Reject off-scope curriculum.
- Prefer small, testable modules.
- Validate generated questions before adding them to content.
- Keep adult learners in mind.
- Make failure safe, useful, and motivating.

## Suggested Build Phases

Phase 1:

- App shell
- Design system
- Curriculum guardrails
- User profile model
- Diagnostic placement engine

Phase 2:

- Lesson engine
- Question engine
- Mental Forge
- Formula Armory
- Word Problem Translator

Phase 3:

- ARPG campaign map
- XP and ranks
- Boss battles
- Daily missions
- Streaks

Phase 4:

- Officer Trials
- Timed simulation
- Pacing coach
- AI after-action review
- Analytics dashboard

Phase 5:

- PWA install
- Capacitor Android packaging
- Offline caching
- Push notifications
- Firebase sync
