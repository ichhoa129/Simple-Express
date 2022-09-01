import { Joi } from 'celebrate';
import { schemas } from '../../helpers';

const { paginateValidationSchema } = schemas;

export const paginateUserValidateSchema = paginateValidationSchema.keys({
    email: Joi.string().optional(),
});

export const changePasswordSchema = Joi.object({
    currentPassword: Joi.string().min(4).max(255).default(' ')
        .optional(),
    newPassword: Joi.string().required().invalid(Joi.ref('password')),
    confirmNewPassword: Joi.string().required().valid(Joi.ref('newPassword')),
});

export const updateMeSchema = Joi.object({
    role: Joi.any().forbidden(),
    type: Joi.any().forbidden(),
    email: Joi.any().forbidden(),
    customerId: Joi.any().forbidden(),
    isPromotion: Joi.any().forbidden(),
    isPremium: Joi.any().forbidden(),
    subscriptions: Joi.any().forbidden(),
}).unknown(true);
