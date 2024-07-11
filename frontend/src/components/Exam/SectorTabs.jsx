import React from 'react';
import { Tabs, Tab, TabPanel, TabsBody } from '@material-tailwind/react';

const SectorTabs = ({ sectors, onSectorClick }) => {
  return (
    <div className=''>
      <div className='flex '>
        {sectors.map(sector => (
          <button key={sector.id} onClick={() => onSectorClick(sector.id)}>
            {sector.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SectorTabs;
