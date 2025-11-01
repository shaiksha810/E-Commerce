import { useSelector } from "react-redux";
import Render from "../UI/Render";

const Electronics = () => {
  // Redux store se products fetch karo (no API call)
  const { items: products = [] } = useSelector((state) => state.products);

  // Category filter
  const electronics = products.filter((p) => p.category === "electronics");

  return (
    <div>
      <div className="grid grid-cols-3 gap-6 mt-4">
        {electronics.map((product) => (
         <Render product={product}/>
        ))}
      </div>
    </div>
  );
};

export default Electronics;
