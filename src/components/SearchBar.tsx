import { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value); 
  };

  return (
    <div className="w-full max-w-full mx-auto my-4">
      <Input
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Qidiruv"
        prefix={<SearchOutlined />}
        className="h-10 rounded-lg"
      />
    </div>
  );
};

export default SearchBar;
