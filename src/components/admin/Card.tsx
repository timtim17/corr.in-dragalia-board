import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardType } from '../CardList';
import ErrorSnackbar from '../ErrorSnackbar';
import firebase from 'firebase/app';
import ReactMarkdown from 'react-markdown';
import TrashIcon from '@material-ui/icons/DeleteOutline'
import Typography from '@material-ui/core/Typography';

function AdminCard(props: CardType) {
  const [showError, setShowError] = useState(false);
  const handleError = () => setShowError(true);
  const handleCloseError = () => setShowError(false);
  return (
    <>
      <Card className="user-card">
        <CardContent>
          { props.title && <Typography variant="h6" component="h3">{props.title}</Typography> }
          <ReactMarkdown source={props.content} />
        </CardContent>
        <CardActions>
          <Button color="inherit" startIcon={<TrashIcon />}
            onClick={() => deleteItem(props.index, handleError)}>Delete</Button>
        </CardActions>
      </Card>
      <ErrorSnackbar show={showError} onClose={handleCloseError} />
    </>
  );
}

function deleteItem(index: number, handleError: () => void) {
  const dbRef = firebase.database().ref('posts');
  dbRef.once('value')
    .then(snapshot => {
      let cards: object[] = snapshot.val();
      cards.splice(index, 1);
      dbRef.set(cards).catch(handleError);
    })
    .catch(handleError);
}

export default AdminCard
