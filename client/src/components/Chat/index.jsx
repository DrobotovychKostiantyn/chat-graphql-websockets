import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Container, Row, Col, FormInput, Button } from 'shards-react';
import { Messages } from '../Messages';

const POST_MESSAGES = gql`
  mutation PostMessage($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

export const Chat = () => {
  const [postMessage] = useMutation(POST_MESSAGES);
  const [state, setstate] = useState({
    user: 'Jack',
    content: '',
  });

  const onSend = () => {
    if (state.content.length > 0) {
      postMessage({ variables: state });
    }
    setstate({
      ...state,
      content: '',
    });
  };

  return (
    <Container>
      <Messages user={state.user} />
      <Row>
        <Col xs={2} style={{ padding: 0 }}>
          <FormInput
            label="User"
            value={state.user}
            onChange={(e) =>
              setstate({
                ...state,
                user: e.target.value,
              })
            }
          />
        </Col>
        <Col xs={8}>
          <FormInput
            label="Content"
            value={state.content}
            onChange={(e) =>
              setstate({
                ...state,
                content: e.target.value,
              })
            }
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                onSend();
              }
            }}
          />
        </Col>
        <Col xs={2} style={{ padding: 0 }}>
          <Button style={{ width: '100%' }} onClick={onSend}>
            Send
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
