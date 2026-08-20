# OMNIKON: AI-Assisted Disaster Response Intelligence

OMNIKON is a hackathon prototype for disaster imagery triage and trusted response planning. The app demonstrates a complete decision flow:

**Upload disaster image → Simulated AI assessment → Human verification → Response planning priorities**

> **Current stage:** Idea submission + functional prototype.  
> This repository includes a working demo workflow, but AI inference is currently **simulated** (no trained model or production pipeline yet).

## What is Functional Today
- Web dashboard with OMNIKON project overview
- Image upload and preview
- Simulated AI damage assessment with categories:
  - Low
  - Moderate
  - Severe
- Simulated AI confidence score display
- Human reviewer verification (confirm or modify AI classification)
- Visible AI vs verified comparison and **Verified** status
- Response planning recommendations based on verified damage level

## What is Still Concept/Planned
- Real model inference over satellite/drone/ground imagery
- Operational data ingestion pipelines
- Production-grade reviewer tooling, persistence, and map integration

## Prototype Tech Stack
- Vanilla HTML/CSS/JavaScript (ES modules)
- Static local hosting via Python `http.server`
- Node.js built-in test runner (`node --test`) for basic logic tests

## Local Setup

### Requirements
- Python 3.9+ (for local static hosting)
- Node.js 18+ (for running tests)

### Run the prototype
From repository root:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/src/
```

### Run tests
From repository root:

```bash
npm test
```

## Project Structure
```text
.
├── README.md
├── LICENSE
├── .gitignore
├── package.json
├── src/
│   ├── index.html      # Prototype UI
│   ├── styles.css      # UI styling
│   ├── app.js          # Browser workflow wiring
│   └── logic.js        # Core prototype logic (testable)
├── tests/
│   └── logic.test.js   # Basic workflow logic tests
├── docs/
│   └── README.md
└── data/
    └── README.md
```

## Prototype Workflow
1. Upload an image.
2. OMNIKON generates a **simulated** AI damage class and confidence score.
3. A human reviewer confirms or updates the classification.
4. The system shows verification status and generates prioritized response guidance.

## License
This project is licensed under the MIT License. See [`LICENSE`](./LICENSE).
