module.exports = {
    name: "ping",
    description: "Replies wiht pong!",
    devOnly: false,
    execute(client, message, args){
        message.reply("pong")
    }
}