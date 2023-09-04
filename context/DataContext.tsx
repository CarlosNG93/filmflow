import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from "react";
  import { DataState, DataContextType } from "../types/types";
  
  const initialContext: DataContextType = {
    data: {
      peliculas: [],
      reparto: [],
      categorias: [],
      directores: [],
    },
    fetchData: () => {},
    deleteData: () => {},
    updateData: () => {},
  };
  
  
  const DataContext = createContext<DataContextType>(initialContext);
  
  export const useData = (): DataContextType => {
    const context = useContext(DataContext);
    if (!context) {
      throw new Error("useData debe ser usado dentro del DataProvider");
    }
    return context;
  };
  
  type DataProviderProps = {
    children: ReactNode;
  };
  
  export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [data, setData] = useState<DataState>({
      peliculas: [],
      reparto: [],
      categorias: [],
      directores: [],
    });
  
    const fetchData = async (endpoint: string, key: keyof DataState) => {
      const response = await fetch(`/api/${endpoint}`);
      const result = await response.json();
      setData((prev) => ({ ...prev, [key]: result }));
    };
  
    const deleteData = async (
      endpoint: string,
      id: number,
      key: keyof DataState
    ) => {
      await fetch(`/api/${endpoint}/${id}`, {
        method: "DELETE",
      });
      setData((prev) => ({
        ...prev,
        [key]: (prev[key] as any[]).filter((item: any) => item.id !== id),
      }));
    };
  
    const updateData = async (
      endpoint: string,
      updatedData: any,
      key: keyof DataState
    ) => {
      const response = await fetch(`/api/${endpoint}/${updatedData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const result = await response.json();
      setData((prev) => {
        const updatedItems = prev[key].map((item) =>
          (item as any).id === updatedData.id ? result : item
        );
        return { ...prev, [key]: updatedItems };
      });
    };
  
    useEffect(() => {
      fetchData("peliculas", "peliculas");
      fetchData("reparto", "reparto");
      fetchData("categorias", "categorias");
      fetchData("directores", "directores");
    }, []);
  
    return (
      <DataContext.Provider value={{ data, fetchData, deleteData, updateData }}>
          {children}
      </DataContext.Provider>
    );
  };