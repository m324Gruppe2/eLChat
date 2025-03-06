const initializeApi = (app: any) => {
  app.get('/api/healthcheck', healthCheck);
};

const healthCheck = (req: any, res: any) => {
  res.sendStatus(200);
};

export { initializeApi };
