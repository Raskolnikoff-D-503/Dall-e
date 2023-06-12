import { ChangeEvent, useEffect, useState } from "react";
import { Card, FormField, Loader, PageTitle } from "../components";

type Post = {
  _id: string;
  name: string;
  prompt: string;
  photo: string;
};

type Props = {
  data: Post[] | null;
  title: string;
};

const RenderCards = ({ data, title }: Props) => {
  if (data?.length) {
    return (
      <>
        {data.map((post) => (
          <Card key={post._id} {...post} />
        ))}
      </>
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const [allPosts, setAllPosts] = useState<Post[] | null>(null);
  const [searchedResults, setSearchedResults] = useState<Post[] | null>([]);
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();

          setAllPosts(result.data.reverse());
        }
      } catch (err) {
        alert(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults =
          allPosts?.filter(
            (item) =>
              item.name.toLowerCase().includes(searchText.toLowerCase()) ||
              item.prompt.toLowerCase().includes(searchText.toLowerCase())
          ) ?? null;

        setSearchedResults(searchResults);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <PageTitle
        title="The Community Showcase"
        subtitle="Browse through a collection of imaginative and visually stunning
        images generated by DALL-E AI"
      />

      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search posts"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                {"Showing result for "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No search results found"
                />
              ) : (
                <RenderCards data={allPosts} title="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
