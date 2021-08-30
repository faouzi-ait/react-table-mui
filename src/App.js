import React, { useMemo } from 'react';
import DataTable from './components/Table';

import DATA from './data/list.json';
import { COLUMNS, GROUPED_COLUMNS } from './data/columns';

import './App.css';

function App() {
  const columns = useMemo(() => COLUMNS, []);
  const groups = useMemo(() => GROUPED_COLUMNS, []);
  const data = useMemo(() => DATA, []);

  return <DataTable columns={columns} data={data} />;
}

export default App;
