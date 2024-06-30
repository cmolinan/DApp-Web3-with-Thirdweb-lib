import { handleTokenExpiration } from './AuthService.js';

import Swal from 'sweetalert2'

import  { format } from 'date-fns';

const MEDIA_BREAKPOINT_FOR_MOBILE = 480;   // ex 575

// for DEBUGGING
// export const setObject = (objet) => {
//   localStorage.setItem('carlos', JSON.stringify(objet));
// };
// export const getObject = () => JSON.parse(localStorage.getItem('carlos'))

export const isMobile = () => window.innerWidth > MEDIA_BREAKPOINT_FOR_MOBILE ? false:  true

export const getBpMobile = () => MEDIA_BREAKPOINT_FOR_MOBILE

// inner it's only the  visible part of the browser
export const getScreenInfo = () => {
  return {
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight
  };
}

export const getBackendURL = () => '/api/v1';

export const getLocalDate = () => {
  const now = new Date();
  return format(now, 'yyyy-MM-dd HH:mm:ss');
};
