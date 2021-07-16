import React from "react";
import $ from "jquery";

const UserChat = () =>{
    const auth=true;

    hideChat(auth);

    $('#chat-send').click(function() {
      toggleFab();
    });
    
    
    //Toggle chat and links
    function toggleFab() {
      $('.chat-send').toggleClass('fa-comment');
      $('.chat-send').toggleClass('fas fa-times-circle');
      $('.chat-send').toggleClass('is-active');
      $('.chat-send').toggleClass('is-visible');
      $('#chat-send').toggleClass('is-float');
      $('.chat').toggleClass('is-visible');
      $('.fab').toggleClass('is-visible');
    }
    
      $('.agent-nav').click(function(e) {
            hideChat(1);
      });
    
      $('#chat_second_screen').click(function(e) {
            hideChat(2);
      });
    
      $('#chat_fullscreen_loader').click(function(e) {
          $('.fullscreen').toggleClass('zmdi-window-maximize');
          $('.fullscreen').toggleClass('zmdi-window-restore');
          $('.chat').toggleClass('chat_fullscreen');
          $('.fab').toggleClass('is-hide');
          $('.header_img').toggleClass('change_img');
          $('.img_container').toggleClass('change_img');
          $('.chat_header').toggleClass('chat_header2');
          $('.fab_field').toggleClass('fab_field2');
          $('.chat_converse').toggleClass('chat_converse2');
          //$('#chat_converse').css('display', 'none');
         // $('#chat-send').css('display', 'none');
         // $('#chat_form').css('display', 'none');
         // $('.chat_login').css('display', 'none');
         // $('#chat_fullscreen').css('display', 'block');
      });
    
    function hideChat(hide) {
        switch (hide) {
          case 0:
                $('.fab_field').css('display', 'none');
                $('#chat_converse').css('display', 'block');
                $('#chat-body').css('display', 'none');
                $('#chat_form').css('display', 'none');
                $('.chat_login').css('display', 'none');
                $('.chat_fullscreen_loader').css('display', 'none');
                 $('#chat_fullscreen').css('display', 'none');
                break;
          
          case 1:
            $('.fab_field').css('display', 'block');
            $('#chat_converse').css('display', 'none');
            $('#chat_body').css('display', 'none');
            $('#chat_form').css('display', 'none');
            $('.chat_login').css('display', 'none');
            $('.chat_fullscreen_loader').css('display', 'none');
            $('#chat_fullscreen').css('display', 'block');
                break;
          case 2:
                $('.fab_field').css('display', 'none');
                $('.chat_option').css('display', 'none');
                $('#chat_converse').css('display', 'none');
                $('#chat_body').css('display', 'none');
                $('#chat_form').css('display', 'none');
                $('.chat_login').css('display', 'block');
                $('.chat_fullscreen_loader').css('display', 'block');
                $('#chat_fullscreen').css('display', 'none');
                break;
        }
    }

    function getUserName(){
        var userAdmin;
    document.querySelector('.agent-nav').addEventListener('click', function(e){
        const item = e.target.parentNode;
        let selected = e.target;
        console.log(selected);
        userAdmin = selected.textContent;
    });
    return userAdmin;}

    return (
        <div className="fabs">
    <div className="chat">
      <div className="chat_header">
        <div className="chat_option">
        <div className="header_img">
          <img src="{{user.photo.url}}"/>
          </div>
          <span id="chat_head">user.username</span> <br/> <span className="agent">Agente</span> <span className="online">(Online)</span>
         <span id="chat_fullscreen_loader" className="chat_fullscreen_loader"><i className="fullscreen zmdi zmdi-window-maximize"></i></span>
        </div>
  
      </div>
      <div className="chat-body chat_login">
          <p>Por favor faça o login ou cadastre-se para poder interagir conosco</p> <a href="{% url 'users:login' %}" className="ml-2">Entrar <i className="fa fa-sign-in-alt"></i></a> <br/> <a href="{% url 'users:register' %}" className="ml-2">Cadastre-se <i className="fa fa-sign-out-alt"></i></a>
      </div>
      <div id="chat_converse" className="chat_conversion chat_converse">
              <h4 className="agent-title">Escolha um agente para interagir</h4>
              <ul className="agent-nav"></ul>
      </div>

        <div id="chat_fullscreen" className="chat_conversion chat_converse">
        <span className="chat_msg_item chat_msg_item_admin">
              <div className="chat_avatar">
                 <img src="http://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg"/>
              </div>Hey there! Any question?</span>
        <span className="chat_msg_item chat_msg_item_user">
              Hello!</span>
              <div className="status">20m ago</div>
      </div>
      <div className="fab_field">
        <a id="fab_camera" className="fab"><i className="zmdi zmdi-camera"></i></a>
        <button type="submit" id="fab_send" className="fab chat-submit"><i className="fa fa-envelope"></i></button>
        <input id="chat-message" name="chat_message" placeholder="Mande mensagem..." className="chat-field chat-message" />
      </div>
    </div>
      <a id="chat-send" className="fa fa-send"><i className="chat-send fa fa-comments"></i></a>
  </div>
    )
}

export default UserChat;