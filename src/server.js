// Require the framework
const Fastify = require('fastify');
const fp = require('fastify-plugin');

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
  pluginTimeout: 4000,
});
const App = require('./app');

// Register your application as a normal plugin.
app.register(fp(App), {});

// Run the server!
const start = async () => {
  try {
    await app.listen(process.env.PORT || 3000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
// app.listen(process.env.PORT || 3000, '0.0.0.0', (err) => {
//   if (err) {
//     app.log.error(err);
//     process.exit(1);
//   }
// });
