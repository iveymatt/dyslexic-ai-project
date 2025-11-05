# Quick Start Guide - Dyslexic AI with LibreChat

Get up and running in 5 minutes!

## ⚡ Prerequisites

- Docker & Docker Compose installed
- Node.js 18+ and npm installed
- At least one API key (OpenAI, Anthropic, or Google)

## 🚀 Setup Steps

### 1. Clone LibreChat (2 minutes)

```bash
cd ~/dyslexic-ai-project/backend/LibreChat
git clone https://github.com/danny-avila/LibreChat.git .
```

### 2. Add Your API Key (1 minute)

```bash
# Edit the .env file
nano .env

# Add at least ONE real API key:
# OPENAI_API_KEY=sk-your-key-here
# OR
# ANTHROPIC_API_KEY=sk-ant-your-key-here
# OR
# GOOGLE_API_KEY=your-key-here
```

Get keys from:
- **OpenAI**: https://platform.openai.com/api-keys
- **Anthropic**: https://console.anthropic.com/
- **Google**: https://makersuite.google.com/app/apikey

### 3. Start Backend (1 minute)

```bash
# Still in backend/LibreChat directory
docker-compose up -d

# Wait 30 seconds for startup
sleep 30

# Check it's running
curl http://localhost:3080/health
```

You should see: `{"status":"ok"}` or similar

### 4. Start Frontend (1 minute)

```bash
# Open a new terminal
cd ~/dyslexic-ai-project/frontend

# Install dependencies (first time only)
npm install

# Start the dev server
npm run dev
```

### 5. Open in Browser

Go to: **http://localhost:5173**

You should see:
- ✅ "Connected" status (green)
- ✅ AI model selector
- ✅ Welcome message
- ✅ Chat input

## 🎉 You're Ready!

Try these test messages:

1. **Simple greeting**: "Hello! Can you help me?"
2. **Test dyslexia features**: "Explain what photosynthesis is"
3. **Switch models**: Select different AI models from dropdown

## 🐛 Something Wrong?

### Backend Issues

```bash
# Check Docker containers
docker ps

# Should see:
# - librechat-api (running)
# - mongodb (running)

# If not running, check logs:
docker-compose logs -f
```

### Frontend Issues

```bash
# Check if backend is reachable
curl http://localhost:3080/health

# Restart frontend
npm run dev
```

### Still Having Issues?

1. Check the full guide: `LIBRECHAT_INTEGRATION_GUIDE.md`
2. Look at the troubleshooting section
3. Verify your API key is correct

## 📖 What's Next?

After you have it working:

1. **Explore Models**: Try GPT-4, Claude, or Gemini
2. **Test Features**: Clear conversation, error handling
3. **Customize**: Read `frontend/README.md` for customization
4. **Learn More**: See `LIBRECHAT_INTEGRATION_GUIDE.md`

## 🎨 Key Features to Try

1. **Model Switching**: Select different AI models
2. **Dyslexic-Friendly**: Notice the clear formatting
3. **Conversation Memory**: Ask follow-up questions
4. **Error Handling**: Stop backend and see error message
5. **Clear Conversation**: Start fresh anytime

## 💡 Tips

- **GPT-3.5** is fastest and cheapest - good for testing
- **GPT-4 & Claude** are better for complex questions
- **Enter key** sends messages
- **Clear conversation** when switching topics
- The AI remembers your conversation context

## 🛑 Stopping Everything

```bash
# Stop frontend: Ctrl+C in terminal

# Stop backend:
cd ~/dyslexic-ai-project/backend/LibreChat
docker-compose down
```

## ⏭️ Next Session

To start again later:

```bash
# Start backend
cd ~/dyslexic-ai-project/backend/LibreChat
docker-compose up -d

# Start frontend (new terminal)
cd ~/dyslexic-ai-project/frontend
npm run dev
```

---

**Happy Chatting!** 🚀

Need help? See: `LIBRECHAT_INTEGRATION_GUIDE.md`
