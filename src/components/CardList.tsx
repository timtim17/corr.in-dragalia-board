import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';

export interface CardType {
  content: string;
}

type CardContents = { message: string };

interface Props {
  component: React.ElementType
}

function CardList(props: Props) {
  const Tag: React.ElementType = props.component;
  const [cards, setCards] = useState([] as CardContents[]);
  const cardElements = cards.map((value, idx) => <Tag key={idx} content={value.message} />);
  
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
    <section>
      {cardElements}
    </section>
  );
}

export default CardList;
