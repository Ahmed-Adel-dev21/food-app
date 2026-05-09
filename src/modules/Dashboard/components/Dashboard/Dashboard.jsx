import { useContext } from "react";
import chief from "../../../../assets/images/eating vegan food-rafiki.png";
import { AuthContext } from "../../../../Context/AuthContext";
import Header from "../../../Shared/components/Header/Header";
import LightHeader from "../../../Shared/components/LightHeader/LightHeader";

export default function Dashboard() {
  const { loginData } = useContext(AuthContext);

  return (
    <>
      <Header
        title={"Welcome"}
        description={`This is a welcoming screen for the entry of the application , you can now see the options`}
        imgUrl={chief}
        Data={loginData?.userName}
      />

      <div className="my-3">
        <LightHeader Fill={"Add "} />
      </div>
    </>
  );
}
