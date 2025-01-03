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
      case "send":
        if (commandSplit.length != 3) {
          console.log("Usage: send <channelId> <message>");
        } else {
          const channelId: string = commandSplit[1];
          const message: string = commandSplit[2];
          const channel = client.channels.cache.get(channelId);
          if (!channel) {
            console.log(`Channel ${channelId} not found`);
          } else {
            if (channel.type !== ChannelType.GuildText) {
              console.log(`Channel ${channelId} is not a text channel`);
              break;
            }
            (channel as TextChannel).send(message);
            console.log(`Sent message to channel ${channelId}`);
          }
        }
        break;
      case "help":
        console.log("Commands:");
        console.log("  exit: Exit the program");
        console.log("  help: Show this help message");
        console.log(
          "  send <channelId> <message>: Send a message to a channel",
        );
        break;
      default:
        console.log(`Unknown command: ${command}. Type "help" for help`);
        break;
    }
    rl.prompt();
  });
});

client.login(process.env.TOKEN);
