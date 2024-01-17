import { createContext} from 'react';
import { Diagnosis } from './types';

export const DiagnosesContext = createContext<Diagnosis[]>([]);

export const DiagnosesContextProvider = (props: {children: JSX.Element, values: Diagnosis[]}) => {

  return (
    <DiagnosesContext.Provider value={props.values}>
      {props.children}
    </DiagnosesContext.Provider>
  );
};

export default DiagnosesContextProvider;