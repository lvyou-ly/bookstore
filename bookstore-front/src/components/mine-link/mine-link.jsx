import React from "react";
import "./sass/mine-link.scss";
export default function LoginLink(props) {
    const jumpToMine = () => {
        props.jumpToMine();
    }
    return (
        <p className="link" onClick={jumpToMine}>我的</p>
    );
}