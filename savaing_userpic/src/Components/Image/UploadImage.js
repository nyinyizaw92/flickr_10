import React from 'react';
//import './ImageUpload.css';
import firebase from '../../Utilities/firebase';
import { connect } from 'react-redux';

const firestore = firebase.firestore();
class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.imageFile = React.createRef();
    
  }

  addMessage = (url) => {
    
    firestore.collection('message')
      .add({
      
        image: url,
        created_by: this.props.user.email,
         // name:this.state.name,
       
      });
  }

  handleFileOnChange = () => {
    const file = this.imageFile.current.files[0];
     console.log(file);
    var storageRef = firebase.storage().ref();

    const filePath = 'message/images/' + file.name;
    const imageRef = storageRef.child(filePath);
    console.log('imageref',imageRef);

    imageRef
      .put(file)
      .then(() => {
        storageRef.child(filePath)
          .getDownloadURL().then(this.addMessage)
      })
      .catch(error => { console.log(error) });

  }

  render() {

    return (
      
      <div class="row">
      
          <input 
          ref={this.imageFile}
          onChange={this.handleFileOnChange}
          type="file" accept="image/*" />
      
      </div>
     
    );
  }
}


const mapStateToProps = (state) => ({
  user: state.currentUser,
})

export default connect(mapStateToProps)(UploadImage);