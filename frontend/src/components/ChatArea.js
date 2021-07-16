import ScrollToBottom from "react-scroll-to-bottom";
import moment from "moment";

import Loading from "./Loading";
import Message from "./Message";
import Empty from "./Empty";

const ChatArea = ({ loading, error, userChats, userInfo }) => {
  return (
    <ScrollToBottom className="chat-area">
      <>
        {loading && <Loading />}
        {error && <Message variant="danger" children={error} />}
        {userChats.length === 0 ? (
          <Empty />
        ) : (
          userChats.map((chat, i) =>
            chat.sender === userInfo._id ? (
              <div className="row" key={i + 1}>
                <div className="col-md-5 offset-md-7 text-end chat-msg-wrapper">
                  {chat.message && (
                    <div className="chat-message chat-message--right text-start">
                      {chat.message}{" "}
                      <small className="fst-italic d-block text-end">
                        {moment(chat.createdAt).fromNow()}
                      </small>
                    </div>
                  )}
                  {chat.image && (
                    <div className="chat-img-box">
                      <img
                        src={`/chat/images/${chat.image}`}
                        className="chat-img chat-img--right"
                      />
                      <small className="timestamp-img">
                        {moment(chat.createdAt).fromNow()}
                      </small>
                    </div>
                  )}
                  {chat.voice && (
                    <>
                      <audio
                        controls
                        className="chat-message chat-message--right"
                      >
                        <source
                          src={`/chat/audio/${chat.voice}`}
                          type="audio/webm"
                        />
                      </audio>
                      <small className="fst-italic audio-timestamp">
                        {moment(chat.createdAt).fromNow()}
                      </small>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="row" key={i + 1}>
                <div className="col-md-5 chat-msg-wrapper">
                  {chat.message && (
                    <div className="chat-message chat-message--left">
                      {chat.message}{" "}
                      <small className="fst-italic d-block text-end">
                        {moment(chat.createdAt).fromNow()}
                        {/* {new Date(chat.createdAt)} */}
                      </small>
                    </div>
                  )}
                  {chat.image && (
                    <div className="chat-img-box">
                      <img
                        src={`/chat/images/${chat.image}`}
                        className="chat-img chat-img--left"
                      />
                      <small className="timestamp-img">
                        {moment(chat.createdAt).fromNow()}
                      </small>
                    </div>
                  )}
                  {chat.voice && (
                    <>
                      <audio
                        controls
                        className="chat-message chat-message--left"
                      >
                        <source
                          src={`/chat/audio/${chat.voice}`}
                          type="audio/webm"
                        />
                      </audio>
                      <small className="fst-italic audio-timestamp">
                        {moment(chat.createdAt).fromNow()}
                      </small>
                    </>
                  )}
                </div>
              </div>
            )
          )
        )}
      </>
    </ScrollToBottom>
  );
};

export default ChatArea;
