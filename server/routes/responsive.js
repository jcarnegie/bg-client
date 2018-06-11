const Router = require("express").Router;

const router = Router(); // eslint-disable-line new-cap

/* Arbitrary values within the mobile and desktop ranges */
const MOBILE_DEFAULT_WIDTH = 499;
const DESKTOP_DEFAULT_WIDTH = 1401;

router.use((request, response, next) => {
	const likelySmallContentWindow = request.headers["user-agent"].match(/(phone|mobi)/i);
	const defaultWidth = likelySmallContentWindow ? MOBILE_DEFAULT_WIDTH : DESKTOP_DEFAULT_WIDTH;
	response.locals.values = {deviceWidth: defaultWidth};
	next();
});

module.exports = router;
