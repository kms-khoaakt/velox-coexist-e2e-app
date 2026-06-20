/** Demo accounts for the Acme portal. */
export const VALID_USER = { username: "tomsmith", password: "SuperSecretPassword!" } as const;
export const INVALID_USER = { username: "intruder", password: "nope" } as const;
