import app from './server';

const port = Number(process.env.PORT || 8080);
app.listen(port, () => {
  console.info('Service started on port: ' + port);
});

