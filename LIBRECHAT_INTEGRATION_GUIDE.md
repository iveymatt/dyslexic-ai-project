# LibreChat Backend Integration - Full Setup Guide

## 🎯 Project Overview

This integration adds LibreChat as a multi-LLM backend to the Dyslexic AI project, providing access to:
- **OpenAI** (GPT-3.5 Turbo, GPT-4)
- **Anthropic** (Claude 3 Opus, Claude 3 Sonnet)
- **Google** (Gemini Pro)

The frontend is a React/TypeScript/Vite application with dyslexia-friendly features.

## 📁 Project Structure

```
dyslexic-ai-project/
├── backend/
│   └── LibreChat/
│       ├── .env                          # LibreChat configuration
│       ├── docker-compose.override.yml   # Docker configuration
│       └── [LibreChat repository files]  # Clone from GitHub
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatArea.enhanced.tsx     # Main chat interface
│   │   │   └── ModelSelector.tsx         # AI model selector
│   │   ├── services/
│   │   │   └── librechat.ts              # API integration layer
│   │   ├── App.tsx                       # Main app component
│   │   ├── App.css                       # Dyslexia-friendly styles
│   │   └── main.tsx                      # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── index.html
├── src/                                  # Existing Python backend
└── LIBRECHAT_INTEGRATION_GUIDE.md        # This file
```

## 🚀 Quick Start

### Prerequisites

- **Docker & Docker Compose** (for LibreChat backend)
- **Node.js 18+** and **npm** (for frontend)
- **Git** (to clone LibreChat)
- API keys for at least one LLM provider

### Step 1: Set Up LibreChat Backend

```bash
# Navigate to backend directory
cd ~/dyslexic-ai-project/backend/LibreChat

# Clone LibreChat (if not already cloned)
git clone https://github.com/danny-avila/LibreChat.git .

# The .env file is already configured with placeholders
# Edit it to add your real API keys:
nano .env

# Start LibreChat with Docker Compose
docker-compose up -d

# Wait for services to start (about 30 seconds)
sleep 30

# Verify it's running
curl http://localhost:3080/health
docker ps
```

### Step 2: Set Up Frontend

```bash
# Navigate to frontend directory
cd ~/dyslexic-ai-project/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Step 3: Access the Application

Open your browser to: **http://localhost:5173**

You should see:
- ✅ Connection status showing "Connected"
- ✅ Model selector with multiple AI models
- ✅ Welcome message in dyslexia-friendly format
- ✅ Chat input field

## 🔑 API Keys Setup

### Required: At least one of these

1. **OpenAI API Key**
   - Get from: https://platform.openai.com/api-keys
   - Add to `.env` as: `OPENAI_API_KEY=sk-...`

2. **Anthropic API Key**
   - Get from: https://console.anthropic.com/
   - Add to `.env` as: `ANTHROPIC_API_KEY=sk-ant-...`

3. **Google API Key**
   - Get from: https://makersuite.google.com/app/apikey
   - Add to `.env` as: `GOOGLE_API_KEY=...`

After adding keys, restart LibreChat:
```bash
cd ~/dyslexic-ai-project/backend/LibreChat
docker-compose restart
```

## ✨ Features

### Dyslexia-Friendly Design

- **OpenDyslexic Font**: Specialized font for easier reading
- **High Contrast**: Clear text and backgrounds
- **Generous Spacing**: Extra line height and letter spacing
- **Clear Structure**: Visual organization with borders and colors
- **Large Text**: 16px+ font sizes throughout
- **Simple Language**: AI trained to use clear, simple explanations

### Multi-Model Support

Switch between AI models on-the-fly:
- **GPT-3.5 Turbo**: Fast responses, good for quick questions
- **GPT-4**: Best for complex reasoning and analysis
- **Claude 3 Opus**: Excellent for writing and detailed analysis
- **Claude 3 Sonnet**: Balanced performance
- **Gemini Pro**: Google's advanced model

### Chat Features

- ✅ Real-time streaming responses
- ✅ Conversation memory (maintains context)
- ✅ Connection status indicator
- ✅ Clear conversation button
- ✅ Error handling with helpful messages
- ✅ Keyboard shortcuts (Enter to send)

## 🛠️ Development

### Frontend Development

```bash
cd ~/dyslexic-ai-project/frontend

# Install dependencies
npm install

# Start dev server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Backend Management

```bash
cd ~/dyslexic-ai-project/backend/LibreChat

# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f api
docker-compose logs -f mongodb

# Restart services
docker-compose restart

# Rebuild services (after .env changes)
docker-compose up -d --build
```

## 🧪 Testing

### Test Frontend Connection

```bash
# Open browser console at http://localhost:5173
# You should see:
# - "Connected" status
# - No console errors
```

### Test Backend API

```bash
# Test health endpoint
curl http://localhost:3080/health

# Test chat endpoint (with OpenAI)
curl -X POST http://localhost:3080/api/chat/openAI \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Hello"}],
    "model": "gpt-3.5-turbo"
  }'
```

### Manual Testing Checklist

- [ ] Connection status shows "Connected"
- [ ] Can select different AI models
- [ ] Can send messages and receive responses
- [ ] Messages display in dyslexia-friendly format
- [ ] Clear conversation button works
- [ ] Error messages show when backend is down
- [ ] Streaming responses work (text appears gradually)
- [ ] Keyboard shortcut (Enter) sends messages

## 🐛 Troubleshooting

