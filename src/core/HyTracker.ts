import { token, owners } from "../../Config";
import BotClient from "../lib/Client";

const client: BotClient = new BotClient({ token, owners });
client.start();