import express from 'express';
import { celebrate } from 'celebrate';
import * as authController from './controller';
import * as authValidation from './validation';

const router = express.Router();

/**
 * @swagger
 *
 *responses:
 *  Error:
 *    description: Bad request
 *    schema:
 *      $ref: '#/definitions/Error'
 *  Unauthorized:
 *    description: Unauthorized
 *    schema:
 *      $ref: '#/definitions/Error'
 *  NotFound:
 *    description: The specified resource was not found
 *    schema:
 *      $ref: '#/definitions/Error'
 *
 * parameters:
 *    pageParam:
 *      in: query
 *      name: page
 *      type: integer
 *      minimum: 1
 *      default: 1
 *    limitParam:
 *      in: query
 *      name: limit
 *      type: integer
 *      minimum: 1
 *      maximum: 100
 *      default: 25
 *      description: The numbers of items to return.
 *
 * definitions:
 *  Error:
 *    type: object
 *    required:
 *      - code
 *      - message
 *    properties:
 *      code:
 *        type: string
 *      message:
 *        type: string
 *  NewUser:
 *    type: object
 *    required:
 *      - email
 *      - password
 *      - confirmPassword
 *    properties:
 *      fullname:
 *        type: string
 *      email:
 *        type: string
 *        format: email
 *      password:
 *        type: string
 *        format: password
 *      confirmPassword:
 *        type: string
 *        format: password
 *  User:
 *    type: object
 *    required: true
 *      - name
 *      - email
 *    properties:
 *      fullname:
 *        type: string
 *      email:
 *        type: string
 *        format: email
 *  ArrayOfUsers:
 *      type: array
 *      items:
 *        $ref: '#/definitions/User'
 *
 *  Login:
 *    type: object
 *    properties:
 *      token:
 *        type: string
 *      user:
 *        $ref: '#/definitions/User'
 */

/**
 * @swagger
 *
 * /auth/signup:
 *   post:
 *     tags: [auth]
 *     description: Creates a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         description: User object
 *         in:  body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/NewUser'
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/User'
 *       400:
 *         $ref: '#/responses/Error'
 */
router.post(
    '/signup',
    celebrate({
        body: authValidation.signupValidationSchema,
    }),
    authController.signup
);

/**
 * @swagger
 *
 * /auth/login:
 *   post:
 *     tags: [auth]
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         description: login infor
 *         required: true
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.post(
    '/login',
    celebrate({ body: authValidation.loginValidationSchema }),
    authController.login
);
export default router;
