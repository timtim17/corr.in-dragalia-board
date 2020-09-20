import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';

export interface CardType {
  content: string;
  index: number;
  title?: string;
}

type CardContents = { title?: string, message: string };

interface Props {
  component: React.ElementType
}

function CardList(props: Props) {
  const Tag: React.ElementType = props.component;
  const [cards, setCards] = useState([] as CardContents[]);
  const cardElements = cards.map((value, idx) => <Tag key={idx} index={idx} title={value.title} content={value.message} />);
  
  useEffect(() => {
    const dbRef = firebase.database().ref('posts');
    dbRef.on('value', snapshot => {
      setCards(snapshot.val());
    });
    return function cleanUp() {
      dbRef.off('value');
    }
  }, []);

  return (
    <>
      {cardElements}
    </>
  );
}

export default CardList;
