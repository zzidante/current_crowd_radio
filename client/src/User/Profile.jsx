import React from 'react';

function Profile(){
  return (
  <section className="row">
  <div className="col-xs-2 col-sm-4 col-xl-5">
    Left
  </div>
  <section className="col-xs-8 col-sm-4 col-xl-2 form-row">

    <section>
      <form id="edit-account-form">
        <h3>Edit Your Account</h3>
        <div className="col-auto">
          <label className="username"></label>
          <input type="text" className="form-control" placeholder="Username" />
        </div>
  
        <div className="col-auto">
          <label className="email"></label>            
          <input type="text" className="form-control" placeholder="Email" />
        </div>

        <div className="col-auto">
          <label className="default-location"></label>            
          <input type="text" className="form-control" placeholder="Default Location" />
        </div>
  
        <div className="col-auto">
          <button type="submit" className="btn btn-primary">Update</button>
        </div>
      </form>
    </section>


    <section>
      <form id="change-password-form">
        <h3>Change Your Password</h3>
        <div className="col-4">
          <label className="old-password"></label>
          <input type="text" className="form-control" placeholder="Old Password" />
        </div>

        <div className="col">
          <label className="new-password"></label>            
          <input type="text" className="form-control" placeholder="New Password" />
        </div>

        <div className="col">
          <label className="confirm-new-password"></label>            
          <input type="text" className="form-control" placeholder="Confirm New Password" />
        </div>

        <div className="col-auto">
          <button type="submit" className="btn btn-primary">Update</button>
        </div>
      </form>
    </section>    
  </section>

  <div className="col-xs-2 col-sm-3 col-xl-5">
    Right
  </div >
</section>)
}

export default Profile