import { useContext } from "react"
import { EditComponentContext } from "../contexts/EditComponentContext";

export const useComponent = () => {
  const context = useContext(EditComponentContext);
  return context
}