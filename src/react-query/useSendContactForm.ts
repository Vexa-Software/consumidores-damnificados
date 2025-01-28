/*import axios from 'axios';
import { useMutation } from 'react-query';
import { CONTACT_FORM_API, CONTACT_GESTION_API } from '../utils/constants';
import { ContactFormFields } from '../types/ContactForm';
import { enqueueSnackbar } from 'notistack';

export const useSendContactForm = () => {
  return useMutation({
    mutationFn: async (body: ContactFormFields) => {
      return await Promise.all([
        axios.post(CONTACT_GESTION_API, {
          nombre: body.name,
          email: body.email,
          celular: body.phone,
          mensaje: body.message,
        }),
        axios.post(CONTACT_FORM_API, body),
      ]);
    },
    onSuccess: () => {
      enqueueSnackbar<'success'>('Mensaje enviado con éxito.', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar<'error'>('Ocurrió un error al enviar el mensaje. Intente de nuevo más tarde.', {
        variant: 'error',
      });
    },
  });
};*/
