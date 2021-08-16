
## 🚀 Getting Started

Clone and install all dependencies

```shell
# Clone from github
git clone https://github.com/losdevpath/spoonge.git
cd spoonge

# Install all dependencies
npm install
```

## 📃 Bot token and mongodb data
Rename `.env.example` to `.env` and fill the information.
```shell
DATABASE_CLUSTER=[mongodb_cluster_url] # Example: mybot.aibob.mongodb.net
DATABASE_NAME=[database_name]
DATABASE_USERNAME=[db_username]
DATABASE_PASSWORD=[db_password]
APP_TOKEN=[discord_bot_token] # Token from https://discord.com/developers/applications
DEV_MODE=[true/false] # Set to false only in production
```

## 📦 Build and start bot

```shell
# Build bot files
npm run build

# Start bot with npm
npm run start

# Or start with pm2
pm2 start app/startup.js --name "Spoonge"
```

## ✔️ Invite bot to your server
Create new application on [Discord Developers](https://discord.com/developers/applications) and invite bot to your server with this link.
```shell
https://discord.com/api/oauth2/authorize?client_id=[BOT_CLIENT_ID]&permissions=8&scope=bot%20applications.commands
```
