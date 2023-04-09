require('dotenv').config();

const { REST, Routes } = require('discord.js');

const command_id = ""

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// ...

// for guild-based commands
rest.delete(Routes.applicationGuildCommand(process.env.CLIENTID, process.env.GUILDID, command_id))
	.then(() => console.log('Successfully deleted guild command'))
	.catch(console.error);

// for global commands
rest.delete(Routes.applicationCommand(process.env.CLIENTID, command_id))
	.then(() => console.log( `Successfully deleted application command \n command id = ${command_id}`))
	.catch(console.error);