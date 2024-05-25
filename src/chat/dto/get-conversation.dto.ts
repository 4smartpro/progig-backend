export interface GetConversationDto {
  searchText: string;
  limit: number;
  page: number;
  chatId?: string;
  userId?: string;
  participantId?: string;
}
