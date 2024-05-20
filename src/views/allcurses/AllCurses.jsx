import React from 'react';
import PropTypes from 'prop-types';
import CardCurse from "../components/card/CardCurse";

export default function AllCurses({ cursesAll }) {
  const mode = "ModeLight";
  return (
    <div className={"GM__" + mode + "__main"}>
      <div className={"GM__" + mode + "__main-curses"}>
      {cursesAll?.map((course) => (
        <div key={course.id}>
          <CardCurse name={course.name} id={course.id} />
        </div>
      ))}
      </div>

    </div>
  );
}

AllCurses.propTypes = {
  cursesAll: PropTypes.array,
};
