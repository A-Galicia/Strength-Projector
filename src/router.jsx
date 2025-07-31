import Home from './pages/Home';
import Estimator from './pages/Estimator.jsx';
import Progress from './pages/Progress.jsx';
import CreateAcct from './pages/CreateAcct.jsx';
import Login from './pages/Login.jsx';

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
  {
    path: 'create',
    element: <CreateAcct />,
  },
  {
    path: 'login',
    element: <Login />,
  },
];

export default router;
