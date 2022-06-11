import { backgroundHoc } from '../../hoc/backgroundHoc';

const Profile = ({ fname, email, image, deleteHandler, userIndex }) => {
  return (
    <>
      <h3>{fname}</h3>
      <p>{email}</p>
      <div>
        <img src={image} alt="user-profile" width="200px" height="200px" />
      </div>
      <div>
        <button
          onClick={() => {
            deleteHandler(userIndex);
          }}
        >
          <i className="fas fa-trash-alt"></i> Profile
        </button>
      </div>
    </>
  );
};

export default backgroundHoc(Profile);
