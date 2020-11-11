MONGO_ROOT_USER = "root"
MONGO_ROOT_PASSWORD = "root"

SUPERUSER_USER = "superuser"
SUPERUSER_PASSWORD = "secretpassword"

DB_NAME = "gosyp_db"

db.auth(MONGO_ROOT_USER, MONGO_ROOT_PASSWORD);
db = db.getSiblingDB(DB_NAME);

db.createUser(
  {
    user: SUPERUSER_USER,
    pwd: SUPERUSER_PASSWORD,
    roles: [
      {
        role: 'readWrite',
        db: DB_NAME
      },
    ],
  },
);
