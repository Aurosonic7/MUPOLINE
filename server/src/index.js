import server from './server.js';

async function startService() {
  server.listen(server.get('port'));
  console.log(`Back-End: http://${server.get('host')}:${server.get('port')}/api`);
}

startService();