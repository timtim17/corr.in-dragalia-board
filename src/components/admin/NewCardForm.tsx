import React, { FormEvent, useState } from 'react';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ErrorSnackbar from '../ErrorSnackbar';
import firebase from 'firebase/app';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

function NewCardForm() {
  const [content, setContent] = useState('');
  const [showError, setShowError] = useState(false);
  const updateContentState = (event: FormEvent) => setContent((event.target as HTMLFormElement).value);
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    addPost(content)
      .then(() => setContent(''))
      .catch(() => setShowError(true));
  };
  const handleErrorClose = () => setShowError(false);

  return (
    <>
      <Card>
        <form onSubmit={onSubmit}>
          <CardContent>
            <Typography variant="h5" component="h2">
              <AddIcon />
              New Item
            </Typography>
            <TextField label="Content" multiline variant="outlined" required fullWidth
              helperText="Supports markdown!" onInput={updateContentState} value={content} />
          </CardContent>
          <CardActions>
            <Button type="submit">Add</Button>
          </CardActions>
        </form>
      </Card>
      <ErrorSnackbar show={showError} onClose={handleErrorClose} />
    </>
  );
}

async function addPost(content: string) {
  const postsRef = firebase.database().ref('posts');
  const snapshot = await postsRef.once('value');
  const posts: object[] = snapshot.val();
  posts.unshift({ message: content });
  await postsRef.set(posts);  // potential error bubbles up
}

export default NewCardForm;
