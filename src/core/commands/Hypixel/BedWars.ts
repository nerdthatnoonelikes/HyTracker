import { Command } from "discord-akairo";
import fetch from "node-fetch";
import { Message, MessageEmbed } from "discord.js";
import { hykey } from "../../../../Config"
export default class BedWarsCommand extends Command {
    public constructor() {
        super("bedwars", {
            aliases: ["bedwars", "bw"],
            category: "Stats",
            description: {
                content: "check your bedwars stats"
            },
            args: [
                {
                    id: "username",
                    prompt: {
                        start: (msg: Message) => `${msg.author} please provide a username`
                    }
                }
            ]
        })
    }
    public async exec(message: Message, { username }: { username: string }) {
        const url = `https://api.hypixel.net/player?key=${hykey}&name=${username}`;
        const fetch_response = await fetch(url)
        const json = await fetch_response.json()

        if (json.player === null) return message.channel.send("Player not found")
        if (json.success === false) return message.channel.send("Failed to fetch data this maybe an API error")

        message.channel.send(
            new MessageEmbed()
                .setColor("#2E333F")
                .setTitle(`${json.player.displayname}'s Bedwars Stats`)
                .addField("Games Played", json.player.stats.Bedwars.games_played_bedwars_1, true)
                .addField("Coins", json.player.stats.Bedwars.coins, true)
                .addField("Final Kills", json.player.stats.Bedwars.final_kills_bedwars, true)
        )
    }
}