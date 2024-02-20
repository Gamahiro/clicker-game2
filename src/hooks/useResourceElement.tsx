import { Reducer, useReducer } from 'react';
import { ResourceJson } from '../classes/Resource';
import { ResourceObjectJson } from '../classes/ResourceObject';

type Action = {
  type: string,
  payload: { newResource: ResourceJson | undefined, newObject: ResourceObjectJson | undefined }
}

const elementReducer = (state: InitialResourceState, action: Action) => {

  let newResource: ResourceJson | undefined = action.payload.newResource || state.resource;
  let newObject: ResourceObjectJson | undefined = action.payload.newObject || state.resourceObject;

  switch (action.type) {
    case 'updateResource':
      return {
        ...state,
        resource: newResource
      }
    case 'updateObject':
      return {
        ...state,
        resourceObject: newObject
      }
    case 'updateState':

      return {
        ...state,
        resource: newResource,
        resourceObject: newObject
      }
    default:
      return state;
  }
};

export type InitialResourceState = {
  resource: ResourceJson,
  resourceObject: ResourceObjectJson
}

export type ResourceState = {
  resource: ResourceJson,
  resourceObject: ResourceObjectJson
  updateResource: (newResource: ResourceJson) => void
  updateObject: (newObject: ResourceObjectJson) => void
  updateState: (newResource: ResourceJson, newObject: ResourceObjectJson) => void
}

const useResourceElement = (initialState: InitialResourceState) => {
  const [resourceElement, dispatch] = useReducer<Reducer<InitialResourceState, Action>>(elementReducer, initialState);
  //console.log(resourceElement)
  const { resource, resourceObject } = resourceElement;

  const updateResource = (newResource: ResourceJson) => {
    dispatch({ type: 'updateResource', payload: { newResource: newResource, newObject: undefined } })
  }

  const updateObject = (newObject: ResourceObjectJson) => {
    dispatch({ type: 'updateObject', payload: { newResource: undefined, newObject: newObject } });
  }

  const updateState = (newResource: ResourceJson, newObject: ResourceObjectJson) => {
    dispatch({ type: 'updateState', payload: { newResource, newObject } });
  }


  return { resource, resourceObject, updateResource, updateObject, updateState };
};

export default useResourceElement;