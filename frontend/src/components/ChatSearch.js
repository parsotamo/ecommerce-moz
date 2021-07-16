const ChatSearch = () => {
  return (
    <div className="search-box">
      <div className="input-wrapper">
        <i className="fas fa-search"></i>
        <input
          type="text"
          className="search-input"
          placeholder="pesquisar usuário"
        />
      </div>
    </div>
  );
};
export default ChatSearch;
