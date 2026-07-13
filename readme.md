<img width="3002" height="1650" alt="image" src="https://github.com/user-attachments/assets/2ff4309d-ae14-4bb2-980b-d9ba19ef42cb" /><div align="center">

# ⚡ Flash — Fastest Way to Learn

**A peer-to-peer e-learning platform for sharing knowledge, teaching skills, and mastering self-learning together.**

[![Frontend](https://img.shields.io/badge/Frontend-Next.js-000000?logo=next.js&logoColor=white)](#tech-stack)
[![Backend](https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?logo=springboot&logoColor=white)](#tech-stack)
[![Database](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql&logoColor=white)](#tech-stack)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](#license)

[Features](#features) • [Design Patterns](#design-patterns) • [Tech Stack](#tech-stack) • [Installation](#installation) • [Team](#team)

</div>

---

## About

Flash is an e-learning platform built around one idea: **the best way to learn is to teach**. Users can host and join live one-on-one sessions, sell or explore courses, get AI-powered recommendations and video summaries, and track their learning progress — all in one place.

## Features

- 🎥 **One-to-One Personalized Sessions** — live, focused learning sessions between a learner and a tutor
- 📅 **Schedule Future Sessions** — plan and book sessions in advance
- 🛒 **Sell and Manage Courses** — create, publish, and manage your own courses
- 🔍 **Explore and Buy Courses** — browse and enroll in courses from other creators
- 📊 **Track Course Progress** — monitor completion and learning milestones
- 🤖 **Course Recommendation System** — AI-driven suggestions based on user interests
- 📝 **Video Summarizer** — automatic transcription and summarization of session videos

## Design Patterns

Flash's architecture applies eight classic design patterns to keep the codebase flexible, maintainable, and scalable:

| Pattern | Category | Used For |
|---|---|---|
| **Strategy** | Behavioral | Swappable transcription/summarization models (Whisper, BART) in the video summarizer |
| **Singleton** | Creational | A single, thread-safe `WebSocketService` instance managing all live connections |
| **Observer** | Behavioral | Request/auth filters that broadcast real-time updates to subscribed clients |
| **Facade** | Structural | Service classes that encapsulate complex, multi-step operations behind simple methods |
| **Mediator** | Behavioral | Middleware that centralizes access control and session handling |
| **Prototype** | Creational | A shared base auth-form component reused across login/register UIs |
| **Builder** | Creational | Incremental, chained construction of `SessionSettings` objects |
| **Flyweight** | Structural | Debounced, shared state for search input to reduce redundant backend calls |

📄 A full write-up with problem/solution breakdowns and UML diagrams for each pattern is available in the project's design documentation.

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js, JavaScript, TailwindCSS |
| **Backend** | Spring Boot, Java |
| **Database** | PostgreSQL |
| **Real-time / Video** | [100ms Live](https://dashboard.100ms.live/developer) |

## Installation

### Prerequisites

- [PostgreSQL](https://www.postgresql.org/) server (local or cloud)
- [100ms Live](https://dashboard.100ms.live/developer) developer account
- Java + Maven, and Node.js installed locally

### 1. Clone the repository

```bash
git clone https://github.com/saged-sama/Flash---Fastest-Way-to-Learn.git
```

### 2. Set up the database

```sql
-- login to the postgres CLI and run:
CREATE DATABASE <your_database_name>;
```

### 3. Configure the backend

Add your database credentials to `spring-backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://<database_host>:<database_port>/<your_database_name>
spring.datasource.username=<your_postgresql_username>
spring.datasource.password=<your_postgresql_password>
```

### 4. Configure 100ms Live

Grab your keys from the [100ms Live Dashboard](https://dashboard.100ms.live/developer) and set them as environment variables.

**Linux / macOS (bash):**

```bash
export access_key=<your_key>
export app_secret=<your_key>
export management_token=<your_key>
export template_id=<your_template_id>
export jwt_secret=$(openssl rand -base64 32)
```

**Windows (cmd):**

> Requires [OpenSSL for Windows](https://slproweb.com/products/Win32OpenSSL.html)

```cmd
set access_key=<your_key>
set app_secret=<your_key>
set management_token=<your_key>
set template_id=<your_template_id>
for /f "tokens=*" %i in ('openssl rand -base64 32') do set jwt_secret=%i
```

### 5. Run the backend

```bash
mvn spring-boot:run
```

### 6. Run the frontend

```bash
cd next-frontend
npm install
npm run dev
```

## Team

Built by a team from **CSEDU**:

| Name | Contributions |
|---|---|
| **Sarower Jahan Rafin** | Landing page design, course section (backend & frontend), video summarizer |
| **Mahmudul Hasan Yeamim** | Recommendation system, AI chatbot, frontend landing page |
| **Abrar Eyasir** | Session design, session backend, database design |
| **Md Emon Khan** | Session backend & frontend, frontend-backend connection, database design |
| **Mahmudul Hasan Sajid** | Design patterns: Singleton, Prototype, Builder, Facade, Flyweight, Mediator, Observer, Strategy |

## License

This project is licensed under the MIT License.
# Flash - Fastest Way to Learning
