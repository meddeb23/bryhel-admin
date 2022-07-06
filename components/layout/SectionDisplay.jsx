import React, { useEffect, useState } from "react";
import { Awards, Contact, Faq, Location, Product, Project } from "../Elements";
import TextArea from "../SectionEdit";

export default function SectionDisplay({ section, handleChange }) {
  const [data, setData] = useState(section);

  useEffect(() => {
    setData(section);
  }, [section]);

  const updateSetion = (value) => {
    const newData = { ...data, ...value };
    setData(newData);
    handleChange(newData);
  };

  const updateContentTitle = (value, paragraphidx) => {
    const newData = { ...data };
    newData.content[paragraphidx].title = value;
    setData(newData);
    handleChange(newData);
  };

  const updateParagaphContent = (idx, value, paragraphidx) => {
    const newData = { ...data };
    newData.content[paragraphidx].paragraph[idx] = value;
    setData(newData);
    handleChange(newData);
  };

  const handleLocationChange = (e, idx) => {
    const newValues = [...data.location];
    newValues[idx].name = e.target.value;
    setData((oldValue) => {
      oldValue.location = newValues;
      return oldValue;
    });
    handleChange(newValues);
  };
  const handleProductChange = (e, idx) => {
    const newValues = [...data.location];
    newValues[idx].name = e.target.value;
    setData((oldValue) => {
      oldValue.location = newValues;
      return oldValue;
    });
    handleChange(newValues);
  };
  const handleFAQChange = (e, idx, field) => {
    const newValues = [...data.FAQ];
    newValues[idx][field] = e.target.value;
    setData((oldValue) => {
      oldValue.FAQ = newValues;
      return oldValue;
    });
    handleChange(newValues);
  };
  const handleContactChange = (e, idx, field) => {
    const newValues = [...data.contact];
    newValues[idx][field] = e.target.value;
    setData((oldValue) => {
      oldValue.contact = newValues;
      return oldValue;
    });
    handleChange(newValues);
  };
  const handleProjectsChange = (e, idx, field) => {
    const newValues = [...data.projects];
    newValues[idx][field] = e.target.value;
    setData((oldValue) => {
      oldValue.projects = newValues;
      return oldValue;
    });
    handleChange(newValues);
  };
  const handleAwardsChange = (e, idx, field) => {
    const newValues = [...data.awards];
    newValues[idx][field] = e.target.value;
    setData((oldValue) => {
      oldValue.awards = newValues;
      return oldValue;
    });
    handleChange(newValues);
  };

  return (
    <div className=" rounded-md my-1">
      <TextArea
        value={data.title}
        action={(e) => updateSetion({ title: e.target.value })}
        className="w-full py-2 px-4 outline-none bg-slate-100 rounded-sm text-2xl font-semibold"
        text="section Title"
      />
      <TextArea
        value={data.subtitle}
        text="section subtitle"
        action={(e) => updateSetion({ subtitle: e.target.value })}
        className="w-full py-2 px-4 outline-none bg-slate-100 rounded-sm text-lg font-semibold"
      />
      {data.content &&
        data.content.map((item, idx) => (
          <div key={`${idx}_setion_content`}>
            <TextArea
              value={item.title}
              text="section subtitle"
              action={(e) => updateContentTitle(e.target.value, idx)}
              className="w-full py-2 px-4 outline-none bg-slate-100 rounded-sm text-base font-semibold"
            />
            {item.paragraph &&
              item.paragraph.map((p, i) => (
                <TextArea
                  value={p}
                  key={`${i}_setion_content_`}
                  className="w-full py-2 px-4 outline-none bg-slate-100 rounded-sm text-sm"
                  action={(e) => updateParagaphContent(i, e.target.value, idx)}
                />
              ))}
          </div>
        ))}
      {data.type === "location" && (
        <Location data={data.location} action={handleLocationChange} />
      )}
      {data.type === "product" && (
        <Product data={data.products} action={handleProductChange} />
      )}
      {data.type === "project" && (
        <Project data={data.projects} action={handleProjectsChange} />
      )}
      {data.type === "awards" && (
        <Awards data={data.awards} action={handleAwardsChange} />
      )}
      {data.type === "FAQ" && <Faq data={data.FAQ} action={handleFAQChange} />}
      {data.type === "contact" && (
        <Contact data={data.contact} action={handleContactChange} />
      )}
    </div>
  );
}
