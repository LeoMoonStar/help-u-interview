import { gql } from "@apollo/client";
export const GET_QUESTIONS = gql`
  query getQuestion {
    question {
      id
      name
    }
  }
`;

export const GET_QUESTION_BY_PK = gql`
  query GET_QUESTION($id: uuid!) {
    question_by_pk(id: $id) {
      name
    }
  }
`;

export const GET_ANSWER = gql`
  query getAnswers($question: uuid) {
    answer(where: { question: { _eq: $question } }) {
      id
    }
  }
`;

export const GET_ANSWER_BY_PK = gql`
  query GET_ANSWER_BY_PK($id: uuid!) {
    answer_by_pk(id: $id) {
      content
      downVote
      poster
      upVote
    }
  }
`;
