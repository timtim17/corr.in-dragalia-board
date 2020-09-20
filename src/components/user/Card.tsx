import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardType } from '../CardList';
import Typography from '@material-ui/core/Typography';

function UserCard(props: CardType) {
  return (
    <Card className="user-card">
      <CardContent>
        { props.title && <Typography variant="h6" component="h3">{props.title}</Typography> }
        <Typography variant="body1">{props.content}</Typography>
      </CardContent>
    </Card>
  )
}

export default UserCard
