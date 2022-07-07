import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Container, ControleBar, SectionDisplay } from "../components";
import { Store } from "../components/ContextProvider";

function HomePage() {
  const [success, setsuccess] = useState(false);
  const [page, setpage] = useState(localStorage.getItem("page") || "about");
  const [lang, setlang] = useState(localStorage.getItem("language") || "en");
  const [data, setData] = useState();
  const { setcontent, content, newImages } = useContext(Store);

  useEffect(() => {
    axios
      .get(`/api/v1/page`, { params: { title: page, language: lang } })
      .then(({ data }) => {
        setcontent(data);
        setData(data);
      });

    localStorage.setItem("page", page);
    localStorage.setItem("language", lang);
  }, [page, lang]);

  const handleChange = (newData) => {
    const idx = data.findIndex((item) => item._id === newData._id);
    const newContent = [...data];
    newContent[idx] = newData;
    setcontent(newContent);
  };

  const handleSave = async () => {
    if (newImages) {
      for (let i = 0; i < newImages.length; i++) {
        const element = newImages[i];
        const formData = new FormData();
        formData.append("image", element.image);
        formData.append("type", element.type);
        formData.append("slug", element.slug);
        const { data, status } = await axios.post(
          `/api/v1/page/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(data, status);
      }
    }
    axios
      .post(`/api/v1/page?title=${page}&language=${lang}`, { content })
      .then(({ data }) => {
        if (data.success) {
          setsuccess(true);
          setTimeout(() => setsuccess(false), 3000);
        }
      });
  };

  return (
    <Container>
      <ControleBar
        page={page}
        onSelectPage={setpage}
        lang={lang}
        onSelectLang={setlang}
      />
      <div className="rounded-md mt-2 p-4">
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
      {success && (
        <div className="fixed  w-1/2  bottom-5 ">
          <p className="p-4 bg-green-600 text-center text-white rounded-lg">
            document saved successfully
          </p>
        </div>
      )}
    </Container>
  );
}

export default HomePage;
