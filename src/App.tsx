import { useEffect, useState } from 'react';
import api from './services/api';
import './App.scss';

type firstObjectTypes = {
  id: number;
  timeout: number;
  priority: number;
  referenceId: number;
  dependences: string[];
}

type secondObjectTypes = {
  id: number;
  label: string;
  color: string;
  background: string;
}

function App() {

  const [firstObject, setFirstObj] = useState<firstObjectTypes[]>();
  const [secondObject, setSecondObj] = useState<secondObjectTypes[]>();

  // const newArray = firstObject && secondObject && secondObject.map(data => {
  //   const relatedItem = firstObject.find(item => item.referenceId === data.id);
  //   return {...data,
  //     priority: relatedItem?.priority ?? 0,
  //     timeout: relatedItem?.timeout
  //   };
  // }) || []

  const newData = secondObject?.map(data => {
    const sharedData = firstObject?.find(item => item.referenceId === data.id);
    return {
      ...data,
      priority: sharedData!.priority,
      timeOut: sharedData!.timeout
    }
  })

  // const sortedByPriority = newData && newData.sort((a, b) => {
  //   // if (a.priority > b.priority) {
  //   //   return -1
  //   // }
  //   // return 1;
  // })

    const sortedByPriority = newData && newData.sort((a, b) => a.priority - b.priority);

  useEffect(() => {
    api.get('/firstEndpoint')
        .then(response => setFirstObj(response.data));
    api.get('/secondEndpoint')
        .then(response => setSecondObj(response.data));
}, []);

  return (
    <div className="App">
      {sortedByPriority?.map(item => {
        return (
          <div
          className="App_blocks"
          key={item.id}
          style={
            {
              color: item.color,
              backgroundColor: item.background,
              transition: `background ${item.timeOut}s`}
            }
          >
            {item.label}
            </div>
        )
      })}
    </div>
  );
}

export default App;

/*
  [
    {
      priority: 3,
      label: '#Div 1',
      color: #fff,
      background: 'yellow'
    },
    {
      priority: 2,
      label: '#Div 2',
      color: #ff2,
      background: 'black'
    },
  ]
*/
