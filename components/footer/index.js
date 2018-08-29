import Router from 'next/router';

const FOOTER_ROUTE_BLACKLIST = [
  '/game',
  '/sandbox',
];

export const shouldFooterHide = () => FOOTER_ROUTE_BLACKLIST.includes(Router.router.route);
