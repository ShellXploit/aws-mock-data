import { User, Cognito } from "../../awsServices/cognito/cognito";
import { BaseJwtPayload } from "../../utils/getBaseJwtPayload";

interface GetAccessTokenProps {
	baseJwtPayload: BaseJwtPayload;
	userData: User & { uuid: string };
	cognitoData: Cognito;
}

export { GetAccessTokenProps };
