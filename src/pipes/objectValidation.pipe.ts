import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ObjectValidationPipe implements PipeTransform<unknown> {
  private toValidate(metatype: Function): boolean {
    const types: Array<Function> = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  async transform(value: unknown, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object, {
      forbidNonWhitelisted: true,
      whitelist: true,
    });

    if (errors.length > 0) {
      const exceptionMessage = errors.reduce(
        (acc, { property, constraints }) => {
          const errorMessage = `'${property}': ${Object.values(
            constraints,
          ).join('. ')}`;

          return `${acc} ${errorMessage};`;
        },
        'Validation failed:',
      );
      throw new BadRequestException(exceptionMessage);
    }

    return value;
  }
}
