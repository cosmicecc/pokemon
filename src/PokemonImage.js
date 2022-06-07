import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PokemonImage(props) {

    // Use passed in props to get correct image.
    const [image, setImage] = useState();

    useEffect(() => {
        axios.get(props.url)
        .then(res => {
          setImage(res.data.sprites.front_default)
        });
      }, [image])

  return (
    <>
      <img src={image}/>
    </>
  )
}
