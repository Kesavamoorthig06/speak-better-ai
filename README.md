# SpeakBetter AI

A polished AI-powered public speaking coach that analyzes speech patterns, eye contact, and presentation quality to help users improve their confidence and delivery.

## Why this project stands out

- Real-time voice and video analysis workflow
- AI-style speaking feedback for confidence building
- Clean frontend experience with a modern dashboard
- FastAPI backend for upload and analysis processing
- Designed for interviews, presentations, and public speaking practice

## Tech stack

- Frontend: React + Vite
- Styling: CSS with responsive layout components
- Backend: FastAPI + Python
- Analysis: OpenCV, speech recognition, audio processing

## Features

- Video and audio upload pipeline
- Eye contact percentage analysis
- Speech metrics such as filler words and words per minute
- Transcript extraction and report generation
- Clean experience for presentation review and improvement

## Project structure

```text
speaking-EVAL/
├── backend/
│   ├── analysis/
│   ├── uploads/
│   └── main.py
├── frontend/
│   ├── src/
│   └── package.json
├── .gitignore
├── README.md
├── package.json
└── eslint.config.js
```

## Getting started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install fastapi uvicorn pydub SpeechRecognition opencv-python
uvicorn main:app --reload
```

## Future vision

This app is positioned as a practical communication assistant that blends AI analysis, data storytelling, and performance coaching into one elegant experience.

## License

This project is currently for personal and portfolio use.
