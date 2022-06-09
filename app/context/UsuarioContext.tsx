import React, {createContext, useReducer} from 'react';
import {saveUsuario, deleteUsuario} from '../storage/UsuarioAsyncStorage';
//import Snackbar from 'react-native-snackbar';

const initialState = {
  usuario: {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
  },
  activo: false,
};

const usuarioReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case 'sing-in':
      console.log('Bem vindo ao sistema');
      return {...state, usuario: payload.data, activo: true};
    case 'sign':
      saveUsuario(payload.data).then(msg => {
        console.log('usuário salvo');
      });
 //     Snackbar.show({
  //      text: 'login realizado com sucesso',
    //    duration: Snackbar.LENGTH_LONG,
    //  });

      return {...state, usuario: payload.data, activo: true};
    case 'sign-out':
      deleteUsuario().then(msg => {
        console.log(msg);
      });
     // Snackbar.show({
      //  text: 'sessão expirada',
     //   duration: Snackbar.LENGTH_LONG,
    //  });

      return {...state, usuario: payload.data, activo: false};
    default:
      return state;
  }
};

const UsuarioContext = createContext(initialState);

function UsuarioProvider(props) {
  const [login, loginAction] = useReducer(usuarioReducer, initialState);

  return  (
    <UsuarioContext.Provider value={[login, loginAction]}>
      {props.children}
    </UsuarioContext.Provider>
  );
}

export {UsuarioContext, UsuarioProvider};

