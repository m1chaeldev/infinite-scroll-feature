import { useState } from "react";
import useProducts from "./hooks/useProducts";
import InfiniteScroll from "react-infinite-scroll-component";
import { debounce } from "./utils/Helpers";

function App() {
  const [page, setPage] = useState<number>(1);
  const [searchProduct, setSearchProduct] = useState<string>("");
  const { products, totalProducts } = useProducts(page, searchProduct);

  const fetchNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const onChangeInput = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchProduct(value);
    setPage(1);
  });

  return (
    <div style={{ padding: 24 }}>
      Search: <input onChange={onChangeInput} />
      <br />
      <br />
      <b>List products</b>
      <InfiniteScroll
        height={300}
        style={{ width: 500 }}
        dataLength={products.length}
        next={fetchNextPage}
        hasMore={products.length < totalProducts}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>All items has been loaded!</b>
          </p>
        }
      >
        {products.map((i) => (
          <div key={i.id} className="product-item">
            <img src={i.images[0]} alt={i.title} />
            <div>
              <span>
                <b>{i.title}</b>
              </span>
              <br />
              <span>{i.price}$</span>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default App;
