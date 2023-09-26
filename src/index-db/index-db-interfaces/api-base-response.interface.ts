export interface ApiBaseResponse {
  StatusCode: number;
  Response: any;
  IsSuccessful: boolean;
}

export interface ChunkLoadStrategy {
  limit: number;
  countEndPoint: string;
}
