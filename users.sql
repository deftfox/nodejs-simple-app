CREATE TABLE "Users" (
    id uuid PRIMARY KEY,
    login VARCHAR(63) NOT NULL,
    password VARCHAR(63) NOT NULL,
    age integer NOT NULL,
	"isDeleted" boolean NOT NULL
);

INSERT INTO "Users" (id, login, password, age, "isDeleted")
  VALUES ('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', 'max@example.com', 'qwerty', 18, false),
  ('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'jack@example.com', 'asdfgh', 33, false),
  ('c44f2132-f92f-466c-8bf2-d6bad669342c', 'olivia@example.com', 'zxcvbn', 22, false);