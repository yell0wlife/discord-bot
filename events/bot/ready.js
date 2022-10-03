module.exports = (client) => {
    client.on('ready', () => {
        console.log(`[CLIENT] ${client.user.username} successfully logged and ready`)
    });
};