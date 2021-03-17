import React, { useCallback } from 'react';
import { useQuery } from 'hooks/axios.hooks';
import Loading from 'components/Loading';

import QuestionHeader from '../../components/QuestionHeader/QuestionHeader'
import QuestionForm from '../../components/QuestionForm/QuestionForm'

const Question = () => {
  const { data, force, loading } = useQuery({ url: '/questions' });
  console.log(data)

  return (
    <>
      {loading && <Loading />}
      <QuestionHeader user_id={1} />
      <QuestionForm question={!!data && data[0].question} />
      <button> Tiếp theo </button>
      
    </>
  )
};

export default Question
