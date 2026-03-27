DATABASES

** AUTH **

- id
- idUser
- mail
- compte42
- password

model Auth {
  id        String   @id @default(uuid())
  userId    String   @unique
  email     String   @unique
  compte42  String?  @unique
  password  String
  createdAt DateTime @default(now())
}


** USER **

- id
- username
- firstName
- lastName
- avatar
- theme
- langue
- admin

model User {
  id        String   @id @default(uuid())
  username  String   @unique
  firstName String
  lastName  String
  avatar    String?
  theme     Theme    @default(LIGHT)
  langue    String   @default("en")
  createdAt DateTime @default(now())
}

enum Theme {
  LIGHT
  DARK
}

** SOCIAL **

- id
- idUser
- idUser (ami)

model Friendship {
  id        String   @id @default(uuid())
  userId    String
  friendId  String
  createdAt DateTime @default(now())

  @@unique([userId, friendId])
}

** CONTENT **

* POSTS 
- id
- texte
- image
- userId
- createdAt
- modifiedAt

model Post {
  id         String   @id @default(uuid())
  texte      String
  image      String?
  userId     String
  createdAt  DateTime @default(now())
  modifiedAt DateTime @updatedAt

  comments   Comment[]
  likes      Like[]
}

* COMMENTS
- id
- texte
- userId
- postId
- createdAt
- modifiedAt
- deleted

model Comment {
  id         String   @id @default(uuid())
  texte      String
  userId     String
  postId     String
  createdAt  DateTime @default(now())
  modifiedAt DateTime @updatedAt
  deleted    Boolean  @default(false)

  post       Post @relation(fields: [postId], references: [id])
}

* LIKES TABLE

- id
- userId
- postId

model Like {
  id     String @id @default(uuid())
  userId String
  postId String

  post   Post @relation(fields: [postId], references: [id])

  @@unique([userId, postId])
}




---------------------------------------------------------


1. Exemple .env

DATABASE_URL="postgresql://user:password@localhost:5432/contentdb"


2. schema.prisma complet (CONTENT SERVICE)

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Post {
  id           String    @id @default(uuid())
  texte        String
  image        String?
  userId       String
  likeCount    Int       @default(0)
  commentCount Int       @default(0)

  createdAt    DateTime  @default(now())
  modifiedAt   DateTime  @updatedAt

  comments     Comment[]
  likes        Like[]

  @@index([userId])
}

model Comment {
  id         String   @id @default(uuid())
  texte      String
  userId     String
  postId     String
  deleted    Boolean  @default(false)

  createdAt  DateTime @default(now())
  modifiedAt DateTime @updatedAt

  post       Post     @relation(fields: [postId], references: [id])

  @@index([postId])
  @@index([userId])
}

model Like {
  id        String   @id @default(uuid())
  userId    String
  postId    String
  createdAt DateTime @default(now())

  post      Post     @relation(fields: [postId], references: [id])

  @@unique([userId, postId])
  @@index([postId])
}


3. schema.prisma du service AUTH

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Auth {
  id        String   @id @default(uuid())
  userId    String   @unique
  email     String   @unique
  compte42  String?  @unique
  password  String
  createdAt DateTime @default(now())
}


4. schema.prisma du service USER

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  username  String   @unique
  firstName String
  lastName  String
  avatar    String?
  theme     Theme    @default(LIGHT)
  langue    String   @default("en")

  createdAt DateTime @default(now())
}

enum Theme {
  LIGHT
  DARK
}


5. schema.prisma du service SOCIAL

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Friendship {
  id        String   @id @default(uuid())
  userId    String
  friendId  String
  createdAt DateTime @default(now())

  @@unique([userId, friendId])
  @@index([userId])
}


6. Commandes Prisma à utiliser

Installer :
bash
npm install prisma @prisma/client

Init :
bash
npx prisma init

Migration :
bash
npx prisma migrate dev --name init

Générer le client :
bash
npx prisma generate



-------------------------------------------------------------------------

social-network-backend
│
├─ auth-service
│  ├─ prisma
│  │   └─ schema.prisma
│  ├─ src
│  │   └─ index.ts
│  ├─ .env
│  └─ package.json
│
├─ user-service
│  ├─ prisma
│  │   └─ schema.prisma
│  ├─ src
│  ├─ .env
│  └─ package.json
│
├─ social-service
│  ├─ prisma
│  │   └─ schema.prisma
│  ├─ src
│  ├─ .env
│  └─ package.json
│
├─ content-service
│  ├─ prisma
│  │   └─ schema.prisma
│  ├─ src
│  ├─ .env
│  └─ package.json
│
└─ docker-compose.yml (optionnel)


--------------------------------------------------

sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql