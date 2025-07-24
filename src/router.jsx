import Home from './pages/Home';
import Estimator from './pages/Estimator.jsx';
import Progress from './pages/Progress.jsx';

const router = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'estimator',
    element: <Estimator />,
  },
  {
    path: 'progress',
    element: <Progress />,
  },
];

export default router;
