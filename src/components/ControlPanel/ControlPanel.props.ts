export interface IControlPanelProps {
	onSearch: (searchValue: string) => void;
	onSort: () => void;
	onUpdate: () => void;
	sortByAlphabet: boolean;
}
