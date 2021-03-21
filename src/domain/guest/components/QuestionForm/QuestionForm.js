const QuestionForm = ({ question }) => {
  return (
    <>
      <p> {question} </p>
      <input type="radio" id="true" name="question" />
      <label htmlFor="true">Có</label>
      <input type="radio" id="false" name="question" />
      <label htmlFor="false">Không</label>
    </>
  );
};

export default QuestionForm;
