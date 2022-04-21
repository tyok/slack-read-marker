import "dotenv/config";
import bolt from "@slack/bolt";

const appConfig = {
  token: process.env.SLACK_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: process.env.SLACK_SOCKET_MODE === "true",
  signingSecret: process.env.SLACK_SIGNING_SECRET,
};

export const app = new bolt.App(appConfig);
export const client = app.client;
export function ts() {
  return new Date() / 1000;
}
export async function* paginate(slackAPIFunction) {
  let cursor = null;
  while (cursor !== "") {
    const response = await slackAPIFunction(cursor);
    const {
      ok,
      error,
      response_metadata: { next_cursor },
      ...rest
    } = response;

    if (!ok) throw new Error(error);

    const list = Object.values(rest)[0];
    for (const item of list) yield item;
    cursor = next_cursor;
  }
}
