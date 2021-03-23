const InformationForm = ({ label, onChange, type = 'text' }) => {
  return (
    <div className="info-container">
      <div>{label}</div>
      <div>
        <input type={type} className="input-control" onChange={onChange}></input>
      </div>
    </div>
  );
};

export default InformationForm;
