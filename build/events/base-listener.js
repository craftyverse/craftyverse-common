"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
class Listener {
    constructor(client) {
        /*
         * Configures the number of seconds this listener has to acknowldge a message (default is 5 seconds)
         */
        this.ackWait = 5 * 1000;
        this.NATSClient = client;
    }
    /*
     * This configures the default settings for subscription options
     */
    subscriptionOptions() {
        return this.NATSClient.subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName);
    }
    /*
     * Configures the NATS listener
     */
    listen() {
        const subscription = this.NATSClient.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions());
        subscription.on("message", (msg) => {
            console.log(`Message recieved: ${this.subject} / ${this.queueGroupName}`);
            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);
        });
    }
    /*
     * Configures the function to parse a message
     */
    parseMessage(msg) {
        const data = msg.getData();
        return typeof data === "string"
            ? JSON.parse(data)
            : JSON.parse(data.toString("utf8"));
    }
}
exports.Listener = Listener;
