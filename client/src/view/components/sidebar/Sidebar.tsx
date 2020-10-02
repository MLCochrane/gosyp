import React from 'react';
import Header from './header/Header';
import Details from './details/DetailWidget';
import './sidebar.scss';

const Sidebar = () => (
  <div className="sidebar">
    <Header />
    <Details />
  </div>
);
export default Sidebar;
