# 📐 System Design Hub & Interactive Learning Portal

Welcome to the **System Design Hub**, a comprehensive, production-grade interactive learning environment and repository dedicated to mastering **Low-Level Design (LLD)**, **High-Level Design (HLD)**, Object-Oriented Programming (OOP), and scalable software architectures.

This repository includes both raw, beautifully structured study resources and a **Next.js 16 Web Application** that acts as your private visual hub!

---

## 🎨 Interactive Hub Visual Preview

The custom learning platform is built with high-fidelity aesthetics, featuring:
*   **🌓 Unified Theme Toggling**: Seamless transition between light and dark modes, fully selector-based, resolving Tailwind v4 OS conflicts.
*   **💻 macOS-style Code Editor Cards**: Syntax-highlighted code blocks styled in deep charcoal (`#0e0e11`) with circular window handles and instant interactive copy controls.
*   **📖 Dynamic Search**: Fuzzy search that instantly filters 73+ LLD lessons, auto-expanding categories.
*   **📄 Native PDF & Word docx Renderer**: Tall-height responsive layout frames displaying high-fidelity System Design Roadmaps and High-Level Design specifications directly.

---

## 📂 Repository Structure

```bash
├── Low_Level_Design_Notes.md    # 73 detailed lessons covering SOLID, OOP, and Design Patterns
├── System Design HLD.docx       # Production-grade High-Level Architecture specifications
├── system-design-roadmap.pdf    # Full visual System Design roadmap
├── system-design-resources/     # Core interview guides and Top 20 Questions
└── next-docs/                   # Next.js 16 (Turbopack) Interactive learning web application
```

---

## 🚀 Running the Interactive Learning Hub

To run the premium next-docs web application locally:

### 1. Install Dependencies
Navigate to the web application directory and install the packages:
```bash
cd next-docs
npm install
```

### 2. Parse & Ingest Raw Content
Run our custom content processor to dynamically parse all Markdown, Word documents, and PDFs into structured lessons with clean syntax and formatting:
```bash
node process_content.js
```

### 3. Run Development Server
Fire up the local development server under Turbopack:
```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser and start learning!

---

## 🌟 Key LLD Course Topics Included

*   **Object-Oriented Design (OOD)**: Polymorphism, Abstraction, Encapsulation, Generics, and Wildcards.
*   **SOLID Principles**: Comprehensive deep-dives, bad patterns vs. optimized patterns.
*   **Behavioral Patterns**: Strategy, Observer, Command, Iterator, State, and Chain of Responsibility.
*   **Creational Patterns**: Singleton, Factory, Abstract Factory, Builder, and Prototype.
*   **Structural Patterns**: Adapter, Decorator, Facade, Composite, Proxy, and Bridge.
*   **Real-world Design Exercises**: Splitwise, Parking Lot, Movie Booking System, and Chess Engine LLD.

---

*Crafted with 💙 by Antigravity.*
