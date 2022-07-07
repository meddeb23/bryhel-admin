import DropDownMenu from "./DropDownMenu";

export default function ControleBar({
  page,
  lang,
  onSelectPage,
  onSelectLang,
}) {
  const pages = ["about", "products", "services", "platform", "contact"];
  const language = ["fr", "en"];
  return (
    <div className="flex justify-between items-center bg-gray-100 rounded-md p-4 mx-auto my-4">
      <DropDownMenu
        values={pages}
        defaultValue={page}
        onSelect={onSelectPage}
        width="120px"
      />
      <DropDownMenu
        values={language}
        defaultValue={lang}
        onSelect={onSelectLang}
        width="80px"
      />
    </div>
  );
}
