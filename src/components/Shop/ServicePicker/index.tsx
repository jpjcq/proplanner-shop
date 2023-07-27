import SelectionScreen from "../SelectionScreen";
import MainList from "./MainListService";

export default function ServicePicker() {
  return (
    <>
      <SelectionScreen activePicker="service" />
      <MainList />
    </>
  );
}
