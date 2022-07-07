import DropDownMenu from "./DropDownMenu";
import userApi from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function ControleBar({
  page,
  lang,
  onSelectPage,
  onSelectLang,
}) {
  const pages = ["about", "products", "services", "platform", "contact"];
  const language = ["fr", "en"];
  let navigate = useNavigate();
  const { setIsAdmin, setUser, setIsLoggedin } = useContext(UserContext);

  const onLogout = async (e) => {
    e.preventDefault();
    try {
      const { status } = await userApi.logout();
      if (status === 200) {
        navigate("/login");
        setUser(null);
        setIsLoggedin(false);
        setIsAdmin(false);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="flex justify-between items-center bg-gray-100 rounded-md p-4 mx-auto my-4">
      <DropDownMenu
        values={pages}
        defaultValue={page}
        onSelect={onSelectPage}
        width="120px"
      />
      <div className="flex items-center gap-2">
        <DropDownMenu
          values={language}
          defaultValue={lang}
          onSelect={onSelectLang}
          width="80px"
        />
        <span
          className="text-lg bg-slate-50 rounded-md text-gray-700  p-2 cursor-pointer "
          onClick={(e) => onLogout(e)}
        >
          <MdLogout />
        </span>
      </div>
    </div>
  );
}
