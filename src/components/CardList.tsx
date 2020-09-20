import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
      const cardElements = cards.map((value, idx) => <CSSTransition key={cards.length - idx - 1} timeout={{enter: 600, exit: 300}} classNames="animate-cards">
          <Tag index={idx} title={value.title} content={value.message} />
        </CSSTransition>);
      return (
        <TransitionGroup component={null}>
          {cardElements}
        </TransitionGroup>
      );
    }
  }
}

export default CardList;
