type Props = {
  title: string;
};

const SearchTitle = ({ title }: Props) => {
  return (
    <h2 className="font-medium text-[#666e75] text-xl mb-3">
      {"Showing result for "}
      <span className="text-[#222328]">{title}</span>
    </h2>
  );
};

export default SearchTitle;
