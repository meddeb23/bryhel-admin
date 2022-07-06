import React, { useContext, useEffect, useState } from "react";
import { Store } from "../ContextProvider";
import { Awards, Contact, Faq, Location, Product, Project } from "../Elements";
import TextArea from "../SectionEdit";

export default function SectionDisplay({ section, handleChange }) {
  const [data, setData] = useState(section);
  const { setnewImages } = useContext(Store);

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

  const handleLocationChange = (e, idx, field) => {
    const newValues = [...data.location];
    if (field === "file") {
      setnewImages((oldValue) => [
        ...oldValue,
        {
          image: e.target.files[0],
          slug: newValues[idx].slug,
          type: "location",
        },
      ]);
      newValues[idx].logo = URL.createObjectURL(e.target.files[0]);
    } else {
      newValues[idx].name = e.target.value;
    }
    setData((oldValue) => {
      oldValue.location = newValues;
      return oldValue;
    });

    handleChange({ ...data, location: newValues });
  };
  const handleProductChange = (e, idx, field) => {
    const newValues = [...data.products];
    if (field === "file") {
      setnewImages((oldValue) => [
        ...oldValue,
        {
          image: e.target.files[0],
          slug: newValues[idx].slug,
          type: "product",
        },
      ]);
      newValues[idx].image = URL.createObjectURL(e.target.files[0]);
    } else {
      newValues[idx].name = e.target.value;
    }
    setData((oldValue) => {
      oldValue.products = newValues;
      return oldValue;
    });

    handleChange({ ...data, products: newValues });
  };
  const handleFAQChange = (e, idx, field) => {
    const newValues = [...data.FAQ];
    newValues[idx][field] = e.target.value;
    setData((oldValue) => {
      oldValue.FAQ = newValues;
      return oldValue;
    });

    handleChange({ ...data, FAQ: newValues });
  };
  const handleContactChange = (e, idx, field) => {
    const newValues = [...data.contact];
    newValues[idx][field] = e.target.value;
    setData((oldValue) => {
      oldValue.contact = newValues;
      return oldValue;
    });

    handleChange({ ...data, contact: newValues });
  };
  const handleProjectsChange = (e, idx, field) => {
    const newValues = [...data.projects];
    if (field === "file") {
      setnewImages((oldValue) => [
        ...oldValue,
        {
          image: e.target.files[0],
          slug: newValues[idx].slug,
          type: "project",
        },
      ]);
      newValues[idx].image = URL.createObjectURL(e.target.files[0]);
    } else {
      newValues[idx][field] = e.target.value;
    }
    setData((oldValue) => {
      oldValue.projects = newValues;
      return oldValue;
    });

    handleChange({ ...data, projects: newValues });
  };
  const handleAwardsChange = (e, idx, field) => {
    const newValues = [...data.awards];
    if (field === "file") {
      setnewImages((oldValue) => [
        ...oldValue,
        { image: e.target.files[0], slug: newValues[idx].slug, type: "award" },
      ]);
      newValues[idx].logo = URL.createObjectURL(e.target.files[0]);
    } else {
      newValues[idx][field] = e.target.value;
    }
    setData((oldValue) => {
      oldValue.awards = newValues;
      return oldValue;
    });

    handleChange({ ...data, awards: newValues });
  };

  return (
    <div className="my-4 ">
      {data.title !== null && data.title !== undefined && (
        <FieldEdit>
          <Heading>title</Heading>
          <TextArea
            value={data.title}
            action={(e) => updateSetion({ title: e.target.value })}
            className="TextArea "
            text="section Title"
          />
        </FieldEdit>
      )}
      {data.subtitle !== null && data.subtitle !== undefined && (
        <FieldEdit>
          <Heading>subtitle</Heading>
          <TextArea
            value={data.subtitle}
            text="section subtitle"
            action={(e) => updateSetion({ subtitle: e.target.value })}
            className="TextArea"
          />
        </FieldEdit>
      )}
      {data.content &&
        data.content.map((item, idx) => (
          <FieldEdit key={`${idx}_setion_content`}>
            {item.title !== null && item.title !== undefined && (
              <>
                <Heading>Paragraph title</Heading>
                <TextArea
                  value={item.title}
                  text="section subtitle"
                  action={(e) => updateContentTitle(e.target.value, idx)}
                  className="TextArea"
                />
              </>
            )}
            {item.paragraph.length && (
              <FieldEdit>
                <Heading>Paragraphs ({item.paragraph.length})</Heading>
                <div className={item.paragraph.length > 1 ? "mb-2" : ""}></div>
                {item.paragraph.map((p, i) => (
                  <TextArea
                    value={p}
                    key={`${i}_setion_content_`}
                    className="TextArea "
                    action={(e) =>
                      updateParagaphContent(i, e.target.value, idx)
                    }
                  />
                ))}
              </FieldEdit>
            )}
          </FieldEdit>
        ))}
      {data.type === "location" && (
        <FieldEdit>
          <Heading>locations</Heading>
          <Location data={data.location} action={handleLocationChange} />
        </FieldEdit>
      )}
      {data.type === "product" && (
        <FieldEdit>
          <Heading>products</Heading>
          <Product data={data.products} action={handleProductChange} />
        </FieldEdit>
      )}
      {data.type === "project" && (
        <FieldEdit>
          <Heading>projects</Heading>
          <Project data={data.projects} action={handleProjectsChange} />
        </FieldEdit>
      )}
      {data.type === "awards" && (
        <FieldEdit>
          <Heading>awards</Heading>
          <Awards data={data.awards} action={handleAwardsChange} />
        </FieldEdit>
      )}
      {data.type === "FAQ" && (
        <FieldEdit>
          <Heading>FAQ</Heading>
          <Faq data={data.FAQ} action={handleFAQChange} />
        </FieldEdit>
      )}
      {data.type === "contact" && (
        <FieldEdit>
          <Heading>contact</Heading>
          <Contact data={data.contact} action={handleContactChange} />
        </FieldEdit>
      )}
    </div>
  );
}

function Heading({ children }) {
  return (
    <div
      style={{ borderRadius: "4px 4px 0 0" }}
      className="TextArea capitalize text-slate-900 px-4 py-2 text-xl font-semibold border-b-2 border-gray-300"
    >
      {children}{" "}
      <span className="text-sm text-blue-700 uppercase">(Rquired)</span>
    </div>
  );
}
function FieldEdit({ children }) {
  return <div className="my-2">{children}</div>;
}
