import { useState } from "react";
import { useAppDispatch } from "@store/hooks";
import { fetchPlaylists } from "@store/slices/playlistsSlice";

interface IUseControlPanelResult {
	searchValue: string;
	sortByAlphabet: boolean;
	onSearch: (searchValue: string) => void;
	onSort: () => void;
	onUpdate: () => void;
}

const useControlPanel = (
	fetchItems: typeof fetchPlaylists
): IUseControlPanelResult => {
	const [searchValue, setSearchValue] = useState<string>("");
	const [sortByAlphabet, setSortByAlphabet] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const onSearch = (searchValue: string) => {
		setSearchValue(searchValue.toLowerCase());
	};
	const onSort = () => setSortByAlphabet((prevState) => !prevState);
	const onUpdate = () => dispatch(fetchItems());
	return { searchValue, sortByAlphabet, onSearch, onSort, onUpdate };
};

export default useControlPanel;
