import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="bg-light py-5">
        <div className="container">
          <h4 className="fw-normal">Get the Fresh Cart app</h4>
          <p className="lead">we will send a link,open it on your phone to download app </p>
          <div className=" row d-flex justify-content-between mx-lg-2 border-0 py-2 pb-4 border-bottom">
            <div className="col-lg-10">
              <input type="text" className="form-control" placeholder="Email" />
            </div>
            <div className="col-lg-2">
              <button className="btn bg-main text-light px-4">Share app link</button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
