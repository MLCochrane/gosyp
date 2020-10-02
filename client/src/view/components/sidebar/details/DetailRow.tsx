import React from 'react';

const DetailRow = ({
  name,
  value,
}: {
  name: string,
  value: string,
}) => (
  <div className="detail-row">
    <p className="detail-row__name">{ name }</p>
    <p className="detail-row__value">{ value }</p>
  </div>
);
export default DetailRow;
