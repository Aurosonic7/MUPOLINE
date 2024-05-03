import server from './server.js';

async function main() {
  server.listen(server.get('port'));
  console.log(`http://localhost:${server.get('port')}/api`);
  server.get('/api', (req, res) => { res.send({ message: "Server active..." }); });
}

main();