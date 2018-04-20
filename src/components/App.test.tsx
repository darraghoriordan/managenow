import * as React from 'react';
import * as ReactDOM from 'react-dom';
import teamMembers from "../sampleData/sampleTeam";
import {App, IAppState} from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  
  const stateMock:IAppState = {
    authUser:null,
    teamMembers
  }

  ReactDOM.render(<App state={stateMock}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
