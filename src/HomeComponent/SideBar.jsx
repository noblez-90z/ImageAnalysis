import { Diamond } from "lucide-react";

const SideBar = () => {
  return (
    <div className="w-full md:w-[350px] h-svh border px-3">
      <h1 className="font-semibold text-xl py-3 capitalize">hello!</h1>
      <div className="px-6">
        <h2 className="font-bold text-xl">welcome to scopio scan gallery.</h2>
        <p className="font-meduim py-3 capitalize">
          here you can pan and zoom full-field images of diverse blood sample at
          100x resolution.
        </p>
      </div>
      <div className="overflow-y-auto  h-[300px]">
        <nav>
          <div className="list-none capitalize ">
            <li className="py-2 flex gap-2">
              <Diamond className="w-6 h-6" />
              plasma cell lukemia
            </li>
            <li className="py-2 flex gap-2">
              <Diamond className="w-6 h-6" />
              marginal zonw lymphoma
            </li>
            <li className="py-2 flex gap-2">
              <Diamond className="w-6 h-6" />
              myelodysplactic syndrome
            </li>
            <li className="py-2 flex gap-2">
              <Diamond className="w-6 h-6" />
              bone marrow aspirate
            </li>
            <li className="py-2 flex gap-2">
              <Diamond className="w-6 h-6" />
              autoimmue hemolytic anemia
            </li>
            <li className="py-2 flex gap-2">
              <Diamond className="w-6 h-6" />
              normal peripheral blood smear
            </li>
            <li className="py-2 flex gap-2">
              <Diamond className="w-6 h-6" />
              sickle cell anemia
            </li>
            <li className="py-2 flex gap-2">
              <Diamond className="w-6 h-6" />
              parasitic inclusions- malaria
            </li>
            <li className="py-2 flex gap-2">
              <Diamond className="w-6 h-6" />
              essential thrombocythemia
            </li>
            <li className="py-2 flex gap-2">
              <Diamond className="w-6 h-6" />
              sezary syndrome
            </li>
            <li className="py-2 flex gap-2">
              <Diamond className="w-6 h-6" />
              acute promyelocytic
            </li>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
