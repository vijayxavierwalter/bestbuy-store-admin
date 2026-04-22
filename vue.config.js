const { defineConfig } = require('@vue/cli-service')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')

const PRODUCT_SERVICE_URL = process.env.VUE_APP_PRODUCT_SERVICE_URL || 'http://localhost:3002/'
const MAKELINE_SERVICE_URL = process.env.VUE_APP_MAKELINE_SERVICE_URL || 'http://localhost:3001/'

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081,
    host: '0.0.0.0',
    allowedHosts: 'all',
    client: false,
    webSocketServer: false,
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
      }

      devServer.app.use(bodyParser.json())

      // Health check
      devServer.app.get('/health', (_, res) => {
        const version = process.env.APP_VERSION || '0.1.0'
        res.send({ status: 'ok', version })
      })

      // Get all orders
      devServer.app.get('/makeline/order/fetch', async (_, res) => {
        try {
          const response = await fetch(`${MAKELINE_SERVICE_URL}order/fetch`)
          const orders = await response.json()
          res.send(orders)
        } catch (error) {
          console.error(error)
          res.status(500).send({ message: 'Failed to fetch orders' })
        }
      })

      // Get a single order by id
      devServer.app.get('/makeline/order/:id', async (req, res) => {
        try {
          const response = await fetch(`${MAKELINE_SERVICE_URL}order/${req.params.id}`)
          const order = await response.json()
          res.send(order)
        } catch (error) {
          console.error(error)
          res.status(500).send({ message: 'Failed to fetch order' })
        }
      })

      // Manually process an order
      devServer.app.put('/makeline/order', async (req, res) => {
        try {
          const response = await fetch(`${MAKELINE_SERVICE_URL}order`, {
            method: 'PUT',
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' }
          })

          if (response.ok) {
            res.sendStatus(200)
          } else {
            res.sendStatus(response.status)
          }
        } catch (error) {
          console.error(error)
          res.status(500).send({ message: 'Failed to process order' })
        }
      })

      // Get all products
      devServer.app.get('/products', async (_, res) => {
        try {
          const response = await fetch(PRODUCT_SERVICE_URL)
          const products = await response.json()
          res.send(products)
        } catch (error) {
          console.error(error)
          res.status(500).send({ message: 'Failed to fetch products' })
        }
      })

      // Get a single product by id
      devServer.app.get('/product/:id', async (req, res) => {
        try {
          const response = await fetch(`${PRODUCT_SERVICE_URL}${req.params.id}`)
          const product = await response.json()
          res.send(product)
        } catch (error) {
          console.error(error)
          res.status(500).send({ message: 'Failed to fetch product' })
        }
      })

      // Add product
      devServer.app.post('/product', async (req, res) => {
        try {
          const response = await fetch(PRODUCT_SERVICE_URL, {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' }
          })

          const product = await response.json()
          res.send(product)
        } catch (error) {
          console.error(error)
          res.status(500).send({ message: 'Failed to add product' })
        }
      })

      // Update product
      devServer.app.put('/product', async (req, res) => {
        try {
          const response = await fetch(PRODUCT_SERVICE_URL, {
            method: 'PUT',
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' }
          })

          const product = await response.json()
          res.send(product)
        } catch (error) {
          console.error(error)
          res.status(500).send({ message: 'Failed to update product' })
        }
      })

      return middlewares
    }
  }
})