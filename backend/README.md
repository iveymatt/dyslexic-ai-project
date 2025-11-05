# Dyslexic AI - LibreChat Backend

This directory contains the LibreChat backend integration for the Dyslexic AI project.

## Quick Start

### 1. Clone LibreChat (First Time Only)

```bash
cd ~/dyslexic-ai-project/backend/LibreChat
git clone https://github.com/danny-avila/LibreChat.git .
```

### 2. Configure API Keys

Edit the `.env` file and add your API keys:

```bash
nano .env
```

Replace these placeholders with real keys:
- `OPENAI_API_KEY=sk-PLACEHOLDER_OPENAI_KEY`
- `ANTHROPIC_API_KEY=sk-ant-PLACEHOLDER_ANTHROPIC_KEY`
- `GOOGLE_API_KEY=PLACEHOLDER_GOOGLE_KEY`

Get keys from:
- OpenAI: https://platform.openai.com/api-keys
- Anthropic: https://console.anthropic.com/
- Google: https://makersuite.google.com/app/apikey

### 3. Start the Backend

```bash
docker-compose up -d
```

### 4. Verify It's Running

```bash
curl http://localhost:3080/health
docker ps
```

You should see two containers running:
- `librechat-api`
- `mongodb`

## Common Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Rebuild after changes
docker-compose up -d --build
```

## Configuration

The `.env` file contains all configuration:
- **API Keys**: OpenAI, Anthropic, Google
- **Server**: Port 3080, CORS for frontend
- **Database**: MongoDB connection
- **Features**: Enabled endpoints and rate limiting

The `docker-compose.override.yml` file configures:
- Port mappings
- Volume mounts
- Environment variables
- Restart policies

## Troubleshooting

### Backend won't start
- Check Docker is running: `docker ps`
- Check for port conflicts: `lsof -i :3080`
- View logs: `docker-compose logs -f`

### API not responding
- Check health: `curl http://localhost:3080/health`
- Verify API keys in `.env`
- Check logs: `docker-compose logs -f api`

### Database issues
- Check MongoDB: `docker-compose logs -f mongodb`
- Reset database: `docker-compose down -v && docker-compose up -d`

## Architecture

```
LibreChat Backend
├── API Server (Port 3080)
│   ├── OpenAI endpoint
│   ├── Anthropic endpoint
│   └── Google endpoint
├── MongoDB (Port 27017)
│   └── Conversation storage
└── Docker Compose
    ├── .env (configuration)
    └── docker-compose.override.yml
```

## Security Notes

- Never commit `.env` to version control
- Use strong secrets in production
- Enable authentication for production use
- Configure firewall rules appropriately
- Keep LibreChat updated

## Next Steps

1. Start the frontend: `cd ../frontend && npm run dev`
2. Access the app: http://localhost:5173
3. See full documentation: `../LIBRECHAT_INTEGRATION_GUIDE.md`
