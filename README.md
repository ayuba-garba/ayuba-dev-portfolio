# Student Records Microservice API

> A lightweight, stateless RESTful service engineered with Node.js and Express to handle student profile provisioning, payload schema validation, and lifecycle management.

[![Runtime](https://img.shields.io/badge/Node.js-18.x%2B-green.svg)]()
[![Framework](https://img.shields.io/badge/Express-4.x-lightgrey.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🏛️ Architecture & Core Mechanics

This service exposes structured RESTful endpoints for student entity creation and querying:
- **Middleware Pipeline:** Configured with `express.json()` body-parsing middleware for non-blocking payload handling.
- **Request Validation:** Enforces strict field requirements (`name`, `role`) before persisting records, returning deterministic `400 Bad Request` responses on incomplete data packages.
- **State Management:** Operates on an in-memory runtime store optimized for rapid prototyping and unit testing without database dependencies.

---

## 📡 API Endpoints

### 1. Retrieve All Records
- **Method:** `GET`
- **Path:** `/api/students`
- **Response:** `200 OK`

### 2. Register Record
- **Method:** `POST`
- **Path:** `/api/students`
- **Payload:**
  ```json
  {
    "name": "Alex Mercer",
    "role": "Systems Engineering Intern"
  }
