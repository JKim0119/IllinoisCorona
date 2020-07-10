import Invoice from './pages/Invoice';
import Analytics from './pages/Analytics';
import Feed from './pages/Feed';

// See React Router documentation for details: https://reacttraining.com/react-router/web/api/Route
const pageList = [
  {
    name: 'Analytics',
    path: process.env.PUBLIC_URL + '/',
    component: Analytics,
  },
  {
    name: 'Activity Feed',
    path: process.env.PUBLIC_URL + '/feed',
    component: Feed,
  },
];

export default pageList;
