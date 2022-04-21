import "dotenv/config";

const channelNames = process.env.SLACK_CHANNELS.split(/[\s,]+/);
const channelNameMap = new Map(channelNames.map((name) => [name, null]));
const channelIDMap = new Map();

channelNameMap.delete("");

export const map = channelNameMap;

export function getName(id) {
  return channelIDMap.get(id);
}

export function addIDWhenMatch(id, name) {
  if (!channelNameMap.has(name)) return false;

  channelNameMap.set(name, id);
  channelIDMap.set(id, name);

  return true;
}
