import Home from './pages/Home';
import Projector from './pages/Projector';

const router = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'projector',
    element: <Projector />,
  },
];

export default router;
