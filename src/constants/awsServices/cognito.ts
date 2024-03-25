export const DEFAULT_COGNITO_CONFIG = {
	REGION: "us-east-1",
	USER_POOL_ID: "us-east-1_A1b2C3d4E",
	CLIENT_ID: "a1b2c3d4e5f6g7h8i9j0k1l2m3",
	SCOPE: "aws.cognito.signin.user.admin"
};

export const ID_TOKEN_SORTED_KEYS = [
	"sub",
	"cognito:groups",
	"email_verified",
	"cognito:preferred_role",
	"iss",
	"cognito:username",
	"origin_jti",
	"cognito:roles",
	"aud",
	"event_id",
	"token_use",
	"auth_time",
	"exp",
	"iat",
	"jti",
	"email"
];

export const ACCESS_TOKEN_SORTED_KEYS = [
	"sub",
	"cognito:groups",
	"iss",
	"client_id",
	"origin_jti",
	"event_id",
	"token_use",
	"scope",
	"auth_time",
	"exp",
	"iat",
	"jti",
	"username"
];
