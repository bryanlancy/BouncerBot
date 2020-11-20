# BouncerBot
> Private Discord server management made easy.
> - Find and kick all users without roles, can be easily automated with cron jobs
> - Get server summary
>   - \# of members
>   - members without roles

## Setup
> *Before beginning, you will need a few things:*
>
>    **Required**
>    - **Discord Bot Token**, here's a [guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) for reference
>
>    ***Optional***
>    - **Giphy API Key**, go [here](https://developers.giphy.com/) and press `Get Started` to sign up and get a key
>    - **Discord Announcement Channel ID**, right click the channel in Discord and press `Copy ID`
1. Download BouncerBot project

    `git clone https://github.com/bryanlancy/BouncerBot.git`

1. Create a **config.json** file in the bot's root folder
    ``` json
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
    > The message `BouncerBot - Online` will print to  
    > the console when the bot successfully comes online

## Command Reference
- Type `~help` or `~h` for a list of more commands
- Add `help` to the end of a command for help with that command
    - All commands? just help, then help explains the rest?  

    *If included will go into more detail in readme*
    - `~hello` - reaction testing
    - `~server` - print server info
    - `~bounce` - removes user without roles after certain number of days
    - `~poll` - prints poll with given week's topics to aid in creation of study guide
    - `~motivate` - sends motivational with, *hopefully* funny gif \**Giphy API Key Required*


### _TODO_
- Need to Add:
    - [ ] Standard help message layout (Title, syntax, description, example)
    - [ ] Handling for bot hosts who dont provide Giphy key or announcement channels, try...catch
    - [ ] Edit Command: Bounce
        - [ ] Add check for users permission's
        - [ ] Add confirmation message
            - [ ] Confirm confirmation message comes from same user as original sender
        - [ ] Add argument for number of days to check for
    - [ ] Add Command: Announce
        - [ ] Takes argument for message to send and serer to send to
        - [ ] Should send embeds or standard messages
        - [ ] Should take optional argument for destination channel
            - if none provided look for channel labeled 'announcement'
            - if no channel exist return error message with reason



- Code Cleanup:
    - [ ] Condense reminders, move into folder, one file? separate into different files?
    - [ ] Move reminders from cron jobs? Persistence of times?
    - [ ] Break commands into separate files, modules
