import type { Principal } from '@dfinity/principal';
export interface FollowInfo { 'id' : string, 'name' : string }
export type HeaderField = [string, string];
export interface HttpRequest {
  'url' : string,
  'method' : string,
  'body' : Array<number>,
  'headers' : Array<HeaderField>,
}
export interface HttpResponse {
  'body' : Array<number>,
  'headers' : Array<HeaderField>,
  'streaming_strategy' : [] | [StreamingStrategy],
  'status_code' : number,
}
export interface Message { 'text' : string, 'time' : Time, 'author' : string }
export interface StreamingCallbackHttpResponse {
  'token' : [] | [StreamingCallbackToken],
  'body' : Array<number>,
}
export interface StreamingCallbackToken {
  'key' : string,
  'sha256' : [] | [Array<number>],
  'index' : bigint,
  'content_encoding' : string,
}
export type StreamingStrategy = {
    'Callback' : {
      'token' : StreamingCallbackToken,
      'callback' : [Principal, string],
    }
  };
export type Time = bigint;
export interface _SERVICE {
  'follow' : (arg_0: string, arg_1: string) => Promise<undefined>,
  'follows' : () => Promise<Array<FollowInfo>>,
  'get' : () => Promise<bigint>,
  'get_name' : () => Promise<[] | [string]>,
  'greet' : (arg_0: string) => Promise<string>,
  'http_request' : (arg_0: HttpRequest) => Promise<HttpResponse>,
  'increment' : () => Promise<undefined>,
  'post' : (arg_0: string, arg_1: string) => Promise<undefined>,
  'posts' : () => Promise<Array<Message>>,
  'qsort' : (arg_0: Array<bigint>) => Promise<Array<bigint>>,
  'set' : (arg_0: bigint) => Promise<undefined>,
  'set_name' : (arg_0: string) => Promise<undefined>,
  'timeline' : () => Promise<Array<Message>>,
}
