# Telegram BSC Sniper

The main purpose of this app is to quickly buy launching tokens. It does it by listening to telegram messages, and as soon as the smart contract address is posted, it recognises it, checks it and buys it.

This is a work-in-progress repo, I have many features in mind like manual slippage settings, manual buy by CA, set sell price etc. These will come in time to time as I progress with development.

## Plan just for me

### Create backend steps

1. REST Api:

   - GET /channels

2. WebSocket Api

   - Should send messages from found CAs, successful/failed transactions

3. TelegramListener service:

   - Listens to telegram messages

4. MessageBroker:

   - Messages queue: Should handle Telegram chat messages
   - Should check if message contains a CA, and put CA
