import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  /*
   * Configures the name of the channel that this listener is going to listen to
   */
  abstract subject: T["subject"];

  /*
   * Configures the name of the queue group that this listener will join
   */
  abstract queueGroupName: string;

  /*
   * Configures a function to run when a message is recieved
   */
  abstract onMessage(data: T["data"], msg: Message): void;

  /*
   * Configures the master NATS client.
   */
  private NATSClient: Stan;

  /*
   * Configures the number of seconds this listener has to acknowldge a message (default is 5 seconds)
   */
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
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
    const subscription = this.NATSClient.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(`Message recieved: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);

      this.onMessage(parsedData, msg);
    });
  }

  /*
   * Configures the function to parse a message
   */
  parseMessage(msg: Message) {
    const data = msg.getData();

    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
