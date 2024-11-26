import React from "react";

const courses = [
  {
    id: 1,
    title: "JavaScript",
    price: 5000,
  },
  {
    id: 2,
    title: "PHP",
    price: 20000,
  },
];

export default function Course() {
  return (
    <>
      <h1>Danh Sách Khóa học</h1>
      {courses.map((item) => {})}
    </>
  );
}
