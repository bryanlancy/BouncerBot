# BouncerBot
Private Discord server management made easy.
## Features
- Find and kick all users without roles, can be easily automated with cron jobs
- Get server summary
  - \# of members
  - members without roles

## Setup
> *Before beginning, you will need a few things:*
> #### Required
>    - **Node.js**, [Download here](https://nodejs.org/en/download/)
>    - **Discord Bot Token**, here's a [guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html) for reference
> #### *Optional*
>    - **Giphy API Key**, go [here](https://developers.giphy.com/) and press `Get Started` to sign up and get a key
>    - **Discord Announcement Channel ID**, right click the channel in Discord and press `Copy ID`

1. Clone BouncerBot project

    `git clone https://github.com/bryanlancy/BouncerBot.git`

1. Create a **config.json** file in the bot's config folder
    ```json
    {
        "prefix": "~",
        "botName": "BouncerBot",
        "token": "<DiscordBotToken>",
        "giphyKey" : "<GiphyAPIKey>",
        "announcementChannels" : [
            "<DiscordChannelID>",
            "<DiscordChannelID>"
        ]
    }
    ```

1. Use the command `npm install` to download all required node modules
1. Use the command `node index.js` to start the bot :robot:
    > The message `BouncerBot - Online` will print to<br>
    > the console when the bot successfully comes online

## Command Reference
- Type `~help` or `~h` for a list of more commands
- Add `help` to the end of a command for help with that command
    - Explain all commands here? just help, then help explains the rest?

    *If included will go into more detail in readme*
    - `~hello` - reaction testing
    - `~server` - print server info
    - `~bounce` - removes user without roles after certain number of days
    - `~poll` - prints poll with given week's topics to aid in creation of study guide
    - `~motivate` - sends motivational mesasge with, *hopefully* funny gif \**Giphy API Key Required*
