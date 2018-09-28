import Router from 'next/router';
import { path } from 'ramda';

export default (context, target) => {
  if (context.res) {
    // server
    // 303: "See other"
    context.res.writeHead(303, {
      Location: target,
    });
    context.res.end();
  } else {
    // In the browser, we just pretend like this never even happened ;)
    const referrer = path(['pathname'], context);
    if (!referrer) {
      Router.replace(target);
    } else {
      Router.replace({ pathname: target, query: { referrer } }, target);
    }
  }
};
