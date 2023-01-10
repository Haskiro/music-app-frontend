export interface IUser {
	email: string;
	first_name: string;
	last_name: string;
	photo: string;
	bio: string;
	is_active: boolean;
}

export interface IAccessToken {
	access: string;
}
