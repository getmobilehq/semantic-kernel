import { Input } from "antd";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";

export default function CrmSearch({ paginatedThunk }) {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const onSearchChange = (e) => {
    setInputValue(e.target.value);
  };
  const onSearch = () => {
    if (inputValue !== "") {
      dispatch(paginatedThunk({ query: "search", key: inputValue }));
    }
  };
  return (
    <Input.Search
      className='md:w-[350px] w-[220px]'
      placeholder='Search'
      onChange={onSearchChange}
      onSearch={onSearch}
      enterButton={
        <button
          className='w-[35px] h-[35px] bg-blue-500 text-white rounded-r'
          onChange={onSearch}
        >
          <BiSearch className='w-full' />
        </button>
      }
    />
  );
}
