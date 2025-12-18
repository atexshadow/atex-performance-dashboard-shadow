
// AppRoutes.tsx
import { useMemo } from 'react';
import { useRoutes } from 'react-router-dom';
import { ELEMENT_REGISTRY } from './registry';
import { useAppSelector } from '../../Store/hooks';
export type AppRoute = { path: string; elementKey: string };

export default function AppRoutes() {
  console.log("inside AppRoutes Component");
  const routes:AppRoute[] = useAppSelector(s => s.routes.items);

  const routeObjects = useMemo(
    () =>
      routes.map(r => ({
        path: r.path,
        element: ELEMENT_REGISTRY[r.elementKey],
      })),
    [routes]
  );

  return useRoutes(routeObjects);
}