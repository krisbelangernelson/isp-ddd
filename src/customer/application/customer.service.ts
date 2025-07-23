import { NotFoundError } from '@/shared/httpErrors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { CustomerRepository } from '../domain/customer.repository';
import type {
  AccessToken,
  CustomerBody,
  CustomerExists,
  CustomerType,
  Login,
  LoginResponse,
} from '../domain/customer';

export const registerCustomer =
  (repo: CustomerRepository) =>
  async (body: CustomerBody): Promise<CustomerType> => {
    const created = await repo.save(body);
    return created;
  };

export const loginCustomer =
  (repo: CustomerRepository) =>
  async (body: Login): Promise<LoginResponse> => {
    const customer = await repo.findByEmail(body.email);

    if (!customer) {
      throw new NotFoundError(
        undefined,
        undefined,
        '1',
        'No account found with that username and password',
      );
    }

    const { id, firstName, lastName, email, phone, password } = customer;

    const isValid = bcrypt.compareSync(body.password, password);
    if (!isValid) {
      throw new NotFoundError(
        undefined,
        undefined,
        '1',
        'No account found with that email and password',
      );
    }
    const accessToken = jwt.sign(
      { id: id.toString(), firstName, lastName, email, phone },
      String(process.env.JWT_SECRET),
      {
        expiresIn: '1d',
      },
    );

    return {
      accessToken,
      id: id.toString(),
      firstName,
      lastName,
      email,
      phone,
    };
  };

export const customerExists =
  (repo: CustomerRepository) =>
  async (
    body: CustomerExists,
  ): Promise<{ emailExists: boolean; phoneExists: boolean }> => {
    const { email = '', phone = '' } = body;
    const emailExists = await repo.findByEmail(email);
    const phoneExists = await repo.findByPhone(phone);
    return { emailExists: !!emailExists, phoneExists: !!phoneExists };
  };

export const customerArea =
  (repo: CustomerRepository) =>
  async (token: AccessToken | undefined): Promise<CustomerBody | object> => {
    if (token === undefined) {
      return {};
    }

    const user = await repo.findById(Number(token.id));
    const {
      id,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
    } = user[0];

    return {
      id: id.toString(),
      firstName,
      lastName,
      email,
      phone,
    };
  };
