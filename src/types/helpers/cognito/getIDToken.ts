import { User, Cognito } from "../../awsServices/cognito/cognito";
import { BaseJwtPayload } from "../../utils/getBaseJwtPayload";

interface GetIDTokenProps {
	baseJwtPayload: BaseJwtPayload;
	accessTokenHash: string;
	userData: User;
	cognitoData: Cognito;
}

export { GetIDTokenProps };
