import React from "react";
import styles from "./../styles/Desktop.module.css";
import Splash from "./Splash";

const Desktop = (props) => {
  return (
    <div className={styles.desktop}>
      {props.check && (
        <Splash
          region={props.region}
          pred={props.pred}
          setPred={props.setPred}
          tensor={props.tensor}
          setTensor={props.setTensor}
          setNum={props.setNum}
          num={props.num}
          onboarding={props.onboarding}
          setRegion={props.setRegion}
        />
      )}
      <div className={styles.badge}>
        <img src="logo-with-back.svg" />
        <div className={styles.badgewrap}>
          <div className={styles.name}>Greenfy</div>
        </div>
      </div>
      <a
        href="https://twitter.com/intent/tweet?text=Check%20out%20EcoSnap%20to%20learn%20how%20to%20recycle%20your%20plastic%20better%20with%20AI&url=http%3A%2F%2Fecosnap.vercel.app"
        className={styles.share}
        target="_blank"
      >
        <img src="twitter.svg" /> Share
      </a>
      <div className={styles.qrcode}>
        <img src="qrcode.png" />
        <span>Open on your phone ✨</span>
      </div>
    </div>
  );
};

export default Desktop;
