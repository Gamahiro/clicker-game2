import { useRef } from 'react';
import Resource from '../classes/Resource';
import ResourceObject from '../classes/ResourceObject';
import useResourceElement, { InitialResourceState } from '../hooks/useResourceElement';

export const useResource = (name: string, position: { x: number, y: number }, size: { x: number, y: number }, color: string) => {
  const resourceRef = useRef(new Resource(name));
  const resourceObject = new ResourceObject(position, size, color);
  const initState: InitialResourceState = {
    resource: resourceRef.current.getJson(),
    resourceObject: resourceObject.getJson()
  };
  const resourceState = useResourceElement(initState);

  return { resource: resourceRef.current, resourceObject, resourceState };
};

export default useResource;