const { gql } = require("@apollo/client");

export const getData = gql`
  query {
    allNotes {
      id
      title
      body
    }
  }
`;

export const create = gql`
  mutation Create($title: String!, $body: String) {
    create(title: $title, body: $body) {
      id
      title
    }
  }
`;

export const update = gql`
  mutation Update($id: ID!, $title: String!, $body: String) {
    update(id: $id, title: $title, body: $body) {
      id
      title
      body
    }
  }
`;

export const deleteNote = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(id: $id)
  }
`;
