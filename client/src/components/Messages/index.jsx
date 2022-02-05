import React from 'react';
import { gql } from '@apollo/client';
import { useSubscription } from '@apollo/client';


const GET_MESSAGES = gql`
  subscription {
    messages {
      id
      content
      user
    }
  }
`;

export const Messages = ({ user }) => {
  const { data } = useSubscription(GET_MESSAGES);

  if (!data) {
    return null;
  }

  return data.messages.map(({ id, user: msgUser, content }) => (
    <div
      key={id}
      style={{
        margin: 10,
        display: 'flex',
        justifyContent: user === msgUser ? 'flex-end' : 'flex-start',
        paddingBottom: '1em',
      }}
    >
      {user !== msgUser && (
        <div
          style={{
            height: 50,
            width: 50,
            marginRight: '0.5em',
            border: '2px solid #e5e6ea',
            borderRadius: 25,
            textAlign: 'center',
            fontSize: '1.5em',
            paddingTop: 5,
          }}
        >
          {msgUser.slice(0, 2).toUpperCase()}
        </div>
      )}
      <div
        style={{
          background: user === msgUser ? '#58bf56' : '#e5e6ea',
          color: user === msgUser ? 'white' : 'black',
          padding: '1em',
          borderRadius: '1em',
          maxWidth: '60%',
        }}
      >
        {content}
      </div>
    </div>
  ));
};
