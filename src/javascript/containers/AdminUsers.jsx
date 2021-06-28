// ---Dependencys
import React, { useEffect, useReducer } from 'react';
// ---Containers
import StoreMenuCont from 'Cont/StoreMenuCont';
// ---Components
import UsersTable from 'Comp/AdminUsers/UsersTable';
// ---CommonComps
import ModalConfirmation from 'Utils/ModalConfirmation';
// ---Redux
import { useDispatch } from 'react-redux';
import { updateLoading } from 'Actions/appInfo';
// --Request
import { asyncHandler, testError } from 'Others/requestHandlers.js';
import { getAllUsers, deleteUser } from 'Others/peticiones.js';

// ---AUX COMPONENTS

// ------------------------------------------ REDUCER -----------------------------------------
const typesR = {
  UPDATE_USERS: 'UPDATE_USERS',
  HIDE_CARD: 'HIDE_CARD',
  VIEW_CARD: 'VIEW_CARD',
  SEARCH_PARMS_CHANGE: 'SEARCH_PARMS_CHANGE',
  NOT_UPDATED: 'NOT_UPDATED',
  IS_UPDATED: 'IS_UPDATED'
};

const {
  UPDATE_USERS,
  HIDE_CARD,
  VIEW_CARD,
  SEARCH_PARMS_CHANGE,
  NOT_UPDATED,
  IS_UPDATED
} = typesR;

const initialState = {
  users: [],
  isUpdated: false
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USERS:
      return {
        ...state,
        users: payload,
        isUpdated: true
      };

    case SEARCH_PARMS_CHANGE:
      return {
        ...state,
        searchParams: payload
      };

    case HIDE_CARD:
      return {
        ...state,
        viewCard: false
      };

    case VIEW_CARD:
      return {
        ...state,
        viewCard: true,
        cardOrder: payload
      };

    case NOT_UPDATED:
      return {
        ...state,
        isUpdated: false
      };

    case IS_UPDATED:
      return {
        ...state,
        isUpdated: true
      };

    default:
      return state;
  }
}
// ------------------------------------------ COMPONENT-----------------------------------------
function AdminUsers() {
  // ----------------------- hooks, const, props y states
  const [state, dispatch] = useReducer(reducer, initialState);
  // Redux Actions
  const dispatchR = useDispatch();
  const isLoading = flag => dispatchR(updateLoading(flag));

  useEffect(() => updatedUsers(), [state]);
  // ----------------------- Metodos Principales
  function updatedUsers() {
    if (!state.isUpdated) {
      console.log('get all called');
      dispatch({ type: IS_UPDATED });
      getAll();
    }
  }
  function onDeleteButton(data) {
    const question = '¿Deseas eliminar éste usuario?';
    const details = `Los datos del usuario serán eliminados permanentemente`;
    ModalConfirmation(question, details, onCancelOrder, data);
  }

  // ----------------------- Metodos Auxiliares
  function onCancelOrder(idData) {
    isLoading(true);
    asyncHandler(deleteUser, onSuccessDelete, onError, idData);
  }
  function onSuccessDelete() {
    isLoading(false);
    dispatch({ type: NOT_UPDATED });
  }
  function onError(err) {
    testError(err);
    isLoading(false);
  }
  function getAll() {
    isLoading(true);
    asyncHandler(getAllUsers, onSuccessData, onErrorOrder);
  }

  function onSuccessData(data) {
    const { users } = data;
    updateUsersList(users);
    isLoading(false);
  }

  function onErrorOrder(response) {
    isLoading(false);
    console.log('testError este: --->', response);
  }

  function updateUsersList(users) {
    dispatch({
      type: UPDATE_USERS,
      payload: users
    });
  }
  // ----------------------- Render
  return (
    <StoreMenuCont>
      <div className="store-content-container">
        <h1>Administrador de Cuentas</h1>
      </div>
      <div className="store-content-container">
        {state.users && state.users.length > 0 && (
          <UsersTable users={state.users} onDelete={onDeleteButton} />
        )}
      </div>
    </StoreMenuCont>
  );
}
export default AdminUsers;
