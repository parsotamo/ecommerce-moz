import React, { useState, useEffect, useRef, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/pt";
import axios from "axios";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

import {
  getUsers,
  getUserChat,
  getUser,
  createChatContent,
} from "../../actions";
import Loading from "../Loading";
import Message from "../Message";
import ChatSearch from "../ChatSearch";
import ChatUserList from "../ChatUserList";
import ChatArea from "../ChatArea";
import ChatForm from "../ChatForm";
import SocketContext from "../../context/SocketContext";

const ChatScreen = ({ history }) => {
  const dispatch = useDispatch();
  let userId = useParams().conversationId;
  const socket = useContext(SocketContext);
  const textRef = useRef("");

  const [emojiPickerState, setEmojiPickerState] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newOfflineUser, setNewOfflineUser] = useState("");
  const [newOnlineUser, setNewOnlineUser] = useState("");

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, users, page, pages } = useSelector(
    (state) => state.userList
  );
  const { user } = useSelector((state) => state.user);

  const {
    loading: loadingChats,
    error: errorChats,
    userChats,
    conversationId,
  } = useSelector((state) => state.userChats);

  useEffect(() => {
    if (userInfo) {
      socket.emit("join-user", userInfo, () => {
        axios.get(`/api/users/users-online`).then((response) => {
          setOnlineUsers(response.data);
        });
      });
      socket.on("new-online-user", (newOnlineUser) => {
        setNewOnlineUser(newOnlineUser);
        axios.get(`/api/users/users-online`).then((response) => {
          setOnlineUsers(response.data);
        });
        axios.get(`/api/users/is-offline/${userId}`).then((response) => {
          if (response.data) {
            setNewOfflineUser(response.data);
          } else {
            setNewOfflineUser("");
          }
        });
      });
      socket.on("receive-msg", (data) => {
        dispatch(getUserChat(userId));
      });
      socket.on("new-offline-user", (newUserOffline) => {
        if (newUserOffline._id === userId) {
          setNewOfflineUser(newUserOffline);
        }
        axios.get(`/api/users/users-online`).then((response) => {
          setOnlineUsers(response.data);
        });
      });
    }
  }, []);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getUsers(1, 30));
    }
  }, []);

  useEffect(() => {
    dispatch(getUserChat(userId));
    dispatch(getUser(userId));
    axios.get(`/api/users/is-offline/${userId}`).then((response) => {
      if (response.data) {
        setNewOfflineUser(response.data);
      } else {
        setNewOfflineUser("");
      }
    });
    axios.get(`/api/users/is-online/${userId}`).then((response) => {
      if (response.data) {
        setNewOnlineUser(response.data);
      } else {
        setNewOnlineUser("", {});
      }
    });
    return () => {
      dispatch({ type: "USER_CHATS_RESET" });
    };
  }, [userId]);
  const submitHandler = (e) => {
    e.preventDefault();
    sendCurrentMsg();
    dispatch(getUserChat(userId));
    textRef.current.value = "";
  };
  const sendCurrentMsg = () => {
    dispatch(
      createChatContent({
        conversation: conversationId,
        sender: userInfo._id,
        receiver: userId,
        message: textRef.current.value,
        createdAt: new Date(),
      })
    );
    socket.emit(
      "send-msg",
      {
        conversation: conversationId,
        sender: userInfo._id,
        name: userInfo.name,
        receiver: userId,
        message: textRef.current.value,
        createdAt: new Date(),
      },
      () => {}
    );
  };
  const updateUserChat = () => {
    dispatch(getUserChat(userId));
  };
  const resetUser = () => {
    userId = "";
    history.push("/admin/chat");
  };
  const updateUserList = () => {
    dispatch(getUsers(1, 30));
  };
  let emojiPicker;

  if (emojiPickerState) {
    emojiPicker = (
      <Picker
        title="Escolha emoji"
        emoji="point_up"
        onSelect={(emoji) => (textRef.current.value += emoji.native)}
      />
    );
  }

  function triggerPicker(e) {
    e.preventDefault();
    setEmojiPickerState(!emojiPickerState);
  }

  return (
    <>
      {loading && <Loading />}
      {error && <Message variant="danger" children={error} />}
      {users && (
        <div
          className="container-fluid"
          onClick={(e) => {
            if (emojiPickerState) {
              setEmojiPickerState(!emojiPickerState);
            }
          }}
        >
          <div className="row panel">
            <div
              className={
                userId
                  ? "col-xl-4 col-lg-5 col-md-6 border-right d-none d-md-block"
                  : "col-xl-4 col-lg-5 col-md-6 border-right"
              }
            >
              <div className="settings-tray">
                <img
                  className="profile-image"
                  src={`/images/users/${userInfo.photo}`}
                />
                <span className="settings-tray--right">
                  <i onClick={updateUserList} className="fas fa-sync"></i>
                </span>
              </div>
              <ChatSearch />

              <ChatUserList
                users={users}
                userInfo={userInfo}
                userId={userId}
                onlineUsers={onlineUsers}
              />
            </div>

            <div
              className={
                userId
                  ? "col-xl-8 col-lg-7 col-md-6"
                  : "col-xl-8 col-lg-7 col-md-6 d-none d-md-block"
              }
            >
              {user && userId && (
                <div className="settings-tray">
                  <div className="user-selected-box">
                    <img
                      src={`/images/users/${user.photo}`}
                      className="profile-image"
                    />
                    <div className="user-selected-details">
                      <h5 className="user-name">{user.name}</h5>
                      {newOfflineUser ? (
                        <div>
                          Saiu há{" "}
                          <span>
                            {moment(newOfflineUser.time).fromNow("pt-br")}
                          </span>
                        </div>
                      ) : newOnlineUser._id === user._id ? (
                        <span>Online</span>
                      ) : (
                        <span>Offline</span>
                      )}
                    </div>
                  </div>

                  <span className="settings-tray--right">
                    <i onClick={updateUserChat} className="fas fa-sync"></i>

                    <i
                      onClick={resetUser}
                      className="fas fa-users d-inline-block d-md-none"
                    ></i>
                  </span>
                </div>
              )}
              <div className="chat-panel">
                {userId && (
                  <ChatArea
                    loading={loadingChats}
                    error={errorChats}
                    userChats={userChats}
                    userInfo={userInfo}
                  />
                )}
                {userId && (
                  <ChatForm
                    submitHandler={submitHandler}
                    textRef={textRef}
                    user={user}
                    conversationId={conversationId}
                    emojiPicker={emojiPicker}
                    triggerPicker={triggerPicker}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatScreen;
