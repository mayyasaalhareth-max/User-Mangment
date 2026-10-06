const ErrorMessage = (props) => {
  return (
    <main className="page-box" role="alert">
      {props.message}
    </main>
  );
};

export default ErrorMessage;
