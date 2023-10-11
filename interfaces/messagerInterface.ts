export interface paramOptions {
  access_token: string | undefined;
  recipient: string;
  messaging_type: string;
  message: string;
}
export interface sendMessageOptions {
  method: string;
  url: string;
  params: Partial<paramOptions>;
}
