export default function Input({ lable, id, error, ...props }) {
  return (
    <div className="control">
      <label htmlFor={id}>{lable}</label>
      <input id={id} {...props} />
      <div>{error && <p>{error}</p>}</div>
    </div>
  );
}
