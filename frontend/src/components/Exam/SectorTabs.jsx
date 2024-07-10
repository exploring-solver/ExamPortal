import React from 'react';
import Sector from './Sector';

const SectorTabs = ({ sectors, onSectorClick }) => {
  return (
    <div className="flex justify-center mt-4">
      {sectors.map(sector => (
        <Sector key={sector.id} sector={sector} onClick={onSectorClick} />
      ))}
    </div>
  );
};

export default SectorTabs;
