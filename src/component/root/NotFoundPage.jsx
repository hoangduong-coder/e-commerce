import {useRouteError} from 'react-router-dom';

const NotFoundPage = () => {
  const error = useRouteError ();
  return (
    <div>
      <h1>Not found!</h1>
      <p>
        Sorry, an error has occurred. There is no result that you're looking for.
      </p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default NotFoundPage;
