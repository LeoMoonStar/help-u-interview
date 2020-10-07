export interface QuestionCellInterface extends Question {}

export interface QuestionListInterface {
  questions: Array<Question>;
}

export interface Question {
  id: string;
  name: string;
}

export interface Answer {}
