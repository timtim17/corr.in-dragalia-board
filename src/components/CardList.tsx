import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import CircularProgress from '@material-ui/core/CircularProgress';

export interface CardType {
  content: string;
  index: number;
  title?: string;
}

type CardContents = { title?: string, message: string };

interface Props {
  component: React.ElementType
}

const initialCardState: CardContents[] | null = null;

function CardList(props: Props) {
  const Tag: React.ElementType = props.component;
  const [cards, setCards] = useState(initialCardState);
  useEffect(() => {
    const dbRef = firebase.database().ref('posts');
    dbRef.on('value', snapshot => {
      setCards(snapshot.val());
    });
    return function cleanUp() {
      dbRef.off('value');
    }
  }, []);

  if (cards === null) {
    return <CircularProgress />
  } else {
    if (cards.length === 0) {
      return <p className="status-center">Nothing's here yet!</p>
    } else {
      const cardElements = cards.map((value, idx) => <Tag key={idx} index={idx} title={value.title} content={value.message} />);
      return (
        <>
          {cardElements}
        </>
      );
    }
  }
}

export default CardList;
