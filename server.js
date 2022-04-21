import "dotenv/config";
import { app, client, paginate, ts } from "./slack.js";
import * as channelsToMark from "./channelsToMark.js";

const port = process.env.PORT || 3000;

const listConversations = async (cursor) =>
  client.conversations.list({ cursor, exclude_archived: true });

const markAsRead = async (channelID) =>
  client.conversations.mark({ channel: channelID, ts: ts() });

for await (const { id, name, is_member } of paginate(listConversations)) {
  if (!is_member) continue;
  channelsToMark.addIDWhenMatch(id, name);
}

console.log("Channels:", channelsToMark.map);

console.log("Marking channels as read");
await Promise.all(
  Array.from(channelsToMark.map).map(function ([name, id]) {
    if (!id) return;
    return markAsRead(id);
  })
);

app.message(async function ({ client, payload: { channel } }) {
  const channelName = channelsToMark.getName(channel);

  if (!channelName) return;

  await markAsRead(channel);
  console.log(`Marked ${channelName} as read`);
});

await app.start(port);
console.log("App started.");
