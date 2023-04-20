import { Conversation } from "./Conversation.model";
import { Utilisateur } from "./utilisateur.model";

export class Message {
    id: number = 0;
    message!: string;
    date: Date = new Date();
    senderId!: number;
    sender: Utilisateur[] = [];
    conversationId!: number;
    conversation: Conversation[] = [];
}