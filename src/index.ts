import express from 'express'
import Redis from 'ioredis'
import { promisify } from 'util'
import 'dotenv/config'

const app = express()

const redisClient = new Redis()

app.use(express.json())

app.get('/', async (request, response) => {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient)

  const data = await syncRedisGet('data')

  return response.json(data)
})

app.get('/:id', async (request, response) => {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient)

  const dataId = request.params.id

  const data = await syncRedisGet(`data:${dataId}`)

  return response.json(data)
})

app.post('/', async (request, response) => {
  const syncRedisSet = promisify(redisClient.set).bind(redisClient)

  const data = request.body

  await syncRedisSet('data', JSON.stringify(data))

  return response.json({ message: 'ok' })
})

app.patch('/', async (request, response) => {
  const syncRedisSet = promisify(redisClient.set).bind(redisClient)

  const data = request.body

  await syncRedisSet('data', JSON.stringify(data))

  return response.json({ message: 'ok' })
})

app.delete('/:id', async (request, response) => {
  const syncRedisDel = promisify(redisClient.del).bind(redisClient)

  const dataId = request.params.id

  await syncRedisDel(`data:${dataId}`)

  return response.json({ message: 'ok' })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
