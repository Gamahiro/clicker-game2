import { useReducer } from 'react';
import Resource from '../classes/Resource';
import ResourceObject from '../classes/ResourceObject';

type ResourceElement = {
  resource: Resource;
  resourceObject: ResourceObject;
};

type ElementsState = {
  resourceElementsLocked: ResourceElement[];
  resourceElementsUnlocked: ResourceElement[];
};

const elementsReducer = (state: ElementsState, action) => {
  switch (action.type) {
    case 'updateResource':
      return {
        ...state,
        resourceElementsUnlocked: state.resourceElementsUnlocked.map((resourceElement: ResourceElement) => {
          

          if (resourceElement.resource.name === action.resourceName) {
            let newResource
            if (action.args && action.args.length > 0) {
              newResource = resourceElement.resource[action.method](...action.args)
              return { ...resourceElement, resource: newResource }
            }
            else {
              newResource = resourceElement.resource[action.method]()

              return { ...resourceElement, resource: newResource }
            }

          }
          else {
            return resourceElement
          }
        }),
      }


    case 'unlockNextElement':
      const [nextElement, ...rest] = state.resourceElementsLocked;
      return {
        resourceElementsLocked: rest,
        resourceElementsUnlocked: [...state.resourceElementsUnlocked, nextElement],
      };

    case 'updateGameObject':
      return {
        ...state,
        resourceElementsUnlocked: state.resourceElementsUnlocked.map((resourceElement) => {
          if (resourceElement.resource.name === action.resourceName) {
            let newResourceObject
            console.log(action.args)
            if (action.args && action.args.length > 0) {
              newResourceObject = resourceElement.resourceObject[action.method](...action.args)
              return { ...resourceElement, resourceObject: newResourceObject }
            }
            else {
              newResourceObject = resourceElement.resourceObject[action.method]()
              return { ...resourceElement, resourceObject: newResourceObject }
            }
          }
          else {
            return resourceElement
          }
        }),
      };
    // Handle other actions...
    default:
      return state;
  }
};

const useResourceElements = (initialState) => {
  const [resourceElements, dispatch] = useReducer(elementsReducer, initialState);

  const unlockNextElement = () => {
    if (resourceElements.resourceElementsLocked.length > 0) {
      dispatch({ type: 'unlockNextElement' });
    }
  };

  const updateResource = (resourceName: string, method: string, args: any = []) => {
    dispatch({ type: 'updateResource', resourceName, method, args });
  }

  const updateGameObject = (resourceName: string, method: string, args: any = []) => {
    console.log('updateGameObject', resourceName, method, args)
    dispatch({ type: 'updateGameObject', resourceName, method, args });

  }

  return { resourceElements, updateResource, updateGameObject, unlockNextElement };
};

export default useResourceElements;