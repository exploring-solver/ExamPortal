import React from 'react';
import { Typography, IconButton } from '@material-tailwind/react';

function Footer() {
  return (
    <footer className="bg-foot-blue text-white p-6">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="flex flex-col mb-4 md:mb-0">
          <Typography variant="h6" className="font-bold uppercase mb-2">Useful Links</Typography>
          <ul className='flex flex-col'>
            <ul className='flex gap-3'>
              <li className="mb-1">
                <a href="#" className="text-white hover:text-white">RTI</a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-white hover:text-white">Feedback</a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-white hover:text-white">Copyright Policy</a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-white hover:text-white">SiteMap</a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-white hover:text-white">FAQ</a>
              </li>
            </ul>
            <ul className='flex gap-3'>
              <li className="mb-1">
                <a href="#" className="text-white hover:text-white">Terms & Conditions</a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-white hover:text-white">Hyperlinking Policy</a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-white hover:text-white">Privacy Policy</a>
              </li>
            </ul>
          </ul>
        </div>
        <div className="flex flex-col mb-4 md:mb-0">
          <Typography variant="h6" className="font-bold uppercase mb-2">Social Links</Typography>
          <div className="flex space-x-4">
            <IconButton color="white" variant="outlined">
              <i className="fa text-lg fa-facebook"></i>
            </IconButton>
            <IconButton color="white" variant="outlined">
              <i className="fa text-lg fa-twitter"></i>
            </IconButton>
            <IconButton color="white" variant="outlined">
              <i className="fa text-lg fa-instagram"></i>
            </IconButton>
            <IconButton color="white" variant="outlined">
              <i className="fa text-lg fa-youtube"></i>
            </IconButton>
          </div>
          <div className="container mx-auto text-start mt-4">
            <Typography variant="body2" className="text-white">
              © {new Date().getFullYear()} ExamPortal - All rights reserved
            </Typography>
            <Typography variant="body2" className="text-white">
              Website Content Managed by Direct Benefit Transfer Mission, Government of India.
            </Typography>
            <Typography variant="body2" className="text-white">
              Designed, Developed and Hosted by National Informatics Centre. | Visitors Count: 1155293
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;