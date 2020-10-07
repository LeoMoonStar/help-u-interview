import React, { Component, ReactPropTypes } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { RouteComponentProps } from "react-router";
import QuestionHeader from "../component/QuestionHeader";
import { GET_ANSWER, GET_ANSWER_BY_PK } from "../api/query";
import { BeatLoader } from "react-spinners";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { UP_VOTE, DOWN_VOTE } from "../api/mutation";
import { Paper } from "@material-ui/core";
import "./pages.css";

function RandomAnswer(data: []) {
  console.log(data);
  if (data && data.length > 1) {
    var a1 = Math.floor(Math.random() * data.length);
    var a2 = Math.floor(Math.random() * data.length);
    return [a1, a2];
  } else return null;
}

function AnswerCell({ answerId }: { answerId: string }) {
  let answer;
  const { loading, data, error } = useQuery(GET_ANSWER_BY_PK, {
    variables: {
      id: answerId,
    },
  });
  if (loading) {
    return <BeatLoader />;
  } else {
    // console.log("error", error);
    // console.log("data", data);
    answer = data.answer_by_pk;
    const { content, downVote, upVote } = answer;
    return (
      <Paper variant="elevation" className="answerPaper">
        <span className="answerSpan">{content}</span>
      </Paper>
    );
  }
}
function VoteBlock({ left, right }: { left: string; right: string }) {
  const [increaseUpvote, { loading: uploading, data }] = useMutation(UP_VOTE);
  const [
    decreseDownVote,
    { loading: downLoading, data: downData },
  ] = useMutation(DOWN_VOTE);
  const onClick = function (first: string, second: string) {
    increaseUpvote({
      variables: {
        id: first,
      },
    });
    decreseDownVote({
      variables: {
        id: second,
      },
    });
    window.location.reload(false);
  };
  return (
    <div>
      <AiFillCaretLeft size="5em" onClick={() => onClick(left, right)} />
      <AiFillCaretRight size="5em" onClick={() => onClick(right, left)} />
    </div>
  );
}

function AnswerBlock({}) {
  let { id } = useParams();
  id = id.slice(1, id.length);
  let answers, filterResult;
  const { loading, data, error } = useQuery(GET_ANSWER, {
    variables: {
      question: id,
    },
  });
  if (loading) {
    return <h2>No Answer Found Currently</h2>;
  } else {
    answers = data.answer;
    filterResult = RandomAnswer(answers);
    console.log(filterResult);
    if (!filterResult)
      return <h2>No Enough Answer, Please add a new answer</h2>;
    const left = answers[filterResult[0]].id;
    const right = answers[filterResult[1]].id;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "80%",
          alignItems: "center",
        }}
      >
        <AnswerCell answerId={left} />
        <VoteBlock left={left} right={right} />
        <AnswerCell answerId={right} />
      </div>
    );
  }
}

export default class QuestionDetailPage extends Component {
  render() {
    return (
      <React.Fragment>
        <QuestionHeader />
        <AnswerBlock />
      </React.Fragment>
    );
  }
}
