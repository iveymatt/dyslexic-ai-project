# Dyslexic AI Project

An AI-powered assistant designed specifically for neurodivergent users, featuring dyslexia-friendly interfaces and multi-LLM support.

## 🎯 Overview

This project provides an accessible AI chat interface with:
- **Multi-LLM Support**: OpenAI, Anthropic, and Google models
- **Dyslexia-Friendly Design**: OpenDyslexic font, high contrast, generous spacing
- **LibreChat Backend**: Unified API for multiple AI providers
- **React Frontend**: Modern, responsive TypeScript/Vite application

## 🚀 Quick Start

**Want to get started immediately?** See [QUICKSTART.md](QUICKSTART.md)

**For detailed setup:** See [LIBRECHAT_INTEGRATION_GUIDE.md](LIBRECHAT_INTEGRATION_GUIDE.md)

### One-Line Summary

1. Clone LibreChat to `backend/LibreChat/`
2. Add API keys to `backend/LibreChat/.env`
3. Run `docker-compose up -d` in backend
4. Run `npm install && npm run dev` in frontend
5. Open http://localhost:5173

## 📁 Project Structure

```
dyslexic-ai-project/
├── backend/
│   └── LibreChat/              # LibreChat backend integration
│       ├── .env                # Configuration & API keys
│       └── docker-compose.override.yml
├── frontend/                   # React/TypeScript/Vite app
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── services/           # API integration
│   │   ├── App.tsx
│   │   └── App.css            # Dyslexia-friendly styles
│   └── package.json
├── src/                        # Original Python backend
├── docs/                       # Documentation
├── scripts/                    # Utility scripts
├── tests/                      # Test suites
├── QUICKSTART.md              # 5-minute setup guide
├── LIBRECHAT_INTEGRATION_GUIDE.md  # Full documentation
└── README.md                   # This file
```

## ✨ Features

### For Neurodivergent Users

- **Clear Typography**: OpenDyslexic font optimized for dyslexia
- **High Contrast**: Easy-to-read color combinations
- **Generous Spacing**: Reduced visual crowding
- **Simple Language**: AI trained to use clear, simple explanations
- **Visual Structure**: Clear organization with borders and spacing
- **Patient Support**: AI provides supportive, encouraging responses

### Technical Features

- **Multi-Model AI**: Switch between GPT-3.5, GPT-4, Claude 3, Gemini
- **Real-Time Streaming**: See responses as they're generated
- **Conversation Memory**: Maintains context throughout chat
- **Error Handling**: Clear, helpful error messages
- **Connection Monitoring**: Visual status indicator
- **Keyboard Shortcuts**: Enter to send, easy navigation

## 🛠️ Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- Vanilla CSS

### Backend
- LibreChat (Node.js)
- MongoDB
- Docker & Docker Compose

### AI Providers
- OpenAI (GPT models)
- Anthropic (Claude models)
- Google (Gemini models)

## 📖 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get started in 5 minutes
- **[LIBRECHAT_INTEGRATION_GUIDE.md](LIBRECHAT_INTEGRATION_GUIDE.md)** - Complete setup guide
- **[backend/README.md](backend/README.md)** - Backend documentation
- **[frontend/README.md](frontend/README.md)** - Frontend documentation

## 🔧 Development

### Backend Development

```bash
cd backend/LibreChat
docker-compose up -d          # Start services
docker-compose logs -f        # View logs
docker-compose down           # Stop services
```

### Frontend Development

```bash
cd frontend
npm install                   # Install dependencies
npm run dev                   # Start dev server
npm run build                 # Build for production
npm run lint                  # Run linter
```

## 🧪 Testing

### Manual Testing

1. Start backend and frontend
2. Open http://localhost:5173
3. Verify connection status
4. Test sending messages
5. Try different AI models
6. Test error handling (stop backend)

### Automated Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend/LibreChat
npm test
```

## 🐛 Troubleshooting

### Backend won't start
- Check Docker is running: `docker ps`
- Check for port conflicts: `lsof -i :3080`
- View logs: `docker-compose logs -f`

### Frontend can't connect
- Verify backend is running: `curl http://localhost:3080/health`
- Check CORS settings in backend `.env`
- Check browser console for errors

### AI responses failing
- Verify API keys in `.env`
- Check you have API credits
- View backend logs: `docker-compose logs -f api`

See [LIBRECHAT_INTEGRATION_GUIDE.md](LIBRECHAT_INTEGRATION_GUIDE.md) for detailed troubleshooting.

## 🎨 Customization

### Add New AI Models

Edit `frontend/src/services/librechat.ts`:
```typescript
getAvailableModels() {
  // Add your model here
}
```

### Customize Styling

Edit `frontend/src/App.css` for global styles or component files for specific styling.

### Modify System Prompt

Edit `getDyslexiaSystemPrompt()` in `frontend/src/services/librechat.ts`

## 🚧 Roadmap

### Phase 1: Core Integration ✅
- [x] LibreChat backend setup
- [x] React frontend with TypeScript
- [x] Multi-model support
- [x] Dyslexia-friendly design
- [x] Documentation

### Phase 2: Enhanced Features
- [ ] User authentication
- [ ] Conversation history
- [ ] Voice input/output (Pipecat)
- [ ] Settings panel
- [ ] Dark mode

### Phase 3: Career Features
- [ ] Career discovery tools
- [ ] Job recommendations
- [ ] Skill tracking
- [ ] Resume builder

### Phase 4: Data & Analytics
- [ ] Supabase integration
- [ ] User preferences
- [ ] Analytics dashboard
- [ ] Progress tracking

## 🤝 Contributing

Contributions welcome! Please:

1. Follow TypeScript/React best practices
2. Maintain dyslexia-friendly design principles
3. Add tests for new features
4. Update documentation
5. Submit pull requests

## 📄 License

This project combines multiple components:
- LibreChat: MIT License
- Custom frontend: [Your License]

See individual component licenses for details.

## 🙏 Acknowledgments

- **LibreChat**: For the excellent multi-LLM backend
- **OpenDyslexic**: For the dyslexia-friendly font
- **OpenAI, Anthropic, Google**: For AI model access
- **React & Vite teams**: For excellent developer tools

## 💡 For Neurodivergent Users

This tool is designed FOR you, BY people who understand.

**Remember:**
- Take breaks when you need them
- Ask the AI to explain things differently
- Use simple questions - break complex topics down
- Switch AI models if one doesn't work for you
- Clear conversations when feeling overwhelmed
- There's no "wrong" way to use this

**You've got this!** 🌟

## 📞 Support

- **Documentation**: See docs in this repository
- **Issues**: Open a GitHub issue
- **Discussions**: Use GitHub Discussions

## 🔗 Resources

- [LibreChat Documentation](https://docs.librechat.ai/)
- [OpenAI API](https://platform.openai.com/docs)
- [Anthropic API](https://docs.anthropic.com/)
- [Google AI](https://ai.google.dev/docs)
- [Dyslexia-Friendly Design](https://www.dyslexia.com/)
- [React Documentation](https://react.dev/)

---

**Built with ❤️ for the neurodivergent community**
