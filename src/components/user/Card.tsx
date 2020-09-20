import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardType } from '../CardList';
import ReactMarkdown from 'react-markdown';
import Typography from '@material-ui/core/Typography';

function UserCard(props: CardType) {
  return (
    <Card className="user-card">
      <CardContent>
        { props.title && <Typography variant="h6" component="h3">{props.title}</Typography> }
        <ReactMarkdown source={props.content} />
      </CardContent>
    </Card>
  )
}

export default UserCard
