import * as readline from "node:readline/promises";
import {
  ChannelType,
  Client,
  Events,
  GatewayIntentBits,
  TextChannel,
} from "discord.js";
import "dotenv/config";
import { exit } from "node:process";

const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client: Client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log("Ready! Logged in as " + readyClient.user.tag);

  rl.prompt();

  rl.on("line", (input) => {
    const command: string = input.trim();
    const commandSplit: string[] =
      command
        .match(/(?:[^\s"]+|"([^"]*)")+/g)
        ?.map((s) => s.replace(/"/g, "")) || [];
    switch (commandSplit[0]) {
      case "exit":
        console.log("Exiting");
        client.destroy();
        rl.close();
        exit(0);
        break;
      case "help":
        console.log("Commands:");
        console.log("  exit: Exit the program");
        console.log("  help: Show this help message");
        break;
      default:
        console.log(`Unknown command: ${command}. Type "help" for help`);
        break;
    }
    rl.prompt();
  });
});

client.login(process.env.TOKEN);
