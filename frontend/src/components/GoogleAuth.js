import React from "react";
import { connect } from "react-redux";
import {signIn, signOut} from "../actions";

class GoogleAuth extends React.Component{
    componentDidMount(){
        window.gapi.load("client:auth2", ()=>{
            window.gapi.client.init({
                clientId: "966574436717-gl42cgsdv0i46j6r0sea2r7qe89q5cuq.apps.googleusercontent.com",
                scope: "email"
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });

    }
    renderAuthButton(){
        if (this.props.isSignedIn === null){
            return null;
        }else if (this.props.isSignedIn){
            return <button onClick={this.onSignOut} className="btn-goo sign-out"><i className="fas fa-sign-out"></i> Sign Out</button>;
        }else{
            return <button onClick={this.onSignIn} className="btn-goo sign-in"><i className="fas fa-sign-in"></i> Sign In</button>;
        }
    }
    onAuthChange = (isSignedIn)=>{
        if (isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }else{
            this.props.signOut();
        }
    }
    onSignIn = ()=>{
       this.auth.signIn();
    }
    onSignOut = ()=>{
        this.auth.signOut();
    }
    render(){
        return (
            <div className="nav-btn">{this.renderAuthButton()}</div>
        )
    }
}
const mapStateToProps = state=>{
    return {isSignedIn: state.auth.isSignedIn};
}
export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);
