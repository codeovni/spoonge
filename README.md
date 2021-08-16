# 🧽 Spoonge
This is an open source discord bot. I am creating it with the new Discord command type `slash command` (/) and I am trying to improve it more and more to make a bot with as many options as possible. The bot uses mongodb clusters, but in the future I will include the option to use mysql. When the bot has more functions I will publish it so that anyone can add it to their server directly.


<a href="https://discord.gg/KR25yRg">
  <img src="https://img.shields.io/discord/642006588206350346?color=404eed&label=Discord&logo=discord&logoColor=fff">
</a>

<a href="https://www.npmjs.com/package/discord.js">
  <img src="https://img.shields.io/badge/discord.js-v13.1.0-green.svg?logo=npm">
</a>

<a href="https://github.com/users/losdevpath/projects/2">
  <img src="https://img.shields.io/static/v1?label=&message=Spoonge Project&color=555c63&logo=github&logoColor=FFFFFF">
</a>
<br><br>
<p>
[
  <a href="#getting-started">Installation</a>
  |
  <a href="#commands">Commands</a>
  |
  <a href="#community">Community</a>
  |
  <a href="#libs-used">Libs used</a>
  |
  <a href="#license">License</a>
]
</p>

## 📋 Features
These are the characteristics that the bot will have when it is finished.
- **Admin**: self-role assignment, server announcements
- **Moderation**: ban, kick, ghostpingban, chat cleanup
- **Fun**: 8ball, cookie of fortune, roll the dice, russian roulette
- **Music**: YouTube, playlists, queues
- **Alerts**: Twitch streams and Youtube videos
- **Bank System**: slot machine, user credits
- **Miscelaneous**: giphy random gifs, 4chan random images
- And more


## 🚀 Getting Started

Clone and install

```shell
# Clone from github
git clone https://github.com/losdevpath/spoonge.git

# Install all dependencies
npm install
```

Build and start bot

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

## 📁 Commands

All commands are created with the new **slash commands** (/) from Discord.

<table>
  <thead align="center">
    <tr>
      <td><b>📁 Command</b></td>
      <td><b>📄 Description</b></td>
      <td><b>✔️ Permissions</b></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ping</td>
      <td>Show bot's ping</td>
      <td></td>
    </tr>
    <tr>
      <td>say</td>
      <td>Send text as a bot with direct message or embed</td>
      <td>MANAGE_MESSAGES</td>
    </tr>
    <tr>
      <td>4chan</td>
      <td>Show random images from 4chan.org</td>
      <td></td>
    </tr>
    <tr>
      <td>8ball</td>
      <td>The Magic 8 Ball Oracle has answer to all the questions</td>
      <td></td>
    </tr>
    <tr>
      <td>language</td>
      <td>Change the bot language</td>
      <td>ADMINISTRATOR</td>
    </tr>
  </tbody>
</table>

## 👋 Community

Sponge is in continuous development and you can see all the tests and news in the Discord community. New features are constantly added.

Join us on our **[Official Discord Server](https://discord.gg/KR25yRg)**! (*Spanish*)

## 📚 Libraries used

These are the 📚 libraries that I have used to create the bot.

- [discord.js](https://github.com/discordjs/discord.js)
- [dotenv](https://github.com/motdotla/dotenv)
- [dateformat](https://github.com/felixge/node-dateformat)
- [ffmpeg-static](https://github.com/eugeneware/ffmpeg-static)
- [mongoose](https://github.com/Automattic/mongoose)
- [winston](https://github.com/winstonjs/winston)
- [yt-search](https://github.com/talmobi/yt-search)
- [ytdl-core](https://github.com/fent/node-ytdl-core)
- [kleur](https://github.com/lukeed/kleur)

## 📜 License

Released under the [MIT License](https://github.com/losdevpath/spoonge/blob/main/LICENSE).