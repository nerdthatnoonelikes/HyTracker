import { Listener } from "discord-akairo";

export default class ReadyListener extends Listener {
    public constructor() {
        super("ready", {
            emitter: "client",
            event: "ready",
            category: "client"
        })
    }
    public exec(): void {
        this.client.log.info("Ready")
    }
}