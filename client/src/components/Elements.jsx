import React from "react";
import TextArea from "./SectionEdit";
import { BsFillPencilFill } from "react-icons/bs";

function Heading2({ children }) {
  return (
    <div
      style={{ borderRadius: "4px 4px 0 0" }}
      className="TextArea capitalize text-slate-900 px-4 py-2 text-base font-semibold border-b-2 border-gray-300"
    >
      {children}{" "}
      <span className="text-sm text-blue-700 uppercase">(Rquired)</span>
    </div>
  );
}

function Img({ _id, idx, src, className, action }) {
  return (
    <div className={className + " flex justify-center relative"}>
      <label
        htmlFor={`file_${_id}`}
        className="bg-blue-700 flex justify-center items-center rounded-full text-white w-6 h-6 text-xs absolute right-2 top-2 cursor-pointer"
      >
        <BsFillPencilFill />
        <input
          type="file"
          id={`file_${_id}`}
          onChange={(e) => {
            action(e, idx, "file");
          }}
          style={{ display: "none" }}
        />
      </label>
      <img src={src} className="rounded-md object-contain" />
    </div>
  );
}

export function Location({ data, action }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-2 flex-wrap justify-left items-start">
      {data &&
        data.map((item, idx) => (
          <div
            className=" flex flex-row-reverse gap-2 justify-center"
            key={`Product_${item.id}`}
          >
            <Img
              idx={idx}
              action={action}
              _id={`_id_${idx}_Location`}
              src={item.logo}
              className="w-1/3 h-20 md:w-44 "
            />
            <div className="flex-auto">
              <Heading2>Product name</Heading2>
              <TextArea
                className="TextArea"
                type="text"
                value={item.name}
                action={(e) => action(e, idx)}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
export function Product({ data, action }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-2 flex-wrap justify-left items-start">
      {data &&
        data.map((item, idx) => (
          <div
            className=" flex flex-row-reverse gap-2 justify-center"
            key={`Product_${item.id}`}
          >
            <Img
              idx={idx}
              action={action}
              _id={`_id_${idx}_Product`}
              src={item.image}
              className="w-1/3 md:w-44 "
            />
            <div className="flex-auto">
              <Heading2>Product name</Heading2>
              <TextArea
                className="TextArea"
                type="text"
                value={item.name}
                action={(e) => action(e, idx)}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
export function Project({ data, action }) {
  return (
    <div className="grid grid-cols-1 gap-2 mt-2  justify-left items-start">
      {data &&
        data.map((item, idx) => (
          <div
            className="flex flex-row-reverse gap-2 items-center"
            key={`Projects_${item.id}`}
          >
            <Img
              idx={idx}
              action={action}
              _id={`_id_${idx}_Project`}
              src={item.image}
              className="w-1/3 md:w-44 "
            />
            <div className="flex-auto">
              <Heading2>project name</Heading2>
              <TextArea
                value={item.name}
                className="w-full py-2 px-4 outline-none bg-slate-100 rounded-sm text-sm"
                action={(e) => action(e, idx, "name")}
              />
              <Heading2>project description</Heading2>
              <TextArea
                value={item.description}
                className="w-full py-2 px-4 outline-none bg-slate-100 rounded-sm text-sm"
                action={(e) => action(e, idx, "description")}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
export function Awards({ data, action }) {
  return (
    <div className="grid grid-cols-1 gap-2 mt-2 flex-wrap justify-left items-start">
      {data &&
        data.map((item, idx) => (
          <div
            className="flex flex-row-reverse items-center "
            key={`Awards_${item.id}`}
          >
            <Img
              idx={idx}
              action={action}
              _id={`_id_${idx}_Awards`}
              src={item.logo}
              className="w-52 h-32 "
            />
            <div className="bg-slate-100 flex-auto">
              <Heading2>Award name</Heading2>
              <TextArea
                value={item.name}
                className="w-full py-2 px-4 border-b-2 border-gray-300 outline-none bg-slate-100 rounded-sm text-sm"
                action={(e) => action(e, idx, "name")}
              />
              <Heading2>Award description</Heading2>
              <TextArea
                value={item.description}
                className="w-full py-2 px-4 outline-none bg-slate-100 rounded-sm text-sm"
                action={(e) => action(e, idx, "description")}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export function Faq({ data, action }) {
  return (
    <div className="flex gap-2 flex-col mt-2">
      {data &&
        data.map((item, idx) => (
          <div key={`FAQ_${item.id}`}>
            <Heading2>question</Heading2>
            <TextArea
              value={item.question}
              className="w-full py-2 px-4 outline-none bg-slate-100 rounded-sm text-sm"
              action={(e) => action(e, idx, "question")}
            />
            <Heading2>answer</Heading2>
            <TextArea
              value={item.answer}
              className="w-full py-2 px-4 outline-none bg-slate-100 rounded-sm text-sm"
              action={(e) => action(e, idx, "answer")}
            />
          </div>
        ))}
    </div>
  );
}
export function Contact({ data, action }) {
  return (
    <div className="flex gap-2 flex-col mt-2">
      {data &&
        data.map((item, idx) => (
          <div key={`contact_${item.id}`}>
            <Heading2>contact name</Heading2>

            <TextArea
              value={item.type}
              className="w-full py-2 px-4 outline-none bg-slate-100 rounded-sm text-sm"
              action={(e) => action(e, idx, "type")}
            />
            <Heading2>contact value</Heading2>
            <TextArea
              value={item.value}
              className="w-full py-2 px-4 outline-none bg-slate-100 rounded-sm text-sm"
              action={(e) => action(e, idx, "value")}
            />
          </div>
        ))}
    </div>
  );
}
