import { View } from 'react-navi';

import QuestionHeader from '../../components/QuestionHeader/QuestionHeader'
import QuestionForm from '../../components/QuestionForm/QuestionForm'

const Question = () => {
  return (
    <>
      <QuestionHeader info="abc" />
      <QuestionForm question="how are you?" />
    </>
  )
};

export default Question
