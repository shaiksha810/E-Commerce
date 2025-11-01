import { useSelector } from "react-redux";
import Render from "../UI/Render";

const Furniture = () => {
  // Redux store se products fetch karo (no API call)
  const { items: products = [] } = useSelector((state) => state.products);

  // Category filter
  const furnitures = products.filter((p) => p.category === "Furniture");

  return (
    <div>
      <div className="grid grid-cols-3 gap-6 mt-4">
        {furnitures.map((product) => (
         <Render product={product}/>
        ))}
      </div>
    </div>
  );
};

export default Furniture;
