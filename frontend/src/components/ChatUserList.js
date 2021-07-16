import { useRef } from "react";
import { LinkContainer } from "react-router-bootstrap";

const ChatUserList = ({ users, userInfo, userId, onlineUsers }) => {
  const userList = useRef("");
  const userItem = useRef("");
  const userSelected = () => {
    userItem.current.classList.remove("active");
  };

  return (
    <div ref={userList} className="user-list">
      {users.map(
        (user, i) =>
          user._id !== userInfo._id && (
            <LinkContainer to={`/admin/chat/${user._id}`} key={i + 1}>
              <div
                ref={userItem}
                className="user-list-item"
                onClick={userSelected}
              >
                <img
                  src={`/images/users/${user.photo}`}
                  className="profile-image"
                />
                <div className="user-details">
                  <h5 className="user-name">{user.name}</h5>

                  {Object.keys(onlineUsers).find(
                    (onlineUser) => onlineUser === user._id
                  ) ? (
                    <div className="timestamp fw-bold text-success">Online</div>
                  ) : (
                    <div className="timestamp text-danger">Offline</div>
                  )}
                </div>
              </div>
            </LinkContainer>
          )
      )}
    </div>
  );
};

export default ChatUserList;
