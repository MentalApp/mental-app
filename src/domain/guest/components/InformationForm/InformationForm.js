const InformationForm = ({ label, onChange }) => {
  return (
    <div className="info-container">
      <div>{label}</div>
      <div>
        <input
          className="input-control"
          onChange={(e) => {
            onChange(e.target.value);
          }}
        ></input>
      </div>
    </div>
  );
};

export default InformationForm;
