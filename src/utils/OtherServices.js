
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

export const getLocalDate = () => {
  const now = new Date();
  return format(now, 'yyyy-MM-dd HH:mm:ss');
};
export const getBackendURL = () => '/api/v1';


export const swalFire = (type,element, message) => {

  let width1 =  isMobile() ?  '250px':'480px';
  let titleClass = isMobile() ? 'swal-fontsize-little':'swal-fontsize-large'

  if (type == 'ok') {
    Swal.fire({
          title: `${message} de ${element} exitosa!`,
          icon: 'success',
          confirmButtonColor: "#0051ff",
          width: `${width1}`,
          customClass: {
            title: `${titleClass}`
          },
    });
  } else if(type == 'nok') {
    Swal.fire({
      title: `${element}: No se pudo grabar`,
      text: message,
      icon: 'error',
      confirmButtonColor: "#C9302C",
      width: `${width1}`,
      customClass: {
        title: `${titleClass}`
      },
    });
  } else if (type == 'nodel'){
    Swal.fire({
      title: `${element}: No se pudo eliminar`,
      text: message,
      icon: "error",
      confirmButtonColor: "#C9302C",
      width: `${width1}`,
      customClass: {
        title: `${titleClass}`
      },
    });
  } else if (type == 'nod'){
    Swal.fire({
      title: `${element}: No se pudieron descargar`,
      text: "Reintente. Si persiste, informe a Sistemas",
      icon: "error",
      confirmButtonColor: "#C9302C",
      width: `${width1}`,
      customClass: {
        title: `${titleClass}`
      },

    });
  } else if (type == 'tkn'){
    Swal.fire({
      title: `Sesion caducada`,
      text: "Ingrese credenciales nuevamente",
      icon: "info",
      confirmButtonColor: "#0051ff",
      toast: true,
      timer: 3000,
    });
  }
  else if (type == 'info') {
    Swal.fire({
      title: `${element}`,
      text: `${message}`,
      icon: "info",
      confirmButtonColor: "#0051ff",
      width: `${width1}`,
      customClass: {
        title: `${titleClass}`
      },

      // toast: true,
      // timer: 3000,
    });
  }
  else if (type == 'warning') {
    Swal.fire({
      title: `${element}`,
      text: `${message}`,
      icon: "warning",
      confirmButtonColor: "red",
      width: `${width1}`,
      customClass: {
        title: `${titleClass}`
      },
      // timer: 3000,
    });
  } else {
    Swal.fire({
      title: `${element}`,
      text: `${message}`,
      icon: "info",
    });
  }
};
