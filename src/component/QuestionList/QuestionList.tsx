import React, { Component, useState } from "react";
import {
  QuestionCellInterface,
  QuestionListInterface,
  Question,
} from "../../type";
import { useQuery, useMutation } from "@apollo/client";
import { GET_QUESTIONS } from "../../api/query";
import { CREAT_QUESTION } from "../../api/mutation";
import "./questionList.css";
import {
  Button,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  TextField,
} from "@material-ui/core";
import { Link } from "react-router-dom";

function QuestionCell({ id, name }: QuestionCellInterface) {
  return (
    <Link
      to={{ pathname: `/question:${id}` }}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className="questionCellContainer">
        <h2>{name}</h2>
      </div>
    </Link>
  );
}

function QuestionList() {
  const { loading, data } = useQuery(GET_QUESTIONS);
  var questions: Array<Question> = [];
  if (!loading) {
    questions = data.question;
    console.log(questions);
  }
  return (
    <div className="listContainer">
      <QuestionHeader number={questions.length} />
      {questions.map((q, index) => (
        <QuestionCell id={q.id} name={q.name} key={index} />
      ))}
    </div>
  );
}

function NewQuestionModal({
  open,
  handleClose,
  handleSubmit,
}: {
  open: boolean;
  handleClose: any;
  handleSubmit: any;
}) {
  const [content, setContent] = useState("");
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please think carfully and provide this community a good question
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="question"
          label="Question Content"
          type="text"
          fullWidth
          onChange={(e) => setContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleSubmit({ variables: { name: content } });
            handleClose(!open);
          }}
          color="primary"
        >
          Submit
        </Button>
        <Button onClick={() => handleClose(!open)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
function QuestionHeader({ number }: { number: Number }) {
  const [createQuestion, { error, data }] = useMutation(CREAT_QUESTION);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="headerContainer">
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <h1>{`Question#:${number}`}</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(!modalOpen)}
        >
          New Question
        </Button>
      </Grid>
      <NewQuestionModal
        open={modalOpen}
        handleClose={setModalOpen}
        handleSubmit={createQuestion}
      />
    </div>
  );
}

export default class QuestionListContainer extends Component<any, any> {
  render() {
    return (
      <div className="questionListContainer">
        <QuestionList />
      </div>
    );
  }
}
