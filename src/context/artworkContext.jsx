import { data } from "../utils/dataArtWork/data";
import { smallFormat } from "../utils/dataArtWork/smallFormat";
import { useMemo, createContext, useContext } from "react";

export const ArtworkContext = createContext();

export const ArtworkProvider = ({ children }) => {
    const allArtWorks = useMemo(() => [...data, ...smallFormat], []);
    return (
        <ArtworkContext.Provider value={allArtWorks}>
            {children}
        </ArtworkContext.Provider>
    );
};
