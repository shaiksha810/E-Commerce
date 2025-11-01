import { useSelector } from "react-redux";
import Render from "../UI/Render";

const Fashion = () => {
  // Redux store se products fetch karo (no API call)
  const { items: products = [] } = useSelector((state) => state.products);

  // Category filter
  const fashion = products.filter((p) => p.category === "Fashion");

  return (
    <div>
      <div className="grid grid-cols-3 gap-6 mt-4">
        {fashion.map((product) => (
         <Render product={product}/>
        ))}
      </div>
    </div>
  );
};

export default Fashion;
