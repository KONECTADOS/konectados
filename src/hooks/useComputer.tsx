import { useContext } from "react"
import { ComputerContext } from "../contexts/ComputerContext"

export const useComputer = () => {
  const context = useContext(ComputerContext);
  return context
}