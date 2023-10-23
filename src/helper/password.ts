import * as bcrypt from 'bcrypt';

/**
 * Hash password using bcrypt
 *
 * @param password
 */
export async function hashPassword(password: string) {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
}

/**
 * Compare password
 *
 * @param password
 * @param hash
 */
export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
