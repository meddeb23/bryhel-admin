import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Container, ControleBar, SectionDisplay } from "../components";
import { Store } from "../components/ContextProvider";

function HomePage() {
  const [page, setpage] = useState("about");
  const [lang, setlang] = useState("en");
  const [data, setData] = useState();
  const { setcontent, content } = useContext(Store);
  useEffect(() => {
    axios
      .get(`/api/v1/page`, { params: { title: page, language: lang } })
      .then(({ data }) => {
        setcontent(data);
        setData(data);
      });
  }, [page, lang]);

  const handleChange = (newData) => {
    const idx = data.findIndex((item) => item._id === newData._id);
    const newContent = [...data];
    newContent[idx] = newData;
    setcontent(newContent);
  };

  const handleSave = () => {
    axios
      .post(`/api/v1/page?title=${page}&language=${lang}`, { content })
      .then(({ data }) => console.log(data));
  };

  return (
    <Container>
      <ControleBar
        page={page}
        onSelectPage={setpage}
        lang={lang}
        onSelectLang={setlang}
      />
      <div className="bg-white rounded-md mt-2 p-4">
        {data &&
          data.map((section, idx) => (
            <SectionDisplay
              handleChange={handleChange}
              key={`section_${section.title}_${idx}`}
              section={section}
            />
          ))}
      </div>
      <button
        onClick={() => handleSave()}
        className="fixed right-8 bottom-8 block rounded-md py-2 px-4 bg-blue-800 text-white text-center cursor-pointer"
      >
        Save
      </button>
    </Container>
  );
}

export default HomePage;
