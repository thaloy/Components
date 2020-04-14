import React from 'react';

import './App.css';
import MainWrap from './CC/MainWrap';
import Title from './Title/index';
import Column from './Column/index';

const ScrollTitle = MainWrap(Title);
const ScrollColumn = Column;

function App() {
  return (
		<>
			<ScrollTitle />
			<ScrollColumn />
		</>
  );
}

export default App;
