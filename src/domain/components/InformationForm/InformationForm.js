const InformationForm = ({ label, onChange, value, type = 'text', ...props }) => {
  return (
    <div className="info-container">
      <div>{label}</div>
      <input
        value={value}
        type={type}
        className="input-control"
        style={{ border: '1px solid #c3b9b9' }}
        onChange={onChange}
        {...props}
      ></input>
    </div>
  );
};

export default InformationForm;
