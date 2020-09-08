import { UserController } from './User/User';
import { ConverterController } from './Converter/Converter';
import AuthController from './authController';

const userController = new UserController();
const converterController = new ConverterController();

export {
    AuthController,
    userController,
    converterController,
}