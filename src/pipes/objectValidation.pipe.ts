import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

@Injectable()
export class ObjectValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        const exceptionMessage = error.errors.reduce(
          (acc, { message, path }) => {
            const errorMessage = `Path: '${path.join(
              '.',
            )}'; Message: '${message}'`;
            return `${acc}. ${errorMessage}`;
          },
          'Validation failed',
        );
        throw new BadRequestException(exceptionMessage);
      }

      throw new BadRequestException('Validation failed');
    }
  }
}
