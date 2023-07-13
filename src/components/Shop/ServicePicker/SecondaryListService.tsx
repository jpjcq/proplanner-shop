import { Service } from "../../../types/services";
import Box from "../../utils/Box";
import SecondaryItem from "./SecondaryItemService";

export default function SecondaryList({
  service,
}: {
  service: Service;
}) {
  return (
    <Box direction="column" margin="0 0 2rem 0">
      {service.secondaryServices.map((item, index, array) => (
        <SecondaryItem
          key={item._id}
          service={item}
          isLastItem={index === array.length - 1}
        />
      ))}
    </Box>
  );
}
