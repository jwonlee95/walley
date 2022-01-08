import React from "react";

export const Footer: React.FC<{}> = () => {
  return (
    <div className="footer-wrapper">
      <div className="links-wrapper">
        <ul data-header="Information">
          <li>
            <a className="link" href="/walley">
              Project
            </a>
          </li>
          <li>
            <a className="link" href="/walley">
              Introduction
            </a>
          </li>
        </ul>
      </div>
      <div className="links-wrapper">
        <ul data-header="Contacts">
          <li>
            <a className="link" href="/walley">
              Location
            </a>
          </li>
        </ul>
      </div>
      <div className="links-wrapper">
        <ul data-header="Social Media">
          <li>
            <a className="link" href="/walley">
              GitHub
            </a>
          </li>
        </ul>
      </div>
      <div className="links-wrapper">
        <ul data-header="Members">
          <li>Jaewon Lee</li>
          <li>Hasung Jun</li>
          <li>Ahyoung Oh</li>
        </ul>
      </div>
      <div className="links-wrapper">
        <ul data-header="Icons">
          <li>
            <a className="link" href="https://icons8.com/">
              Icon8
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
