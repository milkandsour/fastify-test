import React from "react";
import axios from "axios";

import "./index.css";

export const CATEGORIES = [
  'FAMILY', 'COUPLE', 'SINGLE', 'OTHER', 'FRIENDS'
]

const COLORS = CATEGORIES.reduce((acc, category, index) => {
  const tmp = ['#85CC00', '#76448A', '#F1C40F', '#F2D7D5', '#E74C3C'];
  acc[category]= tmp[index];
  return acc;
}, {});

export const ASPECTS = [
  'accessibility',
  'activities',
  'advancedSkiArea',
  'apresSki',
  'atmosphere',
  'beach',
  'childFriendly',
  'culture',
  'entertainment',
  'environmental',
  'food',
  'interior',
  'location',
  'nightlife',
  'noviceSkiArea',
  'pool',
  'priceQuality',
  'restaurants',
  'room',
  'sanitaryState',
  'service',
  'size',
  'surrounding',
  'terrace',
]


export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toDateString();
}

export const fetch = async() => {
  const response = await axios.get('http://0.0.0.0:3001/v1/reviews', {
    params : {
      accomodation: '96e83a90-48da-4e81-9d06-7f1b76e5364e',
      limit: 1000
    },
    headers: { 'Access-Control-Allow-Origin': '*' }
  })
  const { data } = response;
  return data;
}

export const Tips = () => <div style={{ textAlign: "center" }}>
  <em>Tip: Hold shift when sorting to multi-sort!</em>
  <br />
  <em>*Filtered search -<b>NOT TravelWith</b>- are case sensitive (EX: <b>Single</b> not single)</em>
</div>;

export const Progress = (score) => <div
  style={{
    width: '100%', height: '100%',
    backgroundColor: '#DADADA',
    borderRadius: '2px'
  }}
>
  <div
    style={{
      width: `${score * 10}%`, height: '100%',
      backgroundColor: score > 6 ? '#85CC00'
        : score > 3 ? '#FFBF00'
        : '#FF2E00',
      borderRadius: '2px',
      transition: 'all .2s ease-out'
    }}
  />
</div>

export const Category = ({ row }) => <span>
  <span style={{
    color: COLORS[row.along],
    transition: 'all .3s ease',
  }}> &#x25cf; </span>
  {row.along}
</span>
