import './Home.css';
import {useEffect, useState} from 'react';

function Home(props) {
  const [path, setPath] = useState(window.location.href.split('/')[3]);

    useEffect(() => {
        getPath();
    }, [path]);

    function getPath() {
        fetch(props.url + '/api/getPath/'+path)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
  return (
      <p>{path}</p>
  );
}

export default Home;
