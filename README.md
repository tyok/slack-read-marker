# slack-read-marker

Automatically mark selected channels as read, everytime.

You have to manually list the channels you want to auto-read. Yeah, I know.

## Quickstart

1. Setup a slack app. [Follow this link](https://api.slack.com/apps?new_app=1&manifest_yaml=display_information%3A%0A++name%3A+Read+Marker%0Aoauth_config%3A%0A++scopes%3A%0A++++user%3A%0A++++++-+channels%3Ahistory%0A++++++-+channels%3Aread%0A++++++-+channels%3Awrite%0Asettings%3A%0A++event_subscriptions%3A%0A++++user_events%3A%0A++++++-+message.channels%0A++org_deploy_enabled%3A+false%0A++socket_mode_enabled%3A+false%0A++token_rotation_enabled%3A+false%0A) to use my preconfiguration. Just choose the workspace, review the permissions, then finish creating the app.
1. You should now end up in the "Basic Information" page of your app. Scroll down to "App Credentials" and copy the signing secret. This will be used later for the `SLACK_SIGNING_SECRET` env var.
1. Scroll down to "App-Level Tokens" section and choose to generate token and scopes. Use any name you want for the token, then add a scope and choose to add "connection:write". Generate the token and copy the value for `SLACK_APP_TOKEN` env var.
1. Go to "OAuth & Permissions" page of your app and copy the user OAuth token for the `SLACK_TOKEN` env var.
1. Now you need to install (or reinstall) your app. Just click the button below the OAuth token.
1. Deploy your slack app and fill in the env var copied from the previous steps.
1. Go back to your slack app page, go to "Event Subscriptions" and fill in the url of your app, plus `/slack/events` path.
1. Save the changes
