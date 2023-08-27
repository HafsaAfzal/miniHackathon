
  const aap=firebase.initializeApp(firebaseConfig);
  
  // Reference to the database
  const database = firebase.database();
const updatePassword=()=>{  
  // Get references to HTML elements
  const dpPic = document.getElementById('dpPic');
  const nameInput = document.querySelector('.nameDiv input');
  const oldPassInput = document.getElementById('oldPass');
  const newPassInput = document.querySelectorAll('.passwordDiv input')[1]; // Second input for new password
  const updatePasswordBtn = document.getElementById('blogBtn');
  
  // Listen for file input change
  document.getElementById('file').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
      const storageRef = firebase.storage().ref().child(`profilePictures/${firebase.auth().currentUser.uid}`);
      storageRef.put(file).then(() => {
        storageRef.getDownloadURL().then(downloadURL => {
          dpPic.src = downloadURL;
          // Update the user's photoURL in their profile
          firebase.auth().currentUser.updateProfile({ photoURL: downloadURL });
        });
      });
    }
  });
  
  // Listen for "Update Password" button click
  updatePasswordBtn.addEventListener('click', () => {
    const user = firebase.auth().currentUser;
    const oldPassword = oldPassInput.value;
    const newPassword = newPassInput.value;
  
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      oldPassword
    );
  
    // Reauthenticate user with their current password
    user.reauthenticateWithCredential(credential).then(() => {
      // Update password
      user.updatePassword(newPassword).then(() => {
        console.log('Password updated successfully');
      }).catch(error => {
        console.error('Error updating password:', error);
      });
    }).catch(error => {
      console.error('Error reauthenticating user:', error);
    });
  });
}
  // More code to handle updating the name and other data...
  // ...
  