export const idlFactory = ({ IDL }) => {
  const FollowInfo = IDL.Record({ 'id' : IDL.Text, 'name' : IDL.Text });
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const HttpRequest = IDL.Record({
    'url' : IDL.Text,
    'method' : IDL.Text,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
  });
  const StreamingCallbackToken = IDL.Record({
    'key' : IDL.Text,
    'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'index' : IDL.Nat,
    'content_encoding' : IDL.Text,
  });
  const StreamingCallbackHttpResponse = IDL.Record({
    'token' : IDL.Opt(StreamingCallbackToken),
    'body' : IDL.Vec(IDL.Nat8),
  });
  const StreamingStrategy = IDL.Variant({
    'Callback' : IDL.Record({
      'token' : StreamingCallbackToken,
      'callback' : IDL.Func(
          [StreamingCallbackToken],
          [StreamingCallbackHttpResponse],
          ['query'],
        ),
    }),
  });
  const HttpResponse = IDL.Record({
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
    'streaming_strategy' : IDL.Opt(StreamingStrategy),
    'status_code' : IDL.Nat16,
  });
  const Time = IDL.Int;
  const Message = IDL.Record({
    'text' : IDL.Text,
    'time' : Time,
    'author' : IDL.Text,
  });
  return IDL.Service({
    'follow' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'follows' : IDL.Func([], [IDL.Vec(FollowInfo)], []),
    'get' : IDL.Func([], [IDL.Nat], ['query']),
    'get_name' : IDL.Func([], [IDL.Opt(IDL.Text)], []),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], []),
    'http_request' : IDL.Func([HttpRequest], [HttpResponse], ['query']),
    'increment' : IDL.Func([], [], []),
    'post' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'posts' : IDL.Func([], [IDL.Vec(Message)], ['query']),
    'qsort' : IDL.Func([IDL.Vec(IDL.Int)], [IDL.Vec(IDL.Int)], []),
    'set' : IDL.Func([IDL.Nat], [], []),
    'set_name' : IDL.Func([IDL.Text], [], []),
    'timeline' : IDL.Func([], [IDL.Vec(Message)], []),
  });
};
export const init = ({ IDL }) => { return []; };
