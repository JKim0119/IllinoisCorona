import Invoice from './pages/Invoice';
import Analytics from './pages/Analytics';
import Feed from './pages/Feed';

// See React Router documentation for details: https://reacttraining.com/react-router/web/api/Route
const pageList = [
  {
    name: 'Analytics',
    path: '/home',
    component: Analytics,
  },
  {
    name: 'Invoice',
    path: '/invoice',
    component: Invoice,
  },
  {
    name: 'Activity Feed',
    path: '/feed',
    component: Feed,
  },
];

export default pageList;
