# Mental App

## Getting Started

Follow these instructions to set up this project on local machine.

### Prerequisites

- [Install node](https://medium.com/@isaacjoe/best-way-to-install-and-use-nvm-on-mac-e3a3f6bc494d) and it will also install npm.
- After that, install yarn.

  ```
  npm install -g yarn
  ```

  then check it

  ```
  node -v

  // v14.3.0

  yarn -v

  // 1.22.4
  ```

### Installing

- Edit `host` file
  ```
  sudo vim /etc/hosts
  ```
  paste it
  ```
  ...
  127.0.0.1	master.local
  127.0.0.1	admin.local
  127.0.0.1	guest.local
  ...
  ```
  save.
- Clone project
  ```
  git clone https://github.com/NamNguyen99/mental-app.git && cd mental-app
  ```
- Install dependencies
  ```
  yarn
  ```
- Make env file

  ```
  cp .env.development.example .env.development
  ```

- Run project
  ```
  yarn start
  ```
- Open browser and test `http://master.local:3001`

## Running the tests

- Run test all project

  ```
  yarn test
  ```

- Run test and update snapshot

  ```
  yarn test -u
  ```

- Run test specific file
  ```
  yarn test /path/to/file
  ```
