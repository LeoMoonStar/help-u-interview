import { gql } from "@apollo/client";

export const CREAT_QUESTION = gql`
  mutation createQuestion($name: String) {
    insert_question_one(object: { name: $name }) {
      id
    }
  }
`;

export const CREATE_ANSWER = gql`
  mutation createAnswer($questionId: uuid!, $content: String!) {
    insert_answer_one(object: { question: $questionId, content: $content }) {
      id
    }
  }
`;

export const UP_VOTE = gql`
  mutation IncreaseVote($id: uuid!) {
    update_answer_by_pk(pk_columns: { id: $id }, _inc: { upVote: 1 }) {
      id
    }
  }
`;

export const DOWN_VOTE = gql`
  mutation DecreaseVote($id: uuid!) {
    update_answer_by_pk(pk_columns: { id: $id }, _inc: { downVote: 1 }) {
      id
    }
  }
`;
