import { FC } from "react";
import { Input } from "antd";
import cn from "classnames";
import styles from "./ControlPanel.module.scss";
import { IControlPanelProps } from "./ControlPanel.props";

const ControlPanel: FC<IControlPanelProps> = ({
	onSearch,
	onSort,
	onUpdate,
	sortByAlphabet,
}) => {
	const { Search } = Input;
	return (
		<div className={styles.controlPanel}>
			<Search
				className={styles.controlInput}
				placeholder="Поиск по странице"
				allowClear
				enterButton="Поиск"
				size="large"
				onSearch={onSearch}
			/>
			<div className={styles.controlButtons}>
				<button
					className={cn(styles.controlButtonsItem, {
						[styles.controlButtonsItemChecked]: sortByAlphabet,
					})}
					onClick={onSort}
				>
					По Алфавиту
				</button>
				<button
					className={styles.controlButtonsItem}
					onClick={onUpdate}
				>
					Обновить
				</button>
			</div>
		</div>
	);
};

export default ControlPanel;
