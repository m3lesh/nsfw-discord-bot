require('dotenv').config();

const { REST, Routes } = require('discord.js');


const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// ...

// for guild-based commands
rest.put(Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(process.env.CLIENTID), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);