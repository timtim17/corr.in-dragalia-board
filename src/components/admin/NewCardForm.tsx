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
  const [title, setTitle] = useState('');
  const [showError, setShowError] = useState(false);
  const updateFormState = (event: FormEvent) => {
    const value = (event.target as HTMLFormElement).value;
    switch ((event.target as HTMLElement).id) {
      case 'in-content':
        setContent(value);
        break;
      case 'in-title':
        setTitle(value);
        break;
    }
  };
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    addPost(content, title)
      .then(() => {
        setContent('');
        setTitle('');
      })
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
            <TextField label="Title" variant="outlined" fullWidth onInput={updateFormState}
              value={title} id="in-title" />
            <TextField label="Content" multiline variant="outlined" required fullWidth id="in-content"
              helperText="Supports markdown!" onInput={updateFormState} value={content} />
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

async function addPost(content: string, title?: string) {
  const postsRef = firebase.database().ref('posts');
  const snapshot = await postsRef.once('value');
  const posts: object[] = snapshot.val();
  posts.unshift({ title, message: content });
  await postsRef.set(posts);  // potential error bubbles up
}

export default NewCardForm;
