const Router = require('express').Router;

const router = Router(); // eslint-disable-line new-cap

router.use((request, response, next) => {
  if (request.method === 'OPTIONS') {
    response.status(200).send('');
    return;
  }
  next();
});

module.exports = router;
