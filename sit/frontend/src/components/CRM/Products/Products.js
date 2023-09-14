import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import CreateProduct from "./CreateProduct";
import TableComponent from "./Table";

const Products = () => {
  // Drawer state
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className='container'>
      <div className='py-4 flex justify-center md:justify-end'>
        <button
          onClick={() => setOpen(true)}
          className='py-2 px-3 border bg-teal-700 hover:bg-teal-500 text-white rounded cursor-pointer flex items-center gap-2'
        >
          <AiOutlinePlus /> Create Product
        </button>
      </div>
      <TableComponent />
      <CreateProduct onClose={onClose} open={open} />
    </div>
  );
};
export default Products;
