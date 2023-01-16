import { FC, useEffect } from "react";
import UserPhotoPlug from "@assets/images/user-photo-plug.png";
import { IUser } from "@interfaces/user.interface";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchUser, updateUser } from "@store/slices/userSlice";
import { Button, Form, Input, Spin } from "antd";
import styles from "./UserProfile.module.scss";

const UserProfile: FC = () => {
	const { TextArea } = Input;
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user.user);
	const status = useAppSelector((state) => state.user.status);

	const [form] = Form.useForm();

	const onFill = () => {
		form.setFieldsValue({
			email: user?.email,
			name: user?.first_name,
			surname: user?.last_name,
			bio: user?.bio,
		});
	};

	const onFinish = (fields: {
		email: string;
		name: string;
		surname: string;
		bio: string;
	}) => {
		dispatch(
			updateUser({
				email: fields.email,
				first_name: fields.name,
				last_name: fields.surname,
				bio: fields.bio,
				photo: user?.photo || "",
			})
		);
	};

	useEffect(() => {
		dispatch(fetchUser());
		onFill();
	}, []);

	const content = (
		<>
			<div className={styles.header}>
				<img
					src={user?.photo ? user.photo : UserPhotoPlug}
					alt="Фотография"
					className={styles.photo}
					height="250"
					width="250"
				/>
				<div className={styles.block}>
					<h1 className={styles.title}>Профиль</h1>
					<p className={styles.text}>
						{user?.first_name} {user?.last_name}
					</p>
				</div>
			</div>
			<div className={styles.body}>
				<p className={styles.text}>
					{user?.bio ? user.bio : "Нет заполненной биографии"}
				</p>
			</div>
			<h2 className={styles.formHeading}>Редактировать Профиль</h2>
			<Form
				name="control-ref"
				labelCol={{ span: 3 }}
				wrapperCol={{ span: 16 }}
				style={{ marginTop: "20px" }}
				form={form}
				onFinish={onFinish}
			>
				<Form.Item name="email" label="Почта">
					<Input value={user?.first_name} />
				</Form.Item>
				<Form.Item name="name" label="Имя">
					<Input value={user?.first_name} />
				</Form.Item>
				<Form.Item name="surname" label="Фамилия">
					<Input value={user?.last_name} />
				</Form.Item>
				<Form.Item name="bio" label="Биография">
					<TextArea rows={4} value={user?.bio} />
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 3, span: 16 }}>
					<Button type="primary" htmlType="submit">
						Отправить
					</Button>
					<Button type="link" htmlType="button" onClick={onFill}>
						Отменить изменения
					</Button>
				</Form.Item>
			</Form>
		</>
	);

	return (
		<div className={styles.container}>
			{status === "loading" ? (
				<Spin
					tip="Loading"
					size="large"
					style={{
						margin: "0px auto",
						display: "block",
						marginTop: "20px",
					}}
				/>
			) : null}
			{status === "succeeded" ? content : null}
		</div>
	);
};

export default UserProfile;
