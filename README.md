# 🧽 Spoonge
This is an open source discord bot. I am creating it with the new Discord command type `slash command` (/) and I am trying to improve it more and more to make a bot with as many options as possible. The bot uses mongodb clusters, but in the future I will include the option to use mysql. When the bot has more functions I will publish it so that anyone can add it to their server directly.

<a href="https://github.com/losdevpath/spoonge">
  <img src="https://img.shields.io/github/package-json/v/losdevpath/spoonge/master?color=pink&label=Current%20Version" alt="Spoonge Version" />
</a>

<a href="https://nodejs.org/dist/latest-v16.x/">
  <img src="https://img.shields.io/static/v1?label=node&message=>=16.6.2&color=success&logo=Node.js&logoColor=white" alt="Node Requirements">
</a>

<a href="https://www.codefactor.io/repository/github/losdevpath/spoonge">
  <img src="https://www.codefactor.io/repository/github/losdevpath/spoonge/badge" alt="CodeFactor" />
</a>

<a href="https://discord.gg/KR25yRg">
  <img src="https://img.shields.io/discord/642006588206350346?color=404eed&label=Discord&logo=discord&logoColor=fff">
</a>

<a href="https://www.npmjs.com/package/discord.js">
  <img src="https://img.shields.io/badge/discord.js-v13.1.0-green.svg?logo=npm">
</a>

<a href="https://github.com/losdevpath/spoonge">
  <img src="https://sonarcloud.io/api/project_badges/measure?project=losdevpath_spoonge&metric=ncloc" alt="Spoonge code lines" />
</a>

## 📋 Features

All the features you can find in spoonge. *
The features on this list are still being developed.

- 🎲 **Games**: `slots`, `rps`, `rpsls`, and more
- 🎉 **Fun**: `4chan`, `8ball`, `fortune`, and more
- 🧺 **Misc**: `about`, `invite`, `status`, `support`, `polls`, `rtd`, and more
- 🚨 **Moderation**: `ban`, `kick`, `clear`, `warn`, `report`, `mute` and more
- 🏆 **Level**: `profile`, `leaderboard`, `level`
- 🪙 **Economy**: `bank`, `money`, `buy`, `sell`, and more
- 💬 **Server**: `automessages`, `selfroles`, `language`, and more
- 🎵 **Music**: `music` command with options
- 🎁 **Giveways**: `giveway` command with options
- 🔞 **NSFW**: `nsfw` command with options

It also has other internal features such as:

- Slash commands
- Welcome and leave messages
- Advanced auto-moderation and
- GhostPing messages auto-ban
- Multi-language support
- Reaction roles
- Giveaways
- And much more!


## 📝 To-Do
Spoonge is in a continuous state of development. New features/updates may come at any time.

📌 **[View all furure updates here!](https://github.com/users/losdevpath/projects/2)**

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