# Dyslexic AI - Frontend

React/TypeScript/Vite frontend with dyslexia-friendly design and multi-LLM support.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

## Features

### Dyslexia-Friendly Design
- OpenDyslexic font for easier reading
- High contrast colors
- Generous spacing (line height, letter spacing)
- Clear visual structure
- Large, readable text (16px+)
- Simple language from AI

### Multi-Model AI Support
- OpenAI (GPT-3.5 Turbo, GPT-4)
- Anthropic (Claude 3 Opus, Sonnet)
- Google (Gemini Pro)
- Easy model switching
- Optimized system prompts for dyslexia

### Chat Features
- Real-time streaming responses
- Conversation memory
- Connection status indicator
- Error handling
- Keyboard shortcuts (Enter to send)
- Clear conversation

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ChatArea.enhanced.tsx    # Main chat interface
│   │   └── ModelSelector.tsx        # AI model selector
│   ├── services/
│   │   └── librechat.ts             # API integration
│   ├── App.tsx                      # Main component
│   ├── App.css                      # Global styles
│   └── main.tsx                     # Entry point
├── public/                          # Static assets
├── index.html                       # HTML template
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── vite.config.ts                   # Vite config
└── README.md                        # This file
```

## Development

### Available Scripts

```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Tech Stack

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Fast build tool
- **CSS**: Vanilla CSS with dyslexia-friendly styles

### Key Components

#### EnhancedChatArea
Main chat interface with:
- Message display
- Input handling
- Streaming support
- Error handling
- Connection status

#### ModelSelector
AI model selector with:
- List of available models
- Provider information
- Descriptions and tips

#### LibreChat API Service
Integration layer with:
- API communication
- Streaming support
- Error handling
- Connection testing

## Configuration

### API Endpoint

Default: `http://localhost:3080/api`

To change, edit `src/services/librechat.ts`:
```typescript
private baseURL = 'http://localhost:3080/api';
```

### Available Models

To add/remove models, edit `getAvailableModels()` in `src/services/librechat.ts`

### System Prompt

To customize AI behavior, edit `getDyslexiaSystemPrompt()` in `src/services/librechat.ts`

## Styling

### Global Styles

Edit `src/App.css` for:
- Font families
- Colors
- Spacing
- General layout

### Component Styles

Inline styles in components for:
- Component-specific styling
- Dynamic styling
- State-dependent styles

### Dyslexia-Friendly Guidelines

When adding styles:
- Use large fonts (16px minimum)
- High contrast (dark on light)
- Generous spacing (1.8+ line height)
- Clear visual hierarchy
- Avoid italics
- Use OpenDyslexic font where possible

## Testing

### Manual Testing

1. Start backend: `cd ../backend/LibreChat && docker-compose up -d`
2. Start frontend: `npm run dev`
3. Open http://localhost:5173
4. Verify:
   - [ ] Connection shows "Connected"
   - [ ] Can select models
   - [ ] Can send/receive messages
   - [ ] Dyslexic-friendly formatting
   - [ ] Clear conversation works
   - [ ] Error handling works

### Browser Console

Check for:
- No console errors
- API calls succeeding
- Proper error messages

## Troubleshooting

### Frontend won't start
```bash
# Check Node version (need 18+)
node --version

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Can't connect to backend
- Ensure backend is running: `curl http://localhost:3080/health`
- Check CORS in backend `.env`: `CORS_ORIGINS=http://localhost:5173`
- Check browser console for errors

### TypeScript errors
```bash
# Run type checking
npm run lint

# Check tsconfig.json is correct
```

## Customization

### Add New Features

1. Create component in `src/components/`
2. Import in `App.tsx` or other components
3. Update types as needed
4. Test thoroughly

### Change Colors

Edit inline styles or add to `App.css`:
```css
/* Example: Change primary color */
button {
  background-color: #your-color;
}
```

### Add Fonts

Add to `App.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont&display=swap');

body {
  font-family: 'YourFont', fallback;
}
```

## Best Practices

### Code Style
- Use TypeScript strict mode
- Add type annotations
- Use functional components
- Use hooks for state/effects

### Accessibility
- Add ARIA labels
- Support keyboard navigation
- Provide alt text
- Maintain high contrast

### Performance
- Lazy load components if needed
- Memoize expensive calculations
- Optimize re-renders
- Keep bundle size small

## Resources

- [React Documentation](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Dyslexia-Friendly Design](https://www.dyslexia.com/)

## Next Steps

1. Add user authentication
2. Implement conversation history
3. Add voice input/output (Pipecat)
4. Create prompt library
5. Add settings panel
6. Implement dark mode
7. Add more accessibility features

## Contributing

When contributing:
1. Follow TypeScript/React best practices
2. Maintain dyslexia-friendly design
3. Test on multiple browsers
4. Update documentation
5. Add comments for complex logic

---

For full project documentation, see: `../LIBRECHAT_INTEGRATION_GUIDE.md`
