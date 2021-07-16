import { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactMic } from "react-mic";
import axios from "axios";

import { getUserChat } from "../actions";
import SocketContext from "../context/SocketContext";

const ChatForm = ({
  submitHandler,
  textRef,
  user,
  conversationId,
  emojiPicker,
  triggerPicker,
}) => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const [record, setRecord] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);
    formData.append("sender", userInfo._id);
    formData.append("receiver", user._id);
    formData.append("conversation", conversationId);
    formData.append("createdAt", new Date());
    try {
      const { data: response } = await axios.post(
        `/api/users/upload-chat-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      if (response) {
        socket.emit(
          "send-msg",
          {
            conversation: conversationId,
            sender: userInfo._id,
            name: userInfo.name,
            receiver: user._id,
            image: response.image,
            createdAt: new Date(),
          },
          () => {}
        );
      }
      dispatch(getUserChat(user._id));
    } catch (error) {
      console.log(error);
    }
  };

  const startRecording = () => {
    setRecord(true);
  };
  const stopRecording = () => {
    setRecord(false);
  };
  const onData = (recordedBlob) => {};
  const onStop = async (recordedBlob) => {
    const formData = new FormData();
    formData.append("voice", recordedBlob.blob);
    formData.append("sender", userInfo._id);
    formData.append("receiver", user._id);
    formData.append("conversation", conversationId);
    formData.append("createdAt", new Date());
    try {
      const { data: response } = await axios.post(
        `/api/users/upload-voice`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      if (response) {
        socket.emit(
          "send-msg",
          {
            conversation: conversationId,
            sender: userInfo._id,
            name: userInfo.name,
            receiver: user._id,
            voice: response.voice,
            createdAt: new Date(),
          },
          () => {}
        );
      }
      dispatch(getUserChat(user._id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="row">
      <div className="col-12">
        <form
          onSubmit={submitHandler}
          className="chat-box-tray"
          disabled={conversationId ? false : true}
        >
          <span className="select-emoji" onClick={triggerPicker}>
            <i className="far fa-smile fa-2x text-warning"></i>
          </span>
          {emojiPicker}
          <input
            type="file"
            className="d-none"
            id="image"
            onChange={(e) => uploadImageHandler(e)}
          />
          <label htmlFor="image">
            <i className="fa fa-image"></i>
          </label>

          <input
            ref={textRef}
            type="text"
            className="chat-input"
            placeholder="escreva mensagem..."
          />
          <ReactMic
            record={record}
            onStop={onStop}
            onData={onData}
            visualSetting="frequencyBars"
            className="sound-wave"
            strokeColor="#999"
            backgroundColor="#fff"
            echoCancellation="true"
            channelCount="2"
          />
          {record ? (
            <i
              className="fas fa-microphone text-danger  microphone-active"
              onClick={stopRecording}
            ></i>
          ) : (
            <i className="fas fa-microphone" onClick={startRecording}></i>
          )}

          <button type="submit" className="submit-chat">
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};
export default ChatForm;
