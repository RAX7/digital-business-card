# Start Development enviroment

## Start Docker Compose

```sh
cp ./.env.example ./.env
docker compose up --build --remove-orphans
```

## GraphQL

The GraphQL endpoint is located at http://localhost:3000/graphql

## Request examples

### Get profiles with filters and pagination

```graphql
query GetProfiles {
  profiles(
    skip: 0
    take: 5
    filter: { search: "Ivanov", createdAt: { gte: "2025-08-01" } }
    orderBy: [{ field: "updatedAt", order: Desc }]
  ) {
    id
    email
    firstName
    lastName
    updatedAt
    skills {
      id
      name
    }
    experience {
      id
      company
      firstWorkDay
      lastWorkDay
    }
    projects {
      id
      name
    }
  }
}
```

### Get profile by ID

```graphql
query GetProfileById($id: Int!) {
  profile(id: $id) {
    id
    email
    firstName
    lastName
    createdAt
    updatedAt
  }
}
```

Query Variables:

```json
{
  "id": 12 
}
```


### Get own profile by Authorization header

```graphql
query GetOwnProfile {
  ownProfile {
    id,
    email,
    firstName,
    lastName,
    createdAt,
    updatedAt,
  }
}
```

HTTP Headers:

```json
{
  "Authorization": "Basic aXZhbm92QGV4YW1wbGUuY29tOjEyMzQ="
}
```

### Create new profile

```graphql
mutation CreateProfile($input: CreateProfileInput!) {
  createProfile(input: $input) {
    firstName
    lastName
    email
    projects {
      id
      name
    }
    experience {
      id
      company
      position
      firstWorkDay
      lastWorkDay
    }
    skills {
      id
      name
    }
  }
}
```

Query Variables:

```json
{
  "input": {
    "firstName": "TestName3",
    "email": "test16@example.com",
    "projects": [
      {
        "name": "New Project 1",
        "description": "Hello world"
      },
      {
        "name": "New Project 2",
        "description": "Hello world"
      }
    ],
    "experience": [
      {
        "company": "Some company name 1",
        "position": "Position name 1",
        "firstWorkDay": "2025-08-30T00:00:00Z"
      },
      {
        "company": "Some company name 2",
        "position": "Position name 2",
        "firstWorkDay": "2026-08-30T00:00:00Z",
        "lastWorkDay": "2027-08-30T00:00:00Z"
      }
    ],
    "skills": [22, 23]
  }
}
```

### Update existing profile

```graphql
mutation UpdateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    id
    firstName
    projects {
      id
      name
    }
    experience {
      id
      company
      firstWorkDay
    }
  }
}
```

Query Variables:
```json
{
  "input": {
    "id": 1,
    "firstName": "TestName22",
    "projects": { "id": 1, "name": "test-project-2", "description": "2222" },
    "experience": { "id": 1, "company": "Google", "position": "Devrloper", "firstWorkDay": "2027-08-10" }
  }
}
```

### Get experiences with filters and pagination

```graphql
query GetExperiences {
  experiences(
    skip: 0
    take: 5
    filter: { search: "a" }
    orderBy: [{ field: "id", order: Desc }]
  ) {
    id
    company
    position
    firstWorkDay
    lastWorkDay
  }
}
```