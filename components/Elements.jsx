import React from "react";
import TextArea from "./SectionEdit";

export function Location({ data, action }) {
  return (
    <div className="flex gap-2 flex-wrap justify-left items-start">
      {data &&
        data.map((item, idx) => (
          <div className="w-52" key={`location_${item.id}`}>
            <img src={item.logo} className="h-20 object-contain" />
            <input
              className="outline-none bg-slate-100 rounded m-1 p-2 "
              type="text"
              value={item.name}
              onChange={(e) => action(e, idx)}
            />
          </div>
        ))}
    </div>
  );
}
export function Product({ data, action }) {
  return (
    <div className="flex gap-2 flex-wrap justify-left items-start">
      {data &&
        data.map((item, idx) => (
          <div className="w-52" key={`Product_${item.id}`}>
            <img src={item.image} className="h-20 object-contain" />
            <input
              className="outline-none bg-slate-100 rounded m-1 p-2 "
              type="text"
              value={item.name}
              onChange={(e) => action(e, idx)}
            />
          </div>
        ))}
    </div>
  );
}
export function Project({ data, action }) {
  return (
    <div className="flex gap-2 flex-wrap justify-left items-start">
      {data &&
        data.map((item, idx) => (
          <div className="w-52" key={`Projects_${item.id}`}>
            <img src={item.image} className="h-20 object-contain" />
            <TextArea
              value={item.name}
              className="w-full py-2 px-4 outline-none bg-slate-100 rounded-sm text-sm"
              action={(e) => action(e, idx, "name")}
            />
            <TextArea
              value={item.description}
              className="w-full py-2 px-4 outline-none bg-slate-100 rounded-sm text-sm"
              action={(e) => action(e, idx, "description")}
            />
          </div>
        ))}
    </div>
  );
}
export function Awards({ data, action }) {
  return (
    <div className="flex gap-2 flex-wrap justify-left items-start">
      {data &&
        data.map((item, idx) => (
          <div className="w-52" key={`Awards_${item.id}`}>
            <img src={item.logo} className="h-20 object-contain" />
            <TextArea
              value={item.name}
              className="w-full py-2 px-4 outline-none bg-slate-100 rounded-sm text-sm"
              action={(e) => action(e, idx, "name")}
            />
            <TextArea
              value={item.description}
              className="w-full py-2 px-4 outline-none bg-slate-100 rounded-sm text-sm"
              action={(e) => action(e, idx, "description")}
            />
          </div>
        ))}
    </div>
  );
}

export function Faq({ data, action }) {
  return (
    <div className="flex gap-2 flex-col">
      {data &&
        data.map((item, idx) => (
          <div key={`FAQ_${item.id}`}>
            <TextArea
              value={item.question}
              className="w-full py-2 px-4 outline-none bg-slate-100 rounded-sm text-sm"
              action={(e) => action(e, idx, "question")}
            />
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
    <div className="flex gap-2 flex-col">
      {data &&
        data.map((item, idx) => (
          <div key={`contact_${item.id}`}>
            <TextArea
              value={item.type}
              className="w-full py-2 px-4 outline-none bg-slate-100 rounded-sm text-sm"
              action={(e) => action(e, idx, "type")}
            />
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
