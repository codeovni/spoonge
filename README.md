# 🧽 Spoonge
This is an open source discord bot. It is created with the discord.js library and created with nodejs, typescript and mongodb.

<a href="https://discord.gg/KR25yRg">
  <img src="https://img.shields.io/discord/642006588206350346?color=404eed&label=Discord&logo=discord&logoColor=fff">
</a>

<a href="https://www.npmjs.com/package/discord.js">
  <img src="https://img.shields.io/badge/discord.js-v13.1.0-green.svg?logo=npm">
</a>

<a href="https://github.com/users/losdevpath/projects/2">
  <img src="https://img.shields.io/static/v1?label=&message=Spoonge Project&color=555c63&logo=github&logoColor=FFFFFF">
</a>

### Install, build and start
```shell
# Install packages
npm install

# Build bot
npm run build

# Start bot
npm run start
```

### 3. Bot token and mongodb data
Rename `.env.example` to `.env`.
```shell
DATABASE_CLUSTER=[cluster_url]
DATABASE_NAME=[database_name]
DATABASE_USERNAME=[db_username]
DATABASE_PASSWORD=[db_password]
APP_TOKEN=[discord_app_token]
```

### Invite bot to your server
```shell
https://discord.com/api/oauth2/authorize?client_id=<BOT_CLIENT_ID>&permissions=8&scope=bot%20applications.commands
```

# Commands
All commands are created with the new **slash commands** (/) from Discord.
<table>
  <thead align="center">
    <tr>
      <td><b>📁 Command</b></td>
      <td><b>📄 Description</b></td>
      <td><b>✔️ Options</b></td>
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
      <td>message: (text)<br>embed: (boolean)</td>
    </tr>
    <tr>
      <td>4chan</td>
      <td>Show random images from 4chan.org</td>
      <td>categories & boards</td>
    </tr>
  </tbody>
</table>

### 📚 Libs used
- [discord.js](https://github.com/discordjs/discord.js)
- [@discordjs/opus](https://github.com/discordjs/opus)
- [dotenv](https://github.com/motdotla/dotenv)
- [dateformat](https://github.com/felixge/node-dateformat)
- [ffmpeg-static](https://github.com/eugeneware/ffmpeg-static)
- [mongoose](https://github.com/Automattic/mongoose)
- [winston](https://github.com/winstonjs/winston)
- [yt-search](https://github.com/talmobi/yt-search)
- [ytdl-core](https://github.com/fent/node-ytdl-core)