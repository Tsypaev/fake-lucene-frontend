import React from "react";
import "./controls.css";

const Controls = ({ type, onChange }) => (
  <div>
    <form className="controls__form">
      <div className="controls__form__input">
        <input
          type="radio"
          value="all"
          checked={type === "all"}
          onChange={onChange}
        />
        Search by all fields
      </div>
      <div className="controls__form__input">
        <input
          type="radio"
          value="year"
          checked={type === "year"}
          onChange={onChange}
        />
        Search by year and title
      </div>
    </form>
  </div>
);

export default Controls;
