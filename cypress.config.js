const { defineConfig } = require("cypress");
const { createClient } = require("redis");

const connectRedis = async () => {
  const client = createClient({ url: 'redis://localhost:6379' });
  client.on('error', (err) => console.log('Redis Client Error', err));

  try {
    await client.connect();
    return client
  } catch(err){
    console.log("Error ===> " + err)
    return err
  } 
}

const redisOperation = async (operation, key, value) => {
  const redisClient = await connectRedis()

  switch (operation) {
    case 'get':
      return redisClient.get(key)
    case 'set':
      return redisClient.set(key, value)
    default:
      return null
  }
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on("task", {
        async "redis-operation"({ operation, key, value }) { return redisOperation(operation, key, value) }
      })
    }
  },
});
