import Invoice from './pages/Invoice';
import Analytics from './pages/Analytics';
import Feed from './pages/Feed';

// See React Router documentation for details: https://reacttraining.com/react-router/web/api/Route
const pageList = [
  {
    name: 'Activity Feed',
    path: '/feed',
    component: Feed,
  },
  {
    name: 'Analytics',
    path: '/',
    component: Analytics,
  },
];

export default pageList;
