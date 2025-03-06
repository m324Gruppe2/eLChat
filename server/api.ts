const initializeApi = (app) => {
    app.get('/api/healthcheck', healthCheck);
}

const healthCheck = (req, res) => {
    res.sendStatus(200)
  }


export {initializeApi}