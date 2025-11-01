import { useSelector } from "react-redux";
import Render from "../UI/Render";

const HomeKitchen = () => {
  // Redux store se products fetch karo (no API call)
  const { items: products = [] } = useSelector((state) => state.products);

  // Category filter
  const homekitchen = products.filter((p) => p.category === "Home & Kitchen");

  return (
    <div>
      <div className="grid grid-cols-3 gap-6 mt-4">
        {homekitchen.map((product) => (
         <Render product={product}/>
        ))}
      </div>
    </div>
  );
};

export default HomeKitchen;
