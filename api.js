const express = require('express');
const app = express();
const uuidAPIkey = require('uuid-apikey');

const server = app.listen(3002, () => {
  console.log('Start Server: localhost:3002');
});

const key = {
  apiKey: '506JMZT-HXKM19X-JFR8NFY-ARWV16R',
  uuid: '280d2a7f-8f67-40a7-93f0-8abf5639b09b',
};

app.get('/api/users/:apikey/:type', async (req, res) => {
  let { type, apikey } = req.params;

  if (!uuidAPIkey.isAPIKey(apikey) || !uuidAPIkey.check(apikey, key.uuid)) {
    res.send('apikey is not vaild.');
  } else {
    if ((type = 'seoul')) {
      let data = [
        { name: '홍길동', city: 'seoul' },
        { name: '고길동', city: 'seoul' },
      ];
      res.send(data);
    } else if ((type = 'jeju')) {
      let data = [
        { name: '돌하르방', city: 'jeju' },
        { name: '감귤', city: 'jeju' },
      ];
      res.send(data);
    } else {
      res.send('Type is not connect');
    }
  }
});
