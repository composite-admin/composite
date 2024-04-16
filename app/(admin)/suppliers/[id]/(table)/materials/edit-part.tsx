import { useModal } from "@/utils/modalContext";
import { HiPencilAlt } from "react-icons/hi";
import EditMaterialModal from "../../(modal)/materials/edit-material";
import { Row } from "@tanstack/react-table";
import { Material } from "@/store/actions/materials-and-tools/types";

type Props = Row<Material>;

const EditPartMaterial: React.FC<Props> = (props) => {
  const { showModal } = useModal();

  const showEditMaterialModal = () => showModal(<EditMaterialModal {...props} />);

  return (
    <div className="" onClick={showEditMaterialModal}>
      <span className="font-semibold cursor-pointer hover:underline text-primaryLight-500 flex items-center">
        <HiPencilAlt className="text-xl" /> <span>Edit</span>
      </span>
    </div>
  );
};

export default EditPartMaterial;
