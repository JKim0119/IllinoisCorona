import React from 'react';
import FA from 'react-fontawesome';
import { Avatar } from '../../vibe';
import { Row, Button, Col, Card, CardBody, CardHeader, CardFooter, Container } from 'reactstrap';

function PostActions() {
  return (
    <div className="p-t-sm">
      <Button color="link" className="m-r text-muted">
        <FA name="thumbs-up" /> Like
      </Button>
      <Button color="link" className="text-muted">
        <FA name="comment" /> Comment
      </Button>
      <Button color="link" className="pull-right text-muted">
        <FA name="ellipsis-h" />
      </Button>
    </div>
  );
}

export default function Feed() {
  return (
   <div>Feature available later</div>
  );
}