### Frontend can't connect to backend

**Symptoms**: Connection status shows "Disconnected" or "Error"

**Solutions**:
1. Verify LibreChat is running:
   ```bash
   cd ~/dyslexic-ai-project/backend/LibreChat
   docker ps
   ```

2. Check CORS configuration in `.env`:
   ```
   CORS_ORIGINS=http://localhost:5173,http://localhost:5174
   ```

3. Test backend directly:
   ```bash
   curl http://localhost:3080/health
   ```

4. Check firewall (if applicable):
   ```bash
   sudo ufw allow 3080
   ```

### LibreChat won't start

**Symptoms**: `docker-compose up` fails or containers exit immediately

**Solutions**:
1. Check Docker is running:
   ```bash
   docker --version
   systemctl status docker  # Linux
   ```

2. Check for port conflicts:
   ```bash
   lsof -i :3080
   lsof -i :27017
   ```

3. View detailed logs:
   ```bash
   docker-compose logs -f
   ```

4. Remove containers and try again:
   ```bash
   docker-compose down -v
   docker-compose up -d
   ```

### AI responses failing

**Symptoms**: Messages send but get error responses

**Solutions**:
1. Verify API keys are correct in `.env`
2. Check you have credits/quota with the provider
3. Test API key directly:
   ```bash
   # For OpenAI
   curl https://api.openai.com/v1/models \
     -H "Authorization: Bearer YOUR_KEY"
   ```

4. Check LibreChat logs:
   ```bash
   docker-compose logs -f api | grep -i error
   ```

### Frontend build errors

**Symptoms**: `npm install` or `npm run dev` fails

**Solutions**:
1. Check Node.js version:
   ```bash
   node --version  # Should be 18+
   ```

2. Clear npm cache:
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Check for TypeScript errors:
   ```bash
   npm run lint
   ```

## 📊 Performance Tips

### Optimize Response Speed

1. **Use GPT-3.5 Turbo** for quick questions (fastest)
2. **Enable streaming** for better perceived performance
3. **Keep conversations focused** - start new chat for new topics
4. **Use appropriate models** - don't use GPT-4 for simple tasks

### Reduce Costs

1. **Start with GPT-3.5** (cheapest)
2. **Only use GPT-4/Claude Opus** for complex tasks
3. **Clear conversations** when switching topics (reduces tokens)
4. **Set up rate limiting** in `.env` to prevent abuse

## 🔒 Security Notes

### Important Security Practices

1. **Never commit `.env` files** to version control
2. **Use environment variables** for API keys in production
3. **Enable rate limiting** to prevent abuse
4. **Keep LibreChat updated** for security patches
5. **Use HTTPS** in production (configure reverse proxy)

### Production Deployment

For production, you should:
1. Use a reverse proxy (nginx/Caddy) with HTTPS
2. Use real secrets (not the placeholder ones)
3. Enable authentication
4. Set up proper CORS origins
5. Configure rate limiting appropriately
6. Use a managed MongoDB instance
7. Set up monitoring and logging

## 🎨 Customization

### Add More AI Models

Edit `frontend/src/services/librechat.ts` and add to `getAvailableModels()`:

```typescript
{
  id: 'gpt-4-turbo-preview',
  name: 'GPT-4 Turbo',
  provider: 'OpenAI',
  description: 'Faster GPT-4 variant',
  isAvailable: true,
}
```

### Customize System Prompt

Edit `getDyslexiaSystemPrompt()` in `frontend/src/services/librechat.ts`

### Change Styling

Edit `frontend/src/App.css` for global styles or inline styles in components

### Add Features

Consider adding:
- Voice input/output
- Conversation history
- Prompt library
- Settings panel
- Dark mode
- Text-to-speech

## 📚 Next Steps

After this integration is working:

1. **Add Authentication**
   - Implement user accounts
   - Store conversation history per user

2. **Integrate Pipecat** (Voice)
   - Add voice input
   - Add text-to-speech output

3. **Add Supabase Backend**
   - Store user data
   - Save conversation history
   - Implement user preferences

4. **Career Discovery Features**
   - Add career assessment tools
   - Integrate job recommendations
   - Add skill tracking

5. **Enhanced Accessibility**
   - Add more dyslexia-friendly features
   - Implement accessibility settings panel
   - Add screen reader support

## 📖 Resources

- **LibreChat Documentation**: https://docs.librechat.ai/
- **OpenAI API Docs**: https://platform.openai.com/docs
- **Anthropic API Docs**: https://docs.anthropic.com/
- **Google AI Docs**: https://ai.google.dev/docs
- **Dyslexia-Friendly Design**: https://www.dyslexia.com/
- **React Documentation**: https://react.dev/
- **Vite Documentation**: https://vitejs.dev/

## 🤝 Contributing

To contribute to this project:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📝 License

This project combines:
- LibreChat (MIT License)
- Your custom frontend (your license)

Make sure to respect all licenses when deploying.

## 💡 Tips for Neurodivergent Users

This application is designed with neurodivergent users in mind:

- **Take breaks**: The AI will remember your conversation
- **Ask for clarification**: The AI is trained to explain differently
- **Use simple questions**: Break complex topics into smaller questions
- **Switch models**: Different AIs have different strengths
- **Clear when overwhelmed**: Start fresh when information overload hits

Remember: There's no "wrong" way to use this tool. It's here to help YOU in the way that works best for YOU.

---

**Need Help?** Check the troubleshooting section or open an issue on GitHub.
