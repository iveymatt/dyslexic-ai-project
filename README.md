# 🧠 Dyslexic AI - LLM Clone for Neurodivergent Users

A full-stack AI-powered accessibility system designed specifically for dyslexic and neurodivergent users.

## 📊 Project Stats
- **3,789+ lines of code**
- **24 Python modules**
- **Full ML/AI pipeline**
- **REST API backend**
- **Interactive web interface**

## 🏗️ Architecture

### Backend (Python/FastAPI)
- **ML/AI Engine** - Cognitive processing, model management, training pipeline, adaptation engine
- **Core System** - Accessibility manager, processing manager, model integration, system config
- **API Layer** - REST API endpoints, integration manager, response formatter
- **Security** - Authentication, data protection, security manager
- **Monitoring** - Analytics engine, system monitor, error tracker, performance monitor

### Frontend (HTML/CSS/JavaScript)
- Interactive text processing interface
- Real-time accessibility controls
- Live statistics dashboard
- Botpress chatbot integration

## 🚀 Quick Start

### 1. Install Python Dependencies
```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Mac/Linux
# OR on Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Start the Backend Server
```bash
# Run the FastAPI backend on port 8000
python app.py
```

You should see:
```
🚀 Starting Dyslexic AI Server...
📊 LLM Clone for Neurodivergent Users
🌐 Server will be available at: http://localhost:8000
📝 API Documentation: http://localhost:8000/docs
```

### 3. Start the Frontend (in a new terminal)
```bash
# Install Node dependencies (one time only)
npm install

# Start Vite dev server on port 5173
npm run dev
```

### 4. Open the Application
- **Frontend**: http://localhost:5173/
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 🎮 Features

### ✨ AI-Powered Text Processing
- Cognitive load optimization
- Text simplification
- Readability enhancement
- Real-time processing

### 🎨 Accessibility Features
- **Fonts**: OpenDyslexic, Arial, Comic Sans MS
- **Line Spacing**: Adjustable 1.2x - 2.5x
- **Color Schemes**: High contrast, dark mode, light mode
- **Simplification Levels**: Low, Medium, High

### 📊 System Monitoring
- Live statistics
- Module status tracking
- Performance metrics
- User analytics

## 📁 Project Structure

```
dyslexic-ai-project/
├── app.py                 # FastAPI backend server
├── index.html            # Web frontend
├── requirements.txt      # Python dependencies
├── package.json          # Node dependencies
│
├── src/
│   ├── ml/              # ML/AI modules
│   │   ├── cognitive_processor.py
│   │   ├── model_manager.py
│   │   ├── training_pipeline.py
│   │   └── adaptation_engine.py
│   │
│   ├── core/            # Core system
│   │   ├── accessibility_manager.py
│   │   ├── processing_manager.py
│   │   ├── model_integration.py
│   │   └── system_config.py
│   │
│   ├── api/             # API layer
│   ├── security/        # Security modules
│   └── monitoring/      # Monitoring modules
│
├── tests/               # Test suite
├── config/             # Configuration files
├── docs/               # Documentation
└── examples/           # Usage examples
```

## 🔌 API Endpoints

- `GET /api/health` - Health check
- `GET /api/info` - System information
- `POST /api/process` - Process text with AI
- `GET /api/stats` - System statistics
- `GET /api/preferences/{user_id}` - Get user preferences
- `POST /api/preferences/{user_id}` - Update user preferences

## 🧪 Testing

```bash
# Run tests
pytest tests/

# Run with coverage
pytest --cov=src tests/
```

## 📝 License

MIT License

## 👥 Contributing

Contributions welcome! This project aims to make AI more accessible for neurodivergent users.

## 🙏 Acknowledgments

Built with ❤️ for the neurodivergent community
