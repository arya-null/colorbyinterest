const fastify = require('fastify')({ logger: true });
var RGBaster = require('rgbaster');
const router = fastify;
const Port = 4462;

router.get('/', (request, reply) => {
  reply.send({ hello: '👋from colorbyinterest open source api' })
});

router.get('/getpalette/of=:params', (request, reply) => {
  const { forinterest } = request.params;
  const UnsplashUrl = `https://source.unsplash.com/?${forinterest}`;
  RGBaster.colors(UnsplashUrl, {
    success: function (payload) {
      const ResultPalette = payload.palette
    }
  });
  reply.send({ 
    message: 'Here is your color palette🎨 of this interest',
    palette: ResultPalette
  });
});

router.get('/getbestcolor/of=:params', (request, reply) => {
  const { forinterest } = request.params;
  const UnsplashUrl = `https://source.unsplash.com/?${forinterest}`;
  RGBaster.colors(UnsplashUrl, {
    success: function (payload) {
      const Resultcolor = payload.dominant
    }
  });
  reply.send({
    message: 'Here is the best 🖌️colour of this interest',
    bestcolor:Resultcolor
  });
});



router.setErrorHandler(function (error, request, reply) {
  this.log.error(error)
  reply.status(400).send({ error: '🔗Url not found' });
});

router.listen(Port, (err) => {
  if (err) {
    router.log.error('error')
    process.exit(1)
  }else{
    console.log("server listening");
  }
})