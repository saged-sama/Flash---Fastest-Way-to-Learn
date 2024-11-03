// DeclineSessionCommand.ts
import { Command } from "./Command";
import { springbase } from "@/lib/springbase";

export class DeclineSessionCommand implements Command {
  private requestId: string;

  constructor(requestId: string) {
    this.requestId = requestId;
  }

  async execute() {
    await springbase.collection("sessionrequests").update(this.requestId, {
      status: "REJECTED",
    });
  }
}
