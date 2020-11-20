# BouncerBot
> Private Discord server management made easy.
> - Find and kick all users without roles
> - Get server summary
>   - \# of members
>   - members without roles

## Setup
> *Before beginning, you will need a few things:*  
>
>    **Required**
>    - Discord Bot Token
>
>    **Optional**
>    - Giphy API Key
>    - Discord Announcement Channel ID
1. Download BouncerBot project  

    `git clone https://github.com/bryanlancy/BouncerBot.git`

1. Create config.json in bot's root folder  
    ```JSON
    {
        "prefix" : "~",
        "token" : "<DiscordBotToken>",
        "giphyKey" : "<GiphyAPIKey>",
        "announcementChannels" : [
            "<DiscordChannelID>",
            "<DiscordChannelID>"
        ]
    }
    ```

1. Use the command `npm install` to download all required node modules
1. Use the command `node index.js` to start the bot :robot:

## Command Reference
- Type `~help` or `~h` for a list of more commands
- Add `help` to the end of a command for help with that command
    - All commands? just help, then help explains the rest?

### _TODO_
- Need to Add:
    - [ ] Standard help message layout (Title, syntax, description, example)
    - [ ] Handling for bot hosts who dont provide Giphy key or announcement channels
    - [ ] Move reminders from cron jobs? Persistence of times?
- Code Cleanup:
    - [ ] Condense reminders, move into folder, one file? separate into different files?
    - [ ] Break commands into separate files, modules
