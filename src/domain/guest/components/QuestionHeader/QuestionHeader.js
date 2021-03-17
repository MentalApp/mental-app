import { useQuery } from 'hooks/axios.hooks';

const QuestionHeader = ({user_id}) => {
  const { data, force, loading } = useQuery({ url: `/guests/${user_id}` });
  console.log(data)
  return (
    <>
      <p> Họ và tên: {!!data && data.fullname} </p>
      <p> Năm sinh: {!!data && data.date_of_birth} </p>
      <p> Giới tính: {!!data && data.gender} </p>
      <p> Dân tộc: {!!data && data.nation} </p>
      <p> Nhập ngũ: {!!data && data.join_army} </p>
      <p> Đơn vị: {!!data && data.unit} </p>
      <p> Cấp bậc: {!!data && data.rank} </p>
      <p> Chức vụ: {!!data && data.position} </p>
    </>
  )
};

export default QuestionHeader
