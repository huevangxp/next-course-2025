import Banner from "../components/Home/Banner";
import ProductType from "../components/Home/ProductType";
import Product from "../components/Home/product";

const Homepage = () => {
  return (
    <div className="">
      <Banner />
      <ProductType />
      <Product />
      {/* <Footer /> */}
    </div>
  );
};

export default Homepage