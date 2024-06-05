import { createParamDecorator } from 'routing-controllers';
import { ForbiddenError } from 'routing-controllers';

export function Token(): ParameterDecorator {
  return createParamDecorator({
    required: true,
    value: action => {
      const token = action.request.headers['authorization']?.split(' ')[1];
      if (!token) {
        throw new ForbiddenError('Access token is missing');
      }
      return token;
    },
  });
}