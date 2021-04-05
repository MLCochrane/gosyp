set -e

mongo <<EOF
db.auth("$MONGO_INITDB_ROOT_USERNAME", "$MONGO_INITDB_ROOT_PASSWORD");
db = db.getSiblingDB("$MONGO_DB_NAME");

db.createUser(
  {
    user: "$MONGO_SUPERUSER_USER",
    pwd: "$MONGO_SUPERUSER_PASSWORD",
    roles: [
      {
        role: 'readWrite',
        db: "$MONGO_DB_NAME"
      },
    ],
  },
);
EOF