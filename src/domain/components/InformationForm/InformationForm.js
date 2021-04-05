const InformationForm = ({ label, onChange, value, type = 'text', ...props }) => {
  return (
    <div className="info-container">
      <div>{label}</div>
      <input value={value} type={type} className="input-control" onChange={onChange} {...props}></input>
    </div>
  );
};

export default InformationForm;
