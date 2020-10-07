import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_QUESTION_BY_PK } from "../../api/query";
import {
  Button,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  TextField,
  TextareaAutosize,
} from "@material-ui/core";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { CREATE_ANSWER } from "../../api/mutation";
import "./questionHeader.css";

function NewAnswerModal({
  open,
  handleClose,
  handleSubmit,
  questionId,
}: {
  open: boolean;
  questionId: string;
  handleClose: Function;
  handleSubmit: Function;
}) {
  const [answer, setAnswer] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          What is your best answer for this question?
        </DialogContentText>
        <div
          style={{
            border: "1px solid #ccc",
            cursor: "text",
            minHeight: 80,
            padding: 10,
          }}
        >
          <TextareaAutosize
            rowsMin={4}
            rowsMax={10}
            defaultValue="Your answer"
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleSubmit({ variables: { content: answer, questionId } });
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

export default function QuestionHeader() {
  let { id } = useParams();
  id = id.slice(1, id.length);
  const [modalOpen, setModalOpen] = useState(false);
  const { loading, data, error } = useQuery(GET_QUESTION_BY_PK, {
    variables: {
      id: id,
    },
  });
  const [createAnswer, { error: answerError, data: answerData }] = useMutation(
    CREATE_ANSWER
  );

  let name = "";
  if (!loading) name = data.question_by_pk.name;
  return (
    <div className="header">
      <h1>{`#${name}`}</h1>
      <div className="buttonContainer">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
        >
          New Answer
        </Button>
      </div>
      <NewAnswerModal
        open={modalOpen}
        questionId={id}
        handleClose={setModalOpen}
        handleSubmit={createAnswer}
      />
    </div>
  );
}
