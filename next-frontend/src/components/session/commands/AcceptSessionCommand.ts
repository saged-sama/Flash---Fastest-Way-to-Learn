// AcceptSessionCommand.ts
import { Command } from "./Command";
import { springbase} from "@/lib/springbase";
import { createRoom, getRoom, getRoomCode } from "@/lib/session/sessions";
import { useRouter } from "next/navigation";

export class AcceptSessionCommand implements Command {
  private requestId: string;
  private sessionId: string;
  private router: ReturnType<typeof useRouter>;

  constructor(requestId: string, sessionId: string, router: ReturnType<typeof useRouter>) {
    this.requestId = requestId;
    this.sessionId = sessionId;
    this.router = router;
  }

  async execute() {
    const formData = new FormData();
    formData.append("status", "ACCEPTED");

    const sessreq = await springbase.collection("sessionrequests").update(this.requestId, formData);
    if (sessreq.status === "ACCEPTED") {
      const modal = document.getElementById("waitingModal") as HTMLDialogElement;
      modal?.showModal();

      const room = await getRoom(this.requestId);
      if (room) {
        const code = await getRoomCode(room.id);
        if (code) {
          this.router.push(`/sessions/${this.sessionId}/room/${code}`);
        }
      }
    }
  }
}
