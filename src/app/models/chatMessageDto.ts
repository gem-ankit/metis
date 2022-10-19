export class ChatMessageDto {
    action: string;
    data: {
        name: string,
        msg: string,
        to: string
    };
    constructor(action: string, msg: string, name: string, to: string) {
        this.action = action;
        this.data = {
            name: name,
            msg: msg,
            to: to
        };
    }
}
export class ChatMessage {
    name: string;
    msg: string;

    constructor(msg: string, name: string) {
        this.name= name,
        this.msg= msg
    }
}
