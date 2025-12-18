
// src/features/routes/routesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppRoute = { path: string; elementKey: string };
type RoutesState = { items: AppRoute[] };

const initialState: RoutesState = {
  items: [
    { path: '/', elementKey: 'Home' },
    { path: '/TestThroughputPage', elementKey: 'TestThroughputPage' },
    { path: '/KPI', elementKey: 'KPI' },
    { path: '/Home', elementKey: 'Home' },
  ],
};

const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    setRoutes(state, action: PayloadAction<AppRoute[]>) {
      state.items = action.payload;
    },
    addRoute(state, action: PayloadAction<AppRoute>) {
      state.items.push(action.payload);
    },
    removeRoute(state, action: PayloadAction<string>) {
      state.items = state.items.filter(r => r.path !== action.payload);
    },
  },
});

export const { setRoutes, addRoute, removeRoute } = routesSlice.actions;
export default routesSlice.reducer;
